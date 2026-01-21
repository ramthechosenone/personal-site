"use client";

import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import KeyCard from "@/components/common/KeyCard";

interface KeyNavProps {
  activeKey?: "home" | "personal" | "work";
  circular?: boolean;
}

export default function KeyNav({ activeKey, circular = false }: KeyNavProps) {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (key: "home" | "personal" | "work") => {
    if (activeKey) return activeKey === key;
    if (key === "home") return pathname === "/";
    if (key === "personal") return pathname === "/personal";
    if (key === "work") return pathname === "/work";
    return false;
  };

  const shapeClass = circular ? "rounded-full" : "rounded-lg";
  const paddingClass = circular ? "p-0" : "px-4 py-2";
  const sizeClass = circular ? "w-12 h-12 flex items-center justify-center" : "";

  return (
    <nav className="flex gap-2 p-4 justify-center">
      <KeyCard
        onClick={() => router.push("/")}
        isActive={isActive("home")}
        className={`${paddingClass} ${sizeClass} text-sm ${shapeClass}`}
      >
        esc
      </KeyCard>
      <KeyCard
        onClick={() => router.push("/personal")}
        isActive={isActive("personal")}
        className={`${paddingClass} ${sizeClass} text-sm ${shapeClass}`}
      >
        personal
      </KeyCard>
      <KeyCard
        onClick={() => router.push("/work")}
        isActive={isActive("work")}
        className={`${paddingClass} ${sizeClass} text-sm ${shapeClass}`}
      >
        work
      </KeyCard>
    </nav>
  );
}

