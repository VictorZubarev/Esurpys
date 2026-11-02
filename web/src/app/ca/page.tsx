"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import EsurpysNavigation from "@/shared/EsurpysNavigation";
import { useLanguage } from "@/shared/LanguageProvider";

type Answers = Record<string, string>;

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

type Route = {
  id: string;
  emoji: string;
  title: string;
  enTitle: string;
  visa: string;
  desc: string;
  enDesc: string;
  link: string;
  requirements: string;
  enRequirements: string;
  goals: string[];
};

const citizenshipOptions: Option[] = [
  { value: "ru", ru: "🇷🇺 Россия", en: "🇷🇺 Russia" },
  { value: "ua", ru: "🇺🇦 Украина", en: "🇺🇦 Ukraine" },
  { value: "by", ru: "🇧🇾 Беларусь", en: "🇧🇾 Belarus" },
  { value: "kz", ru: "🇰🇿 Казахстан", en: "🇰🇿 Kazakhstan" },
  { value: "uz", ru: "🇺🇿 Узбекистан", en: "🇺🇿 Uzbekistan" },
  { value: "am", ru: "🇦🇲 Армения", en: "🇦🇲 Armenia" },
  { value: "ge", ru: "🇬🇪 Грузия", en: "🇬🇪 Georgia" },
  { value: "ca", ru: "🇨🇦 Канада", en: "🇨🇦 Canada" },
  { value: "ad", ru: "Андорра", en: "Andorra" },
  { value: "au", ru: "Австралия", en: "Australia" },
  { value: "at", ru: "Австрия", en: "Austria" },
  { value: "be", ru: "Бельгия", en: "Belgium" },
  { value: "br", ru: "Бразилия", en: "Brazil" },
  { value: "cl", ru: "Чили", en: "Chile" },
  { value: "hr", ru: "Хорватия", en: "Croatia" },
  { value: "cz", ru: "Чехия", en: "Czechia" },
  { value: "dk", ru: "Дания", en: "Denmark" },
  { value: "ee", ru: "Эстония", en: "Estonia" },
  { value: "fi", ru: "Финляндия", en: "Finland" },
  { value: "fr", ru: "Франция", en: "France" },
  { value: "de", ru: "Германия", en: "Germany" },
  { value: "gr", ru: "Греция", en: "Greece" },
  { value: "hk", ru: "Гонконг", en: "Hong Kong" },
  { value: "hu", ru: "Венгрия", en: "Hungary" },
  { value: "is", ru: "Исландия", en: "Iceland" },
  { value: "ie", ru: "Ирландия", en: "Ireland" },
  { value: "il", ru: "Израиль", en: "Israel" },
  { value: "it", ru: "Италия", en: "Italy" },
  { value: "jp", ru: "Япония", en: "Japan" },
  { value: "lv", ru: "Латвия", en: "Latvia" },
  { value: "li", ru: "Лихтенштейн", en: "Liechtenstein" },
  { value: "lt", ru: "Литва", en: "Lithuania" },
  { value: "lu", ru: "Люксембург", en: "Luxembourg" },
  { value: "mt", ru: "Мальта", en: "Malta" },
  { value: "mx", ru: "Мексика", en: "Mexico" },
  { value: "mc", ru: "Монако", en: "Monaco" },
  { value: "nl", ru: "Нидерланды", en: "Netherlands" },
  { value: "nz", ru: "Новая Зеландия", en: "New Zealand" },
  { value: "no", ru: "Норвегия", en: "Norway" },
  { value: "pl", ru: "Польша", en: "Poland" },
  { value: "pt", ru: "Португалия", en: "Portugal" },
  { value: "qa", ru: "Катар", en: "Qatar" },
  { value: "sg", ru: "Сингапур", en: "Singapore" },
  { value: "sk", ru: "Словакия", en: "Slovakia" },
  { value: "si", ru: "Словения", en: "Slovenia" },
  { value: "kr", ru: "Южная Корея", en: "South Korea" },
  { value: "es", ru: "Испания", en: "Spain" },
  { value: "se", ru: "Швеция", en: "Sweden" },
  { value: "ch", ru: "Швейцария", en: "Switzerland" },
  { value: "tw", ru: "Тайвань", en: "Taiwan" },
  { value: "uk", ru: "Великобритания", en: "United Kingdom" },
  { value: "us", ru: "США", en: "United States" },
  { value: "other", ru: "Другая страна", en: "Another country" },
  { value: "unknown", ru: "Не хочу указывать", en: "Prefer not to say" },
];

