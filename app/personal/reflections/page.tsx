"use client";

import { motion } from "framer-motion";
import SiteShell from "@/components/layout/SiteShell";
import BackButton from "@/components/layout/BackButton";

export default function Reflections() {
  return (
    <SiteShell backdrop>
      <BackButton circular to="/personal" />
      <div className="page-panel">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="text-[10px] tracking-[0.32em] uppercase text-text-subtle mb-3">
            02 — Personal · Reflections
          </div>
          <h1 className="font-serif italic font-light text-4xl md:text-5xl leading-tight text-text-primary mb-3">
            Small observations. Mostly for myself.
          </h1>
          <p className="text-sm text-text-subtle max-w-[52ch]">
            A slow-burning notebook — essays, half-thoughts, things I&apos;m still figuring out. Not ready yet.
          </p>

          <div className="mt-12 border-t border-border pt-8 text-sm text-text-subtle italic">
            Coming soon.
          </div>
        </motion.div>
      </div>
    </SiteShell>
  );
}
