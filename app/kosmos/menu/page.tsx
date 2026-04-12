"use client";

import { useState, useEffect, useMemo } from "react";
import { Language, Theme, MenuItem, Allergen } from "../types";
import { menuCategories } from "../data/menu";
import KosmosHeader from "../components/KosmosHeader";
import CategoryTabs from "../components/CategoryTabs";
import MenuSection from "../components/MenuSection";
import KosmosFooter from "../components/KosmosFooter";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import MenuItemDetail from "../components/MenuItemDetail";

const darkVars: React.CSSProperties = {
  "--bg": "#0a0a0a",
  "--bg-secondary": "#1a1a1a",
  "--surface": "rgba(255,255,255,0.03)",
  "--surface-hover": "rgba(255,255,255,0.06)",
  "--text": "#ffffff",
  "--text-secondary": "rgba(255,255,255,0.5)",
  "--text-tertiary": "rgba(255,255,255,0.3)",
  "--accent": "#d4af37",
  "--border": "rgba(255,255,255,0.06)",
  "--border-accent": "rgba(212,175,55,0.2)",
  "--backdrop": "rgba(0,0,0,0.8)",
} as React.CSSProperties;

const lightVars: React.CSSProperties = {
  "--bg": "#f8f7f4",
  "--bg-secondary": "#ffffff",
  "--surface": "rgba(0,0,0,0.03)",
  "--surface-hover": "rgba(0,0,0,0.06)",
  "--text": "#1a1a1a",
  "--text-secondary": "rgba(0,0,0,0.55)",
  "--text-tertiary": "rgba(0,0,0,0.35)",
  "--accent": "#b8942e",
  "--border": "rgba(0,0,0,0.08)",
  "--border-accent": "rgba(184,148,46,0.25)",
  "--backdrop": "rgba(0,0,0,0.5)",
} as React.CSSProperties;

export default function KosmosPage() {
  const [language, setLanguage] = useState<Language>("fr");
  const [theme, setTheme] = useState<Theme>("dark");
  const [activeCategory, setActiveCategory] = useState(menuCategories[0].id);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [excludedAllergens, setExcludedAllergens] = useState<Allergen[]>([]);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("kosmos-lang") as Language | null;
    if (saved && ["fr", "nl", "en", "de"].includes(saved)) {
      setLanguage(saved);
    }
    const savedTheme = localStorage.getItem("kosmos-theme") as Theme | null;
    if (savedTheme === "dark" || savedTheme === "light") {
      setTheme(savedTheme);
    }
  }, []);

  function handleLanguageChange(lang: Language) {
    setLanguage(lang);
    localStorage.setItem("kosmos-lang", lang);
  }

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("kosmos-theme", next);
  }

  function toggleTag(tag: string) {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  function toggleAllergen(allergen: Allergen) {
    setExcludedAllergens((prev) =>
      prev.includes(allergen) ? prev.filter((a) => a !== allergen) : [...prev, allergen]
    );
  }

  const currentCategory = menuCategories.find((c) => c.id === activeCategory) ?? menuCategories[0];

  // Filter items
  const filteredCategory = useMemo(() => {
    let items = currentCategory.items;

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (item) =>
          item.name[language].toLowerCase().includes(q) ||
          item.description[language].toLowerCase().includes(q)
      );
    }

    // Tag filter (show only items that have ALL active tags)
    if (activeTags.length > 0) {
      items = items.filter((item) =>
        activeTags.every((tag) => item.tags?.includes(tag))
      );
    }

    // Allergen exclusion (hide items that contain ANY excluded allergen)
    if (excludedAllergens.length > 0) {
      items = items.filter(
        (item) =>
          !item.allergens?.some((a) => excludedAllergens.includes(a))
      );
    }

    return { ...currentCategory, items };
  }, [currentCategory, searchQuery, activeTags, excludedAllergens, language]);

  const themeVars = theme === "dark" ? darkVars : lightVars;

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{ ...themeVars, backgroundColor: "var(--bg)", color: "var(--text)" } as React.CSSProperties}
    >
      <div className="mx-auto flex min-h-screen max-w-lg flex-col">
        <KosmosHeader language={language} onLanguageChange={handleLanguageChange} theme={theme} onThemeToggle={toggleTheme} />
        <SearchBar value={searchQuery} onChange={setSearchQuery} language={language} />
        <FilterBar
          activeTags={activeTags}
          excludedAllergens={excludedAllergens}
          onToggleTag={toggleTag}
          onToggleAllergen={toggleAllergen}
          language={language}
        />
        <CategoryTabs
          categories={menuCategories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          language={language}
        />
        <div className="flex-1">
          <MenuSection
            category={filteredCategory}
            language={language}
            onItemClick={setSelectedItem}
          />
        </div>
        <KosmosFooter language={language} />
        <MenuItemDetail
          item={selectedItem}
          language={language}
          onClose={() => setSelectedItem(null)}
        />
      </div>
    </div>
  );
}
