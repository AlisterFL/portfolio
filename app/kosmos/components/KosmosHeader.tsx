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

export default function KosmosHeader({ language, onLanguageChange, theme, onThemeToggle }: KosmosHeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
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
  );
}
