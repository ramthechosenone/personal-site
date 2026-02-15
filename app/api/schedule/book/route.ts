import { NextRequest, NextResponse } from "next/server";
import { createCalendarEvent } from "@/lib/google-calendar";

const ENV_KEYS = [
  "GOOGLE_CALENDAR_ID",
  "GOOGLE_SERVICE_ACCOUNT_EMAIL",
  "GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY",
] as const;

function getMissingEnvVars(): string[] {
  return ENV_KEYS.filter((key) => !process.env[key]?.trim());
}

export async function POST(request: NextRequest) {
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
    const body = await request.json();
    const {
      start,
      end,
      email,
      name,
      summary,
      description,
    } = body as {
      start?: string;
      end?: string;
      email?: string;
      name?: string;
      summary?: string;
      description?: string;
    };

    if (!start || !end || !name) {
      return NextResponse.json(
        { error: "Missing required fields: start, end, name" },
        { status: 400 }
      );
    }

    const result = await createCalendarEvent({
      start,
      end,
      attendeeName: name,
      attendeeEmail: email || undefined,
      summary: summary || undefined,
      description: description || undefined,
    });

    // Optional: email you when someone books (set RESEND_API_KEY + BOOKING_NOTIFY_EMAIL in Vercel)
    const notifyEmail = process.env.BOOKING_NOTIFY_EMAIL?.trim();
    const resendKey = process.env.RESEND_API_KEY?.trim();
    if (resendKey && notifyEmail) {
      const startDate = new Date(start);
      const timeStr = startDate.toLocaleString("en-US", { dateStyle: "full", timeStyle: "short" });
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendKey}`,
          },
          body: JSON.stringify({
            from: process.env.RESEND_FROM_EMAIL?.trim() || "onboarding@resend.dev",
            to: [notifyEmail],
            subject: `New booking: ${name} – ${timeStr}`,
            html: `<p><strong>${name}</strong> booked a slot.</p><p>When: ${timeStr}</p>${email ? `<p>Email: ${email}</p>` : ""}${description ? `<p>Message: ${description}</p>` : ""}<p><a href="${result.htmlLink || ""}">Open in Google Calendar</a></p>`,
          }),
        });
      } catch {
        // Don't fail the booking if notification fails
      }
    }

    return NextResponse.json({
      success: true,
      eventId: result.eventId,
      htmlLink: result.htmlLink,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to book";
    const status =
      message.includes("Missing") || message.includes("credentials") ? 503 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
