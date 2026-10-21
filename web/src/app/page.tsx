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
    eyebrow: "YOUR JOURNEY STARTS HERE",
    title: "Your future has no borders.",
    subtitle:
      "Explore countries, discover immigration pathways, and find out what you need to make your next move.",
    primaryCta: "Find my visa options",
    secondaryCta: "Explore countries",
    aboutTitle: "Immigration, made clearer.",
    aboutText:
      "Esurpys helps you explore your options, understand requirements, and prepare for your journey to a new country.",
    navigatorTitle: "Personal Visa Navigator",
    navigatorDescription:
      "Tell us about your background and goals. Explore potential immigration pathways and discover what to prepare next.",
    navigatorButton: "Open navigator",
    countriesTitle: "Explore Countries",
    countriesDescription:
      "Discover destinations and learn about living, working, studying, and relocating around the world.",
    countriesButton: "Browse countries",
    aboutCardTitle: "About Esurpys",
    aboutCardDescription:
      "Learn about our mission and how we want to make immigration information easier to understand.",
    aboutButton: "Learn about us",
    featuresTitle: "One platform. More possibilities.",
    feature1Title: "Explore your options",
    feature1Text:
      "Start with your goals, experience, and plans for the future.",
    feature2Title: "Understand the requirements",
    feature2Text:
      "Identify questions to investigate and documents you may need.",
    feature3Title: "Plan your next steps",
    feature3Text:
      "Turn your research into a clearer preparation plan.",
    disclaimer:
      "Esurpys provides informational guidance, not legal advice. Immigration requirements vary by country and may change. Always verify information with official government sources.",
    footer: "Explore your world with Esurpys.",
  },
  ru: {
    navHome: "Главная",
    navNavigator: "Визовый навигатор",
    navCountries: "Страны",
    navAbout: "О проекте",
    eyebrow: "ТВОЙ ПУТЬ НАЧИНАЕТСЯ ЗДЕСЬ",
    title: "У твоего будущего нет границ.",
    subtitle:
      "Изучай страны, находи возможные иммиграционные маршруты и узнавай, что потребуется для следующего шага.",
    primaryCta: "Подобрать варианты виз",
    secondaryCta: "Изучить страны",
    aboutTitle: "Иммиграция — понятнее и доступнее.",
    aboutText:
      "Esurpys помогает изучать возможные варианты переезда, разбираться в требованиях и планировать путь в новую страну.",
    navigatorTitle: "Персональный визовый навигатор",
    navigatorDescription:
      "Расскажи о своём опыте и целях. Изучи возможные иммиграционные маршруты и узнай, что стоит подготовить.",
    navigatorButton: "Открыть навигатор",
    countriesTitle: "Каталог стран",
    countriesDescription:
      "Изучай направления и узнавай о жизни, работе, учёбе и переезде в разные страны мира.",
    countriesButton: "Открыть каталог",
    aboutCardTitle: "О проекте Esurpys",
    aboutCardDescription:
      "Узнай о нашей цели и о том, как мы хотим сделать информацию об иммиграции понятнее.",
    aboutButton: "О проекте",
    featuresTitle: "Одна платформа. Больше возможностей.",
    feature1Title: "Изучай свои варианты",
    feature1Text:
      "Начни со своих целей, опыта и планов на будущее.",
    feature2Title: "Разбирайся в требованиях",
    feature2Text:
      "Определи, что нужно уточнить и какие документы могут потребоваться.",
    feature3Title: "Планируй следующие шаги",
    feature3Text:
      "Преврати поиск информации в понятный план подготовки.",
    disclaimer:
      "Esurpys предоставляет информационные материалы, а не юридические консультации. Иммиграционные требования различаются по странам и могут меняться. Всегда проверяй информацию по официальным государственным источникам.",
    footer: "Исследуй мир вместе с Esurpys.",
  },
} as const;

const navigation = [
  { href: "/", key: "navHome" },
  { href: "/navigator", key: "navNavigator" },
  { href: "/countries", key: "navCountries" },
  { href: "/about", key: "navAbout" },
] as const;

