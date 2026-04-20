"use client";

type Gaze = { x: number; y: number };

export function OrbMoon({ gaze = { x: 0, y: 0 } }: { gaze?: Gaze }) {
  return (
    <g aria-hidden="true">
      <ellipse cx="0" cy="0" rx="180" ry="170" fill="oklch(0.92 0.1 70 / 0.32)" style={{ filter: "blur(28px)" }} />
      <ellipse cx="0" cy="118" rx="120" ry="11" fill="oklch(0.18 0.03 270 / 0.4)" style={{ filter: "blur(5px)" }} />
      <ellipse cx="0" cy="114" rx="140" ry="6" fill="oklch(0.84 0.14 55 / 0.5)" style={{ filter: "blur(3px)" }} />
      <circle cx="0" cy="0" r="96" fill="oklch(0.93 0.06 75)" />
      <circle cx="26" cy="22" r="88" fill="oklch(0.82 0.08 55 / 0.35)" style={{ filter: "blur(8px)" }} />
      <circle cx="0" cy="0" r="96" fill="none" stroke="oklch(0.98 0.04 75 / 0.4)" strokeWidth="3" style={{ filter: "blur(2px)" }} />
      <circle cx={-20 + gaze.x * 0.5} cy={-20 + gaze.y * 0.3} r="7" fill="oklch(0.72 0.14 68)" opacity="0.7" />
      <g fill="oklch(0.30 0.09 150)">
        {[-90, -62, -30, 10, 40, 72, 98].map((bx, i) => (
          <rect key={i} x={bx} y={108 + ((i * 3) % 6)} width="1.3" height={9 + ((i * 5) % 8)} />
        ))}
      </g>
    </g>
  );
}

export function OrbInkStone({ gaze = { x: 0, y: 0 } }: { gaze?: Gaze }) {
  return (
    <g aria-hidden="true">
      <ellipse cx="0" cy="10" rx="190" ry="130" fill="oklch(0.82 0.14 55 / 0.25)" style={{ filter: "blur(30px)" }} />
      <ellipse cx="0" cy="120" rx="130" ry="13" fill="oklch(0.12 0.02 270 / 0.5)" style={{ filter: "blur(5px)" }} />
      <path d="M -95 30 C -110 -20, -70 -90, 0 -92 C 60 -94, 105 -40, 102 15 C 108 70, 70 115, 0 118 C -70 118, -102 70, -95 30 Z" fill="oklch(0.22 0.05 270)" />
      <path d="M -85 10 C -95 -30, -55 -75, -5 -80 C 20 -80, 30 -75, 40 -65 C 10 -60, -30 -45, -60 -15 C -75 5, -82 15, -85 10 Z" fill="oklch(0.38 0.08 265)" opacity="0.7" />
      <path d="M 40 40 C 80 30, 108 55, 95 90 C 70 110, 30 115, 0 115 C 30 95, 50 75, 45 45 Z" fill="oklch(0.55 0.12 55)" opacity="0.45" style={{ filter: "blur(6px)" }} />
      <g fill="oklch(0.82 0.15 72)" opacity="0.75">
        {([[-40,-40,1.6],[-20,-20,1.2],[10,-50,1.8],[30,-25,1.4],[-55,10,1.3],[-25,30,1.7],[15,25,1.2],[45,10,1.5],[60,-10,1.3],[-65,-20,1.1],[-10,0,2.2],[25,55,1.4],[-35,65,1.3],[55,55,1.6]] as const).map(([cx, cy, r], i) => (
          <circle key={i} cx={cx} cy={cy} r={r} />
        ))}
      </g>
      <circle cx={gaze.x * 0.4} cy={-5 + gaze.y * 0.2} r="6" fill="oklch(0.88 0.16 72)" style={{ filter: "drop-shadow(0 0 6px oklch(0.9 0.18 70))" }} />
      <circle cx={gaze.x * 0.4} cy={-5 + gaze.y * 0.2} r="2.5" fill="oklch(0.96 0.08 75)" />
      <g fill="oklch(0.30 0.09 150)">
        {[-110, -80, -50, -18, 20, 55, 90, 115].map((bx, i) => (
          <rect key={i} x={bx} y={114 + ((i * 3) % 6)} width="1.3" height={9 + ((i * 5) % 8)} />
        ))}
      </g>
    </g>
  );
}

