"use client";

import { useEffect, useState } from "react";

export function useIsMobile(bp = 720) {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${bp}px)`);
    const onChange = (e: MediaQueryListEvent) => setMobile(e.matches);
    setMobile(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [bp]);

  return mobile;
}

type Target = "personal" | "work";

type Props = {
  name: string;
  tagline: string;
  time: string;
  location: string;
  onEnter: (which: Target) => void;
  contactHref: string;
};

export default function MobileHome({
  name,
  tagline,
  time,
  location,
  onEnter,
  contactHref,
}: Props) {
  return (
    <div className="mobile-home">
      <div className="m-topbar">
        <div className="m-name">
          <span className="dot" />
          <span>{name.toUpperCase()}</span>
        </div>
        <a className="m-contact" href={contactHref}>
          CONTACT
        </a>
      </div>

      <div className="m-intro">
        <span className="m-kicker">PORTFOLIO · V2026</span>
        <h1 className="m-tagline">{tagline}</h1>
      </div>

      <div className="m-archrow">
        <button className="m-arch" type="button" onClick={() => onEnter("personal")}>
          <span className="m-arch-num">01</span>
          <span className="m-arch-label">Personal</span>
          <span className="m-arch-caret">→</span>
        </button>
        <button className="m-arch" type="button" onClick={() => onEnter("work")}>
          <span className="m-arch-num">02</span>
          <span className="m-arch-label">Work</span>
          <span className="m-arch-caret">→</span>
        </button>
      </div>

      <div className="m-footer">
        <span>{time.toUpperCase()}</span>
        <span>{location}</span>
      </div>
    </div>
  );
}