export default function HomePage() {
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

  const t = content[language];

  const cards = [
    {
      href: "/navigator",
      number: "01",
      icon: "◎",
      title: t.navigatorTitle,
      description: t.navigatorDescription,
      button: t.navigatorButton,
      featured: true,
    },
    {
      href: "/countries",
      number: "02",
      icon: "🌎",
      title: t.countriesTitle,
      description: t.countriesDescription,
      button: t.countriesButton,
      featured: false,
    },
    {
      href: "/about",
      number: "03",
      icon: "✳",
      title: t.aboutCardTitle,
      description: t.aboutCardDescription,
      button: t.aboutButton,
      featured: false,
    },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white">
      <header className="relative z-10 border-b border-white/10 bg-slate-950/90">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-5">
          <Link href="/" className="shrink-0 text-2xl font-bold tracking-tight">
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

      <section className="relative">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-32 -top-24 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute -left-32 top-52 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
        </div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 sm:py-28 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.24em] text-cyan-400">
              {t.eyebrow}
            </p>

            <h1 className="max-w-3xl text-5xl font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
              {t.title}
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
              {t.subtitle}
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="/navigator"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-6 py-3.5 font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                {t.primaryCta}
                <span aria-hidden="true">→</span>
              </a>

              <Link
                href="/countries"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/[0.03] px-6 py-3.5 font-semibold text-white transition hover:border-cyan-400/50 hover:bg-white/[0.06]"
              >
                {t.secondaryCta}
              </Link>
            </div>

            <p className="mt-6 text-sm text-slate-500">
              {language === "en"
                ? "Work · Study · Business · Family · More"
                : "Работа · Учёба · Бизнес · Семья · Другое"}
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute inset-0 rounded-[2rem] bg-cyan-400/10 blur-2xl" />

            <div className="relative rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-2xl sm:p-8">
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <p className="text-sm text-slate-400">
                    {language === "en"
                      ? "Your next chapter"
                      : "Твоя следующая глава"}
                  </p>
                  <h2 className="mt-1 text-xl font-semibold">
                    {language === "en"
                      ? "Explore your possibilities"
                      : "Изучи свои возможности"}
                  </h2>
                </div>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-2xl text-cyan-300">
                  ↗
                </span>
              </div>

              <div className="mt-5 space-y-3">
                {[
                  {
                    number: "01",
                    title:
                      language === "en"
                        ? "Tell us about yourself"
                        : "Расскажи о себе",
                    description:
                      language === "en"
                        ? "Your skills, experience and goals"
                        : "Твои навыки, опыт и цели",
                  },
                  {
                    number: "02",
                    title:
                      language === "en"
                        ? "Explore possible routes"
                        : "Изучи возможные маршруты",
                    description:
                      language === "en"
                        ? "Countries and immigration categories"
                        : "Страны и категории иммиграции",
                  },
                  {
                    number: "03",
                    title:
                      language === "en"
                        ? "Plan what comes next"
                        : "Спланируй следующие шаги",
                    description:
                      language === "en"
                        ? "Questions to answer and documents to prepare"
                        : "Что уточнить и какие документы подготовить",
                  },
                ].map((step) => (
                  <div
                    key={step.number}
                    className="flex items-start gap-4 rounded-2xl border border-white/5 bg-slate-950/70 p-4"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-sm font-bold text-cyan-300">
                      {step.number}
                    </span>
                    <div>
                      <h3 className="font-medium">{step.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-slate-400">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="/navigator"
                className="mt-5 flex w-full items-center justify-between rounded-xl border border-cyan-400/20 bg-cyan-400/5 px-4 py-3 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-400/10"
              >
                {t.navigatorButton}
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-slate-900/30">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">
              Esurpys
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              {t.aboutTitle}
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-400">
              {t.aboutText}
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              {
                number: "01",
                title: t.feature1Title,
                description: t.feature1Text,
              },
              {
                number: "02",
                title: t.feature2Title,
                description: t.feature2Text,
              },
              {
                number: "03",
                title: t.feature3Title,
                description: t.feature3Text,
              },
            ].map((feature) => (
              <div
                key={feature.number}
                className="rounded-2xl border border-white/10 bg-slate-950/60 p-6"
              >
                <p className="text-sm font-bold text-cyan-400">
                  {feature.number}
                </p>
                <h3 className="mt-5 text-xl font-semibold">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">
              {language === "en" ? "EXPLORE ESPURYS" : "ИЗУЧАЙ ESPURYS"}
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              {language === "en"
                ? "Where would you like to start?"
                : "С чего хочешь начать?"}
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-slate-400">
            {language === "en"
              ? "Choose a section to continue exploring your opportunities."
              : "Выбери раздел, чтобы продолжить изучение своих возможностей."}
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {cards.map((card) => (
            <a
              key={card.href}
              href={card.href}
              className={`group flex min-h-72 flex-col rounded-2xl border p-6 transition duration-200 hover:-translate-y-1 ${
                card.featured
                  ? "border-cyan-400/30 bg-cyan-400/[0.06] hover:border-cyan-400/60"
                  : "border-white/10 bg-slate-900/60 hover:border-white/20"
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl text-2xl ${
                    card.featured
                      ? "bg-cyan-400/10 text-cyan-300"
                      : "bg-white/5 text-slate-200"
                  }`}
                >
                  {card.icon}
                </span>
                <span className="text-sm font-semibold text-slate-500">
                  {card.number}
                </span>
              </div>

              <h3 className="mt-6 text-xl font-semibold">{card.title}</h3>

              <p className="mt-3 flex-1 text-sm leading-7 text-slate-400">
                {card.description}
              </p>

              <div className="mt-6 flex items-center justify-between text-sm font-semibold text-cyan-300">
                <span>{card.button}</span>
                <span className="transition group-hover:translate-x-1" aria-hidden="true">
                  →
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/10 bg-slate-900/30">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <Link href="/" className="text-xl font-bold tracking-tight">
              Esurpys<span className="text-cyan-400">.</span>
            </Link>

            <nav className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-slate-400">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="transition hover:text-cyan-300"
                >
                  {t[item.key]}
                </a>
              ))}
            </nav>
          </div>

          <p className="mt-6 max-w-4xl text-xs leading-6 text-slate-500">
            {t.disclaimer}
          </p>

          <p className="mt-4 text-xs text-slate-600">
            © {new Date().getFullYear()} Esurpys. {t.footer}
          </p>
        </div>
      </footer>
    </main>
  );
}