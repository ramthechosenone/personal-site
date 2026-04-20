"use client";

import Link from "next/link";
import { CSSProperties } from "react";
import type { AlcoveSection } from "./AlcoveGrid";

/**
 * Cairn variant of the subpage grid.
 * Each section is a stack of irregular stones — minimal, meditative,
 * thematically aligned with the dusk/inkwash palette.
 */
export function CairnGrid({ sections }: { sections: AlcoveSection[] }) {
  return (
    <div className="cairn-grid">
      <div
        className="cairn-row"
        style={{ "--cairn-cols": sections.length } as CSSProperties}
      >
        {sections.map((s, i) => (
          <Link
            key={s.key}
            href={s.href}
            className={`cairn cairn--${s.key}`}
            aria-label={s.title}
            style={
              {
                "--accent": `var(--accent-${s.accentKey})`,
                "--tint-hi": `var(--accent-${s.accentKey}-tint-hi)`,
                "--tint-lo": `var(--accent-${s.accentKey}-tint-lo)`,
                "--halo": `var(--accent-${s.accentKey}-halo)`,
              } as CSSProperties
            }
          >
            <div className="cairn-stack">
              <Cairn seed={i} />
            </div>
            <h3 className="cairn-title">{s.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}

/** Draw a stack of 5 stones with slight per-seed variation so each cairn differs. */
function Cairn({ seed }: { seed: number }) {
  // deterministic tiny jitter so stones don't all look identical between sections
  const j = (n: number) => ((Math.sin(seed * 12.9898 + n * 78.233) + 1) / 2 - 0.5) * 2;

  // stones top→bottom: each { cx, cy, rx, ry, rot }
  const stones = [
    { cx: 60, cy: 40, rx: 16 + j(1) * 2, ry: 10 + j(2) * 1.5, rot: -4 + j(3) * 6 },
    { cx: 60 + j(4) * 3, cy: 62, rx: 24 + j(5) * 2, ry: 13 + j(6) * 2, rot: 3 + j(7) * 6 },
    { cx: 60 + j(8) * 2, cy: 88, rx: 34 + j(9) * 3, ry: 16 + j(10) * 2, rot: -2 + j(11) * 5 },
    { cx: 60 + j(12) * 2, cy: 118, rx: 44 + j(13) * 3, ry: 19 + j(14) * 2, rot: 2 + j(15) * 4 },
    { cx: 60, cy: 152, rx: 52 + j(16) * 3, ry: 22 + j(17) * 2, rot: -1 + j(18) * 3 },
  ];

  return (
    <svg
      className="cairn-svg"
      viewBox="0 0 120 190"
      preserveAspectRatio="xMidYMax meet"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`cairn-stone-${seed}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="oklch(0.58 0.008 250)" />
          <stop offset="55%" stopColor="oklch(0.42 0.006 250)" />
          <stop offset="100%" stopColor="oklch(0.28 0.005 250)" />
        </linearGradient>
        <filter id={`cairn-grain-${seed}`} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="1.8" numOctaves="2" seed={seed + 1} />
          <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.18 0" />
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>
      </defs>

      {/* ground shadow */}
      <ellipse cx="60" cy="178" rx="54" ry="4" fill="oklch(0 0 0 / 0.35)" />

      {stones.map((st, i) => (
        <g key={i} transform={`rotate(${st.rot} ${st.cx} ${st.cy})`}>
          {/* stone body — matte gradient */}
          <ellipse
            cx={st.cx}
            cy={st.cy}
            rx={st.rx}
            ry={st.ry}
            fill={`url(#cairn-stone-${seed})`}
            stroke="oklch(0.18 0.005 250 / 0.9)"
            strokeWidth="0.5"
          />
          {/* grain texture for matte feel */}
          <ellipse
            cx={st.cx}
            cy={st.cy}
            rx={st.rx}
            ry={st.ry}
            fill="oklch(0.5 0.02 45)"
            filter={`url(#cairn-grain-${seed})`}
            opacity="0.5"
          />
          {/* under-shadow contact */}
          <ellipse
            cx={st.cx}
            cy={st.cy + st.ry * 0.9}
            rx={st.rx * 0.85}
            ry={st.ry * 0.15}
            fill="oklch(0 0 0 / 0.4)"
          />
        </g>
      ))}
    </svg>
  );
}
