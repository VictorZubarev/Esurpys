"use client";

import { useMemo, useState } from "react";
import EsurpysNavigation from "@/shared/EsurpysNavigation";
import { useLanguage } from "@/shared/LanguageProvider";

type Answer = string;

type Option = {
  value: string;
  ru: string;
  en: string;
};

type Question = {
  id: string;
  ru: string;
  en: string;
  options: Option[];
};

type Country = {
  id: string;
  flag: string;
  ru: string;
  en: string;
  descriptionRu: string;
  descriptionEn: string;
  url: string;
  questions: string[];
  requirements?: Record<string, string[]>;
};

const questions: Question[] = [
  {
    id: "citizenship",
    ru: "Какое у вас гражданство?",
    en: "What is your citizenship?",
    options: [
      { value: "ru", ru: "🇷🇺 Россия", en: "🇷🇺 Russia" },
      { value: "ua", ru: "🇺🇦 Украина", en: "🇺🇦 Ukraine" },
      { value: "by", ru: "🇧🇾 Беларусь", en: "🇧🇾 Belarus" },
      { value: "kz", ru: "🇰🇿 Казахстан", en: "🇰🇿 Kazakhstan" },
      { value: "uz", ru: "🇺🇿 Узбекистан", en: "🇺🇿 Uzbekistan" },
      { value: "am", ru: "🇦🇲 Армения", en: "🇦🇲 Armenia" },
      { value: "az", ru: "🇦🇿 Азербайджан", en: "🇦🇿 Azerbaijan" },
      { value: "kg", ru: "🇰🇬 Кыргызстан", en: "🇰🇬 Kyrgyzstan" },
      { value: "md", ru: "🇲🇩 Молдова", en: "🇲🇩 Moldova" },
      { value: "tj", ru: "🇹🇯 Таджикистан", en: "🇹🇯 Tajikistan" },
      { value: "tm", ru: "🇹🇲 Туркменистан", en: "🇹🇲 Turkmenistan" },
      { value: "ge", ru: "🇬🇪 Грузия", en: "🇬🇪 Georgia" },
      { value: "eu", ru: "🇪🇺 Страна ЕС / ЕЭЗ", en: "🇪🇺 EU / EEA country" },
      { value: "uk", ru: "🇬🇧 Великобритания", en: "🇬🇧 United Kingdom" },
      { value: "us", ru: "🇺🇸 США", en: "🇺🇸 United States" },
      { value: "ca", ru: "🇨🇦 Канада", en: "🇨🇦 Canada" },
      { value: "other", ru: "🌍 Другая страна", en: "🌍 Another country" },
      { value: "unknown", ru: "Не хочу указывать", en: "Prefer not to say" },
    ],
  },
  {
    id: "age",
    ru: "Сколько вам лет?",
    en: "How old are you?",
    options: [
      { value: "under18", ru: "Младше 18 лет", en: "Under 18" },
      { value: "18-24", ru: "18–24 года", en: "18–24" },
      { value: "25-29", ru: "25–29 лет", en: "25–29" },
      { value: "30-35", ru: "30–35 лет", en: "30–35" },
      { value: "36-49", ru: "36–49 лет", en: "36–49" },
      { value: "50plus", ru: "50 лет и старше", en: "50 or older" },
      { value: "unknown", ru: "Предпочитаю не указывать", en: "Prefer not to say" },
    ],
  },
  {
    id: "residenceCountry",
    ru: "В какой стране вы сейчас живёте?",
    en: "Which country do you currently live in?",
    options: [
      { value: "ru", ru: "Россия", en: "Russia" },
      { value: "ua", ru: "Украина", en: "Ukraine" },
      { value: "by", ru: "Беларусь", en: "Belarus" },
      { value: "kz", ru: "Казахстан", en: "Kazakhstan" },
      { value: "uz", ru: "Узбекистан", en: "Uzbekistan" },
      { value: "am", ru: "Армения", en: "Armenia" },
      { value: "ge", ru: "Грузия", en: "Georgia" },
      { value: "cz", ru: "Чехия", en: "Czechia" },
      { value: "pl", ru: "Польша", en: "Poland" },
      { value: "otherEU", ru: "Другая страна ЕС / ЕЭЗ", en: "Another EU / EEA country" },
      { value: "uk", ru: "Великобритания", en: "United Kingdom" },
      { value: "other", ru: "Другая страна", en: "Another country" },
      { value: "unknown", ru: "Предпочитаю не указывать", en: "Prefer not to say" },
    ],
  },
  {
    id: "immigrationHistory",
    ru: "Были ли у вас раньше отказы в визе или проблемы с иммиграционными правилами?",
    en: "Have you ever had a visa refusal or immigration issues?",
    options: [
      { value: "none", ru: "Нет, такого не было", en: "No, never" },
      { value: "refusal", ru: "Был отказ в визе", en: "I have had a visa refusal" },
      { value: "entryRefusal", ru: "Мне отказывали во въезде", en: "I have been refused entry" },
      { value: "overstay", ru: "Превышал(а) срок пребывания", en: "I overstayed" },
      { value: "removed", ru: "Была депортация или выдворение", en: "I was deported or removed" },
      { value: "other", ru: "Другая ситуация", en: "Another situation" },
      { value: "unknown", ru: "Не уверен(а) / не хочу указывать", en: "Not sure / prefer not to say" },
    ],
  },
  {
    id: "goal",
    ru: "Какова ваша главная цель переезда?",
    en: "What is your main relocation goal?",
    options: [
      { value: "work", ru: "Работа", en: "Work" },
      { value: "study", ru: "Учёба", en: "Study" },
      { value: "business", ru: "Бизнес", en: "Business" },
      { value: "family", ru: "Воссоединение с семьёй", en: "Family reunification" },
      { value: "permanent", ru: "Постоянное проживание", en: "Permanent residence" },
      { value: "visit", ru: "Туризм или временный визит", en: "Tourism or temporary visit" },
    ],
  },
  {
    id: "job",
    ru: "Есть ли предложение о работе за рубежом?",
    en: "Do you have an overseas job offer?",
    options: [
      { value: "yes", ru: "Да, есть", en: "Yes" },
      { value: "possible", ru: "Веду переговоры", en: "In discussions" },
      { value: "no", ru: "Нет, ищу работу", en: "No, looking for work" },
      { value: "remote", ru: "Работаю удалённо", en: "I work remotely" },
    ],
  },
  {
    id: "education",
    ru: "Какое у вас образование?",
    en: "What is your education level?",
    options: [
      { value: "school", ru: "Среднее", en: "Secondary school" },
      { value: "bachelor", ru: "Бакалавриат", en: "Bachelor's degree" },
      { value: "master", ru: "Магистратура", en: "Master's degree" },
      { value: "doctorate", ru: "Докторская степень", en: "Doctorate" },
      { value: "vocational", ru: "Профессиональное образование", en: "Vocational qualification" },
    ],
  },
  {
    id: "language",
    ru: "Какой у вас уровень английского?",
    en: "What is your English level?",
    options: [
      { value: "none", ru: "Начальный или отсутствует", en: "Beginner or none" },
      { value: "basic", ru: "Базовый", en: "Basic" },
      { value: "intermediate", ru: "Средний", en: "Intermediate" },
      { value: "fluent", ru: "Продвинутый / свободный", en: "Advanced / fluent" },
      { value: "certificate", ru: "Есть языковой сертификат", en: "I have a language certificate" },
    ],
  },
  {
    id: "funds",
    ru: "Как обстоят дела с финансами?",
    en: "What is your financial situation?",
    options: [
      { value: "enough", ru: "Есть накопления на переезд", en: "I have relocation savings" },
      { value: "support", ru: "Есть финансовая поддержка", en: "I have financial support" },
      { value: "limited", ru: "Бюджет ограничен", en: "My budget is limited" },
      { value: "planning", ru: "Пока рассчитываю бюджет", en: "Still planning my budget" },
    ],
  },
  {
    id: "study",
    ru: "Есть ли предложение о зачислении в зарубежный вуз?",
    en: "Do you have an offer from an overseas university?",
    options: [
      { value: "yes", ru: "Да, зачисление подтверждено", en: "Yes, admission confirmed" },
      { value: "applying", ru: "Подаю документы", en: "Applying" },
      { value: "no", ru: "Нет", en: "No" },
      { value: "notgoal", ru: "Учёба не является моей целью", en: "Study is not my goal" },
    ],
  },
  {
    id: "family",
    ru: "Есть ли у вас близкие родственники в стране назначения?",
    en: "Do you have close relatives in the destination country?",
    options: [
      { value: "yes", ru: "Да, супруг или близкий родственник", en: "Yes, a spouse or close relative" },
      { value: "partner", ru: "Есть партнёр", en: "I have a partner" },
      { value: "no", ru: "Нет", en: "No" },
    ],
  },
  {
    id: "experience",
    ru: "Какой у вас профессиональный опыт?",
    en: "What is your professional experience?",
    options: [
      { value: "none", ru: "Пока нет опыта", en: "No experience yet" },
      { value: "junior", ru: "До 2 лет", en: "Under 2 years" },
      { value: "experienced", ru: "2–5 лет", en: "2–5 years" },
      { value: "senior", ru: "Более 5 лет", en: "Over 5 years" },
    ],
  },
  {
    id: "duration",
    ru: "На какой срок вы планируете переезд?",
    en: "How long do you plan to stay?",
    options: [
      { value: "temporary", ru: "До года", en: "Under one year" },
      { value: "medium", ru: "1–3 года", en: "1–3 years" },
      { value: "long", ru: "Более 3 лет", en: "Over 3 years" },
      { value: "permanent", ru: "Хочу остаться постоянно", en: "I want to settle permanently" },
    ],
  },
];