export function OrbLantern({ gaze = { x: 0, y: 0 } }: { gaze?: Gaze }) {
  const frame = "oklch(0.18 0.03 40)";
  const paper = "oklch(0.82 0.12 72)";
  const glow = "oklch(0.92 0.14 72)";
  return (
    <g aria-hidden="true">
      <ellipse cx="0" cy="10" rx="220" ry="200" fill="oklch(0.88 0.14 65 / 0.35)" style={{ filter: "blur(35px)" }} />
      <ellipse cx="0" cy="130" rx="80" ry="8" fill="oklch(0.14 0.02 270 / 0.5)" style={{ filter: "blur(4px)" }} />
      <ellipse cx="0" cy="125" rx="160" ry="12" fill="oklch(0.88 0.14 65 / 0.7)" style={{ filter: "blur(6px)" }} />
      <path d="M -42 -100 L 42 -100 L 36 -92 L -36 -92 Z" fill={frame} />
      <rect x="-28" y="-104" width="56" height="4" fill={frame} />
      <path d="M -4 -118 Q 0 -128 4 -118" fill="none" stroke={frame} strokeWidth="2" />
      <line x1="0" y1="-128" x2="0" y2="-160" stroke={frame} strokeWidth="1" opacity="0.5" />
      <rect x="-42" y="-92" width="84" height="180" rx="10" ry="10" fill={paper} />
      <rect x="-38" y="-88" width="76" height="172" rx="8" ry="8" fill={glow} opacity="0.55" />
      <ellipse cx="0" cy="0" rx="30" ry="70" fill="oklch(0.96 0.1 72)" opacity="0.7" style={{ filter: "blur(4px)" }} />
      {[-60, -30, 0, 30, 60].map((y, i) => (
        <rect key={i} x="-42" y={y - 1} width="84" height="2" fill={frame} opacity="0.8" />
      ))}
      <line x1="-42" y1="-92" x2="-42" y2="88" stroke={frame} strokeWidth="2" />
      <line x1="42" y1="-92" x2="42" y2="88" stroke={frame} strokeWidth="2" />
      <path d="M -42 88 L 42 88 L 36 96 L -36 96 Z" fill={frame} />
      <rect x="-28" y="96" width="56" height="4" fill={frame} />
      <line x1="0" y1="100" x2="0" y2="118" stroke={frame} strokeWidth="1.5" />
      <circle cx="0" cy="122" r="3" fill={frame} />
      <ellipse cx={gaze.x * 0.2} cy={gaze.y * 0.1} rx="6" ry="12" fill="oklch(0.98 0.08 75)" opacity="0.9" />
      <g fill="oklch(0.30 0.09 150)">
        {[-70, -48, -20, 15, 38, 62, 85].map((bx, i) => (
          <rect key={i} x={bx} y={120 + ((i * 3) % 6)} width="1.3" height={10 + ((i * 5) % 8)} />
        ))}
      </g>
    </g>
  );
}