const questions: Question[] = [
  {
    id: "goal",
    ru: "Какова ваша главная цель?",
    en: "What is your main goal?",
    options: [
      { value: "work", ru: "Работа в Канаде", en: "Work in Canada" },
      { value: "study", ru: "Учёба", en: "Study" },
      { value: "business", ru: "Бизнес или инвестиции", en: "Business or investment" },
      { value: "family", ru: "Переезд к семье или партнёру", en: "Join family or partner" },
      { value: "permanent", ru: "Постоянное проживание (ПМЖ)", en: "Permanent residence" },
      { value: "visit", ru: "Туризм, гости или деловая поездка", en: "Tourism, visiting or business trip" },
      { value: "exchange", ru: "Обменная программа или молодёжная мобильность", en: "Exchange or youth mobility program" },
      { value: "protection", ru: "Поиск защиты от преследования", en: "Seeking protection from persecution" },
      { value: "unsure", ru: "Пока не определился(-ась)", en: "Not sure yet" },
    ],
  },
  {
    id: "citizenship",
    ru: "Какое у вас гражданство по паспорту, с которым планируете поездку?",
    en: "What is the nationality of the passport you plan to travel with?",
    options: citizenshipOptions,
  },
  {
    id: "birthCountry",
    ru: "В какой стране вы родились?",
    en: "Which country were you born in?",
    options: [
      { value: "ru", ru: "Россия", en: "Russia" },
      { value: "ua", ru: "Украина", en: "Ukraine" },
      { value: "by", ru: "Беларусь", en: "Belarus" },
      { value: "kz", ru: "Казахстан", en: "Kazakhstan" },
      { value: "uz", ru: "Узбекистан", en: "Uzbekistan" },
      { value: "in", ru: "Индия", en: "India" },
      { value: "cn", ru: "Китай", en: "China" },
      { value: "mx", ru: "Мексика", en: "Mexico" },
      { value: "ca", ru: "Канада", en: "Canada" },
      { value: "other", ru: "Другая страна", en: "Another country" },
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
      { value: "36-44", ru: "36–44 года", en: "36–44" },
      { value: "45plus", ru: "45 лет и старше", en: "45 or older" },
      { value: "unknown", ru: "Не хочу указывать", en: "Prefer not to say" },
    ],
  },
  {
    id: "residence",
    ru: "В какой стране вы сейчас живёте?",
    en: "Which country do you currently live in?",
    options: [
      { value: "ru", ru: "Россия", en: "Russia" },
      { value: "ua", ru: "Украина", en: "Ukraine" },
      { value: "by", ru: "Беларусь", en: "Belarus" },
      { value: "kz", ru: "Казахстан", en: "Kazakhstan" },
      { value: "cz", ru: "Чехия", en: "Czechia" },
      { value: "pl", ru: "Польша", en: "Poland" },
      { value: "uk", ru: "Великобритания", en: "United Kingdom" },
      { value: "otherEU", ru: "Другая страна ЕС / ЕЭЗ", en: "Another EU / EEA country" },
      { value: "ca", ru: "Канада", en: "Canada" },
      { value: "us", ru: "США", en: "United States" },
      { value: "other", ru: "Другая страна", en: "Another country" },
      { value: "unknown", ru: "Не хочу указывать", en: "Prefer not to say" },
    ],
  },
  {
    id: "english",
    ru: "Какой у вас уровень английского?",
    en: "What is your English level?",
    options: [
      { value: "basic", ru: "Начальный", en: "Basic" },
      { value: "intermediate", ru: "Средний", en: "Intermediate" },
      { value: "advanced", ru: "Продвинутый", en: "Advanced" },
      { value: "native", ru: "Свободный / родной", en: "Fluent / native" },
      { value: "unknown", ru: "Пока не знаю", en: "Not sure" },
    ],
  },
  {
    id: "education",
    ru: "Какое у вас образование?",
    en: "What is your education?",
    options: [
      { value: "school", ru: "Среднее образование", en: "High school" },
      { value: "bachelor", ru: "Бакалавриат / специалист", en: "Bachelor's degree" },
      { value: "master", ru: "Магистратура или выше", en: "Master's degree or higher" },
      { value: "vocational", ru: "Профессиональное / техническое образование", en: "Vocational or technical education" },
      { value: "none", ru: "Нет законченного образования", en: "No completed qualification" },
    ],
  },
  {
    id: "workExperience",
    ru: "Какой у вас профессиональный опыт?",
    en: "What is your professional experience?",
    options: [
      { value: "none", ru: "Нет значимого опыта", en: "No significant experience" },
      { value: "under1", ru: "Менее 1 года", en: "Less than 1 year" },
      { value: "under3", ru: "От 1 года до 2 лет", en: "1–2 years" },
      { value: "3plus", ru: "3 года и более", en: "3 years or more" },
      { value: "canadian", ru: "Есть квалифицированный опыт работы в Канаде", en: "I have skilled Canadian work experience" },
      { value: "specialist", ru: "Высококвалифицированная специальность", en: "Highly specialized occupation" },
      { value: "manager", ru: "Руководитель или менеджер", en: "Executive or manager" },
      { value: "trade", ru: "Рабочая / техническая специальность", en: "Skilled trade or technical occupation" },
      { value: "research", ru: "Научная или исследовательская деятельность", en: "Academic or research experience" },
    ],
  },
  {
    id: "jobOffer",
    ru: "Есть ли предложение работы от работодателя в Канаде?",
    en: "Do you have a job offer from a Canadian employer?",
    options: [
      { value: "yes", ru: "Да", en: "Yes" },
      { value: "no", ru: "Нет", en: "No" },
      { value: "maybe", ru: "Веду переговоры", en: "In discussion" },
    ],
  },
  {
    id: "sponsor",
    ru: "Готов ли работодатель поддержать оформление разрешения на работу, если это потребуется?",
    en: "Is the employer willing to support a work permit process if required?",
    options: [
      { value: "yes", ru: "Да", en: "Yes" },
      { value: "no", ru: "Нет", en: "No" },
      { value: "unknown", ru: "Не знаю", en: "Not sure" },
      { value: "na", ru: "Нет предложения работы", en: "No job offer" },
    ],
  },
  {
    id: "studentOffer",
    ru: "Есть ли зачисление или предложение от учебного заведения Канады?",
    en: "Have you been accepted by a Canadian school or university?",
    options: [
      { value: "yes", ru: "Да", en: "Yes" },
      { value: "no", ru: "Нет", en: "No" },
      { value: "applying", ru: "Планирую подать документы", en: "Planning to apply" },
    ],
  },
  {
    id: "exchangeOffer",
    ru: "Подходите ли вы для обменной программы или International Experience Canada (IEC)?",
    en: "Could you qualify for an exchange program or International Experience Canada (IEC)?",
    options: [
      { value: "yes", ru: "Есть приглашение или я проверил(-а), что моя страна участвует", en: "I have an offer or checked that my country participates" },
      { value: "no", ru: "Нет", en: "No" },
      { value: "unknown", ru: "Не знаю, участвует ли моя страна", en: "Not sure whether my country participates" },
    ],
  },
  {
    id: "familyUS",
    ru: "Есть ли у вас близкий родственник или партнёр в Канаде?",
    en: "Do you have a close relative or partner in Canada?",
    options: [
      { value: "citizen", ru: "Подходящий родственник — гражданин Канады", en: "An eligible relative is a Canadian citizen" },
      { value: "resident", ru: "Подходящий родственник имеет статус постоянного жителя Канады", en: "An eligible relative is a Canadian permanent resident" },
      { value: "spouse", ru: "Супруг(-а) или партнёр — гражданин или постоянный житель Канады", en: "Spouse or partner is a Canadian citizen or permanent resident" },
      { value: "other", ru: "Есть другие родственники в Канаде", en: "I have other relatives in Canada" },
      { value: "no", ru: "Нет", en: "No" },
      { value: "unknown", ru: "Не уверен(-а)", en: "Not sure" },
    ],
  },
  {
    id: "achievements",
    ru: "Есть ли выдающиеся профессиональные достижения?",
    en: "Do you have notable professional achievements?",
    options: [
      { value: "strong", ru: "Да: крупные награды, публикации, признание или значимые достижения", en: "Yes: major awards, publications, recognition or significant achievements" },
      { value: "some", ru: "Есть достижения, но не знаю, помогут ли они", en: "Some achievements, but unsure how they may help" },
      { value: "no", ru: "Нет", en: "No" },
    ],
  },
  {
    id: "business",
    ru: "Каковы ваши планы в отношении бизнеса или инвестиций?",
    en: "What are your business or investment plans?",
    options: [
      { value: "large", ru: "Есть значительный капитал для инвестиций", en: "I have substantial investment capital" },
      { value: "some", ru: "Есть небольшой капитал или бизнес-план", en: "I have some capital or a business plan" },
      { value: "company", ru: "У меня есть компания за пределами Канады", en: "I own or work for a company outside Canada" },
      { value: "startup", ru: "Хочу открыть или развивать инновационный бизнес", en: "I want to start or grow an innovative business" },
      { value: "no", ru: "Не планирую бизнес или инвестиции", en: "No business or investment plans" },
    ],
  },
  {
    id: "visitPurpose",
    ru: "Что вы планируете делать во время краткой поездки?",
    en: "What do you plan to do during a temporary visit?",
    options: [
      { value: "tourism", ru: "Туризм, отдых, посещение друзей или семьи", en: "Tourism, vacation, visiting friends or family" },
      { value: "business", ru: "Деловые встречи или конференция без трудоустройства", en: "Business meetings or a conference without employment" },
      { value: "medical", ru: "Получение медицинской помощи", en: "Medical treatment" },
      { value: "transit", ru: "Транзит через Канаду", en: "Transit through Canada" },
      { value: "other", ru: "Другая цель", en: "Another purpose" },
    ],
  },
  {
    id: "visitDuration",
    ru: "Как долго планируете находиться в Канаде?",
    en: "How long do you plan to stay in Canada?",
    options: [
      { value: "under6", ru: "До 6 месяцев", en: "Up to 6 months" },
      { value: "over6", ru: "Более 6 месяцев", en: "More than 6 months" },
      { value: "unsure", ru: "Пока не знаю", en: "Not sure yet" },
    ],
  },
  {
    id: "passport",
    ru: "Есть ли у вас действующий паспорт, а при необходимости — биометрические данные?",
    en: "Do you have a valid passport and, if required, biometrics?",
    options: [
      { value: "yes", ru: "Да", en: "Yes" },
      { value: "no", ru: "Нет", en: "No" },
      { value: "unknown", ru: "Не уверен(-а), нужны ли биометрические данные", en: "Not sure whether biometrics are required" },
    ],
  },
  {
    id: "vwpRestrictions",
    ru: "Были ли у вас отказы, нарушения иммиграционных правил или другие обстоятельства, которые могут повлиять на въезд в Канаду?",
    en: "Have you had refusals, immigration violations or other circumstances that could affect entry to Canada?",
    options: [
      { value: "none", ru: "Насколько мне известно, нет", en: "Not to my knowledge" },
      { value: "refusal", ru: "Был отказ в визе или разрешении", en: "I have had a visa or permit refusal" },
      { value: "criminal", ru: "Есть судимость или уголовно-правовой вопрос", en: "I have a criminal record or criminal-law issue" },
      { value: "medical", ru: "Есть возможные медицинские вопросы для допуска", en: "There may be medical admissibility issues" },
      { value: "unknown", ru: "Не уверен(-а)", en: "Not sure" },
    ],
  },
  {
    id: "funds",
    ru: "Можете ли вы подтвердить средства на поездку, обучение или первоначальное проживание?",
    en: "Can you document funds for your trip, studies or initial settlement?",
    options: [
      { value: "yes", ru: "Да", en: "Yes" },
      { value: "sponsor", ru: "Есть финансовый спонсор", en: "I have a financial sponsor" },
      { value: "no", ru: "Пока нет", en: "Not yet" },
    ],
  },
  {
    id: "immigrationHistory",
    ru: "Были ли отказы в визах, нарушения статуса, превышение срока пребывания или выдворение в любой стране?",
    en: "Have you had visa refusals, status violations, overstays or removals in any country?",
    options: [
      { value: "none", ru: "Нет", en: "No" },
      { value: "refusal", ru: "Был отказ в визе или разрешении", en: "Visa or permit refusal" },
      { value: "overstay", ru: "Превышение срока пребывания или нарушение условий", en: "Overstay or violation of conditions" },
      { value: "removed", ru: "Депортация или выдворение", en: "Deportation or removal" },
      { value: "unknown", ru: "Не уверен(-а) / не хочу указывать", en: "Not sure / prefer not to say" },
    ],
  },
  {
    id: "currentStatus",
    ru: "Каков ваш текущий статус в Канаде, если вы уже находитесь в стране?",
    en: "What is your current status in Canada, if you are already in the country?",
    options: [
      { value: "abroad", ru: "Нахожусь за пределами Канады", en: "I am outside Canada" },
      { value: "valid", ru: "Есть действующий статус или разрешение", en: "I have valid status or a permit" },
      { value: "student", ru: "Учебный статус", en: "Study permit holder" },
      { value: "work", ru: "Рабочее разрешение", en: "Work permit holder" },
      { value: "visitor", ru: "Нахожусь как посетитель", en: "Visitor status" },
      { value: "expired", ru: "Статус истёк или ситуация сложная", en: "My status expired or my situation is complicated" },
      { value: "unknown", ru: "Не уверен(-а)", en: "Not sure" },
    ],
  },
  {
    id: "protection",
    ru: "Связана ли ваша ситуация с опасением преследования или риском серьёзного вреда в стране происхождения?",
    en: "Does your situation involve fear of persecution or risk of serious harm in your country of origin?",
    options: [
      { value: "yes", ru: "Да", en: "Yes" },
      { value: "no", ru: "Нет", en: "No" },
      { value: "unsure", ru: "Не уверен(-а)", en: "Not sure" },
    ],
  },
];

