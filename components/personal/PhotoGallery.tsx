"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { getCategories, getPhotosByCategory } from "@/lib/photos";
import PhotoLightbox from "./PhotoLightbox";

export default function PhotoGallery() {
  const categories = getCategories();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = getPhotosByCategory(activeCategory);

  // Distribute photos into columns for true masonry
  const columnCount = { mobile: 2, desktop: 3 };
  const makeColumns = (count: number) => {
    const cols: typeof filtered[] = Array.from({ length: count }, () => []);
    filtered.forEach((photo, i) => cols[i % count].push(photo));
    return cols;
  };

  const desktopCols = makeColumns(columnCount.desktop);
  const mobileCols = makeColumns(columnCount.mobile);

  const renderColumn = (photos: typeof filtered, colIndex: number) => (
    <div key={colIndex} className="flex flex-col gap-3">
      {photos.map((photo) => {
        const globalIndex = filtered.indexOf(photo);
        return (
          <motion.div
            key={photo.src}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="cursor-pointer overflow-hidden rounded-lg"
            onClick={() => setLightboxIndex(globalIndex)}
          >
            <Image
              src={photo.src}
              width={photo.width}
              height={photo.height}
              alt={photo.alt}
              sizes="(max-width: 768px) 50vw, 33vw"
              placeholder={photo.blurDataURL ? "blur" : "empty"}
              blurDataURL={photo.blurDataURL}
              className="w-full h-auto hover:scale-105 transition-transform duration-500"
            />
          </motion.div>
        );
      })}
    </div>
  );

  return (
    <>
      {/* Category filter pills */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
              activeCategory === null
                ? "bg-text-primary text-background border-text-primary"
                : "bg-elevated text-text-subtle border-border hover:border-text-subtle"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm border transition-colors capitalize ${
                activeCategory === cat
                  ? "bg-text-primary text-background border-text-primary"
                  : "bg-elevated text-text-subtle border-border hover:border-text-subtle"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Masonry grid — mobile: 2 cols, desktop: 3 cols */}
      <div className="hidden md:grid md:grid-cols-3 gap-3">
        {desktopCols.map(renderColumn)}
      </div>
      <div className="grid grid-cols-2 gap-3 md:hidden">
        {mobileCols.map(renderColumn)}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <p className="text-text-subtle text-center py-20">
          No photos yet — add entries to lib/photos.ts
        </p>
      )}

      {/* Lightbox */}
      <PhotoLightbox
        photos={filtered}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </>
  );
}
