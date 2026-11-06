"use client";

import Link from "next/link";
import { useState } from "react";
import { countries } from "@/lib/countries";
import CountryFlag from "@/components/CountryFlag";
import EsurpysNavigation from "@/shared/EsurpysNavigation";
import { useLanguage } from "@/shared/LanguageProvider";

export default function CountriesPage() {
  const { language } = useLanguage();
  const [search, setSearch] = useState("");

  const query = search.trim().toLowerCase();

  const filteredCountries = countries.filter((country) => {
    const searchableText = [
      country.name.en,
      country.name.ru,
      country.region.en,
      country.region.ru,
      country.summary.en,
      country.summary.ru,
      ...country.categories.en,
      ...country.categories.ru,
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(query);
  });

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <EsurpysNavigation />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
          {language === "en" ? "Explore the world" : "Исследуй мир"}
        </p>

        <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl">
          {language === "en"
            ? "Find the country that fits your next chapter."
            : "Найди страну для своего следующего этапа жизни."}
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-400">
          {language === "en"
            ? "Compare countries for living, working, studying, business and relocation."
            : "Сравнивай страны для жизни, работы, учёбы, бизнеса и переезда."}
        </p>

        <div className="mt-10 max-w-2xl">
          <label
            htmlFor="country-search"
            className="mb-3 block text-sm font-medium text-slate-300"
          >
            {language === "en" ? "Search countries" : "Поиск стран"}
          </label>

          <input
            id="country-search"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={
              language === "en"
                ? "Try United States, Germany, study..."
                : "Например, США, Германия, учёба..."
            }
            className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-5 py-4 outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
          />
        </div>

        <div className="mt-12 flex items-end justify-between gap-4">
          <h2 className="text-2xl font-bold">
            {language === "en" ? "Countries" : "Страны"}
          </h2>

          <p className="text-sm text-slate-500">
            {filteredCountries.length}{" "}
            {language === "en" ? "countries" : "стран"}
          </p>
        </div>

        {filteredCountries.length > 0 ? (
          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredCountries.map((country) => (
              <article
                key={country.slug}
                className="flex flex-col rounded-3xl border border-slate-800 bg-slate-900/70 p-7 transition hover:-translate-y-1 hover:border-cyan-500/60"
              >
                <div className="flex items-start justify-between gap-4">
                  <CountryFlag
                    code={country.flag as "US" | "DE" | "GB" | "CA" | "AU" | "NL"}
                    name={country.name.en}
                    className="h-10 w-14 rounded-md ring-1 ring-white/10"
                  />

                  <span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-400">
                    {country.region[language]}
                  </span>
                </div>

                <h3 className="mt-6 text-2xl font-bold">
                  {country.name[language]}
                </h3>

                <p className="mt-3 flex-1 leading-7 text-slate-400">
                  {country.summary[language]}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {country.categories[language].map((category) => (
                    <span
                      key={category}
                      className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300"
                    >
                      {category}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/countries/${country.slug}`}
                  className="mt-7 inline-flex items-center justify-center rounded-full bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
                >
                  {language === "en" ? "Explore country" : "Изучить страну"}
                  <span className="ml-2" aria-hidden="true">
                    →
                  </span>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <p className="mt-8 rounded-2xl border border-slate-800 p-6 text-slate-400">
            {language === "en"
              ? "No countries found. Try another search."
              : "Страны не найдены. Попробуй другой запрос."}
          </p>
        )}
      </section>
    </main>
  );
}