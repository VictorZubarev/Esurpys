"use client";

import Link from "next/link";
import EsurpysNavigation from "@/shared/EsurpysNavigation";
import { useLanguage } from "@/shared/LanguageProvider";

const content = {
  en: {
    badge: "ABOUT ESURPYS",
    title: "Technology for a world without borders.",
    intro:
      "Esurpys is an evolving digital platform designed to make international opportunities easier to understand, explore and navigate.",
    intro2:
      "Our goal is to bring useful information, practical digital tools and international resources together in one accessible environment.",

    missionLabel: "OUR MISSION",
    missionTitle: "Making global opportunities easier to navigate.",
    missionText:
      "Moving, studying, working or building a business in another country can be complicated. Information is often scattered across different websites, difficult to compare and not always easy to understand.",
    missionText2:
      "Esurpys aims to simplify this experience by organizing useful resources and creating tools that help people explore their options with greater clarity.",

    whatTitle: "What is Esurpys?",
    whatText:
      "Esurpys is a digital project focused on international information, country exploration and practical online tools. It is being developed as a connected platform where different services and resources can work together.",
    whatText2:
      "Rather than focusing on one narrow topic, the platform is designed to grow into a broader ecosystem of useful digital services.",

    directionsLabel: "OUR DIRECTIONS",
    directionsTitle: "What we are building",

    direction1Title: "International Navigator",
    direction1Text:
      "Explore countries, discover available opportunities and find relevant information about different destinations.",

    direction2Title: "Test Navigator",
    direction2Text:
      "Find international and country-specific tests through a structured navigation system that helps users choose the right direction.",

    direction3Title: "Country Information",
    direction3Text:
      "Discover information about countries, including living, working, studying, business and relocation-related topics.",

    direction4Title: "Digital Tools",
    direction4Text:
      "Develop practical online tools designed to make everyday digital tasks and access to information more convenient.",

    principlesLabel: "OUR PRINCIPLES",
    principlesTitle: "How we approach development",

    principle1Title: "Clarity",
    principle1Text:
      "Information should be structured, understandable and easy to navigate.",

    principle2Title: "Practical value",
    principle2Text:
      "We focus on tools and resources that solve real problems and provide meaningful value.",

    principle3Title: "Continuous improvement",
    principle3Text:
      "We develop the platform step by step, testing ideas and improving the experience over time.",

    principle4Title: "Global perspective",
    principle4Text:
      "We believe digital tools should help people explore opportunities beyond geographical borders.",

    developmentLabel: "DEVELOPMENT",
    developmentTitle: "A platform growing step by step.",
    developmentText:
      "Esurpys is currently in an active development stage. We are building the foundation of the platform, improving its structure and introducing features gradually.",
    developmentText2:
      "Not every planned feature is available yet. New sections and capabilities will be introduced as they are developed, tested and prepared for users.",

    futureTitle: "Looking ahead",
    futureText:
      "Our long-term vision is to develop Esurpys into a connected digital ecosystem that brings together international information, useful services and practical tools in one place.",
    futureText2:
      "We see Esurpys as a project that can evolve alongside the needs of its users and the opportunities created by an increasingly connected world.",

    ctaTitle: "Explore Esurpys",
    ctaText:
      "Discover the platform and explore the tools and information currently available.",
    ctaButton: "Explore the platform",
    back: "← Back to home",
    footer: "Building useful digital experiences, step by step.",
  },

  ru: {
    badge: "О ПРОЕКТЕ ESURPYS",
    title: "Технологии для мира без границ.",
    intro:
      "Esurpys — развивающаяся цифровая платформа, созданная для того, чтобы сделать международные возможности более понятными, доступными и удобными для изучения.",
    intro2:
      "Наша цель — объединить полезную информацию, практические цифровые инструменты и международные ресурсы в одной доступной среде.",

    missionLabel: "НАША МИССИЯ",
    missionTitle: "Помогаем ориентироваться в возможностях всего мира.",
    missionText:
      "Переезд, обучение, работа или развитие бизнеса в другой стране могут быть сложными задачами. Информация часто разбросана по разным сайтам, её трудно сравнивать, а некоторые темы непросто понять.",
    missionText2:
      "Esurpys стремится упростить этот процесс, систематизируя полезные ресурсы и создавая инструменты, которые помогают людям лучше ориентироваться в доступных возможностях.",

    whatTitle: "Что такое Esurpys?",
    whatText:
      "Esurpys — цифровой проект, ориентированный на международную информацию, изучение стран и практические онлайн-инструменты. Мы развиваем его как единую платформу, в которой разные сервисы и ресурсы смогут работать вместе.",
    whatText2:
      "Вместо концентрации на одной узкой теме платформа постепенно развивается в сторону более широкой экосистемы полезных цифровых сервисов.",

    directionsLabel: "НАШИ НАПРАВЛЕНИЯ",
    directionsTitle: "Что мы развиваем",

    direction1Title: "Международный навигатор",
    direction1Text:
      "Изучение стран, знакомство с доступными возможностями и поиск полезной информации о различных направлениях.",

    direction2Title: "Навигатор тестов",
    direction2Text:
      "Поиск международных и национальных тестов через структурированную систему навигации, помогающую выбрать подходящее направление.",

    direction3Title: "Информация о странах",
    direction3Text:
      "Изучение стран и информации о жизни, работе, образовании, бизнесе и возможностях переезда.",

    direction4Title: "Цифровые инструменты",
    direction4Text:
      "Разработка практических онлайн-инструментов, которые делают повседневные цифровые задачи и доступ к информации удобнее.",

    principlesLabel: "НАШИ ПРИНЦИПЫ",
    principlesTitle: "Как мы подходим к разработке",

    principle1Title: "Понятность",
    principle1Text:
      "Информация должна быть структурированной, доступной для понимания и удобной для поиска.",

    principle2Title: "Практическая польза",
    principle2Text:
      "Мы уделяем внимание инструментам и ресурсам, которые решают реальные задачи и приносят пользу.",

    principle3Title: "Постоянное развитие",
    principle3Text:
      "Мы развиваем платформу постепенно, проверяем идеи и постоянно улучшаем пользовательский опыт.",

    principle4Title: "Международный взгляд",
    principle4Text:
      "Мы считаем, что цифровые инструменты должны помогать людям находить возможности за пределами географических границ.",

    developmentLabel: "РАЗВИТИЕ ПРОЕКТА",
    developmentTitle: "Платформа, которая развивается шаг за шагом.",
    developmentText:
      "Сейчас Esurpys находится на активной стадии разработки. Мы создаём техническую основу платформы, улучшаем её структуру и постепенно добавляем новые возможности.",
    developmentText2:
      "Пока доступны не все запланированные функции. Новые разделы и инструменты будут появляться по мере их разработки, тестирования и подготовки к использованию.",

    futureTitle: "Наше видение будущего",
    futureText:
      "В долгосрочной перспективе мы видим Esurpys как единую цифровую экосистему, объединяющую международную информацию, полезные сервисы и практические инструменты в одном месте.",
    futureText2:
      "Мы хотим развивать Esurpys вместе с потребностями пользователей и возможностями, которые открывает всё более взаимосвязанный мир.",

    ctaTitle: "Откройте для себя Esurpys",
    ctaText:
      "Познакомьтесь с платформой и изучите инструменты и информацию, которые уже доступны.",
    ctaButton: "Перейти к платформе",
    back: "← Вернуться на главную",
    footer: "Создаём полезные цифровые решения шаг за шагом.",
  },
} as const;

