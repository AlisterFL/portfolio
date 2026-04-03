"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

import { useLanguage } from "@/context/LanguageContext";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const { language, toggleLanguage, translations: t } = useLanguage();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const navLinks = [
    { label: t.nav.services, href: "#expertise" },
    { label: t.nav.projects, href: "#avis" },
    { label: t.nav.reviews, href: "#testimonials" },
    { label: t.nav.contact, href: "#contact" },
  ];

  const showBg = isScrolled || isMenuOpen;

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-[9999] transition-all duration-300"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          background: showBg ? "rgba(255,255,255,0.95)" : "transparent",
          backdropFilter: showBg ? "blur(20px)" : "none",
          WebkitBackdropFilter: showBg ? "blur(20px)" : "none",
          borderBottom: showBg ? "1px solid rgba(0,0,0,0.05)" : "1px solid transparent",
        }}
      >
        <div className="container mx-auto px-6 md:px-12 py-4 md:py-5">
          <div className="relative flex items-center justify-between">
            {/* LOGO */}
            <Link href="/" className="select-none">
              <div className="flex flex-col leading-[0.85]">
                <span className="text-[11px] md:text-[13px] font-[900] tracking-[0.15em] uppercase text-[#0A0A0A]">
                  Alister
                </span>
                <span className="text-[11px] md:text-[13px] font-[900] tracking-[0.15em] uppercase text-[#0A0A0A]">
                  Flandrinck
                </span>
              </div>
            </Link>

            {/* DESKTOP NAV — absolute center */}
            <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#0A0A0A]/40 hover:text-[#0A0A0A] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* ACTIONS */}
            <div className="flex items-center gap-2 md:gap-3 shrink-0">
              {/* Language Toggle — desktop */}
              <div className="hidden md:flex items-center bg-gray-100 rounded-full p-1 border border-black/[0.05]">
                {(["EN", "FR"] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => toggleLanguage(lang.toLowerCase() as "en" | "fr")}
                    className={`px-3 py-1 rounded-full text-[9px] font-[900] transition-all ${
                      language === lang.toLowerCase()
                        ? "bg-white text-[#0A0A0A] shadow-sm"
                        : "text-gray-400 hover:text-[#0A0A0A]"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>

              {/* CTA Button */}
              <a
                href="#contact"
                className="bg-[#533AFC] text-white px-4 md:px-6 py-2 md:py-2.5 rounded-full flex items-center gap-2 hover:bg-[#4129d4] transition-all text-[9px] md:text-[10px] font-black tracking-widest uppercase shadow-lg shadow-[#533AFC]/20 group"
              >
                <span className="hidden sm:inline">{t.nav.cta}</span>
                <span className="sm:hidden">Contact</span>
                <div className="bg-white text-[#0A0A0A] rounded-full p-0.5 group-hover:text-[#533AFC] transition-colors">
                  <ArrowUpRight strokeWidth={3} className="w-3 h-3 md:w-3.5 md:h-3.5" />
                </div>
              </a>

              {/* Mobile Menu Toggle */}
              <button
                className="lg:hidden p-1.5 text-[#0A0A0A]"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              >
                {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* MENU MOBILE */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-black/[0.06] overflow-hidden"
            >
              <div className="container mx-auto px-6 py-6 flex flex-col gap-1">
                {/* Nav links */}
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="font-sans text-[15px] font-medium text-[#0A0A0A] py-3 border-b border-black/[0.04] last:border-0 hover:text-[#533AFC] transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}

                {/* Language toggle — mobile */}
                <div className="flex items-center gap-2 pt-4 mt-2 border-t border-black/[0.06]">
                  <span className="text-[12px] text-[#0A0A0A]/40 mr-2">Langue</span>
                  <div className="flex items-center bg-gray-100 rounded-full p-1 border border-black/[0.05]">
                    {(["EN", "FR"] as const).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => toggleLanguage(lang.toLowerCase() as "en" | "fr")}
                        className={`px-4 py-1.5 rounded-full text-[11px] font-bold transition-all ${
                          language === lang.toLowerCase()
                            ? "bg-white text-[#0A0A0A] shadow-sm"
                            : "text-gray-400"
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Backdrop overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/10 backdrop-blur-sm z-[9998] lg:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
