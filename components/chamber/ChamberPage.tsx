"use client";

import { CSSProperties, ReactNode, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ChamberScene from "./ChamberScene";
import { AlcoveGrid, AlcoveSection } from "./AlcoveGrid";
import { CairnGrid } from "./CairnGrid";
import { TerminalGrid } from "./TerminalGrid";

const EXIT_DURATION_MS = 750;

type Mote = {
  id: number;
  left: number;
  bottom: number;
  dx: number;
  dy: number;
  dur: number;
  size: number;
  born: number;
};

type Props = {
  nameTagSuffix: string;
  breadcrumb: string;
  sections: AlcoveSection[];
  enterAnimation?: boolean;
  gridVariant?: "alcove" | "cairn" | "terminal";
  children?: ReactNode;
};

export default function ChamberPage({
  nameTagSuffix,
  breadcrumb,
  sections,
  enterAnimation = true,
  gridVariant = "alcove",
  children,
}: Props) {
  const router = useRouter();
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [orbGaze, setOrbGaze] = useState({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [motes, setMotes] = useState<Mote[]>([]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const onMove = (e: MouseEvent) => {
      const cx = e.clientX / window.innerWidth - 0.5;
      const cy = e.clientY / window.innerHeight - 0.5;
      setParallax({ x: cx, y: cy });
      setOrbGaze({ x: cx * 10, y: cy * 6 });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;
    let id = 0;
    const iv = window.setInterval(() => {
      setMotes((ms) => {
        const now = Date.now();
        const fresh = ms.filter((m) => now - m.born < m.dur);
        if (fresh.length < 14) {
          fresh.push({
            id: id++,
            left: 38 + Math.random() * 24,
            bottom: 10 + Math.random() * 25,
            dx: (Math.random() - 0.5) * 90,
            dy: -120 - Math.random() * 180,
            dur: 6500 + Math.random() * 5000,
            size: 2 + Math.random() * 2,
            born: now,
          });
        }
        return fresh;
      });
    }, 520);
    return () => window.clearInterval(iv);
  }, [reducedMotion]);

  const onBack = useCallback(() => {
    if (exiting) return;
    if (reducedMotion) {
      router.push("/");
      return;
    }
    setExiting(true);
    window.setTimeout(() => router.push("/"), EXIT_DURATION_MS);
  }, [exiting, reducedMotion, router]);

  return (
    <div
      className={`chamber-stage ${enterAnimation && !exiting ? "chamber-enter" : ""} ${
        exiting ? "exiting" : ""
      }`}
    >
      <ChamberScene parallax={parallax} orbGaze={orbGaze} onDoorwayClick={onBack} />

      <div className="chamber-warm-veil" aria-hidden="true" />

      <div className="chrome">
        <div className="name-tag">
          <span className="dot" />
          <span>SRIRAM DEVARAPU</span>
          <span style={{ opacity: 0.4, margin: "0 6px" }}>/</span>
          <span style={{ opacity: 0.7 }}>{nameTagSuffix}</span>
        </div>

        <div className="breadcrumb">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onBack();
            }}
          >
            HOME
          </a>
          <span className="sep">—</span>
          <span>{breadcrumb.toUpperCase()}</span>
        </div>

        <nav className="corner-nav">
          <a href="mailto:srirampdevarapu@gmail.com">CONTACT</a>
        </nav>

        <button
          type="button"
          className="chamber-back"
          onClick={onBack}
          aria-label="Back to home"
        >
          ← HOME
        </button>
      </div>

      {gridVariant === "cairn" ? (
        <CairnGrid sections={sections} />
      ) : gridVariant === "terminal" ? (
        <TerminalGrid sections={sections} />
      ) : (
        <AlcoveGrid sections={sections} />
      )}

      {children}

      {motes.map((m) => (
        <span
          key={m.id}
          className="mote"
          style={
            {
              left: `${m.left}%`,
              bottom: `${m.bottom}%`,
              width: m.size,
              height: m.size,
              animationDuration: `${m.dur}ms`,
              "--dx": `${m.dx}px`,
              "--dy": `${m.dy}px`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
