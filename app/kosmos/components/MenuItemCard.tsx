"use client";

import { MenuItem, Language, Allergen } from "../types";

const allergenShort: Record<Allergen, Record<Language, string>> = {
  gluten: { fr: "Gluten", nl: "Gluten", en: "Gluten", de: "Gluten" },
  crustaceans: { fr: "Crustacés", nl: "Schaaldieren", en: "Shellfish", de: "Krebstiere" },
  eggs: { fr: "Œufs", nl: "Eieren", en: "Eggs", de: "Eier" },
  fish: { fr: "Poisson", nl: "Vis", en: "Fish", de: "Fisch" },
  peanuts: { fr: "Arachides", nl: "Pinda's", en: "Peanuts", de: "Erdnüsse" },
  soy: { fr: "Soja", nl: "Soja", en: "Soy", de: "Soja" },
  dairy: { fr: "Lait", nl: "Melk", en: "Dairy", de: "Milch" },
  nuts: { fr: "Noix", nl: "Noten", en: "Nuts", de: "Nüsse" },
  celery: { fr: "Céleri", nl: "Selderij", en: "Celery", de: "Sellerie" },
  mustard: { fr: "Moutarde", nl: "Mosterd", en: "Mustard", de: "Senf" },
  sesame: { fr: "Sésame", nl: "Sesam", en: "Sesame", de: "Sesam" },
  sulphites: { fr: "Sulfites", nl: "Sulfieten", en: "Sulphites", de: "Sulfite" },
  lupin: { fr: "Lupin", nl: "Lupine", en: "Lupin", de: "Lupine" },
  molluscs: { fr: "Mollusques", nl: "Weekdieren", en: "Molluscs", de: "Weichtiere" },
};

interface MenuItemCardProps {
  item: MenuItem;
  language: Language;
  onClick: () => void;
}

export default function MenuItemCard({ item, language, onClick }: MenuItemCardProps) {
  return (
    <div
      onClick={onClick}
      className="flex cursor-pointer gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 transition hover:bg-[var(--surface-hover)]"
    >
      <img
        src={item.image}
        alt={item.name[language]}
        loading="lazy"
        className="h-20 w-20 flex-shrink-0 rounded-[10px] object-cover"
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-[15px] font-semibold text-[var(--text)]">{item.name[language]}</h3>
          <span className="whitespace-nowrap text-[15px] font-bold text-[var(--accent)]">
            &euro;{item.price.toFixed(2)}
          </span>
        </div>
        <p className="mt-1 text-xs leading-relaxed text-[var(--text-secondary)]">
          {item.description[language]}
        </p>
        {(item.nutrition || (item.allergens && item.allergens.length > 0)) && (
          <div className="mt-1.5 flex items-center justify-between">
            {item.allergens && item.allergens.length > 0 ? (
              <p className="text-[10px] text-[var(--text-tertiary)]">
                {item.allergens.map((a) => allergenShort[a][language]).join(" · ")}
              </p>
            ) : <span />}
            {item.nutrition && (
              <span className="text-[10px] text-[var(--text-tertiary)]">
                {item.nutrition.calories} kcal
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
