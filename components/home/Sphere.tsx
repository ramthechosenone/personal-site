"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";

interface SphereProps {
  onNavigateLeft?: () => void;
  onNavigateRight?: () => void;
  onHighlightChange?: (side: "left" | "right" | null) => void;
  isWorkHovered?: boolean;
}

export default function Sphere({ onNavigateLeft, onNavigateRight, onHighlightChange, isWorkHovered = false }: SphereProps) {
  const router = useRouter();
  const [highlightedSide, setHighlightedSide] = useState<"left" | "right" | null>(null);
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-200, 0, 200], [0.5, 1, 0.5]);

  const handleDragEnd = (_: any, info: { offset: { x: number; y: number } }) => {
    const threshold = 100;
    if (info.offset.x < -threshold) {
      if (onNavigateLeft) {
        onNavigateLeft();
      } else {
        router.push("/personal");
      }
    } else if (info.offset.x > threshold) {
      if (onNavigateRight) {
        onNavigateRight();
      } else {
        router.push("/work");
      }
    }
    x.set(0);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        const newSide = "left";
        setHighlightedSide(newSide);
        onHighlightChange?.(newSide);
      } else if (e.key === "ArrowRight") {
        const newSide = "right";
        setHighlightedSide(newSide);
        onHighlightChange?.(newSide);
      } else if (e.key === "Enter" && highlightedSide) {
        if (highlightedSide === "left") {
          router.push("/personal");
        } else {
          router.push("/work");
        }
        setHighlightedSide(null);
        onHighlightChange?.(null);
      } else if (e.key === "Escape") {
        setHighlightedSide(null);
        onHighlightChange?.(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [highlightedSide, router, onHighlightChange]);

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
      style={{
        x,
        opacity,
        background: "radial-gradient(circle, #E5E5E7 0%, #E5E5E7 50%, #D5D5D7 100%)",
        width: "min(60vw, 60vh)",
        height: "min(60vw, 60vh)",
      }}
      animate={{
        borderRadius: isWorkHovered ? "12px" : "50%",
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      className="
        shadow-[0_4px_12px_rgba(0,0,0,0.15)]
        cursor-grab active:cursor-grabbing
        select-none
      "
      whileHover={{
        scale: 1.05,
        boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
      }}
      whileTap={{
        scale: 0.98,
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      }}
    />
  );
}

