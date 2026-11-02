"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Language = "en" | "ru";

const content = {
  en: {
    navHome: "Home",
    navNavigator: "Visa Navigator",
    navCountries: "Countries",
    navAbout: "About",
  },
  ru: {
    navHome: "Главная",
    navNavigator: "Визовый навигатор",
    navCountries: "Страны",
    navAbout: "О проекте",
  },
} as const;

const navigation = [
  { href: "/", key: "navHome" },
  { href: "/navigator", key: "navNavigator" },
  { href: "/countries", key: "navCountries" },
  { href: "/about", key: "navAbout" },
] as const;

export default function Header() {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("esurpys-language");

    if (savedLanguage === "en" || savedLanguage === "ru") {
      setLanguage(savedLanguage);
    }
  }, []);

  function changeLanguage(nextLanguage: Language) {
  setLanguage(nextLanguage);
  localStorage.setItem("esurpys-language", nextLanguage);

  window.dispatchEvent(
    new CustomEvent("esurpys-language-change", {
      detail: nextLanguage,
    })
  );
}

  const t = content[language];

  return (
    <header className="relative z-10 border-b border-white/10 bg-slate-950/90">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-5">
        <Link
          href="/"
          className="shrink-0 text-2xl font-bold tracking-tight"
        >
          Esurpys<span className="text-cyan-400">.</span>
        </Link>

        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-slate-300 transition hover:text-cyan-300"
            >
              {t[item.key]}
            </Link>
          ))}

          <div className="flex rounded-full border border-white/10 bg-slate-900 p-1">
            <button
              type="button"
              onClick={() => changeLanguage("en")}
              aria-label="Switch to English"
              aria-pressed={language === "en"}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                language === "en"
                  ? "bg-cyan-400 text-slate-950"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              EN
            </button>

            <button
              type="button"
              onClick={() => changeLanguage("ru")}
              aria-label="Переключить на русский"
              aria-pressed={language === "ru"}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                language === "ru"
                  ? "bg-cyan-400 text-slate-950"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              RU
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
