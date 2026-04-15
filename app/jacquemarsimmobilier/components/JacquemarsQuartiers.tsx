// app/jacquemarsimmobilier/components/JacquemarsQuartiers.tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { quartiers } from "../data/quartiers";

gsap.registerPlugin(ScrollTrigger);

export default function JacquemarsQuartiers() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".quartier-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-6 bg-[var(--jqm-blanc)]">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-[var(--jqm-noir)] mb-4 text-center">
          Nos quartiers
        </h2>
        <p className="text-[var(--jqm-gris)] text-center mb-12 tracking-wide">
          Decouvrez Lille et sa metropole a travers nos quartiers de predilection
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {quartiers.map((q) => (
            <Link
              key={q.id}
              href={`/jacquemarsimmobilier/biens?quartier=${q.id}`}
              className="quartier-card group relative aspect-[3/4] overflow-hidden rounded-sm"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url('${q.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--jqm-noir)]/80 via-[var(--jqm-noir)]/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-semibold text-lg mb-1">{q.name}</h3>
                <p className="text-white/60 text-sm">{q.propertyCount} bien{q.propertyCount > 1 ? "s" : ""}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
