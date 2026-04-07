"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 35, suffix: "+", label: "années d'expertise" },
  { value: 12000, suffix: "", label: "agriculteurs partenaires", format: true },
  { value: 850000, suffix: " ha", label: "de cultures accompagnées", format: true },
  { value: 98, suffix: "%", label: "taux de satisfaction" },
];

function formatNumber(n: number): string {
  return n.toLocaleString("fr-FR");
}

export default function TerraStats() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const circleRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=200%",
        pin: true,
        scrub: 1,
      },
    });

    stats.forEach((stat, i) => {
      const statEl = statsRef.current[i];
      const numberEl = numberRefs.current[i];
      const circleEl = circleRefs.current[i];
      if (!statEl || !numberEl || !circleEl) return;

      const offset = i * 0.2;

      // Circle expand
      tl.fromTo(
        circleEl,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.2, ease: "power2.out" },
        offset
      );

      // Stat container fade in
      tl.fromTo(
        statEl,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.15 },
        offset + 0.05
      );

      // Counter animation
      const counter = { val: 0 };
      tl.to(
        counter,
        {
          val: stat.value,
          duration: 0.25,
          ease: "power2.out",
          onUpdate: () => {
            const rounded = Math.round(counter.val);
            numberEl.textContent =
              (stat.format ? formatNumber(rounded) : String(rounded)) +
              stat.suffix;
          },
        },
        offset + 0.05
      );
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Split background */}
      <div className="absolute inset-0 flex">
        <div
          className="w-1/2"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1560493676-04071c5f467b?w=1920&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="w-1/2 bg-[#1a472a]" />
      </div>

      {/* Overlay on image side */}
      <div className="absolute left-0 top-0 h-full w-1/2 bg-[#1a472a]/30" />

      {/* Stats grid */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="grid grid-cols-2 gap-x-24 gap-y-16">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              ref={(el) => { statsRef.current[i] = el; }}
              className="relative flex flex-col items-center text-center opacity-0"
            >
              {/* Background circle */}
              <div
                ref={(el) => { circleRefs.current[i] = el; }}
                className="absolute -z-10 h-32 w-32 rounded-full bg-[#c8a96e]/20 opacity-0"
              />
              <span
                ref={(el) => { numberRefs.current[i] = el; }}
                className="font-[family-name:var(--font-playfair)] text-5xl font-bold text-[#f5f0e8] md:text-6xl"
              >
                0
              </span>
              <span className="mt-2 text-sm tracking-[0.15em] uppercase text-[#f5f0e8]/70">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
