"use client";

import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { OpenSansFont } from "@/lib/fonts";
import { motion } from "framer-motion";


const EducationSection = () => {
  const { translations } = useLanguage();

  return (
    <section className={`max-w-[1300px] m-auto w-full h-auto flex flex-col justify-center pb-4 pt-14`}>
        <div className={`w-full flex justify-end text-white px-4 mb-4`}>
          <h1 className={`${OpenSansFont.className} font-semibold`} style={{ fontSize: "clamp(2rem, 9vw, 4rem)" }}>{translations.education.toUpperCase()}</h1>
        </div>
        <div className="w-full ">
          {translations.education_list.map((education, index) => (
            <motion.div
              key={education.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center justify-between p-4 px-4 border-b border-t border-gray-700 text-white transition-colors duration-300 hover:bg-white hover:text-black">
              <div className="flex flex-col w-1/4">
                <span className="text-base font-light text-[#A6A6A6]">{education.period}</span>
                <span className="text-xs text-[#A6A6A6]">{education.periodTime}</span>
              </div>

              <p className="text-lg font-light w-2/5 text-start">{education.company}</p>

              <h3 className="text-lg font-light w-2/5">{education.title}</h3>
            </motion.div>
          ))}
        </div>
    </section>
  );
};

export default EducationSection;
