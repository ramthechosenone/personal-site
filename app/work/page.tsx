"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import SiteShell from "@/components/layout/SiteShell";
import BackButton from "@/components/layout/BackButton";
import PillKey from "@/components/common/PillKey";

export default function Work() {
  const router = useRouter();

  return (
    <SiteShell>
      <BackButton />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4"
        >
          <PillKey
            label="Experience"
            variant="box"
            onClick={() => router.push("/work/experience")}
          />
          <PillKey
            label="Skills & Tools"
            variant="box"
            onClick={() => router.push("/work/skills")}
          />
          <PillKey
            label="Deep Dives"
            variant="box"
            onClick={() => router.push("/work/case-studies")}
          />
          <PillKey
            label="Side Projects"
            variant="box"
            onClick={() => router.push("/work/playground")}
          />
        </motion.div>

        {/* Contact & Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4 text-sm"
        >
          <a
            href="/SriramPDevarapu.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-border bg-elevated text-text-primary font-medium hover:bg-border transition-colors"
          >
            Resume (PDF)
          </a>
          <a
            href="mailto:srirampdevarapu@gmail.com"
            className="px-4 py-2 border border-border bg-elevated text-text-subtle hover:bg-border transition-colors"
          >
            srirampdevarapu@gmail.com
          </a>
          <a
            href="https://www.linkedin.com/in/sriramdevarapu/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-border bg-elevated text-text-subtle hover:bg-border transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/ramthechosenone"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-border bg-elevated text-text-subtle hover:bg-border transition-colors"
          >
            GitHub
          </a>
        </motion.div>
      </div>
    </SiteShell>
  );
}
