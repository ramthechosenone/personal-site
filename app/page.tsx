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
          <h1 className="text-3xl font-medium text-text-primary mb-2">
            Sriram Devarapu
          </h1>
          <p className="text-text-subtle">
            Software engineer · building things with minimal noise
          </p>
        </motion.div>

        <div className="relative flex items-center justify-center w-full max-w-2xl">
          {/* Left hint */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute left-0 md:left-8 top-1/2 -translate-y-1/2 z-10"
          >
            <motion.button
              onClick={() => router.push("/personal")}
              onMouseEnter={() => setIsWorkHovered(false)}
              onMouseLeave={() => setIsWorkHovered(false)}
              className={`text-sm md:text-base transition-colors relative z-10 ${
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

          {/* Sphere */}
          <Sphere
            onNavigateLeft={() => router.push("/personal")}
            onNavigateRight={() => router.push("/work")}
            onHighlightChange={setHighlightedSide}
            isWorkHovered={isWorkHovered}
          />

          {/* Right hint */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute right-0 md:right-8 top-1/2 -translate-y-1/2 z-10"
          >
            <motion.button
              onClick={() => router.push("/work")}
              onMouseEnter={() => setIsWorkHovered(true)}
              onMouseLeave={() => setIsWorkHovered(false)}
              className={`text-sm md:text-base transition-colors relative z-10 ${
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

