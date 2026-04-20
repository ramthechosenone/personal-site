"use client";

import ChamberPage from "@/components/chamber/ChamberPage";
import type { AlcoveSection } from "@/components/chamber/AlcoveGrid";

const SECTIONS: AlcoveSection[] = [
  {
    key: "photography",
    accentKey: "photography",
    title: "Photography",
    kicker: "film · 35mm",
    icon: "camera",
    href: "/personal/photography",
  },
  {
    key: "reflections",
    accentKey: "reflections",
    title: "Reflections",
    kicker: "journal · essays",
    icon: "book",
    href: "/personal/reflections",
  },
  {
    key: "play",
    accentKey: "play",
    title: "Play & Movement",
    kicker: "walks · climbs · piano",
    icon: "figure",
    href: "/personal/play",
  },
  {
    key: "now",
    accentKey: "now",
    title: "Now",
    kicker: "currently · this season",
    icon: "clock",
    href: "/personal/now",
  },
];

export default function Personal() {
  return (
    <ChamberPage
      nameTagSuffix="Personal"
      breadcrumb="Personal"
      sections={SECTIONS}
      gridVariant="cairn"
    />
  );
}
