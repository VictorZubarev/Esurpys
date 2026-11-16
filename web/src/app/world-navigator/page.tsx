"use client";

import { useMemo, useState } from "react";
import EsurpysNavigation from "@/shared/EsurpysNavigation";
import { useLanguage } from "@/shared/LanguageProvider";

type Answer = string;

type Option = {
  value: string;
  label: string;
  labelRu: string;
};

type Question = {
  id: string;
  label: string;
  labelRu: string;
  options: Option[];
};

type Country = {
  id: string;
  name: string;
  flag: string;
  region: string;
  regionRu: string;
  description: string;
  descriptionRu: string;
  website: string;
  pathways: string[];
  pathwaysRu: string[];
  requirements: Partial<Record<string, string[]>>;
};

type Assessment = {
  country: Country;
  score: number;
  matched: string[];
  concerns: string[];
  missing: string[];
};

const QUESTIONS: Question[] = [
  {
    id: "citizenship",
    label: "What is your citizenship?",
    labelRu: "Какое у вас гражданство?",
    options: [
      { value: "russia", label: "Russia", labelRu: "Россия" },
      { value: "ukraine", label: "Ukraine", labelRu: "Украина" },
      { value: "belarus", label: "Belarus", labelRu: "Беларусь" },
      { value: "kazakhstan", label: "Kazakhstan", labelRu: "Казахстан" },
      { value: "uzbekistan", label: "Uzbekistan", labelRu: "Узбекистан" },
      { value: "armenia", label: "Armenia", labelRu: "Армения" },
      { value: "azerbaijan", label: "Azerbaijan", labelRu: "Азербайджан" },
      { value: "georgia", label: "Georgia", labelRu: "Грузия" },
      { value: "moldova", label: "Moldova", labelRu: "Молдова" },
      { value: "kyrgyzstan", label: "Kyrgyzstan", labelRu: "Кыргызстан" },
      { value: "tajikistan", label: "Tajikistan", labelRu: "Таджикистан" },
      { value: "turkmenistan", label: "Turkmenistan", labelRu: "Туркменистан" },
      { value: "latvia", label: "Latvia", labelRu: "Латвия" },
      { value: "lithuania", label: "Lithuania", labelRu: "Литва" },
      { value: "estonia", label: "Estonia", labelRu: "Эстония" },
      { value: "poland", label: "Poland", labelRu: "Польша" },
      { value: "netherlands", label: "Netherlands", labelRu: "Нидерланды" },
      { value: "germany", label: "Germany", labelRu: "Германия" },
      { value: "france", label: "France", labelRu: "Франция" },
      { value: "eu", label: "Other EU / EEA country", labelRu: "Другая страна ЕС / ЕЭЗ" },
      { value: "uk", label: "United Kingdom", labelRu: "Великобритания" },
      { value: "us", label: "United States", labelRu: "США" },
      { value: "canada", label: "Canada", labelRu: "Канада" },
      { value: "australia", label: "Australia", labelRu: "Австралия" },
      { value: "new-zealand", label: "New Zealand", labelRu: "Новая Зеландия" },
      { value: "other", label: "Other country", labelRu: "Другая страна" },
    ],
  },
  {
    id: "age",
    label: "How old are you?",
    labelRu: "Сколько вам лет?",
    options: [
      { value: "under18", label: "Under 18", labelRu: "Меньше 18 лет" },
      { value: "18-29", label: "18–29", labelRu: "18–29 лет" },
      { value: "30-35", label: "30–35", labelRu: "30–35 лет" },
      { value: "36-44", label: "36–44", labelRu: "36–44 года" },
      { value: "45plus", label: "45+", labelRu: "45 лет и старше" },
    ],
  },
  {
    id: "residenceCountry",
    label: "Where do you currently live?",
    labelRu: "В какой стране вы сейчас живёте?",
    options: [
      { value: "russia", label: "Russia", labelRu: "Россия" },
      { value: "ukraine", label: "Ukraine", labelRu: "Украина" },
      { value: "belarus", label: "Belarus", labelRu: "Беларусь" },
      { value: "kazakhstan", label: "Kazakhstan", labelRu: "Казахстан" },
      { value: "uzbekistan", label: "Uzbekistan", labelRu: "Узбекистан" },
      { value: "armenia", label: "Armenia", labelRu: "Армения" },
      { value: "azerbaijan", label: "Azerbaijan", labelRu: "Азербайджан" },
      { value: "georgia", label: "Georgia", labelRu: "Грузия" },
      { value: "moldova", label: "Moldova", labelRu: "Молдова" },
      { value: "kyrgyzstan", label: "Kyrgyzstan", labelRu: "Кыргызстан" },
      { value: "tajikistan", label: "Tajikistan", labelRu: "Таджикистан" },
      { value: "turkmenistan", label: "Turkmenistan", labelRu: "Туркменистан" },
      { value: "latvia", label: "Latvia", labelRu: "Латвия" },
      { value: "lithuania", label: "Lithuania", labelRu: "Литва" },
      { value: "estonia", label: "Estonia", labelRu: "Эстония" },
      { value: "poland", label: "Poland", labelRu: "Польша" },
      { value: "netherlands", label: "Netherlands", labelRu: "Нидерланды" },
      { value: "germany", label: "Germany", labelRu: "Германия" },
      { value: "france", label: "France", labelRu: "Франция" },
      { value: "eu", label: "Other EU / EEA country", labelRu: "Другая страна ЕС / ЕЭЗ" },
      { value: "uk", label: "United Kingdom", labelRu: "Великобритания" },
      { value: "us", label: "United States", labelRu: "США" },
      { value: "canada", label: "Canada", labelRu: "Канада" },
      { value: "australia", label: "Australia", labelRu: "Австралия" },
      { value: "new-zealand", label: "New Zealand", labelRu: "Новая Зеландия" },
      { value: "other", label: "Other country", labelRu: "Другая страна" },
    ],
  },
  {
    id: "immigrationHistory",
    label: "Have you had immigration or visa problems?",
    labelRu: "Были ли у вас проблемы с визами или миграционными правилами?",
    options: [
      { value: "none", label: "No previous problems", labelRu: "Нет, проблем не было" },
      { value: "refusal", label: "Visa refusal", labelRu: "Был отказ в визе" },
      { value: "overstay", label: "Overstay or status violation", labelRu: "Нарушение срока пребывания или статуса" },
      { value: "criminal", label: "Criminal or serious legal issue", labelRu: "Судимость или серьёзная юридическая проблема" },
      { value: "prefer_not", label: "Prefer not to say", labelRu: "Не хочу отвечать" },
    ],
  },
  {
    id: "goal",
    label: "What is your main goal?",
    labelRu: "Какова ваша главная цель переезда?",
    options: [
      { value: "work", label: "Work", labelRu: "Работа" },
      { value: "study", label: "Study", labelRu: "Учёба" },
      { value: "business", label: "Business / investment", labelRu: "Бизнес или инвестиции" },
      { value: "family", label: "Join family / partner", labelRu: "Воссоединение с семьёй или партнёром" },
      { value: "permanent", label: "Permanent residence", labelRu: "Постоянное проживание" },
      { value: "temporary", label: "Temporary stay", labelRu: "Временное пребывание" },
    ],
  },
  {
    id: "job",
    label: "What is your professional situation?",
    labelRu: "Какая у вас профессиональная ситуация?",
    options: [
      { value: "offer", label: "I have a job offer", labelRu: "У меня есть предложение о работе" },
      { value: "skilled", label: "Skilled professional, no offer yet", labelRu: "Квалифицированный специалист, предложения пока нет" },
      { value: "remote", label: "Remote worker / freelancer", labelRu: "Удалённый сотрудник или фрилансер" },
      { value: "business", label: "Business owner / entrepreneur", labelRu: "Предприниматель или владелец бизнеса" },
      { value: "unskilled", label: "Entry-level / other work", labelRu: "Начальная квалификация или другая работа" },
      { value: "none", label: "Not currently working", labelRu: "Сейчас не работаю" },
    ],
  },
  {
    id: "education",
    label: "What is your highest education level?",
    labelRu: "Какое у вас образование?",
    options: [
      { value: "school", label: "Secondary school", labelRu: "Среднее образование" },
      { value: "vocational", label: "Vocational / professional training", labelRu: "Среднее специальное или профессиональное" },
      { value: "bachelor", label: "Bachelor's degree", labelRu: "Степень бакалавра" },
      { value: "master", label: "Master's degree", labelRu: "Степень магистра" },
      { value: "phd", label: "Doctorate", labelRu: "Докторская степень" },
    ],
  },
  {
    id: "language",
    label: "What is your language level?",
    labelRu: "Какой у вас уровень языка страны или английского?",
    options: [
      { value: "none", label: "Beginner / no test", labelRu: "Начальный уровень, экзамен не сдавал(а)" },
      { value: "basic", label: "Basic", labelRu: "Базовый" },
      { value: "intermediate", label: "Intermediate", labelRu: "Средний" },
      { value: "advanced", label: "Advanced", labelRu: "Продвинутый" },
      { value: "native", label: "Native / near-native", labelRu: "Родной или почти свободный" },
    ],
  },
  {
    id: "funds",
    label: "How much money can you access for relocation?",
    labelRu: "Какие средства доступны вам для переезда?",
    options: [
      { value: "low", label: "Limited savings", labelRu: "Небольшие накопления" },
      { value: "medium", label: "Moderate savings", labelRu: "Средние накопления" },
      { value: "high", label: "Substantial savings", labelRu: "Значительные накопления" },
      { value: "sponsor", label: "Employer / family sponsor", labelRu: "Финансовая поддержка работодателя или семьи" },
      { value: "unknown", label: "Not sure yet", labelRu: "Пока не знаю" },
    ],
  },
  {
    id: "study",
    label: "Would you consider studying abroad?",
    labelRu: "Рассматриваете ли вы учёбу за границей?",
    options: [
      { value: "yes", label: "Yes", labelRu: "Да" },
      { value: "maybe", label: "Maybe", labelRu: "Возможно" },
      { value: "no", label: "No", labelRu: "Нет" },
    ],
  },
  {
    id: "family",
    label: "Do you have a qualifying close family member in another country?",
    labelRu: "Есть ли у вас близкий родственник или партнёр в другой стране?",
    options: [
      { value: "yes", label: "Yes", labelRu: "Да, есть близкий родственник" },
      { value: "no", label: "No", labelRu: "Нет" },
      { value: "partner", label: "Spouse / partner abroad", labelRu: "Супруг, супруга или партнёр за границей" },
      { value: "unknown", label: "Not sure if eligible", labelRu: "Не знаю, подходит ли мой случай" },
    ],
  },
  {
    id: "experience",
    label: "How much relevant work experience do you have?",
    labelRu: "Сколько у вас опыта работы по специальности?",
    options: [
      { value: "none", label: "None yet", labelRu: "Пока нет опыта" },
      { value: "under2", label: "Less than 2 years", labelRu: "Меньше 2 лет" },
      { value: "2-5", label: "2–5 years", labelRu: "2–5 лет" },
      { value: "5plus", label: "5+ years", labelRu: "5 лет и больше" },
    ],
  },
  {
    id: "duration",
    label: "How long do you want to stay?",
    labelRu: "На какой срок вы хотите переехать?",
    options: [
      { value: "temporary", label: "A few months", labelRu: "На несколько месяцев" },
      { value: "years", label: "Several years", labelRu: "На несколько лет" },
      { value: "permanent", label: "Permanently", labelRu: "На постоянное проживание" },
      { value: "unsure", label: "Not sure yet", labelRu: "Пока не решил(а)" },
    ],
  },
];

