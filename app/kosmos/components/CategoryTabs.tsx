"use client";

import { useRef, useEffect } from "react";
import { MenuCategory, Language } from "../types";

interface CategoryTabsProps {
  categories: MenuCategory[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
  language: Language;
}

export default function CategoryTabs({ categories, activeCategory, onCategoryChange, language }: CategoryTabsProps) {
  const tabsRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (activeRef.current && tabsRef.current) {
      const container = tabsRef.current;
      const tab = activeRef.current;
      const scrollLeft = tab.offsetLeft - container.offsetWidth / 2 + tab.offsetWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, [activeCategory]);

  return (
    <div
      ref={tabsRef}
      className="flex overflow-x-auto border-b border-white/10 px-3 scrollbar-none"
    >
      {categories.map((cat) => {
        const isActive = cat.id === activeCategory;
        return (
          <button
            key={cat.id}
            ref={isActive ? activeRef : null}
            onClick={() => onCategoryChange(cat.id)}
            className={`whitespace-nowrap px-4 py-3 text-[13px] transition-colors ${
              isActive
                ? "border-b-2 border-[#d4af37] font-semibold text-[#d4af37]"
                : "text-white/50 hover:text-white/70"
            }`}
          >
            {cat.name[language]}
          </button>
        );
      })}
    </div>
  );
}
