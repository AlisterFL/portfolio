"use client";

import { Language } from "../types";

interface KosmosSiteHeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

const languages: Language[] = ["fr", "nl", "en", "de"];

export default function KosmosSiteHeader({ language, onLanguageChange }: KosmosSiteHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4">
      <img
        src="https://primary.jwwb.nl/public/l/t/s/temp-jwqgqkdwmrnrolcreinv/fnojkc/kosmos-gold-resized.png"
        alt="Kosmos"
        className="h-8 drop-shadow-md"
      />
      <div className="flex gap-1 rounded-full bg-black/20 px-1 py-1 backdrop-blur-sm">
        {languages.map((lang) => (
          <button
            key={lang}
            onClick={() => onLanguageChange(lang)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              lang === language
                ? "bg-white/90 text-[#1a1a1a]"
                : "text-white/70 hover:text-white"
            }`}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>
    </header>
  );
}
