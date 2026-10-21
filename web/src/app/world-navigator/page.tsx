"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Language = "EN" | "RU";

type Profile = {
  nationality: string;
  age: string;
  education: string;
  jobOffer: string;
  occupation: string;
  experience: string;
  english: string;
  budget: string;
  purpose: string;
  family: string;
};

type VisaRoute = {
  id: string;
  country: string;
  countryCode: string;
  name: string;
  category: string;
  description: Record<Language, string>;
  requirements: Record<Language, string[]>;
  officialUrl: string;
  matches: (profile: Profile) => boolean;
};

const countries = [
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
  { code: "NZ", name: "New Zealand", flag: "🇳🇿" },
  { code: "DE", name: "Germany", flag: "🇩🇪" },
];

const ukEnglishExemptNationalities = [
  "antigua and barbuda", "australia", "bahamas", "the bahamas", "barbados",
  "belize", "canada", "dominica", "grenada", "guyana", "ireland", "jamaica",
  "malta", "new zealand", "st kitts and nevis", "saint kitts and nevis",
  "st lucia", "saint lucia", "st vincent and the grenadines",
  "saint vincent and the grenadines", "trinidad and tobago", "usa", "us",
  "united states", "united states of america",
];

function normalizeText(value: string) {
  return value.trim().toLowerCase().normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "").replace(/[.,]/g, "")
    .replace(/\s+/g, " ");
}

function hasUkEnglishExemption(nationality: string) {
  const value = normalizeText(nationality);
  return ukEnglishExemptNationalities.some(
    (country) => value === normalizeText(country)
  );
}