const countries: Country[] = [
  {
    id: "canada",
    flag: "🇨🇦",
    ru: "Канада",
    en: "Canada",
    descriptionRu: "Рабочие программы, Express Entry, учёба и семейное спонсорство.",
    descriptionEn: "Skilled-worker programs, Express Entry, study and family sponsorship.",
    url: "https://www.canada.ca/en/immigration-refugees-citizenship.html",
    questions: ["goal", "job", "education", "language", "funds", "family", "experience", "duration"],
    requirements: {
      work: ["job", "experience", "language"],
      study: ["study", "funds"],
      family: ["family"],
      permanent: ["education", "language", "experience", "funds"],
    },
  },
  {
    id: "australia",
    flag: "🇦🇺",
    ru: "Австралия",
    en: "Australia",
    descriptionRu: "Рабочие и квалификационные визы, учёба и семейные маршруты.",
    descriptionEn: "Skilled and employer-sponsored visas, study and family routes.",
    url: "https://immi.homeaffairs.gov.au/",
    questions: ["goal", "job", "education", "language", "funds", "family", "experience", "duration"],
    requirements: {
      work: ["education", "language", "experience"],
      study: ["study", "funds"],
      family: ["family"],
      permanent: ["education", "language", "experience", "funds"],
    },
  },
  {
    id: "new-zealand",
    flag: "🇳🇿",
    ru: "Новая Зеландия",
    en: "New Zealand",
    descriptionRu: "Квалифицированная работа, учёба и варианты для семей.",
    descriptionEn: "Skilled employment, study and family visa options.",
    url: "https://www.immigration.govt.nz/",
    questions: ["goal", "job", "education", "language", "funds", "family", "experience", "duration"],
    requirements: {
      work: ["job", "education", "language", "experience"],
      study: ["study", "funds"],
      family: ["family"],
    },
  },
  {
    id: "germany",
    flag: "🇩🇪",
    ru: "Германия",
    en: "Germany",
    descriptionRu: "Работа для квалифицированных специалистов, обучение и профессиональные возможности.",
    descriptionEn: "Skilled employment, education and professional opportunities.",
    url: "https://www.make-it-in-germany.com/en/",
    questions: ["goal", "job", "education", "language", "funds", "family", "experience", "duration"],
    requirements: {
      work: ["education", "experience"],
      study: ["study", "funds"],
      family: ["family"],
    },
  },
  {
    id: "ireland",
    flag: "🇮🇪",
    ru: "Ирландия",
    en: "Ireland",
    descriptionRu: "Рабочие разрешения, обучение и семейные варианты.",
    descriptionEn: "Employment permits, study and family options.",
    url: "https://www.irishimmigration.ie/",
    questions: ["goal", "job", "education", "language", "funds", "family", "experience", "duration"],
    requirements: {
      work: ["job", "experience", "language"],
      study: ["study", "funds"],
      family: ["family"],
    },
  },
  {
    id: "netherlands",
    flag: "🇳🇱",
    ru: "Нидерланды",
    en: "Netherlands",
    descriptionRu: "Работа, учёба и проживание при выполнении требований к конкретному разрешению.",
    descriptionEn: "Work, study and residence under the relevant permit conditions.",
    url: "https://ind.nl/en",
    questions: ["goal", "job", "education", "language", "funds", "family", "experience", "duration"],
    requirements: {
      work: ["job", "experience"],
      study: ["study", "funds"],
      family: ["family"],
    },
  },
  {
    id: "usa",
    flag: "🇺🇸",
    ru: "США",
    en: "United States",
    descriptionRu: "Рабочие, учебные, семейные и иммиграционные категории.",
    descriptionEn: "Employment, study, family and immigrant visa categories.",
    url: "https://www.uscis.gov/",
    questions: ["goal", "job", "education", "language", "funds", "family", "experience", "duration"],
    requirements: {
      work: ["job", "experience"],
      study: ["study", "funds"],
      family: ["family"],
    },
  },
  {
    id: "uk",
    flag: "🇬🇧",
    ru: "Великобритания",
    en: "United Kingdom",
    descriptionRu: "Рабочие, учебные, семейные и другие визовые маршруты.",
    descriptionEn: "Work, study, family and other immigration routes.",
    url: "https://www.gov.uk/browse/visas-immigration",
    questions: ["goal", "job", "education", "language", "funds", "family", "experience", "duration"],
    requirements: {
      work: ["job", "experience"],
      study: ["study", "funds"],
      family: ["family"],
    },
  },
];