export function OrbShrineDisc({ gaze = { x: 0, y: 0 } }: { gaze?: Gaze }) {
  return (
    <g aria-hidden="true">
      <ellipse cx="0" cy="0" rx="180" ry="160" fill="oklch(0.85 0.14 55 / 0.3)" style={{ filter: "blur(28px)" }} />
      <ellipse cx="0" cy="120" rx="130" ry="12" fill="oklch(0.14 0.02 270 / 0.5)" style={{ filter: "blur(5px)" }} />
      <path d="M -120 0 A 120 120 0 0 1 120 0" fill="none" stroke="oklch(0.78 0.14 78)" strokeWidth="3" />
      <path d="M -104 0 A 104 104 0 0 1 104 0" fill="none" stroke="oklch(0.85 0.13 76)" strokeWidth="1.2" opacity="0.7" />
      <g fill="oklch(0.88 0.14 75)">
        {[-110, -85, -55, -20, 20, 55, 85, 110].map((x, i) => {
          const angle = Math.asin(-x / 120);
          const y = -120 * Math.cos(angle);
          return <circle key={i} cx={x} cy={y} r="1.8" opacity="0.9" />;
        })}
      </g>
      <circle cx="0" cy="0" r="88" fill="oklch(0.18 0.03 270)" />
      <circle cx={-10 + gaze.x * 0.4} cy={-10 + gaze.y * 0.2} r="60" fill="oklch(0.28 0.05 265 / 0.5)" style={{ filter: "blur(8px)" }} />
      <circle cx={gaze.x * 0.3} cy={gaze.y * 0.15} r="9" fill="oklch(0.78 0.14 78)" />
      <circle cx={gaze.x * 0.3 - 2} cy={gaze.y * 0.15 - 2} r="3" fill="oklch(0.92 0.1 75)" />
      <circle cx="0" cy="0" r="88" fill="none" stroke="oklch(0.68 0.14 60 / 0.5)" strokeWidth="1.5" />
      <g fill="oklch(0.30 0.09 150)">
        {[-95, -68, -38, -8, 22, 52, 78, 98].map((bx, i) => (
          <rect key={i} x={bx} y={108 + ((i * 3) % 6)} width="1.3" height={9 + ((i * 5) % 8)} />
        ))}
      </g>
    </g>
  );
}

export function OrbBindu({ gaze = { x: 0, y: 0 } }: { gaze?: Gaze }) {
  return (
    <g aria-hidden="true">
      <style>{`
        @keyframes bindu-breath { 0%,100% { opacity:.88; transform:scale(1) } 50% { opacity:1; transform:scale(1.12) } }
        @keyframes bindu-halo { 0%,100% { opacity:.55 } 50% { opacity:.8 } }
        .bindu-core { animation: bindu-breath 6.5s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
        .bindu-halo { animation: bindu-halo 6.5s ease-in-out infinite; }
      `}</style>
      <circle cx="0" cy="-4" r="150" fill="oklch(0.82 0.14 60 / 0.28)" style={{ filter: "blur(34px)" }} className="bindu-halo" />
      <circle cx="0" cy="-4" r="118" fill="oklch(0.88 0.12 72 / 0.22)" style={{ filter: "blur(18px)" }} />
      <ellipse cx="0" cy="118" rx="118" ry="10" fill="oklch(0.10 0.02 270 / 0.5)" style={{ filter: "blur(5px)" }} />
      <circle cx="0" cy="0" r="96" fill="oklch(0.38 0.06 285)" />
      <circle cx="0" cy="0" r="96" fill="oklch(0.60 0.10 60 / 0.22)" style={{ filter: "blur(22px)" }} />
      <g fill="none" stroke="oklch(0.92 0.08 72)" strokeWidth="0.6">
        <circle cx="0" cy="0" r="22" opacity="0.55" />
        <circle cx="0" cy="0" r="44" opacity="0.32" />
        <circle cx="0" cy="0" r="66" opacity="0.20" />
        <circle cx="0" cy="0" r="86" opacity="0.12" />
      </g>
      <circle cx="0" cy="0" r="96" fill="none" stroke="oklch(0.82 0.14 72 / 0.7)" strokeWidth="1" />
      <g transform={`translate(${gaze.x * 0.25}, ${gaze.y * 0.18})`}>
        <circle cx="0" cy="0" r="14" fill="oklch(0.92 0.08 72 / 0.55)" style={{ filter: "blur(6px)" }} />
        <circle cx="0" cy="0" r="6.5" fill="oklch(0.98 0.05 78)" className="bindu-core" />
      </g>
      <g transform="translate(0, -72)" fill="none" stroke="oklch(0.78 0.12 72 / 0.7)" strokeWidth="1.2" strokeLinecap="round">
        <path d="M -7 2 A 7 7 0 0 1 7 2" />
        <circle cx="0" cy="-6" r="1.4" fill="oklch(0.88 0.12 72 / 0.8)" stroke="none" />
      </g>
      <g fill="oklch(0.30 0.09 150 / 0.75)">
        {[-90, -62, -30, 10, 40, 72, 98].map((bx, i) => (
          <rect key={i} x={bx} y={108 + ((i * 3) % 6)} width="1.3" height={9 + ((i * 5) % 8)} />
        ))}
      </g>
    </g>
  );
}

