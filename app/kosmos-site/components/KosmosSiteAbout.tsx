"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    label: "Verse Tapas",
    description:
      "Kwalitatieve verse tapas met Spaanse en Italiaanse specialiteiten, dagelijks bereid.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        {/* Fork & knife */}
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
        <path d="M7 2v20" />
        <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
      </svg>
    ),
  },
  {
    label: "Cocktails & Mocktails",
    description:
      "Zelf gemaakte cocktails, mocktails en onze alomgekende picon. Voor elk zijn smaak.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        {/* Cocktail glass */}
        <path d="M8 21h8" />
        <path d="M12 15v6" />
        <path d="M4 3h16l-8 12Z" />
        <path d="M15 8.5 19 3" />
      </svg>
    ),
  },
  {
    label: "Sfeer & Ambiance",
    description:
      "De place to be met trendy muziek voor jong en oud — pal op de Grote Markt van Ieper.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        {/* Music note */}
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
  },
];

export default function KosmosSiteAbout() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    const image = imageRef.current;
    const feats = featuresRef.current;
    if (!section || !text || !image || !feats) return;

    const ctx = gsap.context(() => {
      // Text block fades in from the left
      gsap.fromTo(
        text,
        { opacity: 0, x: -48 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

      // Image fades in from the right
      gsap.fromTo(
        image,
        { opacity: 0, x: 48 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

      // Feature cards stagger up
      gsap.fromTo(
        feats.children,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: feats,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#faf9f6] px-6 py-24 md:px-16 lg:px-24"
    >
      {/* Two-column main block */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
        {/* Left: text */}
        <div ref={textRef} className="opacity-0">
          {/* Section label */}
          <p className="mb-4 text-xs tracking-[0.25em] uppercase text-[#d4af37]">
            Over Kosmos
          </p>

          {/* Heading */}
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-bold leading-tight text-[#1a1a1a] md:text-5xl">
            Ooit een reisbureau,
            <br />
            nu een hippe tapastent.
          </h2>

          {/* Gold accent line */}
          <div className="mt-5 mb-8 h-px w-16 bg-[#d4af37]" />

          {/* Body copy */}
          <p className="mb-5 text-base leading-relaxed text-[#1a1a1a]/70">
            Gelegen pal op de <strong className="text-[#1a1a1a]">Grote Markt van Ieper</strong>, biedt
            Kosmos een unieke mix van Spaanse en Italiaanse smaken. Onze verse
            tapas worden dagelijks bereid met de beste ingrediënten — klein van
            formaat, groot van smaak.
          </p>
          <p className="text-base leading-relaxed text-[#1a1a1a]/70">
            Of je nu geniet van onze handgemaakte cocktails, mocktails of de
            legendarische picon — bij Kosmos ben je altijd op de juiste plek.
            Trendy muziek en een warme sfeer voor jong en oud.
          </p>
        </div>

        {/* Right: image */}
        <div ref={imageRef} className="opacity-0">
          <div className="relative overflow-hidden rounded-sm">
            {/* Gold corner accent */}
            <div className="absolute top-0 left-0 z-10 h-8 w-8 border-t-2 border-l-2 border-[#d4af37]" />
            <div className="absolute right-0 bottom-0 z-10 h-8 w-8 border-r-2 border-b-2 border-[#d4af37]" />

            <img
              src="https://primary.jwwb.nl/public/l/t/s/temp-jwqgqkdwmrnrolcreinv/2021_06_17_Mediaheer_2411.jpg"
              alt="Kosmos restaurant interieur"
              className="h-full w-full object-cover"
              style={{ aspectRatio: "4 / 3" }}
            />
          </div>
        </div>
      </div>

      {/* Feature highlights */}
      <div
        ref={featuresRef}
        className="mx-auto mt-20 grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-3"
      >
        {features.map((f) => (
          <div
            key={f.label}
            className="flex flex-col gap-4 border-t border-[#1a1a1a]/10 pt-8 opacity-0"
          >
            {/* Icon */}
            <span className="text-[#d4af37]">{f.icon}</span>

            {/* Feature heading */}
            <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-[#1a1a1a]">
              {f.label}
            </h3>

            {/* Feature description */}
            <p className="text-sm leading-relaxed text-[#1a1a1a]/60">
              {f.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
