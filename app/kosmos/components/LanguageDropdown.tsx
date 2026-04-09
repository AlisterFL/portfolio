"use client";

import { useState, useRef, useEffect } from "react";
import { Language } from "../types";

const languageLabels: Record<Language, string> = {
  fr: "FR",
  nl: "NL",
  en: "EN",
  de: "DE",
};

interface LanguageDropdownProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export default function LanguageDropdown({ language, onLanguageChange }: LanguageDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 rounded-md border border-[var(--border-accent)] px-3 py-1.5 text-xs font-medium text-[var(--accent)] transition-colors"
      >
        {languageLabels[language]}
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className={`transition-transform ${open ? "rotate-180" : ""}`}>
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 z-50 overflow-hidden rounded-md border border-[var(--border)] bg-[var(--bg-secondary)] shadow-lg">
          {(Object.keys(languageLabels) as Language[]).map((lang) => (
            <button
              key={lang}
              onClick={() => {
                onLanguageChange(lang);
                setOpen(false);
              }}
              className={`block w-full px-4 py-2 text-left text-xs transition-colors hover:bg-[var(--surface)] ${
                lang === language ? "text-[var(--accent)]" : "text-[var(--text-secondary)]"
              }`}
            >
              {languageLabels[lang]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