const COUNTRIES: Country[] = [
  {
    id: "canada",
    name: "Canada",
    flag: "🇨🇦",
    region: "North America",
    regionRu: "Северная Америка",
    description: "Skilled-worker, provincial, study and family immigration routes.",
    descriptionRu: "Иммиграция квалифицированных специалистов, провинциальные программы, учёба и воссоединение семьи.",
    website: "https://www.canada.ca/en/immigration-refugees-citizenship.html",
    pathways: [
      "Express Entry and eligible economic programs",
      "Provincial nominee programs",
      "Study permits and eligible post-study routes",
      "Family sponsorship where eligible",
    ],
    pathwaysRu: [
      "Express Entry и подходящие экономические программы",
      "Провинциальные иммиграционные программы",
      "Разрешение на учёбу и доступные варианты после неё",
      "Семейное спонсорство при соблюдении требований",
    ],
    requirements: {
      goal: ["work", "study", "family", "permanent"],
      age: ["18-29", "30-35", "36-44"],
      job: ["offer", "skilled"],
      education: ["vocational", "bachelor", "master", "phd"],
      language: ["intermediate", "advanced", "native"],
      funds: ["medium", "high", "sponsor"],
      study: ["yes", "maybe"],
      family: ["yes", "partner"],
      experience: ["2-5", "5plus"],
      duration: ["years", "permanent"],
    },
  },
  {
    id: "australia",
    name: "Australia",
    flag: "🇦🇺",
    region: "Oceania",
    regionRu: "Океания",
    description: "Skilled migration, employer sponsorship, study and family visa pathways.",
    descriptionRu: "Квалифицированная иммиграция, спонсорство работодателя, учёба и семейные визы.",
    website: "https://immi.homeaffairs.gov.au/",
    pathways: [
      "Points-tested skilled migration, if eligible",
      "Employer-sponsored visas",
      "Student visas and eligible subsequent options",
      "Family and partner visas",
    ],
    pathwaysRu: [
      "Балльные программы для специалистов при соответствии критериям",
      "Визы при спонсорстве работодателя",
      "Студенческие визы и возможные дальнейшие варианты",
      "Семейные визы и визы партнёров",
    ],
    requirements: {
      goal: ["work", "study", "family", "permanent"],
      age: ["18-29", "30-35", "36-44"],
      job: ["offer", "skilled"],
      education: ["vocational", "bachelor", "master", "phd"],
      language: ["intermediate", "advanced", "native"],
      funds: ["medium", "high", "sponsor"],
      study: ["yes", "maybe"],
      family: ["yes", "partner"],
      experience: ["2-5", "5plus"],
      duration: ["years", "permanent"],
    },
  },
  {
    id: "new-zealand",
    name: "New Zealand",
    flag: "🇳🇿",
    region: "Oceania",
    regionRu: "Океания",
    description: "Work, employer-linked, study and family routes subject to current criteria.",
    descriptionRu: "Рабочие визы, варианты через работодателя, учёба и семейные категории при соблюдении требований.",
    website: "https://www.immigration.govt.nz/",
    pathways: [
      "Accredited-employer work routes",
      "Eligible skilled residence pathways",
      "Student visas",
      "Partner and family visas",
    ],
    pathwaysRu: [
      "Рабочие визы через аккредитованного работодателя",
      "Программы проживания для квалифицированных специалистов",
      "Студенческие визы",
      "Визы партнёров и членов семьи",
    ],
    requirements: {
      goal: ["work", "study", "family", "permanent"],
      job: ["offer", "skilled"],
      education: ["vocational", "bachelor", "master", "phd"],
      language: ["intermediate", "advanced", "native"],
      funds: ["medium", "high", "sponsor"],
      study: ["yes", "maybe"],
      family: ["yes", "partner"],
      experience: ["2-5", "5plus"],
      duration: ["years", "permanent"],
    },
  },
  {
    id: "germany",
    name: "Germany",
    flag: "🇩🇪",
    region: "Europe",
    regionRu: "Европа",
    description: "Employment, EU Blue Card, vocational training, study and family routes.",
    descriptionRu: "Работа, Голубая карта ЕС, профессиональное обучение, учёба и воссоединение семьи.",
    website: "https://www.make-it-in-germany.com/en/",
    pathways: [
      "EU Blue Card if salary and qualification criteria are met",
      "Skilled-worker residence permits",
      "Opportunity Card, if eligible",
      "Study, vocational training and family routes",
    ],
    pathwaysRu: [
      "Голубая карта ЕС при выполнении требований к зарплате и квалификации",
      "ВНЖ для квалифицированных специалистов",
      "Карта возможностей при соответствии критериям",
      "Учёба, профессиональное обучение и семейные программы",
    ],
    requirements: {
      goal: ["work", "study", "family", "permanent"],
      job: ["offer", "skilled", "business"],
      education: ["vocational", "bachelor", "master", "phd"],
      language: ["basic", "intermediate", "advanced", "native"],
      funds: ["medium", "high", "sponsor"],
      study: ["yes", "maybe"],
      family: ["yes", "partner"],
      experience: ["2-5", "5plus"],
      duration: ["years", "permanent"],
    },
  },
  {
    id: "ireland",
    name: "Ireland",
    flag: "🇮🇪",
    region: "Europe",
    regionRu: "Европа",
    description: "Employment permits, study and family immigration options.",
    descriptionRu: "Разрешения на работу, учёба и варианты иммиграции через семью.",
    website: "https://www.irishimmigration.ie/",
    pathways: [
      "Critical Skills Employment Permit",
      "General Employment Permit, if eligible",
      "Study routes",
      "Family reunification where permitted",
    ],
    pathwaysRu: [
      "Разрешение на работу для специалистов востребованных профессий",
      "Общее разрешение на работу при соблюдении требований",
      "Учебные программы",
      "Воссоединение семьи в предусмотренных случаях",
    ],
    requirements: {
      goal: ["work", "study", "family", "permanent"],
      job: ["offer", "skilled"],
      education: ["vocational", "bachelor", "master", "phd"],
      language: ["intermediate", "advanced", "native"],
      funds: ["medium", "high", "sponsor"],
      study: ["yes", "maybe"],
      family: ["yes", "partner"],
      experience: ["2-5", "5plus"],
      duration: ["years", "permanent"],
    },
  },
  {
    id: "netherlands",
    name: "Netherlands",
    flag: "🇳🇱",
    region: "Europe",
    regionRu: "Европа",
    description: "Highly skilled migrant, EU Blue Card, study and family routes.",
    descriptionRu: "ВНЖ для высококвалифицированных мигрантов, Голубая карта ЕС, учёба и семейные программы.",
    website: "https://ind.nl/en",
    pathways: [
      "Highly skilled migrant route with a qualifying sponsor",
      "EU Blue Card where criteria are met",
      "Study and eligible subsequent routes",
      "Partner and family residence",
    ],
    pathwaysRu: [
      "ВНЖ высококвалифицированного мигранта через подходящего спонсора",
      "Голубая карта ЕС при соблюдении требований",
      "Учёба и доступные дальнейшие варианты",
      "ВНЖ для партнёров и членов семьи",
    ],
    requirements: {
      goal: ["work", "study", "family", "permanent"],
      job: ["offer", "skilled"],
      education: ["vocational", "bachelor", "master", "phd"],
      language: ["basic", "intermediate", "advanced", "native"],
      funds: ["medium", "high", "sponsor"],
      study: ["yes", "maybe"],
      family: ["yes", "partner"],
      experience: ["2-5", "5plus"],
      duration: ["years", "permanent"],
    },
  },
  {
    id: "usa",
    name: "United States",
    flag: "🇺🇸",
    region: "North America",
    regionRu: "Северная Америка",
    description: "Employment, study, family and other immigration categories with distinct legal requirements.",
    descriptionRu: "Рабочие, учебные, семейные и другие иммиграционные категории с разными юридическими требованиями.",
    website: "https://www.uscis.gov/",
    pathways: [
      "Employer-sponsored employment categories",
      "Family-based immigration, if eligible",
      "Student visas through the appropriate process",
      "Other categories where their specific requirements are met",
    ],
    pathwaysRu: [
      "Рабочие категории при спонсорстве работодателя",
      "Семейная иммиграция при соблюдении условий",
      "Студенческие визы через соответствующую процедуру",
      "Другие категории при выполнении их конкретных требований",
    ],
    requirements: {
      goal: ["work", "study", "family", "permanent"],
      job: ["offer", "skilled", "business"],
      education: ["bachelor", "master", "phd"],
      language: ["intermediate", "advanced", "native"],
      funds: ["medium", "high", "sponsor"],
      study: ["yes", "maybe"],
      family: ["yes", "partner"],
      experience: ["2-5", "5plus"],
      duration: ["years", "permanent"],
    },
  },
  {
    id: "uk",
    name: "United Kingdom",
    flag: "🇬🇧",
    region: "Europe",
    regionRu: "Европа",
    description: "Work, study, family and other routes governed by UK immigration rules.",
    descriptionRu: "Рабочие, учебные, семейные и другие программы по иммиграционным правилам Великобритании.",
    website: "https://www.gov.uk/government/organisations/uk-visas-and-immigration",
    pathways: [
      "Skilled Worker visa with a qualifying job and sponsor",
      "Student visa and eligible subsequent routes",
      "Family visas where criteria are met",
      "Other specific visa routes, depending on circumstances",
    ],
    pathwaysRu: [
      "Виза квалифицированного работника при наличии подходящей работы и спонсора",
      "Студенческая виза и доступные дальнейшие варианты",
      "Семейные визы при соблюдении требований",
      "Другие визовые программы в зависимости от обстоятельств",
    ],
    requirements: {
      goal: ["work", "study", "family", "permanent"],
      job: ["offer", "skilled"],
      education: ["vocational", "bachelor", "master", "phd"],
      language: ["intermediate", "advanced", "native"],
      funds: ["medium", "high", "sponsor"],
      study: ["yes", "maybe"],
      family: ["yes", "partner"],
      experience: ["2-5", "5plus"],
      duration: ["years", "permanent"],
    },
  },
];

