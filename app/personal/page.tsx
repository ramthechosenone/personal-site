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

function getPersonalSections(router: ReturnType<typeof useRouter>): PersonalSection[] {
  return [
    {
      label: "Reflections",
      content: "TODO: Add reflections",
      illustration: <WritingBird />,
    },
    {
      label: "Play & Movement",
      onClick: () => router.push("/personal/play"),
      illustration: <PlayBird />,
    },
    {
      label: "Now",
      content: "TODO: Add current focus and activities",
      illustration: <NowBird />,
    },
    // {
    //   label: "Awareness & Frameworks",
    //   content: "TODO: Add awareness and frameworks",
    //   illustration: <MeditatingBird />,
    // },
  ];
}

export default function Personal() {
  const router = useRouter();
  const personalSections = getPersonalSections(router);

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
