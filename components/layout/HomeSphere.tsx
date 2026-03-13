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
          "0 2px 6px rgba(0,0,0,0.12)",
          "0 3px 10px rgba(0,0,0,0.18)",
          "0 2px 6px rgba(0,0,0,0.12)",
        ],
      }}
      transition={{
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 },
        boxShadow: {
          duration: 4,
          ease: "easeInOut",
          repeat: Infinity,
        },
      }}
      whileHover={{
        scale: 1.15,
        boxShadow: "0 4px 12px rgba(0,0,0,0.22)",
      }}
      whileTap={{
        scale: 0.9,
        boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
      }}
      className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full cursor-pointer"
      style={{
        background: "radial-gradient(circle, #E5E5E7 0%, #E5E5E7 50%, #D5D5D7 100%)",
      }}
    />
  );
}
