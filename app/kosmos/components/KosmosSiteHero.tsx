"use client";

import { Language } from "../types";
import heroImage from "../assets/hero.png";

const t = {
  subtitle: { fr: "Restaurant & Bar à Tapas", nl: "Restaurant & Tapas Bar", en: "Restaurant & Tapas Bar", de: "Restaurant & Tapas Bar" },
  scroll: { fr: "Défiler", nl: "Scroll", en: "Scroll", de: "Scrollen" },
};

interface KosmosSiteHeroProps {
  language: Language;
}

export default function KosmosSiteHero({ language }: KosmosSiteHeroProps) {
  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url('${heroImage.src}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Radial vignette — darkens center where text sits */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        <img
          src="https://primary.jwwb.nl/public/l/t/s/temp-jwqgqkdwmrnrolcreinv/fnojkc/kosmos-gold-resized.png"
          alt="Kosmos Ieper"
          className="mb-6 h-16 drop-shadow-lg"
        />
        <p
          className="mb-8 text-center text-lg tracking-[0.2em] uppercase text-white/80 md:text-xl"
          style={{ textShadow: "0 1px 10px rgba(0,0,0,0.3)" }}
        >
          {t.subtitle[language]}
        </p>
        <div className="flex flex-col items-center gap-2 text-white/60">
          <span className="text-xs tracking-[0.15em] uppercase">{t.scroll[language]}</span>
          <svg
            className="h-5 w-5 animate-bounce"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}
