"use client";

import EsurpysNavigation from "@/shared/EsurpysNavigation";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useLanguage } from "@/shared/LanguageProvider";

type Lang = "ru" | "en";
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
  { value: "in", ru: "🇮🇳 Индия", en: "🇮🇳 India" },
  { value: "cn", ru: "🇨🇳 Китай", en: "🇨🇳 China" },
  { value: "ph", ru: "🇵🇭 Филиппины", en: "🇵🇭 Philippines" },
  { value: "uk", ru: "🇬🇧 Великобритания", en: "🇬🇧 United Kingdom" },
  { value: "us", ru: "🇺🇸 США", en: "🇺🇸 United States" },
  { value: "ca", ru: "🇨🇦 Канада", en: "🇨🇦 Canada" },
  { value: "nz", ru: "🇳🇿 Новая Зеландия", en: "🇳🇿 New Zealand" },
  { value: "ie", ru: "🇮🇪 Ирландия", en: "🇮🇪 Ireland" },
  { value: "de", ru: "🇩🇪 Германия", en: "🇩🇪 Germany" },
  { value: "fr", ru: "🇫🇷 Франция", en: "🇫🇷 France" },
  { value: "jp", ru: "🇯🇵 Япония", en: "🇯🇵 Japan" },
  { value: "kr", ru: "🇰🇷 Южная Корея", en: "🇰🇷 South Korea" },
  { value: "other", ru: "Другая страна", en: "Another country" },
  { value: "unknown", ru: "Не хочу указывать", en: "Prefer not to say" },
];

