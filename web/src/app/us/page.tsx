"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import EsurpysNavigation from "@/shared/EsurpysNavigation";
import { useLanguage } from "@/shared/LanguageProvider";
import CountryFlag from "@/components/CountryFlag";

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

const VWP_COUNTRIES = [
  "ad", "au", "at", "be", "bn", "cl", "hr", "cz", "dk", "ee",
  "fi", "fr", "de", "gr", "hu", "is", "ie", "il", "it", "jp",
  "lv", "li", "lt", "lu", "mt", "mc", "nl", "nz", "no", "pl",
  "pt", "qa", "sm", "sg", "sk", "si", "kr", "es", "se", "ch",
  "tw", "uk",
];

const citizenshipOptions: Option[] = [
  { value: "ru", ru: "🇷🇺 Россия", en: "🇷🇺 Russia" },
  { value: "ua", ru: "🇺🇦 Украина", en: "🇺🇦 Ukraine" },
  { value: "by", ru: "🇧🇾 Беларусь", en: "🇧🇾 Belarus" },
  { value: "kz", ru: "🇰🇿 Казахстан", en: "🇰🇿 Kazakhstan" },
  { value: "uz", ru: "🇺🇿 Узбекистан", en: "🇺🇿 Uzbekistan" },
  { value: "am", ru: "🇦🇲 Армения", en: "🇦🇲 Armenia" },
  { value: "ge", ru: "🇬🇪 Грузия", en: "🇬🇪 Georgia" },
  { value: "ca", ru: "🇨🇦 Канада", en: "🇨🇦 Canada" },
  { value: "bm", ru: "🇧🇲 Бермуды", en: "🇧🇲 Bermuda" },
  { value: "ad", ru: "Андорра", en: "Andorra" },
  { value: "au", ru: "Австралия", en: "Australia" },
  { value: "at", ru: "Австрия", en: "Austria" },
  { value: "be", ru: "Бельгия", en: "Belgium" },
  { value: "bn", ru: "Бруней", en: "Brunei" },
  { value: "cl", ru: "Чили", en: "Chile" },
  { value: "hr", ru: "Хорватия", en: "Croatia" },
  { value: "cz", ru: "Чехия", en: "Czechia" },
  { value: "dk", ru: "Дания", en: "Denmark" },
  { value: "ee", ru: "Эстония", en: "Estonia" },
  { value: "fi", ru: "Финляндия", en: "Finland" },
  { value: "fr", ru: "Франция", en: "France" },
  { value: "de", ru: "Германия", en: "Germany" },
  { value: "gr", ru: "Греция", en: "Greece" },
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
  { value: "mc", ru: "Монако", en: "Monaco" },
  { value: "nl", ru: "Нидерланды", en: "Netherlands" },
  { value: "nz", ru: "Новая Зеландия", en: "New Zealand" },
  { value: "no", ru: "Норвегия", en: "Norway" },
  { value: "pl", ru: "Польша", en: "Poland" },
  { value: "pt", ru: "Португалия", en: "Portugal" },
  { value: "qa", ru: "Катар", en: "Qatar" },
  { value: "sm", ru: "Сан-Марино", en: "San Marino" },
  { value: "sg", ru: "Сингапур", en: "Singapore" },
  { value: "sk", ru: "Словакия", en: "Slovakia" },
  { value: "si", ru: "Словения", en: "Slovenia" },
  { value: "kr", ru: "Южная Корея", en: "South Korea" },
  { value: "es", ru: "Испания", en: "Spain" },
  { value: "se", ru: "Швеция", en: "Sweden" },
  { value: "ch", ru: "Швейцария", en: "Switzerland" },
  { value: "tw", ru: "Тайвань", en: "Taiwan" },
  { value: "uk", ru: "Великобритания", en: "United Kingdom" },
  { value: "other", ru: "Другая страна", en: "Another country" },
  { value: "unknown", ru: "Не хочу указывать", en: "Prefer not to say" },
];

