"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SiteShell from "@/components/layout/SiteShell";
import Sphere from "@/components/home/Sphere";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();
  const [highlightedSide, setHighlightedSide] = useState<"left" | "right" | null>(null);
  const [isWorkHovered, setIsWorkHovered] = useState(false);

  return (
    <SiteShell>
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-medium text-text-primary mb-4">
            Sriram Devarapu
          </h1>
          <motion.button
            onClick={() => router.push("/schedule")}
            className="text-text-subtle text-sm hover:text-text-primary transition-colors underline underline-offset-2"
          >
            Schedule a time with me
          </motion.button>
        </motion.div>

        <div className="relative flex items-center justify-center gap-6 md:gap-10">
          {/* Left hint */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="z-10 shrink-0"
          >
            <motion.button
              onClick={() => router.push("/personal")}
              onMouseEnter={() => setIsWorkHovered(false)}
              onMouseLeave={() => setIsWorkHovered(false)}
              className={`text-sm md:text-base transition-colors ${
                highlightedSide === "left"
                  ? "text-text-primary font-medium"
                  : "text-text-subtle hover:text-text-primary"
              }`}
              animate={highlightedSide === "left" ? { scale: 1.1 } : { scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              Personal
            </motion.button>
          </motion.div>

          {/* Sphere wrapper for relative positioning of drag hint */}
          <div className="relative shrink-0">
            <Sphere
              onNavigateLeft={() => router.push("/personal")}
              onNavigateRight={() => router.push("/work")}
              onHighlightChange={setHighlightedSide}
              isWorkHovered={isWorkHovered}
            />

            {/* Drag hint */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ duration: 4, delay: 1.5, times: [0, 0.1, 0.7, 1] }}
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-text-subtle text-xs pointer-events-none whitespace-nowrap"
            >
              drag or tap to explore
            </motion.p>
          </div>

          {/* Right hint */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="z-10 shrink-0"
          >
            <motion.button
              onClick={() => router.push("/work")}
              onMouseEnter={() => setIsWorkHovered(true)}
              onMouseLeave={() => setIsWorkHovered(false)}
              className={`text-sm md:text-base transition-colors ${
                highlightedSide === "right"
                  ? "text-text-primary font-medium"
                  : "text-text-subtle hover:text-text-primary"
              }`}
              animate={highlightedSide === "right" ? { scale: 1.1 } : { scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              Work
            </motion.button>
          </motion.div>
        </div>
      </div>
    </SiteShell>
  );
}

