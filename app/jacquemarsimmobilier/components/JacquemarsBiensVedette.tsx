// app/jacquemarsimmobilier/components/JacquemarsBiensVedette.tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { properties } from "../data/properties";
import PropertyCard from "./PropertyCard";

gsap.registerPlugin(ScrollTrigger);

export default function JacquemarsBiensVedette() {
  const sectionRef = useRef<HTMLElement>(null);

  const featured = properties.filter((p) => p.isFeatured).slice(0, 4);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".featured-card",
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
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
          Nos biens d&apos;exception
        </h2>
        <p className="text-[var(--jqm-gris)] text-center mb-12 tracking-wide">
          Une selection de nos plus belles opportunites
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((property) => (
            <div key={property.id} className="featured-card">
              <PropertyCard property={property} />
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/jacquemarsimmobilier/biens"
            className="inline-flex items-center gap-2 text-[var(--jqm-burgundy)] hover:text-[var(--jqm-burgundy-light)] transition-colors tracking-wide group"
          >
            Voir tous nos biens
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-1">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
