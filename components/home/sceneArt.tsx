"use client";

import { CSSProperties, useEffect, useMemo, useState } from "react";

const SIL = "oklch(0.30 0.05 275)";
const KALAMKARI = "oklch(0.52 0.11 35)";
const TAXI = "oklch(0.88 0.18 75)";
const SNOW = "oklch(0.86 0.02 260)";

/* ── Rainier — broad stratovolcano silhouette ── */
export function RainierPeak({ x, baseY, w, h, snow = true }: { x: number; baseY: number; w: number; h: number; snow?: boolean }) {
  const W = Math.max(w, h * 2.3);
  const L = x - W / 2;
  const R = x + W / 2;
  const T = baseY - h;
  const libertyCapX = x - W * 0.14;
  const libertyCapY = T + h * 0.08;
  const summitL = x - W * 0.06;
  const summitR = x + W * 0.06;
  const tahomaBaseX = x + W * 0.22;
  const tahomaBaseY = baseY - h * 0.55;
  const tahomaTipX = x + W * 0.27;
  const tahomaTipY = baseY - h * 0.78;
  const tahomaEndX = x + W * 0.30;

  const body = `M ${L} ${baseY}
    Q ${L + W * 0.18} ${baseY - h * 0.18} ${x - W * 0.34} ${baseY - h * 0.42}
    Q ${x - W * 0.24} ${baseY - h * 0.60} ${x - W * 0.19} ${baseY - h * 0.78}
    L ${libertyCapX - 6} ${libertyCapY + 8}
    L ${libertyCapX} ${libertyCapY}
    L ${libertyCapX + 8} ${libertyCapY + 4}
    Q ${x - W * 0.08} ${T + h * 0.05} ${summitL} ${T + 2}
    L ${summitR} ${T + 2}
    Q ${x + W * 0.10} ${T + h * 0.08} ${x + W * 0.14} ${baseY - h * 0.72}
    L ${x + W * 0.18} ${baseY - h * 0.60}
    L ${tahomaBaseX} ${tahomaBaseY}
    L ${tahomaTipX}  ${tahomaTipY}
    L ${tahomaEndX}  ${baseY - h * 0.55}
    Q ${x + W * 0.40} ${baseY - h * 0.30} ${x + W * 0.42} ${baseY - h * 0.22}
    Q ${R - W * 0.10} ${baseY - h * 0.10} ${R} ${baseY} Z`;

  return (
    <g>
      <path d={body} fill={SIL} />
      <path
        d={`M ${summitR - 2} ${T + 4} Q ${x + W * 0.10} ${baseY - h * 0.45} ${x + W * 0.14} ${baseY - h * 0.20}`}
        stroke="oklch(0.26 0.05 285)"
        strokeWidth="1.2"
        fill="none"
        opacity="0.55"
      />
      {snow && (
        <>
          <path
            d={`M ${libertyCapX - 4} ${libertyCapY + 10} L ${libertyCapX} ${libertyCapY} L ${libertyCapX + 8} ${libertyCapY + 4}
                Q ${x - W * 0.08} ${T + h * 0.06} ${summitL} ${T + 2} L ${summitR} ${T + 2}
                Q ${x + W * 0.09} ${T + h * 0.10} ${x + W * 0.12} ${baseY - h * 0.70}
                L ${x + W * 0.09} ${baseY - h * 0.62} L ${x + W * 0.05} ${baseY - h * 0.52}
                L ${x - W * 0.01} ${baseY - h * 0.56} L ${x - W * 0.06} ${baseY - h * 0.48}
                L ${x - W * 0.11} ${baseY - h * 0.54} L ${x - W * 0.16} ${baseY - h * 0.50}
                L ${x - W * 0.20} ${baseY - h * 0.60} Z`}
            fill={SNOW}
            opacity="0.94"
          />
          <path
            d={`M ${tahomaBaseX + 1} ${tahomaBaseY + 2} L ${tahomaTipX} ${tahomaTipY}
                L ${tahomaTipX + 1} ${tahomaTipY + 4} L ${tahomaBaseX + 3} ${tahomaBaseY + 5} Z`}
            fill={SNOW}
            opacity="0.85"
          />
        </>
      )}
    </g>
  );
}

