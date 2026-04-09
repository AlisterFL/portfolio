"use client";

import { Allergen, Language } from "../types";

interface FilterBarProps {
  activeTags: string[];
  excludedAllergens: Allergen[];
  onToggleTag: (tag: string) => void;
  onToggleAllergen: (allergen: Allergen) => void;
  language: Language;
}

const tagFilters: { key: string; label: Record<Language, string>; icon: React.ReactNode; activeColor: string }[] = [
  {
    key: "vegetarian",
    label: { fr: "Végétarien", nl: "Vegetarisch", en: "Vegetarian", de: "Vegetarisch" },
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 22c1.25-1.25 2.5-3 3.5-5.5C7 13 8 10.5 12 7c-3.5 4-6 5-8.5 6.5C1 14.5 0 16 0 16" />
        <path d="M22 2L15 9" /><path d="M15 2C15 2 12 5 9 9" /><path d="M22 9C22 9 19 6 15 9" />
      </svg>
    ),
    activeColor: "text-green-600 border-green-500/40 bg-green-500/10",
  },
  {
    key: "vegan",
    label: { fr: "Végan", nl: "Veganistisch", en: "Vegan", de: "Vegan" },
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22c4-4 8-10 8-16H4c0 6 4 12 8 16Z" /><path d="M12 10v6" /><path d="M9 13h6" />
      </svg>
    ),
    activeColor: "text-green-600 border-green-500/40 bg-green-500/10",
  },
  {
    key: "spicy",
    label: { fr: "Épicé", nl: "Pikant", en: "Spicy", de: "Scharf" },
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2c0 4-4 6-4 10a4 4 0 0 0 8 0c0-4-4-6-4-10Z" /><path d="M12 18v4" />
      </svg>
    ),
    activeColor: "text-orange-500 border-orange-500/40 bg-orange-500/10",
  },
];

const allergenFilters: { key: Allergen; label: Record<Language, string>; icon: string }[] = [
  { key: "gluten", label: { fr: "Sans gluten", nl: "Glutenvrij", en: "Gluten-free", de: "Glutenfrei" }, icon: "🌾" },
  { key: "dairy", label: { fr: "Sans lactose", nl: "Lactosevrij", en: "Dairy-free", de: "Laktosefrei" }, icon: "🥛" },
  { key: "crustaceans", label: { fr: "Sans crustacés", nl: "Zonder schaaldieren", en: "No crustaceans", de: "Ohne Krebstiere" }, icon: "🦐" },
  { key: "eggs", label: { fr: "Sans œufs", nl: "Zonder eieren", en: "Egg-free", de: "Ohne Eier" }, icon: "🥚" },
  { key: "nuts", label: { fr: "Sans noix", nl: "Notenvrij", en: "Nut-free", de: "Nussfrei" }, icon: "🌰" },
];

export default function FilterBar({
  activeTags,
  excludedAllergens,
  onToggleTag,
  onToggleAllergen,
  language,
}: FilterBarProps) {
  return (
    <div className="flex gap-2 px-4 py-2 overflow-x-auto scrollbar-none items-center">
      {tagFilters.map(({ key, label, icon, activeColor }) => {
        const isActive = activeTags.includes(key);
        return (
          <button
            key={key}
            onClick={() => onToggleTag(key)}
            className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-full border transition-colors ${
              isActive
                ? activeColor
                : "text-[var(--text-secondary)] border-[var(--border)] bg-[var(--surface)]"
            }`}
          >
            {icon}
            {label[language]}
          </button>
        );
      })}

      <div className="shrink-0 w-px h-4 bg-[var(--border)] mx-1" />

      {allergenFilters.map(({ key, label, icon }) => {
        const isExcluded = excludedAllergens.includes(key);
        return (
          <button
            key={key}
            onClick={() => onToggleAllergen(key)}
            className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-full border transition-colors ${
              isExcluded
                ? "text-red-500 border-red-500/40 bg-red-500/10"
                : "text-[var(--text-secondary)] border-[var(--border)] bg-[var(--surface)]"
            }`}
          >
            <span className="text-sm leading-none">{icon}</span>
            {label[language]}
          </button>
        );
      })}
    </div>
  );
}