const visaRoutes: VisaRoute[] = [
  {
    id: "uk-skilled-worker", country: "United Kingdom", countryCode: "GB",
    name: "Skilled Worker visa", category: "Work",
    description: {
      EN: "For eligible skilled professionals with a qualifying job offer from an approved UK sponsor.",
      RU: "Для квалифицированных специалистов с подходящим предложением работы от одобренного британского работодателя.",
    },
    requirements: {
      EN: [
        "A job offer from an eligible licensed sponsor",
        "The role and salary must meet current requirements",
        "English-language requirements must be met or an applicable exemption must apply",
      ],
      RU: [
        "Предложение работы от подходящего лицензированного спонсора",
        "Соответствие актуальным требованиям к должности и зарплате",
        "Выполнение требований к английскому языку или наличие применимого исключения",
      ],
    },
    officialUrl: "https://www.gov.uk/skilled-worker-visa",
    matches: (p) =>
      p.purpose === "work" &&
      p.jobOffer === "yes" &&
      (p.english !== "no" || hasUkEnglishExemption(p.nationality)),
  },
  {
    id: "uk-global-talent", country: "United Kingdom", countryCode: "GB",
    name: "Global Talent visa", category: "Talent",
    description: {
      EN: "For eligible leaders and potential leaders in research, arts, culture and digital technology.",
      RU: "Для признанных и перспективных специалистов в исследованиях, искусстве, культуре и цифровых технологиях.",
    },
    requirements: {
      EN: [
        "A profile that meets the relevant route criteria",
        "Endorsement where required, or an eligible prize",
        "Evidence of achievements and professional recognition",
      ],
      RU: [
        "Профиль, соответствующий критериям маршрута",
        "Одобрение уполномоченного органа, если требуется, либо подходящая награда",
        "Подтверждение достижений и профессионального признания",
      ],
    },
    officialUrl: "https://www.gov.uk/global-talent",
    matches: (p) =>
      p.purpose === "work" &&
      (p.experience === "senior" ||
        ["technology", "research", "creative"].includes(p.occupation)),
  },
  {
    id: "uk-innovator-founder", country: "United Kingdom", countryCode: "GB",
    name: "Innovator Founder visa", category: "Business",
    description: {
      EN: "For entrepreneurs who want to establish an innovative business in the UK and meet the route requirements.",
      RU: "Для предпринимателей, планирующих развивать инновационный бизнес в Великобритании и соответствующих требованиям маршрута.",
    },
    requirements: {
      EN: [
        "An eligible innovative business idea",
        "Endorsement from an approved endorsing body",
        "Applicants must be at least 18 and meet the route's English and other requirements",
      ],
      RU: [
        "Подходящая инновационная бизнес-идея",
        "Одобрение уполномоченной организации",
        "Возраст не менее 18 лет, выполнение языковых и других требований маршрута",
      ],
    },
    officialUrl: "https://www.gov.uk/innovator-founder-visa",
    matches: (p) =>
      p.purpose === "business" && (!p.age || Number(p.age) >= 18),
  },
  {
    id: "uk-student", country: "United Kingdom", countryCode: "GB",
    name: "Student visa", category: "Study",
    description: {
      EN: "For eligible international students accepted by an approved UK education provider.",
      RU: "Для иностранных студентов, принятых в подходящее учебное заведение Великобритании.",
    },
    requirements: {
      EN: [
        "Acceptance by an eligible education provider",
        "Evidence of sufficient funds, even where documentary exceptions apply",
        "Compliance with language and other visa requirements",
        "Applicants aged 16 or 17 have additional requirements",
      ],
      RU: [
        "Зачисление в подходящее учебное заведение",
        "Наличие достаточных средств, даже если действуют исключения по документам",
        "Выполнение языковых и других визовых требований",
        "Для заявителей 16–17 лет действуют дополнительные требования",
      ],
    },
    officialUrl: "https://www.gov.uk/student-visa",
    matches: (p) =>
      p.purpose === "study" && (!p.age || Number(p.age) >= 16),
  },
  {
    id: "uk-family", country: "United Kingdom", countryCode: "GB",
    name: "Family visa", category: "Family",
    description: {
      EN: "For eligible family members joining someone who lives in the UK.",
      RU: "Для некоторых членов семьи, которые хотят присоединиться к человеку, проживающему в Великобритании.",
    },
    requirements: {
      EN: [
        "A qualifying family relationship",
        "Meeting the financial and other requirements for the specific route",
        "Supporting evidence and documents",
        "Age requirements depend on the type of family application",
      ],
      RU: [
        "Подходящие семейные отношения",
        "Выполнение финансовых и других требований конкретного маршрута",
        "Подтверждающие документы",
        "Возрастные требования зависят от типа семейного заявления",
      ],
    },
    officialUrl: "https://www.gov.uk/uk-family-visa",
    matches: (p) => p.purpose === "family" || p.family === "yes",
  },
  {
    id: "us-h1b", country: "United States", countryCode: "US",
    name: "H-1B specialty occupation", category: "Work",
    description: {
      EN: "A temporary work category for qualifying specialty occupations. Employer sponsorship and category-specific rules apply.",
      RU: "Временная рабочая категория для определённых специализированных профессий. Требуются работодатель-петиционер и соблюдение специальных правил.",
    },
    requirements: {
      EN: [
        "A qualifying US employer willing to file a petition",
        "A qualifying specialty occupation",
        "Appropriate education or other qualifying credentials",
      ],
      RU: [
        "Подходящий работодатель в США, готовый подать петицию",
        "Соответствующая специализированная должность",
        "Подходящее образование или другие подтверждения квалификации",
      ],
    },
    officialUrl: "https://www.uscis.gov/working-in-the-united-states/h-1b-specialty-occupations",
    matches: (p) =>
      p.purpose === "work" &&
      p.jobOffer === "yes" &&
      (p.education === "higher" || p.experience === "senior"),
  },
  {
    id: "us-family", country: "United States", countryCode: "US",
    name: "Family-based immigration", category: "Family",
    description: {
      EN: "Family immigration options for qualifying relatives of US citizens and permanent residents.",
      RU: "Семейные иммиграционные маршруты для подходящих родственников граждан США и постоянных резидентов.",
    },
    requirements: {
      EN: [
        "A qualifying relative who can petition or sponsor",
        "Eligibility under the relevant family category",
        "Required petitions and supporting documents",
      ],
      RU: [
        "Родственник, который может выступить заявителем или спонсором",
        "Соответствие выбранной семейной категории",
        "Необходимые петиции и подтверждающие документы",
      ],
    },
    officialUrl: "https://www.uscis.gov/family",
    matches: (p) => p.purpose === "family" || p.family === "yes",
  },
  {
    id: "us-student", country: "United States", countryCode: "US",
    name: "F-1 Student visa", category: "Study",
    description: {
      EN: "For eligible students attending an approved academic programme in the United States.",
      RU: "Для студентов, которые планируют учиться по подходящей академической программе в США.",
    },
    requirements: {
      EN: [
        "Acceptance by an eligible school",
        "Required student documentation, including Form I-20",
        "Evidence of funds and compliance with visa rules",
      ],
      RU: [
        "Зачисление в подходящее учебное заведение",
        "Необходимые документы студента, включая форму I-20",
        "Подтверждение средств и выполнение визовых требований",
      ],
    },
    officialUrl: "https://travel.state.gov/content/travel/en/us-visas/study/student-visa.html",
    matches: (p) => p.purpose === "study",
  },
  {
    id: "us-investor", country: "United States", countryCode: "US",
    name: "E-2 Treaty Investor", category: "Business",
    description: {
      EN: "For eligible nationals of treaty countries who make a qualifying investment in a US enterprise.",
      RU: "Для граждан подходящих стран, которые инвестируют средства в соответствующее предприятие в США.",
    },
    requirements: {
      EN: [
        "Nationality of a qualifying treaty country",
        "A substantial investment in a real operating enterprise",
        "Compliance with E-2 requirements",
      ],
      RU: [
        "Гражданство страны, подходящей для категории E-2",
        "Значительная инвестиция в реально действующий бизнес",
        "Выполнение требований категории E-2",
      ],
    },
    officialUrl: "https://travel.state.gov/content/travel/en/us-visas/investor-visa.html",
    matches: (p) => p.purpose === "business" && p.budget === "high",
  },
  {
    id: "ca-express-entry", country: "Canada", countryCode: "CA",
    name: "Express Entry", category: "Skilled immigration",
    description: {
      EN: "A system managing applications for several Canadian economic immigration programmes.",
      RU: "Система отбора заявителей по нескольким канадским программам экономической иммиграции.",
    },
    requirements: {
      EN: [
        "Eligibility under an Express Entry programme",
        "Approved language test results where required",
        "Education assessment and other criteria where applicable",
        "Age affects points in some Express Entry selection systems",
      ],
      RU: [
        "Соответствие требованиям одной из программ Express Entry",
        "Результаты подходящего языкового теста, если требуется",
        "Оценка образования и другие применимые критерии",
        "Возраст влияет на баллы в некоторых системах отбора Express Entry",
      ],
    },
    officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry.html",
    matches: (p) =>
      p.purpose === "work" &&
      (p.education === "higher" || p.experience === "senior") &&
      p.english !== "no",
  },
  {
    id: "ca-study", country: "Canada", countryCode: "CA",
    name: "Study permit", category: "Study",
    description: {
      EN: "Permission to study in Canada, subject to the current rules and eligibility requirements.",
      RU: "Разрешение на обучение в Канаде при соблюдении актуальных требований.",
    },
    requirements: {
      EN: [
        "Acceptance by an eligible educational institution",
        "Proof of financial support",
        "Compliance with current immigration requirements",
      ],
      RU: [
        "Зачисление в подходящее учебное заведение",
        "Подтверждение финансовых средств",
        "Выполнение актуальных иммиграционных требований",
      ],
    },
    officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit.html",
    matches: (p) => p.purpose === "study",
  },
  {
    id: "ca-family", country: "Canada", countryCode: "CA",
    name: "Family sponsorship", category: "Family",
    description: {
      EN: "Family sponsorship routes for eligible relatives under Canadian immigration rules.",
      RU: "Семейное спонсорство для подходящих родственников по канадским иммиграционным правилам.",
    },
    requirements: {
      EN: [
        "A sponsor who meets the programme rules",
        "A qualifying family relationship",
        "Required supporting documents",
      ],
      RU: [
        "Спонсор, соответствующий требованиям программы",
        "Подходящие семейные отношения",
        "Необходимые подтверждающие документы",
      ],
    },
    officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/family-sponsorship.html",
    matches: (p) => p.purpose === "family" || p.family === "yes",
  },
  {
    id: "au-skilled", country: "Australia", countryCode: "AU",
    name: "Skilled migration pathways", category: "Skilled immigration",
    description: {
      EN: "A group of Australian routes for skilled workers. Eligibility depends on the specific visa category.",
      RU: "Группа австралийских маршрутов для квалифицированных специалистов. Требования зависят от конкретной категории.",
    },
    requirements: {
      EN: [
        "An eligible occupation where required",
        "Skills assessment and English requirements where applicable",
        "Invitation, nomination or sponsorship for some routes",
        "Some points-tested skilled visas have an age limit below 45 at invitation",
      ],
      RU: [
        "Подходящая профессия, если это требуется",
        "Оценка квалификации и английского языка, если применимо",
        "Приглашение, номинация или спонсорство для некоторых маршрутов",
        "Для некоторых балльных виз требуется быть младше 45 лет на момент приглашения",
      ],
    },
    officialUrl: "https://immi.homeaffairs.gov.au/visas/working-in-australia",
    matches: (p) =>
      p.purpose === "work" &&
      (p.education === "higher" || p.experience === "senior") &&
      p.english !== "no",
  },
  {
    id: "au-student", country: "Australia", countryCode: "AU",
    name: "Student visa (subclass 500)", category: "Study",
    description: {
      EN: "For international students who meet the Australian student visa requirements.",
      RU: "Для иностранных студентов, соответствующих требованиям австралийской студенческой визы.",
    },
    requirements: {
      EN: [
        "Confirmation of enrolment",
        "Financial and English requirements where applicable",
        "Health, character and other visa requirements",
      ],
      RU: [
        "Подтверждение зачисления",
        "Финансовые и языковые требования, если применимо",
        "Требования к здоровью, благонадёжности и другие условия",
      ],
    },
    officialUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500",
    matches: (p) => p.purpose === "study",
  },
  {
    id: "nz-skilled", country: "New Zealand", countryCode: "NZ",
    name: "Skilled residence pathways", category: "Skilled immigration",
    description: {
      EN: "Residence options for skilled applicants. Requirements vary by immigration category.",
      RU: "Маршруты получения статуса резидента для квалифицированных заявителей. Требования зависят от категории.",
    },
    requirements: {
      EN: [
        "Eligibility under the chosen category",
        "Relevant qualifications, experience or job offer where required",
        "Language and other applicable requirements",
      ],
      RU: [
        "Соответствие требованиям выбранной категории",
        "Квалификация, опыт или предложение работы, если требуется",
        "Языковые и другие применимые требования",
      ],
    },
    officialUrl: "https://www.immigration.govt.nz/new-zealand-visas/",
    matches: (p) =>
      p.purpose === "work" &&
      (p.education === "higher" || p.experience === "senior"),
  },
  {
    id: "nz-student", country: "New Zealand", countryCode: "NZ",
    name: "Fee Paying Student Visa", category: "Study",
    description: {
      EN: "For eligible international students paying fees to study in New Zealand.",
      RU: "Для иностранных студентов, которые оплачивают обучение в Новой Зеландии и выполняют требования визы.",
    },
    requirements: {
      EN: [
        "An offer of place from an eligible education provider",
        "Evidence of tuition and living costs",
        "Compliance with student visa conditions",
      ],
      RU: [
        "Предложение места от подходящего учебного заведения",
        "Подтверждение оплаты обучения и проживания",
        "Выполнение условий студенческой визы",
      ],
    },
    officialUrl: "https://www.immigration.govt.nz/new-zealand-visas/visas/visa/fee-paying-student-visa",
    matches: (p) => p.purpose === "study",
  },
  {
    id: "de-skilled", country: "Germany", countryCode: "DE",
    name: "Skilled worker visa", category: "Work",
    description: {
      EN: "German work routes for qualified professionals who meet the relevant requirements.",
      RU: "Немецкие рабочие маршруты для квалифицированных специалистов, соответствующих требованиям.",
    },
    requirements: {
      EN: [
        "A qualifying or recognised professional qualification where required",
        "A job offer where the chosen route requires one",
        "Compliance with the specific residence permit conditions",
      ],
      RU: [
        "Подходящая или признанная профессиональная квалификация, если требуется",
        "Предложение работы, если оно необходимо для маршрута",
        "Соответствие условиям конкретного разрешения на проживание",
      ],
    },
    officialUrl: "https://www.make-it-in-germany.com/en/visa-residence/types/work-qualified-professionals",
    matches: (p) =>
      p.purpose === "work" &&
      (p.education === "higher" || p.experience === "senior"),
  },
  {
    id: "de-opportunity-card", country: "Germany", countryCode: "DE",
    name: "Opportunity Card", category: "Job seeking",
    description: {
      EN: "A route that may allow eligible applicants to come to Germany to look for work.",
      RU: "Маршрут, который может позволить подходящим заявителям приехать в Германию для поиска работы.",
    },
    requirements: {
      EN: [
        "Meeting the qualification or points requirements",
        "Evidence of sufficient funds",
        "Meeting applicable language and other criteria",
      ],
      RU: [
        "Соответствие требованиям к квалификации или баллам",
        "Подтверждение достаточных финансовых средств",
        "Выполнение применимых языковых и других критериев",
      ],
    },
    officialUrl: "https://www.make-it-in-germany.com/en/visa-residence/types/job-search-opportunity-card",
    matches: (p) =>
      p.purpose === "work" &&
      p.jobOffer !== "yes" &&
      (p.education === "higher" || p.experience === "senior") &&
      p.budget !== "low",
  },
  {
    id: "de-study", country: "Germany", countryCode: "DE",
    name: "Student visa", category: "Study",
    description: {
      EN: "For people planning to study in Germany who meet the requirements for the relevant study route.",
      RU: "Для людей, планирующих учиться в Германии и соответствующих требованиям студенческого маршрута.",
    },
    requirements: {
      EN: [
        "Admission or another qualifying basis for study",
        "Proof of sufficient financial resources",
        "Required documents and language qualifications where applicable",
      ],
      RU: [
        "Зачисление или другое подходящее основание для обучения",
        "Подтверждение достаточных финансовых средств",
        "Необходимые документы и языковая квалификация, если требуется",
      ],
    },
    officialUrl: "https://www.make-it-in-germany.com/en/visa-residence/types/studying",
    matches: (p) => p.purpose === "study",
  },
];

