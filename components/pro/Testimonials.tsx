"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { AccentText } from "@/components/ui/accent-text";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

// Same order as testimonials.reviews in the locale files
const reviewSites = [
  { logo: "/images/logo/g3jImmo.webp", url: "g3j.fr" },
  { logo: "/images/logo/plantprotect.png", url: "plantprotect.be" },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const Testimonials = () => {
  const { translations: tr } = useLanguage();
  const testimonials = tr.testimonials.reviews.map((review, i) => ({
    quote: review.quote,
    name: review.name,
    designation: review.role,
    ...reviewSites[i],
  }));

  return (
    <section className="py-20 md:py-28 bg-white" id="testimonials">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.h2
          {...fadeInUp}
          transition={{ duration: 0.6 }}
          className="font-display text-3xl md:text-5xl font-normal tracking-tight text-[#0A0A0A] mb-14 md:mb-20"
        >
          <AccentText text={tr.testimonials.title} />
        </motion.h2>

        <motion.div {...fadeInUp} transition={{ duration: 0.6, delay: 0.1 }} className="max-w-5xl mx-auto">
          <AnimatedTestimonials testimonials={testimonials} />
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