const questions: Question[] = [
  {
    id: "goal",
    ru: "Какова ваша главная цель?",
    en: "What is your main goal?",
    options: [
      { value: "work", ru: "Работа в Австралии", en: "Work in Australia" },
      { value: "study", ru: "Учёба", en: "Study" },
      { value: "business", ru: "Бизнес или инновации", en: "Business or innovation" },
      { value: "family", ru: "Переезд к партнёру или семье", en: "Join a partner or family" },
      { value: "permanent", ru: "Постоянное проживание", en: "Permanent residence" },
      { value: "visit", ru: "Туризм или краткий визит", en: "Tourism or short visit" },
      { value: "holidayWork", ru: "Путешествие с временной работой", en: "Travel with temporary work" },
      { value: "protection", ru: "Поиск защиты", en: "Seeking protection" },
      { value: "unsure", ru: "Пока не определился(-ась)", en: "Not sure yet" },
    ],
  },
  {
    id: "citizenship",
    ru: "Какое у вас гражданство?",
    en: "What is your citizenship?",
    options: citizenshipOptions,
  },
  {
    id: "residence",
    ru: "Где вы сейчас живёте?",
    en: "Where do you currently live?",
    options: [
      { value: "ru", ru: "Россия", en: "Russia" },
      { value: "ua", ru: "Украина", en: "Ukraine" },
      { value: "by", ru: "Беларусь", en: "Belarus" },
      { value: "kz", ru: "Казахстан", en: "Kazakhstan" },
      { value: "uk", ru: "Великобритания", en: "United Kingdom" },
      { value: "eu", ru: "Страна ЕС / ЕЭЗ", en: "EU / EEA country" },
      { value: "au", ru: "Австралия", en: "Australia" },
      { value: "nz", ru: "Новая Зеландия", en: "New Zealand" },
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
      { value: "18-30", ru: "18–30 лет", en: "18–30" },
      { value: "31-35", ru: "31–35 лет", en: "31–35" },
      { value: "36-44", ru: "36–44 лет", en: "36–44" },
      { value: "45plus", ru: "45 лет и старше", en: "45 or older" },
      { value: "unknown", ru: "Не хочу указывать", en: "Prefer not to say" },
    ],
  },
  {
    id: "english",
    ru: "Какой у вас уровень английского?",
    en: "What is your English level?",
    options: [
      { value: "basic", ru: "Начальный", en: "Basic" },
      { value: "competent", ru: "Средний / достаточный", en: "Intermediate / competent" },
      { value: "proficient", ru: "Продвинутый", en: "Proficient" },
      { value: "superior", ru: "Очень высокий", en: "Superior" },
      { value: "unknown", ru: "Не знаю / не сдавал(-а) тест", en: "Not sure / no test taken" },
    ],
  },
  {
    id: "education",
    ru: "Какое у вас образование или квалификация?",
    en: "What is your education or qualification?",
    options: [
      { value: "school", ru: "Среднее образование", en: "High school" },
      { value: "vocational", ru: "Профессиональная квалификация", en: "Vocational qualification" },
      { value: "bachelor", ru: "Бакалавриат", en: "Bachelor's degree" },
      { value: "master", ru: "Магистратура или выше", en: "Master's degree or higher" },
      { value: "none", ru: "Нет завершённой квалификации", en: "No completed qualification" },
    ],
  },
  {
    id: "occupation",
    ru: "Есть ли у вас профессия или специальность?",
    en: "Do you have a skilled occupation?",
    options: [
      { value: "listed", ru: "Да, моя профессия может быть в списке востребованных", en: "Yes, it may be on a skilled occupation list" },
      { value: "trade", ru: "Да, квалифицированная рабочая профессия", en: "Yes, a skilled trade" },
      { value: "unlisted", ru: "Есть профессия, но не знаю, подходит ли она", en: "I have an occupation but don't know if it qualifies" },
      { value: "none", ru: "Нет подходящей профессии", en: "No relevant skilled occupation" },
      { value: "unknown", ru: "Не уверен(-а)", en: "Not sure" },
    ],
  },
  {
    id: "experience",
    ru: "Сколько у вас опыта работы по профессии?",
    en: "How much skilled work experience do you have?",
    options: [
      { value: "none", ru: "Нет опыта", en: "None" },
      { value: "under3", ru: "Менее 3 лет", en: "Less than 3 years" },
      { value: "3plus", ru: "3–5 лет", en: "3–5 years" },
      { value: "5plus", ru: "Более 5 лет", en: "More than 5 years" },
      { value: "manager", ru: "Руководитель / топ-менеджер", en: "Executive / senior manager" },
      { value: "research", ru: "Научные или инновационные достижения", en: "Research or innovation achievements" },
    ],
  },
  {
    id: "jobOffer",
    ru: "Есть ли предложение работы от австралийского работодателя?",
    en: "Do you have a job offer from an Australian employer?",
    options: [
      { value: "yes", ru: "Да", en: "Yes" },
      { value: "no", ru: "Нет", en: "No" },
      { value: "maybe", ru: "Веду переговоры", en: "In discussion" },
    ],
  },
  {
    id: "sponsor",
    ru: "Готов ли работодатель выступить спонсором?",
    en: "Is the employer willing to sponsor you?",
    options: [
      { value: "yes", ru: "Да", en: "Yes" },
      { value: "no", ru: "Нет", en: "No" },
      { value: "unknown", ru: "Не знаю", en: "Not sure" },
      { value: "na", ru: "Нет предложения работы", en: "No job offer" },
    ],
  },
  {
    id: "stateNomination",
    ru: "Есть ли номинация штата или территории Австралии?",
    en: "Do you have state or territory nomination?",
    options: [
      { value: "yes", ru: "Да", en: "Yes" },
      { value: "considering", ru: "Планирую искать номинацию", en: "Planning to seek nomination" },
      { value: "no", ru: "Нет", en: "No" },
      { value: "unknown", ru: "Не знаю", en: "Not sure" },
    ],
  },
  {
    id: "points",
    ru: "Оценивали ли вы свои баллы для skilled migration?",
    en: "Have you assessed your skilled migration points?",
    options: [
      { value: "65plus", ru: "Предварительно 65 баллов или больше", en: "Estimated 65 points or more" },
      { value: "under65", ru: "Предварительно меньше 65 баллов", en: "Estimated under 65 points" },
      { value: "notassessed", ru: "Ещё не оценивал(-а)", en: "Not assessed yet" },
    ],
  },
  {
    id: "partner",
    ru: "Каков ваш семейный статус для возможной партнёрской визы?",
    en: "What is your relationship situation for a possible partner visa?",
    options: [
      { value: "australian", ru: "Партнёр — гражданин Австралии или постоянный резидент", en: "Partner is an Australian citizen or permanent resident" },
      { value: "eligibleNZ", ru: "Партнёр — подходящий гражданин Новой Зеландии", en: "Partner is an eligible New Zealand citizen" },
      { value: "no", ru: "Нет такого партнёра", en: "No such partner" },
      { value: "unknown", ru: "Не уверен(-а)", en: "Not sure" },
    ],
  },
  {
    id: "studyOffer",
    ru: "Есть ли зачисление или подтверждение приёма от учебного заведения?",
    en: "Have you been accepted by an Australian education provider?",
    options: [
      { value: "yes", ru: "Да", en: "Yes" },
      { value: "applying", ru: "Планирую подавать документы", en: "Planning to apply" },
      { value: "no", ru: "Нет", en: "No" },
    ],
  },
  {
    id: "funds",
    ru: "Можете ли вы подтвердить средства на поездку, обучение или проживание?",
    en: "Can you document funds for travel, study or living costs?",
    options: [
      { value: "yes", ru: "Да", en: "Yes" },
      { value: "sponsor", ru: "Есть финансовый спонсор", en: "I have a financial sponsor" },
      { value: "no", ru: "Пока нет", en: "Not yet" },
    ],
  },
  {
    id: "visitPurpose",
    ru: "Какова цель краткой поездки?",
    en: "What is the purpose of your short visit?",
    options: [
      { value: "tourism", ru: "Туризм или посещение близких", en: "Tourism or visiting family/friends" },
      { value: "business", ru: "Деловые встречи без трудоустройства", en: "Business visitor activities" },
      { value: "medical", ru: "Медицинская помощь", en: "Medical treatment" },
      { value: "other", ru: "Другая цель", en: "Other purpose" },
    ],
  },
  {
    id: "duration",
    ru: "Как долго вы планируете находиться в Австралии?",
    en: "How long do you plan to stay in Australia?",
    options: [
      { value: "short", ru: "Краткая поездка, до нескольких месяцев", en: "Short visit, up to a few months" },
      { value: "long", ru: "Длительное пребывание", en: "Longer stay" },
      { value: "unknown", ru: "Пока не знаю", en: "Not sure yet" },
    ],
  },
  {
    id: "holidayWork",
    ru: "Хотите ли вы использовать Working Holiday / Work and Holiday?",
    en: "Are you interested in a Working Holiday / Work and Holiday visa?",
    options: [
      { value: "yes", ru: "Да", en: "Yes" },
      { value: "no", ru: "Нет", en: "No" },
      { value: "unknown", ru: "Не знаю, подходит ли моё гражданство", en: "Not sure if my passport qualifies" },
    ],
  },
  {
    id: "innovation",
    ru: "Есть ли у вас выдающиеся достижения в бизнесе, науке, инвестициях или инновациях?",
    en: "Do you have exceptional achievements in business, research, investment or innovation?",
    options: [
      { value: "strong", ru: "Да, есть значимые международные достижения", en: "Yes, significant international achievements" },
      { value: "some", ru: "Есть достижения, но не знаю, подходят ли они", en: "Some achievements, unsure if they qualify" },
      { value: "no", ru: "Нет", en: "No" },
    ],
  },
  {
    id: "businessPlan",
    ru: "Каковы ваши планы относительно бизнеса или инвестиций?",
    en: "What are your business or investment plans?",
    options: [
      { value: "innovator", ru: "Развиваю инновационный бизнес или проект", en: "Developing an innovative business or project" },
      { value: "investor", ru: "Есть значительный капитал для инвестиций", en: "I have substantial investment capital" },
      { value: "company", ru: "Работаю в международной компании, возможен перевод", en: "I work for a multinational company and may transfer" },
      { value: "no", ru: "Не планирую бизнес или инвестиции", en: "No business or investment plans" },
    ],
  },
  {
    id: "protection",
    ru: "Связана ли ваша ситуация с опасением преследования или серьёзного вреда?",
    en: "Does your situation involve fear of persecution or serious harm?",
    options: [
      { value: "yes", ru: "Да", en: "Yes" },
      { value: "no", ru: "Нет", en: "No" },
      { value: "unsure", ru: "Не уверен(-а)", en: "Not sure" },
    ],
  },
  {
    id: "immigrationHistory",
    ru: "Были ли отказы в визах, нарушения условий пребывания или отмена визы?",
    en: "Have you had visa refusals, visa cancellations or immigration breaches?",
    options: [
      { value: "none", ru: "Нет", en: "No" },
      { value: "refusal", ru: "Был отказ в визе", en: "Visa refusal" },
      { value: "breach", ru: "Нарушение условий / превышение срока", en: "Condition breach / overstay" },
      { value: "cancelled", ru: "Визу отменяли", en: "Visa was cancelled" },
      { value: "unknown", ru: "Не уверен(-а) / не хочу указывать", en: "Not sure / prefer not to say" },
    ],
  },
  {
    id: "currentStatus",
    ru: "Где вы находитесь сейчас относительно Австралии?",
    en: "What is your current situation in relation to Australia?",
    options: [
      { value: "abroad", ru: "За пределами Австралии", en: "Outside Australia" },
      { value: "valid", ru: "В Австралии с действующей визой", en: "In Australia with a valid visa" },
      { value: "expired", ru: "В Австралии, статус истёк или ситуация сложная", en: "In Australia with an expired visa or complex situation" },
      { value: "unknown", ru: "Другое / не уверен(-а)", en: "Other / not sure" },
    ],
  },
];

