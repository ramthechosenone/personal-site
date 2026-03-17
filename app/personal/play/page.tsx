"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SiteShell from "@/components/layout/SiteShell";
import BackButton from "@/components/layout/BackButton";

const R2 = "https://pub-253f4f98a29547d189d929dd4b0273e2.r2.dev";

const hikePhotos = [
  { src: "hikes/IMG_3711.jpg", w: 3024, h: 4032 },
  { src: "hikes/IMG_0023.jpg", w: 3024, h: 4032 },
  { src: "hikes/IMG_6325.jpg", w: 3061, h: 2040 },
  { src: "hikes/IMG_0158.jpg", w: 3024, h: 4032 },
  { src: "hikes/IMG_4053.jpg", w: 3024, h: 4032 },
  { src: "hikes/IMG_4208.jpg", w: 3024, h: 4032 },
  { src: "hikes/IMG-20200808-WA0016.jpg", w: 1024, h: 768 },
  { src: "hikes/Screenshot 2026-03-16 at 10.51.24\u202FPM.png", w: 1194, h: 972 },
];

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Play() {
  return (
    <SiteShell>
      <BackButton circular to="/personal" />
      <div className="max-w-3xl mx-auto px-4 pb-16">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-semibold text-text-primary text-center mb-12"
        >
          Play & Movement
        </motion.h1>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="space-y-16"
        >
          {/* The Beautiful Game */}
          <motion.section variants={fadeUp} className="space-y-3">
            <h2 className="text-lg font-medium text-text-primary">
              The Beautiful Game
            </h2>
            <p className="text-text-subtle text-sm leading-relaxed">
              Football is where I find flow outside of code. Whether it's a weekend pickup match,
              following Manchester United through the highs and the heartbreak, or grinding
              through rivals on EAFC — the game teaches you the same things engineering does:
              read the field, make decisions under pressure, and never stop moving forward.
            </p>
          </motion.section>

          {/* Track Days */}
          <motion.section variants={fadeUp} className="space-y-3">
            <h2 className="text-lg font-medium text-text-primary">
              Track Days
            </h2>
            <p className="text-text-subtle text-sm leading-relaxed">
              I take my Scion FR-S to the track when I need to think with my hands instead of
              a keyboard. High performance driving is a lot like debugging production — you need
              to stay calm, trust your inputs, and commit to the line. There's no undo button
              at 100 mph.
            </p>
            <Image
              src={`${R2}/racetrack/IMG-20161019-WA0026.jpg`}
              width={1600}
              height={1066}
              alt="Scion FR-S on the track"
              className="rounded-lg w-full h-auto"
              sizes="(max-width: 768px) 90vw, 60vw"
            />
            <video
              src={`${R2}/racetrack/VID_55160520_095134_907.mp4`}
              controls
              playsInline
              preload="metadata"
              className="w-full rounded-lg"
            />
          </motion.section>

          {/* Mountains & Trails */}
          <motion.section variants={fadeUp} className="space-y-3">
            <h2 className="text-lg font-medium text-text-primary">
              Mountains & Trails
            </h2>
            <p className="text-text-subtle text-sm leading-relaxed">
              Hiking is how I reset. There's something about putting one foot in front of the
              other for hours, gaining elevation with nothing but your own effort, that puts
              everything else in perspective. The summit is never the point — it's who you
              become on the way up.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {hikePhotos.map((photo) => (
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
          </motion.section>
        </motion.div>
      </div>
    </SiteShell>
  );
}
