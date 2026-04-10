"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Language } from "../types";

gsap.registerPlugin(ScrollTrigger);

const t = {
  subtitle: { fr: "Restaurant & Bar à Tapas", nl: "Restaurant & Tapas Bar", en: "Restaurant & Tapas Bar", de: "Restaurant & Tapas Bar" },
  scroll: { fr: "Défiler", nl: "Scroll", en: "Scroll", de: "Scrollen" },
};

interface KosmosSiteHeroProps {
  language: Language;
}

export default function KosmosSiteHero({ language }: KosmosSiteHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;
    const overlay = overlayRef.current;
    const content = contentRef.current;
    if (!container || !image || !overlay || !content) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Zoom the image
    tl.fromTo(
      image,
      { scale: 1 },
      { scale: 1.4, ease: "none" },
      0
    );

    // Fade in cream overlay
    tl.fromTo(
      overlay,
      { opacity: 0 },
      { opacity: 1, ease: "none" },
      0.3
    );

    // Fade out content
    tl.fromTo(
      content,
      { opacity: 1, y: 0 },
      { opacity: 0, y: -40, ease: "none" },
      0
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-[200vh]">
      {/* Fixed visual layer */}
      <div className="fixed inset-0 z-0">
        {/* Background image */}
        <div
          ref={imageRef}
          className="h-full w-full will-change-transform"
          style={{
            backgroundImage:
              "url('https://primary.jwwb.nl/public/l/t/s/temp-jwqgqkdwmrnrolcreinv/sero6u/restaurant-kosmos-ieper-1.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Cream overlay that fades in */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-[#faf9f6] opacity-0"
        />

        {/* Centered content */}
        <div
          ref={contentRef}
          className="absolute inset-0 flex flex-col items-center justify-center"
        >
          <img
            src="https://primary.jwwb.nl/public/l/t/s/temp-jwqgqkdwmrnrolcreinv/fnojkc/kosmos-gold-resized.png"
            alt="Kosmos Ieper"
            className="mb-6 h-16 drop-shadow-lg"
          />
          <p
            className="mb-8 text-center text-lg tracking-[0.2em] uppercase text-white/80 md:text-xl"
            style={{ textShadow: "0 1px 10px rgba(0,0,0,0.3)" }}
          >
            {t.subtitle[language]}
          </p>
          <div className="flex flex-col items-center gap-2 text-white/60">
            <span className="text-xs tracking-[0.15em] uppercase">{t.scroll[language]}</span>
            <svg
              className="h-5 w-5 animate-bounce"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
