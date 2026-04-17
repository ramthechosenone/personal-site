"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import DuskScene from "./DuskScene";

type Target = "personal" | "work";

const ZOOM_ORIGIN: Record<Target, { x: number; y: number }> = {
  personal: { x: 22, y: 52 },
  work: { x: 78, y: 52 },
};

const ZOOM_DURATION_MS = 750;

export default function LandingStage() {
  const router = useRouter();
  const stageRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [zooming, setZooming] = useState<Target | null>(null);
  const [time, setTime] = useState<string>(() =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );

  useEffect(() => {
    router.prefetch("/work");
    router.prefetch("/personal");
  }, [router]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const iv = window.setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    }, 30000);
    return () => window.clearInterval(iv);
  }, []);

  const enter = useCallback(
    (which: Target) => {
      if (zooming) return;
      const target = which === "work" ? "/work" : "/personal";
      if (reducedMotion) {
        router.push(target);
        return;
      }
      const origin = ZOOM_ORIGIN[which];
      const stage = stageRef.current;
      if (stage) {
        stage.style.setProperty("--zoom-x", `${origin.x}%`);
        stage.style.setProperty("--zoom-y", `${origin.y}%`);
      }
      setZooming(which);
      window.setTimeout(() => {
        router.push(target);
      }, ZOOM_DURATION_MS);
    },
    [router, zooming, reducedMotion]
  );

  return (
    <div ref={stageRef} className={`stage ${zooming ? "zooming" : ""}`} data-screen-label="Landing">
      <DuskScene
        activePortal={zooming}
        onEnter={enter}
        reducedMotion={reducedMotion}
      />

      <div className="portal-warm-veil" aria-hidden="true" />

      <div className="chrome">
        <div className="name-tag">
          <span className="dot" />
          <span>SRIRAM DEVARAPU</span>
          <span style={{ opacity: 0.4, margin: "0 6px" }}>/</span>
          <span style={{ opacity: 0.7 }}>Software engineer. Quiet maker.</span>
        </div>

        <nav className="corner-nav">
          <a href="mailto:srirampdevarapu@gmail.com">CONTACT</a>
        </nav>

        <div className="hint">HOVER · ENTER · EXPLORE</div>

        <div className="footer-strip">
          <div className="meta">
            <span>{time.toUpperCase()}</span>
            <span>SF · CA</span>
          </div>
          <div className="meta">
            <span>PORTFOLIO / v2026</span>
          </div>
        </div>
      </div>
    </div>
  );
}
