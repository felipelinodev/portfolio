"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { dictionaries } from "@/i18n/dictionaries";

type Language = "pt" | "en";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: typeof dictionaries.pt;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("pt");

  useEffect(() => {
    const saved = localStorage.getItem("portfolio-lang") as Language;
    if (saved && (saved === "pt" || saved === "en")) {
      setLanguage(saved);
    }
  }, []);

  const toggleLanguage = () => {
    const next = language === "pt" ? "en" : "pt";
    setLanguage(next);
    localStorage.setItem("portfolio-lang", next);
  };

  const t = dictionaries[language];

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
