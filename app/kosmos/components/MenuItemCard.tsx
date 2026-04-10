"use client";

import { MenuItem, Language } from "../types";

interface MenuItemCardProps {
  item: MenuItem;
  language: Language;
  onClick: () => void;
}

const tagIcons: Record<string, { tooltip: Record<Language, string>; icon: React.ReactNode; color: string }> = {
  vegetarian: {
    tooltip: { fr: "Végétarien", nl: "Vegetarisch", en: "Vegetarian", de: "Vegetarisch" },
    icon: <span className="text-[13px] leading-none">🌿</span>,
    color: "text-green-600",
  },
  vegan: {
    tooltip: { fr: "Végan", nl: "Veganistisch", en: "Vegan", de: "Vegan" },
    icon: <span className="text-[13px] leading-none">🌱</span>,
    color: "text-green-600",
  },
  spicy: {
    tooltip: { fr: "Épicé", nl: "Pikant", en: "Spicy", de: "Scharf" },
    icon: <span className="text-[13px] leading-none">🌶️</span>,
    color: "text-orange-500",
  },
  popular: {
    tooltip: { fr: "Populaire", nl: "Populair", en: "Popular", de: "Beliebt" },
    icon: <span className="text-[13px] leading-none">⭐</span>,
    color: "text-[var(--accent)]",
  },
  new: {
    tooltip: { fr: "Nouveau", nl: "Nieuw", en: "New", de: "Neu" },
    icon: <span className="text-[10px] font-bold leading-none tracking-tight text-blue-500 uppercase">new</span>,
    color: "text-blue-500",
  },
};

export default function MenuItemCard({ item, language, onClick }: MenuItemCardProps) {
  const tags = item.tags?.filter((t) => tagIcons[t]) ?? [];
  const hasInfo = tags.length > 0 || item.nutrition;

  return (
    <div
      onClick={onClick}
      className="flex cursor-pointer gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 transition hover:bg-[var(--surface-hover)]"
    >
      {/* Image with tag icons overlaid */}
      <div className="relative h-20 w-20 flex-shrink-0">
        <img
          src={item.image}
          alt={item.name[language]}
          loading="lazy"
          className="h-full w-full rounded-[10px] object-cover"
        />
        {tags.length > 0 && (
          <div className="absolute -right-1 -top-1 flex flex-col gap-0.5">
            {tags.map((tag) => (
              <span
                key={tag}
                title={tagIcons[tag].tooltip[language]}
                className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--bg)] shadow-sm ring-1 ring-[var(--border)]"
              >
                {tagIcons[tag].icon}
              </span>
            ))}
          </div>
        )}
      </div>
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
        {hasInfo && (
          <div className="mt-1.5 flex items-center justify-end gap-2">
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