const routes: Route[] = [
  {
    id: "visitor",
    emoji: "🧳",
    title: "Гостевая виза",
    enTitle: "Visitor visa",
    visa: "Subclass 600",
    desc: "Для туризма, посещения семьи и друзей, а также некоторых деловых визитов.",
    enDesc: "For tourism, visiting family and friends, and certain business visitor activities.",
    link: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/visitor-600",
    requirements: "Нужно подтвердить цель визита, намерение соблюдать условия временного пребывания и доступ к средствам. Условия и доступные потоки зависят от обстоятельств заявителя.",
    enRequirements: "Applicants generally need to demonstrate the purpose of the visit, intention to comply with visitor conditions and access to funds. Streams and requirements depend on individual circumstances.",
    goals: ["visit"],
  },
  {
    id: "student",
    emoji: "🎓",
    title: "Студенческая виза",
    enTitle: "Student visa",
    visa: "Subclass 500",
    desc: "Для обучения на подходящей программе у австралийского образовательного провайдера.",
    enDesc: "For study in an eligible course with an Australian education provider.",
    link: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500",
    requirements: "Обычно нужны подтверждение зачисления (CoE), выполнение Genuine Student и финансовых требований, а также применимые требования к английскому языку, здоровью и характеру.",
    enRequirements: "Usually requires a Confirmation of Enrolment (CoE), meeting Genuine Student and financial requirements, plus applicable English, health and character requirements.",
    goals: ["study"],
  },
  {
    id: "482",
    emoji: "💼",
    title: "Работа при спонсорстве работодателя",
    enTitle: "Employer-sponsored work",
    visa: "Skills in Demand visa — Subclass 482",
    desc: "Для подходящих работников, которых спонсирует австралийский работодатель на квалифицированную должность.",
    enDesc: "For eligible skilled workers sponsored by an Australian employer for a qualifying position.",
    link: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/skills-in-demand-visa-subclass-482",
    requirements: "Нужны подходящее предложение работы и спонсорство работодателя; применяются требования к профессии, опыту, зарплате, английскому и другим критериям. Условия зависят от потока.",
    enRequirements: "Requires an eligible job and employer sponsorship. Occupation, experience, salary, English and other criteria may apply, depending on the stream.",
    goals: ["work"],
  },
  {
    id: "186",
    emoji: "🏢",
    title: "Постоянная виза через работодателя",
    enTitle: "Employer Nomination Scheme",
    visa: "Subclass 186",
    desc: "Путь к постоянному проживанию для работников, номинированных подходящим работодателем.",
    enDesc: "A permanent-residence pathway for workers nominated by an eligible employer.",
    link: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/employer-nomination-scheme-186",
    requirements: "Требуются подходящая номинация и соответствие критериям выбранного потока, включая квалификацию, опыт, возраст и английский, если применимо.",
    enRequirements: "Requires an eligible nomination and meeting the criteria for the relevant stream, including qualification, experience, age and English requirements where applicable.",
    goals: ["work", "permanent"],
  },
  {
    id: "189",
    emoji: "⭐",
    title: "Независимая квалифицированная миграция",
    enTitle: "Skilled Independent visa",
    visa: "Subclass 189",
    desc: "Балльная постоянная виза для приглашённых квалифицированных заявителей без спонсорства штата или работодателя.",
    enDesc: "A points-tested permanent visa for invited skilled applicants without state or employer sponsorship.",
    link: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/skilled-independent-189",
    requirements: "Обычно необходимы профессия из применимого списка, положительная оценка квалификации, соответствие возрастным и языковым требованиям, минимум 65 баллов для участия и приглашение. Минимум баллов не гарантирует приглашение.",
    enRequirements: "Typically requires an eligible listed occupation, positive skills assessment, age and English criteria, at least 65 points to qualify and an invitation. The points threshold does not guarantee an invitation.",
    goals: ["permanent", "work"],
  },
  {
    id: "190",
    emoji: "🗺️",
    title: "Квалифицированная номинация штата",
    enTitle: "Skilled Nominated visa",
    visa: "Subclass 190",
    desc: "Постоянная балльная виза с номинацией штата или территории.",
    enDesc: "A points-tested permanent visa with nomination by an Australian state or territory.",
    link: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/skilled-nominated-190",
    requirements: "Нужны приглашение, подходящая профессия, оценка квалификации и номинация штата или территории. У каждого штата могут быть дополнительные критерии и приоритеты.",
    enRequirements: "Requires an invitation, eligible occupation, skills assessment and state or territory nomination. Each jurisdiction may set additional criteria and priorities.",
    goals: ["permanent", "work"],
  },
  {
    id: "491",
    emoji: "🌿",
    title: "Региональная квалифицированная виза",
    enTitle: "Skilled Work Regional visa",
    visa: "Subclass 491",
    desc: "Временная региональная балльная виза с номинацией штата/территории или спонсорством подходящего родственника.",
    enDesc: "A provisional regional points-tested visa with state/territory nomination or eligible family sponsorship.",
    link: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/skilled-work-regional-provisional-491",
    requirements: "Нужны приглашение и подходящая номинация или спонсорство, а также выполнение требований к профессии, квалификации, возрасту, английскому и баллам. Возможен последующий путь к постоянному проживанию при соблюдении условий.",
    enRequirements: "Requires an invitation and eligible nomination or sponsorship, plus occupation, skills, age, English and points criteria. A later permanent pathway may be available if conditions are met.",
    goals: ["permanent", "work"],
  },
  {
    id: "494",
    emoji: "🏞️",
    title: "Региональное спонсорство работодателя",
    enTitle: "Skilled Employer Sponsored Regional",
    visa: "Subclass 494",
    desc: "Для квалифицированных работников, которых спонсирует работодатель в региональной Австралии.",
    enDesc: "For skilled workers sponsored by an employer in regional Australia.",
    link: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/skilled-employer-sponsored-regional-494",
    requirements: "Нужны подходящий региональный работодатель, номинация и соответствие критериям профессии, опыта, квалификации, возраста и английского. Для некоторых заявителей предусмотрен путь к постоянной визе после выполнения условий.",
    enRequirements: "Requires an eligible regional employer, nomination and occupation, experience, qualification, age and English criteria. Some applicants may have a pathway to permanent residence after meeting requirements.",
    goals: ["work", "permanent"],
  },
  {
    id: "partnerOnshore",
    emoji: "❤️",
    title: "Партнёрская виза (в Австралии)",
    enTitle: "Partner visa (onshore)",
    visa: "Subclass 820 / 801",
    desc: "Для супруга или фактического партнёра гражданина Австралии, постоянного резидента или подходящего гражданина Новой Зеландии, подающего заявление в Австралии.",
    enDesc: "For the spouse or de facto partner of an Australian citizen, permanent resident or eligible New Zealand citizen applying in Australia.",
    link: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/partner-onshore",
    requirements: "Нужно доказать подлинность и продолжительность отношений и выполнить требования к подаче в Австралии. Возможность подачи и условия зависят от текущей визы и обстоятельств.",
    enRequirements: "Applicants must demonstrate a genuine relationship and meet onshore application requirements. Eligibility depends on current visa status and individual circumstances.",
    goals: ["family", "permanent"],
  },
  {
    id: "partnerOffshore",
    emoji: "💞",
    title: "Партнёрская виза (за пределами Австралии)",
    enTitle: "Partner visa (offshore)",
    visa: "Subclass 309 / 100",
    desc: "Для супруга или фактического партнёра подходящего австралийского спонсора, подающего заявление за пределами Австралии.",
    enDesc: "For the spouse or de facto partner of an eligible Australian sponsor applying from outside Australia.",
    link: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/partner-offshore",
    requirements: "Нужно подтвердить подлинные отношения и соответствие требованиям к спонсору и заявителю. Подача не означает автоматического одобрения.",
    enRequirements: "Applicants must demonstrate a genuine relationship and meet sponsor and applicant criteria. Applying does not guarantee approval.",
    goals: ["family", "permanent"],
  },
  {
    id: "whm",
    emoji: "🎒",
    title: "Рабочий отпуск",
    enTitle: "Working Holiday / Work and Holiday",
    visa: "Subclass 417 / 462",
    desc: "Для молодых взрослых с паспортом страны, участвующей в соответствующей программе, чтобы путешествовать и выполнять разрешённую временную работу.",
    enDesc: "For young adults holding a passport from a participating country to travel and undertake permitted short-term work.",
    link: "https://immi.homeaffairs.gov.au/what-we-do/whm-program",
    requirements: "Доступность зависит от гражданства, возраста, лимитов программы и дополнительных требований. У подклассов 417 и 462 разные списки стран и условия; проверьте официальный список для своего паспорта.",
    enRequirements: "Eligibility depends on nationality, age, program caps and additional requirements. Subclasses 417 and 462 have different country lists and criteria; check the official list for your passport.",
    goals: ["holidayWork", "work"],
  },
  {
    id: "858",
    emoji: "🚀",
    title: "Национальная инновационная виза",
    enTitle: "National Innovation visa",
    visa: "Subclass 858",
    desc: "Постоянная виза для выдающихся и всемирно признанных специалистов в определённых областях, включая исследования, предпринимательство, инвестиции и спорт.",
    enDesc: "A permanent visa for exceptionally talented and internationally recognised people in selected fields, including research, entrepreneurship, investment and sport.",
    link: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/national-innovation-visa-858",
    requirements: "Маршрут предназначен для людей с исключительными достижениями и высокой международной репутацией. Обычно требуется приглашение; соответствие критериям оценивается индивидуально.",
    enRequirements: "This pathway is intended for people with exceptional achievements and a high level of international recognition. An invitation is generally required and eligibility is assessed individually.",
    goals: ["business", "permanent", "work"],
  },
  {
    id: "protection",
    emoji: "🛡️",
    title: "Защита в Австралии",
    enTitle: "Protection visa",
    visa: "Subclass 866",
    desc: "Возможность защиты для некоторых людей, находящихся в Австралии и соответствующих требованиям законодательства о защите.",
    enDesc: "A protection pathway for certain people in Australia who meet Australia's protection criteria.",
    link: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/protection-866",
    requirements: "Это сложная юридическая процедура с особыми критериями и требованиями к месту нахождения. Навигатор не определяет право на защиту; получите квалифицированную юридическую помощь.",
    enRequirements: "This is a complex legal process with specific eligibility and location requirements. This navigator cannot determine protection eligibility; seek qualified legal assistance.",
    goals: ["protection"],
  },
];

