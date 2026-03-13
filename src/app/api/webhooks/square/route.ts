import { NextRequest, NextResponse } from "next/server";
import { createHmac, randomUUID } from "crypto";
import { getClient } from "@/app/actions/square";

// ─── Verify Square webhook signature ─────────────────────────────────────────
function verifySignature(body: string, signature: string): boolean {
  const key = process.env.SQUARE_WEBHOOK_SIGNATURE_KEY;
  if (!key) {
    console.warn("SQUARE_WEBHOOK_SIGNATURE_KEY not set — skipping verification");
    return true;
  }
  const url = process.env.SQUARE_WEBHOOK_URL || "";
  const combined = url + body;
  const expected = createHmac("sha256", key).update(combined).digest("base64");
  return expected === signature;
}

// ─── Parse "Install Week: Week of June 2" from line items ────────────────────
function parseInstallWeek(lineItems: Array<{ name?: string }>): string | null {
  for (const item of lineItems) {
    if (item.name?.startsWith("Install Week:")) {
      return item.name.replace("Install Week: ", "").trim();
    }
  }
  return null;
}

// ─── POST handler ────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("x-square-hmacsha256-signature") || "";

  if (!verifySignature(body, signature)) {
    console.error("Webhook signature verification failed");
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(body);
  const eventType: string = event.type || "";

  console.log(`Square webhook received: ${eventType}`);

  if (eventType === "payment.created") {
    const client = await getClient();

    try {
      const payment = event.data?.object?.payment;
      if (!payment) {
        console.error("No payment object in webhook event");
        return NextResponse.json({ received: true });
      }

      const orderId: string = payment.order_id;
      if (!orderId) {
        console.error("No order_id on payment");
        return NextResponse.json({ received: true });
      }

      // Fetch the full order to get line items + customer info
      const order = await client.orders.get({
        orderId,
      });

      const lineItems = order.order?.lineItems || [];
      const installWeek = parseInstallWeek(
        lineItems.map((li) => ({ name: li.name ?? undefined }))
      );

      if (!installWeek) {
        console.log("No install week found in order — skipping booking");
        return NextResponse.json({ received: true });
      }

      // Get customer info — address is stored in CRM (created before checkout)
      const customerId = order.order?.customerId;
      let customerAddress: Record<string, string> | null = null;
      let customerName = "";

      if (customerId) {
        try {
          const customerResult = await client.customers.get({ customerId });
          const addr = customerResult.customer?.address;
          if (addr?.addressLine1) {
            customerAddress = {
              addressLine1: addr.addressLine1 || "",
              locality: addr.locality || "",
              administrativeDistrictLevel1: addr.administrativeDistrictLevel1 || "",
              postalCode: addr.postalCode || "",
            };
          }
          customerName = [customerResult.customer?.givenName, customerResult.customer?.familyName]
            .filter(Boolean).join(" ");
        } catch (e) {
          console.warn("Could not fetch customer:", e);
        }
      }

      // Build a note with all the order details
      const mulchItem = lineItems.find(
        (li) => li.name && !li.name.startsWith("Install Week") && li.name !== "Delivery"
      );
      const mulchColor = mulchItem?.name || "Mulch";
      const mulchYards = mulchItem?.quantity || "?";
      const totalMoney = order.order?.totalMoney;
      const totalDollars = totalMoney?.amount
        ? `$${(Number(totalMoney.amount) / 100).toLocaleString()}`
        : "N/A";

      const addressStr = customerAddress
        ? `${customerAddress.addressLine1}, ${customerAddress.locality}, ${customerAddress.administrativeDistrictLevel1} ${customerAddress.postalCode}`
        : "See Square order";

      const bookingNote = [
        `PAID — Mulch Installation`,
        `${mulchYards} yds ${mulchColor}`,
        `Total: ${totalDollars}`,
        `Install Week: ${installWeek}`,
        ...(customerName ? [`Customer: ${customerName}`] : []),
        `Address: ${addressStr}`,
        `Order ID: ${orderId}`,
      ].join("\n");

      // Parse the install week to get the Monday
      const weekDate = parseWeekLabel(installWeek);

      if (!weekDate) {
        console.log("Could not parse install week date — skipping booking");
        return NextResponse.json({ received: true });
      }

      // Find the next open weekday (Mon–Fri) in this install week
      const startAt = await findNextOpenDay(client, weekDate);

      const bookingResult = await client.bookings.create({
        idempotencyKey: randomUUID(),
        booking: {
          ...(customerId ? { customerId } : {}),
          locationId: process.env.SQUARE_LOCATION_ID!,
          ...(customerAddress ? {
            locationType: "CUSTOMER_LOCATION",
            address: {
              addressLine1: customerAddress.addressLine1,
              locality: customerAddress.locality,
              administrativeDistrictLevel1: customerAddress.administrativeDistrictLevel1,
              postalCode: customerAddress.postalCode,
            },
          } : {}),
          startAt,
          customerNote: bookingNote,
          appointmentSegments: [
            {
              durationMinutes: 480,
              teamMemberId: process.env.SQUARE_TEAM_MEMBER_ID!,
              serviceVariationId: process.env.SQUARE_INSTALL_SERVICE_ID!,
              serviceVariationVersion: BigInt(
                process.env.SQUARE_INSTALL_SERVICE_VERSION || "0"
              ),
            },
          ],
        },
      });

      console.log("Booking created from payment:", bookingResult.booking?.id);
    } catch (error) {
      console.error("Webhook processing error:", error);
      // Still return 200 so Square doesn't retry
    }
  }

  return NextResponse.json({ received: true });
}

