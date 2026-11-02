"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Language = "en" | "ru";

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("esurpys-language");

    if (saved === "en" || saved === "ru") {
      setLanguageState(saved);
    }

    function syncLanguage(event: Event) {
      const nextLanguage = (event as CustomEvent<Language>).detail;

      if (nextLanguage === "en" || nextLanguage === "ru") {
        setLanguageState(nextLanguage);
      }
    }

    function syncStorage(event: StorageEvent) {
      if (event.key !== "esurpys-language") return;
      setLanguageState(event.newValue === "ru" ? "ru" : "en");
    }

    window.addEventListener("esurpys-language-change", syncLanguage);
    window.addEventListener("storage", syncStorage);

    return () => {
      window.removeEventListener("esurpys-language-change", syncLanguage);
      window.removeEventListener("storage", syncStorage);
    };
  }, []);

  const setLanguage = useCallback((nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    localStorage.setItem("esurpys-language", nextLanguage);

    window.dispatchEvent(
      new CustomEvent("esurpys-language-change", {
        detail: nextLanguage,
      })
    );
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}