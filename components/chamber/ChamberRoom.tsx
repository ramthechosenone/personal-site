"use client";

import { CSSProperties, ReactNode, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ChamberScene from "./ChamberScene";

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
  wordmark: string;
  backTo: string;
  children?: ReactNode;
};

const EXIT_DURATION_MS = 750;

export default function ChamberRoom({ wordmark, backTo, children }: Props) {
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
        if (fresh.length < 10) {
          fresh.push({
            id: id++,
            left: 38 + Math.random() * 24,
            bottom: 10 + Math.random() * 20,
            dx: (Math.random() - 0.5) * 90,
            dy: -120 - Math.random() * 180,
            dur: 6500 + Math.random() * 5000,
            size: 2 + Math.random() * 2,
            born: now,
          });
        }
        return fresh;
      });
    }, 620);
    return () => window.clearInterval(iv);
  }, [reducedMotion]);

  const onExit = useCallback(() => {
    if (exiting) return;
    if (reducedMotion) {
      router.push(backTo);
      return;
    }
    setExiting(true);
    window.setTimeout(() => router.push(backTo), EXIT_DURATION_MS);
  }, [exiting, reducedMotion, router, backTo]);

  return (
    <div
      className={`chamber-stage chamber-room ${!exiting ? "chamber-enter" : ""} ${
        exiting ? "exiting" : ""
      }`}
    >
      <ChamberScene
        parallax={parallax}
        orbGaze={orbGaze}
        showOrb={false}
        onDoorwayClick={onExit}
      />

      <div className="chamber-warm-veil" aria-hidden="true" />

      <h1 className="gallery-title-mono">{wordmark}</h1>

      <button
        className="room-back"
        onClick={onExit}
        aria-label="Back to chamber"
      >
        <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
          <path
            d="M10 3 L5 8 L10 13"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

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
