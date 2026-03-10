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
