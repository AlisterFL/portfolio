// app/jacquemarsimmobilier/avis/page.tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import JacquemarsNav from "../components/JacquemarsNav";
import JacquemarsFooter from "../components/JacquemarsFooter";
import { reviews } from "../data/reviews";

gsap.registerPlugin(ScrollTrigger);

export default function AvisPage() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".review-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, gridRef);
    return () => ctx.revert();
  }, []);

  const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <main className="bg-[var(--jqm-blanc)] min-h-screen">
      <JacquemarsNav />

      <div className="pt-28 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-[var(--jqm-noir)] mb-6">
              Ce que nos clients disent de nous
            </h1>
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="font-[family-name:var(--font-sora)] text-4xl font-bold text-[var(--jqm-noir)]">{avgRating}</span>
              <div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="var(--jqm-gold)" stroke="var(--jqm-gold)" strokeWidth="2">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <p className="text-[var(--jqm-gris)] text-sm">32 avis</p>
              </div>
            </div>
          </div>

          <div ref={gridRef} className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="review-card break-inside-avoid bg-white border border-[var(--jqm-cream)] rounded-sm p-6">
                <div className="text-[var(--jqm-gold)] text-3xl font-serif leading-none mb-3">&ldquo;</div>
                <p className="text-[var(--jqm-gris)] text-sm leading-relaxed mb-4">{review.text}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-[var(--jqm-noir)] text-sm">{review.name}</p>
                    <p className="text-xs text-[var(--jqm-gris)]">{review.context}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill={i < review.rating ? "var(--jqm-gold)" : "none"} stroke="var(--jqm-gold)" strokeWidth="2">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--jqm-burgundy)] text-[var(--jqm-burgundy)] rounded-sm hover:bg-[var(--jqm-burgundy)] hover:text-white transition-all duration-300"
            >
              Vous aussi, partagez votre experience
            </a>
          </div>
        </div>
      </div>

      <JacquemarsFooter />
    </main>
  );
}
