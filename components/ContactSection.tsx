"use client";

import React, { useEffect, useState, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";
import { OpenSansFont, FiraCodeFont } from "@/lib/fonts";
import { motion } from "framer-motion";
import Image from "next/image";

const ContactSection = () => {
  const { translations } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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
        threshold: [0.2], // Définir le seuil à 20%
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
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const titleVariants = {
    hidden: { x: -30, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      id="contact"
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
          ./Contact ...
        </p>
      </motion.div>
      
      <div className={`w-full flex flex-col ${OpenSansFont.className} mt-8 gap-6`}>
        {/* Container des contacts avec flexbox adaptative */}
        <div className="flex flex-col gap-4">
          {/* Première ligne: LinkedIn et GitHub côte à côte sur écrans moyens+ */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* LinkedIn Card */}
            <motion.a 
              href="https://www.linkedin.com/in/alisterflandrinck/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-1/2 xl:w-1/3 group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              variants={itemVariants}
            >
              <div className="bg-black rounded-2xl flex items-center overflow-hidden border border-[#A6A6A6] h-full">
                <div className="p-4 flex items-center justify-center relative">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                    <Image
                      src="/images/linkedin.png"
                      alt="LinkedIn Icon"
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  </div>
                  <div className="h-full w-px bg-white opacity-50 absolute right-0"></div>
                </div>
                <div className="px-3 py-4 flex-1">
                  <p className="text-[#A6A6A6] text-xs mb-1">LinkedIn</p>
                  <p className={`${FiraCodeFont.className} text-white text-sm group-hover:text-[#A6A6A6] transition-colors duration-300 flex items-center`}>
                    @alisterflandrinck
                    <span className="ml-2 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
                      &#8599;
                    </span>
                  </p>
                </div>
              </div>
            </motion.a>

            {/* GitHub Card */}
            <motion.a 
              href="https://github.com/AlisterFL"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-1/2 xl:w-1/3 group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              variants={itemVariants}
            >
              <div className="bg-black rounded-2xl flex items-center overflow-hidden border border-[#A6A6A6] h-full">
                <div className="p-4 flex items-center justify-center relative">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                    <Image
                      src="/images/github-black.png"
                      alt="GitHub Icon"
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  </div>
                  <div className="h-full w-px bg-white opacity-50 absolute right-0"></div>
                </div>
                <div className="px-3 py-4 flex-1">
                  <p className="text-[#A6A6A6] text-xs mb-1">GitHub</p>
                  <p className={`${FiraCodeFont.className} text-white text-sm group-hover:text-[#A6A6A6] transition-colors duration-300 flex items-center`}>
                    @AlisterFL
                    <span className="ml-2 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
                      &#8599;
                    </span>
                  </p>
                </div>
              </div>
            </motion.a>

            {/* Email Card - Uniquement visible sur grands écrans (xl) */}
            <motion.a 
              href="mailto:alisterflandrinck@gmail.com"
              className="hidden xl:block xl:w-1/3 group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              variants={itemVariants}
            >
              <div className="bg-black rounded-2xl flex items-center overflow-hidden border border-[#A6A6A6] h-full">
                <div className="p-4 flex items-center justify-center relative">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                    <Image
                      src="/images/mail.png"
                      alt="Email Icon"
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  </div>
                  <div className="h-full w-px bg-white opacity-50 absolute right-0"></div>
                </div>
                <div className="px-3 py-4 flex-1">
                  <p className="text-[#A6A6A6] text-xs mb-1">Email</p>
                  <p className={`${FiraCodeFont.className} text-white text-sm group-hover:text-[#A6A6A6] transition-colors duration-300 flex items-center truncate`}>
                    alisterflandrinck@gmail.com
                    <span className="ml-2 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
                      &#8599;
                    </span>
                  </p>
                </div>
              </div>
            </motion.a>
          </div>

          {/* Deuxième ligne: Email uniquement visible sur petit et moyen écrans */}
          <motion.a 
            href="mailto:alisterflandrinck@gmail.com"
            className="xl:hidden w-full group"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            variants={itemVariants}
          >
            <div className="bg-black rounded-2xl flex items-center overflow-hidden border border-[#A6A6A6]">
              <div className="p-4 flex items-center justify-center relative">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                  <Image
                    src="/images/mail.png"
                    alt="Email Icon"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>
                <div className="h-full w-px bg-white opacity-50 absolute right-0"></div>
              </div>
              <div className="px-5 py-4 flex-1">
                <p className="text-[#A6A6A6] text-xs mb-1">Email</p>
                <p className={`${FiraCodeFont.className} text-white text-sm group-hover:text-[#A6A6A6] transition-colors duration-300 flex items-center`}>
                  alisterflandrinck@gmail.com
                  <span className="ml-2 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
                    &#8599;
                  </span>
                </p>
              </div>
            </div>
          </motion.a>
        </div>
        
        <motion.div 
          className="bg-white rounded-3xl p-6 text-black"
          variants={itemVariants}
        >
          <h2 className="mb-4">{translations?.getInTouch || "Get in touch"}</h2>
          <p className={`${OpenSansFont.className} text-sm`}>
            {translations?.contactText || "N'hésitez pas à me contacter pour discuter de vos projets ou opportunités professionnelles."}
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ContactSection;