"use client";

import Image from "next/image";
import { CSSProperties, useMemo } from "react";
import type { Photo } from "@/lib/photos";

const TILTS = [-5.5, 3.2, -2.8, 4.8, -4.1, 2.3, -3.6, 5.2, -1.9, 3.8, -5.0, 2.7, -2.1, 4.3, -3.9, 1.6, -4.6, 3.4, -2.4, 5.7];
const CLIP_OFFSETS = [-6, 4, -3, 5, -5, 2, -4, 6, -1, 3, -6, 4, -2, 5, -4, 1, -5, 3, -2, 6];

type Props = {
  photos: Photo[];
  onOpen: (index: number) => void;
};

export default function PolaroidGallery({ photos, onOpen }: Props) {
  const { topRow, bottomRow } = useMemo(() => {
    const half = Math.ceil(photos.length / 2);
    return {
      topRow: photos.slice(0, half).map((p, localIdx) => ({ photo: p, globalIdx: localIdx })),
      bottomRow: photos
        .slice(half)
        .map((p, localIdx) => ({ photo: p, globalIdx: localIdx + half })),
    };
  }, [photos]);

  return (
    <div className="polaroid-stage" aria-label="Photography gallery">
      <Row items={topRow} onOpen={onOpen} />
      <Row items={bottomRow} onOpen={onOpen} />
    </div>
  );
}

function Row({
  items,
  onOpen,
}: {
  items: { photo: Photo; globalIdx: number }[];
  onOpen: (index: number) => void;
}) {
  return (
    <div className="polaroid-line">
      <div className="polaroid-cord" aria-hidden="true" />
      <div className="polaroid-track">
        {items.map(({ photo, globalIdx }, i) => {
          const tilt = TILTS[(globalIdx * 7) % TILTS.length];
          const clipOffset = CLIP_OFFSETS[(globalIdx * 5) % CLIP_OFFSETS.length];
          const dropIndex = Math.min(i, 18);
          return (
            <button
              key={photo.src}
              className="polaroid"
              onClick={() => onOpen(globalIdx)}
              style={
                {
                  "--tilt": `${tilt}deg`,
                  "--clip-offset": `${clipOffset}px`,
                  "--i": dropIndex,
                } as CSSProperties
              }
              aria-label={photo.alt || `Photo ${globalIdx + 1}`}
            >
              <span className="polaroid-clip" aria-hidden="true" />
              <span className="polaroid-card">
                <span className="polaroid-window">
                  <Image
                    src={photo.src}
                    alt={photo.alt || ""}
                    fill
                    sizes="(max-width: 768px) 120px, 180px"
                    style={{ objectFit: "cover" }}
                    unoptimized
                  />
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
