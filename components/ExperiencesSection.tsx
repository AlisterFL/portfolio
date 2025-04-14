"use client";

import React, { useEffect, useState, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";
import { OpenSansFont } from "@/lib/fonts";
import { motion } from "framer-motion";

const ExperiencesSection = () => {
  const { translations } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
          setIsVisible(true);
          if (sectionRef.current) {
            observer.unobserve(sectionRef.current);
          }
        }
      },
      {
        threshold: 0.7,
        rootMargin: '0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Variantes pour les animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section 
      ref={sectionRef}
      id="experiences"
      className={`max-w-[1300px] m-auto w-full h-auto flex flex-col justify-center pb-4 pt-14`}
    >
      <motion.div 
        className={`w-full flex justify-end text-white px-4 mb-4`}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={titleVariants}
      >
        <h1 className={`${OpenSansFont.className} font-semibold`} style={{ fontSize: "clamp(2rem, 9vw, 4rem)" }}>
          {translations.experience.toUpperCase()}
        </h1>
      </motion.div>

      <motion.div 
        className="w-full"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {translations.experiences.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-center justify-between p-4 px-4 border-b border-t border-gray-700 text-white transition-colors duration-300 hover:bg-white hover:text-black"
          >
            <div className="flex flex-col w-1/4">
              <span className="text-base font-light text-[#A6A6A6]">{exp.period}</span>
              <span className="text-xs text-[#A6A6A6]">{exp.periodTime}</span>
            </div>

            <p className="text-lg font-light w-2/5 text-start">{exp.company}</p>

            <h3 className="text-lg font-light w-2/5">{exp.title}</h3>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default ExperiencesSection;