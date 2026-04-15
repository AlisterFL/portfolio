"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SearchBar from "./SearchBar";

gsap.registerPlugin(ScrollTrigger);

export default function JacquemarsHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(imageRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      const titleChars = titleRef.current?.querySelectorAll(".char");
      if (titleChars) {
        gsap.fromTo(
          titleChars,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.03,
            ease: "power3.out",
            delay: 0.3,
          }
        );
      }

      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 1 }
      );

      gsap.fromTo(
        searchRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 1.2 }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const title = "L'art de l'immobilier lillois";
  const chars = title.split("");

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden flex items-center justify-center">
      <div ref={imageRef} className="absolute inset-0 -top-[20%] h-[120%]">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1564352969906-8b7f46ba4b28?w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--jqm-noir)]/70 via-[var(--jqm-noir)]/50 to-[var(--jqm-noir)]/80" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <h1
          ref={titleRef}
          className="font-[family-name:var(--font-playfair)] text-4xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight"
        >
          {chars.map((char, i) => (
            <span key={i} className="char inline-block" style={{ whiteSpace: char === " " ? "pre" : undefined }}>
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>

        <p ref={subtitleRef} className="text-lg md:text-xl text-white/70 tracking-[0.15em] uppercase mb-12">
          Achat &middot; Vente &middot; Location — Lille et sa metropole
        </p>

        <div ref={searchRef}>
          <SearchBar />
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" className="opacity-50">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  );
}
