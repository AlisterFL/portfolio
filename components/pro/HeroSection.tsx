"use client";

import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import Image from "next/image";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

const ease = [0.16, 1, 0.3, 1] as const;

/* ─── Photo with mouse parallax ─── */
const PhotoParallax = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const x = useSpring(useTransform(mouseX, [0, 1], [-6, 6]), { stiffness: 150, damping: 20 });
  const y = useSpring(useTransform(mouseY, [0, 1], [0, 8]), { stiffness: 150, damping: 20 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 1.2, ease }}
      className="hidden lg:flex flex-1 items-end justify-center h-full relative lg:w-1/2"
    >
      <motion.div style={{ x, y }} className="relative z-10 h-[88%] flex items-end">
        <Image
          src="/images/alisterface1.png"
          alt="Alister Flandrinck"
          width={700}
          height={900}
          className="h-full w-auto object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
          priority
        />
      </motion.div>
    </motion.div>
  );
};

/* ─── Clients marquee ─── */
const clients = [
  { name: "G3J Immobilier", logo: "/images/logo/g3jImmo.webp" },
  { name: "Noé Immobilier", logo: "/images/logo/NoeImmobilier.webp" },
  { name: "Plant Protect", logo: "/images/logo/plantprotect.png" },
];

const ClientsMarquee = () => {
  const items = [...clients, ...clients, ...clients, ...clients, ...clients];
  return (
    <div className="flex overflow-hidden items-center">
      <motion.div
        className="flex shrink-0 items-center"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      >
        {[0, 1].map((set) => (
          <div
            key={set}
            className="flex shrink-0 items-center gap-20 md:gap-28 pr-20 md:pr-28"
          >
            {items.map((client, i) => (
              <div
                key={`${set}-${i}`}
                className="shrink-0 opacity-70 hover:opacity-100 transition-opacity duration-300"
              >
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={120}
                  height={40}
                  className="h-8 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

/* ─── Mouse-following spotlight ─── */
const Spotlight = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.parentElement?.getBoundingClientRect();
      if (!rect) return;
      ref.current.style.left = `${e.clientX - rect.left - 200}px`;
      ref.current.style.top = `${e.clientY - rect.top - 200}px`;
      ref.current.style.opacity = "1";
    };
    const handleLeave = () => {
      if (ref.current) ref.current.style.opacity = "0";
    };
    const parent = ref.current?.parentElement;
    parent?.addEventListener("mousemove", handleMove);
    parent?.addEventListener("mouseleave", handleLeave);
    return () => {
      parent?.removeEventListener("mousemove", handleMove);
      parent?.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute w-[400px] h-[400px] rounded-full opacity-0 transition-opacity duration-500 z-0"
      style={{
        background:
          "radial-gradient(circle, rgba(83,58,252,0.06) 0%, transparent 70%)",
      }}
    />
  );
};

const HeroSection = () => {
  const { translations: t } = useLanguage();
  return (
    <section className="relative h-screen w-full flex flex-col overflow-hidden">
      {/* ─── Background: white left, colorful right ─── */}
      <div className="absolute inset-0 z-0 bg-white" />
      {/* Colorful diagonal — right side */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: "linear-gradient(135deg, rgba(83,58,252,0.1) 0%, rgba(236,72,153,0.08) 40%, rgba(59,130,246,0.07) 70%, rgba(83,58,252,0.05) 100%)",
          clipPath: "polygon(65% 0, 100% 0, 100% 100%, 45% 100%)",
        }}
      />
      {/* Animated grid on the colored area */}
      <div
        className="absolute inset-0 pointer-events-none z-[1] overflow-hidden"
        style={{
          clipPath: "polygon(65% 0, 100% 0, 100% 100%, 45% 100%)",
        }}
      >
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.1}
          duration={3}
          repeatDelay={1}
          className={cn(
            "fill-[#533AFC]/15 stroke-[#533AFC]/[0.03]",
            "absolute inset-0 h-full w-full skew-y-6"
          )}
        />
      </div>

      <Spotlight />

      {/* ─── Main content ─── */}
      <div className="flex-1 min-h-0 relative z-10">
        <div className="container mx-auto px-6 md:px-12 h-full">
          <div className="h-full flex flex-col lg:flex-row items-center gap-8 lg:gap-4 pt-24 lg:pt-0">
            {/* ─── LEFT ─── */}
            <div className="flex-1 flex flex-col justify-center max-w-xl lg:max-w-none lg:w-1/2 py-8 lg:pl-8 xl:pl-16">
              {/* Badge */}
              <motion.a
                href="#avis"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease }}
                className="group inline-flex items-center gap-2 bg-[#533AFC]/[0.05] hover:bg-[#533AFC]/[0.08] border border-[#533AFC]/[0.1] rounded-full pl-1.5 pr-3 py-1 w-fit mb-8 transition-colors cursor-pointer"
              >
                <span className="bg-[#533AFC] text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {t.hero.badge}
                </span>
                <span className="text-[12px] text-[#533AFC]/70 group-hover:text-[#533AFC] transition-colors">
                  {t.hero.badgeText}
                </span>
                <ChevronRight
                  size={12}
                  className="text-[#533AFC]/40 group-hover:text-[#533AFC] group-hover:translate-x-0.5 transition-all"
                />
              </motion.a>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease }}
                className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-semibold tracking-tight leading-[1.08] text-[#0A0A0A] mb-6"
              >
                {t.hero.title1}
                <br />
                {t.hero.title2}{" "}
                <span className="text-[#533AFC]">{t.hero.titleHighlight}</span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease }}
                className="text-[#0A0A0A]/45 text-lg leading-relaxed max-w-md mb-10"
              >
                {t.hero.description}
                <br />
                {t.hero.description2}
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <a href="#contact" className="group bg-[#533AFC] text-white px-6 py-3.5 rounded-xl flex items-center justify-center gap-2.5 hover:bg-[#4129d4] transition-all text-[15px] font-medium shadow-[0_1px_24px_-6px_rgba(83,58,252,0.4)]">
                  {t.hero.cta}
                  <ArrowUpRight
                    size={18}
                    strokeWidth={2}
                    className="group-hover:rotate-45 transition-transform"
                  />
                </a>
                <a href="#avis" className="px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 text-[15px] font-medium text-[#0A0A0A]/60 border border-[#0A0A0A]/[0.08] hover:border-[#0A0A0A]/[0.15] hover:text-[#0A0A0A] bg-white transition-all">
                  {t.hero.ctaSecondary}
                </a>
              </motion.div>
            </div>

            {/* ─── RIGHT: Photo composition ─── */}
            <PhotoParallax />
          </div>
        </div>
      </div>

      {/* ─── Bottom: Clients marquee ─── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="relative z-30 shrink-0 bg-white"
      >
        <div className="h-[1px] bg-[#0A0A0A]/[0.06]" />
        <div className="px-6 md:px-12 py-5">
          <ClientsMarquee />
        </div>
        <div className="h-[1px] bg-[#0A0A0A]/[0.06]" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
