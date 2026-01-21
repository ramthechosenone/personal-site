"use client";

import { ReactNode } from "react";

interface SiteShellProps {
  children: ReactNode;
  className?: string;
}

export default function SiteShell({ children, className = "" }: SiteShellProps) {
  return (
    <div className={`min-h-screen ${className}`}>
      {children}
    </div>
  );
}

