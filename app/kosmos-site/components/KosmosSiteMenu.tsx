"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Language } from "../types";

gsap.registerPlugin(ScrollTrigger);

const t = {
  heading: { fr: "Notre Carte", nl: "Onze Kaart", en: "Our Menu", de: "Unsere Karte" },
  subtitle: { fr: "Une sélection de nos favoris", nl: "Een selectie van onze favorieten", en: "A selection of our favorites", de: "Eine Auswahl unserer Favoriten" },
  cta: { fr: "Voir la carte complète", nl: "Bekijk de volledige kaart", en: "View the full menu", de: "Vollständige Karte ansehen" },
  patatasDesc: { fr: "Pommes de terre croustillantes, sauce brava, aïoli", nl: "Krokante aardappelen, brava saus, aioli", en: "Crispy potatoes, brava sauce, aioli", de: "Knusprige Kartoffeln, Brava-Sauce, Aioli" },
  gambasDesc: { fr: "Crevettes, ail, piment, huile d'olive", nl: "Garnalen, knoflook, chili, olijfolie", en: "Shrimp, garlic, chili, olive oil", de: "Garnelen, Knoblauch, Chili, Olivenöl" },
  risottoDesc: { fr: "Arborio crémeux, huile de truffe, parmesan", nl: "Romige arborio, truffelolie, parmezaan", en: "Creamy arborio, truffle oil, parmesan", de: "Cremiger Arborio, Trüffelöl, Parmesan" },
  espressoDesc: { fr: "Vodka, liqueur de café, espresso frais", nl: "Wodka, koffielikeur, verse espresso", en: "Vodka, coffee liqueur, fresh espresso", de: "Wodka, Kaffeelikör, frischer Espresso" },
};

interface KosmosSiteMenuProps {
  language: Language;
}

export default function KosmosSiteMenu({ language }: KosmosSiteMenuProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const highlights = [
    { name: "Patatas Bravas", desc: t.patatasDesc[language], price: "€8.50", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=300&h=300&fit=crop&crop=center" },
    { name: "Gambas al Ajillo", desc: t.gambasDesc[language], price: "€12.50", image: "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?w=300&h=300&fit=crop&crop=center" },
    { name: "Risotto à la Truffe", desc: t.risottoDesc[language], price: "€19.00", image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=300&h=300&fit=crop&crop=center" },
    { name: "Espresso Martini", desc: t.espressoDesc[language], price: "€12.00", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=300&h=300&fit=crop&crop=center" },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(card,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: card, start: "top 85%" },
          delay: i * 0.1,
        }
      );
    });

    return () => { ScrollTrigger.getAll().forEach((st) => st.kill()); };
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#faf9f6] px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <h2 className="mb-3 font-[family-name:var(--font-playfair)] text-4xl font-bold text-[#1a1a1a] md:text-5xl">
            {t.heading[language]}
          </h2>
          <div className="mx-auto mb-4 h-[2px] w-16 bg-[#d4af37]" />
          <p className="text-[#1a1a1a]/60">{t.subtitle[language]}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {highlights.map((item, i) => (
            <div
              key={item.name}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="group overflow-hidden rounded-2xl bg-white opacity-0 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-[family-name:var(--font-playfair)] text-sm font-semibold text-[#1a1a1a]">
                  {item.name}
                </h3>
                <p className="mt-1 text-xs text-[#1a1a1a]/50">{item.desc}</p>
                <p className="mt-2 text-sm font-bold text-[#d4af37]">{item.price}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="/kosmos"
            className="inline-flex items-center gap-2 rounded-full border-2 border-[#d4af37] px-8 py-3 text-sm font-semibold text-[#d4af37] transition-colors hover:bg-[#d4af37] hover:text-white"
          >
            {t.cta[language]}
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
