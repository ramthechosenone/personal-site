"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface KeyCardProps {
  children: ReactNode;
  onClick?: () => void;
  isActive?: boolean;
  className?: string;
}

export default function KeyCard({
  children,
  onClick,
  isActive = false,
  className = "",
}: KeyCardProps) {
  return (
    <motion.div
      onClick={onClick}
      className={`
        bg-elevated border border-border
        cursor-pointer select-none
        ${isActive ? "shadow-sm" : "shadow-[0_1px_3px_rgba(0,0,0,0.08)]"}
        ${onClick ? "" : "cursor-default"}
        ${className}
      `}
      whileHover={onClick ? {
        y: -2,
        boxShadow: "0 4px 8px rgba(0,0,0,0.12)",
      } : {}}
      whileTap={onClick ? {
        y: 0,
        boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
        backgroundColor: "#D5D5D7",
      } : {}}
      animate={isActive ? {
        backgroundColor: "#D5D5D7",
        boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
      } : {
        backgroundColor: "#E5E5E7",
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
      }}
      transition={{ duration: 0.15 }}
    >
      {children}
    </motion.div>
  );
}

