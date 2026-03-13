import { NextRequest, NextResponse } from "next/server";
import { updateEnvVar, triggerRedeploy } from "@/lib/vercel";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const raw = process.env.SQUARE_OAUTH_TOKEN_JSON;
    if (!raw) {
      return NextResponse.json({ error: "No OAuth token to refresh" }, { status: 400 });
    }

    const tokenData = JSON.parse(raw);

    const baseUrl =
      process.env.SQUARE_ENVIRONMENT === "production"
        ? "https://connect.squareup.com"
        : "https://connect.squareupsandbox.com";

    const res = await fetch(`${baseUrl}/oauth2/token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID!,
        client_secret: process.env.SQUARE_OAUTH_SECRET!,
        refresh_token: tokenData.refresh_token,
        grant_type: "refresh_token",
      }),
    });

    const data = await res.json();

    if (data.access_token) {
      const updated = JSON.stringify({
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        expires_at: data.expires_at,
        merchant_id: data.merchant_id || tokenData.merchant_id,
        token_type: data.token_type,
      });

      await updateEnvVar("SQUARE_OAUTH_TOKEN_JSON", updated);
      await triggerRedeploy();

      return NextResponse.json({
        success: true,
        message: "Token refreshed",
        expires_at: data.expires_at,
      });
    }

    return NextResponse.json({ error: "Square did not return a new token", details: data }, { status: 500 });
  } catch (error) {
    console.error("Cron token refresh failed:", error);
    return NextResponse.json({ error: "Failed to refresh token" }, { status: 500 });
  }
}
