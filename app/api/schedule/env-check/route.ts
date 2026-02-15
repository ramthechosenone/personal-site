import { NextResponse } from "next/server";

const ENV_KEYS = [
  "GOOGLE_CALENDAR_ID",
  "GOOGLE_SERVICE_ACCOUNT_EMAIL",
  "GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY",
] as const;

/**
 * Temporary debug: returns whether each env var is set (true/false).
 * Hit this URL on your deployed site to confirm Vercel is exposing the vars.
 * Remove or restrict this route once things work.
 */
export async function GET() {
  const status: Record<string, boolean> = {};
  for (const key of ENV_KEYS) {
    const raw = process.env[key];
    status[key] = typeof raw === "string" && raw.trim().length > 0;
  }
  return NextResponse.json(status);
}
