"use client";

import { ReactNode } from "react";
import DuskBackdrop from "@/components/home/DuskBackdrop";

interface SiteShellProps {
  children: ReactNode;
  className?: string;
  backdrop?: boolean;
}

export default function SiteShell({ children, className = "", backdrop = false }: SiteShellProps) {
  return (
    <div className={`min-h-screen relative ${className}`}>
      {backdrop && <DuskBackdrop />}
      {children}
    </div>
  );
}
