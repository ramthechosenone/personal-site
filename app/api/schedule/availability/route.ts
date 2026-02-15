import { NextRequest, NextResponse } from "next/server";
import { getAvailableSlots } from "@/lib/google-calendar";

const DEFAULT_TIMEZONE = "America/Los_Angeles";

export async function GET(request: NextRequest) {
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
