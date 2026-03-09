"use client";

import { useRouter } from "next/navigation";
import KeyCard from "@/components/common/KeyCard";

interface BackButtonProps {
  circular?: boolean;
  to?: string;
}

export default function BackButton({ circular = false, to }: BackButtonProps) {
  const router = useRouter();

  const shapeClass = circular ? "rounded-full" : "rounded-lg";
  const sizeClass = circular ? "w-12 h-12 flex items-center justify-center p-0" : "px-4 py-2";

  return (
    <nav className="flex gap-2 p-4 justify-center">
      <KeyCard
        onClick={() => router.push(to ?? "/")}
        className={`${sizeClass} text-sm ${shapeClass}`}
      >
        ←
      </KeyCard>
    </nav>
  );
}


