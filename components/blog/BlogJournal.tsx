"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import KeyCard from "@/components/common/KeyCard";
import BlogMarkdown from "@/components/blog/BlogMarkdown";

interface Chapter {
  id: string;
  number: number;
  title: string;
  content: string;
}

interface BlogJournalProps {
  intro: string;
  chapters: Chapter[];
}

export default function BlogJournal({ intro, chapters }: BlogJournalProps) {
  const [activeChapter, setActiveChapter] = useState(0);

  if (chapters.length === 0) {
    return <BlogMarkdown content={intro} />;
  }

  const current = chapters[activeChapter];
  const prev = activeChapter > 0 ? chapters[activeChapter - 1] : null;
  const next = activeChapter < chapters.length - 1 ? chapters[activeChapter + 1] : null;

  return (
    <div className="md:grid md:grid-cols-[280px_1fr] md:gap-8">
      {/* Desktop sidebar */}
      <aside className="hidden md:block">
        <div className="sticky top-8">
          <p className="text-xs text-text-subtle uppercase tracking-wider mb-1">
            Build Journal
          </p>
          <p className="text-xs text-text-subtle mb-4">Chapter by chapter</p>
          <div className="space-y-2">
            {chapters.map((ch, i) => (
              <motion.div
                key={ch.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.25 }}
              >
                <KeyCard
                  onClick={() => setActiveChapter(i)}
                  isActive={i === activeChapter}
                  className="rounded-lg px-3 py-2"
                >
                  <p className="text-xs text-text-subtle">
                    Chapter {ch.number}
                  </p>
                  <p className="text-sm font-medium truncate">{ch.title}</p>
                </KeyCard>
              </motion.div>
            ))}
          </div>
        </div>
      </aside>

      {/* Mobile pill bar */}
      <div className="md:hidden sticky top-0 z-10 bg-background pb-3 pt-1 -mx-4 px-4 overflow-x-auto">
        <div className="flex gap-2">
          {chapters.map((ch, i) => (
            <button
              key={ch.id}
              onClick={() => setActiveChapter(i)}
              className={`
                flex-shrink-0 w-9 h-9 rounded-full text-sm font-medium
                border transition-colors duration-150
                ${
                  i === activeChapter
                    ? "bg-accent text-white border-accent"
                    : "bg-elevated text-text-primary border-border hover:bg-[#D5D5D7]"
                }
              `}
            >
              {ch.number}
            </button>
          ))}
        </div>
      </div>

      {/* Chapter content */}
      <main className="min-w-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            <h2 className="text-2xl font-semibold mb-6">
              Chapter {current.number}: {current.title}
            </h2>
            <BlogMarkdown content={current.content} />

            {/* Prev / Next navigation */}
            <div className="flex gap-4 mt-12 mb-8">
              {prev ? (
                <KeyCard
                  onClick={() => setActiveChapter(activeChapter - 1)}
                  className="rounded-lg px-4 py-3 flex-1"
                >
                  <p className="text-xs text-text-subtle">← Previous</p>
                  <p className="text-sm font-medium truncate">{prev.title}</p>
                </KeyCard>
              ) : (
                <div className="flex-1" />
              )}
              {next ? (
                <KeyCard
                  onClick={() => setActiveChapter(activeChapter + 1)}
                  className="rounded-lg px-4 py-3 flex-1 text-right"
                >
                  <p className="text-xs text-text-subtle">Next →</p>
                  <p className="text-sm font-medium truncate">{next.title}</p>
                </KeyCard>
              ) : (
                <div className="flex-1" />
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