const routes: Route[] = [
  {
    id: "expressEntry",
    emoji: "⭐",
    title: "Express Entry — квалифицированная иммиграция",
    enTitle: "Express Entry — skilled immigration",
    visa: "Federal Skilled Worker / Canadian Experience Class / Federal Skilled Trades",
    desc: "Основная система отбора ряда квалифицированных работников для получения постоянного проживания в Канаде.",
    enDesc: "The main selection system for several skilled-worker pathways to Canadian permanent residence.",
    link: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry.html",
    requirements: "Требования зависят от программы. Обычно учитываются подтверждённый опыт в подходящей профессии, результаты утверждённого языкового теста, образование и другие критерии. Для иностранного образования часто нужна оценка ECA. Профиль не гарантирует приглашение.",
    enRequirements: "Requirements depend on the program. Relevant work experience, approved language-test results, education and other criteria may apply. Foreign education often needs an ECA. Creating a profile does not guarantee an invitation.",
    goals: ["permanent", "work"],
  },
  {
    id: "fsw",
    emoji: "🌍",
    title: "Federal Skilled Worker Program",
    enTitle: "Federal Skilled Worker Program",
    visa: "FSW — через Express Entry",
    desc: "Для квалифицированных специалистов с подходящим опытом работы, полученным в Канаде или за её пределами.",
    enDesc: "For skilled workers with qualifying experience gained in Canada or abroad.",
    link: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/who-can-apply/federal-skilled-workers.html",
    requirements: "Обычно необходимы не менее года непрерывного оплачиваемого опыта в подходящей профессии за установленный период, языковой тест и соответствие критериям отбора. Может требоваться подтверждение средств и оценка иностранного образования.",
    enRequirements: "Usually requires at least one year of continuous paid work in an eligible occupation within the specified period, a language test and meeting selection criteria. Proof of funds and foreign credential assessment may be required.",
    goals: ["permanent", "work"],
  },
  {
    id: "cec",
    emoji: "🍁",
    title: "Canadian Experience Class",
    enTitle: "Canadian Experience Class",
    visa: "CEC — через Express Entry",
    desc: "Для квалифицированных работников с подходящим опытом работы в Канаде.",
    enDesc: "For skilled workers with qualifying Canadian work experience.",
    link: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/who-can-apply/canadian-experience-class.html",
    requirements: "Как правило, требуется не менее года подходящего оплачиваемого опыта работы в Канаде в течение последних трёх лет и подтверждение языка. Есть специальные правила, в том числе о том, какой опыт засчитывается. Планируемое место проживания должно быть за пределами Квебека.",
    enRequirements: "Generally requires at least one year of qualifying paid Canadian work experience in the last three years and language results. Special rules determine what experience counts. Applicants must plan to live outside Quebec.",
    goals: ["permanent", "work"],
  },
  {
    id: "trades",
    emoji: "🧰",
    title: "Federal Skilled Trades Program",
    enTitle: "Federal Skilled Trades Program",
    visa: "FST — через Express Entry",
    desc: "Для квалифицированных работников определённых технических и рабочих профессий.",
    enDesc: "For qualified workers in specified skilled trades.",
    link: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/who-can-apply/skilled-trades.html",
    requirements: "Могут требоваться установленный опыт в подходящей рабочей профессии, предложение работы на требуемых условиях или канадский сертификат квалификации, а также языковой тест. Конкретная профессия и условия должны соответствовать официальному списку.",
    enRequirements: "Requires qualifying experience in an eligible trade and either a qualifying job offer or Canadian certificate of qualification, as well as language results. The occupation and conditions must match official criteria.",
    goals: ["permanent", "work"],
  },
  {
    id: "pnp",
    emoji: "📍",
    title: "Провинциальная номинация (PNP)",
    enTitle: "Provincial Nominee Program",
    visa: "PNP / Express Entry PNP",
    desc: "Путь для кандидатов, которые отвечают потребностям конкретной провинции или территории.",
    enDesc: "A pathway for candidates who meet the needs of a particular province or territory.",
    link: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/provincial-nominees.html",
    requirements: "Нужно соответствовать условиям конкретного потока и получить номинацию провинции или территории. В некоторых потоках необходимы предложение работы, местный опыт или связь с регионом. Квебек использует отдельную систему отбора.",
    enRequirements: "You must qualify for a specific stream and receive a provincial or territorial nomination. Some streams require a job offer, local experience or regional ties. Quebec has a separate selection system.",
    goals: ["permanent", "work"],
  },
  {
    id: "atlantic",
    emoji: "🌊",
    title: "Atlantic Immigration Program",
    enTitle: "Atlantic Immigration Program",
    visa: "AIP",
    desc: "Программа постоянного проживания для подходящих работников и некоторых выпускников в атлантических провинциях.",
    enDesc: "A permanent-residence program for eligible workers and some graduates in Atlantic Canada.",
    link: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/atlantic-immigration.html",
    requirements: "Обычно требуется предложение работы от designated employer в участвующей атлантической провинции, соответствие требованиям к образованию, языку и опыту (с предусмотренными исключениями), а также выполнение других условий программы.",
    enRequirements: "Usually requires a job offer from a designated employer in a participating Atlantic province, meeting education, language and experience requirements (subject to exceptions), and satisfying other program conditions.",
    goals: ["permanent", "work"],
  },
  {
    id: "regional",
    emoji: "🏘️",
    title: "Региональные иммиграционные пилоты",
    enTitle: "Rural and Francophone community pilots",
    visa: "Rural Community Immigration Pilot / Francophone Community Immigration Pilot",
    desc: "Варианты постоянного проживания для подходящих кандидатов, которые готовы жить и работать в участвующих сообществах.",
    enDesc: "Permanent-residence pathways for eligible candidates willing to live and work in participating communities.",
    link: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/rural-franco-immigration-pilots.html",
    requirements: "Условия зависят от сообщества и программы. Обычно требуется предложение работы от подходящего работодателя, соответствие языковым и образовательным критериям и рекомендация сообщества. Проверяйте актуальные списки участников и работодателей.",
    enRequirements: "Requirements depend on the community and program. A job offer from an eligible employer, language and education criteria, and community recommendation are commonly required. Check current participating communities and employers.",
    goals: ["permanent", "work"],
  },
  {
    id: "quebec",
    emoji: "⚜️",
    title: "Иммиграция в Квебек",
    enTitle: "Quebec immigration pathways",
    visa: "Отдельные программы отбора Квебека",
    desc: "Для тех, кто планирует жить в Квебеке и соответствует критериям его иммиграционных программ.",
    enDesc: "For people planning to live in Quebec who meet the criteria of its immigration programs.",
    link: "https://www.quebec.ca/en/immigration",
    requirements: "Квебек применяет собственные программы отбора и требования. Французский язык может иметь существенное значение в зависимости от потока. После отбора провинцией обычно нужно выполнить федеральные требования для получения статуса постоянного жителя.",
    enRequirements: "Quebec operates its own selection programs and requirements. French can be important depending on the stream. After provincial selection, federal requirements for permanent residence generally still apply.",
    goals: ["permanent", "work", "study"],
  },
  {
    id: "work",
    emoji: "💼",
    title: "Разрешение на работу",
    enTitle: "Canadian work permit",
    visa: "Employer-specific / open work permit",
    desc: "Для временной работы в Канаде по подходящей категории разрешения.",
    enDesc: "For temporary employment in Canada under an eligible work-permit category.",
    link: "https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada/permit.html",
    requirements: "Во многих случаях требуется предложение работы, а работодателю — LMIA, если не применяется исключение. Некоторые категории допускают open work permit. Одно предложение работы не гарантирует право на разрешение.",
    enRequirements: "Many cases require a job offer and an LMIA unless an exemption applies. Some categories allow an open work permit. A job offer alone does not guarantee a permit.",
    goals: ["work", "business"],
  },
  {
    id: "study",
    emoji: "🎓",
    title: "Разрешение на учёбу",
    enTitle: "Study permit",
    visa: "Study permit",
    desc: "Для обучения в Канаде в учебном заведении и по программе, для которых требуется разрешение.",
    enDesc: "For study in Canada at an institution and program for which a permit is required.",
    link: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit.html",
    requirements: "Как правило, нужны письмо о зачислении от подходящего учебного заведения, подтверждение средств, выполнение требований к документам и допуску. В зависимости от обстоятельств может понадобиться PAL/TAL или применяться исключение.",
    enRequirements: "Usually requires a letter of acceptance from an eligible institution, proof of funds and meeting document and admissibility requirements. A PAL/TAL may be required depending on circumstances, subject to exemptions.",
    goals: ["study"],
  },
  {
    id: "pgwp",
    emoji: "📚",
    title: "Работа после окончания учёбы (PGWP)",
    enTitle: "Post-Graduation Work Permit",
    visa: "PGWP",
    desc: "Возможность получить разрешение на работу после окончания подходящей программы обучения в Канаде.",
    enDesc: "A possible work permit after completing an eligible Canadian study program.",
    link: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/work/after-graduation.html",
    requirements: "Право зависит от учебного заведения, программы, продолжительности обучения и действующих правил PGWP. Для ряда заявителей применяются дополнительные требования к языку или области обучения. Выпуск не означает автоматического получения разрешения.",
    enRequirements: "Eligibility depends on the institution, program, length of study and current PGWP rules. Additional language or field-of-study requirements apply to some applicants. Graduation does not automatically grant a permit.",
    goals: ["study", "work", "permanent"],
  },
  {
    id: "family",
    emoji: "👨‍👩‍👧",
    title: "Семейное спонсорство",
    enTitle: "Family sponsorship",
    visa: "Spouse / partner / eligible relatives",
    desc: "Для подходящих членов семьи граждан Канады и постоянных жителей, готовых выступить спонсорами.",
    enDesc: "For eligible family members of Canadian citizens and permanent residents who can sponsor them.",
    link: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/family-sponsorship.html",
    requirements: "Доступность программы зависит от родства, статуса спонсора, возраста и других условий. Для супруга или партнёра нужно подтвердить подлинность отношений. Не все родственники могут быть спонсированы; для отдельных категорий действуют особые правила.",
    enRequirements: "Eligibility depends on the relationship, sponsor status, age and other conditions. Spousal or partner cases require proof of a genuine relationship. Not all relatives can be sponsored, and some categories have special rules.",
    goals: ["family", "permanent"],
  },
  {
    id: "iec",
    emoji: "🌎",
    title: "International Experience Canada",
    enTitle: "International Experience Canada",
    visa: "IEC — Working Holiday / Young Professionals / International Co-op",
    desc: "Программа молодёжной мобильности для граждан участвующих стран, если они отвечают требованиям выбранной категории.",
    enDesc: "A youth-mobility program for citizens of participating countries who meet the selected category requirements.",
    link: "https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada/iec.html",
    requirements: "Право зависит от гражданства, возраста, категории и соглашений Канады с конкретной страной. Могут применяться ограничения по квотам, приглашениям и страховке. Не все страны участвуют, а условия необходимо проверять для своего паспорта.",
    enRequirements: "Eligibility depends on nationality, age, category and Canada's agreements with the relevant country. Quotas, invitations and insurance requirements may apply. Not all countries participate; check the rules for your passport.",
    goals: ["exchange", "work"],
  },
  {
    id: "visitor",
    emoji: "🧳",
    title: "Гостевая виза или eTA",
    enTitle: "Visitor visa or eTA",
    visa: "Temporary Resident Visa (TRV) / Electronic Travel Authorization (eTA)",
    desc: "Для временного туризма, посещения семьи и друзей, транзита или разрешённых деловых поездок.",
    enDesc: "For temporary tourism, visiting family and friends, transit or permitted business visits.",
    link: "https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/entry-requirements-country.html",
    requirements: "Тип документа зависит от гражданства, проездного документа и способа прибытия. Обычно необходимо убедить офицера, что поездка временная, и подтвердить средства и допустимость въезда. eTA не является визой и не гарантирует въезд.",
    enRequirements: "The required document depends on nationality, travel document and mode of arrival. Applicants generally need to establish a temporary visit, sufficient funds and admissibility. An eTA is not a visa and does not guarantee entry.",
    goals: ["visit"],
  },
  {
    id: "business",
    emoji: "📈",
    title: "Бизнес и предпринимательство",
    enTitle: "Business and entrepreneurship",
    visa: "Программа зависит от провинции и типа деятельности",
    desc: "Для предпринимателей и владельцев бизнеса, рассматривающих подходящие канадские бизнес-маршруты.",
    enDesc: "For entrepreneurs and business owners exploring suitable Canadian business pathways.",
    link: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada.html",
    requirements: "Наличие капитала или бизнес-плана само по себе не даёт иммиграционного статуса. Требования зависят от провинции и конкретной программы. Start-up Visa приостановлена для новых заявителей с 30 июня 2026 года; не рассматривайте её как доступный новый маршрут без проверки официальных обновлений.",
    enRequirements: "Capital or a business plan alone does not grant immigration status. Requirements depend on the province and specific program. The Start-up Visa is paused for new applicants as of June 30, 2026; do not assume it is open to new applicants without checking official updates.",
    goals: ["business", "permanent", "work"],
  },
  {
    id: "protection",
    emoji: "🛡️",
    title: "Убежище и защита беженцев",
    enTitle: "Asylum and refugee protection",
    visa: "Отдельная процедура защиты",
    desc: "Это не обычная иммиграционная виза. Возможность обратиться за защитой зависит от обстоятельств и применимого законодательства.",
    enDesc: "This is not an ordinary immigration visa. Eligibility depends on individual circumstances and applicable law.",
    link: "https://www.canada.ca/en/immigration-refugees-citizenship/services/refugees.html",
    requirements: "Необходима индивидуальная оценка обстоятельств и применимых правил. Право на подачу и допустимость обращения зависят, в частности, от местонахождения и действующих ограничений. Навигатор не определяет право на защиту.",
    enRequirements: "Individual assessment of the circumstances and applicable rules is necessary. Eligibility to make a claim and its admissibility can depend on location and current restrictions. This navigator cannot determine eligibility for protection.",
    goals: ["protection"],
  },
];

