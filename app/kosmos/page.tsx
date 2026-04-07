"use client";

import { useState, useEffect } from "react";
import { Language } from "./types";
import { menuCategories } from "./data/menu";
import KosmosHeader from "./components/KosmosHeader";
import CategoryTabs from "./components/CategoryTabs";
import MenuSection from "./components/MenuSection";
import KosmosFooter from "./components/KosmosFooter";

export default function KosmosPage() {
  const [language, setLanguage] = useState<Language>("fr");
  const [activeCategory, setActiveCategory] = useState(menuCategories[0].id);

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

  const currentCategory = menuCategories.find((c) => c.id === activeCategory) ?? menuCategories[0];

  return (
    <div className="mx-auto flex min-h-screen max-w-lg flex-col">
      <KosmosHeader language={language} onLanguageChange={handleLanguageChange} />
      <CategoryTabs
        categories={menuCategories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        language={language}
      />
      <div className="flex-1">
        <MenuSection category={currentCategory} language={language} />
      </div>
      <KosmosFooter language={language} />
    </div>
  );
}
