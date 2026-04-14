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
      {/* Loader */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-white transition-all duration-700 ${
          loading ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <img
          src="https://primary.jwwb.nl/public/l/t/s/temp-jwqgqkdwmrnrolcreinv/fnojkc/kosmos-gold-resized.png"
          alt="Kosmos"
          className={`h-12 transition-all duration-700 ${loading ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
        />
      </div>

      {/* Site content */}
      <main
        className={`transition-opacity duration-700 ${loading ? "opacity-0" : "opacity-100"}`}
      >
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