const questions: Question[] = [
  {
    id: "goal",
    ru: "Какова ваша главная цель?",
    en: "What is your main goal?",
    options: [
      { value: "work", ru: "Работа в США", en: "Work in the US" },
      { value: "study", ru: "Учёба", en: "Study" },
      { value: "business", ru: "Бизнес или инвестиции", en: "Business or investment" },
      { value: "family", ru: "Переезд к семье или партнёру", en: "Join family or partner" },
      { value: "permanent", ru: "Постоянное проживание / Green Card", en: "Permanent residence / Green Card" },
      { value: "visit", ru: "Туризм, гости или деловая поездка", en: "Tourism, visiting or business trip" },
      { value: "exchange", ru: "Обменная программа или стажировка", en: "Exchange program or internship" },
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
      { value: "36-49", ru: "36–49 лет", en: "36–49" },
      { value: "50plus", ru: "50 лет и старше", en: "50 or older" },
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
      { value: "vocational", ru: "Профессиональное образование", en: "Vocational education" },
      { value: "none", ru: "Нет законченного образования", en: "No completed qualification" },
    ],
  },
  {
    id: "workExperience",
    ru: "Какой у вас профессиональный опыт?",
    en: "What is your professional experience?",
    options: [
      { value: "none", ru: "Нет значимого опыта", en: "No significant experience" },
      { value: "under3", ru: "Менее 3 лет", en: "Less than 3 years" },
      { value: "3plus", ru: "3 года и более", en: "3 years or more" },
      { value: "specialist", ru: "Высококвалифицированная специальность", en: "Highly specialized occupation" },
      { value: "manager", ru: "Руководитель или менеджер", en: "Executive or manager" },
      { value: "research", ru: "Научная или исследовательская деятельность", en: "Academic or research experience" },
    ],
  },
  {
    id: "jobOffer",
    ru: "Есть ли предложение работы от работодателя в США?",
    en: "Do you have a job offer from a US employer?",
    options: [
      { value: "yes", ru: "Да", en: "Yes" },
      { value: "no", ru: "Нет", en: "No" },
      { value: "maybe", ru: "Веду переговоры", en: "In discussion" },
    ],
  },
  {
    id: "sponsor",
    ru: "Готов ли работодатель рассматривать визовое спонсорство?",
    en: "Is the employer willing to consider visa sponsorship?",
    options: [
      { value: "yes", ru: "Да", en: "Yes" },
      { value: "no", ru: "Нет", en: "No" },
      { value: "unknown", ru: "Не знаю", en: "Not sure" },
      { value: "na", ru: "Нет предложения работы", en: "No job offer" },
    ],
  },
  {
    id: "studentOffer",
    ru: "Есть ли зачисление или предложение от учебного заведения США?",
    en: "Have you been accepted by a US school or university?",
    options: [
      { value: "yes", ru: "Да", en: "Yes" },
      { value: "no", ru: "Нет", en: "No" },
      { value: "applying", ru: "Планирую подать документы", en: "Planning to apply" },
    ],
  },
  {
    id: "exchangeOffer",
    ru: "Есть ли приглашение от утверждённой обменной программы?",
    en: "Do you have an offer from an approved exchange program?",
    options: [
      { value: "yes", ru: "Да", en: "Yes" },
      { value: "no", ru: "Нет", en: "No" },
      { value: "unknown", ru: "Не знаю", en: "Not sure" },
    ],
  },
  {
    id: "familyUS",
    ru: "Есть ли у вас близкий родственник или жених/невеста в США?",
    en: "Do you have a close relative or fiancé(e) in the US?",
    options: [
      { value: "citizen", ru: "Подходящий родственник — гражданин США", en: "An eligible relative is a US citizen" },
      { value: "resident", ru: "Подходящий родственник имеет Green Card", en: "An eligible relative has a Green Card" },
      { value: "fiance", ru: "Жених или невеста — гражданин США", en: "Fiancé(e) is a US citizen" },
      { value: "no", ru: "Нет", en: "No" },
      { value: "unknown", ru: "Не уверен(-а)", en: "Not sure" },
    ],
  },
  {
    id: "achievements",
    ru: "Есть ли выдающиеся профессиональные достижения?",
    en: "Do you have extraordinary professional achievements?",
    options: [
      { value: "strong", ru: "Да: крупные награды, публикации, признание или значимые достижения", en: "Yes: major awards, publications, recognition or significant achievements" },
      { value: "some", ru: "Есть достижения, но не знаю, подходят ли они", en: "Some achievements, but unsure if they qualify" },
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
      { value: "company", ru: "У меня есть компания за пределами США", en: "I own or work for a company outside the US" },
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
      { value: "transit", ru: "Транзит через США", en: "Transit through the US" },
      { value: "other", ru: "Другая цель", en: "Another purpose" },
    ],
  },
  {
    id: "visitDuration",
    ru: "Как долго планируете находиться в США?",
    en: "How long do you plan to stay in the US?",
    options: [
      { value: "under90", ru: "До 90 дней", en: "Up to 90 days" },
      { value: "over90", ru: "Более 90 дней", en: "More than 90 days" },
      { value: "unsure", ru: "Пока не знаю", en: "Not sure yet" },
    ],
  },
  {
    id: "passport",
    ru: "У вас биометрический электронный паспорт с электронным чипом?",
    en: "Do you have an e-passport with an electronic chip?",
    options: [
      { value: "yes", ru: "Да", en: "Yes" },
      { value: "no", ru: "Нет", en: "No" },
      { value: "unknown", ru: "Не уверен(-а)", en: "Not sure" },
    ],
  },
  {
    id: "vwpRestrictions",
    ru: "Были ли у вас обстоятельства, которые могут ограничить участие в Visa Waiver Program?",
    en: "Have you had circumstances that may restrict Visa Waiver Program eligibility?",
    options: [
      { value: "none", ru: "Насколько мне известно, нет", en: "Not to my knowledge" },
      { value: "restrictedTravel", ru: "Посещал(-а) Кубу после 12 января 2021 года или определённые страны из ограничительного списка после 1 марта 2011 года", en: "Travelled to Cuba after Jan 12, 2021, or certain listed countries after Mar 1, 2011" },
      { value: "dualNationality", ru: "Есть также гражданство страны, ограничивающей участие", en: "I also hold nationality of a restricted country" },
      { value: "denied", ru: "Был отказ в визе или ESTA", en: "I have had a visa or ESTA refusal" },
      { value: "unknown", ru: "Не уверен(-а)", en: "Not sure" },
    ],
  },
  {
    id: "funds",
    ru: "Можете ли вы подтвердить средства на поездку или обучение?",
    en: "Can you document funds for your trip or studies?",
    options: [
      { value: "yes", ru: "Да", en: "Yes" },
      { value: "sponsor", ru: "Есть финансовый спонсор", en: "I have a financial sponsor" },
      { value: "no", ru: "Пока нет", en: "Not yet" },
    ],
  },
  {
    id: "immigrationHistory",
    ru: "Были ли отказы в визах, нарушения статуса или выдворение?",
    en: "Have you had visa refusals, status violations or removal?",
    options: [
      { value: "none", ru: "Нет", en: "No" },
      { value: "refusal", ru: "Был отказ в визе", en: "Visa refusal" },
      { value: "overstay", ru: "Превышение срока пребывания или нарушение условий", en: "Overstay or violation of conditions" },
      { value: "removed", ru: "Депортация или выдворение", en: "Deportation or removal" },
      { value: "unknown", ru: "Не уверен(-а) / не хочу указывать", en: "Not sure / prefer not to say" },
    ],
  },
  {
    id: "currentStatus",
    ru: "Каков ваш текущий статус в США, если вы уже находитесь в стране?",
    en: "What is your current US status, if you are already in the country?",
    options: [
      { value: "abroad", ru: "Нахожусь за пределами США", en: "I am outside the US" },
      { value: "valid", ru: "Есть действующая виза или статус", en: "I have a valid visa or status" },
      { value: "student", ru: "Учебный статус F-1 / M-1 / J-1", en: "Student or exchange status F-1 / M-1 / J-1" },
      { value: "work", ru: "Рабочий статус", en: "Work status" },
      { value: "expired", ru: "Статус истёк или ситуация сложная", en: "My status expired or my situation is complicated" },
      { value: "unknown", ru: "Не уверен(-а)", en: "Not sure" },
    ],
  },
  {
    id: "protection",
    ru: "Связана ли ваша ситуация с опасением преследования в стране происхождения?",
    en: "Does your situation involve fear of persecution in your country of origin?",
    options: [
      { value: "yes", ru: "Да", en: "Yes" },
      { value: "no", ru: "Нет", en: "No" },
      { value: "unsure", ru: "Не уверен(-а)", en: "Not sure" },
    ],
  },
];

