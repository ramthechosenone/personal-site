"use client";

import { motion } from "framer-motion";
import SiteShell from "@/components/layout/SiteShell";
import BackButton from "@/components/layout/BackButton";
import PillKey from "@/components/common/PillKey";

const personalSections = [
  {
    label: "Writing & Reflections",
    content: "TODO: Add writing and reflections",
  },
  {
    label: "Photography",
    content: "TODO: Add photography",
  },
  {
    label: "Play & Movement",
    content: "TODO: Add play and movement content",
  },
  {
    label: "Now",
    content: "TODO: Add current focus and activities",
  },
  {
    label: "Awareness & Frameworks",
    content: "TODO: Add awareness and frameworks",
  },
];

export default function Personal() {
  return (
    <SiteShell>
      <BackButton circular />
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Sphere */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-12"
        >
          <div
            className="
              w-24 h-24 rounded-full
              shadow-[0_4px_12px_rgba(0,0,0,0.15)]
            "
            style={{
              background: "radial-gradient(circle, #E5E5E7 0%, #E5E5E7 50%, #D5D5D7 100%)",
            }}
          />
        </motion.div>

        {/* Pill keys */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4"
        >
          {personalSections.map((section, index) => (
            <PillKey key={index} label={section.label}>
              {section.content}
            </PillKey>
          ))}
        </motion.div>
      </div>
    </SiteShell>
  );
}

