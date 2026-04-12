"use client";

import { useState } from "react";
import { Language } from "../types";
import KosmosSiteHeader from "../components/KosmosSiteHeader";

const BASE = "https://primary.jwwb.nl/public/l/t/s/temp-jwqgqkdwmrnrolcreinv";

const categoryLabels: Record<string, Record<Language, string>> = {
  all: { fr: "Tout", nl: "Alles", en: "All", de: "Alle" },
  food: { fr: "Cuisine", nl: "Keuken", en: "Food", de: "Küche" },
  interior: { fr: "Intérieur", nl: "Interieur", en: "Interior", de: "Interieur" },
  bar: { fr: "Bar", nl: "Bar", en: "Bar", de: "Bar" },
  ambiance: { fr: "Ambiance", nl: "Sfeer", en: "Ambiance", de: "Atmosphäre" },
};

const CATEGORY_KEYS = ["all", "food", "interior", "bar", "ambiance"] as const;

const t = {
  title: { fr: "Galerie", nl: "Galerij", en: "Gallery", de: "Galerie" },
  photos: { fr: "photos", nl: "foto's", en: "photos", de: "Fotos" },
};

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
  const [language, setLanguage] = useState<Language>("nl");
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filtered = activeCategory === "all"
    ? photos
    : photos.filter((p) => p.cat === activeCategory);

  return (
    <>
      <KosmosSiteHeader language={language} onLanguageChange={setLanguage} />

      {/* Title */}
      <div className="px-6 pt-28 pb-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-[#1a1a1a] md:text-5xl">
            {t.title[language]}
          </h1>
          <div className="mt-3 h-[2px] w-16 bg-[#d4af37]" />
          <p className="mt-4 text-sm text-[#1a1a1a]/40">
            {filtered.length} {t.photos[language]}
          </p>
        </div>
      </div>

      {/* Category filters */}
      <div className="sticky top-[53px] z-10 border-b border-[#1a1a1a]/5 bg-[#faf9f6]/95 px-6 py-3 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto scrollbar-none">
          {CATEGORY_KEYS.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-[#d4af37] text-white"
                  : "bg-[#1a1a1a]/5 text-[#1a1a1a]/50 hover:text-[#1a1a1a]/70"
              }`}
            >
              {categoryLabels[cat][language]}
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
              className="group relative cursor-pointer overflow-hidden rounded-xl bg-[#1a1a1a]/5"
            >
              <img
                src={photo.src}
                alt="Kosmos Ieper"
                loading="lazy"
                className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
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
    </>
  );
}