const routes: Route[] = [
  {
    id: "esta",
    emoji: "🛂",
    title: "Безвизовая поездка по ESTA",
    enTitle: "Visa Waiver Program / ESTA",
    visa: "ESTA — разрешение на поездку, не виза",
    desc: "Для подходящих граждан стран Visa Waiver Program, посещающих США с разрешённой целью на срок до 90 дней.",
    enDesc: "For eligible nationals of Visa Waiver Program countries visiting for a permitted purpose for up to 90 days.",
    link: "https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visa-waiver-program.html",
    requirements: "Нужны гражданство участвующей страны, электронный паспорт, одобрение ESTA и выполнение всех условий программы. Некоторые поездки в определённые страны, двойное гражданство или предыдущие отказы могут исключить право на ESTA. Одобрение ESTA не гарантирует въезд.",
    enRequirements: "Requires eligible nationality, an e-passport, ESTA approval and compliance with all program conditions. Certain travel history, dual nationality or previous refusals may affect eligibility. ESTA approval does not guarantee admission.",
    goals: ["visit"],
  },
  {
    id: "visitor",
    emoji: "🧳",
    title: "Гостевая виза и туризм",
    enTitle: "Visitor visa",
    visa: "B-1 / B-2 / B-1/B-2",
    desc: "Для временного туризма, посещения семьи и друзей, медицинского лечения или разрешённых деловых поездок.",
    enDesc: "For temporary tourism, visiting family or friends, medical treatment or permitted business visits.",
    link: "https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visitor.html",
    requirements: "Нужно обосновать цель временной поездки, показать план пребывания и способность оплатить расходы, а также соответствовать применимым требованиям. B-1/B-2 не разрешает обычную работу в США.",
    enRequirements: "You must establish the temporary purpose of travel, explain your plans and ability to pay, and meet applicable requirements. B-1/B-2 does not authorize ordinary employment in the US.",
    goals: ["visit"],
  },
  {
    id: "family",
    emoji: "👨‍👩‍👧",
    title: "Семейная иммиграция",
    enTitle: "Family-based immigration",
    visa: "IR / CR / F categories",
    desc: "Для определённых родственников граждан США и обладателей Green Card.",
    enDesc: "For eligible relatives of US citizens and Green Card holders.",
    link: "https://travel.state.gov/content/travel/en/us-visas/immigrate/family-immigration.html",
    requirements: "Нужны подходящие родственные отношения и обычно петиция от родственника. Категория, очередь и сроки зависят от степени родства и статуса петиционера.",
    enRequirements: "An eligible family relationship and usually a petition from the relative are required. Category and waiting time depend on the relationship and petitioner status.",
    goals: ["family", "permanent"],
  },
  {
    id: "fiance",
    emoji: "💍",
    title: "Виза жениха или невесты",
    enTitle: "Fiancé(e) visa",
    visa: "K-1",
    desc: "Для жениха или невесты гражданина США с намерением заключить брак в установленный срок.",
    enDesc: "For the fiancé(e) of a US citizen intending to marry within the required period.",
    link: "https://travel.state.gov/content/travel/en/us-visas/immigrate/family-immigration/immigrant-visa-for-a-spouse-or-fiance-of-a-us-citizen.html",
    requirements: "Петиционер должен быть гражданином США; необходимо выполнить требования к отношениям, встречам и планируемому браку. K-1 — не виза для партнёров обладателей Green Card.",
    enRequirements: "The petitioner must be a US citizen. Relationship, meeting and intended-marriage requirements apply. K-1 is not available for partners of Green Card holders.",
    goals: ["family"],
  },
  {
    id: "work",
    emoji: "💼",
    title: "Временные рабочие визы",
    enTitle: "Temporary worker visas",
    visa: "H-1B / H-2A / H-2B / другие",
    desc: "Для подходящих видов временной работы. Категория зависит от профессии, работодателя и характера работы.",
    enDesc: "For qualifying temporary work. The category depends on the occupation, employer and nature of the job.",
    link: "https://travel.state.gov/content/travel/en/us-visas/employment.html",
    requirements: "Во многих категориях работодатель должен подать петицию; могут требоваться квалификация, сертификация труда или другие условия. Предложение работы само по себе не означает право на визу.",
    enRequirements: "Many categories require an employer petition and may require qualifications, labor certification or other conditions. A job offer alone does not establish eligibility.",
    goals: ["work"],
  },
  {
    id: "student",
    emoji: "🎓",
    title: "Студенческая виза",
    enTitle: "Student visa",
    visa: "F-1 / M-1",
    desc: "Для академического или профессионального обучения в подходящем учебном заведении США.",
    enDesc: "For academic or vocational study at an eligible US institution.",
    link: "https://travel.state.gov/content/travel/en/us-visas/study/student-visa.html",
    requirements: "Как правило, нужны зачисление в подходящее учебное заведение, форма I-20, необходимые документы, достаточные средства и выполнение визовых требований. Учебная виза не выдаётся автоматически при зачислении.",
    enRequirements: "Usually requires admission to an eligible institution, Form I-20, required documents, sufficient funds and meeting visa requirements. Admission alone does not guarantee a visa.",
    goals: ["study"],
  },
  {
    id: "exchange",
    emoji: "🌎",
    title: "Обменная программа",
    enTitle: "Exchange visitor",
    visa: "J-1",
    desc: "Для участников утверждённых программ обмена, стажировок, научных и других подходящих программ.",
    enDesc: "For participants in approved exchange, internship, research and other qualifying programs.",
    link: "https://travel.state.gov/content/travel/en/us-visas/study/exchange.html",
    requirements: "Нужно принятие в утверждённую программу, форма DS-2019 и соблюдение условий спонсора. Для некоторых участников применяются дополнительные правила, включая возможное требование проживания за рубежом в течение двух лет.",
    enRequirements: "Requires acceptance into an approved program, Form DS-2019 and compliance with sponsor requirements. Additional rules may apply, including a possible two-year home-residence requirement.",
    goals: ["exchange"],
  },
  {
    id: "extraordinary",
    emoji: "🏆",
    title: "Виза для выдающихся способностей",
    enTitle: "Extraordinary ability visa",
    visa: "O-1",
    desc: "Для людей с подтверждёнными выдающимися способностями или достижениями в соответствующей области.",
    enDesc: "For people with documented extraordinary ability or achievement in a qualifying field.",
    link: "https://www.uscis.gov/working-in-the-united-states/temporary-workers/o-1-visa-individuals-with-extraordinary-ability-or-achievement",
    requirements: "Нужны доказательства, отвечающие критериям O-1, и подходящий петиционер или агент. Обычного профессионального опыта недостаточно.",
    enRequirements: "Requires evidence meeting O-1 criteria and an eligible petitioner or agent. Ordinary professional experience alone is insufficient.",
    goals: ["work"],
  },
  {
    id: "eb1a",
    emoji: "⭐",
    title: "Иммиграция по выдающимся достижениям",
    enTitle: "Employment-based immigration for extraordinary ability",
    visa: "EB-1A",
    desc: "Возможный путь к постоянному проживанию для людей, соответствующих строгим критериям выдающихся способностей.",
    enDesc: "A possible permanent-residence pathway for people who meet strict extraordinary-ability criteria.",
    link: "https://www.uscis.gov/working-in-the-united-states/permanent-workers/employment-based-immigration-first-preference-eb-1",
    requirements: "Нужны весомые доказательства устойчивого признания и соответствие всем критериям категории. В определённых условиях допускается самостоятельная петиция.",
    enRequirements: "Requires substantial evidence of sustained recognition and compliance with the category criteria. Self-petitioning is possible under applicable rules.",
    goals: ["permanent", "work"],
  },
  {
    id: "eb2niw",
    emoji: "🔬",
    title: "EB-2 National Interest Waiver",
    enTitle: "EB-2 National Interest Waiver",
    visa: "EB-2 NIW",
    desc: "Потенциальный путь к Green Card для некоторых специалистов, чья деятельность соответствует критериям национального интереса США.",
    enDesc: "A potential Green Card pathway for certain professionals whose proposed work meets US national-interest criteria.",
    link: "https://www.uscis.gov/working-in-the-united-states/permanent-workers/employment-based-immigration-second-preference-eb-2",
    requirements: "Сначала необходимо соответствовать категории EB-2, а затем отдельным критериям NIW. Одного диплома, опыта или полезной бизнес-идеи недостаточно для подтверждения права.",
    enRequirements: "You must first qualify for EB-2 and then meet the separate NIW criteria. A degree, experience or useful business idea alone does not establish eligibility.",
    goals: ["permanent", "work"],
  },
  {
    id: "eb3",
    emoji: "🧰",
    title: "Иммиграция через работодателя",
    enTitle: "Employment-based immigration",
    visa: "EB-3",
    desc: "Путь к постоянному проживанию для некоторых специалистов, квалифицированных работников и других подходящих работников.",
    enDesc: "A permanent-residence pathway for certain professionals, skilled workers and other eligible workers.",
    link: "https://www.uscis.gov/working-in-the-united-states/permanent-workers/employment-based-immigration-third-preference-eb-3",
    requirements: "Обычно требуются постоянное предложение работы от работодателя, соответствие требованиям вакансии и трудовая сертификация, если не применяется исключение. Возможны очереди по категории и стране.",
    enRequirements: "Usually requires a permanent job offer, meeting job requirements and labor certification unless an exception applies. Category and country-based backlogs may apply.",
    goals: ["permanent", "work"],
  },
  {
    id: "investor",
    emoji: "📈",
    title: "Инвестиционная иммиграция",
    enTitle: "Immigrant investor",
    visa: "EB-5",
    desc: "Для инвесторов, выполняющих требования программы, включая требования к капиталу, законному происхождению средств и рабочим местам.",
    enDesc: "For investors meeting program requirements, including capital, lawful source of funds and job creation.",
    link: "https://www.uscis.gov/eb-5",
    requirements: "Необходимо подтвердить квалифицируемую инвестицию, законное происхождение средств и выполнение действующих условий программы. Наличие капитала само по себе не гарантирует право.",
    enRequirements: "Requires a qualifying investment, lawful source of funds and compliance with current program conditions. Having capital alone does not establish eligibility.",
    goals: ["business", "permanent"],
  },
  {
    id: "l1",
    emoji: "🏢",
    title: "Перевод внутри международной компании",
    enTitle: "Intracompany transferee",
    visa: "L-1A / L-1B",
    desc: "Для подходящих руководителей, менеджеров и сотрудников со специализированными знаниями, переводимых в связанное подразделение в США.",
    enDesc: "For qualifying executives, managers and specialized-knowledge employees transferring to a related US entity.",
    link: "https://www.uscis.gov/working-in-the-united-states/temporary-workers/l-1a-intracompany-transferee-executive-or-manager",
    requirements: "Нужны квалифицируемая связь между компаниями, соответствующая должность и выполнение требований к зарубежной работе. Владение иностранной компанией само по себе недостаточно.",
    enRequirements: "Requires a qualifying relationship between entities, an eligible role and compliance with overseas employment requirements. Owning a foreign company alone is not enough.",
    goals: ["work", "business"],
  },
  {
    id: "investorTreaty",
    emoji: "🌐",
    title: "Торговая или инвестиционная виза",
    enTitle: "Treaty trader or investor visa",
    visa: "E-1 / E-2",
    desc: "Для подходящих торговцев или инвесторов, имеющих требуемое гражданство страны с соответствующим договором с США.",
    enDesc: "For qualifying traders or investors with the required nationality from a treaty country.",
    link: "https://travel.state.gov/content/travel/en/us-visas/employment/treaty-trader-investor-visa-e.html",
    requirements: "Право зависит от гражданства и действующего договора. Для E-2 нужны существенные инвестиции в реальное предприятие; конкретная оценка зависит от обстоятельств.",
    enRequirements: "Eligibility depends on nationality and an applicable treaty. E-2 requires a substantial investment in a real operating enterprise; assessment depends on the circumstances.",
    goals: ["business", "work"],
  },
  {
    id: "diversity",
    emoji: "🎟️",
    title: "Лотерея Diversity Visa",
    enTitle: "Diversity Visa program",
    visa: "DV",
    desc: "Иммиграционная программа для заявителей, соответствующих требованиям конкретного года.",
    enDesc: "An immigrant visa program for applicants who meet the requirements for a particular program year.",
    link: "https://travel.state.gov/content/travel/en/us-visas/immigrate/diversity-visa-program-entry.html",
    requirements: "Право участия обычно зависит от страны рождения с предусмотренными исключениями, а также образования или опыта работы. График, правила и доступность программы необходимо проверять для конкретного года. Участие не гарантирует выбор или выдачу визы.",
    enRequirements: "Eligibility generally depends on country of birth, subject to exceptions, and education or work experience. Check the schedule and rules for the specific year. Entry does not guarantee selection or visa issuance.",
    goals: ["permanent"],
  },
  {
    id: "protection",
    emoji: "🛡️",
    title: "Убежище и гуманитарная защита",
    enTitle: "Asylum and humanitarian protection",
    visa: "Отдельная юридическая процедура",
    desc: "Это не обычная виза для переезда. Возможность обратиться за защитой зависит от обстоятельств, места нахождения и применимого закона.",
    enDesc: "This is not an ordinary migration visa. Eligibility depends on individual circumstances, location and applicable law.",
    link: "https://www.uscis.gov/humanitarian/refugees-and-asylum/asylum",
    requirements: "Нужна индивидуальная юридическая оценка. Правила, сроки и процедура различаются в зависимости от ситуации. Навигатор не определяет право на убежище.",
    enRequirements: "Individual legal assessment is necessary. Rules, deadlines and procedures depend on the circumstances. This navigator cannot determine asylum eligibility.",
    goals: ["protection"],
  },
];

