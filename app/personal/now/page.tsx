"use client";

import { motion } from "framer-motion";
import SiteShell from "@/components/layout/SiteShell";
import BackButton from "@/components/layout/BackButton";

export default function Now() {
  return (
    <SiteShell backdrop>
      <BackButton circular to="/personal" />
      <div className="page-panel font-mono">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="text-[10px] tracking-[0.32em] uppercase text-text-subtle mb-3">
            04 — Personal · Now
          </div>
          <h1 className="font-mono font-light text-3xl md:text-4xl leading-tight tracking-tight text-text-primary mb-3">
            What&rsquo;s occupying me right now.
          </h1>
          <p className="text-sm text-text-subtle mb-10 max-w-[52ch]">
            A snapshot of what I&apos;m actually spending time on. Updated when things meaningfully change.
          </p>

          <div className="space-y-8 text-sm leading-relaxed">
            <section>
              <h2 className="text-text-primary font-medium mb-3">Currently building</h2>
              <ul className="space-y-2 text-text-subtle">
                <li className="pl-4 border-l-2 border-border">Afterthoughts iOS app — polishing for App Store</li>
                <li className="pl-4 border-l-2 border-border">Movie Recommender — hybrid SVD + TMDB engine</li>
                <li className="pl-4 border-l-2 border-border">This personal site (always evolving)</li>
              </ul>
            </section>
            <section>
              <h2 className="text-text-primary font-medium mb-3">Currently learning / exploring</h2>
              <ul className="space-y-2 text-text-subtle">
                <li className="pl-4 border-l-2 border-border">Agentic AI workflows with Claude Code</li>
                <li className="pl-4 border-l-2 border-border">iOS development with SwiftUI + SwiftData</li>
                <li className="pl-4 border-l-2 border-border">ML pipelines end-to-end (training → deployment → serving)</li>
              </ul>
            </section>
            <section>
              <h2 className="text-text-primary font-medium mb-3">Currently into</h2>
              <ul className="space-y-2 text-text-subtle">
                <li className="pl-4 border-l-2 border-border">Following Man United through another &ldquo;rebuilding year&rdquo;</li>
              </ul>
            </section>
            <section>
              <h2 className="text-text-primary font-medium mb-3">Currently reading / watching</h2>
              <ul className="space-y-2 text-text-subtle">
                <li className="pl-4 border-l-2 border-border italic">Coming soon</li>
              </ul>
            </section>
          </div>
        </motion.div>
      </div>
    </SiteShell>
  );
}
