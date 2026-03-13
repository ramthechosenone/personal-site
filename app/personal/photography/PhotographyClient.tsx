"use client";

import { motion } from "framer-motion";
import SiteShell from "@/components/layout/SiteShell";
import BackButton from "@/components/layout/BackButton";
import PhotoGallery from "@/components/personal/PhotoGallery";
import type { Photo } from "@/lib/photos";

export default function PhotographyClient({ photos }: { photos: Photo[] }) {
  return (
    <SiteShell>
      <BackButton circular to="/personal" />
      <div className="max-w-5xl mx-auto px-4 pb-16">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-semibold text-text-primary text-center mb-10"
        >
          Photography
        </motion.h1>
        <PhotoGallery photos={photos} />
      </div>
    </SiteShell>
  );
}
