"use client";

import { ReactNode, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PillKeyProps {
  label: string;
  children?: ReactNode;
  onClick?: () => void;
  illustration?: ReactNode;
  variant?: "pill" | "box";
}

export default function PillKey({ label, children, onClick, illustration, variant = "pill" }: PillKeyProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div className="w-full">
      <motion.button
        onClick={handleClick}
        className={`
          w-full bg-elevated border border-border
          ${variant === "pill" ? "rounded-full" : "rounded-none"}
          px-6 py-3 text-left relative overflow-hidden
          shadow-[0_1px_3px_rgba(0,0,0,0.08)]
          cursor-pointer select-none
          ${illustration ? "pr-20" : ""}
        `}
        whileHover={{
          y: -2,
          boxShadow: "0 4px 8px rgba(0,0,0,0.12)",
        }}
        whileTap={{
          y: 0,
          boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
          backgroundColor: "#D5D5D7",
        }}
      >
        <span className="text-text-primary font-medium">{label}</span>
        {illustration && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            {illustration}
          </span>
        )}
      </motion.button>
      {children && (
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pt-4 px-6 pb-4 text-text-subtle">
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

