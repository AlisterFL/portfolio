"use client";

import { useState, useEffect } from "react";
import { Language } from "../types";
import KosmosSiteHeader from "../components/KosmosSiteHeader";
import KosmosSiteReservation from "../components/KosmosSiteReservation";

export default function ReservationPage() {
  const [language, setLanguage] = useState<Language>("nl");

  useEffect(() => {
    const saved = localStorage.getItem("kosmos-lang") as Language | null;
    if (saved && ["fr", "nl", "en", "de"].includes(saved)) {
      setLanguage(saved);
    }
  }, []);

  function handleLanguageChange(lang: Language) {
    setLanguage(lang);
    localStorage.setItem("kosmos-lang", lang);
  }

  return (
    <>
      <KosmosSiteHeader language={language} onLanguageChange={handleLanguageChange} solid />
      <div className="pt-20">
        <KosmosSiteReservation language={language} />
      </div>
    </>
  );
}
