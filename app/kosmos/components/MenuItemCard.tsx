"use client";

import { MenuItem, Language, Allergen } from "../types";

const allergenEmoji: Record<Allergen, string> = {
  gluten: "🌾", crustaceans: "🦐", eggs: "🥚", fish: "🐟", peanuts: "🥜",
  soy: "🫘", dairy: "🥛", nuts: "🌰", celery: "🥬", mustard: "🟡",
  sesame: "⚪", sulphites: "🍷", lupin: "🌸", molluscs: "🐚",
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
              <div className="flex gap-0.5">
                {item.allergens.map((a) => (
                  <span key={a} className="text-[11px] leading-none">{allergenEmoji[a]}</span>
                ))}
              </div>
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