export function LotusMandala({ gaze = { x: 0, y: 0 } }: { gaze?: Gaze }) {
  const indigo = "oklch(0.32 0.08 265)";
  const indigoHi = "oklch(0.42 0.10 260)";
  const amber = "oklch(0.68 0.15 60)";
  const amberHi = "oklch(0.78 0.14 65)";
  const cream = "oklch(0.92 0.05 75)";
  const goldDeep = "oklch(0.72 0.14 78)";
  const goldLite = "oklch(0.88 0.14 75)";
  const ink = "oklch(0.18 0.03 270)";

  const petal = (len: number, wid: number, cx: number, cy: number, color: string, stroke: string | null) => (
    <path
      d={`M ${cx} ${cy - len} Q ${cx + wid} ${cy - len * 0.55} ${cx + wid * 0.45} ${cy - len * 0.12} Q ${cx} ${cy} ${cx - wid * 0.45} ${cy - len * 0.12} Q ${cx - wid} ${cy - len * 0.55} ${cx} ${cy - len} Z`}
      fill={color}
      stroke={stroke || "none"}
      strokeWidth={stroke ? 0.8 : 0}
    />
  );
  const petalRing = (n: number, len: number, wid: number, radius: number, color: string, stroke: string | null = null, startAngle = 0) =>
    Array.from({ length: n }).map((_, i) => {
      const a = startAngle + (i * 360) / n;
      return (
        <g key={i} transform={`rotate(${a})`}>
          {petal(len, wid, 0, -radius, color, stroke)}
        </g>
      );
    });

  return (
    <g aria-hidden="true">
      <ellipse cx="0" cy="0" rx="210" ry="180" fill="oklch(0.82 0.14 55 / 0.28)" style={{ filter: "blur(30px)" }} />
      <ellipse cx="0" cy="0" rx="160" ry="140" fill="oklch(0.9 0.14 65 / 0.22)" style={{ filter: "blur(18px)" }} />
      <ellipse cx="0" cy="128" rx="140" ry="14" fill="oklch(0.18 0.03 270 / 0.35)" style={{ filter: "blur(6px)" }} />
      <ellipse cx="0" cy="130" rx="85" ry="6" fill="oklch(0.14 0.02 270 / 0.45)" style={{ filter: "blur(2px)" }} />
      <g opacity="0.92">{petalRing(16, 118, 18, 0, indigo)}</g>
      <g opacity="0.55">{petalRing(16, 40, 6, 78, indigoHi)}</g>
      <g opacity="0.95">{petalRing(12, 88, 16, 0, amber, ink, 15)}</g>
      <g opacity="0.6">{petalRing(12, 30, 5, 58, amberHi, null, 15)}</g>
      <g opacity="0.95">{petalRing(10, 56, 13, 0, cream, ink, 0)}</g>
      <circle cx="0" cy="0" r="26" fill={indigo} />
      <circle cx="0" cy="0" r="26" fill="none" stroke={goldDeep} strokeWidth="1.2" />
      <circle cx={gaze.x * 0.3} cy={gaze.y * 0.1} r="16" fill={goldLite} style={{ filter: "drop-shadow(0 0 8px oklch(0.88 0.18 70))" }} />
      <circle cx={gaze.x * 0.3} cy={gaze.y * 0.1} r="8" fill={goldDeep} />
      <circle cx={gaze.x * 0.3 - 2} cy={gaze.y * 0.1 - 2} r="2.5" fill="oklch(0.98 0.04 75)" />
      <g fill={goldLite} opacity="0.85">
        {Array.from({ length: 16 }).map((_, i) => {
          const a = (((i + 0.5) * 360) / 16) * Math.PI / 180;
          return <circle key={i} cx={Math.sin(a) * 122} cy={-Math.cos(a) * 122} r="2.2" />;
        })}
      </g>
      <g fill={goldDeep} opacity="0.8">
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (((i + 0.5) * 360) / 8) * Math.PI / 180;
          return <circle key={i} cx={Math.sin(a) * 38} cy={-Math.cos(a) * 38} r="1.6" />;
        })}
      </g>
      <g fill="oklch(0.30 0.09 150)">
        {[-120, -88, -55, -22, 28, 62, 96, 124].map((bx, i) => (
          <rect key={i} x={bx} y={114 + ((i * 3) % 8)} width="1.3" height={10 + ((i * 5) % 10)} />
        ))}
      </g>
      <g fill="oklch(0.48 0.10 155)">
        {[-100, -68, -34, 12, 48, 82, 115].map((bx, i) => (
          <rect key={`fg${i}`} x={bx} y={118 + ((i * 4) % 6)} width="1" height={8 + ((i * 4) % 6)} />
        ))}
      </g>
    </g>
  );
}

