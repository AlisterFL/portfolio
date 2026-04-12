"use client";

import { useState } from "react";

const BASE = "https://primary.jwwb.nl/public/l/t/s/temp-jwqgqkdwmrnrolcreinv";

const categories = [
  {
    id: "all",
    label: "Tout",
  },
  {
    id: "food",
    label: "Cuisine",
  },
  {
    id: "interior",
    label: "Intérieur",
  },
  {
    id: "bar",
    label: "Bar",
  },
  {
    id: "ambiance",
    label: "Ambiance",
  },
];

const photos = [
  // Food / Tapas
  { src: `${BASE}/2021_06_17_Mediaheer_3941-1.jpg`, cat: "food" },
  { src: `${BASE}/2021_06_17_Mediaheer_3943-1.jpg`, cat: "food" },
  { src: `${BASE}/2021_06_17_Mediaheer_3944-1.jpg`, cat: "food" },
  { src: `${BASE}/2021_06_17_Mediaheer_3945-1.jpg`, cat: "food" },
  { src: `${BASE}/2021_06_17_Mediaheer_3949-1.jpg`, cat: "food" },
  { src: `${BASE}/2021_06_17_Mediaheer_3950-1.jpg`, cat: "food" },
  { src: `${BASE}/2021_06_17_Mediaheer_3953-1.jpg`, cat: "food" },
  { src: `${BASE}/2021_06_17_Mediaheer_3957-1.jpg`, cat: "food" },
  { src: `${BASE}/2021_06_17_Mediaheer_3958-1.jpg`, cat: "food" },
  { src: `${BASE}/2021_06_17_Mediaheer_3960-1.jpg`, cat: "food" },
  { src: `${BASE}/2021_06_17_Mediaheer_3962-1.jpg`, cat: "food" },
  { src: `${BASE}/2021_06_17_Mediaheer_3966-1.jpg`, cat: "food" },
  { src: `${BASE}/2021_06_17_Mediaheer_3971-1.jpg`, cat: "food" },
  { src: `${BASE}/2021_06_17_Mediaheer_3972-1.jpg`, cat: "food" },
  { src: `${BASE}/2021_06_17_Mediaheer_3974-1.jpg`, cat: "food" },
  { src: `${BASE}/2021_06_17_Mediaheer_3977-1.jpg`, cat: "food" },
  { src: `${BASE}/2021_06_17_Mediaheer_3978-1.jpg`, cat: "food" },
  { src: `${BASE}/2021_06_17_Mediaheer_3981-1.jpg`, cat: "food" },
  { src: `${BASE}/2021_06_17_Mediaheer_3983-1.jpg`, cat: "food" },
  { src: `${BASE}/2021_06_17_Mediaheer_3985-1.jpg`, cat: "food" },
  { src: `${BASE}/2021_06_17_Mediaheer_3986-1.jpg`, cat: "food" },
  { src: `${BASE}/2021_06_17_Mediaheer_3987-1.jpg`, cat: "food" },
  { src: `${BASE}/2021_06_17_Mediaheer_3993-1.jpg`, cat: "food" },
  { src: `${BASE}/2021_06_17_Mediaheer_3996-1.jpg`, cat: "food" },

  // Interior
  { src: `${BASE}/2021_06_17_Mediaheer_2400-1.jpg`, cat: "interior" },
  { src: `${BASE}/2021_06_17_Mediaheer_2404-1.jpg`, cat: "interior" },
  { src: `${BASE}/2021_06_17_Mediaheer_2408-1.jpg`, cat: "interior" },
  { src: `${BASE}/2021_06_17_Mediaheer_2411-2.jpg`, cat: "interior" },
  { src: `${BASE}/2021_06_17_Mediaheer_2413-1.jpg`, cat: "interior" },
  { src: `${BASE}/2021_06_17_Mediaheer_2417-1.jpg`, cat: "interior" },
  { src: `${BASE}/2021_06_17_Mediaheer_2420-1.jpg`, cat: "interior" },
  { src: `${BASE}/2021_06_17_Mediaheer_2423-1.jpg`, cat: "interior" },
  { src: `${BASE}/2021_06_17_Mediaheer_2430-1.jpg`, cat: "interior" },
  { src: `${BASE}/2021_06_17_Mediaheer_2431-1.jpg`, cat: "interior" },
  { src: `${BASE}/2021_06_17_Mediaheer_2441-1.jpg`, cat: "interior" },
  { src: `${BASE}/2021_06_17_Mediaheer_2444-1.jpg`, cat: "interior" },
  { src: `${BASE}/2021_06_17_Mediaheer_2445-1.jpg`, cat: "interior" },

  // Bar / Drinks
  { src: `${BASE}/2021_06_17_Mediaheer_2557-2.jpg`, cat: "bar" },
  { src: `${BASE}/2021_06_17_Mediaheer_2560-2.jpg`, cat: "bar" },
  { src: `${BASE}/2021_06_17_Mediaheer_2561-2.jpg`, cat: "bar" },
  { src: `${BASE}/2021_06_17_Mediaheer_2579-1.jpg`, cat: "bar" },
  { src: `${BASE}/2021_06_17_Mediaheer_2586-1.jpg`, cat: "bar" },
  { src: `${BASE}/2021_06_17_Mediaheer_2587-1.jpg`, cat: "bar" },
  { src: `${BASE}/2021_06_17_Mediaheer_2590-1.jpg`, cat: "bar" },
  { src: `${BASE}/2021_06_17_Mediaheer_2591-1.jpg`, cat: "bar" },
  { src: `${BASE}/2021_06_17_Mediaheer_2597-1.jpg`, cat: "bar" },
  { src: `${BASE}/2021_06_17_Mediaheer_2600-1.jpg`, cat: "bar" },
  { src: `${BASE}/2021_06_17_Mediaheer_2602-2.jpg`, cat: "bar" },
  { src: `${BASE}/2021_06_17_Mediaheer_2603-1.jpg`, cat: "bar" },
  { src: `${BASE}/2021_06_17_Mediaheer_2606-1.jpg`, cat: "bar" },
  { src: `${BASE}/2021_06_17_Mediaheer_2608-1.jpg`, cat: "bar" },

  // Ambiance
  { src: `${BASE}/2021_06_17_Mediaheer_2568-2-1.jpg`, cat: "ambiance" },
  { src: `${BASE}/2021_06_17_Mediaheer_2569-1.jpg`, cat: "ambiance" },
  { src: `${BASE}/2021_06_17_Mediaheer_2618-1.jpg`, cat: "ambiance" },
  { src: `${BASE}/2021_06_17_Mediaheer_2623-1.jpg`, cat: "ambiance" },
  { src: `${BASE}/2021_06_17_Mediaheer_2630-1.jpg`, cat: "ambiance" },
  { src: `${BASE}/2021_06_17_Mediaheer_2635-1.jpg`, cat: "ambiance" },
];

