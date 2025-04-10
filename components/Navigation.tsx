'use client';

import Link from 'next/link';
import { useLanguage } from "../context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from 'react';
import { FiraCodeFont } from "../lib/fonts";

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { language, toggleLanguage, translations } = useLanguage();

  return (
    <nav className={`max-w-[1300px] m-auto relative text-white top-0 left-0 w-full shadow-md z-50 ${FiraCodeFont.className}`}>
      <div className="w-full m-auto px-4 py-3 flex justify-between items-center">
        <div className="text-xl font-normal flex flex-col">
          <Link className="flex flex-col" href="/">
            <span className="cursor-pointer hover:text-gray-400">Alister</span>
            <span className="cursor-pointer hover:text-gray-400">Flandrinck</span>
          </Link>
        </div>

        <ul className="text-xs hidden md:flex space-x-14">
          {(['about', 'projects', 'skills', 'contact'] as const).map((key) => (
            <li key={key}>
              <Link href={`#${key}`}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={language}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.3 }}
                    className="cursor-pointer hover:text-gray-400"
                  >
                    {translations[key]}
                  </motion.span>
                </AnimatePresence>
              </Link>
            </li>
          ))}
        </ul>

        <div className="md:flex hidden text-xl font-bold">
          <button
            onClick={() => toggleLanguage("en")}
            className={`px-2 py-1 ${language === "en" ? "font-bold" : "font-normal text-gray-400"}`}
          >
            EN
          </button>
          <button
            onClick={() => toggleLanguage("fr")}
            className={`px-2 py-1 ${language === "fr" ? "font-bold" : "font-normal text-gray-400"}`}
          >
            FR
          </button>
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            <motion.svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              initial={false}
              animate={isMenuOpen ? "open" : "closed"}
            >
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                variants={{
                  closed: { d: "M4 6h16M4 12h16M4 18h16", rotate: 0 },
                  open: { d: "M6 6l12 12M6 18l12-12", rotate: 90 },
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-full left-0 w-full bg-[#121212] shadow-lg bg-opacity-95 backdrop-blur-md px-4 py-3"
          >
            <ul className="m-auto space-y-4 pb-4">
              {(['about', 'projects', 'skills', 'contact'] as const).map((key) => (
                <li key={key}>
                  <Link href={`#${key}`} onClick={() => setIsMenuOpen(false)}>
                    <motion.span
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.3 }}
                      className="cursor-pointer hover:text-gray-400"
                    >
                      {translations[key]}
                    </motion.span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="text-xl font-bold">
              <button
                onClick={() => toggleLanguage("en")}
                className={`py-1 pr-[6px] ${language === "en" ? "font-bold" : "font-normal text-gray-400"}`}
              >
                EN
              </button>
              <button
                onClick={() => toggleLanguage("fr")}
                className={`py-1 ${language === "fr" ? "font-bold" : "font-normal text-gray-400"}`}
              >
                FR
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
