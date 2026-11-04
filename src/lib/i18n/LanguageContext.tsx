"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Locale, translations, LOCALES } from "./dictionaries";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: typeof translations.bn;
  availableLocales: typeof LOCALES;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("bn");

  useEffect(() => {
    // Read from localStorage or cookie
    const saved = localStorage.getItem("rakib_locale") as Locale | null;
    if (saved && (saved === "bn" || saved === "en" || saved === "ja")) {
      setLocaleState(saved);
      document.cookie = `rakib_locale=${saved}; path=/; max-age=31536000`;
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("rakib_locale", newLocale);
    document.cookie = `rakib_locale=${newLocale}; path=/; max-age=31536000`;
  };

  const t = translations[locale] || translations.bn;

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, availableLocales: LOCALES }}>
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