export default function KosmosPhotosPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filtered = activeCategory === "all"
    ? photos
    : photos.filter((p) => p.cat === activeCategory);

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#1a1a1a]/95 px-6 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <a href="/kosmos" className="flex items-center gap-3">
            <img
              src="https://primary.jwwb.nl/public/l/t/s/temp-jwqgqkdwmrnrolcreinv/fnojkc/kosmos-gold-resized.png"
              alt="Kosmos"
              className="h-7"
            />
            <span className="text-sm text-white/40">/ Photos</span>
          </a>
          <a
            href="/kosmos"
            className="text-xs text-white/40 transition-colors hover:text-[#d4af37]"
          >
            ← Retour
          </a>
        </div>
      </header>

      {/* Title */}
      <div className="px-6 pt-16 pb-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-white md:text-5xl">
            Galerie
          </h1>
          <div className="mt-3 h-[2px] w-16 bg-[#d4af37]" />
          <p className="mt-4 text-sm text-white/40">
            {filtered.length} photos
          </p>
        </div>
      </div>

      {/* Category filters */}
      <div className="sticky top-[65px] z-10 border-b border-white/5 bg-[#1a1a1a]/95 px-6 py-3 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                activeCategory === cat.id
                  ? "bg-[#d4af37] text-white"
                  : "bg-white/5 text-white/50 hover:text-white/70"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Photo grid */}
      <div className="px-6 py-8">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {filtered.map((photo) => (
            <div
              key={photo.src}
              onClick={() => setLightbox(photo.src)}
              className="group relative cursor-pointer overflow-hidden rounded-xl bg-white/5"
            >
              <img
                src={photo.src}
                alt="Kosmos Ieper"
                loading="lazy"
                className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M5 5l10 10M15 5l-10 10" />
            </svg>
          </button>
          <img
            src={lightbox}
            alt="Kosmos Ieper"
            className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