const directions = [
  {
    icon: "🌍",
    title: "direction1Title",
    text: "direction1Text",
  },
  {
    icon: "🧭",
    title: "direction2Title",
    text: "direction2Text",
  },
  {
    icon: "🏙️",
    title: "direction3Title",
    text: "direction3Text",
  },
  {
    icon: "⚡",
    title: "direction4Title",
    text: "direction4Text",
  },
] as const;

const principles = [
  {
    number: "01",
    title: "principle1Title",
    text: "principle1Text",
  },
  {
    number: "02",
    title: "principle2Title",
    text: "principle2Text",
  },
  {
    number: "03",
    title: "principle3Title",
    text: "principle3Text",
  },
  {
    number: "04",
    title: "principle4Title",
    text: "principle4Text",
  },
] as const;

export default function AboutPage() {
  const { language } = useLanguage();
  const t = content[language];

  return (
    <main className="min-h-screen overflow-hidden bg-[#080b14] text-white">
      <EsurpysNavigation />

      {/* Hero */}
      <section className="relative border-b border-white/10">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-cyan-500/[0.08] blur-[120px]" />
        <div className="pointer-events-none absolute -left-40 top-40 h-[400px] w-[400px] rounded-full bg-blue-600/[0.07] blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8 sm:py-32">
          <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-cyan-400/20 bg-cyan-400/[0.07] px-4 py-2 text-xs font-semibold tracking-[0.2em] text-cyan-300">
            <span className="h-2 w-2 rounded-full bg-cyan-400" />
            {t.badge}
          </div>

          <h1 className="max-w-5xl text-5xl font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
            {t.title}
          </h1>

          <p className="mt-8 max-w-3xl text-xl leading-9 text-slate-300 sm:text-2xl">
            {t.intro}
          </p>

          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-500">
            {t.intro2}
          </p>

          <Link
            href="/"
            className="mt-10 inline-flex items-center rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-400/40 hover:bg-cyan-400/10"
          >
            {t.back}
          </Link>
        </div>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-7xl px-6 py-24 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="text-sm font-semibold tracking-[0.25em] text-cyan-400">
              {t.missionLabel}
            </p>

            <h2 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl">
              {t.missionTitle}
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-9 text-slate-400">
            <p>{t.missionText}</p>
            <p>{t.missionText2}</p>
          </div>
        </div>
      </section>

      {/* What is Esurpys */}
      <section className="border-y border-white/10 bg-[#0d1321]">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 sm:px-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold tracking-[0.25em] text-cyan-400">
              ESURPYS
            </p>

            <h2 className="mt-5 text-3xl font-bold sm:text-4xl">
              {t.whatTitle}
            </h2>

            <p className="mt-7 text-lg leading-9 text-slate-400">
              {t.whatText}
            </p>

            <p className="mt-5 leading-8 text-slate-500">
              {t.whatText2}
            </p>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-cyan-400/15 bg-gradient-to-br from-blue-950/70 via-[#111a30] to-[#101827] p-8 sm:p-12">
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />

            <div className="relative">
              <div className="text-6xl">🌐</div>

              <h3 className="mt-8 text-3xl font-bold">
                Esurpys<span className="text-cyan-400">.</span>
              </h3>

              <p className="mt-4 max-w-sm leading-8 text-slate-400">
                {t.intro2}
              </p>

              <div className="mt-10 h-px bg-white/10" />

              <div className="mt-6 flex items-center gap-3 text-sm text-cyan-300">
                <span className="h-2 w-2 rounded-full bg-cyan-400" />
                DIGITAL PLATFORM
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Directions */}
      <section className="mx-auto max-w-7xl px-6 py-24 sm:px-8">
        <p className="text-sm font-semibold tracking-[0.25em] text-cyan-400">
          {t.directionsLabel}
        </p>

        <h2 className="mt-5 text-3xl font-bold sm:text-4xl">
          {t.directionsTitle}
        </h2>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {directions.map((item, index) => (
            <article
              key={item.title}
              className="group rounded-3xl border border-white/10 bg-[#101522] p-8 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-[#131c2d]"
            >
              <div className="flex items-center justify-between">
                <span className="text-4xl">{item.icon}</span>
                <span className="text-sm font-semibold text-slate-600">
                  0{index + 1}
                </span>
              </div>

              <h3 className="mt-8 text-xl font-bold transition group-hover:text-cyan-300">
                {t[item.title]}
              </h3>

              <p className="mt-4 leading-8 text-slate-400">
                {t[item.text]}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Principles */}
      <section className="border-y border-white/10 bg-[#0d1321]">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:px-8">
          <p className="text-sm font-semibold tracking-[0.25em] text-cyan-400">
            {t.principlesLabel}
          </p>

          <h2 className="mt-5 text-3xl font-bold sm:text-4xl">
            {t.principlesTitle}
          </h2>

          <div className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {principles.map((item) => (
              <div
                key={item.number}
                className="border-t border-slate-700 pt-6"
              >
                <span className="text-sm font-semibold text-cyan-400">
                  {item.number}
                </span>

                <h3 className="mt-4 text-xl font-bold">
                  {t[item.title]}
                </h3>

                <p className="mt-3 leading-8 text-slate-400">
                  {t[item.text]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Development */}
      <section className="mx-auto max-w-7xl px-6 py-24 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold tracking-[0.25em] text-cyan-400">
              {t.developmentLabel}
            </p>

            <h2 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl">
              {t.developmentTitle}
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-9 text-slate-400">
            <p>{t.developmentText}</p>
            <p>{t.developmentText2}</p>
          </div>
        </div>
      </section>

      {/* Future */}
      <section className="border-y border-white/10 bg-[#0d1321]">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.25em] text-cyan-400">
              OUR VISION
            </p>

            <h2 className="mt-5 text-3xl font-bold sm:text-4xl">
              {t.futureTitle}
            </h2>

            <p className="mt-7 text-lg leading-9 text-slate-400">
              {t.futureText}
            </p>

            <p className="mt-5 leading-8 text-slate-500">
              {t.futureText2}
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-24 sm:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-blue-950/80 via-[#111a30] to-[#101827] px-8 py-16 text-center sm:px-16">
          <div className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative">
            <h2 className="text-3xl font-bold sm:text-4xl">
              {t.ctaTitle}
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-400">
              {t.ctaText}
            </p>

            <Link
              href="/"
              className="mt-9 inline-flex items-center rounded-full bg-cyan-400 px-8 py-4 font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              {t.ctaButton}
              <span className="ml-3" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center text-sm text-slate-500 sm:flex-row sm:text-left">
          <p>
            © {new Date().getFullYear()} Esurpys.
          </p>

          <p>{t.footer}</p>
        </div>
      </footer>
    </main>
  );
}