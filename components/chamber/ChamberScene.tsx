"use client";

import { CSSProperties } from "react";

type Vec = { x: number; y: number };

type Props = {
  parallax: Vec;
  orbGaze: Vec;
  showOrb?: boolean;
  showLandscape?: boolean;
  showLanterns?: boolean;
  onDoorwayClick?: () => void;
};

function Cypress({ x, y, h = 60, opacity = 1 }: { x: number; y: number; h?: number; opacity?: number }) {
  const w = h / 4.2;
  return (
    <g opacity={opacity}>
      <path
        d={`M ${x} ${y - h}
           C ${x + w} ${y - h * 0.7}, ${x + w} ${y - h * 0.2}, ${x + w * 0.4} ${y}
           L ${x - w * 0.4} ${y}
           C ${x - w} ${y - h * 0.2}, ${x - w} ${y - h * 0.7}, ${x} ${y - h} Z`}
        fill="var(--cypress)"
      />
    </g>
  );
}

export default function ChamberScene({
  parallax,
  orbGaze,
  showOrb = true,
  showLandscape = true,
  showLanterns = true,
  onDoorwayClick,
}: Props) {
  const cx = 960;
  const floor = 820;
  const archW = 360;
  const archR = archW / 2;
  const pillarH = 440;

  const archOpening = `
    M ${cx - archR} ${floor}
    L ${cx - archR} ${floor - pillarH}
    A ${archR} ${archR} 0 0 1 ${cx + archR} ${floor - pillarH}
    L ${cx + archR} ${floor} Z
  `;

  const p = (depth: number): CSSProperties => ({
    transform: `translate(${parallax.x * depth}px, ${parallax.y * depth * 0.4}px)`,
  });

  return (
    <svg className="chamber-svg" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="chSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.78 0.11 45)" />
          <stop offset="30%" stopColor="oklch(0.72 0.10 25)" />
          <stop offset="55%" stopColor="oklch(0.80 0.09 60)" />
          <stop offset="78%" stopColor="oklch(0.64 0.09 310)" />
          <stop offset="100%" stopColor="oklch(0.55 0.08 290)" />
        </linearGradient>

        <radialGradient id="chSun" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="oklch(0.95 0.12 70)" stopOpacity="0.9" />
          <stop offset="40%" stopColor="oklch(0.86 0.14 50)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="oklch(0.78 0.12 40)" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="chHillFar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.58 0.05 280)" />
          <stop offset="100%" stopColor="oklch(0.48 0.06 260)" />
        </linearGradient>
        <linearGradient id="chHillMid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.52 0.07 220)" />
          <stop offset="100%" stopColor="oklch(0.44 0.08 200)" />
        </linearGradient>
        <linearGradient id="chHillNear" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.50 0.09 180)" />
          <stop offset="100%" stopColor="oklch(0.42 0.10 160)" />
        </linearGradient>
        <linearGradient id="chGrass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.46 0.10 155)" />
          <stop offset="100%" stopColor="oklch(0.36 0.09 150)" />
        </linearGradient>

        <radialGradient id="chamberGlow" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="oklch(0.90 0.14 65)" stopOpacity="0.55" />
          <stop offset="45%" stopColor="oklch(0.72 0.14 50)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="oklch(0.40 0.06 40)" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="stoneRim" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.58 0.06 55)" />
          <stop offset="50%" stopColor="oklch(0.44 0.05 45)" />
          <stop offset="100%" stopColor="oklch(0.28 0.04 40)" />
        </linearGradient>

        <radialGradient id="wallLight" cx="50%" cy="55%" r="70%">
          <stop offset="0%" stopColor="oklch(0.60 0.08 55)" stopOpacity="0.85" />
          <stop offset="45%" stopColor="oklch(0.36 0.05 45)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="oklch(0.16 0.03 40)" stopOpacity="1" />
        </radialGradient>

        <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.40 0.05 50)" />
          <stop offset="100%" stopColor="oklch(0.18 0.03 40)" />
        </linearGradient>

        <filter id="chStoneGrain" x="0" y="0" width="1" height="1" filterUnits="objectBoundingBox">
          <feTurbulence type="fractalNoise" baseFrequency="1.6" numOctaves="2" seed="9" />
          <feColorMatrix values="0 0 0 0 0.45 0 0 0 0 0.38 0 0 0 0 0.32 0 0 0 0.22 0" />
        </filter>
        <pattern id="chStoneTex" x="0" y="0" width="320" height="420" patternUnits="userSpaceOnUse">
          <rect width="320" height="420" filter="url(#chStoneGrain)" />
        </pattern>

        <pattern id="stoneCourses" x="0" y="0" width="1" height="56" patternUnits="userSpaceOnUse">
          <rect width="1920" height="56" fill="transparent" />
          <line x1="0" y1="55" x2="1920" y2="55" stroke="oklch(0.16 0.03 35 / 0.45)" strokeWidth="1" />
        </pattern>

        <clipPath id="archClip">
          <path d={archOpening} />
        </clipPath>

        <radialGradient id="orbBody" cx="40%" cy="36%" r="72%">
          <stop offset="0%" stopColor="oklch(0.94 0.04 320)" />
          <stop offset="30%" stopColor="oklch(0.84 0.06 320)" />
          <stop offset="65%" stopColor="oklch(0.68 0.08 315)" />
          <stop offset="92%" stopColor="oklch(0.55 0.09 305)" />
          <stop offset="100%" stopColor="oklch(0.48 0.08 295)" />
        </radialGradient>
        <radialGradient id="orbRimCh" cx="50%" cy="50%" r="50%">
          <stop offset="72%" stopColor="oklch(0.78 0.14 45)" stopOpacity="0" />
          <stop offset="90%" stopColor="oklch(0.82 0.17 50)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="oklch(0.70 0.14 40)" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="vignette2" cx="50%" cy="50%" r="75%">
          <stop offset="60%" stopColor="oklch(0 0 0 / 0)" />
          <stop offset="100%" stopColor="oklch(0 0 0 / 0.65)" />
        </radialGradient>
      </defs>

      {/* back wall darkness */}
      <rect x="0" y="0" width="1920" height="1080" fill="oklch(0.14 0.03 35)" />
      {/* warm wall wash */}
      <rect x="0" y="0" width="1920" height="1080" fill="url(#wallLight)" />
      {/* course lines */}
      <rect x="0" y="0" width="1920" height="1080" fill="url(#stoneCourses)" opacity="0.5" />
      {/* stone grain */}
      <rect x="0" y="0" width="1920" height="1080" fill="url(#chStoneTex)" opacity="0.4" />

      {/* FLOOR */}
      <g>
        <polygon points="0,820 1920,820 1920,1080 0,1080" fill="url(#floor)" />
        <polygon points="0,820 1920,820 1920,1080 0,1080" fill="url(#chStoneTex)" opacity="0.35" />
        {Array.from({ length: 12 }).map((_, i) => {
          const t = i / 11;
          const y = 820 + Math.pow(t, 1.6) * 260;
          return <line key={`fl${i}`} x1="0" y1={y} x2="1920" y2={y} stroke="oklch(0.18 0.03 40 / 0.5)" strokeWidth="1" />;
        })}
        {[-1, -0.6, -0.3, 0.3, 0.6, 1].map((t, i) => (
          <line key={`fv${i}`} x1={960 + t * 960} y1="820" x2={960 + t * 2600} y2="1080" stroke="oklch(0.18 0.03 40 / 0.45)" strokeWidth="1" />
        ))}
        <ellipse cx="960" cy="900" rx="720" ry="180" fill="oklch(0.88 0.16 60 / 0.25)" style={{ filter: "blur(40px)" }} />
      </g>

      {/* LANDSCAPE through arch */}
      {showLandscape && (
        <g clipPath="url(#archClip)" style={p(3)}>
          <rect x="0" y="0" width="1920" height="1080" fill="url(#chSky)" />
          <circle cx="960" cy="540" r="180" fill="url(#chSun)" />
          <circle cx="960" cy="540" r="22" fill="oklch(0.98 0.06 75)" opacity="0.75" />
          <path d="M -50 640 Q 400 580 820 600 Q 1220 540 1720 610 L 1980 700 L -50 700 Z" fill="url(#chHillFar)" />
          <path d="M -50 680 Q 400 620 820 650 Q 1200 600 1560 660 L 1980 740 L -50 740 Z" fill="url(#chHillMid)" />
          <Cypress x={720} y={678} h={40} opacity={0.85} />
          <Cypress x={1140} y={670} h={45} opacity={0.85} />
          <Cypress x={1280} y={676} h={35} opacity={0.8} />
          <path d="M -50 740 Q 400 680 820 720 Q 1200 680 1560 720 L 1980 800 L -50 800 Z" fill="url(#chHillNear)" />
          <path d="M -50 780 Q 400 740 820 770 Q 1200 740 1560 770 L 1980 1080 L -50 1080 Z" fill="url(#chGrass)" />
          <circle cx="820" cy="820" r="2" fill="oklch(0.95 0.16 70)" style={{ filter: "drop-shadow(0 0 6px oklch(0.9 0.18 60))", animation: "twinkle 2.4s ease-in-out infinite" }} />
          <circle cx="1080" cy="840" r="1.8" fill="oklch(0.95 0.16 70)" style={{ filter: "drop-shadow(0 0 6px oklch(0.9 0.18 60))", animation: "twinkle 3.1s ease-in-out 0.7s infinite" }} />
        </g>
      )}

      {/* ORB on floor */}
      {showOrb && (
        <g className="orb-group" transform={`translate(${960 + orbGaze.x * 2}, ${895 + orbGaze.y * 0.6})`}>
          <circle cx="0" cy="0" r="60" fill="oklch(0.90 0.14 60 / 0.3)" style={{ filter: "blur(14px)" }} />
          <ellipse cx="0" cy="30" rx="34" ry="5" fill="oklch(0 0 0 / 0.55)" style={{ filter: "blur(2px)" }} />
          <circle cx="0" cy="0" r="24" fill="url(#orbBody)" />
          <circle cx="0" cy="0" r="24" fill="url(#orbRimCh)" />
          <ellipse cx={-8 + orbGaze.x * 0.4} cy={-10 + orbGaze.y * 0.4} rx="6" ry="3.5" fill="oklch(0.98 0.03 60 / 0.5)" style={{ filter: "blur(1px)" }} />
        </g>
      )}

      {/* STONE FRAME around arch */}
      <g>
        <ellipse cx={cx} cy={floor - pillarH * 0.5} rx={archW * 1.4} ry={pillarH * 0.95} fill="url(#chamberGlow)" />
        <path
          d={`
            M ${cx - archR - 24} ${floor}
            L ${cx - archR - 24} ${floor - pillarH}
            A ${archR + 24} ${archR + 24} 0 0 1 ${cx + archR + 24} ${floor - pillarH}
            L ${cx + archR + 24} ${floor}
            L ${cx + archR} ${floor}
            L ${cx + archR} ${floor - pillarH}
            A ${archR} ${archR} 0 0 0 ${cx - archR} ${floor - pillarH}
            L ${cx - archR} ${floor}
            Z
          `}
          fill="url(#stoneRim)"
          fillRule="evenodd"
        />
        <path
          d={`
            M ${cx - archR - 24} ${floor}
            L ${cx - archR - 24} ${floor - pillarH}
            A ${archR + 24} ${archR + 24} 0 0 1 ${cx + archR + 24} ${floor - pillarH}
            L ${cx + archR + 24} ${floor}
            L ${cx + archR} ${floor}
            L ${cx + archR} ${floor - pillarH}
            A ${archR} ${archR} 0 0 0 ${cx - archR} ${floor - pillarH}
            L ${cx - archR} ${floor}
            Z
          `}
          fill="url(#chStoneTex)"
          fillRule="evenodd"
          opacity="0.55"
        />
        <path
          d={`
            M ${cx - archR - 3} ${floor - pillarH}
            A ${archR + 3} ${archR + 3} 0 0 1 ${cx + archR + 3} ${floor - pillarH}
          `}
          stroke="oklch(0.92 0.12 65 / 0.7)"
          strokeWidth="2"
          fill="none"
        />
        {Array.from({ length: 14 }).map((_, i) => {
          const seed = (i * 37) % 100;
          const angle = (i / 14) * Math.PI - Math.PI;
          const r = archR + 10 + (seed % 8);
          const px = cx + Math.cos(angle) * r;
          const py = floor - pillarH + Math.sin(angle) * r + pillarH * 0.3;
          return (
            <circle
              key={i}
              cx={px}
              cy={Math.min(py, floor - 4)}
              r={0.8 + (seed % 3) * 0.3}
              fill="oklch(0.18 0.03 35)"
              opacity={0.4 + (seed % 4) * 0.1}
            />
          );
        })}
      </g>

      <rect x="0" y="0" width="1920" height="1080" fill="url(#vignette2)" />

      {/* Clickable doorway — click through the arch to return to the field */}
      {onDoorwayClick && (
        <g
          className="doorway-exit"
          onClick={onDoorwayClick}
          role="button"
          aria-label="Return to the field"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onDoorwayClick();
            }
          }}
        >
          <path d={archOpening} className="doorway-hit" fill="transparent" />
          <path d={archOpening} className="doorway-tint" fill="oklch(0.96 0.14 65)" opacity="0" />
        </g>
      )}

      {/* Hanging lanterns */}
      {showLanterns && (
        <g opacity="0.9">
          {[
            [240, 320],
            [1680, 320],
          ].map(([lx, ly], i) => (
            <g key={i} style={p(8)}>
              <line x1={lx} y1="0" x2={lx} y2={ly - 24} stroke="oklch(0.22 0.03 40)" strokeWidth="1.5" />
              <rect x={lx - 14} y={ly - 24} width="28" height="36" rx="3" fill="oklch(0.26 0.04 40)" />
              <rect x={lx - 10} y={ly - 20} width="20" height="28" rx="2" fill="oklch(0.92 0.14 60 / 0.75)" />
              <circle cx={lx} cy={ly - 6} r="80" fill="oklch(0.88 0.14 60 / 0.22)" style={{ filter: "blur(20px)" }} />
              <ellipse
                cx={lx}
                cy={ly - 6}
                rx="4"
                ry="7"
                fill="oklch(0.96 0.16 70)"
                style={{ animation: `twinkle ${2.6 + i * 0.3}s ease-in-out infinite` }}
              />
            </g>
          ))}
        </g>
      )}
    </svg>
  );
}
