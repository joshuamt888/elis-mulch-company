import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

export async function GET() {
  const appId = process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID!;
  const baseUrl =
    process.env.SQUARE_ENVIRONMENT === "production"
      ? "https://connect.squareup.com"
      : "https://connect.squareupsandbox.com";

  const scopes = [
    "APPOINTMENTS_READ",
    "APPOINTMENTS_WRITE",
    "APPOINTMENTS_BUSINESS_SETTINGS_READ",
    "CUSTOMERS_READ",
    "CUSTOMERS_WRITE",
    "ITEMS_READ",
    "MERCHANT_PROFILE_READ",
    "ORDERS_READ",
    "PAYMENTS_READ",
  ].join("+");

  const state = randomUUID();
  const redirectUri = encodeURIComponent(
    `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/auth/square/callback`
  );

  const url = `${baseUrl}/oauth2/authorize?client_id=${appId}&scope=${scopes}&session=false&state=${state}&redirect_uri=${redirectUri}`;

  return NextResponse.redirect(url);
}
