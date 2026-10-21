"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Language = "en" | "ru";

const content = {
  en: {
    back: "← Back to Esurpys",
    label: "About the project",
    title: "Esurpys",
    description:
      "Esurpys is an emerging technology project focused on building practical digital tools and exploring better ways to work online.",
    approachTitle: "Our approach",
    approachText:
      "We develop the project step by step, prioritizing a reliable technical foundation, clear documentation, and continuous improvement.",
    stageTitle: "Current stage",
    stageText:
      "Esurpys is in its early development stage. Features will be introduced as they are implemented and tested.",
    language: "EN | RU",
    footer: "Built step by step.",
  },
  ru: {
    back: "← Вернуться в Esurpys",
    label: "О проекте",
    title: "Esurpys",
    description:
      "Esurpys — развивающийся технологический проект, направленный на создание практических цифровых инструментов и поиск более эффективных способов работы в интернете.",
    approachTitle: "Наш подход",
    approachText:
      "Мы развиваем проект шаг за шагом, уделяя внимание надёжной технической основе, понятной документации и постоянному улучшению продукта.",
    stageTitle: "Текущий этап",
    stageText:
      "Esurpys находится на ранней стадии разработки. Новые функции будут появляться по мере их создания и тестирования.",
    language: "RU | EN",
    footer: "Создаём шаг за шагом.",
  },
};

export default function AboutPage() {
  const [language, setLanguage] = useState<Language>("en");
  const [languageLoaded, setLanguageLoaded] = useState(false);

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("esurpys-language");

    if (savedLanguage === "en" || savedLanguage === "ru") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLanguage(savedLanguage);
    }

    setLanguageLoaded(true);
  }, []);

  useEffect(() => {
    if (languageLoaded) {
      window.localStorage.setItem("esurpys-language", language);
    }
  }, [language, languageLoaded]);

  const t = content[language];

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-8 text-white">
      <nav className="mx-auto flex max-w-4xl items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          Esurpys<span className="text-cyan-400">.</span>
        </Link>

        <button
          onClick={() =>
            setLanguage((current) => (current === "en" ? "ru" : "en"))
          }
          className="rounded-full border border-slate-700 px-4 py-2 text-sm font-semibold transition hover:border-cyan-400"
          aria-label="Switch language / Сменить язык"
        >
          {t.language}
        </button>
      </nav>

      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="mt-12 inline-block text-sm text-cyan-400 transition hover:text-cyan-300"
        >
          {t.back}
        </Link>

        <section className="py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
            {t.label}
          </p>

          <h1 className="mt-5 text-5xl font-bold tracking-tight sm:text-6xl">
            {t.title}
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300">
            {t.description}
          </p>
        </section>

        <section className="border-t border-slate-800 py-10">
          <h2 className="text-2xl font-bold">{t.approachTitle}</h2>

          <p className="mt-4 max-w-2xl leading-7 text-slate-300">
            {t.approachText}
          </p>
        </section>

        <section className="border-t border-slate-800 py-10">
          <h2 className="text-2xl font-bold">{t.stageTitle}</h2>

          <p className="mt-4 max-w-2xl leading-7 text-slate-300">
            {t.stageText}
          </p>
        </section>

        <footer className="border-t border-slate-800 py-8 text-sm text-slate-500">
          © {new Date().getFullYear()} Esurpys. {t.footer}
        </footer>
      </div>
    </main>
  );
}