/* ── Dallas skyline ── */
export function DallasSkyline({ x, baseY, w }: { x: number; baseY: number; w: number }) {
  const col = SIL;
  return (
    <g>
      <rect x={x + w * 0.05} y={baseY - 28} width={11} height={28} fill={col} />
      {[0.4, 0.6].map((_, i) => (
        <rect key={i} x={x + w * 0.05 + 3} y={baseY - 28 + 8 + i * 6} width={5} height={2} fill="oklch(0.82 0.1 75)" opacity="0.45" />
      ))}
      <rect x={x + w * 0.22} y={baseY - 44} width={13} height={44} fill={col} />
      <rect x={x + w * 0.22 + 6} y={baseY - 50} width={1} height={6} fill={col} />
      {[0.3, 0.45, 0.6, 0.75].map((_, i) => (
        <rect key={i} x={x + w * 0.22 + 3} y={baseY - 44 + 10 + i * 7} width={7} height={2} fill="oklch(0.82 0.1 75)" opacity="0.35" />
      ))}
      <rect x={x + w * 0.42} y={baseY - 36} width={10} height={36} fill={col} />
      <path d={`M ${x + w * 0.42} ${baseY - 36} L ${x + w * 0.42 + 10} ${baseY - 36} L ${x + w * 0.42 + 10} ${baseY - 32} L ${x + w * 0.42} ${baseY - 28} Z`} fill={col} />
      {(() => {
        const rtX = x + w * 0.67;
        const rtBase = baseY;
        const shaftH = 40;
        const shaftW = 3;
        const ballR = 6;
        const ballCy = rtBase - shaftH - ballR + 1;
        return (
          <g>
            <rect x={rtX - shaftW / 2} y={rtBase - shaftH} width={shaftW} height={shaftH} fill={col} />
            <rect x={rtX - shaftW} y={rtBase - 3} width={shaftW * 2} height={3} fill={col} />
            <circle cx={rtX} cy={ballCy} r={ballR} fill={col} />
            {[[-2, -2], [2, -2], [0, 0], [-3, 1], [3, 1], [-1, 3], [2, 3]].map(([dx, dy], i) => (
              <circle key={i} cx={rtX + dx} cy={ballCy + dy} r="0.9" fill="oklch(0.85 0.1 75)" opacity="0.55" />
            ))}
          </g>
        );
      })()}
      <rect x={x + w * 0.83} y={baseY - 24} width={9} height={24} fill={col} />
      {[0.35, 0.6].map((_, i) => (
        <rect key={i} x={x + w * 0.83 + 2} y={baseY - 24 + 8 + i * 6} width={5} height={2} fill="oklch(0.82 0.1 75)" opacity="0.3" />
      ))}
    </g>
  );
}

/* ── Gopuram (Chennai temple tower) ── */
export function Gopuram({ x, baseY, w, h }: { x: number; baseY: number; w: number; h: number }) {
  const cx = x + w / 2;
  const baseT = baseY - 18;
  const topW = w * 0.28;
  const tipY = baseY - h;
  const steps = 5;
  const pts: { lx: number; rx: number; y: number }[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const lx = cx - (w / 2 - ((w - topW) / 2) * t);
    const rx = cx + (w / 2 - ((w - topW) / 2) * t);
    const y = baseT - t * (baseT - tipY);
    pts.push({ lx, rx, y });
  }
  let d = `M ${x} ${baseY} L ${x} ${baseT}`;
  for (let i = 0; i < pts.length - 1; i++) {
    d += ` L ${pts[i].lx} ${pts[i].y} L ${pts[i + 1].lx} ${pts[i].y}`;
  }
  d += ` L ${pts[pts.length - 1].lx} ${pts[pts.length - 1].y} L ${pts[pts.length - 1].rx} ${pts[pts.length - 1].y}`;
  for (let i = pts.length - 1; i > 0; i--) {
    d += ` L ${pts[i - 1].rx} ${pts[i].y} L ${pts[i - 1].rx} ${pts[i - 1].y}`;
  }
  d += ` L ${x + w} ${baseT} L ${x + w} ${baseY} Z`;
  return (
    <g>
      <path d={d} fill={SIL} />
      {pts.slice(1, -1).map((p, i) => (
        <line key={i} x1={p.lx} y1={p.y} x2={p.rx} y2={p.y} stroke="oklch(0.30 0.06 285)" strokeWidth="1" opacity="0.6" />
      ))}
      <line x1={cx - 10} y1={tipY} x2={cx + 10} y2={tipY} stroke={SIL} strokeWidth="1.2" />
      <path d={`M ${cx} ${tipY} L ${cx} ${tipY - 8}`} stroke={SIL} strokeWidth="1.4" />
      <circle cx={cx} cy={tipY - 10} r="1.8" fill={SIL} />
      <path d={`M ${cx - 8} ${tipY} L ${cx - 8} ${tipY - 4}`} stroke={SIL} strokeWidth="1" />
      <path d={`M ${cx + 8} ${tipY} L ${cx + 8} ${tipY - 4}`} stroke={SIL} strokeWidth="1" />
      {/* lit doorway */}
      <path
        d={`M ${cx - 5} ${baseY - 4} Q ${cx - 5} ${baseY - 14} ${cx} ${baseY - 16} Q ${cx + 5} ${baseY - 14} ${cx + 5} ${baseY - 4} Z`}
        fill="oklch(0.9 0.16 72)"
        opacity="0.9"
      />
    </g>
  );
}

/* ── Bangalore canopy ── */
export function BangaloreCanopy({ x, baseY, w }: { x: number; baseY: number; w: number }) {
  const L = x;
  const R = x + w;
  const scallops: string[] = [];
  const steps = 9;
  for (let i = 0; i <= steps; i++) {
    const px = L + (i / steps) * w;
    const py = baseY - 18 - ((i * 13) % 7) * 1.6 - Math.sin(i) * 3;
    scallops.push(`${i === 0 ? "M" : "L"} ${px - 6} ${py + 2} Q ${px} ${py - 6} ${px + 6} ${py + 2}`);
  }
  const canopy = scallops.join(" ") + ` L ${R} ${baseY} L ${L} ${baseY} Z`;
  const domeX = x + w * 0.52;
  const domeBase = baseY - 22;
  const dome = `M ${domeX - 16} ${domeBase} Q ${domeX - 16} ${domeBase - 18} ${domeX} ${domeBase - 22} Q ${domeX + 16} ${domeBase - 18} ${domeX + 16} ${domeBase} Z`;
  return (
    <g>
      <path d={dome} fill={SIL} />
      <path d={`M ${domeX} ${domeBase - 22} L ${domeX} ${domeBase - 28}`} stroke={SIL} strokeWidth="1.2" />
      <circle cx={domeX} cy={domeBase - 30} r="1.6" fill={SIL} />
      <path
        d={`M ${domeX - 28} ${domeBase + 2} Q ${domeX - 28} ${domeBase - 6} ${domeX - 22} ${domeBase - 8} Q ${domeX - 16} ${domeBase - 6} ${domeX - 16} ${domeBase + 2} Z`}
        fill={SIL}
        opacity="0.9"
      />
      <path
        d={`M ${domeX + 16} ${domeBase + 2} Q ${domeX + 16} ${domeBase - 6} ${domeX + 22} ${domeBase - 8} Q ${domeX + 28} ${domeBase - 6} ${domeX + 28} ${domeBase + 2} Z`}
        fill={SIL}
        opacity="0.9"
      />
      <path d={canopy} fill={SIL} />
    </g>
  );
}

