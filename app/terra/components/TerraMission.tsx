"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    title: "Notre Mission",
    text: "",
    image: "",
    align: "center" as const,
  },
  {
    title: "",
    text: "Depuis 1987, nous accompagnons les agriculteurs français avec des solutions adaptées à chaque terroir. Notre expertise se transmet de génération en génération.",
    image:
      "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80",
    align: "left" as const,
  },
  {
    title: "",
    text: "Des solutions respectueuses de la terre, pour une agriculture durable et performante. Chaque produit est testé et validé sur le terrain.",
    image:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80",
    align: "right" as const,
  },
];

export default function TerraMission() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const line = lineRef.current;
    const step1 = step1Ref.current;
    const step2 = step2Ref.current;
    const icons = iconsRef.current;
    if (!section || !title || !line || !step1 || !step2 || !icons) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: 1,
      },
    });

    // Phase 1: Title + golden line (0% - 25%)
    tl.fromTo(
      title,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.3 }
    );
    tl.fromTo(
      line,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.3 },
      "-=0.1"
    );

    // Phase 2: Step 1 appears from left (25% - 50%)
    tl.fromTo(
      title,
      { y: 0 },
      { y: -60, opacity: 0.3, fontSize: "1.5rem", duration: 0.3 }
    );
    tl.fromTo(
      step1,
      { opacity: 0, x: -100 },
      { opacity: 1, x: 0, duration: 0.4 },
      "-=0.2"
    );

    // Phase 3: Step 1 fades, step 2 from right (50% - 75%)
    tl.to(step1, { opacity: 0, x: 100, duration: 0.3 }, "+=0.1");
    tl.fromTo(
      step2,
      { opacity: 0, x: 100 },
      { opacity: 1, x: 0, duration: 0.4 },
      "-=0.2"
    );

    // Phase 4: Icons appear (75% - 100%)
    const iconEls = icons.querySelectorAll(".mission-icon");
    tl.fromTo(
      iconEls,
      { opacity: 0, y: 30, scale: 0.5 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.3,
        stagger: 0.1,
        ease: "back.out(2)",
      },
      "-=0.1"
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen items-center justify-center overflow-hidden bg-[#1a472a]"
      style={{
        backgroundImage:
          "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22 opacity=%220.03%22/%3E%3C/svg%3E')",
      }}
    >
      <div className="relative z-10 mx-auto flex h-full w-full max-w-5xl flex-col items-center justify-center px-6">
        {/* Title */}
        <h2
          ref={titleRef}
          className="mb-4 font-[family-name:var(--font-playfair)] text-5xl font-bold text-[#f5f0e8] opacity-0 md:text-6xl"
        >
          Notre Mission
        </h2>
        <div
          ref={lineRef}
          className="mb-12 h-[2px] w-24 origin-center scale-x-0 bg-[#c8a96e]"
        />

        {/* Step 1 */}
        <div
          ref={step1Ref}
          className="absolute flex w-full max-w-4xl items-center gap-10 px-6 opacity-0"
        >
          <div className="flex-1">
            <img
              src={steps[1].image}
              alt="Mains tenant de la terre"
              className="h-64 w-full rounded-lg object-cover shadow-2xl"
            />
          </div>
          <div className="flex-1 text-[#f5f0e8]">
            <p className="text-lg leading-relaxed md:text-xl">{steps[1].text}</p>
          </div>
        </div>

        {/* Step 2 */}
        <div
          ref={step2Ref}
          className="absolute flex w-full max-w-4xl items-center gap-10 px-6 opacity-0"
        >
          <div className="flex-1 text-[#f5f0e8]">
            <p className="text-lg leading-relaxed md:text-xl">{steps[2].text}</p>
          </div>
          <div className="flex-1">
            <img
              src={steps[2].image}
              alt="Champ vert"
              className="h-64 w-full rounded-lg object-cover shadow-2xl"
            />
          </div>
        </div>

        {/* Icons */}
        <div
          ref={iconsRef}
          className="absolute bottom-20 flex gap-12"
        >
          <div className="mission-icon flex flex-col items-center gap-2 text-[#c8a96e] opacity-0">
            <svg className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path d="M12 22c0-8-6-10-6-16a6 6 0 0 1 12 0c0 6-6 8-6 16Z" />
            </svg>
            <span className="text-sm text-[#f5f0e8]/70">Semences</span>
          </div>
          <div className="mission-icon flex flex-col items-center gap-2 text-[#c8a96e] opacity-0">
            <svg className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66L12 14l4-4 3-3" />
              <path d="M14 6l3-3 3 3-3 3" />
            </svg>
            <span className="text-sm text-[#f5f0e8]/70">Protection</span>
          </div>
          <div className="mission-icon flex flex-col items-center gap-2 text-[#c8a96e] opacity-0">
            <svg className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
            </svg>
            <span className="text-sm text-[#f5f0e8]/70">Nutrition</span>
          </div>
        </div>
      </div>
    </section>
  );
}
