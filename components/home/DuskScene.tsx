"use client";

import { CSSProperties, Fragment, useEffect, useState } from "react";

type Face = "left" | "right" | "front";

type PortalProps = {
  x: number;
  y: number;
  scale?: number;
  label: string;
  glowId: string;
  face?: Face;
  variant?: 0 | 1;
  active?: boolean;
  onClick?: () => void;
};

function Cypress({ x, y, h = 90, opacity = 1 }: { x: number; y: number; h?: number; opacity?: number }) {
  const w = h / 4.2;
  return (
    <g opacity={opacity}>
      <ellipse cx={x} cy={y + 2} rx={w * 0.9} ry={w * 0.22} fill="oklch(0.25 0.04 190 / 0.35)" />
      <path
        d={`M ${x} ${y - h} C ${x + w} ${y - h * 0.7}, ${x + w} ${y - h * 0.2}, ${x + w * 0.4} ${y} L ${x - w * 0.4} ${y} C ${x - w} ${y - h * 0.2}, ${x - w} ${y - h * 0.7}, ${x} ${y - h} Z`}
        fill="var(--cypress)"
      />
      <path
        d={`M ${x - w * 0.2} ${y - h * 0.85} Q ${x - w * 0.55} ${y - h * 0.5} ${x - w * 0.25} ${y - h * 0.15}`}
        stroke="oklch(0.45 0.06 190 / 0.5)"
        strokeWidth="1.2"
        fill="none"
      />
    </g>
  );
}