const initialProfile: Profile = {
  nationality: "", age: "", education: "", jobOffer: "", occupation: "",
  experience: "", english: "", budget: "", purpose: "", family: "",
};

const translations = {
  EN: {
    back: "Home", title: "Find your route to a new country.",
    subtitle: "Answer a few questions to discover immigration routes worth researching across multiple countries.",
    country: "Preferred country", allCountries: "All supported countries",
    nationality: "What is your citizenship?", nationalityPlaceholder: "e.g. India, Canada, Nigeria",
    age: "Your age", education: "Highest education", jobOffer: "Do you have a job offer abroad?",
    occupation: "Your professional field", experience: "Professional experience",
    english: "English proficiency", budget: "Available funds", purpose: "What is your main goal?",
    family: "Do you have a qualifying family connection abroad?", choose: "Choose an answer",
    yes: "Yes", no: "No", unsure: "Not sure", find: "Find matching routes",
    reset: "Reset answers", results: "Your matching routes",
    resultsSubtitle: "Routes are ranked using a preliminary profile-fit score, not a prediction of visa approval.",
    noResults: "No routes matched these answers.",
    noResultsTip: "Try changing your answers or selecting another country. This demo contains selected routes only.",
    requirements: "What to check", official: "Official information",
    disclaimerTitle: "Important",
    disclaimer: "This is a preliminary matching tool, not legal advice or a complete visa database. The percentage is a screening score, not the probability of visa approval. Rules can change and depend on citizenship, individual circumstances and the exact visa category. Always verify current requirements on official government websites.",
    how: "How it works", step1: "Tell us about your profile", step2: "Compare routes across countries",
    step3: "Verify requirements with official authorities", routes: "routes in the catalogue",
    profile: "YOUR PROFILE", options: "YOUR OPTIONS", countries: "countries",
    matchNote: "Preliminary profile-fit score — not a visa approval probability.",
    privacy: "Do not enter passport numbers or other sensitive personal information.",
    score: "Profile match", scoreUnknown: "Limited information",
    scoreNote: "The score uses only the information available and rules included in this demo.",
  },
  RU: {
    back: "На главную", title: "Найдите свой путь в другую страну.",
    subtitle: "Ответьте на несколько вопросов, чтобы найти иммиграционные маршруты, которые стоит изучить в разных странах.",
    country: "Предпочитаемая страна", allCountries: "Все доступные страны",
    nationality: "Какое у вас гражданство?", nationalityPlaceholder: "Например, Индия, Канада, Нигерия",
    age: "Ваш возраст", education: "Ваше образование", jobOffer: "Есть ли у вас предложение работы за границей?",
    occupation: "Ваша профессиональная сфера", experience: "Опыт работы", english: "Уровень английского",
    budget: "Доступные финансовые средства", purpose: "Какова ваша главная цель?",
    family: "Есть ли у вас подходящие семейные связи за границей?", choose: "Выберите ответ",
    yes: "Да", no: "Нет", unsure: "Не уверен(а)", find: "Найти подходящие маршруты",
    reset: "Сбросить ответы", results: "Подходящие маршруты",
    resultsSubtitle: "Маршруты отсортированы по предварительной оценке соответствия профилю, а не по вероятности одобрения визы.",
    noResults: "Нет маршрутов, совпавших с вашими ответами.",
    noResultsTip: "Попробуйте изменить ответы или выбрать другую страну. В этой версии представлены только отдельные маршруты.",
    requirements: "Что проверить", official: "Официальная информация",
    disclaimerTitle: "Важно",
    disclaimer: "Это инструмент предварительного подбора, а не юридическая консультация или полная база виз. Процент показывает предварительное соответствие профилю, а не вероятность одобрения визы. Правила могут меняться и зависят от гражданства, личных обстоятельств и конкретной категории визы. Всегда проверяйте актуальные требования на официальных государственных сайтах.",
    how: "Как это работает", step1: "Расскажите о своём профиле", step2: "Сравните маршруты разных стран",
    step3: "Проверьте требования у официальных ведомств", routes: "маршрутов в каталоге",
    profile: "ВАШ ПРОФИЛЬ", options: "ВАШИ ВАРИАНТЫ", countries: "стран",
    matchNote: "Предварительное соответствие профилю — не вероятность одобрения визы.",
    privacy: "Не вводите номера паспортов и другие конфиденциальные персональные данные.",
    score: "Совпадение с профилем", scoreUnknown: "Недостаточно данных",
    scoreNote: "Оценка использует только заполненные данные и правила, предусмотренные в демоверсии.",
  },
} as const;