const WEIGHTS: Record<string, number> = {
  citizenship: 0,
  age: 1,
  residenceCountry: 0,
  immigrationHistory: 0,
  goal: 3,
  job: 3,
  education: 2,
  language: 2,
  funds: 2,
  study: 1,
  family: 3,
  experience: 2,
  duration: 1,
};

const UI = {
  en: {
    eyebrow: "GLOBAL IMMIGRATION GUIDE",
    title: "Find your path",
    subtitle: "Compare destinations based on your goals, work, education and circumstances.",
    progress: "Your progress",
    question: "Question",
    of: "of",
    next: "Next",
    back: "Back",
    results: "See my results",
    restart: "Start over",
    resultsTitle: "Your country comparison",
    resultsSubtitle: "These are preliminary profile matches, not visa eligibility decisions or approval probabilities.",
    answered: "Answered",
    mainGoal: "Main goal",
    countries: "Countries considered",
    match: "Profile match",
    matched: "Potentially aligned factors",
    concerns: "Needs further review",
    missing: "Not answered",
    pathways: "Possible routes to investigate",
    official: "Official immigration website",
    showAll: "Show all countries",
    showLess: "Show fewer countries",
    disclaimer: "This tool provides general information only. Immigration rules depend on nationality, visa category, documents and individual circumstances. Verify all criteria with the official immigration authority.",
    reviewTitle: "Important factors to verify",
    reviewText: "A previous visa refusal, overstay or legal issue does not automatically disqualify you, but it may affect admissibility or require additional documents.",
    noMatch: "No matching factors identified yet.",
    matchNote: "This score is an indicative comparison based on the questionnaire, not a legal assessment or probability of visa approval.",
    best: "Top profile match",
    noAnswers: "No answers yet",
    noConcerns: "No obvious mismatches flagged in the answered criteria.",
    disclaimerLabel: "Disclaimer: ",
  },
  ru: {
    eyebrow: "ГЛОБАЛЬНЫЙ ИММИГРАЦИОННЫЙ ГИД",
    title: "Найдите свой путь",
    subtitle: "Сравните страны с учётом ваших целей, работы, образования и обстоятельств.",
    progress: "Ваш прогресс",
    question: "Вопрос",
    of: "из",
    next: "Далее",
    back: "Назад",
    results: "Показать результаты",
    restart: "Начать заново",
    resultsTitle: "Сравнение стран для вас",
    resultsSubtitle: "Это предварительное сравнение профиля, а не юридическое заключение или вероятность одобрения визы.",
    answered: "Отвечено",
    mainGoal: "Главная цель",
    countries: "Страны в сравнении",
    match: "Соответствие профиля",
    matched: "Потенциально подходящие факторы",
    concerns: "Требуют дополнительной проверки",
    missing: "Без ответа",
    pathways: "Возможные варианты для изучения",
    official: "Официальный иммиграционный сайт",
    showAll: "Показать все страны",
    showLess: "Показать меньше стран",
    disclaimer: "Сервис предоставляет общую информацию. Правила зависят от гражданства, типа визы, документов и индивидуальных обстоятельств. Проверяйте требования на официальном сайте миграционного ведомства.",
    reviewTitle: "Что важно проверить",
    reviewText: "Предыдущий отказ в визе, нарушение срока пребывания или юридические проблемы не всегда означают автоматический запрет, но могут повлиять на возможность получения визы и потребовать дополнительных документов.",
    noMatch: "Подходящие факторы пока не определены.",
    matchNote: "Это ориентировочное сравнение ответов анкеты, а не юридическая оценка или вероятность одобрения визы.",
    best: "Лучшее совпадение",
    noAnswers: "Ответов пока нет",
    noConcerns: "По заполненным ответам явных несоответствий не отмечено.",
    disclaimerLabel: "Важно: ",
  },
};