/* ── Mumbai Art Deco ── */
export function MumbaiDeco({ x, baseY, w }: { x: number; baseY: number; w: number }) {
  const t1L = x + w * 0.45;
  const t1R = x + w * 0.78;
  const t1Top = baseY - 120;
  const mainBody = `M ${t1L} ${baseY} L ${t1L} ${baseY - 90} L ${t1L + 4} ${baseY - 94} L ${t1L + 4} ${baseY - 108}
    L ${t1L + 10} ${baseY - 112} L ${t1L + 10} ${t1Top + 6} L ${(t1L + t1R) / 2} ${t1Top}
    L ${t1R - 10} ${t1Top + 6} L ${t1R - 10} ${baseY - 112} L ${t1R - 4} ${baseY - 108}
    L ${t1R - 4} ${baseY - 94} L ${t1R} ${baseY - 90} L ${t1R} ${baseY} Z`;
  const t2L = x + w * 0.08;
  const t2R = x + w * 0.38;
  const t2 = `M ${t2L} ${baseY} L ${t2L} ${baseY - 56} L ${t2L + 6} ${baseY - 62} L ${t2R - 6} ${baseY - 62} L ${t2R} ${baseY - 56} L ${t2R} ${baseY} Z`;
  const stripes = [];
  for (let i = 0; i < 5; i++) {
    const sx = t1L + 14 + i * ((t1R - t1L - 28) / 4);
    stripes.push(
      <line key={i} x1={sx} y1={baseY - 90} x2={sx} y2={t1Top + 14} stroke="oklch(0.30 0.06 285)" strokeWidth="0.8" opacity="0.7" />
    );
  }
  return (
    <g>
      <path d={t2} fill={SIL} />
      <path d={mainBody} fill={SIL} />
      {stripes}
      <g>
        <rect x={x + w * 0.22} y={baseY - 7} width="14" height="5" rx="1.5" fill={SIL} />
        <rect x={x + w * 0.22 + 2} y={baseY - 9} width="10" height="2.5" rx="0.5" fill={TAXI} opacity="0.9" />
      </g>
    </g>
  );
}

/* ── Coconut palm ── */
export function CoconutPalm({ cx, baseY, h, lean = 0, opacity = 1 }: { cx: number; baseY: number; h: number; lean?: number; opacity?: number }) {
  const top = baseY - h;
  const curveX = cx + lean * h * 0.18;
  const trunk = `M ${cx} ${baseY} Q ${curveX - lean * 3} ${baseY - h * 0.5} ${curveX} ${top}`;
  const fronds = [];
  for (let i = 0; i < 7; i++) {
    const ang = ((-140 + i * 40) * Math.PI) / 180;
    const fl = h * 0.42;
    const fx = curveX + Math.cos(ang) * fl;
    const fy = top + Math.sin(ang) * fl * 0.7;
    const midX = curveX + Math.cos(ang) * fl * 0.55;
    const midY = top + Math.sin(ang) * fl * 0.35;
    fronds.push(
      <path
        key={i}
        d={`M ${curveX} ${top} Q ${midX} ${midY - 3} ${fx} ${fy}`}
        stroke={SIL}
        strokeWidth="1.3"
        fill="none"
        strokeLinecap="round"
        opacity={opacity * 0.95}
      />
    );
  }
  return (
    <g>
      <path d={trunk} stroke={SIL} strokeWidth="1.8" fill="none" strokeLinecap="round" opacity={opacity} />
      {fronds}
      <circle cx={curveX} cy={top + 3} r="2" fill={SIL} opacity={opacity} />
    </g>
  );
}

/* ── Fishing boat silhouette ── */
export function FishingBoat({ cx, baseY, w }: { cx: number; baseY: number; w: number }) {
  const hL = cx - w / 2;
  const hR = cx + w / 2;
  const hull = `M ${hL} ${baseY} Q ${cx} ${baseY + 4} ${hR} ${baseY} L ${hR - 3} ${baseY - 2} L ${hL + 3} ${baseY - 2} Z`;
  const mast = `M ${cx - 4} ${baseY - 2} L ${cx - 4} ${baseY - 14}`;
  const sail = `M ${cx - 4} ${baseY - 14} L ${cx + 7} ${baseY - 3} L ${cx - 4} ${baseY - 3} Z`;
  return (
    <g>
      <path d={hull} fill={SIL} />
      <path d={mast} stroke={SIL} strokeWidth="1" />
      <path d={sail} fill={SIL} opacity="0.85" />
    </g>
  );
}

