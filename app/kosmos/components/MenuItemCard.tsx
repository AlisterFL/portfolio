"use client";

import { MenuItem, Language, Allergen } from "../types";

const allergenLabel: Record<Allergen, Record<Language, string>> = {
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

const detailHint: Record<Language, string> = {
  fr: "Plus de détails",
  nl: "Meer details",
  en: "More details",
  de: "Mehr Details",
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
      className="relative flex cursor-pointer gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 transition hover:bg-[var(--surface-hover)]"
    >
      {item.tags?.includes("popular") && (
        <span className="absolute -right-1 -top-1 flex items-center gap-0.5 rounded-full bg-[var(--accent)] px-2 py-0.5 text-[9px] font-semibold text-white shadow-sm">
          ★ {({ fr: "Populaire", nl: "Populair", en: "Popular", de: "Beliebt" } as Record<Language, string>)[language]}
        </span>
      )}
      <img
        src={item.image}
        alt={item.name[language]}
        loading="lazy"
        className="min-h-20 w-20 flex-shrink-0 self-stretch rounded-[10px] object-cover"
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
        <div className="mt-1.5 flex items-end justify-between gap-2">
          {item.allergens && item.allergens.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {item.allergens.map((a) => (
                <span
                  key={a}
                  className="rounded-full border border-[var(--border)] bg-[var(--surface-hover)] px-2 py-0.5 text-[9px] text-[var(--text-tertiary)]"
                >
                  {allergenLabel[a][language]}
                </span>
              ))}
            </div>
          ) : <span />}
          <span className="flex shrink-0 items-center gap-1 text-[10px] text-[var(--accent)]">
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
            </svg>
            {detailHint[language]}
          </span>
        </div>
      </div>
    </div>
  );
}
