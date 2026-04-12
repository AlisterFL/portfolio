"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Language } from "../types";

gsap.registerPlugin(ScrollTrigger);

const t = {
  heading: { fr: "L'expérience", nl: "De beleving", en: "The experience", de: "Das Erlebnis" },
  quote1: {
    fr: "Un lieu où chaque détail est pensé pour éveiller vos sens",
    nl: "Een plek waar elk detail is ontworpen om je zintuigen te prikkelen",
    en: "A place where every detail is designed to awaken your senses",
    de: "Ein Ort, an dem jedes Detail darauf ausgelegt ist, Ihre Sinne zu wecken",
  },
  label1: { fr: "Intérieur", nl: "Interieur", en: "Interior", de: "Interieur" },
  label2: { fr: "Saveurs", nl: "Smaken", en: "Flavors", de: "Aromen" },
  label3: { fr: "Moments", nl: "Momenten", en: "Moments", de: "Momente" },
  cta: {
    fr: "Partagez votre moment avec nous",
    nl: "Deel jouw moment met ons",
    en: "Share your moment with us",
    de: "Teilen Sie Ihren Moment mit uns",
  },
  viewAll: {
    fr: "Voir toutes les photos",
    nl: "Bekijk alle foto's",
    en: "View all photos",
    de: "Alle Fotos ansehen",
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

    const items = section.querySelectorAll(".gallery-item");
    items.forEach((item, i) => {
      gsap.fromTo(
        item,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: i * 0.08,
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#f3f1ec] px-6 py-28 md:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">

        {/* Header — offset layout */}
        <div className="gallery-item mb-20 flex flex-col items-start md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-[family-name:var(--font-playfair)] text-5xl font-bold text-[#1a1a1a] md:text-6xl">
              {t.heading[language]}
            </h2>
            <div className="mt-4 h-[2px] w-16 bg-[#d4af37]" />
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#1a1a1a]/50 md:mt-0 md:text-right">
            {t.quote1[language]}
          </p>
        </div>

        {/* Row 1: large image + text card */}
        <div className="gallery-item mb-5 grid grid-cols-1 gap-5 md:grid-cols-3">
          <div className="group relative col-span-2 overflow-hidden rounded-2xl">
            <img
              src={photos[0].src}
              alt={photos[0].alt}
              className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-105 md:h-96"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
              <p className="text-xs tracking-[0.2em] uppercase text-[#d4af37]">{t.label1[language]}</p>
            </div>
          </div>
          <div className="flex flex-col justify-between rounded-2xl bg-[#1a1a1a] p-8">
            <div>
              <div className="mb-4 h-px w-8 bg-[#d4af37]" />
              <p className="font-[family-name:var(--font-playfair)] text-xl leading-snug text-white/90 italic">
                &ldquo;{t.quote1[language]}&rdquo;
              </p>
            </div>
            <p className="mt-6 text-xs text-white/30">Kosmos Ieper</p>
          </div>
        </div>

        {/* Row 2: three equal images */}
        <div className="mb-5 grid grid-cols-2 gap-5 md:grid-cols-3">
          <div className="gallery-item group relative overflow-hidden rounded-2xl">
            <img
              src={photos[1].src}
              alt={photos[1].alt}
              className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-105 md:h-64"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
              <p className="text-[10px] tracking-[0.2em] uppercase text-white/70">{t.label2[language]}</p>
            </div>
          </div>
          <div className="gallery-item group relative overflow-hidden rounded-2xl">
            <img
              src={photos[2].src}
              alt={photos[2].alt}
              className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-105 md:h-64"
            />
          </div>
          <div className="gallery-item group relative col-span-2 overflow-hidden rounded-2xl md:col-span-1">
            <img
              src={photos[3].src}
              alt={photos[3].alt}
              className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-105 md:h-64"
            />
          </div>
        </div>

        {/* Row 3: text + wide image */}
        <div className="gallery-item grid grid-cols-1 gap-5 md:grid-cols-3">
          <div className="flex items-center justify-center rounded-2xl border border-[#1a1a1a]/10 bg-[#faf9f6] p-8">
            <div className="text-center">
              <p className="mb-2 text-xs tracking-[0.2em] uppercase text-[#d4af37]">{t.label3[language]}</p>
              <p className="font-[family-name:var(--font-playfair)] text-lg text-[#1a1a1a]/70">
                #kosmosieper
              </p>
              <p className="mt-3 text-xs text-[#1a1a1a]/40">{t.cta[language]}</p>
            </div>
          </div>
          <div className="group relative col-span-1 overflow-hidden rounded-2xl md:col-span-2">
            <img
              src={photos[4].src}
              alt={photos[4].alt}
              className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-105 md:h-72"
            />
          </div>
        </div>

        {/* View all link */}
        <div className="gallery-item mt-10 text-center">
          <a
            href="/kosmos/photos"
            className="inline-flex items-center gap-2 text-sm text-[#1a1a1a]/50 transition-colors hover:text-[#d4af37]"
          >
            {t.viewAll[language]}
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}
