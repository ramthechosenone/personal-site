"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import SiteShell from "@/components/layout/SiteShell";
import BackButton from "@/components/layout/BackButton";

type Project = {
  title: string;
  tech: string;
  description: string;
  links: { label: string; href: string; external?: boolean }[];
};

const projects: Project[] = [
  {
    title: "FPL Predictor",
    tech: "Python, XGBoost, Random Forest, Pandas, Next.js, Google Cloud Run",
    description:
      "A Fantasy Premier League player prediction app powered by ML models. Consumes FPL APIs and FBref data, cleans historical datasets, engineers custom features, and ranks players to automate team selection. Deployed on Google Cloud Run with a Next.js frontend.",
    links: [
      { label: "Open App", href: "/fpl" },
      { label: "Build Journal", href: "/fpl/blog" },
      {
        label: "GitHub",
        href: "https://github.com/ramthechosenone",
        external: true,
      },
    ],
  },
  {
    title: "Movie Recommender",
    tech: "Python, SVD Collaborative Filtering, TMDB API, FastAPI, Next.js, Google Cloud Run",
    description:
      "A hybrid movie/TV/anime recommendation engine trained on 25M MovieLens ratings. Uses SVD-200 collaborative filtering for catalog movies (0.80 NDCG@10, 71.7% Precision@10) with TMDB API fallback for newer content. Intelligent routing combines both engines with proportional interleaving, and every recommendation includes a human-readable explanation.",
    links: [
      { label: "Open App", href: "/movies" },
      {
        label: "GitHub",
        href: "https://github.com/ramthechosenone",
        external: true,
      },
    ],
  },
  {
    title: "Afterthoughts",
    tech: "Swift, SwiftUI, SwiftData, Firebase, TMDB API, OMDb API",
    description:
      "An iOS app for logging and sharing movie, TV, and anime reviews. Features five-category ratings, customizable review criteria, shareable social media cards, and AI-powered recommendations via a custom SVD engine. Cloud sync with Firebase Firestore, offline-first architecture, and Google/Apple Sign-In.",
    links: [
      {
        label: "App Store",
        href: "https://apps.apple.com/us/app/afterthoughts/id6760627706",
        external: true,
      },
      {
        label: "GitHub",
        href: "https://github.com/ramthechosenone",
        external: true,
      },
    ],
  },
  {
    title: "Churn Prediction Microservice",
    tech: "Python, Flask, Scikit-learn, REST API",
    description:
      "A full-lifecycle machine learning pipeline to predict member retention for associations. Performs feature engineering and hyperparameter tuning, operationalized as a Flask REST API enabling real-time consumption by internal dashboards.",
    links: [],
  },
  {
    title: "Personal Website",
    tech: "Next.js, React, TypeScript, Tailwind CSS, Framer Motion, Vercel",
    description:
      "This site — a portfolio and personal space built with Next.js and deployed on Vercel. Features pixel-art animations, a real-time clock, photography gallery backed by Cloudflare R2, and the FPL Predictor integration.",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/ramthechosenone/personal-site",
        external: true,
      },
    ],
  },
  {
    title: "AI Assistant (OpenClaw)",
    tech: "Claude Code, Obsidian, Telegram, Python",
    description:
      "A smart AI assistant integrating Claude Code with Obsidian for knowledge management and Telegram for conversational access. Exploring agentic workflows, tool use, and personal productivity automation.",
    links: [],
  },
];

const exploring = [
  "Building with Claude Code and agentic AI workflows",
  "Obsidian as a knowledge graph with AI integration",
  "ML pipelines — from feature engineering to cloud deployment",
  "Next.js / React for interactive portfolio and data apps",
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
    <SiteShell backdrop>
      <BackButton circular to="/work" />
      <div className="page-panel">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-semibold text-text-primary text-center mb-10"
        >
          Side Projects
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
              <h2 className="text-lg font-medium text-text-primary mb-1">
                {project.title}
              </h2>
              <p className="text-text-subtle text-xs mb-3">{project.tech}</p>
              <p className="text-text-subtle text-sm leading-relaxed mb-4">
                {project.description}
              </p>
              {project.links.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {project.links.map((link) =>
                    link.external ? (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          px-4 py-2 text-sm font-medium
                          text-text-primary bg-surface border border-border
                          hover:bg-border transition-colors
                        "
                      >
                        {link.label}
                      </a>
                    ) : (
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
                    )
                  )}
                </div>
              )}
            </motion.div>
          ))}

          {/* Currently Exploring */}
          <motion.div variants={fadeUp} className="mt-8">
            <h2 className="text-lg font-medium text-text-primary mb-4">
              Currently Exploring
            </h2>
            <ul className="space-y-2">
              {exploring.map((item, i) => (
                <li
                  key={i}
                  className="text-text-subtle text-sm leading-relaxed pl-4 border-l-2 border-border"
                >
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </SiteShell>
  );
}
