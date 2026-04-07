"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: "semences",
    title: "Semences & Graines",
    description:
      "Variétés sélectionnées pour chaque terroir. Blé, maïs, tournesol, colza — des semences certifiées pour des rendements optimaux.",
    cta: "Découvrir nos semences",
    svg: (
      <svg viewBox="0 0 100 100" className="h-full w-full" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path
          className="svg-draw"
          d="M50 90 C50 90 50 60 50 50 C50 40 40 30 30 25 C35 35 40 45 50 50 C50 50 50 60 50 90Z"
          stroke="#4a7c59"
          strokeWidth={2}
        />
        <path
          className="svg-draw"
          d="M50 90 C50 90 50 60 50 50 C50 40 60 30 70 25 C65 35 60 45 50 50"
          stroke="#4a7c59"
          strokeWidth={2}
        />
        <circle className="svg-draw" cx="50" cy="85" r="4" stroke="#c8a96e" strokeWidth={2} />
      </svg>
    ),
  },
  {
    id: "protection",
    title: "Protection des Cultures",
    description:
      "Herbicides, fongicides et insecticides de dernière génération. Des solutions efficaces et responsables pour protéger vos cultures.",
    cta: "Explorer nos solutions",
    svg: (
      <svg viewBox="0 0 100 100" className="h-full w-full" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path
          className="svg-draw"
          d="M50 15 L65 35 L65 65 C65 80 50 90 50 90 C50 90 35 80 35 65 L35 35 Z"
          stroke="#4a7c59"
          strokeWidth={2}
        />
        <path
          className="svg-draw"
          d="M50 40 L50 70 M40 55 L60 55"
          stroke="#c8a96e"
          strokeWidth={2}
        />
      </svg>
    ),
  },
  {
    id: "engrais",
    title: "Engrais & Nutrition",
    description:
      "Nutrition des sols sur-mesure. Azote, phosphore, potassium — des formules adaptées à chaque phase de croissance.",
    cta: "Voir nos engrais",
    svg: (
      <svg viewBox="0 0 100 100" className="h-full w-full" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <circle className="svg-draw" cx="50" cy="50" r="8" stroke="#c8a96e" strokeWidth={2} />
        <circle className="svg-draw" cx="30" cy="35" r="5" stroke="#4a7c59" strokeWidth={2} />
        <circle className="svg-draw" cx="70" cy="35" r="5" stroke="#4a7c59" strokeWidth={2} />
        <circle className="svg-draw" cx="30" cy="65" r="5" stroke="#4a7c59" strokeWidth={2} />
        <circle className="svg-draw" cx="70" cy="65" r="5" stroke="#4a7c59" strokeWidth={2} />
        <line className="svg-draw" x1="50" y1="42" x2="35" y2="38" stroke="#4a7c59" strokeWidth={1.5} />
        <line className="svg-draw" x1="50" y1="42" x2="65" y2="38" stroke="#4a7c59" strokeWidth={1.5} />
        <line className="svg-draw" x1="50" y1="58" x2="35" y2="62" stroke="#4a7c59" strokeWidth={1.5} />
        <line className="svg-draw" x1="50" y1="58" x2="65" y2="62" stroke="#4a7c59" strokeWidth={1.5} />
      </svg>
    ),
  },
];

export default function TerraProducts() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const triggers: ScrollTrigger[] = [];

    cardsRef.current.forEach((card) => {
      if (!card) return;

      // SVG stroke animation
      const paths = card.querySelectorAll<SVGElement>(".svg-draw");
      paths.forEach((path) => {
        if (path instanceof SVGGeometryElement) {
          const length = path.getTotalLength();
          gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length,
          });
        }
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          end: "top 30%",
          scrub: 1,
          onEnter: () => triggers.push(tl.scrollTrigger!),
        },
      });

      // Card reveal
      tl.fromTo(
        card,
        { opacity: 0, y: 60, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power2.out" }
      );

      // SVG draw
      tl.to(
        paths,
        {
          strokeDashoffset: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.inOut",
        },
        "-=0.3"
      );
    });

    // 3D tilt hover effect
    const handleMouseMove = (e: MouseEvent, card: HTMLDivElement) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(card, {
        rotateY: x * 10,
        rotateX: -y * 10,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = (card: HTMLDivElement) => {
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    const listeners: Array<{ card: HTMLDivElement; move: (e: MouseEvent) => void; leave: () => void }> = [];

    cardsRef.current.forEach((card) => {
      if (!card) return;
      const move = (e: MouseEvent) => handleMouseMove(e, card);
      const leave = () => handleMouseLeave(card);
      card.addEventListener("mousemove", move);
      card.addEventListener("mouseleave", leave);
      listeners.push({ card, move, leave });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      listeners.forEach(({ card, move, leave }) => {
        card.removeEventListener("mousemove", move);
        card.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#f5f0e8] px-6 py-32">
      <div className="mx-auto max-w-5xl">
        {/* Section title */}
        <div className="mb-20 text-center">
          <h2 className="mb-4 font-[family-name:var(--font-playfair)] text-5xl font-bold text-[#1a472a] md:text-6xl">
            Nos Solutions
          </h2>
          <div className="mx-auto h-[2px] w-24 bg-[#c8a96e]" />
        </div>

        {/* Product cards */}
        <div className="flex flex-col gap-20">
          {products.map((product, i) => (
            <div
              key={product.id}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="flex items-center gap-12 opacity-0"
              style={{ perspective: "1000px" }}
            >
              {/* SVG icon */}
              <div
                className={`h-40 w-40 flex-shrink-0 ${
                  i % 2 === 1 ? "order-2" : ""
                }`}
              >
                {product.svg}
              </div>

              {/* Text content */}
              <div className={i % 2 === 1 ? "order-1" : ""}>
                <h3 className="mb-3 font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#1a472a]">
                  {product.title}
                </h3>
                <p className="mb-6 text-lg leading-relaxed text-[#2c1810]/80">
                  {product.description}
                </p>
                <button className="rounded-full bg-[#c8a96e] px-6 py-3 text-sm font-semibold tracking-wide text-[#2c1810] transition-all hover:bg-[#b8964e] hover:shadow-lg">
                  {product.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
