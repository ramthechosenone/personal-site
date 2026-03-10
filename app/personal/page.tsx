"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import SiteShell from "@/components/layout/SiteShell";
import BackButton from "@/components/layout/BackButton";
import PillKey from "@/components/common/PillKey";
import {
  PhotographyBird,
  WritingBird,
  PlayBird,
  NowBird,
  MeditatingBird,
} from "@/components/personal/birds";

type PersonalSection = {
  label: string;
  content?: ReactNode;
  onClick?: () => void;
  illustration?: ReactNode;
};

function getPersonalSections(): PersonalSection[] {
  return [
    {
      label: "Writing & Reflections",
      content: "TODO: Add writing and reflections",
      illustration: <WritingBird />,
    },
    {
      label: "Play & Movement",
      content: "TODO: Add play and movement content",
      illustration: <PlayBird />,
    },
    {
      label: "Now",
      content: "TODO: Add current focus and activities",
      illustration: <NowBird />,
    },
    {
      label: "Awareness & Frameworks",
      content: "TODO: Add awareness and frameworks",
      illustration: <MeditatingBird />,
    },
  ];
}

const showContent = process.env.NEXT_PUBLIC_SHOW_WORK_AND_PERSONAL !== "false";

export default function Personal() {
  const router = useRouter();
  const personalSections = getPersonalSections();

  if (!showContent) {
    return (
      <SiteShell>
        <BackButton circular />
        <div className="min-h-screen flex flex-col items-center justify-center px-4">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-text-subtle text-center"
          >
            In the works — check back soon.
          </motion.p>
        </div>
      </SiteShell>
    );
  }

  return (
    <SiteShell>
      <BackButton circular />
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Pill keys */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4"
        >
          <PillKey
            label="Photography"
            onClick={() => router.push("/personal/photography")}
            illustration={<PhotographyBird />}
          />
          {personalSections.map((section, index) => (
            <PillKey
              key={index}
              label={section.label}
              onClick={section.onClick}
              illustration={section.illustration}
            >
              {section.content}
            </PillKey>
          ))}
        </motion.div>
      </div>
    </SiteShell>
  );
}
