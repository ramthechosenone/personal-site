"use client";

import { motion } from "framer-motion";
import SiteShell from "@/components/layout/SiteShell";
import BackButton from "@/components/layout/BackButton";
import FPLPredictorDiagram from "@/components/diagrams/FPLPredictorDiagram";

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

export default function FPLDeepDive() {
  return (
    <SiteShell>
      <BackButton circular to="/work/deep-dives" />
      <div className="max-w-3xl mx-auto px-4 pb-16">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-semibold text-text-primary text-center mb-2"
        >
          FPL Predictor
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-text-subtle text-xs text-center mb-12"
        >
          Python, XGBoost, Random Forest, Pandas, Next.js, Google Cloud Run
        </motion.p>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="space-y-10"
        >
          {/* Problem */}
          <motion.section variants={fadeUp} className="space-y-3">
            <h2 className="text-lg font-medium text-text-primary">The Problem</h2>
            <p className="text-text-subtle text-sm leading-relaxed">
              Fantasy Premier League managers make 38 weeks of transfer decisions based on
              intuition, form tables, and fixture difficulty. Most managers underperform because
              they chase last week's points instead of predicting next week's. I wanted to
              build a system that uses historical data and ML to rank players by expected future
              performance — removing emotion from the equation.
            </p>
          </motion.section>

          {/* Architecture */}
          <motion.section variants={fadeUp} className="space-y-3">
            <h2 className="text-lg font-medium text-text-primary">Architecture</h2>
            <FPLPredictorDiagram />
          </motion.section>

          {/* Data Pipeline */}
          <motion.section variants={fadeUp} className="space-y-3">
            <h2 className="text-lg font-medium text-text-primary">Data Pipeline</h2>
            <ul className="space-y-2">
              {[
                "Ingest live player stats from the official FPL API (600+ players, 30+ features per gameweek)",
                "Scrape advanced metrics from FBref — xG, xA, progressive passes, shot-creating actions",
                "Clean and merge datasets, handling missing values, position normalization, and team mappings",
                "Engineer rolling averages, form indicators, fixture difficulty ratings, and momentum features",
                "Split by season for time-series-aware train/test evaluation",
              ].map((item, i) => (
                <li
                  key={i}
                  className="text-text-subtle text-sm leading-relaxed pl-4 border-l-2 border-border"
                >
                  {item}
                </li>
              ))}
            </ul>
          </motion.section>

          {/* Model */}
          <motion.section variants={fadeUp} className="space-y-3">
            <h2 className="text-lg font-medium text-text-primary">Model Training & Evaluation</h2>
            <p className="text-text-subtle text-sm leading-relaxed">
              Trained XGBoost and Random Forest regressors to predict next-gameweek points.
              XGBoost consistently outperformed on RMSE and feature importance aligned with
              football intuition — fixture difficulty, recent form, and expected goals were
              the top predictors. Models are retrained weekly with fresh data.
            </p>
          </motion.section>

          {/* Serving */}
          <motion.section variants={fadeUp} className="space-y-3">
            <h2 className="text-lg font-medium text-text-primary">Serving & Deployment</h2>
            <p className="text-text-subtle text-sm leading-relaxed">
              The prediction API runs on Google Cloud Run, containerized with Docker for
              consistent builds. A Next.js frontend (integrated into this site at /fpl)
              displays ranked predictions with filtering by position, team, and price.
              A build journal documents the week-by-week development process.
            </p>
          </motion.section>

          {/* What I Learned */}
          <motion.section variants={fadeUp} className="space-y-3">
            <h2 className="text-lg font-medium text-text-primary">What I Learned</h2>
            <ul className="space-y-2">
              {[
                "Feature engineering matters more than model complexity — rolling averages and xG data drove the biggest accuracy gains",
                "Time-series splits are essential for sports data — standard k-fold cross-validation leaks future information",
                "Cloud Run is ideal for bursty workloads — the API sleeps between gameweeks and scales to zero",
                "Building the blog alongside the project forced clearer thinking about design decisions",
              ].map((item, i) => (
                <li
                  key={i}
                  className="text-text-subtle text-sm leading-relaxed pl-4 border-l-2 border-border"
                >
                  {item}
                </li>
              ))}
            </ul>
          </motion.section>
        </motion.div>
      </div>
    </SiteShell>
  );
}
