"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Language } from "../types";

gsap.registerPlugin(ScrollTrigger);

const t = {
  sectionLabel: { fr: "À propos", nl: "Over Kosmos", en: "About", de: "Über uns" },
  heading1: { fr: "Autrefois une agence de voyages,", nl: "Ooit een reisbureau,", en: "Once a travel agency,", de: "Einst ein Reisebüro," },
  heading2: { fr: "aujourd'hui un bar à tapas branché.", nl: "nu een hippe tapastent.", en: "now a trendy tapas bar.", de: "jetzt eine trendige Tapas-Bar." },
  boldText: { fr: "Grand-Place d'Ypres", nl: "Grote Markt van Ieper", en: "Grote Markt in Ypres", de: "Grote Markt in Ypern" },
  body1: {
    fr: "Situé en plein cœur de la Grand-Place d'Ypres, Kosmos propose un mélange unique de saveurs espagnoles et italiennes. Nos tapas frais sont préparés quotidiennement avec les meilleurs ingrédients, petits par la taille, grands par le goût.",
    nl: "Gelegen pal op de Grote Markt van Ieper, biedt Kosmos een unieke mix van Spaanse en Italiaanse smaken. Onze verse tapas worden dagelijks bereid met de beste ingrediënten, klein van formaat, groot van smaak.",
    en: "Located right on the Grote Markt in Ypres, Kosmos offers a unique blend of Spanish and Italian flavors. Our fresh tapas are prepared daily with the finest ingredients, small in size, big on taste.",
    de: "Direkt am Grote Markt in Ypern gelegen, bietet Kosmos eine einzigartige Mischung aus spanischen und italienischen Aromen. Unsere frischen Tapas werden täglich mit den besten Zutaten zubereitet, klein im Format, groß im Geschmack.",
  },
  body2: {
    fr: "Que vous dégustiez nos cocktails artisanaux, mocktails ou le légendaire picon, chez Kosmos, vous êtes toujours au bon endroit. Musique tendance et ambiance chaleureuse pour tous.",
    nl: "Of je nu geniet van onze handgemaakte cocktails, mocktails of de legendarische picon, bij Kosmos ben je altijd op de juiste plek. Trendy muziek en een warme sfeer voor jong en oud.",
    en: "Whether you enjoy our handcrafted cocktails, mocktails or the legendary picon, at Kosmos, you're always in the right place. Trendy music and a warm atmosphere for everyone.",
    de: "Ob handgemachte Cocktails, Mocktails oder der legendäre Picon, bei Kosmos sind Sie immer am richtigen Ort. Trendige Musik und eine warme Atmosphäre für Jung und Alt.",
  },
  feat1Label: { fr: "Tapas frais", nl: "Verse Tapas", en: "Fresh Tapas", de: "Frische Tapas" },
  feat1Desc: {
    fr: "Tapas frais de qualité avec des spécialités espagnoles et italiennes, préparés quotidiennement.",
    nl: "Kwalitatieve verse tapas met Spaanse en Italiaanse specialiteiten, dagelijks bereid.",
    en: "Quality fresh tapas with Spanish and Italian specialties, prepared daily.",
    de: "Hochwertige frische Tapas mit spanischen und italienischen Spezialitäten, täglich zubereitet.",
  },
  feat2Label: { fr: "Cocktails & Mocktails", nl: "Cocktails & Mocktails", en: "Cocktails & Mocktails", de: "Cocktails & Mocktails" },
  feat2Desc: {
    fr: "Cocktails et mocktails faits maison, et notre célèbre picon. Pour tous les goûts.",
    nl: "Zelf gemaakte cocktails, mocktails en onze alomgekende picon. Voor elk zijn smaak.",
    en: "Handmade cocktails, mocktails and our famous picon. Something for every taste.",
    de: "Selbstgemachte Cocktails, Mocktails und unser berühmter Picon. Für jeden Geschmack.",
  },
  feat3Label: { fr: "Ambiance", nl: "Sfeer & Ambiance", en: "Atmosphere", de: "Atmosphäre" },
  feat3Desc: {
    fr: "L'endroit incontournable avec musique tendance pour tous, en plein cœur d'Ypres.",
    nl: "De place to be met trendy muziek voor jong en oud, pal op de Grote Markt van Ieper.",
    en: "The place to be with trendy music for everyone, right on Ypres' main square.",
    de: "Der Ort für trendige Musik für Jung und Alt, direkt am Grote Markt in Ypern.",
  },
};

