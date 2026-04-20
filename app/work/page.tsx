"use client";

import ChamberPage from "@/components/chamber/ChamberPage";
import type { AlcoveSection } from "@/components/chamber/AlcoveGrid";

const SECTIONS: AlcoveSection[] = [
  {
    key: "experience",
    accentKey: "experience",
    title: "Experience",
    kicker: "roles · timeline",
    icon: "briefcase",
    href: "/work/experience",
  },
  {
    key: "skills",
    accentKey: "skills",
    title: "Skills & Tools",
    kicker: "languages · stacks",
    icon: "tools",
    href: "/work/skills",
  },
  {
    key: "cases",
    accentKey: "cases",
    title: "Case Studies",
    kicker: "shipped work",
    icon: "scroll",
    href: "/work/case-studies",
  },
  {
    key: "deep",
    accentKey: "deep",
    title: "Deep Dives",
    kicker: "long-form · systems",
    icon: "lens",
    href: "/work/deep-dives",
  },
  {
    key: "side",
    accentKey: "side",
    title: "Side Projects",
    kicker: "experiments · play",
    icon: "plane",
    href: "/work/playground",
  },
];

export default function Work() {
  return (
    <ChamberPage
      nameTagSuffix="Work"
      breadcrumb="Work"
      sections={SECTIONS}
      gridVariant="terminal"
    />
  );
}
