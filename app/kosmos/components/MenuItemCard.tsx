"use client";

import { MenuItem, Language } from "../types";

interface MenuItemCardProps {
  item: MenuItem;
  language: Language;
  onClick: () => void;
}

const tagIcons: Record<string, { label: Record<Language, string>; icon: React.ReactNode; color: string }> = {
  vegetarian: {
    label: { fr: "Végé", nl: "Veg", en: "Veggie", de: "Veg" },
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 22c1.25-1.25 2.5-3 3.5-5.5C7 13 8 10.5 12 7c-3.5 4-6 5-8.5 6.5C1 14.5 0 16 0 16" />
        <path d="M22 2L15 9" />
        <path d="M15 2C15 2 12 5 9 9" />
        <path d="M22 9C22 9 19 6 15 9" />
      </svg>
    ),
    color: "text-green-600",
  },
  vegan: {
    label: { fr: "Végan", nl: "Vegan", en: "Vegan", de: "Vegan" },
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22c4-4 8-10 8-16H4c0 6 4 12 8 16Z" />
        <path d="M12 10v6" />
        <path d="M9 13h6" />
      </svg>
    ),
    color: "text-green-600",
  },
  spicy: {
    label: { fr: "Épicé", nl: "Pikant", en: "Spicy", de: "Scharf" },
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2c0 4-4 6-4 10a4 4 0 0 0 8 0c0-4-4-6-4-10Z" />
        <path d="M12 18v4" />
      </svg>
    ),
    color: "text-orange-500",
  },
  popular: {
    label: { fr: "Populaire", nl: "Populair", en: "Popular", de: "Beliebt" },
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    color: "text-[var(--accent)]",
  },
  new: {
    label: { fr: "Nouveau", nl: "Nieuw", en: "New", de: "Neu" },
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5v14M5 12h14" />
      </svg>
    ),
    color: "text-blue-500",
  },
};

export default function MenuItemCard({ item, language, onClick }: MenuItemCardProps) {
  const tags = item.tags?.filter((t) => tagIcons[t]) ?? [];
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
                className={`flex items-center gap-1 text-[10px] font-medium ${tagIcons[tag].color}`}
                title={tagIcons[tag].label[language]}
              >
                {tagIcons[tag].icon}
                {tagIcons[tag].label[language]}
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
