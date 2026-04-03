"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Safari } from "@/components/ui/safari";
import { useLanguage } from "@/context/LanguageContext";

const clients = [
  {
    name: "G3J Immobilier",
    logo: "/images/logo/g3jImmo.webp",
    url: "https://g3j.fr/",
    key: "g3j" as const,
    screenshots: [
      "/images/portfolio/G3JImmo/HomePage.png",
      "/images/portfolio/G3JImmo/AdsPage.png",
      "/images/portfolio/G3JImmo/AdPage.png",
    ],
  },
  {
    name: "Noé Immobilier",
    logo: "/images/logo/NoeImmobilier.webp",
    url: "https://noe-immobilier.fr/",
    key: "noe" as const,
    screenshots: [
      "/images/portfolio/NoeImmo/HomePage.png",
      "/images/portfolio/NoeImmo/ToSellPage.png",
      "/images/portfolio/NoeImmo/ToProposePage.png",
    ],
  },
  {
    name: "Plant Protect",
    logo: "/images/logo/plantprotect.png",
    url: "https://plantprotect.be/",
    key: "plant" as const,
    screenshots: [
      "/images/portfolio/PlantProtect/HomePage.png",
      "/images/portfolio/PlantProtect/ProjectPage.png",
      "/images/portfolio/PlantProtect/MembersPage.png",
    ],
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const TrustedBy = () => {
  const { translations: t } = useLanguage();
  const [active, setActive] = useState(0);
  const [imgIndex, setImgIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const scrollToTab = useCallback((index: number) => {
    const tab = tabRefs.current[index];
    const container = tabsRef.current;
    if (tab && container) {
      // Use scrollLeft on the container instead of scrollIntoView to avoid page scroll
      const tabLeft = tab.offsetLeft;
      const tabWidth = tab.offsetWidth;
      const containerWidth = container.offsetWidth;
      const scrollTarget = tabLeft - (containerWidth / 2) + (tabWidth / 2);
      container.scrollTo({ left: scrollTarget, behavior: "smooth" });
    }
  }, []);

  const startTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActive((prev) => {
        const next = (prev + 1) % clients.length;
        scrollToTab(next);
        return next;
      });
      setImgIndex(0);
    }, 5000);
  }, [scrollToTab]);

  useEffect(() => {
    if (!isPaused) startTimer();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, startTimer]);

  const handleSelect = (i: number) => {
    setActive(i);
    setImgIndex(0);
    scrollToTab(i);
    startTimer();
  };

  const prevImg = () => {
    setImgIndex((prev) =>
      prev === 0 ? clients[active].screenshots.length - 1 : prev - 1
    );
  };

  const nextImg = () => {
    setImgIndex((prev) =>
      prev === clients[active].screenshots.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section className="relative py-20 md:py-28 overflow-hidden" id="avis">
      <div className="absolute inset-0 bg-[#F6F3FF]" />
      <div
        className="absolute top-0 right-0 w-[60%] h-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 70% 40%, rgba(83,58,252,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <motion.h2
            {...fadeInUp}
            transition={{ duration: 0.6 }}
            className="font-display text-3xl md:text-5xl font-normal tracking-tight text-[#0A0A0A]"
          >
            {t.trusted.title}
          </motion.h2>
          <motion.p
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[#0A0A0A]/40 text-[15px] max-w-xs"
          >
            {t.trusted.subtitle}
          </motion.p>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-5 lg:gap-6">
          {/* Left: Tabs — stretch to match right */}
          <div ref={tabsRef} className="lg:col-span-4 flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-none">
            {clients.map((client, i) => (
              <motion.button
                key={client.name}
                ref={(el) => { tabRefs.current[i] = el; }}
                {...fadeInUp}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                onClick={() => handleSelect(i)}
                className={`group relative min-w-[220px] lg:min-w-0 w-full lg:flex-1 text-left p-5 rounded-2xl border overflow-hidden transition-all duration-400 ${
                  active === i
                    ? "bg-white border-[#533AFC]/20 shadow-md shadow-[#533AFC]/[0.04]"
                    : "bg-white/60 border-[#0A0A0A]/[0.04] hover:bg-white hover:border-[#0A0A0A]/[0.08]"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <Image
                      src={client.logo}
                      alt={client.name}
                      width={120}
                      height={40}
                      className={`h-8 w-auto object-contain object-left mb-3 transition-opacity duration-300 ${
                        active === i ? "opacity-100" : "opacity-40"
                      }`}
                    />
                    <p
                      className={`text-[13px] leading-relaxed transition-colors duration-300 ${
                        active === i
                          ? "text-[#0A0A0A]/50"
                          : "text-[#0A0A0A]/25"
                      }`}
                    >
                      {t.trusted.clients[client.key]}
                    </p>
                  </div>
                  <a
                    href={client.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                      active === i
                        ? "bg-[#533AFC] hover:bg-[#4129d4] hover:scale-110"
                        : "bg-[#0A0A0A]/[0.04] hover:bg-[#0A0A0A]/[0.08]"
                    }`}
                  >
                    <ArrowUpRight
                      size={15}
                      className={`transition-all duration-300 ${
                        active === i
                          ? "text-white group-hover:rotate-45"
                          : "text-[#0A0A0A]/25"
                      }`}
                    />
                  </a>
                </div>

                {/* Timer bar — bottom */}
                {active === i && !isPaused && (
                  <motion.div
                    key={`timer-${i}`}
                    className="absolute bottom-0 left-0 h-[2px] bg-[#533AFC]"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 5, ease: "linear" }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Right: Screenshot carousel */}
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-8"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="relative rounded-2xl overflow-hidden bg-white border border-[#0A0A0A]/[0.04] p-3 md:p-5 shadow-md shadow-[#533AFC]/[0.03] h-full flex flex-col">
              {/* Safari with screenshot */}
              <div className="flex-1 relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${active}-${imgIndex}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Safari
                      url={clients[active].url.replace("https://", "")}
                      imageSrc={clients[active].screenshots[imgIndex]}
                      mode="simple"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation arrows + dots */}
              <div className="flex items-center justify-between mt-4">
                <button
                  onClick={prevImg}
                  className="w-8 h-8 rounded-full bg-[#0A0A0A]/[0.04] hover:bg-[#533AFC]/10 flex items-center justify-center transition-colors"
                >
                  <ChevronLeft size={16} className="text-[#0A0A0A]/50" />
                </button>

                {/* Dots */}
                <div className="flex items-center gap-2">
                  {clients[active].screenshots.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setImgIndex(i)}
                      className={`rounded-full transition-all duration-300 ${
                        imgIndex === i
                          ? "w-6 h-2 bg-[#533AFC]"
                          : "w-2 h-2 bg-[#0A0A0A]/10 hover:bg-[#0A0A0A]/20"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextImg}
                  className="w-8 h-8 rounded-full bg-[#0A0A0A]/[0.04] hover:bg-[#533AFC]/10 flex items-center justify-center transition-colors"
                >
                  <ChevronRight size={16} className="text-[#0A0A0A]/50" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
