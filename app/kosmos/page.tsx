"use client";

import { useState, useEffect, useMemo } from "react";
import { Language, MenuItem, Allergen } from "./types";
import { menuCategories } from "./data/menu";
import KosmosHeader from "./components/KosmosHeader";
import CategoryTabs from "./components/CategoryTabs";
import MenuSection from "./components/MenuSection";
import KosmosFooter from "./components/KosmosFooter";
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
import MenuItemDetail from "./components/MenuItemDetail";

export default function KosmosPage() {
  const [language, setLanguage] = useState<Language>("fr");
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
  }, []);

  function handleLanguageChange(lang: Language) {
    setLanguage(lang);
    localStorage.setItem("kosmos-lang", lang);
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

  return (
    <div className="mx-auto flex min-h-screen max-w-lg flex-col">
      <KosmosHeader language={language} onLanguageChange={handleLanguageChange} />
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
  );
}