function getScore(id: string, a: Answers): number {
  const goal = a.goal;

  const hasFamily = ["citizen", "resident"].includes(a.familyUS);
  const hasOffer = a.jobOffer === "yes";
  const workReady = hasOffer && a.sponsor === "yes";
  const strongAchievement = a.achievements === "strong";
  const hasFunds = ["yes", "sponsor"].includes(a.funds);
  const vwpNationality = VWP_COUNTRIES.includes(a.citizenship);

  switch (id) {
    case "esta": {
      if (goal !== "visit") return 0;
      if (!vwpNationality) return 0;
      if (a.visitDuration === "over90") return 0;
      if (a.passport === "no") return 0;

      if (
        a.vwpRestrictions === "restrictedTravel" ||
        a.vwpRestrictions === "dualNationality" ||
        a.vwpRestrictions === "denied"
      ) {
        return 25;
      }

      if (
        a.passport === "yes" &&
        a.visitDuration === "under90" &&
        a.vwpRestrictions === "none"
      ) {
        return 85;
      }

      return 55;
    }

    case "visitor": {
      if (goal !== "visit") return 0;
      if (a.citizenship === "ca" || a.citizenship === "bm") return 0;

      if (
        vwpNationality &&
        a.visitDuration === "under90" &&
        a.passport === "yes" &&
        a.vwpRestrictions === "none"
      ) {
        return 35;
      }

      if (hasFunds && a.visitPurpose) return 80;
      if (hasFunds) return 65;

      return 50;
    }

    case "family": {
      if (goal !== "family" && goal !== "permanent") return 0;
      if (hasFamily) return 95;
      if (goal === "family" && a.familyUS === "unknown") return 45;
      if (goal === "family") return 30;

      return 0;
    }

    case "fiance": {
      if (goal !== "family") return 0;
      return a.familyUS === "fiance" ? 90 : 0;
    }

    case "work": {
      if (goal !== "work") return 0;

      if (workReady && a.workExperience !== "none") return 85;
      if (hasOffer && a.sponsor !== "no") return 70;
      if (hasOffer) return 55;

      if (
        ["3plus", "specialist", "manager", "research"].includes(
          a.workExperience
        )
      ) {
        return 45;
      }

      return 25;
    }

    case "student": {
      if (goal !== "study") return 0;

      if (a.studentOffer === "yes" && hasFunds) return 90;
      if (a.studentOffer === "yes") return 70;
      if (a.studentOffer === "applying" && hasFunds) return 65;

      return 45;
    }

    case "exchange": {
      if (goal !== "exchange") return 0;

      if (a.exchangeOffer === "yes") return 90;
      if (a.exchangeOffer === "unknown") return 45;

      return 35;
    }

    case "extraordinary": {
      if (goal !== "work") return 0;

      if (strongAchievement) return 85;
      if (a.achievements === "some") return 45;

      return 0;
    }

    case "eb1a": {
      if (!["permanent", "work"].includes(goal)) return 0;

      if (strongAchievement) return 85;
      if (a.achievements === "some" && goal === "permanent") return 45;

      return 0;
    }

    case "eb2niw": {
      if (!["permanent", "work"].includes(goal)) return 0;

      if (
        ["master", "bachelor"].includes(a.education) &&
        ["specialist", "research"].includes(a.workExperience)
      ) {
        return strongAchievement ? 80 : 65;
      }

      if (
        a.education === "master" &&
        a.workExperience === "3plus"
      ) {
        return 60;
      }

      if (goal === "permanent" && a.education === "master") {
        return 45;
      }

      return 0;
    }

    case "eb3": {
      if (!["permanent", "work"].includes(goal)) return 0;

      if (hasOffer && a.sponsor === "yes") return 80;
      if (hasOffer) return 60;
      if (goal === "permanent" && a.workExperience !== "none") return 40;

      return 0;
    }

    case "investor": {
      if (!["business", "permanent"].includes(goal)) return 0;

      if (a.business === "large") return 80;
      if (a.business === "some" && goal === "business") return 40;

      return 0;
    }

    case "l1": {
      if (!["work", "business"].includes(goal)) return 0;

      if (a.business === "company" && a.workExperience === "manager") {
        return 85;
      }

      if (a.business === "company" && a.workExperience === "specialist") {
        return 75;
      }

      if (a.business === "company") return 55;

      return 0;
    }

    case "investorTreaty": {
      if (goal !== "business") return 0;

      if (a.business === "large") return 60;
      if (a.business === "some") return 35;

      return 0;
    }

    case "diversity": {
      if (goal !== "permanent") return 0;

      if (!a.birthCountry || a.birthCountry === "unknown") return 35;

      return 45;
    }

    case "protection": {
      if (a.protection === "yes") return 85;
      if (goal === "protection" || a.protection === "unsure") return 45;

      return 0;
    }

    default:
      return 0;
  }
}

