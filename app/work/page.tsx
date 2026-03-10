"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import SiteShell from "@/components/layout/SiteShell";
import BackButton from "@/components/layout/BackButton";
import PillKey from "@/components/common/PillKey";

const showContent = process.env.NEXT_PUBLIC_SHOW_WORK_AND_PERSONAL !== "false";

export default function Work() {
  const router = useRouter();

  if (!showContent) {
    return (
      <SiteShell>
        <BackButton />
        <div className="min-h-screen flex flex-col items-center justify-center px-4">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-text-subtle text-center"
          >
            In the works — check back soon.
          </motion.p>
        </div>
      </SiteShell>
    );
  }

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
          <PillKey label="Case Studies" variant="box" />
          <PillKey
            label="Playground / Experiments"
            variant="box"
            onClick={() => router.push("/work/playground")}
          />
        </motion.div>
      </div>
    </SiteShell>
  );
}
