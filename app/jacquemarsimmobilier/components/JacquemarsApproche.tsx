// app/jacquemarsimmobilier/components/JacquemarsApproche.tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    title: "Proximite",
    description: "Nous connaissons chaque rue, chaque quartier. Notre ancrage lillois est notre force.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    title: "Reactivite",
    description: "Votre temps est precieux. Nous nous engageons a vous repondre sous 24h.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: "Professionnalisme",
    description: "Une estimation juste, un accompagnement complet, du premier contact a la signature.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
];

export default function JacquemarsApproche() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".value-item",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".approche-image",
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-6 bg-[var(--jqm-cream)]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Text side */}
        <div>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-[var(--jqm-noir)] mb-8">
            Notre approche
          </h2>

          <div className="space-y-8 mb-10">
            {values.map((v) => (
              <div key={v.title} className="value-item flex gap-4">
                <div className="text-[var(--jqm-burgundy)] flex-shrink-0 mt-1">{v.icon}</div>
                <div>
                  <h3 className="font-semibold text-[var(--jqm-noir)] mb-1">{v.title}</h3>
                  <p className="text-[var(--jqm-gris)] text-sm leading-relaxed">{v.description}</p>
                </div>
              </div>
            ))}
          </div>

          <blockquote className="border-l-2 border-[var(--jqm-gold)] pl-6 italic text-[var(--jqm-gris)]">
            &ldquo;Plus qu&apos;une agence, nous sommes Laurent et Remi, veritables artisans du marche immobilier lillois.&rdquo;
          </blockquote>
        </div>

        {/* Image side */}
        <div className="approche-image relative aspect-[4/5] rounded-sm overflow-hidden">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80')",
            }}
          />
          <div className="absolute inset-0 bg-[var(--jqm-burgundy)]/10" />
        </div>
      </div>
    </section>
  );
}
