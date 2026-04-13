"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Language } from "../types";

gsap.registerPlugin(ScrollTrigger);

const t = {
  heading: { fr: "Ce que disent nos clients", nl: "Wat onze gasten zeggen", en: "What our guests say", de: "Was unsere Gäste sagen" },
  basedOn: { fr: "Basé sur 200+ avis", nl: "Gebaseerd op 200+ beoordelingen", en: "Based on 200+ reviews", de: "Basierend auf 200+ Bewertungen" },
  onGoogle: { fr: "sur Google", nl: "op Google", en: "on Google", de: "auf Google" },
};

const reviews = [
  {
    name: "Sophie V.",
    rating: 5,
    text: "Superbe découverte ! Les tapas sont délicieux et l'ambiance est top. Le personnel est très accueillant. On reviendra c'est sûr !",
    time: { fr: "Il y a 2 semaines", nl: "2 weken geleden", en: "2 weeks ago", de: "Vor 2 Wochen" },
  },
  {
    name: "Thomas D.",
    rating: 5,
    text: "Beste tapas van Ieper! De gambas en de patatas bravas zijn een must. Gezellige sfeer op de Grote Markt.",
    time: { fr: "Il y a 1 mois", nl: "1 maand geleden", en: "1 month ago", de: "Vor 1 Monat" },
  },
  {
    name: "Emma L.",
    rating: 4,
    text: "Very nice place on the main square. The cocktails are excellent and the tapas are fresh. A bit busy on weekends but worth the wait.",
    time: { fr: "Il y a 3 semaines", nl: "3 weken geleden", en: "3 weeks ago", de: "Vor 3 Wochen" },
  },
  {
    name: "Pieter M.",
    rating: 5,
    text: "Wij komen hier regelmatig en het is altijd top! De bediening is vlot, de cocktails perfect en de tapas vers. Aanrader!",
    time: { fr: "Il y a 2 mois", nl: "2 maanden geleden", en: "2 months ago", de: "Vor 2 Monaten" },
  },
  {
    name: "Julie B.",
    rating: 5,
    text: "Un vrai coup de cœur. Le picon est légendaire et les planches de charcuterie sont généreuses. Cadre magnifique sur la place.",
    time: { fr: "Il y a 1 semaine", nl: "1 week geleden", en: "1 week ago", de: "Vor 1 Woche" },
  },
  {
    name: "Marco R.",
    rating: 4,
    text: "Great atmosphere and good food. The calamari and the bruschetta were really tasty. Nice terrace with a view on the square.",
    time: { fr: "Il y a 3 mois", nl: "3 maanden geleden", en: "3 months ago", de: "Vor 3 Monaten" },
  },
];

// Google "G" logo as inline SVG
function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

// Stars renderer — supports full and half stars
function Stars({ rating, size = "md" }: { rating: number; size?: "lg" | "md" }) {
  const sizeClass = size === "lg" ? "text-2xl" : "text-base";

  return (
    <span className={`inline-flex gap-px ${sizeClass}`} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => {
        if (i < Math.floor(rating)) {
          // Full star
          return (
            <span key={i} className="text-[#d4af37]">★</span>
          );
        }
        if (i === Math.floor(rating) && rating % 1 >= 0.5) {
          // Half star via clip trick
          return (
            <span key={i} className="relative inline-block">
              <span className="text-[#1a1a1a]/20">★</span>
              <span
                className="absolute inset-0 overflow-hidden text-[#d4af37]"
                style={{ width: "50%" }}
              >
                ★
              </span>
            </span>
          );
        }
        // Empty star
        return (
          <span key={i} className="text-[#1a1a1a]/20">★</span>
        );
      })}
    </span>
  );
}

interface KosmosSiteReviewsProps {
  language: Language;
}

export default function KosmosSiteReviews({ language }: KosmosSiteReviewsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const ratingBlockRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const ratingBlock = ratingBlockRef.current;
    const grid = gridRef.current;
    if (!section || !heading || !ratingBlock || !grid) return;

    const ctx = gsap.context(() => {
      // Heading fades in from below
      gsap.fromTo(
        heading,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

      // Rating block fades in
      gsap.fromTo(
        ratingBlock,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          delay: 0.15,
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

      // Review cards stagger in
      gsap.fromTo(
        grid.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: grid,
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
      id="reviews"
      ref={sectionRef}
      className="bg-[#faf9f6] px-6 py-24 md:px-16 lg:px-24"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section heading */}
        <div ref={headingRef} className="mb-12 text-center opacity-0">
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-[#1a1a1a] md:text-5xl">
            {t.heading[language]}
          </h2>
          {/* Gold underline */}
          <div className="mx-auto mt-5 h-[2px] w-16 bg-[#d4af37]" />
        </div>

        {/* Overall rating block */}
        <div ref={ratingBlockRef} className="mb-14 flex flex-col items-center gap-3 opacity-0">
          <div className="flex items-center gap-4">
            {/* Large score */}
            <span className="font-[family-name:var(--font-playfair)] text-6xl font-bold leading-none text-[#1a1a1a]">
              4.5
            </span>
            {/* Half-star row */}
            <div className="flex flex-col gap-1">
              <Stars rating={4.5} size="lg" />
              <p className="text-sm text-[#1a1a1a]/50">
                (200+ {language === "fr" ? "avis" : language === "nl" ? "beoordelingen" : language === "de" ? "Bewertungen" : "reviews"})
              </p>
            </div>
          </div>

          {/* "Based on … · on Google" */}
          <div className="flex items-center gap-2 text-sm text-[#1a1a1a]/50">
            <span>{t.basedOn[language]}</span>
            <span>·</span>
            <GoogleIcon />
            <span>{t.onGoogle[language]}</span>
          </div>
        </div>

        {/* Review cards grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2"
        >
          {reviews.map((review, i) => (
            <div
              key={i}
              className="rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              {/* Top row: name + Google icon */}
              <div className="mb-3 flex items-center justify-between">
                <span className="font-semibold text-[#1a1a1a]">{review.name}</span>
                <GoogleIcon />
              </div>

              {/* Stars */}
              <div className="mb-3">
                <Stars rating={review.rating} size="md" />
              </div>

              {/* Review text */}
              <p className="mb-4 text-sm leading-relaxed text-[#1a1a1a]/70">
                {review.text}
              </p>

              {/* Time ago */}
              <p className="text-xs text-[#1a1a1a]/40">{review.time[language]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