function getScore(id: string, a: Answers): number {
  const selectedGoal = a.goal;
  if (!selectedGoal || selectedGoal === "unsure") return 0;

  const route = routes.find((r) => r.id === id);
  if (!route) return 0;

  const hasFunds = ["yes", "sponsor"].includes(a.funds);
  const skilled = ["listed", "trade"].includes(a.occupation);
  const experienced = ["3plus", "5plus", "manager", "research"].includes(a.experience);
  const partnerEligible = ["australian", "eligibleNZ"].includes(a.partner);
  const hasJob = a.jobOffer === "yes";
  const sponsored = hasJob && a.sponsor === "yes";
  const ageEligible = ["18-30", "31-35", "36-44"].includes(a.age);
  const englishReady = ["competent", "proficient", "superior"].includes(a.english);
  const educationReady = ["vocational", "bachelor", "master"].includes(a.education);
  const goodHistory = a.immigrationHistory === "none";
  const seriousHistory = ["refusal", "breach", "cancelled"].includes(a.immigrationHistory);
  const inAustralia = ["valid", "expired"].includes(a.currentStatus);
  const regionalNomination = ["yes", "considering"].includes(a.stateNomination);
  const strongPoints = a.points === "65plus";
  const hasExperience = experienced || a.experience === "under3";
  const studentAccepted = a.studyOffer === "yes";
  const studentApplying = a.studyOffer === "applying";
  const visitorPurpose = ["tourism", "business", "medical", "other"].includes(a.visitPurpose);

  let score = 0;

  if (route.goals.includes(selectedGoal)) score += 25;
  else score -= 15;

  if (id === "whm") {
    const eligible417Countries = ["uk", "ca", "nz", "ie", "de", "fr", "jp", "kr"];
    const eligible462Countries = ["in", "cn", "ph", "uz"];

    if (eligible417Countries.includes(a.citizenship)) score += 15;
    else if (eligible462Countries.includes(a.citizenship)) score += 10;
    else if (a.citizenship === "other") score += 0;
    else score -= 10;

    if (a.residence === "au") score -= 5;
  } else {
    if (a.citizenship && a.citizenship !== "unknown") score += 2;
    if (a.residence === "au" && inAustralia) score += 3;
    if (a.residence === "au" && !inAustralia) score -= 2;
  }

  if (["189", "190", "491", "186", "494"].includes(id)) {
    if (["18-30", "31-35"].includes(a.age)) score += 10;
    else if (a.age === "36-44") score += 5;
    else if (a.age === "45plus") score -= 15;
    else if (a.age === "under18") score -= 20;
  }

  if (["482", "student", "visitor", "partnerOnshore", "partnerOffshore", "858"].includes(id)) {
    if (a.age === "under18") score -= 5;
    if (a.age === "unknown") score -= 2;
  }

  if (id === "whm") {
    if (a.age === "18-30") score += 12;
    else if (a.age === "31-35") score += 6;
    else score -= 20;
  }

  if (["189", "190", "491", "482", "186", "494"].includes(id)) {
    if (a.english === "superior") score += 10;
    else if (a.english === "proficient") score += 8;
    else if (a.english === "competent") score += 5;
    else if (a.english === "basic") score -= 10;
    else score -= 2;
  } else if (id === "student") {
    if (englishReady) score += 6;
    else if (a.english === "basic") score -= 5;
  } else if (id === "whm") {
    if (englishReady) score += 3;
  }

  if (["189", "190", "491"].includes(id)) {
    if (a.education === "master") score += 10;
    else if (a.education === "bachelor") score += 8;
    else if (a.education === "vocational") score += 6;
    else if (a.education === "school") score += 1;
    else score -= 4;
  } else if (["482", "186", "494"].includes(id)) {
    if (educationReady) score += 6;
    else if (a.education === "school") score -= 3;
  } else if (id === "student") {
    if (educationReady) score += 4;
    if (a.education === "none") score -= 3;
  }

  if (["189", "190", "491", "482", "186", "494"].includes(id)) {
    if (a.occupation === "listed") score += 12;
    else if (a.occupation === "trade") score += 10;
    else if (a.occupation === "unlisted") score += 2;
    else if (a.occupation === "none") score -= 12;
  }

  if (["189", "190", "491", "482", "186", "494"].includes(id)) {
    if (a.experience === "5plus") score += 10;
    else if (a.experience === "3plus") score += 7;
    else if (a.experience === "under3") score += 3;
    else if (a.experience === "manager") score += 8;
    else if (a.experience === "research") score += 6;
    else score -= 8;
  }

  if (["482", "186", "494"].includes(id)) {
    if (a.jobOffer === "yes") score += 12;
    else if (a.jobOffer === "maybe") score += 5;
    else score -= 5;
  }

  if (["482", "186", "494"].includes(id)) {
    if (a.sponsor === "yes") score += 12;
    else if (a.sponsor === "unknown") score += 1;
    else if (a.sponsor === "no") score -= 10;
  }

  if (["190", "491"].includes(id)) {
    if (a.stateNomination === "yes") score += 14;
    else if (a.stateNomination === "considering") score += 6;
    else if (a.stateNomination === "no") score -= 3;
  }

  if (["189", "190", "491"].includes(id)) {
    if (strongPoints) score += 12;
    else if (a.points === "under65") score -= 8;
    else if (a.points === "notassessed") score -= 2;
  }

  if (["partnerOnshore", "partnerOffshore"].includes(id)) {
    if (partnerEligible) score += 25;
    else if (a.partner === "no") score -= 25;
    else score -= 5;

    if (id === "partnerOnshore") {
      if (inAustralia) score += 10;
      if (a.currentStatus === "abroad") score -= 25;
    }

    if (id === "partnerOffshore") {
      if (a.currentStatus === "abroad") score += 10;
      if (inAustralia) score -= 20;
    }
  }

  if (id === "student") {
    if (studentAccepted) score += 20;
    else if (studentApplying) score += 10;
    else score -= 10;
  }

  if (["visitor", "student", "whm"].includes(id)) {
    if (hasFunds) score += 10;
    else if (a.funds === "no") score -= 12;
  }

  if (id === "visitor") {
    if (visitorPurpose) score += 10;
    if (a.visitPurpose === "business") score += 2;
    if (a.duration === "short") score += 8;
    else if (a.duration === "long") score -= 3;
    if (a.duration === "unknown") score -= 1;
  }

  if (a.duration === "long") {
    if (
      [
        "student",
        "482",
        "186",
        "189",
        "190",
        "491",
        "494",
        "partnerOnshore",
        "partnerOffshore",
      ].includes(id)
    ) {
      score += 4;
    }

    if (["visitor", "whm"].includes(id)) score -= 5;
  }

  if (a.duration === "short") {
    if (["visitor", "whm"].includes(id)) score += 3;
    if (["189", "190", "491", "186"].includes(id)) score -= 2;
  }

  if (id === "whm") {
    if (a.holidayWork === "yes") score += 15;
    else if (a.holidayWork === "no") score -= 25;
    else if (a.holidayWork === "unknown") score += 2;
  }

  if (id === "858") {
    if (a.innovation === "strong") score += 25;
    else if (a.innovation === "some") score += 10;
    else if (a.innovation === "no") score -= 15;
  }

  if (id === "858") {
    if (a.businessPlan === "innovator") score += 12;
    else if (a.businessPlan === "investor") score += 8;
    else if (a.businessPlan === "company") score += 5;
    else if (a.businessPlan === "no") score -= 5;
  }

  if (id === "protection") {
    if (a.protection === "yes") score += 30;
    else if (a.protection === "unsure") score += 10;
    else if (a.protection === "no") score -= 30;

    if (inAustralia) score += 15;
    else score -= 25;
  } else if (a.protection === "yes") {
    score -= 2;
  }

  if (goodHistory) score += 4;
  else if (seriousHistory) score -= 12;
  else if (a.immigrationHistory === "unknown") score -= 1;

  if (a.currentStatus === "expired") {
    score -= 10;
    if (id === "protection") score += 5;
  } else if (a.currentStatus === "valid") {
    if (["partnerOnshore", "student", "482"].includes(id)) score += 3;
  } else if (a.currentStatus === "abroad") {
    if (["partnerOffshore", "visitor", "whm"].includes(id)) score += 4;
    if (id === "partnerOnshore") score -= 5;
  }

  if (["491", "494"].includes(id)) {
    if (regionalNomination) score += 5;
  }

  return Math.max(0, Math.min(100, Math.round(score)));
}

