"use client";

import { Language, Theme } from "../types";
import LanguageDropdown from "./LanguageDropdown";
import ThemeToggle from "./ThemeToggle";

interface KosmosHeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  theme: Theme;
  onThemeToggle: () => void;
}

const languages: Language[] = ["fr", "nl", "en", "de"];

const navLinks: { href: string; label: Record<Language, string> }[] = [
  { href: "/kosmos", label: { fr: "Accueil", nl: "Home", en: "Home", de: "Startseite" } },
  { href: "/kosmos/menu", label: { fr: "Menu", nl: "Menu", en: "Menu", de: "Speisekarte" } },
  { href: "/kosmos/photos", label: { fr: "Photos", nl: "Foto's", en: "Photos", de: "Fotos" } },
];

export default function KosmosHeader({ language, onLanguageChange, theme, onThemeToggle }: KosmosHeaderProps) {
  return (
    <>
      {/* Mobile / Tablet header */}
      <header className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4 lg:hidden">
        <a href="/kosmos" className="flex items-center gap-2">
          <svg className="h-4 w-4 text-[var(--text-tertiary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <img
            src="https://primary.jwwb.nl/public/l/t/s/temp-jwqgqkdwmrnrolcreinv/fnojkc/kosmos-gold-resized.png"
            alt="Kosmos Ieper"
            className="h-9"
          />
        </a>
        <div className="flex items-center gap-2">
          <ThemeToggle theme={theme} onToggle={onThemeToggle} />
          <LanguageDropdown language={language} onLanguageChange={onLanguageChange} />
        </div>
      </header>

      {/* Desktop header */}
      <header className="hidden border-b border-[var(--border)] px-6 py-3 lg:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          {/* Logo */}
          <a href="/kosmos">
            <img
              src="https://primary.jwwb.nl/public/l/t/s/temp-jwqgqkdwmrnrolcreinv/fnojkc/kosmos-gold-resized.png"
              alt="Kosmos Ieper"
              className="h-8"
            />
          </a>

          {/* Right: theme + socials + language */}
          <div className="flex items-center gap-3">
            <ThemeToggle theme={theme} onToggle={onThemeToggle} />

            <div className="h-4 w-px bg-[var(--border)]" />

            <a href="https://www.instagram.com/kosmosieper/" target="_blank" rel="noopener noreferrer" className="text-[var(--text-tertiary)] transition-colors hover:text-[var(--accent)]">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            <a href="https://www.facebook.com/kosmosieper" target="_blank" rel="noopener noreferrer" className="text-[var(--text-tertiary)] transition-colors hover:text-[var(--accent)]">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>

            <div className="h-4 w-px bg-[var(--border)]" />

            <div className="flex gap-0.5">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => onLanguageChange(lang)}
                  className={`rounded px-2 py-1 text-[10px] font-medium transition-colors ${
                    lang === language
                      ? "text-[var(--accent)]"
                      : "text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]"
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
