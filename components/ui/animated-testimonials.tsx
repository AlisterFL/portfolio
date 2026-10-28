"use client";

// Adapted from Aceternity UI — Animated Testimonials (https://ui.aceternity.com/components/animated-testimonials)
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

export type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  logo: string;
  url?: string;
};

// Fixed tilts for the stacked cards (random values would differ between server and client renders)
const TILTS = [-6, 5, -3, 7, -5];

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = true,
  interval = 7000,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
  interval?: number;
}) => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (!autoplay || paused || reduceMotion) return;
    const timeout = setTimeout(handleNext, interval);
    return () => clearTimeout(timeout);
  }, [autoplay, paused, reduceMotion, interval, handleNext, active]);

  const isActive = (index: number) => index === active;
  const current = testimonials[active];

  return (
    <div
      className="relative grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Stacked images */}
      <div className="relative w-full aspect-[4/3]" style={{ perspective: "1000px" }}>
        <AnimatePresence>
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.logo}
              initial={{ opacity: 0, scale: 0.9, z: -100, rotate: TILTS[index % TILTS.length] }}
              animate={{
                opacity: isActive(index) ? 1 : 0.7,
                scale: isActive(index) ? 1 : 0.95,
                z: isActive(index) ? 0 : -100,
                rotate: isActive(index) ? 0 : TILTS[index % TILTS.length],
                zIndex: isActive(index) ? 40 : testimonials.length + 2 - index,
                y: isActive(index) && !reduceMotion ? [0, -60, 0] : 0,
              }}
              exit={{ opacity: 0, scale: 0.9, z: 100 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute inset-0 origin-bottom"
            >
              <div className="relative h-full w-full overflow-hidden rounded-2xl md:rounded-3xl border border-[#0A0A0A]/[0.06] bg-gradient-to-br from-[#F6F3FF] via-white to-[#FDF2F8] shadow-xl shadow-[#533AFC]/[0.08] flex items-center justify-center">
                <span
                  aria-hidden
                  className="absolute -top-6 left-5 md:left-7 font-serif italic text-[9rem] md:text-[11rem] leading-none text-[#533AFC]/10 select-none"
                >
                  &ldquo;
                </span>
                <div className="relative h-16 md:h-20 w-[55%]">
                  <Image
                    src={testimonial.logo}
                    alt={testimonial.name}
                    fill
                    sizes="240px"
                    draggable={false}
                    className="object-contain"
                  />
                </div>
                {testimonial.url && (
                  <span className="absolute bottom-3 left-3 rounded-full bg-white/90 backdrop-blur px-3 py-1 text-[11px] font-medium text-[#0A0A0A]/70 shadow-sm">
                    {testimonial.url}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Quote */}
      <div className="flex flex-col justify-between min-h-[320px]">
        <motion.div
          key={active}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <h3 className="text-xl md:text-2xl font-medium text-[#0A0A0A]">{current.name}</h3>
          <p className="text-[13px] text-[#0A0A0A]/60">{current.designation}</p>
          <p className="mt-6 md:mt-8 text-[16px] md:text-lg leading-relaxed text-[#0A0A0A]/70">
            &ldquo;
            {current.quote.split(" ").map((word, index, words) => (
              <motion.span
                key={index}
                initial={reduceMotion ? false : { filter: "blur(10px)", opacity: 0, y: 5 }}
                animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut", delay: 0.02 * index }}
                className="inline-block"
              >
                {word}
                {index < words.length - 1 && "\u00A0"}
              </motion.span>
            ))}
            &rdquo;
          </p>
        </motion.div>

        <div className="flex items-center gap-3 pt-10">
          <button
            onClick={handlePrev}
            aria-label="Avis précédent"
            className="group/button flex h-10 w-10 items-center justify-center rounded-full bg-[#0A0A0A]/[0.04] hover:bg-[#533AFC]/10 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-[#0A0A0A]/70 transition-transform duration-300 group-hover/button:rotate-12" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Avis suivant"
            className="group/button flex h-10 w-10 items-center justify-center rounded-full bg-[#0A0A0A]/[0.04] hover:bg-[#533AFC]/10 transition-colors"
          >
            <ArrowRight className="h-5 w-5 text-[#0A0A0A]/70 transition-transform duration-300 group-hover/button:-rotate-12" />
          </button>
          <div className="flex items-center gap-1.5 ml-2">
            {testimonials.map((t, i) => (
              <button
                key={t.name}
                onClick={() => setActive(i)}
                aria-label={t.name}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === active ? "w-6 bg-[#533AFC]" : "w-2 bg-[#0A0A0A]/15 hover:bg-[#0A0A0A]/25"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
