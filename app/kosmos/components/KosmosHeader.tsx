"use client";

import { Language } from "../types";
import LanguageDropdown from "./LanguageDropdown";

interface KosmosHeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export default function KosmosHeader({ language, onLanguageChange }: KosmosHeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-[#d4af37]/20 px-5 py-4">
      <img
        src="https://primary.jwwb.nl/public/l/t/s/temp-jwqgqkdwmrnrolcreinv/fnojkc/kosmos-gold-resized.png"
        alt="Kosmos Ieper"
        className="h-9"
      />
      <LanguageDropdown language={language} onLanguageChange={onLanguageChange} />
    </header>
  );
}
