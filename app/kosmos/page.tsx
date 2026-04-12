"use client";

import { useState } from "react";
import { Language } from "./types";
import KosmosSiteHeader from "./components/KosmosSiteHeader";
import KosmosSiteHero from "./components/KosmosSiteHero";
import KosmosSiteAbout from "./components/KosmosSiteAbout";
import KosmosSiteGallery from "./components/KosmosSiteGallery";
import KosmosSiteMenu from "./components/KosmosSiteMenu";
import KosmosSiteContact from "./components/KosmosSiteContact";

export default function KosmosPage() {
  const [language, setLanguage] = useState<Language>("nl");

  return (
    <main>
      <KosmosSiteHeader language={language} onLanguageChange={setLanguage} />
      <KosmosSiteHero language={language} />
      <KosmosSiteAbout language={language} />
      <KosmosSiteGallery language={language} />
      <KosmosSiteMenu language={language} />
      <KosmosSiteContact language={language} />
    </main>
  );
}
