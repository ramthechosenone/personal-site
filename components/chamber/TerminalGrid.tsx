"use client";

import Link from "next/link";
import { CSSProperties } from "react";
import type { AlcoveSection } from "./AlcoveGrid";

type Snippet = { heading: string; body: string[] };

const SNIPPETS: Record<string, Snippet> = {
  experience: {
    heading: "const experience = [",
    body: [
      '  "enSYNC · 2015→now",',
      '  "Software Engineer",',
      '  ".NET · Azure · C#",',
      "];",
    ],
  },
  skills: {
    heading: "export const stack = {",
    body: [
      '  langs: ["TS","C#","Py"],',
      '  cloud: ["Azure","GCP"],',
      '  ml:    ["torch","xgb"],',
      "};",
    ],
  },
  cases: {
    heading: "const shipped = [",
    body: [
      '  "VoterVoice Platform",',
      '  "BrightSpace LMS",',
      '  "Kiosk Xpress",',
      "];",
    ],
  },
  deep: {
    heading: "const writeups = [",
    body: [
      '  "FPL Predictor",',
      '  "Movie Recommender",',
      '  "Architecture Notes",',
      "];",
    ],
  },
  side: {
    heading: "const experiments = [",
    body: [
      '  "Afterthoughts · iOS",',
      '  "Churn Service · GCP",',
      '  "OpenClaw · AI",',
      "];",
    ],
  },
};

function snippetFor(key: string, title: string): Snippet {
  return (
    SNIPPETS[key] || {
      heading: `const ${key} = [`,
      body: [`  "${title}",`, "];"],
    }
  );
}

/**
 * Terminal variant — powered-off monitor panes for work subpages.
 * Muted glass, dim traffic-light dots, tiny power LED. No glow.
 */
export function TerminalGrid({ sections }: { sections: AlcoveSection[] }) {
  return (
    <div className="terminal-grid">
      <div
        className="terminal-row"
        style={{ "--terminal-cols": sections.length } as CSSProperties}
      >
        {sections.map((s) => {
          const snip = snippetFor(s.key, s.title);
          return (
            <Link
              key={s.key}
              href={s.href}
              className={`terminal terminal--${s.key}`}
              aria-label={s.title}
              style={
                {
                  "--accent": `var(--accent-${s.accentKey})`,
                  "--halo": `var(--accent-${s.accentKey}-halo)`,
                } as CSSProperties
              }
            >
              <div className="terminal-bezel">
                <div className="terminal-dots" aria-hidden="true">
                  <span className="td td-r" />
                  <span className="td td-y" />
                  <span className="td td-g" />
                </div>
                <div className="terminal-screen">
                  <div className="terminal-screen-glass" />
                  <div className="terminal-screen-reflection" />
                  <div className="terminal-code">
                    <div className="terminal-heading">{snip.heading}</div>
                    {snip.body.map((line, li) => (
                      <div
                        key={li}
                        className="terminal-line"
                        style={{ "--line-i": li } as CSSProperties}
                      >
                        {line}
                      </div>
                    ))}
                    <div className="terminal-cursor" aria-hidden="true">
                      _
                    </div>
                  </div>
                </div>
                <div className="terminal-foot">
                  <span className="terminal-led" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