function getScore(id: string, a: Answers): number {
  const has = (key: string, values: string[]) =>
    values.includes(a[key] ?? "");

  const goalFits: Record<string, string[]> = {
    expressEntry: ["permanent", "work"],
    fsw: ["permanent", "work"],
    cec: ["permanent", "work"],
    trades: ["permanent", "work"],
    pnp: ["permanent", "work"],
    atlantic: ["permanent", "work"],
    regional: ["permanent", "work"],
    quebec: ["permanent", "work", "study"],
    work: ["work", "business"],
    study: ["study"],
    pgwp: ["study", "work", "permanent"],
    family: ["family", "permanent"],
    iec: ["exchange", "work"],
    visitor: ["visit"],
    business: ["business", "permanent", "work"],
    protection: ["protection"],
  };

  const skilledExperience = has("workExperience", [
    "3plus",
    "canadian",
    "specialist",
    "manager",
    "trade",
    "research",
  ]);

  const fswExperience = has("workExperience", [
    "3plus",
    "specialist",
    "manager",
    "research",
    "canadian",
  ]);

  const goodLanguage = has("english", [
    "intermediate",
    "advanced",
    "native",
  ]);

  const higherEducation = has("education", [
    "bachelor",
    "master",
  ]);

  const hasOffer = a.jobOffer === "yes";
  const employerSupport = a.sponsor === "yes";
  const hasFunds = has("funds", ["yes", "sponsor"]);
  const hasFamily = has("familyUS", [
    "citizen",
    "resident",
    "spouse",
  ]);

  const youngForIEC = has("age", [
    "18-24",
    "25-29",
    "30-35",
  ]);

  const hasImmigrationConcern =
    has("immigrationHistory", [
      "refusal",
      "overstay",
      "removed",
    ]) ||
    has("vwpRestrictions", [
      "refusal",
      "criminal",
      "medical",
    ]);

  const seriousImmigrationConcern =
    has("immigrationHistory", ["removed", "overstay"]) ||
    has("vwpRestrictions", ["criminal"]);

  const validPassport = a.passport === "yes";
  const passportMissing = a.passport === "no";

  const goalMatch = (goalFits[id] ?? []).includes(a.goal ?? "");

  let score = goalMatch ? 24 : 8;

  if (a.citizenship && a.citizenship !== "unknown") {
    if (id === "visitor") score += 3;
    if (id === "iec" && a.exchangeOffer === "yes") score += 3;
  }

  if (a.birthCountry && a.birthCountry !== "unknown") {
    if (id === "protection" && a.protection !== "no") score += 3;
  }

  if (a.residence && a.residence !== "unknown") {
    if (id === "visitor") score += 3;
    if (id === "pnp" && a.residence === "ca") score += 5;
    if (id === "cec" && a.residence === "ca") score += 3;
    if (id === "family" && a.residence === "ca") score += 2;
  }

  if (a.age === "under18") {
    if (id === "study") score += 3;
    if (id === "family") score += 2;
    if (["expressEntry", "fsw", "cec", "pnp", "iec"].includes(id)) {
      score -= 8;
    }
  } else if (has("age", ["18-24", "25-29"])) {
    if (["expressEntry", "fsw", "pnp", "iec"].includes(id)) {
      score += 8;
    }
  } else if (a.age === "30-35") {
    if (["expressEntry", "fsw", "pnp"].includes(id)) score += 5;
    if (id === "iec") score += 2;
  } else if (a.age === "36-44") {
    if (["expressEntry", "fsw", "pnp"].includes(id)) score += 2;
    if (id === "iec") score -= 10;
  } else if (a.age === "45plus") {
    if (["expressEntry", "fsw", "pnp", "iec"].includes(id)) {
      score -= 12;
    }
    if (id === "visitor" || id === "family") score += 2;
  }

  if (a.english === "basic") {
    if (
      [
        "expressEntry",
        "fsw",
        "cec",
        "trades",
        "pnp",
        "atlantic",
        "regional",
        "work",
      ].includes(id)
    ) {
      score -= 10;
    }
  } else if (a.english === "intermediate") {
    if (
      [
        "expressEntry",
        "fsw",
        "cec",
        "trades",
        "pnp",
        "atlantic",
        "regional",
        "work",
      ].includes(id)
    ) {
      score += 5;
    }
  } else if (has("english", ["advanced", "native"])) {
    if (
      [
        "expressEntry",
        "fsw",
        "cec",
        "trades",
        "pnp",
        "atlantic",
        "regional",
        "work",
      ].includes(id)
    ) {
      score += 9;
    }
  }

  if (a.education === "school") {
    if (["expressEntry", "fsw", "pnp", "atlantic"].includes(id)) {
      score -= 5;
    }
    if (id === "trades") score += 2;
  } else if (a.education === "vocational") {
    if (["trades", "work", "pnp", "atlantic"].includes(id)) {
      score += 8;
    }
  } else if (a.education === "bachelor") {
    if (["expressEntry", "fsw", "pnp", "atlantic"].includes(id)) {
      score += 8;
    }
  } else if (a.education === "master") {
    if (["expressEntry", "fsw", "pnp"].includes(id)) score += 10;
    if (id === "study") score += 3;
  } else if (a.education === "none") {
    if (["expressEntry", "fsw", "pnp", "atlantic"].includes(id)) {
      score -= 10;
    }
  }

  if (a.workExperience === "none") {
    if (
      [
        "expressEntry",
        "fsw",
        "cec",
        "trades",
        "pnp",
        "atlantic",
        "regional",
      ].includes(id)
    ) {
      score -= 12;
    }
    if (id === "study") score += 2;
  }

  if (a.workExperience === "under1") {
    if (
      [
        "expressEntry",
        "fsw",
        "cec",
        "trades",
        "pnp",
        "atlantic",
        "regional",
      ].includes(id)
    ) {
      score -= 6;
    }
  }

  if (a.workExperience === "under3") {
    if (["expressEntry", "fsw", "pnp", "work"].includes(id)) {
      score += 2;
    }
  }

  if (a.workExperience === "3plus") {
    if (["expressEntry", "fsw", "pnp", "atlantic", "regional"].includes(id)) {
      score += 10;
    }
  }

  if (a.workExperience === "canadian") {
    if (id === "cec") score += 24;
    if (["expressEntry", "fsw", "pnp", "work", "pgwp"].includes(id)) {
      score += 8;
    }
  }

  if (a.workExperience === "specialist") {
    if (["expressEntry", "fsw", "work", "pnp"].includes(id)) {
      score += 10;
    }
    if (id === "business") score += 3;
  }

  if (a.workExperience === "manager") {
    if (["expressEntry", "fsw", "pnp", "work", "business"].includes(id)) {
      score += 8;
    }
  }

  if (a.workExperience === "trade") {
    if (id === "trades") score += 24;
    if (["work", "pnp", "atlantic", "regional"].includes(id)) {
      score += 8;
    }
  }

  if (a.workExperience === "research") {
    if (["expressEntry", "fsw", "work"].includes(id)) score += 8;
    if (id === "business" && a.achievements === "strong") score += 5;
  }

  if (hasOffer) {
    if (
      [
        "work",
        "pnp",
        "atlantic",
        "regional",
        "trades",
      ].includes(id)
    ) {
      score += 13;
    }
    if (["expressEntry", "fsw"].includes(id)) score += 5;
  } else if (a.jobOffer === "maybe") {
    if (
      [
        "work",
        "pnp",
        "atlantic",
        "regional",
        "trades",
      ].includes(id)
    ) {
      score += 5;
    }
  } else if (a.jobOffer === "no") {
    if (
      [
        "work",
        "pnp",
        "atlantic",
        "regional",
        "trades",
      ].includes(id)
    ) {
      score -= 5;
    }
  }

  if (employerSupport) {
    if (["work", "atlantic", "regional"].includes(id)) score += 8;
  } else if (a.sponsor === "no") {
    if (["work", "atlantic", "regional"].includes(id)) score -= 10;
  } else if (a.sponsor === "unknown") {
    if (["work", "atlantic", "regional"].includes(id)) score -= 2;
  }

  if (a.studentOffer === "yes") {
    if (id === "study") score += 28;
    if (id === "pgwp") score += 8;
  } else if (a.studentOffer === "applying") {
    if (id === "study") score += 12;
  } else if (a.studentOffer === "no") {
    if (id === "study") score -= 5;
  }

  if (a.currentStatus === "student") {
    if (id === "pgwp") score += 22;
    if (id === "study") score += 5;
  }

  if (a.currentStatus === "work") {
    if (id === "cec" && a.workExperience === "canadian") score += 5;
    if (id === "pgwp") score += 3;
    if (id === "work") score += 3;
  }

  if (a.currentStatus === "valid") {
    if (["cec", "pgwp", "work", "family"].includes(id)) score += 3;
  }

  if (a.currentStatus === "visitor") {
    if (id === "visitor") score += 3;
    if (["work", "study"].includes(id)) score -= 2;
  }

  if (a.currentStatus === "abroad") {
    if (["visitor", "study", "work", "family"].includes(id)) score += 2;
  }

  if (a.currentStatus === "expired") {
    if (
      [
        "expressEntry",
        "fsw",
        "cec",
        "trades",
        "pnp",
        "work",
        "study",
        "pgwp",
        "family",
      ].includes(id)
    ) {
      score -= 12;
    }
  }

  if (a.currentStatus === "unknown") {
    if (["work", "study", "pgwp", "family"].includes(id)) score -= 2;
  }

  if (a.exchangeOffer === "yes") {
    if (id === "iec") score += 28;
    if (id === "work") score += 5;
  } else if (a.exchangeOffer === "unknown") {
    if (id === "iec") score += 5;
  } else if (a.exchangeOffer === "no") {
    if (id === "iec") score -= 12;
  }

  if (youngForIEC && id === "iec") score += 12;

  if (hasFamily) {
    if (id === "family") score += 28;
    if (["expressEntry", "pnp"].includes(id)) score += 3;
  } else if (a.familyUS === "other") {
    if (id === "family") score += 5;
  } else if (a.familyUS === "unknown") {
    if (id === "family") score += 2;
  } else if (a.familyUS === "no") {
    if (id === "family") score -= 12;
  }

  if (a.achievements === "strong") {
    if (["business", "work", "expressEntry"].includes(id)) score += 10;
  } else if (a.achievements === "some") {
    if (["business", "work", "expressEntry"].includes(id)) score += 4;
  } else if (a.achievements === "no") {
    if (id === "business") score -= 3;
  }

  if (a.business === "large") {
    if (id === "business") score += 22;
  } else if (a.business === "some") {
    if (id === "business") score += 12;
  } else if (a.business === "company") {
    if (id === "business") score += 18;
    if (id === "work") score += 5;
  } else if (a.business === "startup") {
    if (id === "business") score += 15;
    if (a.achievements === "strong" && id === "work") score += 3;
  } else if (a.business === "no") {
    if (id === "business") score -= 15;
  }

  if (a.visitPurpose === "tourism") {
    if (id === "visitor") score += 8;
  } else if (a.visitPurpose === "business") {
    if (id === "visitor") score += 6;
    if (id === "business") score += 3;
  } else if (a.visitPurpose === "medical") {
    if (id === "visitor") score += 4;
  } else if (a.visitPurpose === "transit") {
    if (id === "visitor") score += 5;
  } else if (a.visitPurpose === "other") {
    if (id === "visitor") score -= 2;
  }

  if (a.visitDuration === "under6") {
    if (id === "visitor") score += 8;
  } else if (a.visitDuration === "over6") {
    if (id === "visitor") score -= 8;
    if (["study", "work", "family"].includes(id)) score += 3;
  } else if (a.visitDuration === "unsure") {
    if (id === "visitor") score -= 2;
  }

  if (validPassport) {
    if (["visitor", "study", "work", "iec"].includes(id)) score += 5;
  } else if (passportMissing) {
    if (["visitor", "study", "work", "iec"].includes(id)) score -= 18;
  } else if (a.passport === "unknown") {
    if (["visitor", "study", "work", "iec"].includes(id)) score -= 3;
  }

  if (hasFunds) {
    if (["visitor", "study", "expressEntry", "fsw"].includes(id)) {
      score += 8;
    }
    if (["pnp", "atlantic", "regional"].includes(id)) score += 4;
  } else if (a.funds === "no") {
    if (["visitor", "study", "expressEntry", "fsw"].includes(id)) {
      score -= 12;
    }
    if (["pnp", "atlantic", "regional"].includes(id)) score -= 6;
  }

  if (a.immigrationHistory === "none") {
    if (["visitor", "study", "work", "family"].includes(id)) score += 3;
  } else if (a.immigrationHistory === "refusal") {
    if (["visitor", "study", "work", "family", "iec"].includes(id)) {
      score -= 8;
    }
  } else if (a.immigrationHistory === "overstay") {
    if (
      [
        "visitor",
        "study",
        "work",
        "family",
        "iec",
        "expressEntry",
        "fsw",
      ].includes(id)
    ) {
      score -= 12;
    }
  } else if (a.immigrationHistory === "removed") {
    if (
      [
        "visitor",
        "study",
        "work",
        "family",
        "iec",
        "expressEntry",
        "fsw",
        "cec",
        "pnp",
      ].includes(id)
    ) {
      score -= 18;
    }
  } else if (a.immigrationHistory === "unknown") {
    if (["visitor", "study", "work", "family"].includes(id)) score -= 2;
  }

  if (a.vwpRestrictions === "none") {
    if (["visitor", "study", "work", "iec"].includes(id)) score += 2;
  } else if (a.vwpRestrictions === "refusal") {
    if (["visitor", "study", "work", "iec"].includes(id)) score -= 8;
  } else if (a.vwpRestrictions === "criminal") {
    if (
      [
        "visitor",
        "study",
        "work",
        "iec",
        "expressEntry",
        "fsw",
        "cec",
        "pnp",
      ].includes(id)
    ) {
      score -= 18;
    }
  } else if (a.vwpRestrictions === "medical") {
    if (["visitor", "study", "work", "iec"].includes(id)) score -= 8;
  } else if (a.vwpRestrictions === "unknown") {
    if (["visitor", "study", "work", "iec"].includes(id)) score -= 2;
  }

  if (hasImmigrationConcern && id === "protection") {
    score += 2;
  }

  if (seriousImmigrationConcern) {
    if (["visitor", "study", "work", "iec"].includes(id)) score -= 3;
  }

  if (id === "quebec") {
    if (skilledExperience) score += 5;
    if (higherEducation) score += 5;
    if (a.goal === "study") score += 3;
  }

  if (id === "expressEntry" && skilledExperience && goodLanguage) {
    score += 5;
  }

  if (id === "fsw" && fswExperience && goodLanguage && higherEducation) {
    score += 8;
  }

  if (id === "cec" && a.workExperience === "canadian") {
    score += 12;
  }

  if (id === "trades" && a.workExperience === "trade") {
    score += 12;
  }

  if (id === "pgwp" && a.currentStatus === "student") {
    score += 8;
  }

  if (id === "business" && a.business === "startup") {
    score -= 3;
  }

  if (id === "protection") {
    if (a.protection === "yes") score += 35;
    else if (a.protection === "unsure") score += 12;
    else if (a.protection === "no") score -= 25;

    if (a.goal === "protection") score += 10;
  }

  if (a.goal === "unsure") score -= 3;

  const unknowns = [
    ["age", "unknown", ["expressEntry", "fsw", "pnp", "iec"]],
    ["english", "unknown", ["expressEntry", "fsw", "cec", "work"]],
    ["citizenship", "unknown", ["visitor", "iec"]],
    ["funds", "no", ["visitor", "study"]],
  ];

  for (const [key, value, routeIds] of unknowns as [
    string,
    string,
    string[],
  ][]) {
    if (a[key] === value && routeIds.includes(id)) score -= 2;
  }

  return Math.max(0, Math.min(100, Math.round(score)));
}

