"use server";

import { SquareClient, SquareEnvironment } from "square";
import { randomUUID } from "crypto";

// ─── Get the best available token (OAuth first, fallback to personal) ───────
// Token refresh is handled by the weekly cron job (/api/cron/refresh-token)
async function getToken(): Promise<string> {
  try {
    const raw = process.env.SQUARE_OAUTH_TOKEN_JSON;
    if (raw) {
      const data = JSON.parse(raw);
      if (data.access_token) return data.access_token;
    }
  } catch {
    // Invalid or missing OAuth token env var — use personal access token
  }
  return process.env.SQUARE_ACCESS_TOKEN!;
}

export async function getClient(): Promise<SquareClient> {
  const token = await getToken();
  return new SquareClient({
    token,
    environment:
      process.env.SQUARE_ENVIRONMENT === "production"
        ? SquareEnvironment.Production
        : SquareEnvironment.Sandbox,
  });
}

// ─── Shared customer info type ──────────────────────────────────────────────
export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zip: string;
}

// ─── Find existing customer by email, or create a new one ───────────────────
export async function createCustomer(info: CustomerInfo) {
  const client = await getClient();

  // 1. Try to find existing customer by email
  try {
    const search = await client.customers.search({
      query: {
        filter: {
          emailAddress: {
            exact: info.email.trim().toLowerCase(),
          },
        },
      },
    });

    if (search.customers && search.customers.length > 0) {
      return { success: true, customer: { customer: search.customers[0] } };
    }
  } catch (searchError) {
    console.warn("Customer search failed, will try to create:", searchError);
  }

  // 2. Not found or search failed — try to create
  try {
    const fullAddress = `${info.street}, ${info.city}, ${info.state} ${info.zip}`;
    const result = await client.customers.create({
      idempotencyKey: randomUUID(),
      givenName: info.firstName,
      familyName: info.lastName,
      emailAddress: info.email,
      phoneNumber: info.phone,
      address: {
        addressLine1: info.street,
        locality: info.city,
        administrativeDistrictLevel1: info.state,
        postalCode: info.zip,
      },
      note: `Address: ${fullAddress}`,
    });
    return { success: true, customer: result };
  } catch (createError) {
    console.error("createCustomer error:", createError);
    return { success: false, error: "Failed to create customer" };
  }
}

// ─── Search available 30-min time slots for in-person estimates (Plan B) ───
export async function searchAvailableSlots(startDate: string, endDate: string) {
  const client = await getClient();

  try {
    const result = await client.bookings.searchAvailability({
      query: {
        filter: {
          startAtRange: {
            startAt: startDate,
            endAt: endDate,
          },
          locationId: process.env.SQUARE_LOCATION_ID!,
          segmentFilters: [
            {
              serviceVariationId: process.env.SQUARE_ESTIMATE_SERVICE_ID!,
              teamMemberIdFilter: {
                any: [process.env.SQUARE_TEAM_MEMBER_ID!],
              },
            },
          ],
        },
      },
    });

    return {
      success: true,
      availabilities: result.availabilities || [],
    };
  } catch (error) {
    console.error("searchAvailableSlots error:", error);
    return { success: false, availabilities: [], error: "Failed to fetch availability" };
  }
}

// ─── Create a booking for in-person estimate (Plan B) ──────────────────────
export async function createEstimateBooking(
  customerId: string,
  startAt: string,
  customerNote: string,
  address: { street: string; city: string; state: string; zip: string }
) {
  const client = await getClient();

  try {
    const result = await client.bookings.create({
      idempotencyKey: randomUUID(),
      booking: {
        ...(customerId ? { customerId } : {}),
        locationId: process.env.SQUARE_LOCATION_ID!,
        locationType: "CUSTOMER_LOCATION",
        address: {
          addressLine1: address.street,
          locality: address.city,
          administrativeDistrictLevel1: address.state,
          postalCode: address.zip,
        },
        startAt,
        customerNote,
        appointmentSegments: [
          {
            durationMinutes: 30,
            teamMemberId: process.env.SQUARE_TEAM_MEMBER_ID!,
            serviceVariationId: process.env.SQUARE_ESTIMATE_SERVICE_ID!,
            serviceVariationVersion: BigInt(process.env.SQUARE_ESTIMATE_SERVICE_VERSION || "0"),
          },
        ],
      },
    });

    return { success: true, booking: result };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("createEstimateBooking error:", message, error);
    return { success: false, error: message };
  }
}

