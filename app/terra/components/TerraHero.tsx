"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TerraHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLHeadingElement>(null);
  const sloganRef = useRef<HTMLParagraphElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const overlay = overlayRef.current;
    const logo = logoRef.current;
    const slogan = sloganRef.current;
    const arrow = arrowRef.current;
    if (!section || !image || !overlay || !logo || !slogan || !arrow) return;

    // Intro animation (on load, not scroll-based)
    const introTl = gsap.timeline();

    // Image dezoom
    introTl.fromTo(
      image,
      { scale: 1.15 },
      { scale: 1, duration: 2.5, ease: "power2.out" }
    );

    // Logo reveal letter by letter
    const letters = logo.querySelectorAll("span");
    introTl.fromTo(
      letters,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power3.out" },
      "-=1.8"
    );

    // Slogan slide up
    introTl.fromTo(
      slogan,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.6"
    );

    // Arrow fade in
    introTl.fromTo(
      arrow,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
      "-=0.3"
    );

    // Scroll-based animations
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Parallax image up
    scrollTl.to(image, { yPercent: -30, ease: "none" }, 0);

    // Overlay intensify
    scrollTl.fromTo(
      overlay,
      { opacity: 0 },
      { opacity: 0.8, ease: "none" },
      0
    );

    // Fade out content
    scrollTl.to(
      [logo, slogan, arrow],
      { opacity: 0, y: -30, ease: "none" },
      0
    );

    return () => {
      introTl.kill();
      scrollTl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const logoText = "TERRA";

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Background image */}
      <div
        ref={imageRef}
        className="absolute inset-0 will-change-transform"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Green overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-[#1a472a] opacity-0"
      />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-white">
        <h1
          ref={logoRef}
          className="mb-4 font-[family-name:var(--font-playfair)] text-7xl font-bold tracking-tight md:text-9xl"
          style={{ textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}
        >
          {logoText.split("").map((letter, i) => (
            <span key={i} className="inline-block">
              {letter}
            </span>
          ))}
        </h1>
        <p
          ref={sloganRef}
          className="text-lg tracking-[0.3em] uppercase md:text-xl"
          style={{ textShadow: "0 1px 10px rgba(0,0,0,0.3)" }}
        >
          Enracinés dans l&apos;excellence
        </p>
      </div>

      {/* Scroll arrow */}
      <div
        ref={arrowRef}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-white/70">
          <span className="text-xs tracking-[0.2em] uppercase">Découvrir</span>
          <svg
            className="h-6 w-6 animate-bounce"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