export default function USPage() {
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

  const vwpConcern =
    answers.goal === "visit" &&
    answers.citizenship &&
    VWP_COUNTRIES.includes(answers.citizenship) &&
    answers.vwpRestrictions &&
    answers.vwpRestrictions !== "none";

  return (
    <main className="min-h-screen bg-[#080d18] text-slate-100">
      <EsurpysNavigation />

      <section className="mx-auto max-w-6xl px-5 pb-12 pt-12">
        <div className="mb-10 rounded-3xl border border-blue-400/20 bg-gradient-to-br from-blue-950 via-slate-900 to-red-950 p-7 md:p-10">
          <div className="mb-4">
  <CountryFlag
    code="US"
    name="United States"
    className="h-12 w-18 rounded-md ring-1 ring-white/10"
  />
</div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
            {t("Иммиграционный навигатор", "Immigration navigator")}
          </p>
          <h1 className="mb-4 text-3xl font-bold md:text-5xl">
            {t("Переезд в США", "Move to the United States")}
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
              <span key={ru} className="rounded-full border border-white/15 px-3 py-2">
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

                        <p className="mt-1 text-sm text-slate-400">{route.visa}</p>
                        <p className="mt-3 text-sm leading-6 text-slate-300">
                          {t(route.desc, route.enDesc)}
                        </p>

                        <div className="mt-4 rounded-xl bg-white/[0.04] p-3 text-sm leading-6 text-slate-400">
                          <strong className="text-slate-200">
                            {t("Основные условия: ", "Key requirements: ")}
                          </strong>
                          {t(route.requirements, route.enRequirements)}
                        </div>

                        {route.id === "esta" && (
                          <p className="mt-3 text-sm leading-6 text-amber-300">
                            {t(
                              "ESTA — не виза. Не покупайте невозвратные билеты, пока не проверите действующие требования и не получите необходимое разрешение. Окончательное решение о допуске принимает пограничная служба.",
                              "ESTA is not a visa. Check current requirements and obtain the required authorization before relying on visa-free travel. Final admission is decided by border officials."
                            )}
                          </p>
                        )}

                        {route.id === "diversity" && (
                          <p className="mt-3 text-sm leading-6 text-amber-300">
                            {t(
                              "Важно: право участия обычно связано со страной рождения, а не только с гражданством. Проверяйте правила конкретного года на официальном сайте.",
                              "Important: eligibility generally relates to country of birth, not only citizenship. Check the official rules for the specific program year."
                            )}
                          </p>
                        )}

                        {route.id === "protection" && (
                          <p className="mt-3 text-sm leading-6 text-amber-300">
                            {t(
                              "Важно: это чувствительная юридическая процедура. Обратитесь к квалифицированному юристу или аккредитованному представителю.",
                              "Important: this is a sensitive legal process. Consult a qualified attorney or accredited representative."
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

            {vwpConcern && (
              <div className="mt-6 rounded-2xl border border-amber-300/20 bg-amber-300/5 p-4 text-sm leading-6 text-slate-300">
                <strong className="text-amber-200">
                  {t("Нужна дополнительная проверка ESTA", "Additional ESTA review needed")}
                </strong>
                <p className="mt-2">
                  {t(
                    "Ваш ответ может влиять на право участия в Visa Waiver Program. Не полагайтесь только на предварительный результат: проверьте официальные ограничения и подайте заявку через официальный сервис ESTA.",
                    "Your answer may affect Visa Waiver Program eligibility. Do not rely on this preliminary result alone; check the official restrictions and use the official ESTA service."
                  )}
                </p>
                <a
                  className="mt-3 inline-block font-semibold text-blue-300 hover:text-blue-200"
                  href="https://esta.cbp.dhs.gov/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("Официальный сайт ESTA", "Official ESTA website")} ↗
                </a>
              </div>
            )}

            {answers.immigrationHistory &&
              !["none", "unknown"].includes(answers.immigrationHistory) && (
                <div className="mt-6 rounded-2xl border border-amber-300/20 bg-amber-300/5 p-4 text-sm leading-6 text-slate-300">
                  <strong className="text-amber-200">
                    {t("Внимание к иммиграционной истории", "Immigration history")}
                  </strong>
                  <p className="mt-2">
                    {t(
                      "Отказ, нарушение условий пребывания или выдворение не всегда автоматически исключают все варианты, но последствия зависят от фактов и законодательства. Перед подачей заявления рассмотрите консультацию квалифицированного иммиграционного юриста.",
                      "A refusal, status violation or removal does not automatically rule out every option, but consequences depend on the facts and applicable law. Consider qualified immigration advice before applying."
                    )}
                  </p>
                </div>
              )}

            {answers.currentStatus === "expired" && (
              <div className="mt-6 rounded-2xl border border-amber-300/20 bg-amber-300/5 p-4 text-sm leading-6 text-slate-300">
                <strong className="text-amber-200">
                  {t("Возможная проблема со статусом", "Potential status issue")}
                </strong>
                <p className="mt-2">
                  {t(
                    "Если вы находитесь в США и срок разрешённого пребывания истёк, последствия могут быть серьёзными. Не делайте выводов по анкете; обратитесь за индивидуальной юридической консультацией.",
                    "If you are in the US and your authorized stay has expired, consequences may be serious. Do not rely on this questionnaire; seek individualized legal advice."
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
                  "Иммиграционные правила, ограничения на выдачу виз, сборы и сроки могут меняться. Перед подачей заявления проверьте официальные обновления USCIS и Госдепартамента США. Этот навигатор не является юридической консультацией и не проверяет автоматически все действующие ограничения по гражданству.",
                  "Immigration rules, visa issuance restrictions, fees and processing times can change. Check current USCIS and Department of State updates before applying. This navigator is not legal advice and does not automatically verify every current nationality-based restriction."
                )}
              </p>
              <div className="mt-3 flex flex-wrap gap-4">
                <a
                  href="https://www.uscis.gov/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-300 hover:text-blue-200"
                >
                  USCIS ↗
                </a>
                <a
                  href="https://travel.state.gov/content/travel/en/us-visas.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-300 hover:text-blue-200"
                >
                  {t("Госдепартамент США", "US Department of State")} ↗
                </a>
                <a
                  href="https://travel.state.gov/content/travel/en/News/visas-news.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-300 hover:text-blue-200"
                >
                  {t("Обновления по визам", "Visa updates")} ↗
                </a>
              </div>
            </div>
          </section>
        </div>

        <footer className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-slate-500">
          {t("Иммиграционный навигатор США", "US Immigration Navigator")} ·{" "}
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