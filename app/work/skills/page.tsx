"use client";

import { motion } from "framer-motion";
import SiteShell from "@/components/layout/SiteShell";
import BackButton from "@/components/layout/BackButton";

const categories = [
  {
    label: "Languages",
    items: ["C#", "Python", "JavaScript", "TypeScript", "SQL"],
  },
  {
    label: "Backend",
    items: [
      "ASP.NET Core (.NET 8)",
      "REST APIs",
      "Entity Framework",
      "Node.js",
      "Flask",
    ],
  },
  {
    label: "Cloud & DevOps",
    items: [
      "Azure Functions",
      "Azure DevOps",
      "Google Cloud Run",
      "Docker",
      "CI/CD Pipelines",
    ],
  },
  {
    label: "Data & ML",
    items: [
      "SQL Server",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "XGBoost",
      "Matplotlib",
    ],
  },
  {
    label: "Frontend",
    items: [
      "React",
      "Next.js",
      "Angular",
      "Tailwind CSS",
      "Framer Motion",
      "Bootstrap",
    ],
  },
  {
    label: "Tools & Workflow",
    items: [
      "Git",
      "Claude Code",
      "Obsidian",
      "Vercel",
      "Cloudflare R2",
    ],
  },
];

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Skills() {
  return (
    <SiteShell backdrop>
      <BackButton circular to="/work" />
      <div className="page-panel">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-semibold text-text-primary text-center mb-10"
        >
          Skills & Tools
        </motion.h1>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {categories.map((cat, i) => (
            <motion.section key={i} variants={fadeUp}>
              <h2 className="text-sm font-medium text-text-primary mb-3">
                {cat.label}
              </h2>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="
                      px-3 py-1.5 text-sm text-text-subtle
                      bg-elevated border border-border
                    "
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.section>
          ))}
        </motion.div>
      </div>
    </SiteShell>
  );
}
