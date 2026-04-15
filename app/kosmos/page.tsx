"use client";

import { useState, useEffect } from "react";
import { Language } from "./types";
import KosmosSiteHeader from "./components/KosmosSiteHeader";
import KosmosSiteHero from "./components/KosmosSiteHero";
import KosmosSiteAbout from "./components/KosmosSiteAbout";
import KosmosSiteGallery from "./components/KosmosSiteGallery";
import KosmosSiteMenu from "./components/KosmosSiteMenu";
import KosmosSiteContact from "./components/KosmosSiteContact";
import AccessibilityWidget from "./components/AccessibilityWidget";

export default function KosmosPage() {
  const [language, setLanguage] = useState<Language>("nl");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("kosmos-lang") as Language | null;
    if (saved && ["fr", "nl", "en", "de"].includes(saved)) {
      setLanguage(saved);
    }

    // Wait for page to be fully ready
    if (document.readyState === "complete") {
      setTimeout(() => setLoading(false), 800);
    } else {
      window.addEventListener("load", () => {
        setTimeout(() => setLoading(false), 800);
      });
    }
  }, []);

  function handleLanguageChange(lang: Language) {
    setLanguage(lang);
    localStorage.setItem("kosmos-lang", lang);
  }

  return (
    <>
      {/* Loader — white bg fades out, logo stays and merges with hero logo */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center transition-all ${
          loading
            ? "pointer-events-auto"
            : "pointer-events-none"
        }`}
      >
        {/* White background — fades out first */}
        <div
          className={`absolute inset-0 bg-white transition-opacity duration-1000 ${
            loading ? "opacity-100" : "opacity-0"
          }`}
        />
        {/* Logo — stays visible longer, then fades */}
        <img
          src="https://primary.jwwb.nl/public/l/t/s/temp-jwqgqkdwmrnrolcreinv/fnojkc/kosmos-gold-resized.png"
          alt="Kosmos"
          className={`relative z-10 h-16 -translate-y-12 drop-shadow-lg transition-opacity duration-500 ${
            loading ? "opacity-100" : "opacity-0 delay-700"
          }`}
        />
      </div>

      {/* Site content — always rendered, revealed when loader fades */}
      <main>
        <KosmosSiteHeader language={language} onLanguageChange={handleLanguageChange} />
        <KosmosSiteHero language={language} />
        <KosmosSiteAbout language={language} />
        <KosmosSiteGallery language={language} />
        <KosmosSiteMenu language={language} />
        <KosmosSiteContact language={language} />
        <AccessibilityWidget language={language} />
      </main>
    </>
  );
}