// ─── Plan A: Create customer + checkout link → redirect to Square ────────────
export async function createCheckoutLink(
  customerInfo: CustomerInfo,
  orderDetails: {
    color: string;
    yards: number;
    pricePerYard: number;
    deliveryFee: number;
    selectedWeek: string;
    notes?: string;
  },
  baseUrl: string
) {
  const client = await getClient();

  try {
    // 1. Create customer in Square CRM
    const customerResult = await createCustomer(customerInfo);
    if (!customerResult.success) {
      return { success: false, error: "Failed to create customer" };
    }

    // 2. Create checkout link (payment only — no address collection)
    const result = await client.checkout.paymentLinks.create({
      idempotencyKey: randomUUID(),
      order: {
        locationId: process.env.SQUARE_LOCATION_ID!,
        lineItems: [
          {
            name: orderDetails.color,
            quantity: String(orderDetails.yards),
            basePriceMoney: {
              amount: BigInt(orderDetails.pricePerYard * 100),
              currency: "USD",
            },
          },
          {
            name: "Delivery",
            quantity: "1",
            basePriceMoney: {
              amount: BigInt(orderDetails.deliveryFee * 100),
              currency: "USD",
            },
          },
          {
            name: `Install Week: ${orderDetails.selectedWeek}`,
            quantity: "1",
            basePriceMoney: {
              amount: BigInt(0),
              currency: "USD",
            },
          },
        ],
      },
      checkoutOptions: {
        redirectUrl: `${baseUrl}/estimate/success`,
      },
      paymentNote: `Install week: ${orderDetails.selectedWeek} | Address: ${customerInfo.street}, ${customerInfo.city}, ${customerInfo.state} ${customerInfo.zip} | ${customerInfo.firstName} ${customerInfo.lastName} | ${customerInfo.phone}${orderDetails.notes ? ` | Notes: ${orderDetails.notes}` : ""}`,
    });

    const checkoutUrl =
      typeof result === "object" && result !== null && "paymentLink" in result
        ? (result as { paymentLink?: { url?: string } }).paymentLink?.url
        : undefined;

    if (!checkoutUrl) {
      console.error("No checkout URL in response:", result);
      return { success: false, error: "Failed to create checkout link" };
    }

    return { success: true, checkoutUrl };
  } catch (error) {
    console.error("createCheckoutLink error:", error);
    return { success: false, error: "Failed to create checkout" };
  }
}

// ─── Plan B: customer + free estimate booking ──────────────────────────────
export async function processEstimateBooking(
  customerInfo: CustomerInfo,
  startAt: string
) {
  // 1. Try to create/find customer (non-blocking — booking still works without it)
  let customerId = "";
  const customerResult = await createCustomer(customerInfo);

  if (customerResult.success && customerResult.customer) {
    customerId =
      typeof customerResult.customer === "object" &&
      customerResult.customer !== null &&
      "customer" in (customerResult.customer as Record<string, unknown>)
        ? ((customerResult.customer as Record<string, unknown>).customer as { id: string }).id
        : "";
  }

  if (!customerId) {
    console.warn("Could not get customer ID — booking will proceed without it");
  }

  // 2. Create booking (works with or without customerId)
  const fullAddress = `${customerInfo.street}, ${customerInfo.city}, ${customerInfo.state} ${customerInfo.zip}`;
  const note = `Free in-person mulch estimate.\n${customerInfo.firstName} ${customerInfo.lastName}\nPhone: ${customerInfo.phone}\nEmail: ${customerInfo.email}\nAddress: ${fullAddress}`;
  const bookingResult = await createEstimateBooking(customerId, startAt, note, {
    street: customerInfo.street,
    city: customerInfo.city,
    state: customerInfo.state,
    zip: customerInfo.zip,
  });

  if (!bookingResult.success) {
    console.error("Booking failed:", bookingResult.error);
    return { success: false, error: bookingResult.error || "Failed to book appointment" };
  }

  return {
    success: true,
    booking: bookingResult.booking,
    customer: customerResult.customer,
  };
}
