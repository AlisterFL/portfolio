"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import { FiraCodeFont, OpenSansFont } from "../lib/fonts";
import { motion } from "framer-motion";

const HeroSection: React.FC = () => {
  const { translations } = useLanguage();
  const [hovered, setHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Déclencher l'animation immédiatement après que le composant soit monté
    setIsLoaded(true);
  }, []);

  const handleClick = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className={`max-w-[1300px] m-auto w-full h-auto flex flex-col px-4 justify-center py-52`}
    >
      <div className="flex flex-col justify-between items-center space-y-0">
        <div className="flex space-y-4 w-full items-end justify-between mt-6 mb-6">
          <motion.h1
            className={`font-medium text-white m-0 leading-none ${FiraCodeFont.className} ml-4 md=ml-0`}
            style={{ fontSize: "clamp(3rem, 9vw, 8rem)" }}
            initial={{ opacity: 0, x: -100 }}
            animate={{ 
              opacity: isLoaded ? 1 : 0, 
              x: isLoaded ? 0 : -100 
            }}
            transition={{ 
              duration: 0.8, 
              ease: "easeOut",
              delay: 0 // Suppression du délai
            }}
          >
            {translations.full_stack}
          </motion.h1>
          <div className="flex-row hidden md:flex">
            <motion.div
              className="mt-4 px-20 py-2 text-black bg-white text-xl rounded-full cursor-pointer"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              onClick={handleClick}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: isLoaded ? 1 : 0, 
                y: isLoaded ? 0 : 20 
              }}
              transition={{ 
                duration: 0.6, 
                ease: "easeOut",
                delay: 0 // Suppression du délai
              }}
            >
              {translations.projects}
            </motion.div>

            <motion.div
              className="mt-4 ml-4 px-[14px] py-2 text-black bg-white text-xl rounded-full cursor-pointer flex items-center justify-center"
              onClick={handleClick}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: isLoaded ? 1 : 0, 
                y: isLoaded ? 0 : 20 
              }}
              transition={{ 
                duration: 0.6, 
                ease: "easeOut",
                delay: 0 // Suppression du délai
              }}
            >
              <motion.span
                className="text-xl"
                suppressHydrationWarning
                animate={{
                  x: hovered ? 8 : 0,
                  transition: { duration: 0.3 },
                }}
              >
                &#8594;
              </motion.span>
            </motion.div>
          </div>
        </div>

        <div className="flex flex-row-reverse justify-between items-center w-full text-white mt-0">
          <motion.h2
            className={`leading_none font-medium ml-5 ${FiraCodeFont.className} mr-4 md=mr-0 mb-10`}
            style={{ fontSize: "clamp(3rem, 9vw, 8rem)" }}
            initial={{ opacity: 0, x: 100 }}
            animate={{ 
              opacity: isLoaded ? 1 : 0, 
              x: isLoaded ? 0 : 100 
            }}
            transition={{ 
              duration: 0.8, 
              ease: "easeOut",
              delay: 0 // Suppression du délai
            }}
          >
            {translations.developer}
          </motion.h2>
          <motion.div 
            className="flex-col hidden md:block text-left max-w-72"
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ 
              duration: 0.8, 
              ease: "easeOut",
              delay: 0 // Suppression du délai
            }}
          >
            <p
              className={`ml_4 ${OpenSansFont.className}`}
              style={{ fontStyle: "italic", fontSize: "clamp(7px, 2vw, 16px)" }}
            >
              {translations.quote.split(" ").map((word, index) => (
                <span
                  key={index}
                  className={
                    [
                      "learn,",
                      "realize",
                      "I",
                      "don't",
                      "'t",
                      "know.",
                      "j'apprends,",
                      "rends",
                      "compte",
                      "je",
                      "me",
                      "ne",
                      "sais",
                      "pas.",
                    ].includes(word.toLowerCase())
                      ? "text-white"
                      : "text-[#A6A6A6]"
                  }
                >
                  {word}{" "}
                </span>
              ))}
            </p>
            <p className={`${FiraCodeFont.className} text-xs font-bold text-right`}>Albert Einstein</p>
          </motion.div>
        </div>
      </div>

      {/* Section Mobile */}
      <motion.div 
        className="block md:hidden w-full justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ 
          duration: 0.8, 
          ease: "easeOut",
          delay: 0 // Suppression du délai
        }}
      >
        <p className={`${OpenSansFont.className} font-light md:text-right md:w-2/3 text-white max-w-[300px] text-center m-auto`}>
          {translations.quote.split(" ").map((word, index) => (
            <span
              key={index}
              className={
                [
                  "learn,",
                  "realize",
                  "I",
                  "don't",
                  "'t",
                  "know.",
                  "j'apprends,",
                  "rends",
                  "compte",
                  "je",
                  "me",
                  "ne",
                  "sais",
                  "pas.",
                ].includes(word.toLowerCase())
                  ? "text-white"
                  : "text-[#A6A6A6]"
              }
            >
              {word}{" "}
            </span>
          ))}
        </p>
        <p className={`${FiraCodeFont.className} text-sm text-white font-bold text-center align-right mr-[12%] pt-4`}>Albert Einstein</p>

        <div className={`${OpenSansFont.className} flex flex-row justify-center pt-20`}>
          <motion.div 
            className="mt-4 px-20 py-2 text-black bg-white text-xl rounded-full italic"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isLoaded ? 1 : 0, 
              y: isLoaded ? 0 : 20 
            }}
            transition={{ 
              duration: 0.6, 
              ease: "easeOut",
              delay: 0 // Suppression du délai
            }}
          >
            {translations.projects}
          </motion.div>
          <Link href="#projects">
            <motion.div 
              className="mt-4 ml-4 px-[14px] py-2 text-black bg-white text-xl rounded-full cursor-pointer flex items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: isLoaded ? 1 : 0, 
                y: isLoaded ? 0 : 20 
              }}
              transition={{ 
                duration: 0.6, 
                ease: "easeOut",
                delay: 0 // Suppression du délai
              }}
            >
              <motion.span
                className="text-xl"
                suppressHydrationWarning
                whileHover={{
                  x: 8,
                  transition: {
                    duration: 0.3,
                  },
                }}
                animate={{
                  x: 0,
                  transition: {
                    duration: 0.3,
                  },
                }}
              >
                &#8594;
              </motion.span>
            </motion.div>
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;