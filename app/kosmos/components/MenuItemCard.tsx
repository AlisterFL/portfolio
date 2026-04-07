"use client";

import { MenuItem, Language } from "../types";

interface MenuItemCardProps {
  item: MenuItem;
  language: Language;
}

export default function MenuItemCard({ item, language }: MenuItemCardProps) {
  return (
    <div className="flex gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] p-3">
      <img
        src={item.image}
        alt={item.name[language]}
        loading="lazy"
        className="h-20 w-20 flex-shrink-0 rounded-[10px] object-cover"
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-[15px] font-semibold text-white">{item.name[language]}</h3>
          <span className="whitespace-nowrap text-[15px] font-bold text-[#d4af37]">
            €{item.price.toFixed(2)}
          </span>
        </div>
        <p className="mt-1 text-xs leading-relaxed text-white/50">
          {item.description[language]}
        </p>
      </div>
    </div>
  );
}
