"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Language } from "../types";

gsap.registerPlugin(ScrollTrigger);

const t = {
  heading: { fr: "L'expérience", nl: "De beleving", en: "The experience", de: "Das Erlebnis" },
  sub: {
    fr: "Un lieu où chaque détail est pensé pour éveiller vos sens",
    nl: "Een plek waar elk detail is ontworpen om je zintuigen te prikkelen",
    en: "A place where every detail is designed to awaken your senses",
    de: "Ein Ort, an dem jedes Detail darauf ausgelegt ist, Ihre Sinne zu wecken",
  },
  label1: { fr: "Intérieur", nl: "Interieur", en: "Interior", de: "Interieur" },
  label2: { fr: "Saveurs", nl: "Smaken", en: "Flavors", de: "Aromen" },
  label3: { fr: "Ambiance", nl: "Sfeer", en: "Ambiance", de: "Atmosphäre" },
  label4: { fr: "Terrasse", nl: "Terras", en: "Terrace", de: "Terrasse" },
  viewAll: {
    fr: "Explorer la galerie",
    nl: "Ontdek de galerij",
    en: "Explore the gallery",
    de: "Galerie entdecken",
  },
};

const photos = [
  { src: "https://primary.jwwb.nl/public/l/t/s/temp-jwqgqkdwmrnrolcreinv/2021_06_17_Mediaheer_2411-2.jpg", alt: "Kosmos interieur" },
  { src: "https://primary.jwwb.nl/public/l/t/s/temp-jwqgqkdwmrnrolcreinv/2021_06_17_Mediaheer_3945-1.jpg", alt: "Kosmos tapas" },
  { src: "https://primary.jwwb.nl/public/l/t/s/temp-jwqgqkdwmrnrolcreinv/2021_06_17_Mediaheer_2602-2.jpg", alt: "Kosmos bar" },
  { src: "https://primary.jwwb.nl/public/l/t/s/temp-jwqgqkdwmrnrolcreinv/2021_06_17_Mediaheer_2630-1.jpg", alt: "Kosmos sfeer" },
  { src: "https://primary.jwwb.nl/public/l/t/s/temp-jwqgqkdwmrnrolcreinv/2021_06_17_Mediaheer_3972-1.jpg", alt: "Kosmos gerechten" },
  { src: "https://primary.jwwb.nl/public/l/t/s/temp-jwqgqkdwmrnrolcreinv/2021_06_17_Mediaheer_2568-2-1.jpg", alt: "Kosmos ambiance" },
];

interface KosmosSiteGalleryProps {
  language: Language;
}

export default function KosmosSiteGallery({ language }: KosmosSiteGalleryProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reveals = section.querySelectorAll(".reveal");
    reveals.forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          delay: i * 0.06,
          scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" },
        }
      );
    });

    return () => { ScrollTrigger.getAll().forEach((st) => st.kill()); };
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#f3f1ec]">

      <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">

        {/* Header */}
        <div className="reveal mb-16 md:mb-24">
          <p className="mb-4 text-[11px] font-medium tracking-[0.3em] uppercase text-[#d4af37]">
            — {t.heading[language]}
          </p>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className="font-[family-name:var(--font-playfair)] text-5xl font-bold leading-[1.05] md:text-7xl">
              {t.heading[language]}
              <span className="text-[#d4af37]">.</span>
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-[#1a1a1a]/40 md:text-right">
              {t.sub[language]}
            </p>
          </div>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-[280px_200px_280px] md:gap-4">

          {/* Large — top left, spans 2 cols + 2 rows */}
          <div className="reveal group relative col-span-2 row-span-2 overflow-hidden rounded-2xl">
            <img
              src={photos[0].src}
              alt={photos[0].alt}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <p className="text-[10px] font-medium tracking-[0.3em] uppercase text-[#d4af37]">{t.label1[language]}</p>
              <p className="mt-1 font-[family-name:var(--font-playfair)] text-xl font-bold text-[#1a1a1a]">
                Grote Markt 26
              </p>
            </div>
          </div>

          {/* Top right — food */}
          <div className="reveal group relative overflow-hidden rounded-2xl">
            <img
              src={photos[1].src}
              alt={photos[1].alt}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <p className="absolute bottom-4 left-4 text-[10px] font-medium tracking-[0.3em] uppercase text-[#d4af37]">
              {t.label2[language]}
            </p>
          </div>

          {/* Top far right — bar */}
          <div className="reveal group relative overflow-hidden rounded-2xl">
            <img
              src={photos[2].src}
              alt={photos[2].alt}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <p className="absolute bottom-4 left-4 text-[10px] font-medium tracking-[0.3em] uppercase text-[#d4af37]">
              {t.label3[language]}
            </p>
          </div>

          {/* Middle right — quote card */}
          <div className="reveal col-span-2 flex flex-col justify-center rounded-2xl border border-[#1a1a1a]/[0.06] bg-white/60 p-8">
            <div className="mb-3 h-px w-10 bg-[#d4af37]" />
            <p className="font-[family-name:var(--font-playfair)] text-lg leading-snug text-[#1a1a1a]/80 italic md:text-xl">
              &ldquo;{t.sub[language]}&rdquo;
            </p>
            <p className="mt-4 text-[11px] tracking-[0.2em] uppercase text-[#1a1a1a]/25">Kosmos Ieper</p>
          </div>

          {/* Bottom left — ambiance */}
          <div className="reveal group relative overflow-hidden rounded-2xl">
            <img
              src={photos[3].src}
              alt={photos[3].alt}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <p className="absolute bottom-4 left-4 text-[10px] font-medium tracking-[0.3em] uppercase text-[#d4af37]">
              {t.label4[language]}
            </p>
          </div>

          {/* Bottom center — food detail */}
          <div className="reveal group relative overflow-hidden rounded-2xl">
            <img
              src={photos[4].src}
              alt={photos[4].alt}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Bottom right — CTA card */}
          <div className="reveal col-span-2 flex items-center justify-between rounded-2xl border border-[#1a1a1a]/[0.06] bg-white/60 p-8">
            <div>
              <p className="font-[family-name:var(--font-playfair)] text-lg font-bold text-[#1a1a1a]">
                {t.viewAll[language]}
              </p>
              <p className="mt-1 text-xs text-[#1a1a1a]/30">59 photos</p>
            </div>
            <a
              href="/kosmos/photos"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#d4af37] text-white transition-transform hover:scale-110"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>

    </section>
  );
}
