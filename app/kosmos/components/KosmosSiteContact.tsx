"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Language } from "../types";

gsap.registerPlugin(ScrollTrigger);

const t = {
  heading: { fr: "Réserver", nl: "Reserveer", en: "Reserve", de: "Reservieren" },
  subtitle: {
    fr: "Venez déguster vos tapas préférés sur la Grand-Place d'Ypres",
    nl: "Kom jij jouw favoriete tapas proeven op de Grote Markt van Ieper?",
    en: "Come taste your favorite tapas on Ypres' main square",
    de: "Probieren Sie Ihre Lieblingstapas am Grote Markt in Ypern",
  },
  hours: {
    fr: "Mardi - Dimanche, 11h - 23h",
    nl: "Dinsdag - Zondag, 11:00 - 23:00",
    en: "Tuesday - Sunday, 11:00 AM - 11:00 PM",
    de: "Dienstag - Sonntag, 11:00 - 23:00",
  },
  facebook: {
    fr: "Suivez-nous sur Facebook \u2192",
    nl: "Volg ons op Facebook \u2192",
    en: "Follow us on Facebook \u2192",
    de: "Folgen Sie uns auf Facebook \u2192",
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
      section.querySelectorAll(".animate-in"),
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out",
        scrollTrigger: { trigger: section, start: "top 75%" },
      }
    );

    return () => { ScrollTrigger.getAll().forEach((st) => st.kill()); };
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="bg-[#1a1a1a] px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="animate-in mb-3 font-[family-name:var(--font-playfair)] text-4xl font-bold text-white md:text-5xl">
          {t.heading[language]}
        </h2>
        <div className="animate-in mx-auto mb-6 h-[2px] w-16 bg-[#d4af37]" />
        <p className="animate-in mb-10 text-white/60">
          {t.subtitle[language]}
        </p>

        <a
          href="tel:+32480609844"
          className="animate-in inline-flex items-center gap-3 rounded-full bg-[#d4af37] px-10 py-4 text-sm font-semibold text-[#1a1a1a] transition-colors hover:bg-[#c4a030]"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          +32 480 60 98 44
        </a>

        <div className="animate-in mt-12 flex flex-wrap justify-center gap-8 text-sm text-white/40">
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0115 0z" />
            </svg>
            Grote Markt 26, 8900 Ieper
          </div>
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {t.hours[language]}
          </div>
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            hello@kosmosieper.be
          </div>
        </div>

        <div className="animate-in mt-8">
          <a
            href="https://facebook.com/kosmosieper"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-white/30 transition-colors hover:text-[#d4af37]"
          >
            {t.facebook[language]} #kosmosieper
          </a>
        </div>
      </div>

      {/* Map */}
      <div className="animate-in mx-auto mt-16 max-w-3xl overflow-hidden rounded-xl">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2519.8!2d2.8855!3d50.8514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47dcc5e0e1b1b1b1%3A0x1234567890abcdef!2sGrote%20Markt%2026%2C%208900%20Ieper!5e0!3m2!1sfr!2sbe!4v1700000000000!5m2!1sfr!2sbe"
          width="100%"
          height="250"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Kosmos Ieper location"
          className="opacity-90 transition-opacity hover:opacity-100"
        />
      </div>

      {/* Footer */}
      <div className="mx-auto mt-16 max-w-3xl border-t border-white/10 pt-6 text-center text-xs text-white/20">
        {t.footer[language]}
      </div>
    </section>
  );
}
