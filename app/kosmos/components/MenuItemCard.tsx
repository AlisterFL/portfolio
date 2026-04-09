"use client";

import { MenuItem, Language } from "../types";

interface MenuItemCardProps {
  item: MenuItem;
  language: Language;
  onClick: () => void;
}

const tagDisplay: Record<string, { label: Record<Language, string>; color: string }> = {
  vegetarian: { label: { fr: "Vege", nl: "Veg", en: "Veggie", de: "Veg" }, color: "bg-green-900/50 text-green-400" },
  vegan: { label: { fr: "Vegan", nl: "Vegan", en: "Vegan", de: "Vegan" }, color: "bg-green-900/50 text-green-400" },
  spicy: { label: { fr: "Epice", nl: "Pikant", en: "Spicy", de: "Scharf" }, color: "bg-orange-900/50 text-orange-400" },
  popular: { label: { fr: "Populaire", nl: "Populair", en: "Popular", de: "Beliebt" }, color: "bg-[#d4af37]/20 text-[#d4af37]" },
  new: { label: { fr: "Nouveau", nl: "Nieuw", en: "New", de: "Neu" }, color: "bg-blue-900/50 text-blue-400" },
};

export default function MenuItemCard({ item, language, onClick }: MenuItemCardProps) {
  const tags = item.tags?.filter((t) => tagDisplay[t]) ?? [];
  const allergenCount = item.allergens?.length ?? 0;

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
          <div className="flex items-center gap-1.5">
            <span className="whitespace-nowrap text-[15px] font-bold text-[var(--accent)]">
              &euro;{item.price.toFixed(2)}
            </span>
            <svg className="h-3.5 w-3.5 flex-shrink-0 text-[var(--text-tertiary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
        <p className="mt-1 text-xs leading-relaxed text-[var(--text-secondary)]">
          {item.description[language]}
        </p>
        {(tags.length > 0 || item.nutrition || allergenCount > 0) && (
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${tagDisplay[tag].color}`}
              >
                {tagDisplay[tag].label[language]}
              </span>
            ))}
            {item.nutrition && (
              <span className="text-[10px] text-[var(--text-tertiary)]">
                {item.nutrition.calories} kcal
              </span>
            )}
            {allergenCount > 0 && (
              <span className="text-[10px] text-[var(--text-tertiary)]">
                {allergenCount} allergene{allergenCount > 1 ? "s" : ""}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
