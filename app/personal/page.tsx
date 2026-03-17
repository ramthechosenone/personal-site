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
      content: (
        <div className="space-y-5 text-sm leading-relaxed">
          <div>
            <h3 className="text-text-primary font-medium mb-2">Currently Building</h3>
            <ul className="space-y-1 text-text-subtle">
              <li className="pl-4 border-l-2 border-border">Afterthoughts iOS app — polishing for App Store</li>
              <li className="pl-4 border-l-2 border-border">Movie Recommender — hybrid SVD + TMDB engine</li>
              <li className="pl-4 border-l-2 border-border">This personal site (always evolving)</li>
            </ul>
          </div>
          <div>
            <h3 className="text-text-primary font-medium mb-2">Currently Learning / Exploring</h3>
            <ul className="space-y-1 text-text-subtle">
              <li className="pl-4 border-l-2 border-border">Agentic AI workflows with Claude Code</li>
              <li className="pl-4 border-l-2 border-border">iOS development with SwiftUI + SwiftData</li>
              <li className="pl-4 border-l-2 border-border">ML pipelines end-to-end (training → deployment → serving)</li>
            </ul>
          </div>
          <div>
            <h3 className="text-text-primary font-medium mb-2">Currently Into</h3>
            <ul className="space-y-1 text-text-subtle">
              <li className="pl-4 border-l-2 border-border">Following Man United through another &ldquo;rebuilding year&rdquo;</li>
            </ul>
          </div>
          <div>
            <h3 className="text-text-primary font-medium mb-2">Currently Reading / Watching</h3>
            <ul className="space-y-1 text-text-subtle">
              <li className="pl-4 border-l-2 border-border italic">Coming soon</li>
            </ul>
          </div>
        </div>
      ),
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
