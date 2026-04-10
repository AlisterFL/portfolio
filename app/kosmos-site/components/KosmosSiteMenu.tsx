"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  { name: "Patatas Bravas", desc: "Krokante aardappelen, brava saus, aioli", price: "€8.50", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=300&h=300&fit=crop&crop=center" },
  { name: "Gambas al Ajillo", desc: "Garnalen, knoflook, chili, olijfolie", price: "€12.50", image: "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?w=300&h=300&fit=crop&crop=center" },
  { name: "Risotto à la Truffe", desc: "Romige arborio, truffelolie, parmezaan", price: "€19.00", image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=300&h=300&fit=crop&crop=center" },
  { name: "Espresso Martini", desc: "Wodka, koffielikeur, verse espresso", price: "€12.00", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=300&h=300&fit=crop&crop=center" },
];

export default function KosmosSiteMenu() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

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

    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#faf9f6] px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <h2 className="mb-3 font-[family-name:var(--font-playfair)] text-4xl font-bold text-[#1a1a1a] md:text-5xl">
            Onze Kaart
          </h2>
          <div className="mx-auto mb-4 h-[2px] w-16 bg-[#d4af37]" />
          <p className="text-[#1a1a1a]/60">Een selectie van onze favorieten</p>
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
            Bekijk de volledige kaart
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