function calculateScore(
  country: Country,
  answers: Record<string, Answer>
) {
  const goal = answers.goal;

  const relevant = country.questions.filter((id) => {
    if (id === "study" && goal !== "study") return false;
    if (id === "family" && goal !== "family") return false;
    return true;
  });

  const answered = relevant.filter((id) => answers[id]);
  const matched: string[] = [];
  const missing: string[] = [];
  const unknown: string[] = [];

  if (answered.length === 0) {
    return { percent: 0, matched, missing, unknown };
  }

  let earned = 0;

  for (const id of answered) {
    const value = answers[id];

    if (id === "goal") {
      earned += 1;
      matched.push(id);
      continue;
    }

    if (id === "citizenship") {
      if (value === "unknown") {
        earned += 0.5;
        unknown.push(id);
      } else {
        earned += 1;
        matched.push(id);
      }
      continue;
    }

    if (value === "unknown" || value === "planning" || value === "possible") {
      earned += 0.5;
      unknown.push(id);
      continue;
    }

    const needed = country.requirements?.[goal] ?? [];

    if (needed.includes(id)) {
      if (
        (id === "job" && value === "yes") ||
        (id === "study" && value === "yes") ||
        (id === "family" && ["yes", "partner"].includes(value)) ||
        (id === "education" && ["bachelor", "master", "doctorate", "vocational"].includes(value)) ||
        (id === "language" && ["intermediate", "fluent", "certificate"].includes(value)) ||
        (id === "funds" && ["enough", "support"].includes(value)) ||
        (id === "experience" && ["experienced", "senior"].includes(value))
      ) {
        earned += 1;
        matched.push(id);
      } else if (["applying", "possible", "support", "remote"].includes(value)) {
        earned += 0.6;
        unknown.push(id);
      } else {
        earned += 0.2;
        missing.push(id);
      }
    } else {
      earned += 0.7;
      matched.push(id);
    }
  }

  return {
    percent: Math.round((earned / answered.length) * 100),
    matched,
    missing,
    unknown,
  };
}

