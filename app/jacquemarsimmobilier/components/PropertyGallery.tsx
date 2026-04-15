// app/jacquemarsimmobilier/components/PropertyGallery.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface PropertyGalleryProps {
  images: string[];
  alt: string;
}

export default function PropertyGallery({ images, alt }: PropertyGalleryProps) {
  const [selected, setSelected] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  return (
    <>
      {/* Main gallery */}
      <div className="space-y-3">
        <div
          className="relative aspect-[16/9] overflow-hidden rounded-sm cursor-pointer"
          onClick={() => setLightbox(true)}
        >
          <Image
            src={images[selected]}
            alt={`${alt} — photo ${selected + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 66vw"
            priority
          />
        </div>
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className={`relative w-20 h-20 flex-shrink-0 rounded-sm overflow-hidden transition-all ${
                  i === selected ? "ring-2 ring-[var(--jqm-burgundy)]" : "opacity-60 hover:opacity-100"
                }`}
              >
                <Image src={img} alt={`${alt} — miniature ${i + 1}`} fill className="object-cover" sizes="80px" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(false)}
          >
            <button
              className="absolute top-6 right-6 text-white/60 hover:text-white"
              onClick={() => setLightbox(false)}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Nav arrows */}
            {selected > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); setSelected(selected - 1); }}
                className="absolute left-4 text-white/60 hover:text-white"
              >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
            )}
            {selected < images.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); setSelected(selected + 1); }}
                className="absolute right-4 text-white/60 hover:text-white"
              >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            )}

            <div className="relative w-full max-w-5xl aspect-[16/10]" onClick={(e) => e.stopPropagation()}>
              <Image
                src={images[selected]}
                alt={`${alt} — photo ${selected + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