function getOptionLabel(questionId: string, value: string, lang: "en" | "ru") {
  const question = QUESTIONS.find((item) => item.id === questionId);
  const option = question?.options.find((item) => item.value === value);

  if (!option) return value;
  return lang === "ru" ? option.labelRu : option.label;
}

function calculateScore(
  country: Country,
  answers: Record<string, Answer>
): Assessment {
  let earned = 0;
  let possible = 0;

  const matched: string[] = [];
  const concerns: string[] = [];
  const missing: string[] = [];

  for (const question of QUESTIONS) {
    const { id } = question;
    const answer = answers[id];
    const weight = WEIGHTS[id] ?? 1;

    if (!answer) {
      if (weight > 0) missing.push(id);
      continue;
    }

    // Citizenship and current residence require visa-specific rules.
    // They are deliberately not treated as advantages or disadvantages.
    if (id === "citizenship" || id === "residenceCountry") continue;

    // Immigration history requires individual legal review.
    if (id === "immigrationHistory") {
      if (answer === "none") {
        matched.push(id);
      } else if (answer !== "prefer_not") {
        concerns.push(id);
      }
      continue;
    }

    const eligibleValues = country.requirements[id];

    if (!eligibleValues || weight <= 0) continue;

    possible += weight;

    if (eligibleValues.includes(answer)) {
      earned += weight;
      matched.push(id);
    } else {
      concerns.push(id);
    }
  }

  const score = possible > 0 ? Math.round((earned / possible) * 100) : 0;

  return { country, score, matched, concerns, missing };
}

