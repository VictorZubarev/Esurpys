"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { countries, type Language } from "@/lib/countries";
import CountryFlag from "@/components/CountryFlag";

export default function CountryDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("esurpys-language");
    if (savedLanguage === "en" || savedLanguage === "ru") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLanguage(savedLanguage);
    }
  }, []);

  function changeLanguage(nextLanguage: Language) {
    setLanguage(nextLanguage);
    localStorage.setItem("esurpys-language", nextLanguage);
  }

  const country = countries.find((item) => item.slug === slug);

  if (!country) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-slate-100">
        <div className="max-w-lg text-center">
          <h1 className="text-3xl font-bold">
            {language === "en" ? "Country not found" : "Страна не найдена"}
          </h1>
          <Link
            href="/countries"
            className="mt-6 inline-block text-cyan-400 hover:text-cyan-300"
          >
            {language === "en" ? "Back to countries" : "Вернуться к странам"}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-5">
          <Link href="/" className="text-2xl font-bold tracking-tight">
            Esur<span className="text-cyan-400">pys</span>
          </Link>

          <nav className="flex items-center gap-5 text-sm">
            <Link href="/countries" className="text-slate-300 hover:text-cyan-300">
              {language === "en" ? "Countries" : "Страны"}
            </Link>
            <Link href="/about" className="text-slate-300 hover:text-cyan-300">
              {language === "en" ? "About" : "О проекте"}
            </Link>
            <button
              onClick={() => changeLanguage(language === "en" ? "ru" : "en")}
              className="rounded-full border border-slate-700 px-4 py-2 font-semibold hover:border-cyan-400"
            >
              {language === "en" ? "RU" : "EN"}
            </button>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-6 py-14">
        <Link
          href="/countries"
          className="text-sm text-cyan-400 hover:text-cyan-300"
        >
          ← {language === "en" ? "All countries" : "Все страны"}
        </Link>

        <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center">
          <CountryFlag
            code={country.flag as "US" | "DE" | "GB" | "CA" | "AU" | "NL"}
            name={country.name.en}
            className="h-16 w-24 rounded-lg ring-1 ring-white/10"
          />
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
              {country.region[language]}
            </p>
            <h1 className="mt-2 text-4xl font-bold sm:text-6xl">
              {country.name[language]}
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-400">
              {country.summary[language]}
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {country.categories[language].map((category) => (
            <span
              key={category}
              className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300"
            >
              {category}
            </span>
          ))}
        </div>

        <div className="mt-14 space-y-6">
          {country.sections.map((section) => (
            <section
              key={section.title.en}
              className="rounded-3xl border border-slate-800 bg-slate-900/70 p-7 sm:p-9"
            >
              <h2 className="text-2xl font-bold">
                {section.title[language]}
              </h2>

              <p className="mt-3 leading-7 text-slate-400">
                {section.description[language]}
              </p>

              <ul className="mt-6 space-y-3">
                {section.points[language].map((point) => (
                  <li key={point} className="flex gap-3 leading-7 text-slate-300">
                    <span className="text-cyan-400" aria-hidden="true">✓</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <p className="mt-8 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5 text-sm leading-6 text-slate-400">
          {language === "en"
            ? "This page is an introductory guide, not legal, immigration, financial or professional advice. Requirements can change. Always verify current information with official sources."
            : "Эта страница — ознакомительный материал, а не юридическая, иммиграционная, финансовая или профессиональная консультация. Требования могут меняться. Всегда проверяй актуальную информацию в официальных источниках."}
        </p>
      </section>

      <footer className="border-t border-slate-800 px-6 py-8 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Esurpys
      </footer>
    </main>
  );
}
