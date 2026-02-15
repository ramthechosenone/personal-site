"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

const RUN_DURATION = 2.8;
const SCROLL_STEP = 200;
const SCROLL_DURATION = 1.6;

export default function ScheduleFriendsPage() {
  const [slots, setSlots] = useState<TimeSlot[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<TimeSlot | null>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [booked, setBooked] = useState<{ link?: string } | null>(null);
  const [showFullSchedule, setShowFullSchedule] = useState(false);
  const [gameArrived, setGameArrived] = useState(false);
  const [currentSlotIndex, setCurrentSlotIndex] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [advancingToNextSlot, setAdvancingToNextSlot] = useState(false);
  const runStarted = useRef(false);

  useEffect(() => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    fetch(
      `/api/schedule/availability?timezone=${encodeURIComponent(tz)}&days=3&weekends=true`
    )
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

  useEffect(() => {
    if (loading || !slots?.length || runStarted.current) return;
    runStarted.current = true;
    setScrollOffset(SCROLL_STEP);
    const t = setTimeout(() => setGameArrived(true), RUN_DURATION * 1000);
    return () => clearTimeout(t);
  }, [loading, slots?.length]);

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

  const displayedSlot = slots?.[currentSlotIndex] ?? slots?.[0] ?? null;
  const hasNextSlot = slots && currentSlotIndex < slots.length - 1;
  const grouped = slots ? groupSlotsByDate(slots) : null;
  const showGame = slots && slots.length > 0 && !showFullSchedule && !selected && !booked;

  const goToNextSlot = () => {
    if (!slots || currentSlotIndex >= slots.length - 1) return;
    setAdvancingToNextSlot(true);
    setScrollOffset((prev) => prev + SCROLL_STEP);
    setTimeout(() => {
      setCurrentSlotIndex((i) => Math.min(i + 1, slots.length - 1));
      setAdvancingToNextSlot(false);
    }, SCROLL_DURATION * 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1
            className="text-xl md:text-2xl font-medium text-text-primary"
            style={{ fontFamily: "'Press Start 2P', monospace" }}
          >
            Grab a slot
          </h1>
        </motion.div>

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-xl bg-elevated border border-border p-6 flex items-center justify-center min-h-[200px]"
          >
            <LoadingDuck />
          </motion.div>
        )}

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
                The event is booked. Use the link below to add it to your calendar (you won’t get an email from Google).
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
                <label htmlFor="friends-name" className="block text-text-subtle text-sm mb-1">
                  Name *
                </label>
                <input
                  id="friends-name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full bg-background border border-border rounded-lg px-3 py-2 text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-border"
                />
              </div>
              <div>
                <label htmlFor="friends-email" className="block text-text-subtle text-sm mb-1">
                  Email (optional)
                </label>
                <input
                  id="friends-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="w-full bg-background border border-border rounded-lg px-3 py-2 text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-border"
                />
              </div>
              <div>
                <label htmlFor="friends-message" className="block text-text-subtle text-sm mb-1">
                  What’s this about? (optional)
                </label>
                <textarea
                  id="friends-message"
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
          ) : showGame ? (
            <motion.div
              key="game"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              {/* Sky, clouds, ground — runner fixed, background scrolls */}
              <div
                className="relative h-28 rounded-lg border border-border overflow-hidden"
                style={{
                  background: "linear-gradient(180deg, #E8E9EC 0%, #E0E2E6 60%, #D8DADE 100%)",
                }}
              >
                {/* Scrolling layer: ground + clouds */}
                <motion.div
                  className="absolute inset-0"
                  style={{ width: "400%" }}
                  animate={{ x: -scrollOffset }}
                  transition={{
                    duration: scrollOffset === SCROLL_STEP ? RUN_DURATION : SCROLL_DURATION,
                    ease: "linear",
                  }}
                >
                  {/* Ground line */}
                  <div className="absolute bottom-8 left-0 right-0 h-0.5 bg-border/80" />
                  {/* Clouds */}
                  <div className="absolute top-4 left-[8%] w-12 h-5 rounded-full bg-white/50" />
                  <div className="absolute top-6 left-[28%] w-8 h-4 rounded-full bg-white/40" />
                  <div className="absolute top-3 left-[48%] w-14 h-6 rounded-full bg-white/50" />
                  <div className="absolute top-5 left-[68%] w-10 h-4 rounded-full bg-white/40" />
                  <div className="absolute top-4 left-[88%] w-11 h-5 rounded-full bg-white/50" />
                  <div className="absolute top-6 left-[108%] w-9 h-4 rounded-full bg-white/40" />
                  <div className="absolute top-3 left-[128%] w-12 h-5 rounded-full bg-white/50" />
                  <div className="absolute top-5 left-[148%] w-10 h-4 rounded-full bg-white/40" />
                </motion.div>

                {/* Runner: fixed position, subtle run-in-place */}
                <motion.div
                  className="absolute bottom-7 left-12 w-10 h-10 flex items-center justify-center z-10"
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    className="scale-125"
                  >
                    <ellipse cx="16" cy="18" rx="8" ry="6" fill="#4A4A4F" />
                    <circle cx="16" cy="10" r="5" fill="#4A4A4F" />
                    <rect x="8" y="22" width="4" height="6" rx="1" fill="#4A4A4F" />
                    <rect x="20" y="22" width="4" height="6" rx="1" fill="#4A4A4F" />
                    <ellipse cx="22" cy="9" rx="2" ry="1.5" fill="#111" />
                  </svg>
                </motion.div>

                {hasNextSlot && (
                  <button
                    type="button"
                    onClick={goToNextSlot}
                    className="absolute right-4 bottom-4 text-text-subtle text-[8px] md:text-[10px] hover:text-text-primary transition-colors z-10"
                  >
                    next slot →
                  </button>
                )}
              </div>

              <AnimatePresence mode="wait">
                {gameArrived && advancingToNextSlot && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="rounded-xl bg-elevated border border-border p-6 flex items-center justify-center min-h-[200px]"
                  >
                    <LoadingDuck />
                  </motion.div>
                )}
                {gameArrived && !advancingToNextSlot && displayedSlot && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    key={currentSlotIndex}
                    className="rounded-xl bg-elevated border border-border p-6 text-center space-y-4"
                  >
                    <p className="text-text-primary text-sm font-medium">
                      Next up
                    </p>
                    <p className="text-text-primary font-medium text-lg">
                      {displayedSlot.startLocal}
                    </p>
                    <p className="text-text-subtle text-sm">to {displayedSlot.endLocal.split(", ").pop()}</p>
                    <div className="flex flex-wrap gap-3 justify-center pt-2">
                      <button
                        type="button"
                        onClick={() => setSelected(displayedSlot)}
                        className="px-4 py-2.5 rounded-lg bg-text-primary text-background text-sm font-medium hover:opacity-90 transition-opacity"
                      >
                        Take this slot
                      </button>
                      {hasNextSlot && (
                        <button
                          type="button"
                          onClick={goToNextSlot}
                          className="px-4 py-2.5 rounded-lg border border-border text-text-subtle text-sm hover:bg-elevated transition-colors"
                        >
                          Next slot →
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => setShowFullSchedule(true)}
                        className="px-4 py-2.5 rounded-lg border border-border text-text-subtle text-sm hover:bg-elevated transition-colors"
                      >
                        Show all times
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : showFullSchedule && grouped && grouped.size > 0 ? (
            <motion.div
              key="slots"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              <div className="flex justify-between items-center">
                <p className="text-text-subtle text-sm">Pick any time</p>
                <button
                  type="button"
                  onClick={() => setShowFullSchedule(false)}
                  className="text-text-subtle text-sm hover:text-text-primary transition-colors"
                >
                  ← Back to game
                </button>
              </div>
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
              No open slots in the next 3 days. Check back later.
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
