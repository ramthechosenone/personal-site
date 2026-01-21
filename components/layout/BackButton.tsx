"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import KeyCard from "@/components/common/KeyCard";

interface BackButtonProps {
  circular?: boolean;
}

export default function BackButton({ circular = false }: BackButtonProps) {
  const router = useRouter();

  const shapeClass = circular ? "rounded-full" : "rounded-lg";
  const sizeClass = circular ? "w-12 h-12 flex items-center justify-center p-0" : "px-4 py-2";

  return (
    <nav className="flex gap-2 p-4 justify-center">
      <KeyCard
        onClick={() => router.push("/")}
        className={`${sizeClass} text-sm ${shapeClass}`}
      >
        ←
      </KeyCard>
    </nav>
  );
}


