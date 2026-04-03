"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Linkedin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const Contact = () => {
  const { translations: t } = useLanguage();
  return (
    <section className="py-20 md:py-28 bg-[#F6F3FF]" id="contact">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-2xl mx-auto text-center">
          {/* Header */}
          <motion.h2
            {...fadeInUp}
            transition={{ duration: 0.6 }}
            className="font-display text-3xl md:text-5xl font-normal tracking-tight text-[#0A0A0A] mb-4"
          >
            {t.contact.title}
          </motion.h2>
          <motion.p
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[#0A0A0A]/40 text-[16px] mb-12"
          >
            {t.contact.description}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <a
              href="mailto:alisterflandrinck@gmail.com"
              className="group bg-[#533AFC] text-white px-7 py-3.5 rounded-xl flex items-center justify-center gap-3 hover:bg-[#4129d4] transition-all text-[15px] font-medium shadow-lg shadow-[#533AFC]/20"
            >
              <Mail size={18} />
              {t.contact.email}
              <ArrowUpRight
                size={16}
                strokeWidth={2.5}
                className="group-hover:rotate-45 transition-transform"
              />
            </a>
            <a
              href="https://linkedin.com/in/alisterflandrinck"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-7 py-3.5 rounded-xl flex items-center justify-center gap-3 text-[15px] font-medium text-[#0A0A0A]/60 border border-[#0A0A0A]/[0.08] hover:border-[#533AFC]/20 hover:text-[#533AFC] bg-white transition-all"
            >
              <Linkedin size={18} />
              LinkedIn
              <ArrowUpRight
                size={16}
                strokeWidth={2.5}
                className="group-hover:rotate-45 transition-transform"
              />
            </a>
          </motion.div>

          {/* Email display */}
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <a
              href="mailto:alisterflandrinck@gmail.com"
              className="text-[#0A0A0A]/25 hover:text-[#533AFC] transition-colors text-[14px]"
            >
              alisterflandrinck@gmail.com
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
