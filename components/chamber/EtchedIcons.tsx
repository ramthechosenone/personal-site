export function IconCamera() {
  return (
    <svg className="etched-icon icon-camera" viewBox="0 0 100 80" fill="none">
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <rect x="10" y="22" width="80" height="48" rx="3" strokeWidth="1.1" strokeDasharray="2 2" />
        <path d="M 34 22 L 40 14 L 60 14 L 66 22" strokeWidth="1.1" strokeDasharray="2 2" />
        <rect x="14" y="28" width="10" height="4" rx="1" strokeWidth="0.8" />
        <g className="shutter" style={{ transformOrigin: "50px 48px" }}>
          <circle cx="50" cy="48" r="17" strokeWidth="1.1" />
          <circle cx="50" cy="48" r="10" strokeWidth="0.8" strokeDasharray="1.5 2" />
          <g strokeWidth="0.6" opacity="0.7">
            <path d="M 50 32 L 56 45" />
            <path d="M 64 44 L 55 50" />
            <path d="M 62 56 L 53 53" />
            <path d="M 52 64 L 50 54" />
            <path d="M 38 61 L 47 52" />
            <path d="M 34 49 L 45 49" />
            <path d="M 38 38 L 47 46" />
          </g>
        </g>
        <circle className="blink" cx="80" cy="30" r="1.4" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

export function IconBook() {
  return (
    <svg className="etched-icon icon-book" viewBox="0 0 100 80" fill="none">
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1" strokeDasharray="2 2">
        <g className="page-left" style={{ transformOrigin: "50px 20px" }}>
          <path d="M 50 20 L 50 66 L 18 62 L 14 18 Z" />
          <g strokeWidth="0.55" strokeDasharray="0" opacity="0.55">
            <line x1="20" y1="28" x2="44" y2="30" />
            <line x1="20" y1="34" x2="44" y2="36" />
            <line x1="20" y1="40" x2="40" y2="42" />
            <line x1="20" y1="46" x2="42" y2="48" />
          </g>
        </g>
        <g className="page-right" style={{ transformOrigin: "50px 20px" }}>
          <path d="M 50 20 L 50 66 L 82 62 L 86 18 Z" />
          <g strokeWidth="0.55" strokeDasharray="0" opacity="0.55">
            <line x1="56" y1="28" x2="80" y2="30" />
            <line x1="56" y1="34" x2="80" y2="36" />
            <line x1="56" y1="40" x2="76" y2="42" />
            <line x1="56" y1="46" x2="78" y2="48" />
          </g>
        </g>
        <line x1="50" y1="20" x2="50" y2="66" strokeWidth="0.8" strokeDasharray="0" />
      </g>
    </svg>
  );
}

export function IconFigure() {
  return (
    <svg className="etched-icon icon-figure" viewBox="0 0 100 80" fill="none">
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1" strokeDasharray="2 2">
        <circle className="head" cx="50" cy="18" r="7" />
        <path className="torso" d="M 50 25 L 50 50" />
        <path className="arm-l" d="M 50 32 L 34 26" style={{ transformOrigin: "50px 32px" }} />
        <path className="arm-r" d="M 50 32 L 66 26" style={{ transformOrigin: "50px 32px" }} />
        <path className="leg-l" d="M 50 50 L 40 66" />
        <path className="leg-r" d="M 50 50 L 60 66" />
        <path d="M 28 70 Q 50 74 72 70" strokeWidth="0.55" strokeDasharray="0" opacity="0.45" />
      </g>
    </svg>
  );
}

export function IconClock() {
  return (
    <svg className="etched-icon icon-clock" viewBox="0 0 100 80" fill="none">
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1" strokeDasharray="2 2">
        <circle cx="50" cy="40" r="26" />
        <circle cx="50" cy="40" r="20" strokeWidth="0.6" strokeDasharray="1 3" opacity="0.7" />
        <g strokeWidth="0.7" strokeDasharray="0" opacity="0.7">
          <line x1="50" y1="16" x2="50" y2="19" />
          <line x1="50" y1="61" x2="50" y2="64" />
          <line x1="26" y1="40" x2="29" y2="40" />
          <line x1="71" y1="40" x2="74" y2="40" />
        </g>
      </g>
      <g stroke="currentColor" strokeLinecap="round" strokeDasharray="0">
        <line className="hand-hour" x1="50" y1="40" x2="50" y2="28" strokeWidth="1.2" style={{ transformOrigin: "50px 40px" }} />
        <line className="hand-min" x1="50" y1="40" x2="62" y2="40" strokeWidth="1" style={{ transformOrigin: "50px 40px" }} />
        <circle cx="50" cy="40" r="1.4" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

export function IconBriefcase() {
  return (
    <svg className="etched-icon icon-briefcase" viewBox="0 0 100 80" fill="none">
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1" strokeDasharray="2 2">
        <g className="handle" style={{ transformOrigin: "50px 22px" }}>
          <path d="M 38 22 L 38 16 Q 38 12 42 12 L 58 12 Q 62 12 62 16 L 62 22" />
        </g>
        <rect x="14" y="24" width="72" height="44" rx="3" />
        <line x1="14" y1="40" x2="86" y2="40" strokeWidth="0.7" strokeDasharray="0" opacity="0.65" />
        <rect x="44" y="36" width="12" height="8" rx="1" strokeWidth="0.8" strokeDasharray="0" />
        <circle cx="50" cy="40" r="1.2" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

export function IconTools() {
  return (
    <svg className="etched-icon icon-tools" viewBox="0 0 100 80" fill="none">
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1" strokeDasharray="2 2">
        <g className="wrench" style={{ transformOrigin: "64px 40px" }}>
          <path d="M 30 66 L 58 38 M 26 70 Q 24 70 22 68 Q 20 66 22 64 L 28 58 Q 30 56 32 58 Q 34 60 32 62 Z" />
          <circle cx="68" cy="34" r="10" />
          <path d="M 62 28 L 58 24 L 62 20 L 66 20 L 66 14 L 72 14 L 72 20 L 76 20 L 80 24 L 76 28" strokeWidth="0.9" />
        </g>
        <g className="screwdriver" style={{ transformOrigin: "30px 18px" }}>
          <path d="M 18 18 L 32 18 L 40 26 L 62 48 L 58 52 L 36 30 L 28 22 Z" strokeWidth="0.95" />
          <line x1="20" y1="18" x2="30" y2="18" strokeWidth="0.6" strokeDasharray="0" opacity="0.7" />
        </g>
      </g>
    </svg>
  );
}

export function IconScroll() {
  return (
    <svg className="etched-icon icon-scroll" viewBox="0 0 100 80" fill="none">
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1" strokeDasharray="2 2">
        <g className="scroll-left" style={{ transformOrigin: "20px 40px" }}>
          <ellipse cx="20" cy="40" rx="8" ry="26" />
          <line x1="20" y1="14" x2="20" y2="66" strokeWidth="0.6" strokeDasharray="0" opacity="0.6" />
        </g>
        <g className="scroll-right" style={{ transformOrigin: "80px 40px" }}>
          <ellipse cx="80" cy="40" rx="8" ry="26" />
          <line x1="80" y1="14" x2="80" y2="66" strokeWidth="0.6" strokeDasharray="0" opacity="0.6" />
        </g>
        <path className="parchment" d="M 20 14 L 80 14 M 20 66 L 80 66" />
        <g className="parchment-lines" strokeWidth="0.55" strokeDasharray="0" opacity="0.5">
          <line x1="30" y1="26" x2="70" y2="26" />
          <line x1="30" y1="34" x2="72" y2="34" />
          <line x1="30" y1="42" x2="68" y2="42" />
          <line x1="30" y1="50" x2="70" y2="50" />
        </g>
      </g>
    </svg>
  );
}

export function IconLens() {
  return (
    <svg className="etched-icon icon-lens" viewBox="0 0 100 80" fill="none">
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1" strokeDasharray="2 2">
        <circle cx="42" cy="36" r="22" />
        <circle cx="42" cy="36" r="15" strokeWidth="0.7" strokeDasharray="1 2" opacity="0.7" />
        <path d="M 58 52 L 78 70" strokeWidth="1.4" />
        <g className="lens-ripple" style={{ transformOrigin: "42px 36px" }}>
          <circle cx="42" cy="36" r="7" strokeWidth="0.55" strokeDasharray="0" opacity="0.6" />
          <circle cx="42" cy="36" r="3" strokeWidth="0.55" strokeDasharray="0" opacity="0.75" />
        </g>
        <line x1="34" y1="28" x2="38" y2="32" strokeWidth="0.6" strokeDasharray="0" opacity="0.6" />
      </g>
    </svg>
  );
}

export function IconPlane() {
  return (
    <svg className="etched-icon icon-plane" viewBox="0 0 100 80" fill="none">
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1" strokeDasharray="2 2">
        <g className="plane-body" style={{ transformOrigin: "50px 50px" }}>
          <path d="M 14 56 L 86 22 L 70 46 L 44 44 L 38 62 L 34 50 Z" />
          <line x1="70" y1="46" x2="86" y2="22" strokeWidth="0.7" strokeDasharray="0" opacity="0.6" />
          <line x1="44" y1="44" x2="86" y2="22" strokeWidth="0.7" strokeDasharray="0" opacity="0.5" />
        </g>
        <path className="plane-trail" d="M 6 62 Q 18 60 26 58" strokeWidth="0.55" strokeDasharray="1 2" opacity="0.55" />
      </g>
    </svg>
  );
}

type IconName =
  | "camera"
  | "book"
  | "figure"
  | "clock"
  | "briefcase"
  | "tools"
  | "scroll"
  | "lens"
  | "plane";

export function EtchedIcon({ name }: { name: IconName }) {
  switch (name) {
    case "camera":    return <IconCamera />;
    case "book":      return <IconBook />;
    case "figure":    return <IconFigure />;
    case "clock":     return <IconClock />;
    case "briefcase": return <IconBriefcase />;
    case "tools":     return <IconTools />;
    case "scroll":    return <IconScroll />;
    case "lens":      return <IconLens />;
    case "plane":     return <IconPlane />;
    default:          return null;
  }
}
