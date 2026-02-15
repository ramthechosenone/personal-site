import { google } from "googleapis";
import { addDays } from "date-fns";
import { fromZonedTime } from "date-fns-tz";

const SLOT_MINUTES = 30;
const WORK_START_HOUR = 9;
const WORK_END_HOUR = 17;
const DAYS_AHEAD = 14;

function getCalendarClient() {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(
    /\\n/g,
    "\n"
  );
  const calendarId = process.env.GOOGLE_CALENDAR_ID;

  if (!clientEmail || !privateKey || !calendarId) {
    throw new Error(
      "Missing GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY, or GOOGLE_CALENDAR_ID"
    );
  }

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });

  return { calendar: google.calendar({ version: "v3", auth }), calendarId };
}

export interface TimeSlot {
  start: string; // ISO
  end: string;
  startLocal: string; // e.g. "Wed, 10:00 AM"
  endLocal: string;
}

/**
 * Get available time slots. Uses freebusy so event details are never exposed.
 * Returns only start/end times for slots that are free within working hours.
 */
export async function getAvailableSlots(
  timezone: string = "America/Los_Angeles"
): Promise<TimeSlot[]> {
  const { calendar, calendarId } = getCalendarClient();

  const now = new Date();
  const endDate = new Date(now);
  endDate.setDate(endDate.getDate() + DAYS_AHEAD);

  const timeMin = now.toISOString();
  const timeMax = endDate.toISOString();

  const freebusy = await calendar.freebusy.query({
    requestBody: {
      timeMin,
      timeMax,
      items: [{ id: calendarId }],
    },
  });

  const busy =
    freebusy.data.calendars?.[calendarId]?.busy?.map((b) => ({
      start: new Date(b.start!).getTime(),
      end: new Date(b.end!).getTime(),
    })) ?? [];

  const slotMs = SLOT_MINUTES * 60 * 1000;
  const slots: TimeSlot[] = [];

  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  // Generate slots in the requested timezone (weekdays 9–5 local).
  const datePartsFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    weekday: "short",
  });
  for (let d = 0; d < DAYS_AHEAD; d++) {
    const ref = addDays(now, d);
    const parts = datePartsFormatter.formatToParts(ref);
    const y = parseInt(parts.find((p) => p.type === "year")!.value, 10);
    const m = parseInt(parts.find((p) => p.type === "month")!.value, 10) - 1;
    const day = parseInt(parts.find((p) => p.type === "day")!.value, 10);
    const weekday = parts.find((p) => p.type === "weekday")!.value;
    if (weekday === "Sat" || weekday === "Sun") continue;

    for (let hour = WORK_START_HOUR; hour < WORK_END_HOUR; hour++) {
      for (let minute = 0; minute < 60; minute += SLOT_MINUTES) {
        const localStart = new Date(y, m, day, hour, minute, 0);
        const localEnd = new Date(localStart.getTime() + slotMs);
        const start = fromZonedTime(localStart, timezone);
        const end = fromZonedTime(localEnd, timezone);

        if (start < now) continue;
        if (end > endDate) break;

        const startMs = start.getTime();
        const endMs = end.getTime();
        const isBusy = busy.some(
          (b) =>
            (startMs >= b.start && startMs < b.end) ||
            (endMs > b.start && endMs <= b.end) ||
            (startMs <= b.start && endMs >= b.end)
        );
        if (isBusy) continue;

        slots.push({
          start: start.toISOString(),
          end: end.toISOString(),
          startLocal: formatter.format(start),
          endLocal: formatter.format(end),
        });
      }
    }
  }

  return slots;
}

export interface CreateEventInput {
  start: string; // ISO
  end: string;
  attendeeEmail: string;
  attendeeName?: string;
  summary?: string;
  description?: string;
}

/**
 * Create a calendar event and optionally add the guest (sends invite).
 */
export async function createCalendarEvent(input: CreateEventInput): Promise<{ eventId: string; htmlLink: string | null }> {
  const { calendar, calendarId } = getCalendarClient();

  const summary = input.summary ?? `Meeting with ${input.attendeeName || input.attendeeEmail}`;
  const description = [
    input.description,
    input.attendeeName && `Guest: ${input.attendeeName} (${input.attendeeEmail})`,
  ]
    .filter(Boolean)
    .join("\n\n");

  const event = await calendar.events.insert({
    calendarId,
    requestBody: {
      summary,
      description: description || undefined,
      start: { dateTime: input.start, timeZone: "UTC" },
      end: { dateTime: input.end, timeZone: "UTC" },
      attendees: [{ email: input.attendeeEmail, displayName: input.attendeeName }],
    },
    sendUpdates: "all", // send calendar invite to attendee
  });

  return {
    eventId: event.data.id!,
    htmlLink: event.data.htmlLink ?? null,
  };
}
