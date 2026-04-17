"use client";

import { useEffect, useState } from "react";
import DuskScene from "./DuskScene";

export default function DuskBackdrop() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <div className="dusk-backdrop" aria-hidden="true">
      <DuskScene
        activePortal={null}
        onEnter={() => {}}
        showOrb={false}
        showPortals={false}
        reducedMotion={reducedMotion}
      />
    </div>
  );
}
