"use client";

import { useState, useEffect } from "react";
import { Language } from "../types";

interface KosmosSiteHeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

const languages: Language[] = ["fr", "nl", "en", "de"];

export default function KosmosSiteHeader({ language, onLanguageChange }: KosmosSiteHeaderProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > window.innerHeight);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-20 flex items-center justify-between border-b px-6 py-3 transition-all duration-300 ${
        visible
          ? "translate-y-0 border-[#1a1a1a]/10 bg-[#faf9f6]/95 opacity-100 backdrop-blur-md shadow-sm"
          : "-translate-y-full border-transparent bg-transparent opacity-0"
      }`}
    >
      <img
        src="https://primary.jwwb.nl/public/l/t/s/temp-jwqgqkdwmrnrolcreinv/fnojkc/kosmos-gold-resized.png"
        alt="Kosmos"
        className="h-7"
      />
      <div className="flex gap-1 rounded-full bg-[#1a1a1a]/10 px-1 py-1">
        {languages.map((lang) => (
          <button
            key={lang}
            onClick={() => onLanguageChange(lang)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              lang === language
                ? "bg-[#d4af37] text-white"
                : "text-[#1a1a1a]/50 hover:text-[#1a1a1a]"
            }`}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>
    </header>
  );
}
