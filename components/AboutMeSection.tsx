"use client";

import React, { useEffect, useState, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";
import { FiraCodeFont, OpenSansFont } from "../lib/fonts";
import { motion } from "framer-motion";
import Image from "next/image";

const AboutMeSection: React.FC = () => {
  const { translations } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
          setIsVisible(true);
          if (sectionRef.current) {
            observer.unobserve(sectionRef.current);
          }
        }
      },
      {
        threshold: 0.2,
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
        staggerChildren: 0.1, // Réduit le délai entre les animations des enfants
        delayChildren: 0.2,   // Réduit le délai initial
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        duration: 0.4, // Réduit la durée de l'animation
        ease: "easeOut" 
      },
    },
  };

  const titleVariants = {
    hidden: { x: -30, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { 
        duration: 0.3, // Réduit la durée de l'animation
        ease: "easeOut" 
      },
    },
  };

  const imageVariants = {
    hidden: { scale: 0.9, opacity: 0 }, // Ajuste l'échelle initiale
    visible: {
      scale: 1,
      opacity: 1,
      transition: { 
        duration: 0.5, // Réduit la durée de l'animation
        ease: "easeOut" 
      },
    },
  };

  return (
    <motion.section
      id="about"
      ref={sectionRef}
      className={`max-w-[1300px] m-auto w-full h-auto flex flex-col px-4 justify-center py-14`}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <motion.div className="flex flex-row justify-between" variants={titleVariants}>
        <p
          className={`${FiraCodeFont.className} text-white text-xs font-medium`}
        >
          ./About me ...
        </p>
      </motion.div>
      <div
        className={`w-full flex items-stretch justify-between ${OpenSansFont.className} mt-4 flex-col-reverse md:flex-row`}
      >
        <motion.div 
          className="w-full md:w-3/5 flex flex-col space-y-4 md:max-w-[550px] gap-2"
          variants={containerVariants}
        >
          <motion.p
            className={`${OpenSansFont.className} text-[#A6A6A6] font-light text-justify hidden md:block`}
            variants={itemVariants}
          >
            {translations.aboutMe}
          </motion.p>
          <motion.div 
            className="bg-white rounded-3xl p-4"
            variants={itemVariants}
          >
            <h2 className="mb-4">Front-end</h2>
            <p className={`${FiraCodeFont.className} text-xs`}>
              Typescript / React / Svelte / Angular / Next / React Native
            </p>
          </motion.div>
          <motion.div 
            className="flex w-full"
            variants={itemVariants}
          >
            <div className="border border-[#A6A6A6] rounded-3xl p-4 text-white md:w-3/5">
              <h2 className="text-[#A6A6A6] mb-4">Back-end</h2>
              <p className={`${FiraCodeFont.className} text-xs`}>
                PostgreSQL / Supabase / Node / Express
              </p>
            </div>
            <div className="flex-1 flex justify-center items-center mx-8">
              <div className="relative w-14 h-14">
                <div className="absolute w-12 h-12 flex items-center justify-center rounded-full border border-[#A6A6A6] bg-black">
                  <Image
                    src="/github-white.png"
                    alt="Logo GitHub"
                    width={25}
                    height={25}
                    className="object-cover aspect-square"
                  />
                </div>

                <a
                  href="https://github.com/alisterfl"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="absolute w-12 h-12 flex items-center justify-center rounded-full border border-[#A6A6A6] bg-white left-[58%]">
                    <motion.span
                      className="text-black text-xl"
                      suppressHydrationWarning
                      whileHover={{
                        x: 4,
                        y: -4,
                        transition: { duration: 0.1 }, // Réduit la durée du hover
                      }}
                      animate={{
                        x: 0,
                        y: 0,
                        transition: { duration: 0.1 }, // Réduit la durée de l'animation
                      }}
                    >
                      &#8599;
                    </motion.span>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>
          <motion.div 
            className="border border-[#A6A6A6] rounded-3xl p-4 text-white"
            variants={itemVariants}
          >
            <h2 className="text-[#A6A6A6] mb-4">{translations.tools}</h2>
            <p className={`${FiraCodeFont.className} text-xs`}>
              GitHub / N8N / Docker / Vercel / Figma / Notion / Tailwind
            </p>
          </motion.div>
        </motion.div>

        <motion.div 
          className="w-full md:w-1/3 flex flex-col justify-center items-center"
          variants={containerVariants}
        >
          <motion.p
            className={`${OpenSansFont.className} text-[#A6A6A6] font-light text-justify md:hidden mb-4`}
            variants={itemVariants}
          >
            {translations.aboutMe}
          </motion.p>
          <motion.div
            variants={imageVariants}
            className="w-full"
          >
            <Image
              src="/images/alister.jpeg"
              alt="picture of alister flandrinck"
              width={450}
              height={600}
              className="w-full h-full object-cover rounded-3xl aspect-square"
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AboutMeSection;