export function OrbEther({ gaze = { x: 0, y: 0 } }: { gaze?: Gaze }) {
  return (
    <g aria-hidden="true" className="orb-ether">
      <style>{`
        .orb-ether { cursor: pointer; }
        @keyframes ether-halo-rest { 0%,100%{opacity:.42} 50%{opacity:.58} }
        @keyframes ether-core-rest { 0%,100%{transform:scale(1);opacity:.92} 50%{transform:scale(1.015);opacity:1} }
        .ether-halo-outer { animation: ether-halo-rest 7s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
        .ether-halo-inner { animation: ether-halo-rest 7s ease-in-out -2s infinite; transform-box: fill-box; transform-origin: center; }
        .ether-core { animation: ether-core-rest 6.5s ease-in-out infinite; transform-box: fill-box; transform-origin: center; transition: filter 0.9s ease; }
        .ether-rings { opacity: 0; transition: opacity 0.9s ease; }
        .ether-bindu { opacity: 0; transition: opacity 0.6s ease 0.25s; }
        .ether-chandra { opacity: 0; transform: translate(0,-66px) scale(0.85); transform-box: fill-box; transform-origin: center; transition: opacity 0.7s ease 0.35s, transform 0.9s cubic-bezier(.2,.8,.2,1) 0.35s; }
        .ether-rim-gold { opacity: 0; transition: opacity 0.7s ease 0.15s; }
        .ether-ring-rot { transform-box: fill-box; transform-origin: center; transform: rotate(0deg); transition: transform 1.6s ease; }
        .orb-ether:hover .ether-rings { opacity: 1; }
        .orb-ether:hover .ether-bindu { opacity: 1; }
        .orb-ether:hover .ether-chandra { opacity: 1; transform: translate(0,-72px) scale(1); }
        .orb-ether:hover .ether-rim-gold { opacity: 1; }
        .orb-ether:hover .ether-halo-outer { animation-duration: 3.2s; }
        .orb-ether:hover .ether-halo-inner { animation-duration: 3.2s; }
        .orb-ether:hover .ether-core { animation-duration: 3.2s; filter: drop-shadow(0 0 14px oklch(0.72 0.08 295 / 0.45)); }
        .orb-ether:hover .ether-ring-rot { transform: rotate(18deg); }
        @media (prefers-reduced-motion: reduce) {
          .ether-halo-outer, .ether-halo-inner, .ether-core { animation: none; }
          .ether-rings, .ether-bindu, .ether-chandra, .ether-rim-gold { transition-duration: 0.2s; }
        }
      `}</style>
      <circle cx="0" cy="-6" r="170" fill="oklch(0.62 0.06 280 / 0.32)" style={{ filter: "blur(44px)" }} className="ether-halo-outer" />
      <circle cx="0" cy="-4" r="118" fill="oklch(0.70 0.05 285 / 0.28)" style={{ filter: "blur(22px)" }} className="ether-halo-inner" />
      <ellipse cx="0" cy="118" rx="110" ry="9" fill="oklch(0.10 0.03 275 / 0.45)" style={{ filter: "blur(5px)" }} />
      <g className="ether-core">
        <circle cx="0" cy="0" r="94" fill="oklch(0.52 0.05 275)" />
        <circle cx="0" cy="0" r="94" fill="oklch(0.74 0.06 285 / 0.28)" style={{ filter: "blur(30px)" }} />
        <ellipse cx={-16 + gaze.x * 0.3} cy={-30 + gaze.y * 0.3} rx="34" ry="22" fill="oklch(0.82 0.04 285 / 0.25)" style={{ filter: "blur(14px)" }} />
        <circle cx="0" cy="0" r="94" fill="none" stroke="oklch(0.68 0.04 280 / 0.45)" strokeWidth="0.8" />
      </g>
      <g className="ether-ring-rot">
        <g className="ether-rings" fill="none" strokeLinecap="round">
          <g stroke="oklch(0.86 0.10 75)">
            <circle cx="0" cy="0" r="20" strokeWidth="0.6" opacity="0.85" />
            <circle cx="0" cy="0" r="38" strokeWidth="0.5" opacity="0.55" />
            <circle cx="0" cy="0" r="58" strokeWidth="0.5" opacity="0.35" />
            <circle cx="0" cy="0" r="78" strokeWidth="0.5" opacity="0.22" />
            <circle cx="0" cy="0" r="90" strokeWidth="0.4" opacity="0.14" />
          </g>
          <g fill="oklch(0.88 0.10 72 / 0.75)" stroke="none">
            {Array.from({ length: 12 }).map((_, i) => {
              const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
              return <circle key={i} cx={Math.cos(a) * 48} cy={Math.sin(a) * 48} r="1.3" />;
            })}
          </g>
          <g stroke="oklch(0.86 0.10 75 / 0.55)" strokeWidth="0.6">
            {Array.from({ length: 8 }).map((_, i) => {
              const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
              return <line key={i} x1={Math.cos(a) * 72} y1={Math.sin(a) * 72} x2={Math.cos(a) * 82} y2={Math.sin(a) * 82} />;
            })}
          </g>
        </g>
      </g>
      <circle cx="0" cy="0" r="94" fill="none" stroke="oklch(0.84 0.12 72 / 0.55)" strokeWidth="0.8" className="ether-rim-gold" />
      <g className="ether-bindu" transform={`translate(${gaze.x * 0.2}, ${gaze.y * 0.14})`}>
        <circle cx="0" cy="0" r="11" fill="oklch(0.92 0.08 72 / 0.55)" style={{ filter: "blur(5px)" }} />
        <circle cx="0" cy="0" r="4.5" fill="oklch(0.98 0.04 78)" />
      </g>
      <g className="ether-chandra" fill="none" stroke="oklch(0.82 0.10 72 / 0.8)" strokeWidth="1.1" strokeLinecap="round">
        <path d="M -7 2 A 7 7 0 0 1 7 2" />
        <circle cx="0" cy="-6" r="1.3" fill="oklch(0.90 0.10 72 / 0.85)" stroke="none" />
      </g>
      <circle cx="0" cy="0" r="110" fill="transparent" style={{ pointerEvents: "all" }} />
      <g fill="oklch(0.30 0.09 150 / 0.75)" style={{ pointerEvents: "none" }}>
        {[-88, -60, -28, 12, 42, 72, 96].map((bx, i) => (
          <rect key={i} x={bx} y={108 + ((i * 3) % 6)} width="1.3" height={9 + ((i * 5) % 8)} />
        ))}
      </g>
    </g>
  );
}

export type OrbVariant = "ether" | "bindu" | "lotus" | "moon" | "inkstone" | "stone" | "lantern" | "shrine";

export function Orb({ variant, gaze }: { variant: OrbVariant; gaze: Gaze }) {
  switch (variant) {
    case "moon": return <OrbMoon gaze={gaze} />;
    case "inkstone":
    case "stone": return <OrbInkStone gaze={gaze} />;
    case "lantern": return <OrbLantern gaze={gaze} />;
    case "shrine": return <OrbShrineDisc gaze={gaze} />;
    case "lotus": return <LotusMandala gaze={gaze} />;
    case "bindu": return <OrbBindu gaze={gaze} />;
    case "ether":
    default: return <OrbEther gaze={gaze} />;
  }
}
