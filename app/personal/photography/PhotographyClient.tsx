"use client";

import { useState } from "react";
import ChamberRoom from "@/components/chamber/ChamberRoom";
import PolaroidGallery from "@/components/photography/PolaroidGallery";
import Lightbox from "@/components/photography/Lightbox";
import type { Photo } from "@/lib/photos";

export default function PhotographyClient({ photos }: { photos: Photo[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <ChamberRoom wordmark="Photography" backTo="/personal">
      <PolaroidGallery photos={photos} onOpen={setActiveIndex} />
      <Lightbox
        photos={photos}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onChangeIndex={setActiveIndex}
      />
    </ChamberRoom>
  );
}
