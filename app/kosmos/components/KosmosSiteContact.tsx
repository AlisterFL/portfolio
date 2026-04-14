"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Language } from "../types";

gsap.registerPlugin(ScrollTrigger);

const t = {
  tagline: {
    fr: "Votre table vous attend",
    nl: "Uw tafel wacht op u",
    en: "Your table awaits",
    de: "Ihr Tisch wartet",
  },
  heading: {
    fr: "Réserver",
    nl: "Reserveer",
    en: "Reserve",
    de: "Reservieren",
  },
  subtitle: {
    fr: "Venez déguster vos tapas préférés sur la Grand-Place d'Ypres",
    nl: "Kom jij jouw favoriete tapas proeven op de Grote Markt van Ieper?",
    en: "Come taste your favorite tapas on Ypres' main square",
    de: "Probieren Sie Ihre Lieblingstapas am Grote Markt in Ypern",
  },
  reserveBtn: {
    fr: "Réserver une table",
    nl: "Reserveer een tafel",
    en: "Book a table",
    de: "Tisch reservieren",
  },
  callLabel: {
    fr: "Ou appelez-nous",
    nl: "Of bel ons",
    en: "Or call us",
    de: "Oder rufen Sie an",
  },
  findUs: {
    fr: "Nous trouver",
    nl: "Vind ons",
    en: "Find us",
    de: "Finden Sie uns",
  },
  hours: {
    fr: "Mardi — Dimanche",
    nl: "Dinsdag — Zondag",
    en: "Tuesday — Sunday",
    de: "Dienstag — Sonntag",
  },
  hoursTime: {
    fr: "11h — 23h",
    nl: "11:00 — 23:00",
    en: "11 AM — 11 PM",
    de: "11:00 — 23:00",
  },
  closed: {
    fr: "Fermé le lundi",
    nl: "Gesloten op maandag",
    en: "Closed on Monday",
    de: "Montags geschlossen",
  },
  followUs: {
    fr: "Suivez-nous",
    nl: "Volg ons",
    en: "Follow us",
    de: "Folgen Sie uns",
  },
  footer: {
    fr: "\u00A9 2026 Kosmos Ieper \u2014 Tous droits r\u00E9serv\u00E9s",
    nl: "\u00A9 2026 Kosmos Ieper \u2014 Alle rechten voorbehouden",
    en: "\u00A9 2026 Kosmos Ieper \u2014 All rights reserved",
    de: "\u00A9 2026 Kosmos Ieper \u2014 Alle Rechte vorbehalten",
  },
};

interface KosmosSiteContactProps {
  language: Language;
}

export default function KosmosSiteContact({ language }: KosmosSiteContactProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(
      section.querySelectorAll(".reveal"),
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 70%" },
      }
    );

    return () => { ScrollTrigger.getAll().forEach((st) => st.kill()); };
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#111] text-white"
    >
      {/* Subtle noise texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Gold accent line at top */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">

        {/* Main grid: left = CTA, right = info */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">

          {/* Left column — CTA */}
          <div>
            <p className="reveal mb-4 text-[11px] font-medium tracking-[0.3em] uppercase text-[#d4af37]">
              {t.tagline[language]}
            </p>

            <h2 className="reveal font-[family-name:var(--font-playfair)] text-5xl font-bold leading-[1.1] md:text-7xl">
              {t.heading[language]}
              <span className="text-[#d4af37]">.</span>
            </h2>

            <p className="reveal mt-6 max-w-md text-base leading-relaxed text-white/50">
              {t.subtitle[language]}
            </p>

            {/* CTA buttons */}
            <div className="reveal mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href="/kosmos/reservation"
                className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-[#d4af37] px-8 py-4 text-sm font-semibold text-[#111] transition-all hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                  {t.reserveBtn[language]}
                </span>
                <div className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full" />
              </a>

              <div className="flex items-center gap-3">
                <div className="hidden h-px w-8 bg-white/20 sm:block" />
                <div>
                  <p className="text-[10px] tracking-[0.15em] uppercase text-white/30">{t.callLabel[language]}</p>
                  <a
                    href="tel:+32480609844"
                    className="text-sm font-medium text-white/70 transition-colors hover:text-[#d4af37]"
                  >
                    +32 480 60 98 44
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right column — Info cards */}
          <div className="flex flex-col gap-6">

            {/* Address + Map card */}
            <div className="reveal overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03]">
              <div className="p-6">
                <p className="mb-1 text-[10px] font-medium tracking-[0.25em] uppercase text-[#d4af37]">
                  {t.findUs[language]}
                </p>
                <p className="text-lg font-medium text-white/90">Grote Markt 26</p>
                <p className="text-sm text-white/40">8900 Ieper, België</p>
              </div>
              <div className="h-48 w-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2519.8!2d2.8855!3d50.8514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47dcc5e0e1b1b1b1%3A0x1234567890abcdef!2sGrote%20Markt%2026%2C%208900%20Ieper!5e0!3m2!1sfr!2sbe!4v1700000000000!5m2!1sfr!2sbe"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Kosmos Ieper"
                  className="opacity-80 transition-opacity hover:opacity-100"
                />
              </div>
            </div>

            {/* Hours + Social row */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Hours card */}
              <div className="reveal rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#d4af37]/10">
                  <svg className="h-5 w-5 text-[#d4af37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-white/90">{t.hours[language]}</p>
                <p className="mt-0.5 font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#d4af37]">
                  {t.hoursTime[language]}
                </p>
                <p className="mt-2 text-xs text-white/30">{t.closed[language]}</p>
              </div>

              {/* Social card */}
              <div className="reveal rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#d4af37]/10">
                  <svg className="h-5 w-5 text-[#d4af37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                </div>
                <p className="mb-3 text-[10px] font-medium tracking-[0.25em] uppercase text-[#d4af37]">
                  {t.followUs[language]}
                </p>
                <div className="flex gap-3">
                  <a
                    href="https://www.instagram.com/kosmosieper/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all hover:border-[#d4af37]/30 hover:text-[#d4af37]"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.facebook.com/kosmosieper"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all hover:border-[#d4af37]/30 hover:text-[#d4af37]"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-white/[0.06] px-6 py-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <p className="text-[11px] text-white/20">{t.footer[language]}</p>
          <img
            src="https://primary.jwwb.nl/public/l/t/s/temp-jwqgqkdwmrnrolcreinv/fnojkc/kosmos-gold-resized.png"
            alt="Kosmos"
            className="h-5 opacity-20"
          />
        </div>
      </div>
    </section>
  );
}
