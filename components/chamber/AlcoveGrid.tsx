"use client";

import Link from "next/link";
import { CSSProperties } from "react";
import { EtchedIcon } from "./EtchedIcons";

export type AlcoveSection = {
  key: string;
  title: string;
  kicker: string;
  icon:
    | "camera"
    | "book"
    | "figure"
    | "clock"
    | "briefcase"
    | "tools"
    | "scroll"
    | "lens"
    | "plane";
  href: string;
  accentKey: string;
};

export function AlcoveGrid({ sections }: { sections: AlcoveSection[] }) {
  return (
    <div className="alcove-grid">
      <div
        className="alcove-row"
        style={{ "--alcove-cols": sections.length } as CSSProperties}
      >
        {sections.map((s) => (
          <Link
            key={s.key}
            href={s.href}
            className={`alcove alcove--${s.key}`}
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
            <div className="alcove-frame">
              <div className="alcove-inner">
                <div className="alcove-glow" />
                <div className="alcove-glyph-wrap">
                  <div className="alcove-glyph">
                    <EtchedIcon name={s.icon} />
                  </div>
                </div>
                <h3 className="alcove-title">{s.title}</h3>
                <div className="alcove-kicker">{s.kicker}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