const optionLabels: Record<string, Record<Language, string>> = {
  school: { EN: "School / secondary", RU: "Школа / среднее" },
  college: { EN: "College / vocational", RU: "Колледж / профессиональное" },
  higher: { EN: "University degree", RU: "Высшее образование" },
  other: { EN: "Other / not specified", RU: "Другое / не указано" },
  yes: { EN: "Yes", RU: "Да" },
  no: { EN: "No", RU: "Нет" },
  unsure: { EN: "Not sure", RU: "Не уверен(а)" },
  technology: { EN: "Technology / IT", RU: "Технологии / IT" },
  healthcare: { EN: "Healthcare", RU: "Здравоохранение" },
  research: { EN: "Science / research", RU: "Наука / исследования" },
  creative: { EN: "Arts / creative industries", RU: "Искусство / творчество" },
  business: { EN: "Business / management", RU: "Бизнес / управление" },
  otherOccupation: { EN: "Other", RU: "Другое" },
  none: { EN: "Little or no experience", RU: "Небольшой или отсутствует" },
  mid: { EN: "Some experience", RU: "Есть опыт" },
  senior: { EN: "Experienced / senior", RU: "Большой опыт / старший специалист" },
  low: { EN: "Limited", RU: "Ограниченные" },
  medium: { EN: "Moderate", RU: "Средние" },
  high: { EN: "Substantial", RU: "Значительные" },
  prefer: { EN: "Prefer not to say", RU: "Не указывать" },
  work: { EN: "Work / career", RU: "Работа / карьера" },
  study: { EN: "Study", RU: "Учёба" },
  family: { EN: "Join family", RU: "Воссоединение с семьёй" },
  businessPurpose: { EN: "Start a business", RU: "Открыть бизнес" },
  visit: { EN: "Temporary visit", RU: "Временная поездка" },
  otherPurpose: { EN: "Explore my options", RU: "Изучить варианты" },
};

