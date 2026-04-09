"use client";

import { Language } from "../types";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  language: Language;
}

const placeholders: Record<Language, string> = {
  fr: "Rechercher un plat...",
  nl: "Zoek een gerecht...",
  en: "Search a dish...",
  de: "Gericht suchen...",
};

export default function SearchBar({ value, onChange, language }: SearchBarProps) {
  return (
    <div className="relative mx-4 mt-3">
      {/* Search icon */}
      <svg
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5" />
        <line x1="10.5" y1="10.5" x2="14" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholders[language]}
        className="w-full rounded-xl border border-white/10 bg-white/[0.06] py-2 pl-9 pr-8 text-[13px] text-white placeholder-white/30 outline-none transition-colors focus:border-white/20 focus:bg-white/[0.09]"
      />

      {/* Clear button */}
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/30 transition-colors hover:text-white/60"
          aria-label="Clear search"
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
            <line x1="1" y1="1" x2="12" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="12" y1="1" x2="1" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  );
}
