"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      "TERRA nous accompagne depuis 15 ans. Leurs semences sont parfaitement adaptées à nos sols calcaires.",
    name: "Jean-Pierre Dubois",
    farm: "Ferme du Grand Chêne",
    region: "Beauce",
    direction: "left" as const,
  },
  {
    quote:
      "Le suivi technique fait toute la différence. Des conseils personnalisés et des résultats concrets sur nos rendements.",
    name: "Marie Laurent",
    farm: "EARL Les Coteaux",
    region: "Bourgogne",
    direction: "right" as const,
  },
  {
    quote:
      "Un partenaire fiable. Qualité constante, livraisons toujours dans les temps, et une équipe disponible.",
    name: "Thomas Moreau",
    farm: "Coopérative Val de Loire",
    region: "Touraine",
    direction: "left" as const,
  },
];

export default function TerraTestimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    if (!section || !bg) return;

    // Parallax background
    gsap.to(bg, {
      yPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    // Cards slide in
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      const direction = testimonials[i].direction;
      gsap.fromTo(
        card,
        {
          opacity: 0,
          x: direction === "left" ? -120 : 120,
          rotateY: direction === "left" ? -15 : 15,
        },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "top 50%",
            scrub: 1,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden py-32"
    >
      {/* Parallax background */}
      <div
        ref={bgRef}
        className="absolute inset-0 -top-[20%] h-[140%] will-change-transform"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1500076656116-558758c991c1?w=1920&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#1a472a]/60" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <h2 className="mb-4 text-center font-[family-name:var(--font-playfair)] text-5xl font-bold text-[#f5f0e8] md:text-6xl">
          Ils nous font confiance
        </h2>
        <div className="mx-auto mb-20 h-[2px] w-24 bg-[#c8a96e]" />

        <div className="flex flex-col gap-12">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="rounded-xl border border-white/10 bg-white/10 p-8 opacity-0 shadow-2xl backdrop-blur-md"
              style={{ perspective: "800px" }}
            >
              {/* Quote mark */}
              <span className="font-[family-name:var(--font-playfair)] text-5xl leading-none text-[#c8a96e]">
                &ldquo;
              </span>
              <p className="mb-6 text-lg leading-relaxed text-[#f5f0e8]">
                {t.quote}
              </p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[#c8a96e]/30" />
                <div>
                  <p className="font-semibold text-[#f5f0e8]">{t.name}</p>
                  <p className="text-sm text-[#f5f0e8]/60">
                    {t.farm} — {t.region}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
