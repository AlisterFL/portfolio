"use client";

import { Allergen, Language } from "../types";

interface FilterBarProps {
  activeTags: string[];
  excludedAllergens: Allergen[];
  onToggleTag: (tag: string) => void;
  onToggleAllergen: (allergen: Allergen) => void;
  language: Language;
}

const tagLabels: Record<string, Record<Language, string>> = {
  vegetarian: { fr: "Végétarien", nl: "Vegetarisch", en: "Vegetarian", de: "Vegetarisch" },
  vegan: { fr: "Végan", nl: "Veganistisch", en: "Vegan", de: "Vegan" },
  spicy: { fr: "Épicé", nl: "Pikant", en: "Spicy", de: "Scharf" },
};

const allergenFilterLabels: Record<string, Record<Language, string>> = {
  gluten: { fr: "Sans gluten", nl: "Glutenvrij", en: "Gluten-free", de: "Glutenfrei" },
  dairy: { fr: "Sans lactose", nl: "Lactosevrij", en: "Dairy-free", de: "Laktosefrei" },
  crustaceans: { fr: "Sans crustacés", nl: "Zonder schaaldieren", en: "No crustaceans", de: "Ohne Krebstiere" },
  eggs: { fr: "Sans œufs", nl: "Zonder eieren", en: "Egg-free", de: "Ohne Eier" },
  nuts: { fr: "Sans noix", nl: "Notenvrij", en: "Nut-free", de: "Nussfrei" },
};

const TAG_KEYS = ["vegetarian", "vegan", "spicy"] as const;
const ALLERGEN_KEYS = ["gluten", "dairy", "crustaceans", "eggs", "nuts"] as const;

function getTagActiveClass(tag: string): string {
  if (tag === "spicy") {
    return "bg-orange-900/50 text-orange-400 border-orange-500/30";
  }
  return "bg-green-900/50 text-green-400 border-green-500/30";
}

export default function FilterBar({
  activeTags,
  excludedAllergens,
  onToggleTag,
  onToggleAllergen,
  language,
}: FilterBarProps) {
  return (
    <div className="flex gap-2 px-4 py-2 overflow-x-auto scrollbar-none items-center">
      {/* Diet / tag filters */}
      {TAG_KEYS.map((tag) => {
        const isActive = activeTags.includes(tag);
        return (
          <button
            key={tag}
            onClick={() => onToggleTag(tag)}
            className={`shrink-0 px-3 py-1 text-xs rounded-full border transition-colors ${
              isActive
                ? getTagActiveClass(tag)
                : "bg-white/[0.06] text-white/50 border-white/10"
            }`}
          >
            {tagLabels[tag][language]}
          </button>
        );
      })}

      {/* Divider */}
      <div className="shrink-0 w-px h-4 bg-white/10 mx-1" />

      {/* Allergen exclusion filters */}
      {ALLERGEN_KEYS.map((allergen) => {
        const isExcluded = excludedAllergens.includes(allergen as Allergen);
        return (
          <button
            key={allergen}
            onClick={() => onToggleAllergen(allergen as Allergen)}
            className={`shrink-0 px-3 py-1 text-xs rounded-full border transition-colors ${
              isExcluded
                ? "bg-red-900/30 text-red-400 border-red-500/30"
                : "bg-white/[0.06] text-white/50 border-white/10"
            }`}
          >
            {allergenFilterLabels[allergen][language]}
          </button>
        );
      })}
    </div>
  );
}
