import { NextRequest, NextResponse } from "next/server";
import { updateEnvVar, triggerRedeploy } from "@/lib/vercel";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const error = req.nextUrl.searchParams.get("error");

  if (error) return NextResponse.json({ error }, { status: 400 });
  if (!code)
    return NextResponse.json({ error: "No authorization code" }, { status: 400 });

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
      code,
      grant_type: "authorization_code",
      redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/auth/square/callback`,
    }),
  });

  const data = await res.json();

  if (data.access_token) {
    const tokenJson = JSON.stringify({
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_at: data.expires_at,
      merchant_id: data.merchant_id,
      token_type: data.token_type,
    });

    await updateEnvVar("SQUARE_OAUTH_TOKEN_JSON", tokenJson);
    await triggerRedeploy();

    return NextResponse.json({
      success: true,
      message: "OAuth token saved to Vercel env vars. Redeploy triggered.",
      expires_at: data.expires_at,
    });
  }

  return NextResponse.json(
    { error: "Failed to get token", details: data },
    { status: 500 }
  );
}
