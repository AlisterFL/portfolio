"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const photos = [
  {
    src: "https://primary.jwwb.nl/public/l/t/s/temp-jwqgqkdwmrnrolcreinv/restaurant-kosmos-ieper-5.png",
    alt: "Restaurant Kosmos Ieper sfeer",
    spanRows: true,
  },
  {
    src: "https://primary.jwwb.nl/public/l/t/s/temp-jwqgqkdwmrnrolcreinv/restaurant-kosmos-ieper-3.png",
    alt: "Restaurant Kosmos Ieper interieur",
    spanRows: false,
  },
  {
    src: "https://primary.jwwb.nl/public/l/t/s/temp-jwqgqkdwmrnrolcreinv/restaurant-kosmos-ieper-4.png",
    alt: "Restaurant Kosmos Ieper gerechten",
    spanRows: false,
  },
  {
    src: "https://primary.jwwb.nl/public/l/t/s/temp-jwqgqkdwmrnrolcreinv/restaurant-kosmos-ieper-2.png",
    alt: "Restaurant Kosmos Ieper tapas",
    spanRows: false,
  },
  {
    src: "https://primary.jwwb.nl/public/l/t/s/temp-jwqgqkdwmrnrolcreinv/2021_06_17_Mediaheer_2602.jpg",
    alt: "Restaurant Kosmos Ieper bar",
    spanRows: true,
  },
  {
    src: "https://primary.jwwb.nl/public/l/t/s/temp-jwqgqkdwmrnrolcreinv/2021_06_17_Mediaheer_2557.jpg",
    alt: "Restaurant Kosmos Ieper ambiance",
    spanRows: false,
  },
];

export default function KosmosSiteGallery() {
  const headingRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const heading = headingRef.current;
    if (!heading) return;

    // Heading fade-in
    gsap.fromTo(
      heading,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: heading,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    // Staggered photo reveal
    const items = itemRefs.current.filter(Boolean) as HTMLDivElement[];
    items.forEach((item, i) => {
      gsap.fromTo(
        item,
        { opacity: 0, y: 60, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          delay: (i % 3) * 0.12,
          scrollTrigger: {
            trigger: item,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section className="bg-[#faf9f6] px-6 py-24 md:px-12 lg:px-20">
      {/* Section heading */}
      <div ref={headingRef} className="mb-16 text-center opacity-0">
        <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-[#1a1a1a] md:text-5xl">
          Sfeer
        </h2>
        <div className="mx-auto mt-4 h-[2px] w-16 bg-[#d4af37]" />
        <p className="mt-5 text-base tracking-wide text-[#1a1a1a]/60 md:text-lg">
          Geniet van de unieke sfeer in ons restaurant
        </p>
      </div>

      {/* Masonry-like grid: 2 cols mobile, 3 cols desktop */}
      <div className="kosmos-gallery mx-auto max-w-6xl grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 [grid-auto-rows:200px] md:[grid-auto-rows:240px]">
        {photos.map((photo, i) => (
          <div
            key={photo.src}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            className={[
              "relative overflow-hidden rounded-xl shadow-md opacity-0",
              photo.spanRows ? "row-span-2" : "row-span-1",
            ].join(" ")}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out hover:scale-105"
              unoptimized
            />
            {/* Subtle gold shimmer on hover */}
            <div className="pointer-events-none absolute inset-0 rounded-xl bg-[#d4af37]/0 transition-colors duration-500 hover:bg-[#d4af37]/10" />
          </div>
        ))}
      </div>
    </section>
  );
}
