"use client";

import { motion } from "framer-motion";

/**
 * Duck at a computer — used while fetching schedule availability.
 * Top/head is orange.
 */
export default function LoadingDuck() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-12"
      aria-hidden
    >
      <motion.div
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          width="80"
          height="56"
          viewBox="0 0 80 56"
          fill="none"
          className="block"
        >
          {/* Monitor */}
          <rect x="24" y="8" width="32" height="22" rx="2" fill="#E5E5E7" stroke="#D2D2D6" strokeWidth="1" />
          <rect x="28" y="12" width="24" height="14" rx="1" fill="#D8DADE" />
          <motion.rect
            x="36"
            y="16"
            width="8"
            height="6"
            rx="1"
            fill="#4A4A4F"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
          <rect x="38" y="30" width="4" height="6" fill="#D2D2D6" />

          {/* Duck: body grey, head (top) orange */}
          <ellipse cx="44" cy="48" rx="12" ry="6" fill="#4A4A4F" />
          <circle cx="44" cy="38" r="10" fill="#f97316" />
          <ellipse cx="52" cy="36" rx="5" ry="3" fill="#eab308" />
          <circle cx="48" cy="35" r="2" fill="#111" />
        </svg>
      </motion.div>
      <motion.p
        className="text-text-subtle text-xs mt-4"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        fetching…
      </motion.p>
    </motion.div>
  );
}
