"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import SiteShell from "@/components/layout/SiteShell";
import BackButton from "@/components/layout/BackButton";

type Project = {
  title: string;
  description: string;
  links: { label: string; href: string }[];
};

const projects: Project[] = [
  {
    title: "FPL Predictor",
    description:
      "A Fantasy Premier League player prediction app powered by ML models (Random Forest, XGBoost). Consumes FPL APIs, cleans historical datasets, engineers custom features, and ranks players to automate team selection. Deployed on Google Cloud Run with a Next.js frontend.",
    links: [
      { label: "Open App", href: "/fpl" },
      { label: "Build Journal", href: "/fpl/blog" },
    ],
  },
];

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Playground() {
  const router = useRouter();

  return (
    <SiteShell>
      <BackButton circular to="/work" />
      <div className="max-w-3xl mx-auto px-4 pb-16">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-semibold text-text-primary text-center mb-10"
        >
          Playground / Experiments
        </motion.h1>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {projects.map((project, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="border border-border bg-elevated p-6"
            >
              <h2 className="text-lg font-medium text-text-primary mb-2">
                {project.title}
              </h2>
              <p className="text-text-subtle text-sm leading-relaxed mb-4">
                {project.description}
              </p>
              <div className="flex gap-3">
                {project.links.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => router.push(link.href)}
                    className="
                      px-4 py-2 text-sm font-medium
                      text-text-primary bg-surface border border-border
                      cursor-pointer select-none
                      hover:bg-border transition-colors
                    "
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SiteShell>
  );
}