export default function WorldNavigatorPage() {
  const { language: lang } = useLanguage();

  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [showAll, setShowAll] = useState(false);

  const t = (ru: string, en: string) =>
    lang === "ru" ? ru : en;

  const results = useMemo(
    () =>
      countries
        .map((country) => ({
          ...country,
          result: calculateScore(country, answers),
        }))
        .sort((a, b) => b.result.percent - a.result.percent),
    [answers]
  );

  const shownResults = showAll ? results : results.slice(0, 6);

  function setAnswer(id: string, value: string) {
    setAnswers((previous) => {
      if (!value) {
        const next = { ...previous };
        delete next[id];
        return next;
      }

      return { ...previous, [id]: value };
    });
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <EsurpysNavigation />

      <section className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
        <div className="mb-8 rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-950 via-slate-900 to-cyan-950 p-6 shadow-xl sm:p-10">
          <div className="mb-3 text-5xl" aria-hidden="true">
            🌍
          </div>

          <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
            {t("Международный навигатор", "International navigator")}
          </p>

          <h1 className="mt-3 max-w-3xl text-3xl font-bold text-white sm:text-4xl">
            {t(
              "Найдите страну для следующего этапа жизни",
              "Find a country for your next chapter"
            )}
          </h1>

          <p className="mt-4 max-w-3xl leading-7 text-slate-200">
            {t(
              "Ответьте на вопросы, чтобы сравнить страны по вашим целям, опыту, образованию и ресурсам.",
              "Answer a few questions to compare countries against your goals, experience, education and resources."
            )}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white">
              {t(
                `Отвечено: ${Object.keys(answers).length} из ${questions.length}`,
                `Answered: ${Object.keys(answers).length} of ${questions.length}`
              )}
            </span>

            <button
              type="button"
              onClick={() => {
                setAnswers({});
                setShowAll(false);
              }}
              className="rounded-full border border-slate-500 bg-slate-900/60 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-red-400 hover:bg-red-600 hover:text-white"
            >
              {t("Очистить ответы", "Reset answers")}
            </button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="space-y-5">
            <div>
              <h2 className="text-2xl font-bold text-white">
                {t("Ваш профиль", "Your profile")}
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                {t(
                  "Выбирайте ответы — результаты справа обновятся автоматически.",
                  "Choose your answers and the results will update automatically."
                )}
              </p>
            </div>

            {questions.map((question, index) => (
              <div
                key={question.id}
                className="rounded-2xl border border-slate-700 bg-slate-900 p-4 shadow-lg transition-colors hover:border-blue-500 sm:p-5"
              >
                <label
                  htmlFor={`answer-${question.id}`}
                  className="mb-3 flex items-start gap-3 text-sm font-semibold leading-6 text-slate-100 sm:text-base"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/20 text-xs font-bold text-blue-300">
                    {index + 1}
                  </span>

                  <span>
                    {lang === "ru" ? question.ru : question.en}
                  </span>
                </label>

                <select
                  id={`answer-${question.id}`}
                  value={answers[question.id] ?? ""}
                  onChange={(event) =>
                    setAnswer(question.id, event.target.value)
                  }
                  className="w-full cursor-pointer rounded-xl border border-slate-600 bg-slate-800 px-4 py-3 text-sm text-white outline-none transition hover:border-blue-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30"
                >
                  <option value="" className="bg-slate-800">
                    {t("Выберите ответ...", "Select an answer...")}
                  </option>

                  {question.options.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      className="bg-slate-800 text-white"
                    >
                      {lang === "ru" ? option.ru : option.en}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </section>

          <aside className="space-y-5 lg:sticky lg:top-5 lg:self-start">
            <div>
              <h2 className="text-2xl font-bold text-white">
                {t("Результаты", "Results")}
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                {t(
                  "Предварительное совпадение с вашим профилем.",
                  "Preliminary match with your profile."
                )}
              </p>
            </div>

            {shownResults.map((country) => {
              const result = country.result;

              return (
                <article
                  key={country.id}
                  className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-lg transition-colors hover:border-slate-500"
                >
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-bold leading-6 text-white">
                          <span className="mr-2">{country.flag}</span>
                          {lang === "ru" ? country.ru : country.en}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-slate-300">
                          {lang === "ru"
                            ? country.descriptionRu
                            : country.descriptionEn}
                        </p>
                      </div>

                      <div className="min-w-[65px] text-right">
                        <div className="text-2xl font-bold text-blue-300">
                          {result.percent}%
                        </div>

                        <div className="text-xs text-slate-400">
                          {t("совпадение", "match")}
                        </div>
                      </div>
                    </div>

                    <div
                      className="mt-4 h-2 overflow-hidden rounded-full bg-slate-700"
                      role="progressbar"
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={result.percent}
                    >
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300"
                        style={{ width: `${result.percent}%` }}
                      />
                    </div>

                    <div className="mt-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4">
                      <p className="text-sm font-bold text-emerald-300">
                        {t("Совпадения", "Positive matches")}
                      </p>

                      <p className="mt-2 text-sm leading-6 text-emerald-100">
                        {result.matched.length
                          ? result.matched
                              .map((id) => {
                                const question = questions.find(
                                  (item) => item.id === id
                                );

                                return question
                                  ? lang === "ru"
                                    ? question.ru
                                    : question.en
                                  : id;
                              })
                              .join("; ")
                          : t("Пока не определены", "None identified yet")}
                      </p>
                    </div>

                    <div className="mt-3 rounded-xl border border-amber-400/40 bg-amber-400/10 p-4">
                      <p className="text-sm font-bold text-amber-300">
                        {t("Что уточнить", "What to clarify")}
                      </p>

                      <p className="mt-2 text-sm leading-6 text-amber-100">
                        {[...result.missing, ...result.unknown].length
                          ? [
                              ...new Set([
                                ...result.missing,
                                ...result.unknown,
                              ]),
                            ]
                              .map((id) => {
                                const question = questions.find(
                                  (item) => item.id === id
                                );

                                return question
                                  ? lang === "ru"
                                    ? question.ru
                                    : question.en
                                  : id;
                              })
                              .join("; ")
                          : t(
                              "Пока нет дополнительных замечаний",
                              "No additional items identified"
                            )}
                      </p>
                    </div>

                    <a
                      href={country.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-flex w-full items-center justify-center rounded-xl border border-blue-400/30 bg-blue-600 px-4 py-3 text-center text-sm font-bold text-white transition-colors hover:border-blue-300 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      {t("Официальный сайт", "Official website")} ↗
                    </a>
                  </div>
                </article>
              );
            })}

            {!showAll && results.length > 6 && (
              <button
                type="button"
                onClick={() => setShowAll(true)}
                className="w-full rounded-xl border border-slate-600 bg-slate-800 px-4 py-3 font-semibold text-slate-100 transition-colors hover:border-blue-400 hover:bg-blue-600 hover:text-white"
              >
                {t("Показать все страны", "Show all countries")}
              </button>
            )}

            {showAll && (
              <button
                type="button"
                onClick={() => setShowAll(false)}
                className="w-full rounded-xl border border-slate-600 bg-slate-800 px-4 py-3 font-semibold text-slate-100 transition-colors hover:border-blue-400 hover:bg-blue-600 hover:text-white"
              >
                {t("Показать меньше", "Show fewer")}
              </button>
            )}

            <div className="rounded-2xl border border-amber-400/40 bg-amber-400/10 p-5 text-sm leading-6 text-amber-100">
              <h3 className="font-bold text-amber-300">
                {t("Важно", "Important")}
              </h3>

              <p className="mt-2">
                {t(
                  "Проценты — ориентировочная оценка по вашим ответам, а не вероятность получения визы. Условия зависят от гражданства, конкретной программы, документов и действующих правил.",
                  "Scores are rough matches based on your answers, not the probability of getting a visa. Eligibility depends on citizenship, the specific program, documents and current rules."
                )}
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}