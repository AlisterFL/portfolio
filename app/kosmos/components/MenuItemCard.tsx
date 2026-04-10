"use client";

import { MenuItem, Language } from "../types";

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
        {item.nutrition && (
          <p className="mt-1 text-[10px] text-[var(--text-tertiary)]">
            {item.nutrition.calories} kcal
          </p>
        )}
      </div>
    </div>
  );
}