export default function WorldNavigatorPage() {
  const { language } = useLanguage();

  const lang: "en" | "ru" = String(language ?? "en")
    .toLowerCase()
    .startsWith("ru")
    ? "ru"
    : "en";

  const t = UI[lang];

  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [step, setStep] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = QUESTIONS[step];
  const progress = ((step + 1) / QUESTIONS.length) * 100;

  const assessments = useMemo(
    () =>
      COUNTRIES.map((country) => calculateScore(country, answers)).sort(
        (a, b) => b.score - a.score
      ),
    [answers]
  );

  const visibleAssessments = showAll ? assessments : assessments.slice(0, 4);

  function chooseAnswer(value: string) {
    setAnswers((previous) => ({
      ...previous,
      [currentQuestion.id]: value,
    }));
  }

  function reset() {
    setAnswers({});
    setStep(0);
    setShowAll(false);
    setShowResults(false);
  }

  function questionLabel(id: string) {
    const question = QUESTIONS.find((item) => item.id === id);
    if (!question) return id;
    return lang === "ru" ? question.labelRu : question.label;
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <EsurpysNavigation />

      <div className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <header className="mx-auto mb-10 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-xs font-semibold tracking-[0.18em] text-blue-300">
            {t.eyebrow}
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {showResults ? t.resultsTitle : t.title}
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
            {showResults ? t.resultsSubtitle : t.subtitle}
          </p>
        </header>

        {!showResults ? (
          <section className="mx-auto max-w-3xl rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-2xl shadow-black/20 sm:p-8">
            <div className="mb-7 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-400">
                  {t.progress}
                </p>
                <p className="mt-1 text-lg font-semibold">
                  {t.question} {step + 1} {t.of} {QUESTIONS.length}
                </p>
              </div>

              <div className="rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-300">
                {Math.round(progress)}%
              </div>
            </div>

            <div className="mb-8 h-2 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div key={currentQuestion.id}>
              <p className="mb-2 text-sm font-medium text-blue-300">
                {t.question} {step + 1}
              </p>

              <h2 className="mb-6 text-2xl font-semibold leading-snug sm:text-3xl">
                {lang === "ru"
                  ? currentQuestion.labelRu
                  : currentQuestion.label}
              </h2>

              <div className="grid gap-3">
                {currentQuestion.options.map((option) => {
                  const selected =
                    answers[currentQuestion.id] === option.value;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => chooseAnswer(option.value)}
                      aria-pressed={selected}
                      className={`group flex w-full items-center justify-between rounded-2xl border p-4 text-left transition ${
                        selected
                          ? "border-blue-400 bg-blue-500/10 ring-1 ring-blue-400/30"
                          : "border-slate-700 bg-slate-950/40 hover:border-slate-500 hover:bg-slate-800/80"
                      }`}
                    >
                      <span className="pr-3 text-sm font-medium leading-6 text-slate-100 sm:text-base">
                        {lang === "ru" ? option.labelRu : option.label}
                      </span>

                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                          selected
                            ? "border-blue-400 bg-blue-400"
                            : "border-slate-600"
                        }`}
                      >
                        {selected && (
                          <span className="h-2 w-2 rounded-full bg-slate-950" />
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between gap-3 border-t border-slate-800 pt-6">
              <button
                type="button"
                disabled={step === 0}
                onClick={() =>
                  setStep((previous) => Math.max(0, previous - 1))
                }
                className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
              >
                ← {t.back}
              </button>

              {step < QUESTIONS.length - 1 ? (
                <button
                  type="button"
                  onClick={() =>
                    setStep((previous) =>
                      Math.min(QUESTIONS.length - 1, previous + 1)
                    )
                  }
                  className="rounded-xl bg-blue-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-400"
                >
                  {t.next} →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowResults(true)}
                  className="rounded-xl bg-blue-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-400"
                >
                  {t.results} →
                </button>
              )}
            </div>

            <p className="mt-5 text-xs leading-5 text-slate-500">
              {t.disclaimer}
            </p>
          </section>
        ) : (
          <section>
            <div className="mb-7 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <p className="text-sm text-slate-400">{t.countries}</p>
                <p className="mt-2 text-3xl font-bold">{COUNTRIES.length}</p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <p className="text-sm text-slate-400">{t.answered}</p>
                <p className="mt-2 text-3xl font-bold">
                  {Object.keys(answers).length}/{QUESTIONS.length}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <p className="text-sm text-slate-400">{t.mainGoal}</p>
                <p className="mt-2 text-xl font-bold">
                  {answers.goal
                    ? getOptionLabel("goal", answers.goal, lang)
                    : t.noAnswers}
                </p>
              </div>
            </div>

            <div className="mb-6 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">
              <h2 className="font-semibold text-amber-200">
                {t.reviewTitle}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                {t.reviewText}
              </p>
            </div>

            <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <h2 className="text-2xl font-bold">{t.resultsTitle}</h2>
                <p className="mt-2 text-sm text-slate-400">{t.matchNote}</p>
              </div>

              <button
                type="button"
                onClick={reset}
                className="self-start rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-slate-800 sm:self-auto"
              >
                ↻ {t.restart}
              </button>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              {visibleAssessments.map((assessment, index) => {
                const { country, score, matched, concerns, missing } =
                  assessment;

                return (
                  <article
                    key={country.id}
                    className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 transition hover:border-slate-700"
                  >
                    <div className="p-5 sm:p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-slate-700 bg-slate-800 text-4xl">
                          {country.flag}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-xl font-bold">
                              {country.name}
                            </h3>

                            {index === 0 && (
                              <span className="rounded-full border border-blue-400/20 bg-blue-400/10 px-2.5 py-1 text-xs font-semibold text-blue-300">
                                {t.best}
                              </span>
                            )}
                          </div>

                          <p className="mt-1 text-sm text-slate-400">
                            {lang === "ru"
                              ? country.regionRu
                              : country.region}
                          </p>

                          <p className="mt-3 text-sm leading-6 text-slate-300">
                            {lang === "ru"
                              ? country.descriptionRu
                              : country.description}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                        <div className="mb-3 flex items-center justify-between gap-3">
                          <span className="text-sm font-medium text-slate-300">
                            {t.match}
                          </span>
                          <span className="text-2xl font-bold tabular-nums">
                            {score}%
                          </span>
                        </div>

                        <div className="h-2.5 overflow-hidden rounded-full bg-slate-800">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500"
                            style={{ width: `${score}%` }}
                          />
                        </div>

                        <p className="mt-3 text-xs leading-5 text-slate-500">
                          {t.matchNote}
                        </p>
                      </div>

                      <div className="mt-5 grid gap-4 sm:grid-cols-2">
                        <div>
                          <h4 className="mb-3 text-sm font-semibold text-emerald-300">
                            ✓ {t.matched}
                          </h4>

                          {matched.length ? (
                            <ul className="space-y-2">
                              {matched.map((id) => (
                                <li
                                  key={id}
                                  className="flex gap-2 text-sm text-slate-300"
                                >
                                  <span className="text-emerald-400">•</span>
                                  {questionLabel(id)}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-sm leading-6 text-slate-500">
                              {t.noMatch}
                            </p>
                          )}
                        </div>

                        <div>
                          <h4 className="mb-3 text-sm font-semibold text-amber-300">
                            ! {t.concerns}
                          </h4>

                          {concerns.length ? (
                            <ul className="space-y-2">
                              {concerns.map((id) => (
                                <li
                                  key={id}
                                  className="flex gap-2 text-sm text-slate-300"
                                >
                                  <span className="text-amber-400">•</span>
                                  {questionLabel(id)}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-sm leading-6 text-slate-500">
                              {t.noConcerns}
                            </p>
                          )}
                        </div>
                      </div>

                      {missing.length > 0 && (
                        <div className="mt-5">
                          <h4 className="mb-2 text-sm font-semibold text-slate-400">
                            {t.missing}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {missing.map((id) => (
                              <span
                                key={id}
                                className="rounded-lg border border-slate-700 bg-slate-800/60 px-2.5 py-1.5 text-xs text-slate-400"
                              >
                                {questionLabel(id)}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="mt-6 border-t border-slate-800 pt-5">
                        <h4 className="mb-3 text-sm font-semibold text-slate-200">
                          {t.pathways}
                        </h4>

                        <ul className="space-y-2">
                          {(lang === "ru"
                            ? country.pathwaysRu
                            : country.pathways
                          ).map((pathway) => (
                            <li
                              key={pathway}
                              className="flex gap-2 text-sm leading-6 text-slate-300"
                            >
                              <span className="text-blue-400">↗</span>
                              <span>{pathway}</span>
                            </li>
                          ))}
                        </ul>

                        <a
                          href={country.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-5 inline-flex items-center gap-2 rounded-xl border border-blue-400/30 bg-blue-400/5 px-4 py-3 text-sm font-semibold text-blue-300 transition hover:bg-blue-400/10"
                        >
                          {t.official}
                          <span aria-hidden="true">↗</span>
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="mt-7 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAll((previous) => !previous)}
                className="rounded-xl border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-800"
              >
                {showAll ? t.showLess : t.showAll}
              </button>
            </div>

            <div className="mt-8 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">
              <p className="text-sm leading-6 text-slate-300">
                <span className="font-semibold text-amber-200">
                  {t.disclaimerLabel}
                </span>
                {t.disclaimer}
              </p>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}