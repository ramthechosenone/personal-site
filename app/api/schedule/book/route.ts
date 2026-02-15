import { NextRequest, NextResponse } from "next/server";
import { createCalendarEvent } from "@/lib/google-calendar";

export async function POST(request: NextRequest) {
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

    if (!start || !end || !email) {
      return NextResponse.json(
        { error: "Missing required fields: start, end, email" },
        { status: 400 }
      );
    }

    const result = await createCalendarEvent({
      start,
      end,
      attendeeEmail: email,
      attendeeName: name || undefined,
      summary: summary || undefined,
      description: description || undefined,
    });

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