function Field({
  label, value, onChange, options, placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  placeholder: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-200">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </label>
  );
}

function calculateMatch(profile: Profile, route: VisaRoute): number {
  let earned = 0;
  let possible = 0;

  const add = (weight: number, points: number) => {
    possible += weight;
    earned += weight * points;
  };

  if (profile.purpose) {
    possible += 25;

    const expectedPurpose: Record<string, string[]> = {
      "uk-skilled-worker": ["work"],
      "uk-global-talent": ["work"],
      "uk-innovator-founder": ["business"],
      "uk-student": ["study"],
      "uk-family": ["family"],
      "us-h1b": ["work"],
      "us-family": ["family"],
      "us-student": ["study"],
      "us-investor": ["business"],
      "ca-express-entry": ["work"],
      "ca-study": ["study"],
      "ca-family": ["family"],
      "au-skilled": ["work"],
      "au-student": ["study"],
      "nz-skilled": ["work"],
      "nz-student": ["study"],
      "de-skilled": ["work"],
      "de-opportunity-card": ["work"],
      "de-study": ["study"],
    };

    const expected = expectedPurpose[route.id] ?? [];

    if (profile.purpose === "otherPurpose") earned += 12.5;
    else if (expected.includes(profile.purpose)) earned += 25;
  }

  if (profile.age.trim() && Number.isFinite(Number(profile.age))) {
    const age = Number(profile.age);

    if (route.id === "uk-innovator-founder") add(20, age >= 18 ? 1 : 0);
    else if (route.id === "uk-student") add(20, age >= 16 ? 1 : 0);
    else if (route.id === "au-skilled") add(10, age < 45 ? 1 : 0.5);
    else add(5, 0.75);
  }

  if (profile.nationality.trim()) {
    if (route.id === "uk-skilled-worker" && profile.english === "no") {
      add(15, hasUkEnglishExemption(profile.nationality) ? 1 : 0.25);
    } else if (route.id === "us-investor") {
      add(5, 0.5);
    } else {
      add(5, 0.5);
    }
  }

  if (profile.english && profile.english !== "prefer") {
    if (route.id === "uk-skilled-worker" && hasUkEnglishExemption(profile.nationality)) {
      add(15, 1);
    } else if (profile.english === "yes") {
      add(15, 1);
    } else if (profile.english === "some") {
      add(15, 0.65);
    } else if (profile.english === "no") {
      add(15, 0.2);
    }
  }

  if (profile.education) {
    const relevant = [
      "uk-skilled-worker", "uk-global-talent", "uk-innovator-founder",
      "us-h1b", "ca-express-entry", "au-skilled", "nz-skilled",
      "de-skilled", "de-opportunity-card",
    ].includes(route.id);

    if (relevant) {
      let points = 0.5;
      if (profile.education === "higher") points = 1;
      if (profile.education === "college") points = 0.7;
      if (profile.education === "school") points = 0.35;
      add(15, points);
    } else {
      add(5, 0.5);
    }
  }

  if (profile.jobOffer) {
    if (route.id === "uk-skilled-worker" || route.id === "us-h1b") {
      add(20, profile.jobOffer === "yes" ? 1 : 0.15);
    } else if (route.id === "de-opportunity-card") {
      add(10, profile.jobOffer === "no" ? 1 : 0.6);
    } else if ([
      "au-skilled", "nz-skilled", "de-skilled", "ca-express-entry",
    ].includes(route.id)) {
      add(10, profile.jobOffer === "yes" ? 1 : 0.65);
    } else {
      add(5, 0.5);
    }
  }

  if (profile.experience) {
    if ([
      "uk-skilled-worker", "uk-global-talent", "us-h1b",
      "ca-express-entry", "au-skilled", "nz-skilled",
      "de-skilled", "de-opportunity-card",
    ].includes(route.id)) {
      add(
        15,
        profile.experience === "senior"
          ? 1
          : profile.experience === "mid"
            ? 0.7
            : 0.3,
      );
    } else {
      add(5, 0.5);
    }
  }

  if (profile.occupation) {
    if (route.id === "uk-global-talent") {
      add(
        15,
        ["technology", "research", "creative"].includes(profile.occupation)
          ? 1
          : 0.5,
      );
    } else if ([
      "uk-skilled-worker", "us-h1b", "ca-express-entry",
      "au-skilled", "nz-skilled", "de-skilled", "de-opportunity-card",
    ].includes(route.id)) {
      add(10, profile.occupation === "other" ? 0.5 : 0.8);
    } else {
      add(5, 0.5);
    }
  }

  if (profile.budget && profile.budget !== "prefer") {
    if ([
      "uk-student", "uk-innovator-founder", "us-investor",
      "us-student", "ca-study", "au-student", "nz-student",
      "de-opportunity-card", "de-study",
    ].includes(route.id)) {
      add(
        15,
        profile.budget === "high"
          ? 1
          : profile.budget === "medium"
            ? 0.65
            : profile.budget === "low"
              ? 0.25
              : 0.5,
      );
    } else {
      add(5, 0.5);
    }
  }

  if (profile.family) {
    if (["uk-family", "us-family", "ca-family"].includes(route.id)) {
      add(
        20,
        profile.family === "yes"
          ? 1
          : profile.family === "no"
            ? 0.1
            : 0.5,
      );
    } else {
      add(5, profile.family === "yes" ? 0.5 : 1);
    }
  }

  if (possible === 0) return 50;
  return Math.max(0, Math.min(100, Math.round((earned / possible) * 100)));
}