/* ── Skyline band — all silhouettes planted on the far-hill crest ── */
export function SkylineBand({ compact = false }: { compact?: boolean } = {}) {
  return (
    <g aria-hidden="true">
      {/* Warm terracotta haze behind mid-skyline — Kerala/Godavari glow */}
      <ellipse cx="980" cy="480" rx="720" ry="110" fill="oklch(0.72 0.14 45 / 0.22)" style={{ filter: "blur(20px)" }} />

      {/* Rainier — ink-brush PNG silhouette, tinted cool-dusk.
          On mobile (compact), shift into the xMidYMid slice viewport and shrink
          so it reads as a small background peak, base resting on the far hill crest.
          Using SVG <image> instead of foreignObject — iOS Safari is unreliable
          with foreignObject + CSS filter on <img>. */}
      <image
        href="/ink/rainier.png"
        x={compact ? 820 : -70}
        y={compact ? 395 : 295}
        width={compact ? 280 : 560}
        height={compact ? 140 : 280}
        preserveAspectRatio="xMidYMax meet"
        style={{ filter: "saturate(0.55) hue-rotate(210deg) brightness(0.88)" }}
      />

      {/* Cool-blue rim halo behind gopuram */}
      <ellipse cx={1705} cy={485} rx={42} ry={55} fill="oklch(0.45 0.08 260 / 0.32)" style={{ filter: "blur(10px)" }} />

      {/* Chennai gopuram — ink-brush PNG */}
      <image
        href="/ink/chennai.png"
        x="1672"
        y="424"
        width="65"
        height="100"
        preserveAspectRatio="xMidYMax meet"
        style={{ filter: "saturate(0.55) hue-rotate(210deg) brightness(0.88)" }}
      />

      {/* Sunlit right edge on gopuram */}
      <path d="M 1733 438 L 1732 500 L 1729 500 L 1730 442 Z" fill="oklch(0.78 0.12 60)" opacity="0.4" style={{ filter: "blur(1.2px)" }} />

      {/* Lit doorway — glowing archway in the base */}
      <path d="M 1702 512 Q 1702 502 1705 500 Q 1708 502 1708 512 Z" fill="oklch(0.9 0.16 72)" opacity="0.95" />
      <ellipse cx={1705} cy={515} rx={7} ry={2.5} fill="oklch(0.88 0.15 68)" opacity="0.55" style={{ filter: "blur(2.5px)" }} />

      {/* Warm rim-light on kalasam finials */}
      <g opacity="0.75">
        {[1694, 1699, 1705, 1711, 1716].map((fx, i) => (
          <circle key={i} cx={fx} cy={426} r="1.2" fill="oklch(0.92 0.14 72)" />
        ))}
      </g>
    </g>
  );
}

export function GodavariBridge() {
  return (
    <g aria-hidden="true">
      {/* Bridge deck — extended left so it tucks behind the WORK arch pillar.
          Arches render on a higher parallax layer so they naturally occlude it. */}
      <image
        href="/ink/godavari.png"
        x="40"
        y="496"
        width="1480"
        height="224"
        preserveAspectRatio="xMidYMax meet"
        opacity="0.92"
        style={{ filter: "brightness(0.42) saturate(0.3) contrast(1.1)" }}
      />
      <Train />
    </g>
  );
}

/* ── Train that crosses the bridge on a slow loop.
      Engine leads on the right (travel direction is left→right) with cars trailing. ── */
function Train() {
  const bodyFill = "oklch(0.16 0.02 35)";
  const rim = "oklch(0.30 0.03 40)";
  const windowFill = "oklch(0.94 0.18 72)";
  const windowGlow = "oklch(0.90 0.20 68 / 0.7)";
  // Cars trail behind the engine (leftward)
  const cars = [
    { x: 0, w: 46 },
    { x: 48, w: 46 },
    { x: 96, w: 46 },
  ];
  const engineX = 148;
  const engineW = 36;
  const deckY = 678; // body top sits on deck
  return (
    <g className="train-run">
      {/* soft light trail under the train on the deck */}
      <ellipse cx="92" cy={deckY + 20} rx="130" ry="4" fill={windowGlow} opacity="0.25" style={{ filter: "blur(4px)" }} />
      {/* Cars */}
      {cars.map((c) => (
        <rect key={c.x} x={c.x} y={deckY + 2} width={c.w} height="14" fill={bodyFill} stroke={rim} strokeWidth="0.5" />
      ))}
      {/* Engine — leading */}
      <rect x={engineX} y={deckY} width={engineW} height="16" fill={bodyFill} stroke={rim} strokeWidth="0.5" />
      {/* Smokestack on the cab end of the engine */}
      <rect x={engineX + 4} y={deckY - 6} width="6" height="6" fill={bodyFill} />
      {/* Warm window lights — cars + engine cab */}
      {[4, 12, 20, 28, 52, 60, 68, 76, 100, 108, 116, 124, 152, 160, 170, 178].map((wx) => (
        <rect key={wx} x={wx} y={deckY + 6} width="3" height="4" fill={windowFill} />
      ))}
      {/* Headlight at the leading (right) edge of the engine */}
      <circle cx={engineX + engineW - 1} cy={deckY + 8} r="1.6" fill={windowFill} />
      <circle cx={engineX + engineW - 1} cy={deckY + 8} r="5" fill={windowGlow} style={{ filter: "blur(3px)" }} />
    </g>
  );
}

