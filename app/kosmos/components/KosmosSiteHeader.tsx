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

const closeLabel: Record<Language, string> = {
  fr: "Fermer",
  nl: "Sluiten",
  en: "Close",
  de: "Schließen",
};

export default function KosmosSiteHeader({ language, onLanguageChange }: KosmosSiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 60);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-30 px-6 py-3 transition-all duration-300 ${
          scrolled
            ? "border-b border-[#1a1a1a]/5 bg-white/95 shadow-sm backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          {/* Logo */}
          <a href="/kosmos" className="relative z-40">
            <img
              src="https://primary.jwwb.nl/public/l/t/s/temp-jwqgqkdwmrnrolcreinv/fnojkc/kosmos-gold-resized.png"
              alt="Kosmos"
              className="h-7"
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-xs font-medium tracking-[0.1em] uppercase transition-colors hover:text-[#d4af37] ${
                  scrolled ? "text-[#1a1a1a]/60" : "text-white/80"
                }`}
              >
                {link.label[language]}
              </a>
            ))}
          </nav>

          {/* Desktop right */}
          <div className="hidden items-center gap-4 md:flex">
            {/* Language dropdown */}
            <div ref={langRef} className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className={`flex items-center gap-1.5 text-xs transition-colors ${
                  scrolled
                    ? "text-[#1a1a1a]/50 hover:text-[#1a1a1a]"
                    : "text-white/60 hover:text-white"
                }`}
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

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative z-40 flex h-9 w-9 items-center justify-center md:hidden"
            aria-label="Menu"
          >
            <div className="flex w-5 flex-col gap-[5px]">
              <span
                className={`block h-[1.5px] w-full transition-all duration-300 ${
                  mobileOpen
                    ? "translate-y-[6.5px] rotate-45 bg-[#1a1a1a]"
                    : scrolled ? "bg-[#1a1a1a]" : "bg-white"
                }`}
              />
              <span
                className={`block h-[1.5px] w-full transition-all duration-300 ${
                  mobileOpen
                    ? "opacity-0"
                    : scrolled ? "bg-[#1a1a1a]" : "bg-white"
                }`}
              />
              <span
                className={`block h-[1.5px] w-full transition-all duration-300 ${
                  mobileOpen
                    ? "-translate-y-[6.5px] -rotate-45 bg-[#1a1a1a]"
                    : scrolled ? "bg-[#1a1a1a]" : "bg-white"
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-30 transition-all duration-300 md:hidden ${
          mobileOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />

        {/* Drawer panel */}
        <div
          className={`absolute right-0 top-0 h-full w-72 bg-white shadow-2xl transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col pt-20 px-6">
            {/* Nav links */}
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm font-medium text-[#1a1a1a]/70 transition-colors hover:bg-[#faf9f6] hover:text-[#d4af37]"
                >
                  {link.label[language]}
                </a>
              ))}
            </nav>

            {/* Divider */}
            <div className="my-4 h-px bg-[#1a1a1a]/10" />

            {/* Reserve button */}
            <a
              href="/kosmos/reservation"
              onClick={() => setMobileOpen(false)}
              className="rounded-full bg-[#d4af37] py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#c4a030]"
            >
              {reserveLabel[language]}
            </a>

            {/* Divider */}
            <div className="my-4 h-px bg-[#1a1a1a]/10" />

            {/* Language selector */}
            <div className="flex flex-col gap-1">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    onLanguageChange(lang);
                  }}
                  className={`rounded-lg px-4 py-2.5 text-left text-sm transition-colors hover:bg-[#faf9f6] ${
                    lang === language
                      ? "font-medium text-[#d4af37]"
                      : "text-[#1a1a1a]/50"
                  }`}
                >
                  {languageNames[lang]}
                </button>
              ))}
            </div>

            {/* Social links */}
            <div className="mt-6 flex gap-4 px-4">
              <a href="https://www.instagram.com/kosmosieper/" target="_blank" rel="noopener noreferrer" className="text-[#1a1a1a]/30 transition-colors hover:text-[#d4af37]">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a href="https://www.facebook.com/kosmosieper" target="_blank" rel="noopener noreferrer" className="text-[#1a1a1a]/30 transition-colors hover:text-[#d4af37]">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
