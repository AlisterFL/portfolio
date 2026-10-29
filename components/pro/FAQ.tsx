"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { AccentText } from "@/components/ui/accent-text";

const FAQItem = ({
  faq,
}: {
  faq: { question: string; answer: string };
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true, margin: "0px 0px 15% 0px" }}
      className={`border border-[#0A0A0A]/[0.06] rounded-2xl transition-all duration-300 ${
        isOpen
          ? "bg-white shadow-md shadow-[#533AFC]/[0.04] border-[#533AFC]/15"
          : "bg-white hover:border-[#0A0A0A]/[0.1]"
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full px-6 py-5 flex justify-between items-center text-left gap-4"
      >
        <span
          className={`text-[15px] md:text-[16px] font-medium transition-colors duration-300 ${
            isOpen ? "text-[#533AFC]" : "text-[#0A0A0A]"
          }`}
        >
          {faq.question}
        </span>
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
            isOpen
              ? "bg-[#533AFC] text-white"
              : "bg-[#0A0A0A]/[0.04] text-[#0A0A0A]/60"
          }`}
        >
          {isOpen ? <Minus size={15} /> : <Plus size={15} />}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-[#0A0A0A]/60 text-[15px] leading-relaxed">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  const { translations: t } = useLanguage();
  return (
    <section className="py-20 md:py-28 bg-white" id="faq">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px 15% 0px" }}
            transition={{ duration: 0.35 }}
            className="text-center mb-14"
          >
            <h2 className="font-display text-3xl md:text-5xl font-normal tracking-tight text-[#0A0A0A] mb-4">
              <AccentText text={t.faq.title} />
            </h2>
            <p className="text-[#0A0A0A]/60 text-[16px]">
              {t.faq.subtitle}
            </p>
          </motion.div>

          {/* Questions */}
          <div className="space-y-3">
            {t.faq.questions.map((faq: { question: string; answer: string }, index: number) => (
              <FAQItem key={index} faq={faq} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
