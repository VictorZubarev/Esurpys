"use client";

import { useState } from "react";

type Language = "en" | "ru";

const content = {
  en: {
    about: "About the project",
    label: "A new digital platform",
    titleFirst: "Turn ideas into",
    titleSecond: "possibilities.",
    description:
      "Esurpys is an emerging technology project focused on building practical digital tools and exploring better ways to work online.",
    explore: "Explore Esurpys",
    github: "View on GitHub",
    heading: "Built step by step.",
    aboutText:
      "Esurpys is in development. The initial focus is on creating a reliable web foundation that can grow as new features are built and tested.",
    status: "Project status",
    stage: "Early development",
    statusText:
      "The platform is being built. Features and capabilities will be introduced as they become available.",
    footer: "Built step by step.",
  },
  ru: {
    about: "О проекте",
    label: "Новая цифровая платформа",
    titleFirst: "Превращаем идеи в",
    titleSecond: "возможности.",
    description:
      "Esurpys — развивающийся технологический проект, направленный на создание практических цифровых инструментов и поиск более эффективных способов работы в интернете.",
    explore: "О проекте Esurpys",
    github: "Открыть на GitHub",
    heading: "Развиваем шаг за шагом.",
    aboutText:
      "Esurpys находится в разработке. Сейчас наша цель — создать надёжную основу веб-платформы, которую можно будет расширять по мере создания и тестирования новых функций.",
    status: "Статус проекта",
    stage: "Ранняя стадия разработки",
    statusText:
      "Платформа создаётся. Новые функции будут появляться по мере их разработки и проверки.",
    footer: "Создаём шаг за шагом.",
  },
};

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const t = content[language];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <a href="/" className="text-2xl font-bold tracking-tight">
          Esurpys<span className="text-cyan-400">.</span>
        </a>

        <div className="flex items-center gap-4">
          <button
            onClick={() =>
              setLanguage((current) => (current === "en" ? "ru" : "en"))
            }
            className="rounded-full border border-slate-700 px-4 py-2 text-sm font-semibold hover:border-cyan-400"
            aria-label="Switch language / Сменить язык"
          >
            {language === "en" ? "EN | RU" : "RU | EN"}
          </button>

          <a
            href="#about"
            className="hidden rounded-full border border-slate-700 px-5 py-2 text-sm transition hover:border-cyan-400 sm:inline-block"
          >
            {t.about}
          </a>
        </div>
      </nav>

      <section className="mx-auto flex min-h-[75vh] max-w-6xl flex-col justify-center px-6 py-20">
        <p className="mb-6 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
          {t.label}
        </p>

        <h1 className="max-w-4xl text-5xl font-bold leading-tight tracking-tight sm:text-7xl">
          {t.titleFirst}
          <span className="block text-cyan-400">{t.titleSecond}</span>
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300">
          {t.description}
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#about"
            className="rounded-full bg-cyan-400 px-7 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            {t.explore}
          </a>

          <a
            href="https://github.com/VictorZubarev/Esurpys"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-slate-600 px-7 py-3 font-semibold transition hover:border-white"
          >
            {t.github}
          </a>
        </div>
      </section>

      <section
        id="about"
        className="border-t border-slate-800 bg-slate-900/50"
      >
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 sm:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold">{t.heading}</h2>
            <p className="mt-4 leading-7 text-slate-300">{t.aboutText}</p>
          </div>

          <div className="rounded-2xl border border-slate-700 bg-slate-950 p-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
              {t.status}
            </p>
            <p className="mt-4 text-2xl font-bold">{t.stage}</p>
            <p className="mt-3 leading-7 text-slate-400">{t.statusText}</p>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-800 px-6 py-8 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Esurpys. {t.footer}
      </footer>
    </main>
  );
}