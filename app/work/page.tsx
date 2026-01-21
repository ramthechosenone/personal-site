"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SiteShell from "@/components/layout/SiteShell";
import BackButton from "@/components/layout/BackButton";
import KeyCard from "@/components/common/KeyCard";

const workSections = [
  {
    title: "Case Studies",
    subtitle: "TODO: Add case studies",
  },
  {
    title: "Experience",
    subtitle: "TODO: Add work experience",
  },
  {
    title: "Skills & Tools",
    subtitle: "TODO: Add skills and tools",
  },
  {
    title: "Playground / Experiments",
    subtitle: "TODO: Add experiments and side projects",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0,
      },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 50, rotateX: -15 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.6,
      ease: [0.34, 1.56, 0.64, 1], // Elastic ease
    },
  },
};

export default function Work() {
  const [backgroundPhase, setBackgroundPhase] = useState<"warm" | "cool">("warm");

  useEffect(() => {
    // Start background transition
    const bgTimer = setTimeout(() => setBackgroundPhase("cool"), 200);
    return () => clearTimeout(bgTimer);
  }, []);

  return (
    <motion.div
      initial={{ backgroundColor: "#F5F5F7" }}
      animate={{
        backgroundColor: backgroundPhase === "cool" ? "#F2F2F5" : "#F5F5F7",
      }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className="min-h-screen"
    >
      <SiteShell className="bg-transparent">
        <BackButton />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            style={{ 
              perspective: "1000px",
            }}
          >
            {workSections.map((section, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
              >
                <KeyCard className="p-6 h-full">
                  <h2 className="text-xl font-medium text-text-primary mb-2">
                    {section.title}
                  </h2>
                  <p className="text-text-subtle text-sm">{section.subtitle}</p>
                </KeyCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </SiteShell>
    </motion.div>
  );
}

