"use client";

import { useState, useEffect } from "react";
import { Language } from "./types";
import KosmosSiteHeader from "./components/KosmosSiteHeader";
import KosmosSiteHero from "./components/KosmosSiteHero";
import KosmosSiteAbout from "./components/KosmosSiteAbout";
import KosmosSiteGallery from "./components/KosmosSiteGallery";
import KosmosSiteMenu from "./components/KosmosSiteMenu";
import KosmosSiteReviews from "./components/KosmosSiteReviews";
import KosmosSiteContact from "./components/KosmosSiteContact";
import AccessibilityWidget from "./components/AccessibilityWidget";

export default function KosmosPage() {
  const [language, setLanguage] = useState<Language>("nl");

  useEffect(() => {
    const saved = localStorage.getItem("kosmos-lang") as Language | null;
    if (saved && ["fr", "nl", "en", "de"].includes(saved)) {
      setLanguage(saved);
    }
  }, []);

  function handleLanguageChange(lang: Language) {
    setLanguage(lang);
    localStorage.setItem("kosmos-lang", lang);
  }

  return (
    <main>
      <KosmosSiteHeader language={language} onLanguageChange={handleLanguageChange} />
      <KosmosSiteHero language={language} />
      <KosmosSiteAbout language={language} />
      <KosmosSiteGallery language={language} />
      <KosmosSiteMenu language={language} />
      <KosmosSiteReviews language={language} />
      <KosmosSiteContact language={language} />
      <AccessibilityWidget language={language} />
    </main>
  );
}