// ─── Find next open weekday in the install week ─────────────────────────────
async function findNextOpenDay(client: Awaited<ReturnType<typeof getClient>>, monday: Date): Promise<string> {
  const weekdays: Date[] = [];
  for (let i = 0; i < 5; i++) {
    const day = new Date(monday);
    day.setDate(monday.getDate() + i);
    day.setHours(9, 0, 0, 0);
    weekdays.push(day);
  }

  try {
    const rangeStart = new Date(monday);
    rangeStart.setHours(0, 0, 0, 0);
    const rangeEnd = new Date(monday);
    rangeEnd.setDate(monday.getDate() + 5);
    rangeEnd.setHours(0, 0, 0, 0);

    const existingPage = await client.bookings.list({
      locationId: process.env.SQUARE_LOCATION_ID!,
      startAtMin: rangeStart.toISOString(),
      startAtMax: rangeEnd.toISOString(),
    });

    // Count bookings per weekday (1=Mon … 5=Fri)
    const dayCounts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    for await (const booking of existingPage) {
      if (booking.startAt) {
        const dayOfWeek = new Date(booking.startAt).getDay();
        if (dayOfWeek >= 1 && dayOfWeek <= 5) {
          dayCounts[dayOfWeek]++;
        }
      }
    }

    // Pick the weekday with the fewest bookings (ties go to earlier day)
    let minCount = Infinity;
    let bestDay = weekdays[0];
    for (const day of weekdays) {
      const count = dayCounts[day.getDay()] || 0;
      if (count < minCount) {
        minCount = count;
        bestDay = day;
      }
    }

    return bestDay.toISOString();
  } catch (e) {
    console.warn("Could not check existing bookings — defaulting to Monday:", e);
  }

  return weekdays[0].toISOString();
}

// ─── Parse "Week of June 2" → Date ──────────────────────────────────────────
function parseWeekLabel(label: string): Date | null {
  const match = label.match(/Week of (\w+ \d+)/i);
  if (!match) return null;

  const currentYear = new Date().getFullYear();
  const parsed = new Date(`${match[1]}, ${currentYear}`);

  if (isNaN(parsed.getTime())) return null;

  if (parsed < new Date()) {
    parsed.setFullYear(currentYear + 1);
  }

  return parsed;
}