/* ── Foreground water channel ── */
export function ForegroundWater() {
  const upper = [
    { x: 280, y: 615 }, { x: 440, y: 615 }, { x: 600, y: 618 }, { x: 760, y: 620 },
    { x: 960, y: 618 }, { x: 1160, y: 618 }, { x: 1320, y: 620 }, { x: 1480, y: 622 }, { x: 1640, y: 625 },
  ];
  const lower = [
    { x: 280, y: 620 }, { x: 440, y: 660 }, { x: 600, y: 680 }, { x: 760, y: 692 },
    { x: 960, y: 698 }, { x: 1160, y: 692 }, { x: 1320, y: 680 }, { x: 1480, y: 660 }, { x: 1640, y: 628 },
  ];
  const toPath = (pts: { x: number; y: number }[], reverse = false) => {
    const p = reverse ? [...pts].reverse() : pts;
    let d = `${reverse ? "L" : "M"} ${p[0].x} ${p[0].y}`;
    for (let i = 1; i < p.length; i++) {
      const prev = p[i - 1];
      const cur = p[i];
      const cx = (prev.x + cur.x) / 2;
      d += ` Q ${cx} ${prev.y} ${cur.x} ${cur.y}`;
    }
    return d;
  };
  const d = toPath(upper) + " " + toPath(lower, true) + " Z";
  return (
    <g aria-hidden="true">
      <g mask="url(#fg-water-mask)">
        <path d={d} fill="url(#fg-water)" opacity="0.95" />
        <ellipse cx={960} cy={640} rx={70} ry={8} fill="oklch(0.85 0.13 70)" opacity="0.55" style={{ filter: "blur(1px)" }} />
        <ellipse cx={960} cy={650} rx={42} ry={4} fill="oklch(0.92 0.1 75)" opacity="0.4" style={{ filter: "blur(0.5px)" }} />
        {Array.from({ length: 22 }).map((_, i) => {
          const t = (i + 0.5) / 22;
          const x = 300 + t * 1320;
          const yBase = 625 + Math.sin(t * Math.PI) * 40;
          const yJitter = ((i * 37) % 11) - 5;
          const y = yBase + yJitter;
          const w = 8 + (i % 4) * 3;
          const bump = Math.sin(t * Math.PI);
          const opacity = 0.25 * bump;
          if (Math.abs(x - 960) < 80 && Math.abs(y - 645) < 15) return null;
          return (
            <line key={i} x1={x - w / 2} y1={y} x2={x + w / 2} y2={y} stroke="oklch(0.78 0.04 60)" strokeWidth={0.8} opacity={opacity} />
          );
        })}
      </g>
    </g>
  );
}

