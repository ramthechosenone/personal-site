"use client";

import { motion } from "framer-motion";
import SiteShell from "@/components/layout/SiteShell";
import BackButton from "@/components/layout/BackButton";
import MovieRecommenderDiagram from "@/components/diagrams/MovieRecommenderDiagram";

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

export default function MovieRecommenderDeepDive() {
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
          Movie Recommender
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-text-subtle text-xs text-center mb-12"
        >
          Python, SVD, scikit-learn, TMDB API, FastAPI, Next.js, Google Cloud Run
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
              Most recommendation systems either rely purely on collaborative filtering
              (great for popular items, poor for new content) or content-based matching
              (good coverage but shallow personalization). I wanted to build a hybrid system
              that combines both — using SVD for deep personalization on a massive rating
              dataset while falling back to TMDB for newer movies, TV shows, and anime
              that don't have enough historical data.
            </p>
          </motion.section>

          {/* Architecture */}
          <motion.section variants={fadeUp} className="space-y-3">
            <h2 className="text-lg font-medium text-text-primary">Architecture</h2>
            <MovieRecommenderDiagram />
          </motion.section>

          {/* Data & Training */}
          <motion.section variants={fadeUp} className="space-y-3">
            <h2 className="text-lg font-medium text-text-primary">Data & Training Pipeline</h2>
            <ul className="space-y-2">
              {[
                "MovieLens 25M dataset — 24.6M ratings across 162K users and 62K movies",
                "Filtered to users with ≥20 ratings and movies with ≥50 ratings for quality signal",
                "Trained SVD-200 (200 latent factors) on sparse user-item matrix using scipy",
                "Regularized least-squares (λ=0.1) with global mean centering and item bias terms",
                "Evaluation on 20% held-out split: RMSE 0.899, Precision@10 71.7%, NDCG@10 0.80",
                "Training completes in ~14 seconds — fast enough for weekly retraining",
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

          {/* Hybrid Routing */}
          <motion.section variants={fadeUp} className="space-y-3">
            <h2 className="text-lg font-medium text-text-primary">Hybrid Recommendation Routing</h2>
            <p className="text-text-subtle text-sm leading-relaxed">
              The core challenge was combining two fundamentally different engines. When a user
              submits ratings, the system routes each rated item to the appropriate engine:
              movies in the MovieLens catalog go to SVD, everything else (newer movies, TV,
              anime) goes to TMDB. Both engines run concurrently via asyncio, and results are
              interleaved proportionally based on the user's content preferences — if you
              rated mostly TV shows, you'll see more TV in your recommendations.
            </p>
          </motion.section>

          {/* Cold Start */}
          <motion.section variants={fadeUp} className="space-y-3">
            <h2 className="text-lg font-medium text-text-primary">Cold-Start Solution</h2>
            <p className="text-text-subtle text-sm leading-relaxed">
              New users aren't in the training data, so traditional SVD can't generate
              predictions. The system solves this by computing a user vector on-the-fly using
              regularized least-squares regression against the pre-trained item factors. This
              runs in milliseconds — no model retraining needed. The user rates 3+ titles and
              gets instant personalized recommendations.
            </p>
          </motion.section>

          {/* Explainability */}
          <motion.section variants={fadeUp} className="space-y-3">
            <h2 className="text-lg font-medium text-text-primary">Explainability</h2>
            <p className="text-text-subtle text-sm leading-relaxed">
              Every recommendation includes a human-readable explanation: which of your highly-rated
              titles it's similar to, quality signals from community ratings, genre overlap, and
              source attribution (SVD vs TMDB). This builds trust — users can understand why
              something was recommended and calibrate their expectations.
            </p>
          </motion.section>

          {/* Results & Metrics */}
          <motion.section variants={fadeUp} className="space-y-3">
            <h2 className="text-lg font-medium text-text-primary">Results</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "RMSE", value: "0.899" },
                { label: "MAE", value: "0.690" },
                { label: "Precision@10", value: "71.7%" },
                { label: "NDCG@10", value: "0.801" },
              ].map((metric) => (
                <div
                  key={metric.label}
                  className="border border-border bg-elevated p-3 text-center"
                >
                  <p className="text-text-primary font-medium text-lg">{metric.value}</p>
                  <p className="text-text-subtle text-xs">{metric.label}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* What I Learned */}
          <motion.section variants={fadeUp} className="space-y-3">
            <h2 className="text-lg font-medium text-text-primary">What I Learned</h2>
            <ul className="space-y-2">
              {[
                "Hybrid routing is more valuable than a single better model — coverage matters as much as accuracy",
                "Cold-start doesn't require compromising on personalization — least-squares projection is fast and effective",
                "Explainability is a feature, not a nice-to-have — users engage more when they understand recommendations",
                "Proportional interleaving prevents content-type bias without requiring manual tuning",
                "FastAPI + async makes concurrent API calls trivial — TMDB rate limits are the real bottleneck",
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