export default function AustraliaPage() {
  const { language: lang } = useLanguage();

  const [answers, setAnswers] = useState<Answers>({});
  const [showAll, setShowAll] = useState(false);

  const t = (ru: string, en: string) =>
    lang === "ru" ? ru : en;
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

  const immigrationConcern = Boolean(
    answers.immigrationHistory &&
      !["none", "unknown"].includes(answers.immigrationHistory)
  );

  return (
    <>
      <EsurpysNavigation />

      <main className="min-h-screen bg-[#080d18] text-slate-100">
        <section className="mx-auto max-w-6xl px-5 pb-12 pt-6">
          <div className="mb-10 rounded-3xl border border-blue-400/20 bg-gradient-to-br from-blue-950 via-slate-900 to-red-950 p-7 md:p-10">
            <div className="mb-4 text-5xl">🇦🇺</div>

            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
              {t("Иммиграционный навигатор", "Immigration navigator")}
            </p>

            <h1 className="mb-4 text-3xl font-bold md:text-5xl">
              {t("Переезд в Австралию", "Move to Australia")}
            </h1>

            <p className="max-w-3xl leading-7 text-slate-300">
              {t(
                "Ответьте на вопросы, чтобы увидеть предварительно подходящие визовые и иммиграционные маршруты Австралии. Навигатор учитывает цель поездки, гражданство, квалификацию, опыт, спонсорство, семейные связи и другие обстоятельства.",
                "Answer the questions to explore potentially relevant Australian visa and immigration routes. The navigator considers travel purpose, citizenship, qualifications, experience, sponsorship, family relationships and other circumstances."
              )}
            </p>

            <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-300">
              {[
                ["💼", "Работа", "Work"],
                ["🎓", "Учёба", "Study"],
                ["❤️", "Партнёр", "Partner"],
                ["⭐", "Квалифицированная миграция", "Skilled migration"],
                ["🧳", "Визит", "Visit"],
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
                  style={{
                    width: `${(answered / questions.length) * 100}%`,
                  }}
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
                      <span className="mr-2 text-blue-300">
                        {index + 1}.
                      </span>
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
                    "Это предварительное сопоставление ответов с общими характеристиками визовых категорий. Процент не является официальным баллом, юридическим заключением или вероятностью одобрения.",
                    "This is a preliminary comparison of your answers with general visa-category characteristics. The percentage is not an official score, legal opinion or probability of approval."
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

                          {route.id === "whm" && (
                            <p className="mt-3 text-sm leading-6 text-amber-300">
                              {t(
                                "Важно: право на подклассы 417 и 462 зависит от паспорта и действующих правил. Список стран, возрастные пределы и лимиты проверяйте на официальном сайте.",
                                "Important: eligibility for subclasses 417 and 462 depends on your passport and current rules. Check the official website for country lists, age limits and caps."
                              )}
                            </p>
                          )}

                          {route.id === "189" && (
                            <p className="mt-3 text-sm leading-6 text-amber-300">
                              {t(
                                "Набор 65 баллов — только минимальный порог для участия в системе баллов, а не гарантия приглашения. Профессия, оценка квалификации и конкуренция также имеют значение.",
                                "A score of 65 is only the minimum points threshold, not a guarantee of invitation. Occupation, skills assessment and competition also matter."
                              )}
                            </p>
                          )}

                          {route.id === "protection" && (
                            <p className="mt-3 text-sm leading-6 text-amber-300">
                              {t(
                                "Важно: защита — чувствительная юридическая процедура с особыми требованиями. Обратитесь к квалифицированному специалисту по вопросам миграции или защиты.",
                                "Important: protection is a sensitive legal process with specific requirements. Seek qualified migration or protection advice."
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

              {answers.goal === "holidayWork" && answers.citizenship && (
                <div className="mt-6 rounded-2xl border border-amber-300/20 bg-amber-300/5 p-4 text-sm leading-6 text-slate-300">
                  <strong className="text-amber-200">
                    {t(
                      "Проверьте право на Working Holiday",
                      "Check Working Holiday eligibility"
                    )}
                  </strong>

                  <p className="mt-2">
                    {t(
                      "Не все страны участвуют в обеих программах. Используйте официальный список и проверьте текущие возрастные, финансовые и другие требования.",
                      "Not all countries participate in both programs. Check the official country list and current age, financial and other requirements."
                    )}
                  </p>

                  <a
                    className="mt-3 inline-block font-semibold text-blue-300 hover:text-blue-200"
                    href="https://immi.homeaffairs.gov.au/what-we-do/whm-program"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("Официальная информация о WHM", "Official WHM information")} ↗
                  </a>
                </div>
              )}

              {immigrationConcern && (
                <div className="mt-6 rounded-2xl border border-amber-300/20 bg-amber-300/5 p-4 text-sm leading-6 text-slate-300">
                  <strong className="text-amber-200">
                    {t("Внимание к иммиграционной истории", "Immigration history")}
                  </strong>

                  <p className="mt-2">
                    {t(
                      "Отказ, отмена визы или нарушение условий могут повлиять на последующие заявления. Последствия зависят от обстоятельств и действующего законодательства; перед подачей рассмотрите индивидуальную консультацию.",
                      "A refusal, visa cancellation or condition breach may affect future applications. Consequences depend on the facts and current law; consider individual advice before applying."
                    )}
                  </p>
                </div>
              )}

              {answers.currentStatus === "expired" && (
                <div className="mt-6 rounded-2xl border border-amber-300/20 bg-amber-300/5 p-4 text-sm leading-6 text-slate-300">
                  <strong className="text-amber-200">
                    {t("Возможная проблема со статусом", "Potential visa-status issue")}
                  </strong>

                  <p className="mt-2">
                    {t(
                      "Если вы находитесь в Австралии без действующей визы, последствия могут быть серьёзными. Не полагайтесь на результат анкеты; обратитесь за квалифицированной юридической помощью как можно скорее.",
                      "If you are in Australia without a valid visa, consequences may be serious. Do not rely on this questionnaire; seek qualified legal assistance as soon as possible."
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
                    "Визовые правила, сборы, списки профессий, квоты и сроки могут меняться. Перед подачей проверяйте официальные источники Министерства внутренних дел Австралии. Этот навигатор носит информационный характер и не является юридической консультацией.",
                    "Visa rules, fees, occupation lists, caps and processing times can change. Check official Australian Department of Home Affairs sources before applying. This navigator is informational and is not legal advice."
                  )}
                </p>

                <div className="mt-3 flex flex-wrap gap-4">
                  <a
                    href="https://immi.homeaffairs.gov.au/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-blue-300 hover:text-blue-200"
                  >
                    Department of Home Affairs ↗
                  </a>

                  <a
                    href="https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-blue-300 hover:text-blue-200"
                  >
                    {t("Список виз", "Visa listing")} ↗
                  </a>

                  <a
                    href="https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-processing-times"
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
            {t("Иммиграционный навигатор Австралии", "Australia Immigration Navigator")} ·{" "}
            <Link
              href="/world-navigator"
              className="text-blue-300 transition hover:text-blue-200"
            >
              {t("Все страны", "All countries")}
            </Link>
          </footer>
        </section>
      </main>
    </>
  );
}