"use client";

import Link from "next/link";
import EsurpysNavigation from "@/shared/EsurpysNavigation";
import CountryFlag from "@/components/CountryFlag";
import { useLanguage } from "@/shared/LanguageProvider";

const translations = {
  en: {
    badge: "ESURPYS · TEST CENTER",
    title: "Test Navigator",
    description:
      "Choose your destination and find the test that matches your goals. Explore international options or select a specific country.",
    international: "International",
    internationalTests: "International Tests",
    global: "GLOBAL",
    internationalDescription:
      "Explore international test options and discover opportunities beyond individual countries.",
    chooseCountry: "Choose a country",
    countryDescription:
      "Select a country to open its dedicated test page.",
    countriesAvailable: "countries available",
    footer: "ESURPYS · Select a destination to continue",
  },
  ru: {
    badge: "ESURPYS · ЦЕНТР ТЕСТИРОВАНИЯ",
    title: "Навигатор тестов",
    description:
      "Выберите направление и найдите подходящий тест. Изучите международные варианты или выберите конкретную страну.",
    international: "Международные тесты",
    internationalTests: "Международные тесты",
    global: "МИР",
    internationalDescription:
      "Изучайте международные тесты и возможности, доступные в разных странах.",
    chooseCountry: "Выберите страну",
    countryDescription:
      "Выберите страну, чтобы открыть страницу соответствующего теста.",
    countriesAvailable: "стран доступно",
    footer: "ESURPYS · Выберите направление, чтобы продолжить",
  },
} as const;

const countries = [
  {
    code: "US",
    flagCode: "US",
    href: "/us",
    name: {
      en: "United States",
      ru: "США",
    },
    subtitle: {
      en: "Explore tests for the United States",
      ru: "Тесты для Соединённых Штатов",
    },
  },
  {
    code: "UK",
    flagCode: "GB",
    href: "/uk",
    name: {
      en: "United Kingdom",
      ru: "Великобритания",
    },
    subtitle: {
      en: "Explore tests for the United Kingdom",
      ru: "Тесты для Великобритании",
    },
  },
  {
    code: "DE",
    flagCode: "DE",
    href: "/de",
    name: {
      en: "Germany",
      ru: "Германия",
    },
    subtitle: {
      en: "Explore tests for Germany",
      ru: "Тесты для Германии",
    },
  },
  {
    code: "AU",
    flagCode: "AU",
    href: "/au",
    name: {
      en: "Australia",
      ru: "Австралия",
    },
    subtitle: {
      en: "Explore tests for Australia",
      ru: "Тесты для Австралии",
    },
  },
  {
    code: "CA",
    flagCode: "CA",
    href: "/ca",
    name: {
      en: "Canada",
      ru: "Канада",
    },
    subtitle: {
      en: "Explore tests for Canada",
      ru: "Тесты для Канады",
    },
  },
  {
    code: "NL",
    flagCode: "NL",
    href: "/nl",
    name: {
      en: "Netherlands",
      ru: "Нидерланды",
    },
    subtitle: {
      en: "Explore tests for the Netherlands",
      ru: "Тесты для Нидерландов",
    },
  },
];

type FlagCode = "US" | "DE" | "GB" | "CA" | "AU" | "NL";

export default function NavigatorPage() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <main className="min-h-screen bg-[#080b14] text-white">
      <EsurpysNavigation />

      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
        {/* Header */}
        <header className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300">
            <span className="mr-2 h-2 w-2 rounded-full bg-blue-400" />
            {t.badge}
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {t.title}
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-400 sm:text-lg">
            {t.description}
          </p>
        </header>

        {/* International */}
        <section className="mb-14">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-6 w-1 rounded-full bg-blue-400" />
            <h2 className="text-2xl font-semibold">
              {t.international}
            </h2>
          </div>

          <Link
            href="/world-navigator"
            className="group relative block overflow-hidden rounded-3xl border border-blue-400/20 bg-gradient-to-r from-blue-950/80 via-[#111a30] to-[#101827] p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-950/30 sm:p-9"
          >
            <div className="pointer-events-none absolute -right-12 -top-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl transition group-hover:bg-blue-500/20" />

            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-5xl shadow-lg">
                🌍
              </div>

              <div className="flex-1">
                <div className="mb-2 flex flex-wrap items-center gap-3">
                  <h3 className="text-2xl font-bold sm:text-3xl">
                    {t.internationalTests}
                  </h3>

                  <span className="rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1 text-xs font-medium text-blue-300">
                    {t.global}
                  </span>
                </div>

                <p className="max-w-2xl leading-7 text-gray-400">
                  {t.internationalDescription}
                </p>
              </div>

              <div className="flex h-12 w-12 shrink-0 items-center justify-center self-start rounded-full border border-white/10 bg-white/5 text-2xl text-gray-300 transition group-hover:border-blue-400/40 group-hover:bg-blue-400/10 group-hover:text-blue-300 sm:self-center">
                →
              </div>
            </div>
          </Link>
        </section>

        {/* Countries */}
        <section>
          <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="h-6 w-1 rounded-full bg-purple-400" />
                <h2 className="text-2xl font-semibold">
                  {t.chooseCountry}
                </h2>
              </div>

              <p className="text-sm text-gray-400 sm:text-base">
                {t.countryDescription}
              </p>
            </div>

            <span className="text-sm text-gray-500">
              {countries.length} {t.countriesAvailable}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {countries.map((country) => (
              <Link
                key={country.code}
                href={country.href}
                className="group relative flex min-h-[190px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#101522] p-6 transition duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-[#151d2d] hover:shadow-xl hover:shadow-black/20"
              >
                <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/[0.025] transition group-hover:bg-blue-400/[0.07]" />

                <div className="relative flex items-start justify-between">
                  <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-inner transition group-hover:scale-105">
                    <CountryFlag
                      code={country.flagCode as FlagCode}
                      name={country.name.en}
                      className="h-10 w-14 rounded-md object-cover"
                    />
                  </div>

                  <span className="rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-xs font-semibold tracking-wider text-gray-500 transition group-hover:border-blue-400/20 group-hover:text-blue-300">
                    {country.code}
                  </span>
                </div>

                <div className="relative mt-5 flex flex-1 items-end justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold transition group-hover:text-blue-300">
                      {country.name[language]}
                    </h3>

                    <p className="mt-2 text-sm leading-5 text-gray-500">
                      {country.subtitle[language]}
                    </p>
                  </div>

                  <span className="mb-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-lg text-gray-400 transition group-hover:border-blue-400/30 group-hover:bg-blue-400/10 group-hover:text-blue-300">
                    →
                  </span>
                </div>

                <div
                  className="absolute bottom-0 left-0 h-[2px] w-0 bg-blue-400 transition-all duration-300 group-hover:w-full"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 border-t border-white/10 pt-6 text-center">
          <p className="text-sm text-gray-500">{t.footer}</p>
        </footer>
      </div>
    </main>
  );
}