type UkScreening = { checks: string[] };

function getUkScreening(
  route: VisaRoute,
  profile: Profile,
  language: Language,
): UkScreening | null {
  if (route.countryCode !== "GB") return null;

  const checks: string[] = [];
  const ru = language === "RU";
  const age = Number(profile.age);
  const hasAge = profile.age.trim() !== "" && Number.isFinite(age);
  const exempt = hasUkEnglishExemption(profile.nationality);

  if (!profile.nationality.trim()) {
    checks.push(
      ru
        ? "Укажите гражданство: проверка гражданства и иммиграционной истории здесь не выполняется."
        : "Enter your citizenship; this demo does not check your full nationality or immigration history.",
    );
  } else {
    checks.push(
      ru
        ? "Список языковых исключений ограничен. Проверьте правило для своего маршрута на GOV.UK."
        : "The exemption list is limited. Verify the rule for your route on GOV.UK.",
    );
  }

  if (route.id === "uk-skilled-worker") {
    if (profile.jobOffer === "yes") {
      checks.push(
        ru
          ? "Проверьте, что работодатель имеет лицензию спонсора, а должность и зарплата соответствуют правилам."
          : "Verify that the employer is an approved sponsor and the job and salary qualify.",
      );
    } else if (profile.jobOffer === "no") {
      checks.push(
        ru
          ? "Обычно требуется предложение работы от одобренного спонсора."
          : "A qualifying job offer from an approved sponsor is normally required.",
      );
    } else {
      checks.push(
        ru
          ? "Уточните, есть ли предложение работы от одобренного спонсора."
          : "Confirm whether you have an offer from an approved sponsor.",
      );
    }
  }

  if (route.id === "uk-global-talent") {
    checks.push(
      ru
        ? "Проверьте требования к одобрению (endorsement) или наличие подходящей престижной награды."
        : "Check whether you qualify for an endorsement or an eligible prestigious prize.",
    );
  }

  if (route.id === "uk-innovator-founder") {
    if (hasAge && age < 18) {
      checks.push(
        ru
          ? "Для Innovator Founder заявителю должно быть не менее 18 лет."
          : "Innovator Founder applicants must be at least 18.",
      );
    } else if (!hasAge) {
      checks.push(
        ru
          ? "Укажите возраст: для Innovator Founder требуется возраст от 18 лет."
          : "Enter your age; Innovator Founder applicants must be at least 18.",
      );
    }

    checks.push(
      ru
        ? "Нужны одобрение уполномоченной организации, выполнение языкового требования и достаточные личные средства."
        : "An approved endorsement, English requirement and sufficient personal savings are required.",
    );
  }

  if (route.id === "uk-student") {
    if (hasAge && age < 16) {
      checks.push(
        ru
          ? "Студенческая виза обычно доступна с 16 лет; проверьте условия курса."
          : "The Student visa generally requires applicants to be at least 16; check course conditions.",
      );
    }

    if (hasAge && age >= 16 && age < 18) {
      checks.push(
        ru
          ? "Для заявителей младше 18 лет могут требоваться согласие родителей и дополнительные документы."
          : "Applicants under 18 may need parental consent and additional documents.",
      );
    }

    checks.push(
      ru
        ? "Нужны подходящее предложение об обучении и Confirmation of Acceptance for Studies (CAS)."
        : "You need an eligible course offer and a Confirmation of Acceptance for Studies (CAS).",
    );

    checks.push(
      ru
        ? "Проверьте стоимость курса и необходимые средства на проживание для места учёбы."
        : "Check course fees and required living-cost funds for your study location.",
    );

    if (profile.nationality.trim()) {
      checks.push(
        exempt
          ? (
              ru
                ? "Гражданство входит в предварительный список стран с возможным языковым исключением. Проверьте точное правило."
                : "Your nationality appears on this limited list of possible English-language exemptions. Verify the exact rule."
            )
          : (
              ru
                ? "Проверьте, влияет ли гражданство на документы, подтверждающие средства."
                : "Check whether your nationality affects the financial evidence required."
            ),
      );
    }
  }

  if (route.id === "uk-family") {
    if (profile.family === "no" && profile.purpose !== "family") {
      checks.push(
        ru
          ? "Ответ указывает, что семейной связи может не быть; проверьте, подходит ли вам семейный маршрут."
          : "Your answers suggest you may not have a qualifying family connection; check whether this route applies.",
      );
    }

    checks.push(
      ru
        ? "Семейные отношения и обстоятельства спонсора должны соответствовать конкретному маршруту."
        : "The family relationship and sponsor's circumstances must meet the chosen route.",
    );

    checks.push(
      ru
        ? "Проверьте применимые финансовые и языковые требования."
        : "Check the applicable financial and English-language requirements.",
    );
  }

  if ([
    "uk-skilled-worker", "uk-global-talent",
    "uk-innovator-founder", "uk-student",
  ].includes(route.id)) {
    if (profile.english === "yes") {
      checks.push(
        ru
          ? "Ваш самооценённый уровень английского не заменяет официальное подтверждение, если оно требуется."
          : "Your self-reported English level does not replace formal evidence where required.",
      );
    } else if (profile.english === "no") {
      checks.push(
        exempt
          ? (
              ru
                ? "Возможно языковое исключение по гражданству; проверьте правила именно этой визы."
                : "A nationality-based exemption may apply; verify it for this visa route."
            )
          : (
              ru
                ? "Проверьте требуемый уровень английского и допустимые исключения."
                : "Check the required English level and any applicable exemptions."
            ),
      );
    } else {
      checks.push(
        ru
          ? "Проверьте требуемый уровень английского и допустимые способы подтверждения."
          : "Check the required English level and accepted evidence.",
      );
    }
  }

  return { checks };
}

