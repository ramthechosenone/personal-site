import { NextRequest, NextResponse } from "next/server";
import { getAvailableSlots } from "@/lib/google-calendar";

const DEFAULT_TIMEZONE = "America/Los_Angeles";

const ENV_KEYS = [
  "GOOGLE_CALENDAR_ID",
  "GOOGLE_SERVICE_ACCOUNT_EMAIL",
  "GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY",
] as const;

function getMissingEnvVars(): string[] {
  return ENV_KEYS.filter((key) => !process.env[key]?.trim());
}

export async function GET(request: NextRequest) {
  const missing = getMissingEnvVars();
  if (missing.length > 0) {
    return NextResponse.json(
      {
        error: `Missing environment variables: ${missing.join(", ")}. Add them in Vercel → Project → Settings → Environment Variables, then redeploy.`,
      },
      { status: 503 }
    );
  }
  try {
    const timezone =
      request.nextUrl.searchParams.get("timezone") || DEFAULT_TIMEZONE;
    const slots = await getAvailableSlots(timezone);
    return NextResponse.json({ slots });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to load availability";
    const status =
      message.includes("Missing") || message.includes("credentials") ? 503 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
