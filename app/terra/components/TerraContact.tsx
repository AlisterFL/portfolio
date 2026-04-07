"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TerraContact() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const form = formRef.current;
    const logo = logoRef.current;
    if (!section || !title || !form || !logo) return;

    // Title reveal
    const letters = title.querySelectorAll("span");
    gsap.fromTo(
      letters,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.03,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
        },
      }
    );

    // Form slide up
    gsap.fromTo(
      form,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
        },
      }
    );

    // Background logo parallax
    gsap.to(logo, {
      yPercent: -15,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const titleText = "Cultivons l'avenir ensemble";

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#1a472a] px-6 py-32"
    >
      {/* Background logo */}
      <div
        ref={logoRef}
        className="pointer-events-none absolute inset-0 flex items-center justify-center will-change-transform"
      >
        <span className="select-none font-[family-name:var(--font-playfair)] text-[20rem] font-bold text-[#f5f0e8]/[0.03]">
          T
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-xl text-center">
        <h2
          ref={titleRef}
          className="mb-4 font-[family-name:var(--font-playfair)] text-4xl font-bold text-[#f5f0e8] md:text-5xl"
        >
          {titleText.split("").map((char, i) => (
            <span key={i} className="inline-block">
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h2>
        <div className="mx-auto mb-12 h-[2px] w-24 bg-[#c8a96e]" />

        <form
          ref={formRef}
          className="flex flex-col gap-4 opacity-0"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            placeholder="Votre nom"
            className="rounded-lg border border-[#f5f0e8]/20 bg-[#f5f0e8]/10 px-5 py-3 text-[#f5f0e8] placeholder-[#f5f0e8]/40 outline-none transition-colors focus:border-[#c8a96e]/50"
          />
          <input
            type="email"
            placeholder="Votre email"
            className="rounded-lg border border-[#f5f0e8]/20 bg-[#f5f0e8]/10 px-5 py-3 text-[#f5f0e8] placeholder-[#f5f0e8]/40 outline-none transition-colors focus:border-[#c8a96e]/50"
          />
          <textarea
            placeholder="Votre message"
            rows={4}
            className="resize-none rounded-lg border border-[#f5f0e8]/20 bg-[#f5f0e8]/10 px-5 py-3 text-[#f5f0e8] placeholder-[#f5f0e8]/40 outline-none transition-colors focus:border-[#c8a96e]/50"
          />
          <button
            type="submit"
            className="mt-2 rounded-full bg-[#c8a96e] px-8 py-3 font-semibold text-[#2c1810] transition-all hover:bg-[#b8964e] hover:shadow-lg hover:shadow-[#c8a96e]/20"
          >
            Envoyer
          </button>
        </form>
      </div>
    </section>
  );
}
