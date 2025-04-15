"use client";

import { useLanguage } from "../context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { FiraCodeFont } from "../lib/fonts";

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Fonction pour le défilement fluide
  const scrollToSection = (id: string): void => {
    setIsMenuOpen(false); // Fermer le menu si ouvert
    
    // Trouver l'élément cible
    const targetElement = document.getElementById(id);
    if (!targetElement) return;
    
    // Calculer la position de défilement
    const headerOffset = 80; // Hauteur approximative de la barre de navigation
    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
    // Effectuer le défilement fluide
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
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

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (
        isMenuOpen && 
        menuRef.current && 
        buttonRef.current && 
        !menuRef.current.contains(event.target as Node) && 
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      // Déterminer si on défile vers le haut ou vers le bas
      const isScrollingDown = currentScrollPos > prevScrollPos;

      // Si on défile plus bas que le header et qu'on défile vers le bas, cacher le header
      // Si on défile vers le haut, montrer le header
      setVisible(!isScrollingDown || currentScrollPos < 10);

      // Mettre à jour la position de défilement précédente
      setPrevScrollPos(currentScrollPos);
    };

    // Ajouter l'écouteur d'événement pour le défilement
    window.addEventListener("scroll", handleScroll);

    // Nettoyer l'écouteur d'événement
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const { language, toggleLanguage, translations } = useLanguage();

  return (
    <motion.header
      className={`fixed text-white w-full shadow-md z-50 ${FiraCodeFont.className}`}
      initial={{ y: 0 }}
      animate={{ y: visible ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      role="banner"
    >
      <nav className="w-full bg-[#121212]" aria-label="Navigation principale">
        <div className="max-w-[1300px] m-auto px-4 py-3 flex justify-between items-center">
          <div className="text-xl font-normal flex flex-col">
            <a 
              className="flex flex-col" 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              aria-label="Retour en haut de page"
            >
              <span className="cursor-pointer hover:text-gray-400">
                Alister
              </span>
              <span className="cursor-pointer hover:text-gray-400">
                Flandrinck
              </span>
            </a>
          </div>

          <ul className="text-xs hidden md:flex space-x-14" role="menubar" aria-label="Menu principal">
            {(["about", "projects", "contact"] as const).map(
              (key) => (
                <li key={key} role="none">
                  <a 
                    href={`#${key}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(key);
                    }}
                    role="menuitem"
                    aria-label={translations[key]}
                  >
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
                  </a>
                </li>
              )
            )}
          </ul>

          <div className="md:flex hidden text-xl font-bold" role="group" aria-label="Sélection de langue">
            <button
              onClick={() => toggleLanguage("en")}
              className={`px-2 py-1 ${
                language === "en" ? "font-bold" : "font-normal text-gray-400"
              }`}
              aria-pressed={language === "en"}
            >
              EN
            </button>
            <button
              onClick={() => toggleLanguage("fr")}
              className={`px-2 py-1 ${
                language === "fr" ? "font-bold" : "font-normal text-gray-400"
              }`}
              aria-pressed={language === "fr"}
            >
              FR
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="focus:outline-none"
              ref={buttonRef}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              <motion.svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                initial={false}
                animate={isMenuOpen ? "open" : "closed"}
                aria-hidden="true"
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
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-full left-0 w-full bg-[#121212] shadow-lg bg-opacity-95 backdrop-blur-md"
            role="menu"
            aria-label="Menu mobile"
          >
            <div className="max-w-[1300px] m-auto px-4 py-3">
              <ul className="m-auto space-y-4 pb-4" role="menu">
                {(["about", "projects", "skills", "contact"] as const).map(
                  (key) => (
                    <li key={key} role="none">
                      <a
                        href={`#${key}`}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToSection(key);
                        }}
                        role="menuitem"
                      >
                        <motion.span
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          transition={{ duration: 0.3 }}
                          className="cursor-pointer hover:text-gray-400"
                        >
                          {translations[key]}
                        </motion.span>
                      </a>
                    </li>
                  )
                )}
              </ul>

              <div className="text-xl font-bold" role="group" aria-label="Sélection de langue">
                <button
                  onClick={() => toggleLanguage("en")}
                  className={`py-1 pr-[6px] ${
                    language === "en"
                      ? "font-bold"
                      : "font-normal text-gray-400"
                  }`}
                  aria-pressed={language === "en"}
                >
                  EN
                </button>
                <button
                  onClick={() => toggleLanguage("fr")}
                  className={`py-1 ${
                    language === "fr"
                      ? "font-bold"
                      : "font-normal text-gray-400"
                  }`}
                  aria-pressed={language === "fr"}
                >
                  FR
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navigation;