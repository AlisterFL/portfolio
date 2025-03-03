"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import { FiraCodeFont, OpenSansFont } from "../lib/fonts";
import { motion } from "framer-motion";

const HeroSection: React.FC = () => {
  const { translations } = useLanguage();

  return (
    <section
      className={`max-w-[1300px] m-auto w-full h-auto flex flex-col px-4 justify-center py-14`}
    >
      <div className="flex flex-col justify-between items-center space-y-0">
        <div className="flex space-y-4 w-full items-end justify-between mt-6 mb-6">
          <h1
            className={`font-medium text-white m-0 leading-none ${FiraCodeFont.className} ml-4 md=ml-0`}
            style={{ fontSize: "clamp(3rem, 9vw, 8rem)" }}
          >
            {translations.full_stack}
          </h1>
          <div className="flex-row hidden md:flex">
            <div className="mt-4 px-20 py-2 text-black bg-white text-xl rounded-full">
              {translations.projects}
            </div>
            <Link href="#projects">
              <div className="mt-4 ml-4 px-[14px] py-2 text-black bg-white text-xl rounded-full cursor-pointer flex items-center justify-center">
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
              </div>
            </Link>
          </div>
        </div>

        <div className="flex flex-row-reverse justify-between items-center w-full text-white mt-0">
          <h2
            className={`font-medium ml-5 ${FiraCodeFont.className} mr-4 md=mr-0 mb-10`}
            style={{ fontSize: "clamp(3rem, 9vw, 8rem)" }}
          >
            {translations.developer}
          </h2>
          <div className="flex-col hidden md:block text-left max-w-72">
            <p
              className={` ${OpenSansFont.className}`}
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
            <p className={`${FiraCodeFont.className} text-xs font-bold`}>Albert Einstein</p>
          </div>
        </div>
      </div>

      {/* Section Mobile */}
      <div className="block md:hidden w-4/5 justify-center">
        <p className={`${OpenSansFont.className} font-light md:text-right md:w-2/3 text-white max-w-[300px] text-center`}>
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
        <p className={`${FiraCodeFont.className} text-sm text-white font-bold text-center`}>Albert Einstein</p>


        <div className={`${OpenSansFont.className} flex flex-row justify-center`}>
            <div className="mt-4 px-20 py-2 text-black bg-white text-xl rounded-full italic">
              {translations.projects}
            </div>
            <Link href="#projects">
              <div className="mt-4 ml-4 px-[14px] py-2 text-black bg-white text-xl rounded-full cursor-pointer flex items-center justify-center">
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
              </div>
            </Link>
          </div>
      </div>
    </section>
  );
};

export default HeroSection;