export default function CanadaPage() {
  const { language: lang } = useLanguage();

  const [answers, setAnswers] = useState<Answers>({});
  const [showAll, setShowAll] = useState(false);

  const t = (ru: string, en: string) => (lang === "ru" ? ru : en);
  const answered = questions.filter((q) => Boolean(answers[q.id])).length;

  const results = useMemo(() => {
    if (!answers.goal || answers.goal === "unsure") return [];

    return routes
      .map((route) => ({ ...route, score: getScore(route.id, answers) }))
      .filter((route) => route.score > 0)
      .sort((a, b) => b.score - a.score);
  }, [answers]);

  const visibleResults = showAll ? results : results.slice(0, 8);

  function reset() {
    setAnswers({});
    setShowAll(false);
  }

  const visitorConcern =
    answers.goal === "visit" &&
    answers.passport &&
    answers.passport !== "yes";

  return (
    <main className="min-h-screen bg-[#080d18] text-slate-100">
      <EsurpysNavigation />

      <section className="mx-auto max-w-6xl px-5 pb-12 pt-12">
        <div className="mb-10 rounded-3xl border border-blue-400/20 bg-gradient-to-br from-blue-950 via-slate-900 to-red-950 p-7 md:p-10">
          <div className="mb-4 text-5xl">🇨🇦</div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
            {t("Иммиграционный навигатор", "Immigration navigator")}
          </p>
          <h1 className="mb-4 text-3xl font-bold md:text-5xl">
            {t("Переезд в Канаду", "Move to Canada")}
          </h1>
          <p className="max-w-3xl leading-7 text-slate-300">
            {t(
              "Ответьте на вопросы, чтобы увидеть предварительно подходящие визовые и иммиграционные маршруты. Навигатор учитывает цель поездки, гражданство, образование, опыт, семейные связи и другие обстоятельства.",
              "Answer the questions to explore potentially relevant visa and immigration routes. The navigator considers travel purpose, nationality, education, experience, family relationships and other circumstances."
            )}
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-300">
            {[
              ["💼", "Работа", "Work"],
              ["🎓", "Учёба", "Study"],
              ["👨‍👩‍👧", "Семья", "Family"],
              ["📈", "Бизнес", "Business"],
              ["🧳", "Туризм", "Visits"],
            ].map(([emoji, ru, en]) => (
              <span
                key={ru}
                className="rounded-full border border-white/15 px-3 py-2"
              >
                {emoji} {t(ru, en)}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="rounded-3xl border border-white/10 bg-[#0d1525] p-5 md:p-7">
            <div className="mb-6 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-2xl font-bold">
                  {t("Ваша анкета", "Your questionnaire")}
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  {t("Отвечено", "Answered")}: {answered} / {questions.length}
                </p>
              </div>
              <button
                type="button"
                onClick={reset}
                className="rounded-xl border border-white/15 px-3 py-2 text-sm text-slate-300 transition hover:bg-white/10"
              >
                {t("Сбросить", "Reset")}
              </button>
            </div>

            <div className="mb-3 flex items-center justify-between text-sm">
              <span className="text-slate-400">
                {t("Заполнение анкеты", "Questionnaire progress")}
              </span>
              <span className="font-semibold text-blue-300">
                {Math.round((answered / questions.length) * 100)}%
              </span>
            </div>

            <div
              className="mb-7 h-2 overflow-hidden rounded-full bg-white/10"
              role="progressbar"
              aria-valuenow={Math.round((answered / questions.length) * 100)}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="h-full rounded-full bg-blue-400 transition-all"
                style={{ width: `${(answered / questions.length) * 100}%` }}
              />
            </div>

            <div className="space-y-6">
              {questions.map((question, index) => (
                <div
                  key={question.id}
                  className="border-b border-white/10 pb-6 last:border-0 last:pb-0"
                >
                  <label
                    htmlFor={question.id}
                    className="mb-3 block font-medium leading-6"
                  >
                    <span className="mr-2 text-blue-300">{index + 1}.</span>
                    {t(question.ru, question.en)}
                  </label>
                  <select
                    id={question.id}
                    value={answers[question.id] ?? ""}
                    onChange={(event) => {
                      const value = event.target.value;
                      setAnswers((previous) => ({
                        ...previous,
                        [question.id]: value,
                      }));
                    }}
                    className="w-full rounded-xl border border-white/10 bg-[#111c30] px-4 py-3 text-sm text-white outline-none transition focus:border-blue-400"
                  >
                    <option value="">
                      {t("Выберите ответ…", "Choose an answer…")}
                    </option>
                    {question.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {t(option.ru, option.en)}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="mb-5 rounded-3xl border border-white/10 bg-[#0d1525] p-5 md:p-7">
              <h2 className="text-2xl font-bold">
                {t("Подходящие маршруты", "Potential routes")}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                {t(
                  "Это предварительное сопоставление ваших ответов с общими характеристиками категорий. Процент не является официальным баллом, юридическим заключением или вероятностью одобрения.",
                  "This is a preliminary comparison of your answers with general category characteristics. The percentage is not an official score, legal opinion or probability of approval."
                )}
              </p>
              {results.length > 0 && (
                <p className="mt-4 text-sm text-blue-300">
                  {t("Найдено маршрутов: ", "Routes found: ")}
                  {results.length}
                </p>
              )}
            </div>

            {results.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-white/20 bg-[#0d1525] p-8 text-center">
                <div className="mb-3 text-4xl">🧭</div>
                <h3 className="font-semibold">
                  {t("Начните с вашей цели", "Start with your goal")}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {t(
                    "Выберите цель в первом вопросе. Остальные ответы помогут уточнить предварительно подходящие варианты.",
                    "Choose your goal in the first question. Your other answers will help refine potentially relevant options."
                  )}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {visibleResults.map((route) => (
                  <article
                    key={route.id}
                    className="rounded-3xl border border-white/10 bg-[#0d1525] p-5 transition hover:border-blue-400/40"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/5 text-2xl">
                        {route.emoji}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h3 className="text-lg font-bold">
                            {t(route.title, route.enTitle)}
                          </h3>
                          <span className="rounded-full bg-blue-400/10 px-3 py-1 text-sm font-semibold text-blue-300">
                            {route.score}%
                          </span>
                        </div>

                        <p className="mt-1 text-sm text-slate-400">
                          {route.visa}
                        </p>
                        <p className="mt-3 text-sm leading-6 text-slate-300">
                          {t(route.desc, route.enDesc)}
                        </p>

                        <div className="mt-4 rounded-xl bg-white/[0.04] p-3 text-sm leading-6 text-slate-400">
                          <strong className="text-slate-200">
                            {t("Основные условия: ", "Key requirements: ")}
                          </strong>
                          {t(route.requirements, route.enRequirements)}
                        </div>

                        {route.id === "visitor" && (
                          <p className="mt-3 text-sm leading-6 text-amber-300">
                            {t(
                              "Важно: тип документа для въезда зависит от гражданства, паспорта и способа прибытия. Проверьте требования IRCC для вашего паспорта. Виза или eTA не гарантируют въезд.",
                              "Important: the required entry document depends on nationality, passport and mode of arrival. Check IRCC requirements for your passport. A visa or eTA does not guarantee entry."
                            )}
                          </p>
                        )}

                        {route.id === "expressEntry" && (
                          <p className="mt-3 text-sm leading-6 text-amber-300">
                            {t(
                              "Важно: Express Entry управляет несколькими программами. Соответствие минимальным требованиям не гарантирует приглашение; отбор зависит от программы и действующих раундов.",
                              "Important: Express Entry manages several programs. Meeting minimum requirements does not guarantee an invitation; selection depends on the program and current rounds."
                            )}
                          </p>
                        )}

                        {route.id === "business" && (
                          <p className="mt-3 text-sm leading-6 text-amber-300">
                            {t(
                              "Важно: бизнес-маршруты могут меняться. Start-up Visa приостановлена для новых заявителей с 30 июня 2026 года. Проверяйте актуальную информацию перед планированием подачи.",
                              "Important: business pathways can change. The Start-up Visa is paused for new applicants as of June 30, 2026. Check current information before planning an application."
                            )}
                          </p>
                        )}

                        {route.id === "protection" && (
                          <p className="mt-3 text-sm leading-6 text-amber-300">
                            {t(
                              "Важно: это чувствительная юридическая процедура. Условия и возможность обращения зависят от индивидуальных обстоятельств и действующих правил. Рассмотрите консультацию квалифицированного юриста.",
                              "Important: this is a sensitive legal process. Eligibility and the ability to make a claim depend on individual circumstances and current rules. Consider consulting a qualified lawyer."
                            )}
                          </p>
                        )}

                        <a
                          href={route.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-300 transition hover:text-blue-200"
                        >
                          {t("Официальная информация", "Official information")} ↗
                        </a>
                      </div>
                    </div>
                  </article>
                ))}

                {results.length > 8 && (
                  <button
                    type="button"
                    onClick={() => setShowAll((previous) => !previous)}
                    className="w-full rounded-xl border border-white/15 px-4 py-3 text-sm transition hover:bg-white/10"
                  >
                    {showAll
                      ? t("Показать меньше", "Show fewer")
                      : t(
                          `Показать все варианты (${results.length})`,
                          `Show all routes (${results.length})`
                        )}
                  </button>
                )}
              </div>
            )}

            {visitorConcern && (
              <div className="mt-6 rounded-2xl border border-amber-300/20 bg-amber-300/5 p-4 text-sm leading-6 text-slate-300">
                <strong className="text-amber-200">
                  {t(
                    "Проверьте документы для въезда",
                    "Check your entry documents"
                  )}
                </strong>
                <p className="mt-2">
                  {t(
                    "Для въезда в Канаду может потребоваться гостевая виза, eTA или другой документ. Требования зависят от гражданства, паспорта и способа прибытия. Используйте официальный список требований IRCC.",
                    "You may need a visitor visa, eTA or another document to enter Canada. Requirements depend on nationality, passport and mode of arrival. Use the official IRCC entry-requirements list."
                  )}
                </p>
                <a
                  className="mt-3 inline-block font-semibold text-blue-300 hover:text-blue-200"
                  href="https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/entry-requirements-country.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t(
                    "Проверить требования по паспорту",
                    "Check requirements for your passport"
                  )}{" "}
                  ↗
                </a>
              </div>
            )}

            {answers.immigrationHistory &&
              !["none", "unknown"].includes(answers.immigrationHistory) && (
                <div className="mt-6 rounded-2xl border border-amber-300/20 bg-amber-300/5 p-4 text-sm leading-6 text-slate-300">
                  <strong className="text-amber-200">
                    {t(
                      "Внимание к иммиграционной истории",
                      "Immigration history"
                    )}
                  </strong>
                  <p className="mt-2">
                    {t(
                      "Отказ, нарушение условий пребывания или выдворение не всегда автоматически исключают все варианты, но последствия зависят от фактов и законодательства. Судимость и некоторые другие обстоятельства могут повлиять на допустимость въезда. Перед подачей рассмотрите консультацию квалифицированного иммиграционного юриста.",
                      "A refusal, status violation or removal does not automatically rule out every option, but consequences depend on the facts and applicable law. A criminal record and other circumstances may affect admissibility. Consider qualified immigration advice before applying."
                    )}
                  </p>
                </div>
              )}

            {answers.currentStatus === "expired" && (
              <div className="mt-6 rounded-2xl border border-amber-300/20 bg-amber-300/5 p-4 text-sm leading-6 text-slate-300">
                <strong className="text-amber-200">
                  {t(
                    "Возможная проблема со статусом",
                    "Potential status issue"
                  )}
                </strong>
                <p className="mt-2">
                  {t(
                    "Если вы находитесь в Канаде и ваш статус истёк, возможные варианты и сроки зависят от обстоятельств. Не делайте выводов только по анкете; обратитесь за индивидуальной юридической консультацией и проверьте официальные правила IRCC.",
                    "If you are in Canada and your status has expired, available options and deadlines depend on the circumstances. Do not rely on this questionnaire alone; seek individualized legal advice and check official IRCC rules."
                  )}
                </p>
              </div>
            )}

            <div className="mt-6 rounded-2xl border border-amber-300/20 bg-amber-300/5 p-4 text-sm leading-6 text-slate-300">
              <strong className="text-amber-200">
                {t("Проверяйте действующие правила", "Check current rules")}
              </strong>
              <p className="mt-2">
                {t(
                  "Иммиграционные правила, критерии программ, сборы и сроки могут меняться. Перед подачей заявления проверьте официальные обновления Immigration, Refugees and Citizenship Canada (IRCC). Этот навигатор не является юридической консультацией и не проверяет автоматически все индивидуальные требования.",
                  "Immigration rules, program criteria, fees and processing times can change. Check official Immigration, Refugees and Citizenship Canada (IRCC) updates before applying. This navigator is not legal advice and does not automatically verify every individual requirement."
                )}
              </p>
              <div className="mt-3 flex flex-wrap gap-4">
                <a
                  href="https://www.canada.ca/en/immigration-refugees-citizenship.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-300 hover:text-blue-200"
                >
                  IRCC ↗
                </a>
                <a
                  href="https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-300 hover:text-blue-200"
                >
                  {t("Иммиграционные программы", "Immigration programs")} ↗
                </a>
                <a
                  href="https://www.canada.ca/en/immigration-refugees-citizenship/services/application/check-processing-times.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-300 hover:text-blue-200"
                >
                  {t("Сроки обработки", "Processing times")} ↗
                </a>
              </div>
            </div>
          </section>
        </div>

        <footer className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-slate-500">
          {t("Иммиграционный навигатор Канады", "Canada Immigration Navigator")}{" "}
          ·{" "}
          <Link
            href="/world-navigator"
            className="text-blue-300 transition hover:text-blue-200"
          >
            {t("Все страны", "All countries")}
          </Link>
        </footer>
      </section>
    </main>
  );
}
