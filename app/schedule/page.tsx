"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SiteShell from "@/components/layout/SiteShell";
import BackButton from "@/components/layout/BackButton";
import KeyCard from "@/components/common/KeyCard";
import LoadingDuck from "@/components/common/LoadingDuck";

interface TimeSlot {
  start: string;
  end: string;
  startLocal: string;
  endLocal: string;
}

function groupSlotsByDate(slots: TimeSlot[]): Map<string, TimeSlot[]> {
  const map = new Map<string, TimeSlot[]>();
  for (const slot of slots) {
    const dateKey = slot.start.slice(0, 10);
    if (!map.has(dateKey)) map.set(dateKey, []);
    map.get(dateKey)!.push(slot);
  }
  return map;
}

function formatDateLabel(isoDate: string): string {
  const d = new Date(isoDate + "T12:00:00");
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  if (d.toDateString() === today.toDateString()) return "Today";
  if (d.toDateString() === tomorrow.toDateString()) return "Tomorrow";
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

export default function SchedulePage() {
  const [slots, setSlots] = useState<TimeSlot[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<TimeSlot | null>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [booked, setBooked] = useState<{ link?: string } | null>(null);

  useEffect(() => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    fetch(`/api/schedule/availability?timezone=${encodeURIComponent(tz)}`)
      .then((res) => {
        if (!res.ok) return res.json().then((d) => Promise.reject(new Error(d.error ?? "Failed to load")));
        return res.json();
      })
      .then((data) => {
        setSlots(data.slots ?? []);
        setError(null);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) return;
    setSubmitting(true);
    fetch("/api/schedule/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        start: selected.start,
        end: selected.end,
        email: form.email,
        name: form.name || undefined,
        description: form.message || undefined,
      }),
    })
      .then((res) => res.json().then((data) => ({ ok: res.ok, data })))
      .then(({ ok, data }) => {
        if (ok) {
          setBooked({ link: data.htmlLink });
          setSelected(null);
          setForm({ name: "", email: "", message: "" });
        } else throw new Error(data.error ?? "Booking failed");
      })
      .catch((e) => setError(e.message))
      .finally(() => setSubmitting(false));
  };

  const grouped = slots ? groupSlotsByDate(slots) : null;

  return (
    <SiteShell>
      <BackButton />
      <div className="max-w-2xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-2xl md:text-3xl font-medium text-text-primary mb-2">
            Schedule with me
          </h1>
          <p className="text-text-subtle text-sm md:text-base">
            Pick an open slot below. You’ll get a calendar invite and I’ll see it on my calendar.
          </p>
        </motion.div>

        {loading && <LoadingDuck />}

        {error && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg bg-elevated border border-border p-4 text-text-subtle text-sm text-center"
          >
            {error}
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {booked ? (
            <motion.div
              key="booked"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-xl bg-elevated border border-border shadow-[0_2px_8px_rgba(0,0,0,0.06)] p-8 text-center"
            >
              <p className="text-text-primary font-medium mb-2">You’re all set</p>
              <p className="text-text-subtle text-sm mb-4">
                The event is on my calendar. Use the link below to add it to yours (you won’t get an email from Google).
              </p>
              {booked.link && (
                <a
                  href={booked.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent text-sm hover:underline"
                >
                  Open in Google Calendar
                </a>
              )}
              <button
                type="button"
                onClick={() => setBooked(null)}
                className="mt-6 text-text-subtle text-sm hover:text-text-primary transition-colors"
              >
                Book another time
              </button>
            </motion.div>
          ) : selected ? (
            <motion.form
              key="form"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0 }}
              onSubmit={handleBook}
              className="space-y-4"
            >
              <div className="rounded-lg bg-elevated border border-border p-4">
                <p className="text-text-subtle text-xs uppercase tracking-wider mb-1">Selected time</p>
                <p className="text-text-primary font-medium">{selected.startLocal}</p>
                <p className="text-text-subtle text-sm">{selected.endLocal}</p>
              </div>
              <div>
                <label htmlFor="schedule-name" className="block text-text-subtle text-sm mb-1">
                  Name *
                </label>
                <input
                  id="schedule-name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full bg-background border border-border rounded-lg px-3 py-2 text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-border"
                />
              </div>
              <div>
                <label htmlFor="schedule-email" className="block text-text-subtle text-sm mb-1">
                  Email (optional)
                </label>
                <input
                  id="schedule-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="w-full bg-background border border-border rounded-lg px-3 py-2 text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-border"
                />
              </div>
              <div>
                <label htmlFor="schedule-message" className="block text-text-subtle text-sm mb-1">
                  What’s this about? (optional)
                </label>
                <textarea
                  id="schedule-message"
                  rows={2}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  className="w-full bg-background border border-border rounded-lg px-3 py-2 text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-border resize-none"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => { setSelected(null); setError(null); }}
                  className="px-4 py-2 rounded-lg border border-border text-text-subtle text-sm hover:bg-elevated transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 rounded-lg bg-text-primary text-background text-sm font-medium hover:bg-text-subtle disabled:opacity-60 transition-colors"
                >
                  {submitting ? "Booking…" : "Confirm"}
                </button>
              </div>
            </motion.form>
          ) : grouped && grouped.size > 0 ? (
            <motion.div
              key="slots"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.03 }}
              className="space-y-8"
            >
              {Array.from(grouped.entries()).map(([dateKey, dateSlots]) => (
                <div key={dateKey}>
                  <p className="text-text-subtle text-xs uppercase tracking-wider mb-3">
                    {formatDateLabel(dateKey)}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {dateSlots.map((slot) => (
                      <KeyCard
                        key={slot.start}
                        onClick={() => setSelected(slot)}
                        className="px-4 py-2.5 rounded-lg text-sm text-text-primary"
                      >
                        {slot.startLocal.split(", ").pop()}
                      </KeyCard>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          ) : !loading && slots && slots.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-text-subtle text-sm text-center py-8"
            >
              No open slots in the next two weeks. Check back later or reach out another way.
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>
    </SiteShell>
  );
}
