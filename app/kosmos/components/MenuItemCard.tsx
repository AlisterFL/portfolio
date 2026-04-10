"use client";

import { MenuItem, Language } from "../types";

const detailHint: Record<Language, string> = {
  fr: "Voir détails",
  nl: "Bekijk details",
  en: "View details",
  de: "Details ansehen",
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
        <p className="mt-1.5 flex items-center gap-1 text-[10px] text-[var(--accent)]">
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
          </svg>
          {detailHint[language]}
        </p>
      </div>
    </div>
  );
}
