"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const FAQItem = ({
  faq,
  index,
}: {
  faq: { question: string; answer: string };
  index: number;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      viewport={{ once: true }}
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
              : "bg-[#0A0A0A]/[0.04] text-[#0A0A0A]/40"
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
            <p className="px-6 pb-5 text-[#0A0A0A]/45 text-[15px] leading-relaxed">
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="font-display text-3xl md:text-5xl font-normal tracking-tight text-[#0A0A0A] mb-4">
              {t.faq.title}
            </h2>
            <p className="text-[#0A0A0A]/40 text-[16px]">
              {t.faq.subtitle}
            </p>
          </motion.div>

          {/* Questions */}
          <div className="space-y-3">
            {t.faq.questions.map((faq: { question: string; answer: string }, index: number) => (
              <FAQItem key={index} faq={faq} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
