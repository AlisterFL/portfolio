"use client";

import { useState, useRef, useEffect } from "react";
import { Language } from "../types";

interface KosmosSiteHeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

const languages: Language[] = ["fr", "nl", "en", "de"];

const languageNames: Record<Language, string> = {
  fr: "Français",
  nl: "Nederlands",
  en: "English",
  de: "Deutsch",
};

const navLinks: { href: string; label: Record<Language, string> }[] = [
  { href: "/kosmos/menu", label: { fr: "Menu", nl: "Menu", en: "Menu", de: "Speisekarte" } },
  { href: "/kosmos/photos", label: { fr: "Photos", nl: "Foto's", en: "Photos", de: "Fotos" } },
  { href: "/kosmos/gift-card", label: { fr: "Carte Cadeau", nl: "Cadeaubon", en: "Gift Card", de: "Geschenkkarte" } },
  { href: "/kosmos#contact", label: { fr: "Contact", nl: "Contact", en: "Contact", de: "Kontakt" } },
];

const reserveLabel: Record<Language, string> = {
  fr: "Réserver",
  nl: "Reserveren",
  en: "Book",
  de: "Reservieren",
};

export default function KosmosSiteHeader({ language, onLanguageChange }: KosmosSiteHeaderProps) {
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-20 border-b border-[#1a1a1a]/5 bg-white/90 px-6 py-3 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        {/* Logo */}
        <a href="/kosmos">
          <img
            src="https://primary.jwwb.nl/public/l/t/s/temp-jwqgqkdwmrnrolcreinv/fnojkc/kosmos-gold-resized.png"
            alt="Kosmos"
            className="h-7"
          />
        </a>

        {/* Center nav */}
        <nav className="flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-medium tracking-[0.1em] uppercase text-[#1a1a1a]/60 transition-colors hover:text-[#d4af37]"
            >
              {link.label[language]}
            </a>
          ))}
        </nav>

        {/* Right: language dropdown + reserve button */}
        <div className="flex items-center gap-4">
          {/* Language dropdown */}
          <div ref={langRef} className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 text-xs text-[#1a1a1a]/50 transition-colors hover:text-[#1a1a1a]"
            >
              {language.toUpperCase()}
              <svg className={`h-3 w-3 transition-transform ${langOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 overflow-hidden rounded-lg border border-[#1a1a1a]/10 bg-white shadow-lg">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      onLanguageChange(lang);
                      setLangOpen(false);
                    }}
                    className={`block w-full px-5 py-2.5 text-left text-xs transition-colors hover:bg-[#faf9f6] ${
                      lang === language
                        ? "font-medium text-[#d4af37]"
                        : "text-[#1a1a1a]/60"
                    }`}
                  >
                    {languageNames[lang]}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Reserve button */}
          <a
            href="/kosmos/reservation"
            className="rounded-full bg-[#d4af37] px-5 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#c4a030]"
          >
            {reserveLabel[language]}
          </a>
        </div>
      </div>
    </header>
  );
}
