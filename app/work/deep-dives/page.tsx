"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import SiteShell from "@/components/layout/SiteShell";
import BackButton from "@/components/layout/BackButton";

type DeepDive = {
  slug: string;
  title: string;
  tech: string;
  summary: string;
};

const deepDives: DeepDive[] = [
  {
    slug: "fpl-predictor",
    title: "FPL Predictor",
    tech: "Python, XGBoost, Random Forest, Pandas, Next.js, Google Cloud Run",
    summary:
      "An ML-powered Fantasy Premier League player prediction system. Feature engineering from FPL APIs and FBref data, model training and evaluation, and a deployed prediction service with a Next.js frontend.",
  },
  {
    slug: "movie-recommender",
    title: "Movie Recommender",
    tech: "Python, SVD, scikit-learn, TMDB API, FastAPI, Next.js, Google Cloud Run",
    summary:
      "A hybrid recommendation engine trained on 25M MovieLens ratings. Combines SVD collaborative filtering with TMDB content-based recommendations, intelligent routing, and explainable results.",
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

export default function DeepDives() {
  const router = useRouter();

  return (
    <SiteShell>
      <BackButton circular to="/work" />
      <div className="max-w-3xl mx-auto px-4 pb-16">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-semibold text-text-primary text-center mb-4"
        >
          Deep Dives
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-text-subtle text-sm text-center mb-10"
        >
          Technical walkthroughs of ML projects — architecture, decisions, and results.
        </motion.p>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {deepDives.map((dive) => (
            <motion.button
              key={dive.slug}
              variants={fadeUp}
              onClick={() => router.push(`/work/deep-dives/${dive.slug}`)}
              className="w-full text-left border border-border bg-elevated p-6 cursor-pointer select-none hover:bg-border transition-colors"
            >
              <h2 className="text-lg font-medium text-text-primary mb-1">
                {dive.title}
              </h2>
              <p className="text-text-subtle text-xs mb-3">{dive.tech}</p>
              <p className="text-text-subtle text-sm leading-relaxed">
                {dive.summary}
              </p>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </SiteShell>
  );
}