export default function WorldNavigatorPage() {
  const [language, setLanguage] = useState<Language>("EN");
  const [selectedCountry, setSelectedCountry] = useState("ALL");
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [submitted, setSubmitted] = useState(false);
  const t = translations[language];

  const updateProfile = (key: keyof Profile, value: string) =>
    setProfile((current) => ({ ...current, [key]: value }));

  const labelFor = (key: string) => optionLabels[key]?.[language] ?? key;

  const results = useMemo(() => {
    if (!submitted) return [];

    return visaRoutes
      .filter((route) => {
        if (selectedCountry !== "ALL" && route.countryCode !== selectedCountry) return false;
        if (profile.purpose === "visit") return false;
        if (profile.purpose === "" || profile.purpose === "otherPurpose") return true;
        return route.matches(profile);
      })
      .map((route) => ({ route, score: calculateMatch(profile, route) }))
      .sort((a, b) => b.score - a.score);
  }, [profile, selectedCountry, submitted]);

  const categoryLabel = (category: string) => {
    const labels: Record<string, Record<Language, string>> = {
      Work: { EN: "Work", RU: "Работа" },
      Talent: { EN: "Talent", RU: "Таланты" },
      Business: { EN: "Business", RU: "Бизнес" },
      Study: { EN: "Study", RU: "Учёба" },
      Family: { EN: "Family", RU: "Семья" },
      "Skilled immigration": {
        EN: "Skilled immigration",
        RU: "Квалифицированная иммиграция",
      },
      "Job seeking": { EN: "Job seeking", RU: "Поиск работы" },
    };

    return labels[category]?.[language] ?? category;
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <Link href="/" className="text-xl font-bold tracking-tight">
            Esurpys<span className="text-cyan-400">.</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="hidden text-sm text-slate-300 transition hover:text-white sm:block"
            >
              {t.back}
            </Link>

            <div className="flex rounded-full border border-white/10 bg-slate-900 p-1">
              {(["EN", "RU"] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setLanguage(item)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                    language === item
                      ? "bg-cyan-400 text-slate-950"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              ESURPYS GLOBAL
            </div>

            <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
              {t.title}
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
              {t.subtitle}
            </p>

            <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-300">
              <span className="rounded-full border border-white/10 bg-slate-900 px-4 py-2">
                🌍 {countries.length} {t.countries}
              </span>
              <span className="rounded-full border border-white/10 bg-slate-900 px-4 py-2">
                🧭 {visaRoutes.length} {t.routes}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:py-14">
        <div>
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-400">
              01 / {t.profile}
            </p>
            <h2 className="mt-2 text-2xl font-semibold">
              {language === "RU" ? "Расскажите о себе" : "Tell us about yourself"}
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">{t.privacy}</p>
          </div>

          <div className="space-y-5 rounded-2xl border border-white/10 bg-slate-900 p-5 sm:p-6">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-200">{t.country}</span>
              <select
                value={selectedCountry}
                onChange={(event) => {
                  setSelectedCountry(event.target.value);
                  setSubmitted(false);
                }}
                className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400"
              >
                <option value="ALL">{t.allCountries}</option>
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.flag} {country.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-200">
                {t.nationality}
              </span>
              <input
                value={profile.nationality}
                onChange={(event) => updateProfile("nationality", event.target.value)}
                placeholder={t.nationalityPlaceholder}
                className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-400"
              />
              <span className="mt-2 block text-xs leading-5 text-slate-500">
                {language === "RU"
                  ? "Указывайте страну гражданства, а не место проживания."
                  : "Enter your citizenship, not your country of residence."}
              </span>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-200">{t.age}</span>
              <input
                type="number"
                min="1"
                max="120"
                value={profile.age}
                onChange={(event) => updateProfile("age", event.target.value)}
                placeholder={language === "RU" ? "Например, 28" : "e.g. 28"}
                className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-400"
              />
            </label>

            <Field
              label={t.education}
              value={profile.education}
              onChange={(v) => updateProfile("education", v)}
              placeholder={t.choose}
              options={["school", "college", "higher", "other"].map((value) => ({
                value,
                label: labelFor(value),
              }))}
            />

            <Field
              label={t.jobOffer}
              value={profile.jobOffer}
              onChange={(v) => updateProfile("jobOffer", v)}
              placeholder={t.choose}
              options={["yes", "no", "unsure"].map((value) => ({
                value,
                label: labelFor(value),
              }))}
            />

            <Field
              label={t.occupation}
              value={profile.occupation}
              onChange={(v) => updateProfile("occupation", v)}
              placeholder={t.choose}
              options={["technology", "healthcare", "research", "creative", "business", "other"].map(
                (value) => ({
                  value,
                  label: labelFor(value === "other" ? "otherOccupation" : value),
                }),
              )}
            />

            <Field
              label={t.experience}
              value={profile.experience}
              onChange={(v) => updateProfile("experience", v)}
              placeholder={t.choose}
              options={["none", "mid", "senior"].map((value) => ({
                value,
                label: labelFor(value),
              }))}
            />

            <Field
              label={t.english}
              value={profile.english}
              onChange={(v) => updateProfile("english", v)}
              placeholder={t.choose}
              options={[
                {
                  value: "no",
                  label: language === "RU" ? "Нет / минимальный" : "None / basic",
                },
                {
                  value: "some",
                  label: language === "RU" ? "Базовый / средний" : "Basic / intermediate",
                },
                {
                  value: "yes",
                  label: language === "RU" ? "Хороший / свободный" : "Good / fluent",
                },
                {
                  value: "prefer",
                  label: language === "RU" ? "Не указывать" : "Prefer not to say",
                },
              ]}
            />

            <Field
              label={t.budget}
              value={profile.budget}
              onChange={(v) => updateProfile("budget", v)}
              placeholder={t.choose}
              options={["low", "medium", "high", "prefer"].map((value) => ({
                value,
                label: labelFor(value),
              }))}
            />

            <Field
              label={t.purpose}
              value={profile.purpose}
              onChange={(v) => updateProfile("purpose", v)}
              placeholder={t.choose}
              options={[
                { value: "work", label: labelFor("work") },
                { value: "study", label: labelFor("study") },
                { value: "business", label: labelFor("businessPurpose") },
                { value: "family", label: labelFor("family") },
                { value: "visit", label: labelFor("visit") },
                { value: "otherPurpose", label: labelFor("otherPurpose") },
              ]}
            />

            <Field
              label={t.family}
              value={profile.family}
              onChange={(v) => updateProfile("family", v)}
              placeholder={t.choose}
              options={["yes", "no", "unsure"].map((value) => ({
                value,
                label: labelFor(value),
              }))}
            />

            <button
              type="button"
              onClick={() => setSubmitted(true)}
              className="w-full rounded-xl bg-cyan-400 px-5 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              {t.find} →
            </button>

            <button
              type="button"
              onClick={() => {
                setProfile(initialProfile);
                setSelectedCountry("ALL");
                setSubmitted(false);
              }}
              className="w-full rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-slate-300 transition hover:border-white/20 hover:text-white"
            >
              {t.reset}
            </button>
          </div>
        </div>

        <div>
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-400">
              02 / {t.options}
            </p>
            <h2 className="mt-2 text-2xl font-semibold">{t.results}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">{t.resultsSubtitle}</p>
          </div>

          {!submitted ? (
            <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-slate-900/50 p-8 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-2xl">
                🧭
              </div>
              <h3 className="text-lg font-semibold">
                {language === "RU"
                  ? "Ваш следующий шаг начинается здесь"
                  : "Your next step starts here"}
              </h3>
              <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">
                {language === "RU"
                  ? "Заполните профиль слева и нажмите кнопку, чтобы увидеть подходящие маршруты."
                  : "Complete the profile and press the button to see matching routes."}
              </p>
            </div>
          ) : results.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-slate-900 p-8">
              <div className="text-3xl">🔎</div>
              <h3 className="mt-4 text-lg font-semibold">{t.noResults}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{t.noResultsTip}</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4 rounded-xl border border-cyan-400/20 bg-cyan-400/5 px-4 py-3">
                <span className="text-sm text-slate-300">
                  {language === "RU" ? "Найдено маршрутов" : "Routes found"}
                </span>
                <span className="text-lg font-semibold text-cyan-300">{results.length}</span>
              </div>

              {results.map(({ route, score }) => {
                const flag =
                  countries.find((country) => country.code === route.countryCode)?.flag ?? "🌍";
                const ukScreening = getUkScreening(route, profile, language);

                return (
                  <article
                    key={route.id}
                    className="rounded-2xl border border-white/10 bg-slate-900 p-5 transition hover:border-cyan-400/30 sm:p-6"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-slate-950 text-2xl">
                          {flag}
                        </div>
                        <div>
                          <p className="text-xs font-medium text-cyan-300">{route.country}</p>
                          <h3 className="mt-1 text-lg font-semibold leading-snug">{route.name}</h3>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-white/10 bg-slate-950 px-3 py-1 text-xs text-slate-300">
                          {categoryLabel(route.category)}
                        </span>
                      </div>
                    </div>

                    <div className="mt-5 rounded-xl border border-cyan-400/20 bg-slate-950/70 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-medium text-slate-300">{t.score}</span>
                        <span className="text-xl font-bold text-cyan-300">{score}%</span>
                      </div>

                      <div
                        className="mt-3 h-2 overflow-hidden rounded-full bg-white/10"
                        role="progressbar"
                        aria-label={t.score}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={score}
                      >
                        <div
                          className="h-full rounded-full bg-cyan-400 transition-all duration-500"
                          style={{ width: `${score}%` }}
                        />
                      </div>

                      <p className="mt-2 text-xs leading-5 text-slate-500">{t.scoreNote}</p>
                    </div>

                    <p className="mt-4 text-sm leading-6 text-slate-400">
                      {route.description[language]}
                    </p>

                    {ukScreening && (
                      <div className="mt-4 rounded-xl border border-cyan-400/15 bg-slate-950/70 p-4">
                        <h4 className="text-sm font-semibold text-cyan-300">
                          {language === "RU"
                            ? "Предварительная проверка Великобритании"
                            : "UK preliminary screening"}
                        </h4>

                        <p className="mt-2 text-xs leading-5 text-slate-400">
                          {language === "RU"
                            ? "Это предварительные напоминания по требованиям, а не юридическая оценка или прогноз решения."
                            : "These are preliminary requirement checks, not legal advice or a prediction of the decision."}
                        </p>

                        <ul className="mt-3 space-y-2">
                          {ukScreening.checks.map((check, index) => (
                            <li
                              key={`${route.id}-check-${index}`}
                              className="flex gap-2 text-sm leading-5 text-slate-400"
                            >
                              <span className="text-cyan-400">•</span>
                              <span>{check}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="mt-5">
                      <h4 className="text-sm font-semibold text-slate-200">{t.requirements}</h4>
                      <ul className="mt-3 space-y-2">
                        {route.requirements[language].map((requirement) => (
                          <li
                            key={requirement}
                            className="flex gap-2 text-sm leading-6 text-slate-400"
                          >
                            <span className="mt-0.5 text-cyan-400">✓</span>
                            <span>{requirement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
                      <span className="text-xs text-slate-500">{t.matchNote}</span>
                      <a
                        href={route.officialUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-cyan-400/20 bg-cyan-400/5 px-4 py-2.5 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-400/10"
                      >
                        {t.official} ↗
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-5">
            <h3 className="text-sm font-semibold text-amber-200">
              ⚠️ {t.disclaimerTitle}
            </h3>
            <p className="mt-2 text-sm leading-6 text-amber-100/80">{t.disclaimer}</p>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-400">
            03 / {t.how}
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              { number: "01", title: t.step1, icon: "👤" },
              { number: "02", title: t.step2, icon: "🌍" },
              { number: "03", title: t.step3, icon: "✓" },
            ].map((step) => (
              <div
                key={step.number}
                className="rounded-2xl border border-white/10 bg-slate-900 p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-cyan-300">{step.number}</span>
                  <span className="text-xl">{step.icon}</span>
                </div>
                <h3 className="mt-5 text-base font-semibold leading-6">{step.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span>
            © {new Date().getFullYear()} Esurpys.{" "}
            {language === "RU" ? "Глобальный визовый навигатор." : "Global visa navigator."}
          </span>
          <Link href="/" className="transition hover:text-cyan-300">
            {t.back} →
          </Link>
        </div>
      </footer>
    </main>
  );
}