/* ── Floating diya ── */
export function FloatingDiya({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  const s = scale;
  return (
    <g aria-hidden="true">
      <ellipse cx={x} cy={y + 1 * s} rx={9 * s} ry={2 * s} fill="oklch(0.88 0.15 72)" opacity="0.35" style={{ filter: "blur(3px)" }} />
      <path
        d={`M ${x - 3.5 * s} ${y} Q ${x} ${y + 2 * s} ${x + 3.5 * s} ${y} L ${x + 2.5 * s} ${y - 0.5 * s} L ${x - 2.5 * s} ${y - 0.5 * s} Z`}
        fill="oklch(0.32 0.06 40)"
      />
      <ellipse cx={x} cy={y - 0.8 * s} rx={2.2 * s} ry={0.6 * s} fill="oklch(0.85 0.16 72)" />
      <ellipse cx={x} cy={y - 3 * s} rx={0.9 * s} ry={2.2 * s} fill="oklch(0.95 0.12 75)" />
      <ellipse cx={x} cy={y - 2.8 * s} rx={2.5 * s} ry={4 * s} fill="oklch(0.88 0.16 65)" opacity="0.45" style={{ filter: "blur(2px)" }} />
      <circle cx={x + 0.8 * s} cy={y - 7 * s} r={0.5 * s} fill="oklch(0.92 0.13 70)" opacity="0.7" />
    </g>
  );
}

/* ── Hill Peacock ── */
export function HillPeacock({ x, baseY, scale = 1, flip = false }: { x: number; baseY: number; scale?: number; flip?: boolean }) {
  const s = scale;
  const bodyCx = x;
  const bodyCy = baseY - 14 * s;
  const bodyRx = 11 * s;
  const bodyRy = 9 * s;
  const body = "oklch(0.32 0.06 230)";
  const accent = "oklch(0.55 0.12 200)";
  const tail = "oklch(0.38 0.08 210)";
  const gold = "oklch(0.78 0.13 80)";
  const tailStrokes: React.ReactNode[] = [];
  const tailBaseX = flip ? bodyCx + bodyRx * 0.6 : bodyCx - bodyRx * 0.6;
  const tailBaseY = bodyCy + bodyRy * 0.2;
  const dir = flip ? 1 : -1;
  for (let i = 0; i < 7; i++) {
    const angle = (-0.3 + i * 0.12) * Math.PI * 0.5;
    const len = (18 + i * 1.5) * s;
    const sway = 3 * s;
    const endX = tailBaseX + dir * Math.cos(angle) * len;
    const endY = tailBaseY + Math.sin(angle) * len - 2 * s;
    const ctrlX = tailBaseX + dir * Math.cos(angle) * len * 0.5;
    const ctrlY = tailBaseY + Math.sin(angle) * len * 0.5 - sway;
    tailStrokes.push(
      <path
        key={i}
        d={`M ${tailBaseX} ${tailBaseY} Q ${ctrlX} ${ctrlY} ${endX} ${endY}`}
        fill="none"
        stroke={tail}
        strokeWidth={1.6 * s}
        strokeLinecap="round"
        opacity={0.85 - i * 0.03}
      />
    );
    tailStrokes.push(<circle key={`e${i}`} cx={endX} cy={endY} r={1.4 * s} fill={gold} opacity={0.75} />);
  }
  const headDir = flip ? -1 : 1;
  const neckTopX = bodyCx + headDir * bodyRx * 0.55;
  const neckTopY = bodyCy - bodyRy * 0.6;
  const headCx = neckTopX + headDir * 3 * s;
  const headCy = neckTopY - 6 * s;
  return (
    <g aria-hidden="true">
      <ellipse cx={bodyCx} cy={baseY + 0.5} rx={bodyRx * 1.4} ry={1.2 * s} fill="oklch(0.18 0.02 280)" opacity="0.35" style={{ filter: "blur(0.8px)" }} />
      {tailStrokes}
      <ellipse cx={bodyCx} cy={bodyCy} rx={bodyRx} ry={bodyRy} fill={body} />
      <ellipse cx={bodyCx - 2 * s} cy={bodyCy - 2 * s} rx={bodyRx * 0.5} ry={bodyRy * 0.5} fill={accent} opacity="0.35" />
      <line x1={bodyCx - 2 * s} y1={bodyCy + bodyRy * 0.9} x2={bodyCx - 2 * s} y2={baseY} stroke={body} strokeWidth={1.2 * s} />
      <line x1={bodyCx + 2 * s} y1={bodyCy + bodyRy * 0.9} x2={bodyCx + 2 * s} y2={baseY} stroke={body} strokeWidth={1.2 * s} />
      <path
        d={`M ${neckTopX} ${neckTopY} Q ${neckTopX + headDir * 1 * s} ${neckTopY - 3 * s} ${headCx} ${headCy + 2 * s}`}
        fill="none"
        stroke={body}
        strokeWidth={2.2 * s}
        strokeLinecap="round"
      />
      <circle cx={headCx} cy={headCy} r={2.4 * s} fill={body} />
      <path
        d={`M ${headCx + headDir * 2 * s} ${headCy + 0.5 * s} L ${headCx + headDir * 4 * s} ${headCy + 1 * s} L ${headCx + headDir * 2 * s} ${headCy + 1.5 * s} Z`}
        fill={gold}
      />
      {[-0.3, 0, 0.3].map((a, i) => (
        <line
          key={i}
          x1={headCx + a * 1.5 * s}
          y1={headCy - 2 * s}
          x2={headCx + a * 2.4 * s}
          y2={headCy - 5 * s}
          stroke={body}
          strokeWidth={0.6 * s}
          strokeLinecap="round"
        />
      ))}
      {[-0.3, 0, 0.3].map((a, i) => (
        <circle key={`cb${i}`} cx={headCx + a * 2.4 * s} cy={headCy - 5 * s} r={0.7 * s} fill={gold} opacity="0.85" />
      ))}
    </g>
  );
}

/* ── Small Kalamkari peacock on the grass ── */
function Peacock({ cx, cy, scale = 1 }: { cx: number; cy: number; scale?: number }) {
  const s = scale;
  return (
    <g transform={`translate(${cx} ${cy}) scale(${s})`} opacity="0.85">
      <ellipse cx="0" cy="0" rx="5" ry="3.5" fill={KALAMKARI} />
      <path d="M 3 -2 Q 7 -6 8 -10" stroke={KALAMKARI} strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <circle cx="8" cy="-11" r="1.8" fill={KALAMKARI} />
      <path d="M 9.5 -11 L 12 -10.5" stroke={KALAMKARI} strokeWidth="0.9" />
      <path d="M 7.5 -13 L 7.5 -15 M 8 -13 L 8.5 -15 M 8.5 -13 L 9.5 -15" stroke={KALAMKARI} strokeWidth="0.7" />
      {[-40, -20, 0, 20, 40].map((deg, i) => {
        const a = (deg * Math.PI) / 180;
        const tx = -4 + Math.cos(a + Math.PI) * 14;
        const ty = 0 + Math.sin(a + Math.PI) * 14;
        return (
          <g key={i}>
            <path d={`M -4 0 Q ${tx * 0.6} ${ty * 0.4} ${tx} ${ty}`} stroke={KALAMKARI} strokeWidth="0.9" fill="none" opacity="0.85" />
            <circle cx={tx} cy={ty} r="1.2" fill={KALAMKARI} opacity="0.9" />
          </g>
        );
      })}
      <path d="M -1 3 L -1 6 M 1 3 L 1 6" stroke={KALAMKARI} strokeWidth="0.8" />
    </g>
  );
}

/* ── Kalamkari accents — corner tendrils + peacock ── */
export function KalamkariAccents() {
  return (
    <g aria-hidden="true">
      <g opacity="0.55" stroke={KALAMKARI} fill="none" strokeLinecap="round">
        <path d="M 20 80 C 60 60, 100 80, 120 120 C 130 150, 110 180, 140 200" strokeWidth="1.2" />
        <circle cx="60" cy="66" r="3" fill={KALAMKARI} opacity="0.9" />
        <path d="M 104 108 q 6 -6 12 0 q -6 6 -12 0 Z" fill={KALAMKARI} opacity="0.9" />
        <path d="M 136 186 q 5 -5 10 0 q -5 5 -10 0 Z" fill={KALAMKARI} opacity="0.9" />
        <path d="M 80 140 C 95 130, 110 140, 108 160 C 102 175, 80 170, 80 140 Z" strokeWidth="1" />
      </g>
      <g opacity="0.5" stroke={KALAMKARI} fill="none" strokeLinecap="round" transform="translate(1920 1080) scale(-1 -1)">
        <path d="M 20 60 C 60 40, 100 60, 120 100 C 140 140, 120 170, 150 190" strokeWidth="1.2" />
        <circle cx="56" cy="46" r="3" fill={KALAMKARI} opacity="0.9" />
        <path d="M 100 88 q 6 -6 12 0 q -6 6 -12 0 Z" fill={KALAMKARI} opacity="0.9" />
        <path d="M 78 128 C 93 118, 108 128, 106 148 C 100 163, 78 158, 78 128 Z" strokeWidth="1" />
      </g>
      <Peacock cx={1640} cy={972} scale={1.15} />
    </g>
  );
}

/* ── Soccer ball stone ── */
export function SoccerBallStone() {
  const cx = 520;
  const cy = 1002;
  const r = 12;
  return (
    <g aria-hidden="true">
      <ellipse cx={cx + 1} cy={cy + r - 1} rx={r * 0.9} ry="2.2" fill="oklch(0.20 0.04 20 / 0.45)" style={{ filter: "blur(1.5px)" }} />
      <circle cx={cx} cy={cy} r={r} fill="oklch(0.82 0.03 70)" opacity="0.95" />
      <g stroke="oklch(0.22 0.05 280 / 0.85)" strokeWidth="0.8" fill="none">
        <path
          d={`M ${cx} ${cy - 4} L ${cx + 3.8} ${cy - 1.2} L ${cx + 2.4} ${cy + 3.2} L ${cx - 2.4} ${cy + 3.2} L ${cx - 3.8} ${cy - 1.2} Z`}
          fill="oklch(0.22 0.05 280 / 0.78)"
        />
        <line x1={cx} y1={cy - 4} x2={cx} y2={cy - 10} />
        <line x1={cx + 3.8} y1={cy - 1.2} x2={cx + 9.5} y2={cy - 3} />
        <line x1={cx + 2.4} y1={cy + 3.2} x2={cx + 6} y2={cy + 8.5} />
        <line x1={cx - 2.4} y1={cy + 3.2} x2={cx - 6} y2={cy + 8.5} />
        <line x1={cx - 3.8} y1={cy - 1.2} x2={cx - 9.5} y2={cy - 3} />
      </g>
      <ellipse cx={cx - 3} cy={cy - 4} rx="3.5" ry="2" fill="oklch(0.96 0.02 80 / 0.55)" style={{ filter: "blur(1px)" }} />
    </g>
  );
}

/* ── Kite near gopuram ── */
export function KiteNearGopuram() {
  const ax = 1605;
  const ay = 340;
  return (
    <g aria-hidden="true" style={{ pointerEvents: "none" }}>
      <style>{`
        @keyframes kite-sway {
          0%, 100% { transform: translate(0, 0) rotate(-4deg); }
          25%      { transform: translate(2px, -2px) rotate(2deg); }
          50%      { transform: translate(-1px, 1px) rotate(-2deg); }
          75%      { transform: translate(1px, -1px) rotate(3deg); }
        }
        @keyframes kite-tug {
          0%, 82%, 100% { transform: translate(0, 0); }
          85% { transform: translate(3px, 3px); }
          88% { transform: translate(-1px, -1px); }
          92% { transform: translate(1px, 1px); }
        }
        .kite-body { animation: kite-sway 4.5s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
        .kite-group { animation: kite-tug 9s ease-in-out infinite; transform-box: fill-box; transform-origin: ${ax}px ${ay}px; }
      `}</style>
      <g className="kite-group">
        <path
          d={`M ${ax + 3} ${ay + 4} Q ${ax + 40} ${ay + 70}, ${ax + 90} ${ay + 120} T ${ax + 200} ${ay + 240}`}
          stroke="oklch(0.55 0.02 280 / 0.35)"
          strokeWidth="0.5"
          fill="none"
        />
        <g transform={`translate(${ax} ${ay})`}>
          <g className="kite-body">
            <path d="M 0 -9 L 7 0 L 0 9 L -7 0 Z" fill="oklch(0.70 0.18 45)" stroke="oklch(0.40 0.10 30 / 0.7)" strokeWidth="0.6" />
            <path d="M 0 -9 L 0 9" stroke="oklch(0.40 0.10 30 / 0.55)" strokeWidth="0.4" />
            <path d="M -7 0 L 7 0" stroke="oklch(0.40 0.10 30 / 0.55)" strokeWidth="0.4" />
            <path d="M 0 -9 L 7 0 L 0 0 Z" fill="oklch(0.72 0.18 15 / 0.85)" />
            <path d="M 0 9 Q 2 13 -1 17 Q -3 20 1 24" stroke="oklch(0.70 0.18 45)" strokeWidth="0.8" fill="none" />
            <circle cx="-1" cy="17" r="1" fill="oklch(0.78 0.16 60)" />
            <circle cx="1" cy="24" r="1.2" fill="oklch(0.72 0.18 15)" />
          </g>
        </g>
      </g>
    </g>
  );
}

/* ── X-Wing drive-by ── */
export function XWing() {
  const [flights, setFlights] = useState<{ id: number; y: number }[]>([]);
  useEffect(() => {
    let mounted = true;
    const launch = () => {
      if (!mounted) return;
      const id = Date.now() + Math.random();
      const y = 90 + Math.random() * 90;
      setFlights((f) => [...f, { id, y }]);
      setTimeout(() => {
        if (mounted) setFlights((f) => f.filter((x) => x.id !== id));
      }, 6500);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "x" || e.key === "X") launch();
    };
    window.addEventListener("keydown", onKey);
    let nextTimer: ReturnType<typeof setTimeout>;
    const tick = () => {
      launch();
      const nextIn = 75000 + Math.random() * 45000;
      nextTimer = setTimeout(tick, nextIn);
    };
    const warmup = setTimeout(tick, 20000);
    return () => {
      mounted = false;
      clearTimeout(warmup);
      clearTimeout(nextTimer);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <g aria-hidden="true" style={{ pointerEvents: "none" }}>
      <style>{`
        @keyframes xwing-fly-rtl {
          0%   { transform: translateX(2050px); opacity: 0; }
          8%   { opacity: 0.7; }
          92%  { opacity: 0.7; }
          100% { transform: translateX(-150px); opacity: 0; }
        }
      `}</style>
      {flights.map((f) => (
        <g key={f.id} style={{ animation: `xwing-fly-rtl 6s linear forwards`, transformBox: "fill-box", transformOrigin: "center" }}>
          <g transform={`translate(0, ${f.y})`}>
            <g fill="oklch(0.74 0.02 280 / 0.9)" stroke="oklch(0.24 0.03 275 / 0.9)" strokeWidth="0.45" transform="scale(-1.3, 1.3)">
              <path d="M -10 -1 L -1 -1.4 L 5 -1.4 L 10 -0.7 L 10 0.7 L 5 1.4 L -1 1.4 L -10 1 Z" />
              <line x1="-1" y1="-1.4" x2="-1" y2="1.4" strokeWidth="0.25" />
              <line x1="3" y1="-1.4" x2="3" y2="1.4" strokeWidth="0.25" />
              <path d="M 0.5 -1.4 L 1.5 -2.8 L 4.2 -2.8 L 5 -1.4 Z" fill="oklch(0.62 0.02 280 / 0.95)" />
              <path d="M 1.8 -2.4 L 4.1 -2.4 L 4.5 -1.7 L 1.4 -1.7 Z" fill="oklch(0.14 0.03 270 / 0.98)" stroke="none" />
              <path d="M 10 -0.7 L 14 -0.2 L 14 0.2 L 10 0.7 Z" />
              <path d="M -7 -1.4 L -4 -4.2 L 1.5 -4.2 L 0.5 -1.4 Z" />
              <line x1="1.5" y1="-4" x2="7" y2="-4" strokeWidth="0.6" />
              <path d="M -7 1.4 L -4 4.2 L 1.5 4.2 L 0.5 1.4 Z" />
              <line x1="1.5" y1="4" x2="7" y2="4" strokeWidth="0.6" />
              <ellipse cx="-10.2" cy="-0.6" rx="0.7" ry="0.45" fill="oklch(0.88 0.18 40 / 0.95)" stroke="none" />
              <ellipse cx="-10.2" cy="0.6" rx="0.7" ry="0.45" fill="oklch(0.88 0.18 40 / 0.95)" stroke="none" />
              <line x1="-10.8" y1="-0.6" x2="-15" y2="-0.6" stroke="oklch(0.78 0.15 40 / 0.5)" strokeWidth="0.5" strokeLinecap="round" />
              <line x1="-10.8" y1="0.6" x2="-15" y2="0.6" stroke="oklch(0.78 0.15 40 / 0.5)" strokeWidth="0.5" strokeLinecap="round" />
            </g>
          </g>
        </g>
      ))}
    </g>
  );
}

/* ── Rain overlay ── */
export function Rain({ on }: { on: boolean }) {
  const streaks = useMemo(() => {
    const out = [];
    for (let i = 0; i < 80; i++) {
      const x = ((i * 137) % 1920) + ((i * 53) % 40);
      const y = (i * 79) % 700;
      const len = 14 + (i % 5) * 4;
      const dur = 0.7 + ((i * 31) % 7) * 0.08;
      const delay = ((i * 17) % 30) * 0.05;
      const op = 0.25 + ((i * 13) % 5) * 0.05;
      out.push({ x, y, len, dur, delay, op });
    }
    return out;
  }, []);
  return (
    <g aria-hidden="true" style={{ pointerEvents: "none" }}>
      <style>{`
        @keyframes rain-fall {
          0%   { transform: translate(0, -50px); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translate(-90px, 600px); opacity: 0; }
        }
        .rain-on { opacity: 1; transition: opacity 1.4s ease; }
        .rain-off { opacity: 0; transition: opacity 1s ease; pointer-events: none; }
        .rain-streak {
          animation-name: rain-fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          transform-box: fill-box;
          transform-origin: center;
        }
      `}</style>
      <g className={on ? "rain-on" : "rain-off"}>
        {streaks.map((s, i) => (
          <line
            key={i}
            x1={s.x}
            y1={s.y}
            x2={s.x - s.len * 0.3}
            y2={s.y + s.len}
            stroke="oklch(0.82 0.03 260)"
            strokeWidth="0.8"
            opacity={s.op}
            className="rain-streak"
            style={{ animationDuration: `${s.dur}s`, animationDelay: `${s.delay}s` }}
          />
        ))}
        <rect x="0" y="0" width="1920" height="1080" fill="oklch(0.35 0.05 275 / 0.12)" />
      </g>
    </g>
  );
}