function Portal({ x, y, scale = 1, label, glowId, onClick, active, face = "front", variant = 0 }: PortalProps) {
  const thick = 22;
  const archW = 96 + variant * 6;
  const archR = archW / 2;
  const pillarH = 240 - variant * 8;
  const outerR = archR + thick;
  const topY = -(pillarH + archR);
  const baseY = 120;
  const plinthPadX = 18;
  const plinthH = 52;

  const dir = face === "left" ? -1 : face === "right" ? 1 : 0;
  const depth = 22 * Math.abs(dir);
  const dx = dir * depth;
  const dy = -6 * Math.abs(dir);

  const outerPath = (ox: number, oy: number) => `
    M ${ox - outerR} ${oy + baseY}
    L ${ox - outerR} ${oy - pillarH}
    A ${outerR} ${outerR} 0 0 1 ${ox + outerR} ${oy - pillarH}
    L ${ox + outerR} ${oy + baseY} Z
  `;
  const innerPath = (ox: number, oy: number) => `
    M ${ox - archR} ${oy + baseY}
    L ${ox - archR} ${oy - pillarH}
    A ${archR} ${archR} 0 0 1 ${ox + archR} ${oy - pillarH}
    L ${ox + archR} ${oy + baseY} Z
  `;

  const sideWall = (() => {
    if (dir === 0) return null;
    const edgeX = dir > 0 ? -outerR : outerR;
    const edgeBackX = edgeX + dx;
    return `
      M ${edgeX} ${baseY}
      L ${edgeX} ${-pillarH}
      A ${outerR} ${outerR} 0 0 ${dir > 0 ? 1 : 0} 0 ${topY}
      L ${dx} ${topY + dy}
      A ${outerR} ${outerR} 0 0 ${dir > 0 ? 0 : 1} ${edgeBackX} ${-pillarH + dy}
      L ${edgeBackX} ${baseY + dy}
      L ${edgeX} ${baseY} Z
    `;
  })();

  const innerSideWall = (() => {
    if (dir === 0) return null;
    const innerEdgeX = dir > 0 ? archR : -archR;
    const innerEdgeBackX = innerEdgeX + dx;
    return `
      M ${innerEdgeX} ${baseY}
      L ${innerEdgeX} ${-pillarH}
      A ${archR} ${archR} 0 0 ${dir > 0 ? 0 : 1} 0 ${topY + thick}
      L ${dx} ${topY + thick + dy}
      A ${archR} ${archR} 0 0 ${dir > 0 ? 1 : 0} ${innerEdgeBackX} ${-pillarH + dy}
      L ${innerEdgeBackX} ${baseY + dy}
      L ${innerEdgeX} ${baseY} Z
    `;
  })();

  const specks = Array.from({ length: 14 }).map((_, i) => {
    const seed = (i * 37 + variant * 11) % 100;
    const sx = ((seed * 7) % (outerR * 2)) - outerR;
    const sy = -((seed * 11) % pillarH) - 20;
    const sr = 0.8 + (seed % 3) * 0.4;
    return { sx, sy, sr, o: 0.2 + (seed % 5) * 0.08 };
  });

  return (
    <g
      className={`portal${active ? " active" : ""}`}
      transform={`translate(${x},${y}) scale(${scale})`}
      onClick={onClick}
      onMouseEnter={(e) => e.currentTarget.classList.add("is-hover")}
      onMouseLeave={(e) => e.currentTarget.classList.remove("is-hover")}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && onClick) {
          e.preventDefault();
          onClick();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Open ${label.toLowerCase()}`}
      style={{ cursor: "pointer", pointerEvents: "auto" }}
    >
      <ellipse cx={dir * 8} cy={baseY + plinthH - 2} rx={outerR + plinthPadX + 6} ry={7} fill="oklch(0.18 0.04 280 / 0.4)" />

      <ellipse cx={dx * 0.5} cy={topY + pillarH * 0.35} rx={archW * 1.3} ry={(pillarH + archR) * 0.55} fill={`url(#${glowId})`} opacity="0.4" />
      <ellipse className="arch-light" cx={dx * 0.5} cy={topY + pillarH * 0.35} rx={archW * 2.2} ry={(pillarH + archR) * 0.8} fill={`url(#${glowId})`} />

      {dir !== 0 && (
        <path
          d={outerPath(dx, dy) + innerPath(dx, dy)}
          fill="oklch(0.38 0.02 50)"
          fillRule="evenodd"
          style={{ pointerEvents: "none" }}
        />
      )}

      <path
        d={innerPath(dir === 0 ? 0 : dx * 0.5, dir === 0 ? 0 : dy * 0.5)}
        fill={`url(#${glowId}-interior)`}
        opacity="0.6"
      />
      <path
        className="arch-light"
        d={innerPath(dir === 0 ? 0 : dx * 0.5, dir === 0 ? 0 : dy * 0.5)}
        fill={`url(#${glowId}-interior)`}
      />

      <ellipse
        cx={dx * 0.7}
        cy={-pillarH * 0.5 + dy * 0.7}
        rx={archW * 0.22}
        ry={pillarH * 0.32}
        fill="oklch(0.94 0.10 65)"
        opacity="0.45"
        style={{ filter: "blur(8px)", pointerEvents: "none" }}
      />
      <ellipse
        className="arch-light"
        cx={dx * 0.7}
        cy={-pillarH * 0.5 + dy * 0.7}
        rx={archW * 0.3}
        ry={pillarH * 0.4}
        fill="oklch(0.97 0.14 70)"
        opacity="0.7"
        style={{ filter: "blur(10px)", pointerEvents: "none" }}
      />

      {sideWall && <path d={sideWall} fill="oklch(0.42 0.025 50)" style={{ pointerEvents: "none" }} />}
      {innerSideWall && <path d={innerSideWall} fill="oklch(0.48 0.03 55)" opacity="0.85" style={{ pointerEvents: "none" }} />}

      <path className="arch-fill" d={outerPath(0, 0) + innerPath(0, 0)} fill="var(--stone)" fillRule="evenodd" />
      <path
        d={outerPath(0, 0) + innerPath(0, 0)}
        fill="url(#stoneTex)"
        fillRule="evenodd"
        opacity="0.55"
        style={{ pointerEvents: "none" }}
      />

      <path
        d={
          face === "left"
            ? `M ${archR} ${baseY} L ${archR} ${-pillarH} A ${archR} ${archR} 0 0 1 0 ${topY} L 0 ${topY - 3} A ${outerR} ${outerR} 0 0 0 ${outerR} ${-pillarH} L ${outerR} ${baseY} Z`
            : face === "right"
            ? `M ${-archR} ${baseY} L ${-archR} ${-pillarH} A ${archR} ${archR} 0 0 0 0 ${topY} L 0 ${topY - 3} A ${outerR} ${outerR} 0 0 1 ${-outerR} ${-pillarH} L ${-outerR} ${baseY} Z`
            : ""
        }
        fill="oklch(0.78 0.10 45 / 0.35)"
        style={{ pointerEvents: "none" }}
      />
      <path
        d={
          face === "left"
            ? `M ${-outerR} ${baseY} L ${-outerR} ${-pillarH} A ${outerR} ${outerR} 0 0 1 0 ${topY - 3} L 0 ${topY} A ${archR} ${archR} 0 0 0 ${-archR} ${-pillarH} L ${-archR} ${baseY} Z`
            : face === "right"
            ? `M ${outerR} ${baseY} L ${outerR} ${-pillarH} A ${outerR} ${outerR} 0 0 0 0 ${topY - 3} L 0 ${topY} A ${archR} ${archR} 0 0 1 ${archR} ${-pillarH} L ${archR} ${baseY} Z`
            : ""
        }
        fill="oklch(0.20 0.03 280 / 0.35)"
        style={{ pointerEvents: "none" }}
      />

      <g style={{ pointerEvents: "none" }}>
        {specks.map((s, i) => (
          <circle key={i} cx={s.sx} cy={s.sy} r={s.sr} fill="oklch(0.28 0.03 40)" opacity={s.o} />
        ))}
      </g>

      {variant === 0 ? (
        <g style={{ pointerEvents: "none" }}>
          <path
            d={`M ${-outerR - 2} ${-pillarH * 0.15} Q ${-outerR - 8} ${-pillarH * 0.08} ${-outerR - 4} ${-pillarH * 0.02} Q ${-outerR - 12} ${pillarH * 0.02} ${-outerR - 6} ${pillarH * 0.08}`}
            stroke="oklch(0.38 0.08 150)"
            strokeWidth="1.2"
            fill="none"
            opacity="0.7"
          />
          {[0.08, 0.04, 0.0, -0.04].map((t, i) => (
            <circle
              key={i}
              cx={-outerR - 4 + (i % 2) * -3}
              cy={-pillarH * 0.1 + t * pillarH + i * 6}
              r="2.2"
              fill="oklch(0.42 0.10 150)"
              opacity="0.75"
            />
          ))}
        </g>
      ) : (
        <g style={{ pointerEvents: "none" }}>
          <path
            d={`M ${outerR + 2} ${-pillarH * 0.7} Q ${outerR + 10} ${-pillarH * 0.62} ${outerR + 5} ${-pillarH * 0.55} Q ${outerR + 14} ${-pillarH * 0.48} ${outerR + 6} ${-pillarH * 0.42}`}
            stroke="oklch(0.38 0.08 150)"
            strokeWidth="1.1"
            fill="none"
            opacity="0.65"
          />
          {[0, 1, 2].map((i) => (
            <circle
              key={i}
              cx={outerR + 6 + (i % 2) * 3}
              cy={-pillarH * 0.6 + i * 7}
              r="2"
              fill="oklch(0.44 0.10 150)"
              opacity="0.7"
            />
          ))}
        </g>
      )}

      <text className="portal-float-label" x={0} y={baseY + 44}>
        {label}
      </text>
    </g>
  );
}

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

type SceneProps = {
  activePortal: "work" | "personal" | null;
  onEnter: (which: "work" | "personal") => void;
  showOrb?: boolean;
  showPortals?: boolean;
  reducedMotion?: boolean;
};

export default function DuskScene({ activePortal, onEnter, showOrb = true, showPortals = true, reducedMotion = false }: SceneProps) {
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [orbGaze, setOrbGaze] = useState({ x: 0, y: 0 });
  const [motes, setMotes] = useState<Mote[]>([]);

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
        if (fresh.length < 16) {
          fresh.push({
            id: id++,
            left: 10 + Math.random() * 80,
            bottom: 10 + Math.random() * 30,
            dx: (Math.random() - 0.5) * 80,
            dy: -80 - Math.random() * 140,
            dur: 5500 + Math.random() * 5000,
            size: 2 + Math.random() * 2,
            born: now,
          });
        }
        return fresh;
      });
    }, 480);
    return () => window.clearInterval(iv);
  }, [reducedMotion]);

  const p = (depth: number): CSSProperties => ({
    transform: `translate(${parallax.x * depth}px, ${parallax.y * depth * 0.6}px)`,
  });

  return (
    <>
      <svg className="scene-svg" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.78 0.11 45)" />
            <stop offset="30%" stopColor="oklch(0.72 0.10 25)" />
            <stop offset="55%" stopColor="oklch(0.80 0.09 60)" />
            <stop offset="78%" stopColor="oklch(0.64 0.09 310)" />
            <stop offset="100%" stopColor="oklch(0.55 0.08 290)" />
          </linearGradient>

          <radialGradient id="sun" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.95 0.12 70)" stopOpacity="0.9" />
            <stop offset="40%" stopColor="oklch(0.86 0.14 50)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="oklch(0.78 0.12 40)" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="hillFar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.58 0.05 280)" />
            <stop offset="100%" stopColor="oklch(0.48 0.06 260)" />
          </linearGradient>
          <linearGradient id="hillMid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.52 0.07 220)" />
            <stop offset="100%" stopColor="oklch(0.44 0.08 200)" />
          </linearGradient>
          <linearGradient id="hillNear" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.50 0.09 180)" />
            <stop offset="100%" stopColor="oklch(0.42 0.10 160)" />
          </linearGradient>
          <linearGradient id="grass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.46 0.10 155)" />
            <stop offset="100%" stopColor="oklch(0.36 0.09 150)" />
          </linearGradient>

          <radialGradient id="orb" cx="40%" cy="36%" r="72%">
            <stop offset="0%" stopColor="oklch(0.94 0.04 320)" />
            <stop offset="30%" stopColor="oklch(0.84 0.06 320)" />
            <stop offset="65%" stopColor="oklch(0.68 0.08 315)" />
            <stop offset="92%" stopColor="oklch(0.55 0.09 305)" />
            <stop offset="100%" stopColor="oklch(0.48 0.08 295)" />
          </radialGradient>
          <radialGradient id="orbRim" cx="50%" cy="50%" r="50%">
            <stop offset="72%" stopColor="oklch(0.78 0.14 45)" stopOpacity="0" />
            <stop offset="90%" stopColor="oklch(0.82 0.17 50)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="oklch(0.70 0.14 40)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="orbHalo" cx="50%" cy="50%" r="50%">
            <stop offset="40%" stopColor="oklch(0.86 0.12 50)" stopOpacity="0" />
            <stop offset="70%" stopColor="oklch(0.86 0.12 50)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="oklch(0.86 0.12 50)" stopOpacity="0" />
          </radialGradient>

          {["g0", "g1"].map((g) => (
            <Fragment key={g}>
              <radialGradient id={g} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="oklch(0.92 0.18 65)" stopOpacity="0.6" />
                <stop offset="55%" stopColor="oklch(0.82 0.16 55)" stopOpacity="0.2" />
                <stop offset="100%" stopColor="oklch(0.78 0.14 40)" stopOpacity="0" />
              </radialGradient>
              <linearGradient id={`${g}-interior`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.96 0.14 75)" />
                <stop offset="55%" stopColor="oklch(0.84 0.16 55)" />
                <stop offset="100%" stopColor="oklch(0.70 0.14 45)" />
              </linearGradient>
            </Fragment>
          ))}

          <radialGradient id="vignette" cx="50%" cy="55%" r="75%">
            <stop offset="70%" stopColor="oklch(0 0 0 / 0)" />
            <stop offset="100%" stopColor="oklch(0.18 0.05 280 / 0.45)" />
          </radialGradient>

          <filter id="stoneGrain" x="0" y="0" width="1" height="1" filterUnits="objectBoundingBox">
            <feTurbulence type="fractalNoise" baseFrequency="1.8" numOctaves="2" seed="4" />
            <feColorMatrix values="0 0 0 0 0.5 0 0 0 0 0.45 0 0 0 0 0.4 0 0 0 0.28 0" />
          </filter>
          <pattern id="stoneTex" x="0" y="0" width="240" height="340" patternUnits="userSpaceOnUse">
            <rect width="240" height="340" filter="url(#stoneGrain)" />
          </pattern>

          <filter id="hillGrain" x="0" y="0" width="1920" height="1080" filterUnits="userSpaceOnUse">
            <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="2" seed="11" />
            <feColorMatrix values="0 0 0 0 0.2 0 0 0 0 0.25 0 0 0 0 0.3 0 0 0 0.22 0" />
          </filter>
          <pattern id="hillTex" x="0" y="0" width="1920" height="300" patternUnits="userSpaceOnUse">
            <rect width="1920" height="300" filter="url(#hillGrain)" />
          </pattern>

          <filter id="skyHaze" x="0" y="0" width="1920" height="600" filterUnits="userSpaceOnUse">
            <feTurbulence type="fractalNoise" baseFrequency="0.008 0.02" numOctaves="3" seed="17" />
            <feColorMatrix values="0 0 0 0 0.95 0 0 0 0 0.78 0 0 0 0 0.72 0 0 0 0.18 -0.1" />
          </filter>
          <pattern id="skyTex" x="0" y="0" width="1920" height="600" patternUnits="userSpaceOnUse">
            <rect width="1920" height="600" filter="url(#skyHaze)" />
          </pattern>

          <filter id="grainFilter" x="0" y="0" width="1920" height="1100" filterUnits="userSpaceOnUse">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" />
            <feColorMatrix values="0 0 0 0 0.22 0 0 0 0 0.42 0 0 0 0 0.24 0 0 0 0.55 0" />
          </filter>
          <pattern id="grassNoise" x="0" y="0" width="1920" height="300" patternUnits="userSpaceOnUse">
            <rect width="1920" height="300" filter="url(#grainFilter)" />
          </pattern>

          <filter id="streakFilter" x="0" y="0" width="1920" height="1100" filterUnits="userSpaceOnUse">
            <feTurbulence type="turbulence" baseFrequency="0.012 0.22" numOctaves="2" seed="3" />
            <feColorMatrix values="0 0 0 0 0.18 0 0 0 0 0.32 0 0 0 0 0.20 0 0 0 0.6 -0.25" />
          </filter>
          <pattern id="grassStreaks" x="0" y="0" width="1920" height="300" patternUnits="userSpaceOnUse">
            <rect width="1920" height="300" filter="url(#streakFilter)" />
          </pattern>
        </defs>

        <rect x="0" y="0" width="1920" height="1080" fill="url(#sky)" />
        <rect x="0" y="0" width="1920" height="600" fill="url(#skyTex)" opacity="0.5" />

        <g style={p(4)}>
          <circle cx="960" cy="440" r="240" fill="url(#sun)" />
          <circle cx="960" cy="440" r="28" fill="oklch(0.98 0.06 75)" opacity="0.75" />
        </g>

        <g opacity="0.8">
          {[
            [420, 120, 1.2],
            [520, 190, 0.8],
            [1180, 95, 1.4],
            [1380, 180, 1],
            [1560, 120, 0.9],
            [260, 260, 1],
            [1720, 240, 1.2],
            [820, 70, 0.7],
            [1080, 210, 0.8],
          ].map(([cx, cy, r], i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              fill="oklch(0.98 0.02 80)"
              style={{ animation: `twinkle ${3 + (i % 3)}s ease-in-out ${i * 0.3}s infinite` }}
            />
          ))}
        </g>

        <g style={p(6)}>
          <path
            d="M -50 560 Q 180 480 400 510 T 820 500 Q 1050 460 1280 520 T 1720 500 Q 1880 480 1980 520 L 1980 640 L -50 640 Z"
            fill="url(#hillFar)"
          />
        </g>

        <g style={p(10)}>
          <path
            d="M -50 620 Q 220 530 460 580 Q 700 620 960 560 Q 1220 500 1500 590 Q 1740 660 1980 590 L 1980 740 L -50 740 Z"
            fill="url(#hillMid)"
          />
          <path
            d="M -50 620 Q 220 530 460 580 Q 700 620 960 560 Q 1220 500 1500 590 Q 1740 660 1980 590 L 1980 740 L -50 740 Z"
            fill="url(#hillTex)"
            opacity="0.28"
          />
          <Cypress x={340} y={602} h={55} opacity={0.85} />
          <Cypress x={760} y={592} h={48} opacity={0.8} />
          <Cypress x={1180} y={548} h={62} opacity={0.85} />
          <Cypress x={1460} y={620} h={50} opacity={0.85} />
        </g>

        <g style={p(16)}>
          <path
            d="M -50 700 Q 180 640 420 680 Q 680 730 960 660 Q 1240 600 1520 690 Q 1760 760 1980 690 L 1980 820 L -50 820 Z"
            fill="url(#hillNear)"
          />
          <path
            d="M -50 700 Q 180 640 420 680 Q 680 730 960 660 Q 1240 600 1520 690 Q 1760 760 1980 690 L 1980 820 L -50 820 Z"
            fill="url(#hillTex)"
            opacity="0.35"
          />

          <Cypress x={80} y={826} h={200} />
          <Cypress x={1860} y={832} h={190} />
          <Cypress x={210} y={804} h={130} opacity={0.95} />
          <Cypress x={1740} y={808} h={140} opacity={0.95} />

          {showPortals && (
            <>
              <Portal
                x={420}
                y={720}
                scale={0.92}
                face="left"
                variant={0}
                label="PERSONAL"
                glowId="g0"
                onClick={() => onEnter("personal")}
                active={activePortal === "personal"}
              />
              <Portal
                x={1500}
                y={720}
                scale={0.96}
                face="right"
                variant={1}
                label="WORK"
                glowId="g1"
                onClick={() => onEnter("work")}
                active={activePortal === "work"}
              />
            </>
          )}
        </g>

        <g style={p(22)}>
          <path
            d="M -50 800 Q 300 750 720 790 Q 1100 830 1460 780 Q 1740 750 1980 790 L 1980 1100 L -50 1100 Z"
            fill="url(#grass)"
          />
          <path
            d="M -50 800 Q 300 750 720 790 Q 1100 830 1460 780 Q 1740 750 1980 790 L 1980 1100 L -50 1100 Z"
            fill="url(#grassNoise)"
            opacity="0.45"
          />
          <path
            d="M -50 800 Q 300 750 720 790 Q 1100 830 1460 780 Q 1740 750 1980 790 L 1980 1100 L -50 1100 Z"
            fill="url(#grassStreaks)"
            opacity="0.6"
          />
          <g opacity="0.85">
            {Array.from({ length: 95 }).map((_, i) => {
              const rx = (i * 137) % 1920;
              const ry = 820 + ((i * 41) % 270);
              const tint = i % 3;
              const color =
                tint === 0 ? "oklch(0.28 0.09 155)" : tint === 1 ? "oklch(0.38 0.10 150)" : "oklch(0.52 0.11 160)";
              const bend = ((i * 7) % 5) - 2;
              return (
                <g key={`t${i}`} transform={`translate(${rx},${ry})`} fill={color}>
                  <path d={`M 0 0 Q ${bend - 1} -6 ${bend - 2} -12 Q ${bend - 3} -13 ${bend - 4} -14 L -2 0 Z`} />
                  <path d={`M 3 0 Q ${bend + 2} -7 ${bend + 3} -15 Q ${bend + 3} -16 ${bend + 4} -17 L 1 0 Z`} />
                  <path d={`M 6 0 Q ${bend + 5} -5 ${bend + 6} -10 Q ${bend + 6} -11 ${bend + 7} -12 L 4 0 Z`} />
                </g>
              );
            })}
          </g>
          <g>
            {Array.from({ length: 14 }).map((_, i) => {
              const x = (i * 139 + 37) % 1920;
              const y = 860 + ((i * 29) % 200);
              return (
                <circle
                  key={`f${i}`}
                  cx={x}
                  cy={y}
                  r="2"
                  fill={i % 3 === 0 ? "oklch(0.90 0.12 80)" : "oklch(0.84 0.10 45)"}
                  opacity="0.7"
                />
              );
            })}
          </g>
        </g>

        {showOrb && (
          <g style={p(24)}>
            <g transform={`translate(${860 + orbGaze.x * 2}, ${860 + orbGaze.y * 0.5})`}>
              <circle cx="0" cy="0" r="200" fill="url(#orbHalo)" />
              <ellipse cx="0" cy="132" rx="160" ry="22" fill="oklch(0.22 0.04 20 / 0.40)" style={{ filter: "blur(4px)" }} />
              <ellipse cx="0" cy="132" rx="110" ry="12" fill="oklch(0.22 0.04 20 / 0.35)" />
              <ellipse cx="0" cy="126" rx="180" ry="8" fill="oklch(0.84 0.14 50 / 0.55)" style={{ filter: "blur(3px)" }} />
              <circle cx="0" cy="0" r="128" fill="url(#orb)" />
              <circle cx="0" cy="0" r="128" fill="url(#orbRim)" />
              <path
                d="M 90 -30 A 128 128 0 0 1 -20 120"
                stroke="oklch(0.86 0.16 50 / 0.55)"
                strokeWidth="4"
                fill="none"
                style={{ filter: "blur(1.5px)" }}
              />
              <ellipse
                cx={-42 + orbGaze.x * 0.4}
                cy={-50 + orbGaze.y * 0.4}
                rx="30"
                ry="18"
                fill="oklch(0.98 0.03 60 / 0.4)"
                style={{ filter: "blur(2px)" }}
              />
              <g fill="oklch(0.30 0.09 150)">
                {[-110, -85, -55, -20, 30, 65, 95, 120].map((bx, i) => (
                  <rect key={i} x={bx} y={120 + ((i * 3) % 8)} width="1.3" height={8 + ((i * 5) % 8)} />
                ))}
              </g>
              <g fill="oklch(0.48 0.10 155)">
                {[-95, -60, -30, 10, 45, 80, 110].map((bx, i) => (
                  <rect key={`fg${i}`} x={bx} y={122 + ((i * 4) % 6)} width="1" height={6 + ((i * 4) % 6)} />
                ))}
              </g>
            </g>
          </g>
        )}

        <g style={p(30)}>
          <circle
            cx="1680"
            cy="940"
            r="3"
            fill="oklch(0.95 0.16 70)"
            style={{ filter: "drop-shadow(0 0 8px oklch(0.9 0.18 60))", animation: "twinkle 2.4s ease-in-out infinite" }}
          />
          <circle
            cx="240"
            cy="960"
            r="2.5"
            fill="oklch(0.95 0.16 70)"
            style={{
              filter: "drop-shadow(0 0 8px oklch(0.9 0.18 60))",
              animation: "twinkle 3.1s ease-in-out 0.7s infinite",
            }}
          />
        </g>

        <rect x="0" y="0" width="1920" height="1080" fill="url(#vignette)" />
      </svg>

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
    </>
  );
}
