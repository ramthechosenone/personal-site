"use client";

import Image from "next/image";
import { CSSProperties, useCallback, useEffect } from "react";
import type { Photo } from "@/lib/photos";

type Props = {
  photos: Photo[];
  activeIndex: number | null;
  onClose: () => void;
  onChangeIndex: (index: number) => void;
};

export default function Lightbox({ photos, activeIndex, onClose, onChangeIndex }: Props) {
  const open = activeIndex !== null;
  const total = photos.length;

  const step = useCallback(
    (delta: number) => {
      if (activeIndex === null) return;
      const next = (activeIndex + delta + total) % total;
      onChangeIndex(next);
    },
    [activeIndex, total, onChangeIndex]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "Home") onChangeIndex(0);
      else if (e.key === "End") onChangeIndex(total - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, step, onClose, onChangeIndex, total]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const photo = activeIndex !== null ? photos[activeIndex] : null;
  const progress = activeIndex !== null ? ((activeIndex + 1) / total) * 100 : 0;

  return (
    <div
      className={`lightbox ${open ? "open" : ""}`}
      onClick={onClose}
      aria-hidden={!open}
      role="dialog"
    >
      {photo && (
        <>
          <div className="lightbox-halo" aria-hidden="true" />
          <div className="lightbox-stage" onClick={(e) => e.stopPropagation()}>
            <Image
              key={photo.src}
              src={photo.src}
              alt={photo.alt || ""}
              width={photo.width}
              height={photo.height}
              className="lightbox-img"
              unoptimized
              priority
            />
          </div>

          <button
            className="lightbox-close"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Close"
          >
            <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
              <path
                d="M4 4 L12 12 M12 4 L4 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <button
            className="lightbox-nav prev"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label="Previous"
          >
            <svg viewBox="0 0 16 16" width="18" height="18" fill="none">
              <path
                d="M10 3 L5 8 L10 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            className="lightbox-nav next"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Next"
          >
            <svg viewBox="0 0 16 16" width="18" height="18" fill="none">
              <path
                d="M6 3 L11 8 L6 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="lightbox-counter" onClick={(e) => e.stopPropagation()}>
            <span>{String((activeIndex ?? 0) + 1).padStart(2, "0")}</span>
            <span className="bar" style={{ "--progress": `${progress}%` } as CSSProperties} />
            <span>{String(total).padStart(2, "0")}</span>
          </div>
        </>
      )}
    </div>
  );
}
