"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
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

const R2 = "https://pub-253f4f98a29547d189d929dd4b0273e2.r2.dev";

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
      content: (
        <div className="space-y-6 text-sm leading-relaxed">
          <div>
            <h3 className="text-text-primary font-medium mb-1">The Beautiful Game</h3>
            <p>
              Football is where I find flow outside of code. Whether it's a weekend pickup match,
              following Manchester United through the highs and the heartbreak, or grinding
              through rivals on EAFC — the game teaches you the same things engineering does:
              read the field, make decisions under pressure, and never stop moving forward.
            </p>
          </div>

          <div>
            <h3 className="text-text-primary font-medium mb-1">Track Days</h3>
            <p>
              I take my Scion FR-S to the track when I need to think with my hands instead of
              a keyboard. High performance driving is a lot like debugging production — you need
              to stay calm, trust your inputs, and commit to the line. There's no undo button
              at 100 mph.
            </p>
            <div className="mt-3">
              <video
                src={`${R2}/racetrack/VID_55160520_095134_907.mp4`}
                controls
                playsInline
                preload="metadata"
                className="w-full rounded-lg"
              />
            </div>
          </div>

          <div>
            <h3 className="text-text-primary font-medium mb-1">Mountains & Trails</h3>
            <p>
              Hiking is how I reset. There's something about putting one foot in front of the
              other for hours, gaining elevation with nothing but your own effort, that puts
              everything else in perspective. The summit is never the point — it's who you
              become on the way up.
            </p>
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { src: "hikes/IMG_3711.jpg", w: 3024, h: 4032 },
                { src: "hikes/IMG_0023.jpg", w: 3024, h: 4032 },
                { src: "hikes/IMG_6325.jpg", w: 3061, h: 2040 },
                { src: "hikes/IMG_0158.jpg", w: 3024, h: 4032 },
                { src: "hikes/IMG_4053.jpg", w: 3024, h: 4032 },
                { src: "hikes/IMG_4208.jpg", w: 3024, h: 4032 },
                { src: "hikes/IMG-20200808-WA0016.jpg", w: 1024, h: 768 },
              ].map((photo) => (
                <Image
                  key={photo.src}
                  src={`${R2}/${photo.src}`}
                  width={photo.w}
                  height={photo.h}
                  alt="Hiking"
                  className="rounded-lg w-full h-auto"
                  sizes="(max-width: 640px) 45vw, 30vw"
                />
              ))}
            </div>
          </div>
        </div>
      ),
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

export default function Personal() {
  const router = useRouter();
  const personalSections = getPersonalSections();

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
