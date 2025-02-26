"use client";
import { createContext, useState, useEffect, useContext, ReactNode } from "react";
import fr from "../lib/locales/fr.json";
import en from "../lib/locales/en.json";

// Définition du type des traductions
type TranslationsType = typeof en; // Utilise la structure de `en.json`

// Définition du type du contexte
interface LanguageContextType {
  language: "en" | "fr"; // Langues supportées
  toggleLanguage: (lang: "en" | "fr") => void; // Fonction pour changer la langue
  translations: TranslationsType; // Données de traduction
}

// Valeur par défaut du contexte
const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  toggleLanguage: () => {}, // Fonction vide par défaut
  translations: en, // Traductions par défaut en anglais
});

// Définition du type des props pour le provider
interface LanguageProviderProps {
  children: ReactNode; // Accepte des composants React comme enfants
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<"en" | "fr">("en");
  const [translations, setTranslations] = useState<TranslationsType>(en); // Texte en anglais par défaut

  // Charger la langue depuis localStorage au montage
  useEffect(() => {
    const savedLanguage = (localStorage.getItem("language") as "en" | "fr") || "en";
    setLanguage(savedLanguage);
    setTranslations(savedLanguage === "fr" ? fr : en);
  }, []);

  // Fonction pour changer de langue
  const toggleLanguage = (lang: "en" | "fr") => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
    setTranslations(lang === "fr" ? fr : en);
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte facilement
export const useLanguage = () => useContext(LanguageContext);
