import { NextRequest, NextResponse } from "next/server";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";

const sesClient = new SESClient({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const snsClient = new SNSClient({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { formType, name, phone, email, yards, color, notes, message } = body;

    if (!formType || !name || !phone || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const notifyEmail = process.env.NOTIFY_EMAIL!;
    const notifyPhone = process.env.NOTIFY_PHONE!;
    const snsFrom = process.env.SNS_ORIGINATION_NUMBER!;

    // ─── Build message content ───────────────────────────────────────────
    let subject = "";
    let textBody = "";
    let smsBody = "";

    if (formType === "estimate") {
      subject = `New Free Estimate Request — Mulch Company MN`;
      textBody = `NEW FREE ESTIMATE REQUEST
─────────────────────────
Name:  ${name}
Phone: ${phone}
Email: ${email}
${yards ? `Yards: ${yards}` : "Yards: Not specified"}
${color ? `Color: ${color}` : "Color: Not specified"}
${notes ? `Notes: ${notes}` : ""}
─────────────────────────
Mulch Company MN`;
      smsBody = `New estimate request - Mulch Co MN\nName: ${name}\nPhone: ${phone}\n${yards ? `Yards: ${yards}\n` : ""}${color ? `Color: ${color}\n` : ""}${notes ? `Notes: ${notes}` : ""}`;
    } else if (formType === "know") {
      subject = `New Install Request — Mulch Company MN`;
      textBody = `NEW INSTALL REQUEST
─────────────────────────
Name:  ${name}
Phone: ${phone}
Email: ${email}
Yards: ${yards}
Color: ${color}
${notes ? `Notes: ${notes}` : ""}
─────────────────────────
Mulch Company MN`;
      smsBody = `New install request - Mulch Co MN\nName: ${name}\nPhone: ${phone}\nYards: ${yards}\nColor: ${color}${notes ? `\nNotes: ${notes}` : ""}`;
    } else if (formType === "question") {
      subject = `New General Inquiry — Mulch Company MN`;
      textBody = `NEW GENERAL INQUIRY
─────────────────────────
Name:  ${name}
Phone: ${phone}
Email: ${email}
Message: ${message}
─────────────────────────
Mulch Company MN`;
      smsBody = `New question - Mulch Co MN\nName: ${name}\nPhone: ${phone}\nMsg: ${message}`;
    } else {
      return NextResponse.json({ error: "Invalid form type" }, { status: 400 });
    }

    // ─── Send email via SES ──────────────────────────────────────────────
    await sesClient.send(
      new SendEmailCommand({
        Source: "noreply@steadyscaling.com",
        Destination: { ToAddresses: [notifyEmail] },
        Message: {
          Subject: { Data: subject },
          Body: { Text: { Data: textBody } },
        },
      })
    );

    // ─── Send SMS via SNS ────────────────────────────────────────────────
    await snsClient.send(
      new PublishCommand({
        PhoneNumber: notifyPhone,
        Message: smsBody,
        MessageAttributes: {
          "AWS.MM.SMS.OriginationNumber": {
            DataType: "String",
            StringValue: snsFrom,
          },
        },
      })
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
