"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";


const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const Testimonials = () => {
  const { translations: tr } = useLanguage();
  return (
    <section className="py-20 md:py-28 bg-white" id="testimonials">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.h2
          {...fadeInUp}
          transition={{ duration: 0.6 }}
          className="font-display text-3xl md:text-5xl font-normal tracking-tight text-[#0A0A0A] mb-14"
        >
          {tr.testimonials.title}
        </motion.h2>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {tr.testimonials.reviews.map((t: { name: string; role: string; quote: string }, i: number) => (
            <motion.div
              key={t.name}
              {...fadeInUp}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-[#FCFCFD] border border-[#0A0A0A]/[0.06] rounded-2xl p-6 md:p-8 flex flex-col justify-between hover:border-[#533AFC]/15 hover:shadow-md hover:shadow-[#533AFC]/[0.04] transition-all duration-300"
            >
              {/* Quote */}
              <p className="text-[15px] text-[#0A0A0A]/55 leading-relaxed mb-8">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-5 border-t border-[#0A0A0A]/[0.04]">
                <div className="w-10 h-10 rounded-full bg-[#533AFC]/[0.08] flex items-center justify-center">
                  <span className="text-[14px] font-semibold text-[#533AFC]">
                    {t.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-[14px] font-medium text-[#0A0A0A]">
                    {t.name}
                  </p>
                  <p className="text-[12px] text-[#0A0A0A]/35">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
