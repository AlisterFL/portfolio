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
  item1Name: { fr: "Gambas", nl: "Gambas", en: "Gambas", de: "Gambas" },
  item1Desc: { fr: "6 gambas grillées, ail et herbes fraîches", nl: "6 gegrilde gambas, knoflook en verse kruiden", en: "6 grilled gambas, garlic and fresh herbs", de: "6 gegrillte Gambas, Knoblauch und frische Kräuter" },
  item2Name: { fr: "Planche Mixte", nl: "Gemengde Plank", en: "Mixed Board", de: "Gemischte Platte" },
  item2Desc: { fr: "Sélection de fromages et charcuterie fine", nl: "Selectie van kazen en fijne vleeswaren", en: "Selection of cheeses and fine charcuterie", de: "Auswahl an Käse und feiner Wurst" },
  item3Name: { fr: "Churros Chocolat", nl: "Churros Chocolade", en: "Churros Chocolate", de: "Churros Schokolade" },
  item3Desc: { fr: "Churros croustillants, sauce chocolat maison", nl: "Krokante churros, huisgemaakte chocoladesaus", en: "Crispy churros, homemade chocolate sauce", de: "Knusprige Churros, hausgemachte Schokoladensauce" },
  item4Name: { fr: "Mojito", nl: "Mojito", en: "Mojito", de: "Mojito" },
  item4Desc: { fr: "Rhum, menthe fraîche, citron vert, sucre de canne", nl: "Rum, verse munt, limoen, rietsuiker", en: "Rum, fresh mint, lime, cane sugar", de: "Rum, frische Minze, Limette, Rohrzucker" },
};

interface KosmosSiteMenuProps {
  language: Language;
}

export default function KosmosSiteMenu({ language }: KosmosSiteMenuProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const highlights = [
    { id: "gambas", name: t.item1Name[language], desc: t.item1Desc[language], price: "€25.00", image: "https://images.unsplash.com/photo-1625943553852-781c6dd46faa?w=400&h=400&fit=crop&crop=center" },
    { id: "planche", name: t.item2Name[language], desc: t.item2Desc[language], price: "€22.00", image: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=400&h=400&fit=crop&crop=center" },
    { id: "churros", name: t.item3Name[language], desc: t.item3Desc[language], price: "€11.00", image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&h=400&fit=crop&crop=center" },
    { id: "mojito", name: t.item4Name[language], desc: t.item4Desc[language], price: "€12.00", image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&h=400&fit=crop&crop=center" },
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
              key={item.id}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md"
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
            href="/kosmos/menu"
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