const featureIcons = [
  (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
    >
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
    </svg>
  ),
  (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
    >
      <path d="M8 21h8" />
      <path d="M12 15v6" />
      <path d="M4 3h16l-8 12Z" />
      <path d="M15 8.5 19 3" />
    </svg>
  ),
  (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
    >
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  ),
];

interface KosmosSiteAboutProps {
  language: Language;
}

export default function KosmosSiteAbout({ language }: KosmosSiteAboutProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  const features = [
    { id: "tapas", label: t.feat1Label[language], description: t.feat1Desc[language], icon: featureIcons[0] },
    { id: "cocktails", label: t.feat2Label[language], description: t.feat2Desc[language], icon: featureIcons[1] },
    { id: "ambiance", label: t.feat3Label[language], description: t.feat3Desc[language], icon: featureIcons[2] },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    const image = imageRef.current;
    const feats = featuresRef.current;
    if (!section || !text || !image || !feats) return;

    const ctx = gsap.context(() => {
      // Text block fades in from the left
      gsap.fromTo(
        text,
        { opacity: 0, x: -48 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

      // Image fades in from the right
      gsap.fromTo(
        image,
        { opacity: 0, x: 48 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

      // Feature cards stagger up
      gsap.fromTo(
        feats.children,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: feats,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#faf9f6] px-6 py-24 md:px-16 lg:px-24"
    >
      {/* Two-column main block */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
        {/* Left: text */}
        <div ref={textRef} className="opacity-0">
          {/* Section label + Google rating on same line */}
          <div className="mb-5 flex items-center justify-between">
            <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-[#d4af37]">
              {t.sectionLabel[language]}
            </p>
            <div className="flex items-center gap-2 rounded-full border border-[#1a1a1a]/8 bg-white/80 px-3 py-1.5">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0" aria-hidden="true">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span className="text-xs font-semibold text-[#1a1a1a]">4.6</span>
              <div className="flex gap-px text-[#d4af37]">
                {"★★★★".split("").map((_, i) => (
                  <span key={i} className="text-[10px]">★</span>
                ))}
                <span className="text-[10px] opacity-50">★</span>
              </div>
            </div>
          </div>

          {/* Heading */}
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-bold leading-[1.15] text-[#1a1a1a] md:text-5xl">
            {t.heading1[language]}
            <br />
            {t.heading2[language]}
          </h2>

          {/* Gold accent line */}
          <div className="mt-6 mb-8 h-px w-16 bg-[#d4af37]" />

          {/* Body copy */}
          <p className="mb-5 text-base leading-relaxed text-[#1a1a1a]/70">
            {t.body1[language]}
          </p>
          <p className="text-base leading-relaxed text-[#1a1a1a]/70">
            {t.body2[language]}
          </p>
        </div>

        {/* Right: image */}
        <div ref={imageRef} className="opacity-0">
          <div className="relative overflow-hidden rounded-sm">
            {/* Gold corner accent */}
            <div className="absolute top-0 left-0 z-10 h-8 w-8 border-t-2 border-l-2 border-[#d4af37]" />
            <div className="absolute right-0 bottom-0 z-10 h-8 w-8 border-r-2 border-b-2 border-[#d4af37]" />

            <img
              src="https://primary.jwwb.nl/public/l/t/s/temp-jwqgqkdwmrnrolcreinv/2021_06_17_Mediaheer_2411.jpg"
              alt="Kosmos restaurant interieur"
              className="h-full w-full object-cover"
              style={{ aspectRatio: "4 / 3" }}
            />
          </div>
        </div>
      </div>

      {/* Feature highlights */}
      <div
        ref={featuresRef}
        className="mx-auto mt-20 grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-3"
      >
        {features.map((f) => (
          <div
            key={f.id}
            className="flex flex-col gap-4 border-t border-[#1a1a1a]/10 pt-8"
          >
            {/* Icon */}
            <span className="text-[#d4af37]">{f.icon}</span>

            {/* Feature heading */}
            <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-[#1a1a1a]">
              {f.label}
            </h3>

            {/* Feature description */}
            <p className="text-sm leading-relaxed text-[#1a1a1a]/60">
              {f.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
