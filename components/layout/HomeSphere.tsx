"use client";

import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function HomeSphere() {
  const pathname = usePathname();
  const router = useRouter();

  // Don't show on the home page — the real sphere is already there
  if (pathname === "/") return null;

  return (
    <motion.button
      onClick={() => router.push("/")}
      aria-label="Go home"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{
        opacity: 1,
        scale: 1,
        boxShadow: [
          "0 2px 8px rgba(0,0,0,0.10), 0 0 12px rgba(0,0,0,0.06)",
          "0 4px 16px rgba(0,0,0,0.22), 0 0 24px rgba(0,0,0,0.10)",
          "0 2px 8px rgba(0,0,0,0.10), 0 0 12px rgba(0,0,0,0.06)",
        ],
      }}
      transition={{
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 },
        boxShadow: {
          duration: 3,
          ease: "easeInOut",
          repeat: Infinity,
        },
      }}
      whileHover={{
        scale: 1.12,
        boxShadow: "0 4px 20px rgba(0,0,0,0.28), 0 0 30px rgba(0,0,0,0.12)",
      }}
      whileTap={{
        scale: 0.92,
        boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
      }}
      className="fixed top-5 left-5 z-50 flex items-center gap-2 rounded-full cursor-pointer px-3 py-1.5"
      style={{
        background: "radial-gradient(circle, #E5E5E7 0%, #E5E5E7 50%, #D5D5D7 100%)",
      }}
    >
      <span
        className="w-5 h-5 rounded-full shrink-0"
        style={{
          background: "radial-gradient(circle, #F0F0F2 0%, #D5D5D7 100%)",
        }}
      />
      <span className="text-text-subtle text-xs font-medium tracking-wide">
        home
      </span>
    </motion.button>
  );
}
