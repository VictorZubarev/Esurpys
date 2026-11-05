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

const citizenshipOptions: Option[] = [
  { value: "ru", ru: "🇷🇺 Россия", en: "🇷🇺 Russia" },
  { value: "ua", ru: "🇺🇦 Украина", en: "🇺🇦 Ukraine" },
  { value: "by", ru: "🇧🇾 Беларусь", en: "🇧🇾 Belarus" },
  { value: "kz", ru: "🇰🇿 Казахстан", en: "🇰🇿 Kazakhstan" },
  { value: "uz", ru: "🇺🇿 Узбекистан", en: "🇺🇿 Uzbekistan" },
  { value: "am", ru: "🇦🇲 Армения", en: "🇦🇲 Armenia" },
  { value: "ge", ru: "🇬🇪 Грузия", en: "🇬🇪 Georgia" },
  { value: "ca", ru: "🇨🇦 Канада", en: "🇨🇦 Canada" },
  { value: "us", ru: "🇺🇸 США", en: "🇺🇸 United States" },
  { value: "in", ru: "🇮🇳 Индия", en: "🇮🇳 India" },
  { value: "cn", ru: "🇨🇳 Китай", en: "🇨🇳 China" },
  { value: "au", ru: "🇦🇺 Австралия", en: "🇦🇺 Australia" },
  { value: "nz", ru: "🇳🇿 Новая Зеландия", en: "🇳🇿 New Zealand" },
  { value: "ie", ru: "🇮🇪 Ирландия", en: "🇮🇪 Ireland" },
  { value: "fr", ru: "🇫🇷 Франция", en: "🇫🇷 France" },
  { value: "de", ru: "🇩🇪 Германия", en: "🇩🇪 Germany" },
  { value: "pl", ru: "🇵🇱 Польша", en: "🇵🇱 Poland" },
  { value: "es", ru: "🇪🇸 Испания", en: "🇪🇸 Spain" },
  { value: "it", ru: "🇮🇹 Италия", en: "🇮🇹 Italy" },
  { value: "jp", ru: "🇯🇵 Япония", en: "🇯🇵 Japan" },
  { value: "br", ru: "🇧🇷 Бразилия", en: "🇧🇷 Brazil" },
  { value: "za", ru: "🇿🇦 Южная Африка", en: "🇿🇦 South Africa" },
  { value: "other", ru: "Другая страна", en: "Another country" },
  { value: "unknown", ru: "Не хочу указывать", en: "Prefer not to say" },
];

const questions: Question[] = [
  {
    id: "goal",
    ru: "Какова ваша главная цель?",
    en: "What is your main goal?",
    options: [
      { value: "work", ru: "Работа в Великобритании", en: "Work in the UK" },
      { value: "study", ru: "Учёба", en: "Study" },
      { value: "business", ru: "Бизнес или предпринимательство", en: "Business or entrepreneurship" },
      { value: "family", ru: "Переезд к семье или партнёру", en: "Join family or partner" },
      { value: "permanent", ru: "Постоянное проживание", en: "Permanent settlement" },
      { value: "visit", ru: "Туризм, гости или деловая поездка", en: "Tourism, visiting or business trip" },
      { value: "exchange", ru: "Обменная программа или временная работа", en: "Exchange program or temporary work" },
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
      { value: "ie", ru: "Ирландия", en: "Ireland" },
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
      { value: "uk", ru: "Великобритания", en: "United Kingdom" },
      { value: "ie", ru: "Ирландия", en: "Ireland" },
      { value: "eu", ru: "Другая страна ЕС / ЕЭЗ", en: "Another EU / EEA country" },
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
    ru: "Есть ли предложение работы от работодателя в Великобритании?",
    en: "Do you have a job offer from a UK employer?",
    options: [
      { value: "yes", ru: "Да", en: "Yes" },
      { value: "no", ru: "Нет", en: "No" },
      { value: "maybe", ru: "Веду переговоры", en: "In discussion" },
    ],
  },
  {
    id: "sponsor",
    ru: "Есть ли у работодателя лицензия спонсора и готов ли он оформить Certificate of Sponsorship?",
    en: "Does the employer have a sponsor licence and are they willing to issue a Certificate of Sponsorship?",
    options: [
      { value: "yes", ru: "Да", en: "Yes" },
      { value: "no", ru: "Нет", en: "No" },
      { value: "unknown", ru: "Не знаю", en: "Not sure" },
      { value: "na", ru: "Нет предложения работы", en: "No job offer" },
    ],
  },
  {
    id: "studentOffer",
    ru: "Есть ли зачисление или предложение от британского учебного заведения?",
    en: "Have you been accepted by a UK educational institution?",
    options: [
      { value: "yes", ru: "Да, есть зачисление и CAS или ожидаю его", en: "Yes, I have an offer and a CAS or am awaiting it" },
      { value: "no", ru: "Нет", en: "No" },
      { value: "applying", ru: "Планирую подать документы", en: "Planning to apply" },
    ],
  },
  {
    id: "exchangeOffer",
    ru: "Есть ли приглашение на утверждённую программу обмена, стажировки или временной работы?",
    en: "Do you have an offer for an approved exchange, internship or temporary work scheme?",
    options: [
      { value: "yes", ru: "Да", en: "Yes" },
      { value: "no", ru: "Нет", en: "No" },
      { value: "unknown", ru: "Не знаю", en: "Not sure" },
    ],
  },
  {
    id: "familyUS",
    ru: "Есть ли у вас супруг(-а), партнёр или близкий родственник в Великобритании с подходящим статусом?",
    en: "Do you have a spouse, partner or close relative in the UK with an eligible status?",
    options: [
      { value: "citizen", ru: "Супруг(-а) или партнёр — гражданин Великобритании", en: "Spouse or partner is a British citizen" },
      { value: "resident", ru: "Супруг(-а) или партнёр имеет settled status / ILR", en: "Spouse or partner has settled status / ILR" },
      { value: "otherFamily", ru: "Другой родственник с подходящим статусом", en: "Another relative with an eligible status" },
      { value: "no", ru: "Нет", en: "No" },
      { value: "unknown", ru: "Не уверен(-а)", en: "Not sure" },
    ],
  },
  {
    id: "achievements",
    ru: "Есть ли выдающиеся профессиональные достижения?",
    en: "Do you have outstanding professional achievements?",
    options: [
      { value: "strong", ru: "Да: крупные награды, публикации, признание или значимые достижения", en: "Yes: major awards, publications, recognition or significant achievements" },
      { value: "some", ru: "Есть достижения, но не знаю, подходят ли они", en: "Some achievements, but unsure if they qualify" },
      { value: "no", ru: "Нет", en: "No" },
    ],
  },
  {
    id: "business",
    ru: "Каковы ваши планы в отношении бизнеса?",
    en: "What are your business plans?",
    options: [
      { value: "large", ru: "Есть инновационная бизнес-идея и план развития", en: "I have an innovative business idea and growth plan" },
      { value: "some", ru: "Есть небольшой бизнес или бизнес-план", en: "I have a small business or a business plan" },
      { value: "company", ru: "Работаю в международной компании, возможен перевод", en: "I work for an international company and may transfer" },
      { value: "no", ru: "Не планирую бизнес", en: "No business plans" },
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
      { value: "transit", ru: "Транзит через Великобританию", en: "Transit through the UK" },
      { value: "other", ru: "Другая цель", en: "Another purpose" },
    ],
  },
  {
    id: "visitDuration",
    ru: "Как долго планируете находиться в Великобритании?",
    en: "How long do you plan to stay in the UK?",
    options: [
      { value: "under90", ru: "До 3 месяцев", en: "Up to 3 months" },
      { value: "over90", ru: "Более 3 месяцев", en: "More than 3 months" },
      { value: "unsure", ru: "Пока не знаю", en: "Not sure yet" },
    ],
  },
  {
    id: "passport",
    ru: "Есть ли у вас действующий паспорт на весь срок поездки?",
    en: "Do you have a valid passport for the entire trip?",
    options: [
      { value: "yes", ru: "Да", en: "Yes" },
      { value: "no", ru: "Нет", en: "No" },
      { value: "unknown", ru: "Не уверен(-а)", en: "Not sure" },
    ],
  },
  {
    id: "vwpRestrictions",
    ru: "Есть ли у вас отказы во въезде, судимости или другие обстоятельства, которые могут повлиять на допуск в Великобританию?",
    en: "Have you had UK entry refusals, criminal convictions or other circumstances that may affect admission?",
    options: [
      { value: "none", ru: "Насколько мне известно, нет", en: "Not to my knowledge" },
      { value: "criminal", ru: "Есть судимость или уголовное дело", en: "I have a criminal conviction or pending case" },
      { value: "denied", ru: "Был отказ в визе или во въезде", en: "I have had a visa or entry refusal" },
      { value: "immigration", ru: "Было нарушение иммиграционных правил", en: "I have breached immigration rules" },
      { value: "unknown", ru: "Не уверен(-а)", en: "Not sure" },
    ],
  },
  {
    id: "funds",
    ru: "Можете ли вы подтвердить средства на поездку, обучение или проживание?",
    en: "Can you document funds for your trip, studies or living costs?",
    options: [
      { value: "yes", ru: "Да", en: "Yes" },
      { value: "sponsor", ru: "Есть финансовый спонсор", en: "I have a financial sponsor" },
      { value: "no", ru: "Пока нет", en: "Not yet" },
    ],
  },
  {
    id: "immigrationHistory",
    ru: "Были ли у вас отказы в визах, превышение срока пребывания или выдворение?",
    en: "Have you had visa refusals, overstays or removal?",
    options: [
      { value: "none", ru: "Нет", en: "No" },
      { value: "refusal", ru: "Был отказ в визе", en: "Visa refusal" },
      { value: "overstay", ru: "Превышение срока пребывания или нарушение условий", en: "Overstay or breach of conditions" },
      { value: "removed", ru: "Депортация или выдворение", en: "Deportation or removal" },
      { value: "unknown", ru: "Не уверен(-а) / не хочу указывать", en: "Not sure / prefer not to say" },
    ],
  },
  {
    id: "currentStatus",
    ru: "Каков ваш текущий статус в Великобритании, если вы уже находитесь в стране?",
    en: "What is your current UK status, if you are already in the country?",
    options: [
      { value: "abroad", ru: "Нахожусь за пределами Великобритании", en: "I am outside the UK" },
      { value: "valid", ru: "Есть действующая виза или разрешение", en: "I have a valid visa or permission" },
      { value: "student", ru: "Студенческая виза", en: "Student visa" },
      { value: "work", ru: "Рабочая виза", en: "Work visa" },
      { value: "expired", ru: "Разрешение истекло или ситуация сложная", en: "My permission expired or my situation is complicated" },
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
    id: "visitor",
    emoji: "🧳",
    title: "Гостевая поездка",
    enTitle: "Standard Visitor",
    visa: "Standard Visitor visa / ETA / без визы в зависимости от гражданства",
    desc: "Для туризма, посещения семьи и друзей, некоторых деловых мероприятий и других разрешённых краткосрочных целей.",
    enDesc: "For tourism, visiting family and friends, certain business activities and other permitted short-term purposes.",
    link: "https://www.gov.uk/standard-visitor",
    requirements: "Документ для въезда зависит от гражданства и обстоятельств: может потребоваться виза, ETA или не потребоваться ни то ни другое. Обычно нужно показать временную цель поездки, достаточные средства и намерение уехать по её окончании. Посещение по гостевому маршруту не даёт права на обычную работу.",
    enRequirements: "The entry document depends on nationality and circumstances: you may need a visa, an ETA, or neither. You generally need to show a genuine temporary purpose, sufficient funds and an intention to leave at the end of the visit. Visitor status does not permit ordinary employment.",
    goals: ["visit"],
  },
  {
    id: "skilledWorker",
    emoji: "💼",
    title: "Рабочая виза Skilled Worker",
    enTitle: "Skilled Worker visa",
    visa: "Skilled Worker",
    desc: "Для работы у британского работодателя, имеющего право спонсировать сотрудников на подходящих должностях.",
    enDesc: "For work in an eligible role with a UK employer licensed to sponsor workers.",
    link: "https://www.gov.uk/skilled-worker-visa",
    requirements: "Обычно необходимы предложение от лицензированного спонсора, Certificate of Sponsorship, подходящая профессия и соответствие требованиям к зарплате и английскому языку. Само наличие предложения работы не гарантирует право на визу.",
    enRequirements: "Usually requires a job offer from a licensed sponsor, a Certificate of Sponsorship, an eligible occupation and meeting salary and English-language requirements. A job offer alone does not guarantee eligibility.",
    goals: ["work"],
  },
  {
    id: "healthCare",
    emoji: "🩺",
    title: "Виза для медицинских и социальных работников",
    enTitle: "Health and Care Worker visa",
    visa: "Health and Care Worker",
    desc: "Специальный маршрут для соответствующих требованиям медицинских специалистов и определённых работников сферы ухода.",
    enDesc: "A specific route for eligible health professionals and certain care workers.",
    link: "https://www.gov.uk/health-care-worker-visa",
    requirements: "Нужны подходящая должность и работодатель, уполномоченный выступать спонсором. Доступность профессий и условия зависят от действующих правил; не все должности в сфере ухода подходят.",
    enRequirements: "Requires an eligible role and an employer authorised to sponsor. Eligible occupations and conditions depend on current rules; not every care-sector job qualifies.",
    goals: ["work"],
  },
  {
    id: "globalTalent",
    emoji: "🏆",
    title: "Виза Global Talent",
    enTitle: "Global Talent visa",
    visa: "Global Talent",
    desc: "Для признанных лидеров или потенциальных лидеров в науке, исследованиях, искусстве, культуре и цифровых технологиях.",
    enDesc: "For recognised leaders or potential leaders in science, research, arts, culture and digital technology.",
    link: "https://www.gov.uk/global-talent",
    requirements: "Обычно требуется одобрение уполномоченной организации, подтверждающее соответствие критериям. Некоторые обладатели указанных в официальном списке престижных наград могут подавать заявку без отдельного одобрения.",
    enRequirements: "Usually requires endorsement by an authorised body confirming that the criteria are met. Some holders of prestigious prizes listed in the official rules may apply without a separate endorsement.",
    goals: ["work", "permanent"],
  },
  {
    id: "student",
    emoji: "🎓",
    title: "Студенческая виза",
    enTitle: "Student visa",
    visa: "Student",
    desc: "Для обучения на подходящей программе в британском учебном заведении, имеющем лицензию спонсора.",
    enDesc: "For study on an eligible course at a UK education provider licensed to sponsor students.",
    link: "https://www.gov.uk/student-visa",
    requirements: "Обычно необходимы предложение о зачислении, Confirmation of Acceptance for Studies (CAS), подтверждение средств и английского языка, если применимо. Одного предложения от учебного заведения недостаточно.",
    enRequirements: "Usually requires an offer of a place, a Confirmation of Acceptance for Studies (CAS), evidence of funds and English ability where applicable. An offer alone is not sufficient.",
    goals: ["study"],
  },
  {
    id: "graduate",
    emoji: "📚",
    title: "Виза Graduate после учёбы",
    enTitle: "Graduate visa",
    visa: "Graduate",
    desc: "Для подходящих выпускников, успешно завершивших квалифицируемую программу в Великобритании и выполнивших условия маршрута.",
    enDesc: "For eligible graduates who have successfully completed a qualifying course in the UK and meet the route conditions.",
    link: "https://www.gov.uk/graduate-visa",
    requirements: "Как правило, нужно находиться в Великобритании с подходящим студенческим разрешением, а учебное заведение должно подтвердить успешное завершение программы. Это не самостоятельный маршрут для переезда из-за рубежа без подходящей учёбы в Великобритании.",
    enRequirements: "You generally need to be in the UK with eligible Student permission, and your provider must confirm successful completion. This is not a standalone route for moving from overseas without qualifying UK study.",
    goals: ["work", "permanent"],
  },
  {
    id: "family",
    emoji: "👨‍👩‍👧",
    title: "Семейная виза",
    enTitle: "Family visa",
    visa: "Partner / Spouse / Parent / Child",
    desc: "Для подходящих супругов, партнёров, детей и некоторых других членов семьи граждан Великобритании или лиц с соответствующим статусом.",
    enDesc: "For eligible spouses, partners, children and certain other family members of British citizens or people with qualifying status.",
    link: "https://www.gov.uk/uk-family-visa",
    requirements: "Требования зависят от родства и статуса родственника. Могут потребоваться доказательства подлинности отношений, финансовых условий, жилья и знания английского языка. Не каждый родственник даёт право на семейную визу.",
    enRequirements: "Requirements depend on the relationship and the relative's status. Evidence of a genuine relationship, financial requirements, accommodation and English may be required. Not every family relationship qualifies.",
    goals: ["family", "permanent"],
  },
  {
    id: "innovator",
    emoji: "🚀",
    title: "Виза Innovator Founder",
    enTitle: "Innovator Founder visa",
    visa: "Innovator Founder",
    desc: "Для предпринимателей, планирующих создать в Великобритании инновационный, жизнеспособный и масштабируемый бизнес.",
    enDesc: "For entrepreneurs planning to establish an innovative, viable and scalable business in the UK.",
    link: "https://www.gov.uk/innovator-founder-visa",
    requirements: "Бизнес-идея должна соответствовать установленным критериям и получить одобрение уполномоченной организации. Также применяются требования к английскому языку, возрасту и личным средствам. Просто наличие капитала или бизнес-плана недостаточно.",
    enRequirements: "The business idea must meet the criteria and be endorsed by an authorised body. English, age and personal-funds requirements also apply. Capital or a business plan alone is not sufficient.",
    goals: ["business"],
  },
  {
    id: "exchange",
    emoji: "🌍",
    title: "Временная работа и обмен",
    enTitle: "Temporary Work and exchange routes",
    visa: "Government Authorised Exchange and other eligible routes",
    desc: "Для определённых стажировок, обучения на рабочем месте, исследовательских и обменных программ с одобренным спонсором.",
    enDesc: "For certain internships, work-based training, research and exchange schemes with an approved sponsor.",
    link: "https://www.gov.uk/government-authorised-exchange",
    requirements: "Условия зависят от конкретной категории. Для Government Authorised Exchange обычно нужен одобренный спонсор и соответствующая программа. Не все стажировки и обменные мероприятия подпадают под этот маршрут.",
    enRequirements: "Requirements depend on the specific category. Government Authorised Exchange usually requires an approved sponsor and qualifying scheme. Not every internship or exchange activity qualifies.",
    goals: ["exchange", "work"],
  },
  {
    id: "ancestry",
    emoji: "🌳",
    title: "Виза UK Ancestry",
    enTitle: "UK Ancestry visa",
    visa: "UK Ancestry",
    desc: "Потенциальный маршрут для граждан определённых стран Содружества, имеющих подходящего дедушку или бабушку, родившихся в соответствующих местах.",
    enDesc: "A potential route for citizens of eligible Commonwealth countries with a qualifying grandparent born in specified locations.",
    link: "https://www.gov.uk/ancestry-visa",
    requirements: "Право зависит от гражданства, семейных документов, места рождения дедушки или бабушки, возраста и намерения работать. Одного британского происхождения без выполнения остальных условий недостаточно.",
    enRequirements: "Eligibility depends on nationality, family documents, the grandparent's place of birth, age and intention to work. British ancestry alone does not establish eligibility.",
    goals: ["work", "permanent"],
  },
  {
    id: "settlement",
    emoji: "🏡",
    title: "Постоянное проживание (ILR)",
    enTitle: "Indefinite Leave to Remain (ILR)",
    visa: "Settlement",
    desc: "Возможность получить постоянное разрешение на проживание после выполнения требований подходящего иммиграционного маршрута.",
    enDesc: "A possibility of obtaining permanent permission to stay after meeting the requirements of an eligible immigration route.",
    link: "https://www.gov.uk/indefinite-leave-to-remain",
    requirements: "Требования к сроку проживания, непрерывности пребывания, английскому языку, тесту Life in the UK и другим условиям зависят от текущего статуса и категории визы. Это обычно не первоначальная виза для переезда.",
    enRequirements: "Residence period, continuous residence, English, Life in the UK test and other requirements depend on your current status and visa category. This is generally not an initial entry visa.",
    goals: ["permanent"],
  },
  {
    id: "protection",
    emoji: "🛡️",
    title: "Убежище и международная защита",
    enTitle: "Asylum and international protection",
    visa: "Отдельная юридическая процедура",
    desc: "Это не обычная виза для переезда. Возможность получить защиту зависит от обстоятельств и применимого законодательства.",
    enDesc: "This is not an ordinary migration visa. Eligibility for protection depends on individual circumstances and applicable law.",
    link: "https://www.gov.uk/claim-asylum",
    requirements: "Нужна индивидуальная юридическая оценка. Процедура убежища предназначена для людей, которые не могут безопасно вернуться в свою страну из-за опасения преследования. Навигатор не определяет право на защиту.",
    enRequirements: "Individual legal assessment is necessary. Asylum is for people who cannot safely return to their country because they fear persecution. This navigator cannot determine eligibility for protection.",
    goals: ["protection"],
  },
];

function getScore(id: string, a: Answers): number {
  let score = 0;

  const goal = a.goal;
  const hasOffer = a.jobOffer === "yes";
  const sponsored = hasOffer && a.sponsor === "yes";
  const hasFunds = ["yes", "sponsor"].includes(a.funds);
  const experienced = ["3plus", "specialist", "manager", "research"].includes(a.workExperience);
  const strongEnglish = ["advanced", "native"].includes(a.english);
  const hasFamily = ["citizen", "resident"].includes(a.familyUS);
  const hasRelevantFamily = ["citizen", "resident", "otherFamily"].includes(a.familyUS);
  const hasStudyOffer = a.studentOffer === "yes";
  const hasAchievements = a.achievements === "strong";
  const hasBusinessIdea = a.business === "large";
  const adverseHistory = ["criminal", "denied", "immigration"].includes(a.vwpRestrictions)
    || ["refusal", "overstay", "removed"].includes(a.immigrationHistory);

  switch (id) {
    case "visitor": {
      if (goal !== "visit") return 0;

      score = 45;
      if (["tourism", "business", "medical", "transit"].includes(a.visitPurpose)) score += 15;
      if (["under90", "unsure"].includes(a.visitDuration)) score += 10;
      if (hasFunds) score += 15;
      if (a.passport === "yes") score += 10;
      if (a.passport === "no") score -= 25;
      if (adverseHistory) score -= 15;

      return Math.max(0, Math.min(100, score));
    }

    case "skilledWorker": {
      if (goal !== "work") return 0;

      score = 15;
      if (hasOffer) score += 25;
      if (sponsored) score += 25;
      if (experienced) score += 12;
      if (strongEnglish) score += 8;
      if (["bachelor", "master"].includes(a.education)) score += 5;
      if (a.jobOffer === "no") score -= 8;
      if (a.sponsor === "no") score -= 12;
      if (a.passport === "no") score -= 20;
      if (adverseHistory) score -= 10;

      return Math.max(0, Math.min(100, score));
    }

    case "healthCare": {
      if (goal !== "work") return 0;

      score = 10;
      if (hasOffer) score += 25;
      if (a.sponsor === "yes") score += 25;
      if (experienced) score += 15;
      if (strongEnglish) score += 8;
      if (a.passport === "no") score -= 20;
      if (adverseHistory) score -= 10;

      return Math.max(0, Math.min(100, score));
    }

    case "globalTalent": {
      if (!["work", "permanent"].includes(goal) && !hasAchievements) return 0;

      score = 10;
      if (hasAchievements) score += 55;
      if (a.achievements === "some") score += 25;
      if (["specialist", "research", "manager"].includes(a.workExperience)) score += 12;
      if (a.education === "master") score += 8;

      return Math.max(0, Math.min(100, score));
    }

    case "student": {
      if (goal !== "study") return 0;

      score = 20;
      if (hasStudyOffer) score += 40;
      if (a.studentOffer === "applying") score += 20;
      if (hasFunds) score += 20;
      if (strongEnglish) score += 8;
      if (a.passport === "no") score -= 20;

      return Math.max(0, Math.min(100, score));
    }

    case "graduate": {
      if (!["work", "permanent"].includes(goal)) return 0;

      score = 10;
      if (a.residence === "uk") score += 20;
      if (a.currentStatus === "student") score += 45;
      if (["bachelor", "master"].includes(a.education)) score += 10;
      if (a.currentStatus === "abroad") score = 0;

      return Math.max(0, Math.min(100, score));
    }

    case "family": {
      if (goal !== "family" && goal !== "permanent") return 0;

      score = 10;
      if (hasFamily && goal === "family") score += 55;
      if (hasFamily && goal === "permanent") score += 45;
      if (a.familyUS === "otherFamily") score += 20;
      if (a.familyUS === "unknown") score += 10;
      if (a.familyUS === "no") score = 0;

      return Math.max(0, Math.min(100, score));
    }

    case "innovator": {
      if (goal !== "business") return 0;

      score = 15;
      if (hasBusinessIdea) score += 45;
      if (a.business === "some") score += 25;
      if (a.business === "company") score += 15;
      if (hasFunds) score += 10;
      if (strongEnglish) score += 5;

      return Math.max(0, Math.min(100, score));
    }

    case "exchange": {
      if (goal !== "exchange" && !(goal === "work" && a.exchangeOffer === "yes")) return 0;

      score = 20;
      if (a.exchangeOffer === "yes") score += 50;
      if (a.exchangeOffer === "unknown") score += 15;
      if (["18-24", "25-29"].includes(a.age)) score += 10;
      if (a.passport === "no") score -= 20;

      return Math.max(0, Math.min(100, score));
    }

    case "ancestry": {
      if (!["work", "permanent"].includes(goal)) return 0;

      score = 0;
      if (["au", "ca", "nz", "za"].includes(a.citizenship)) score += 45;
      if (a.birthCountry === "ie") score += 5;
      if (["18-24", "25-29", "30-35", "36-49"].includes(a.age)) score += 10;
      if (a.passport === "yes") score += 5;

      return Math.max(0, Math.min(100, score));
    }

    case "settlement": {
      if (goal !== "permanent") return 0;

      score = 15;
      if (a.residence === "uk") score += 15;
      if (["valid", "work", "student"].includes(a.currentStatus)) score += 20;
      if (a.immigrationHistory === "none") score += 10;
      if (a.currentStatus === "abroad") score = 10;
      if (a.currentStatus === "expired") score -= 15;
      if (adverseHistory) score -= 10;

      return Math.max(0, Math.min(100, score));
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

export default function UKPage() {
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

  const visitConcern =
    answers.goal === "visit" &&
    answers.citizenship &&
    answers.vwpRestrictions &&
    answers.vwpRestrictions !== "none";

  return (
    <main className="min-h-screen bg-[#080d18] text-slate-100">
      <EsurpysNavigation />

      <section className="mx-auto max-w-6xl px-5 pb-12 pt-12">
        <div className="mb-10 rounded-3xl border border-blue-400/20 bg-gradient-to-br from-blue-950 via-slate-900 to-red-950 p-7 md:p-10">
          <div className="mb-4">
  <CountryFlag
    code="GB"
    name="United Kingdom"
    className="h-12 w-18 rounded-md ring-1 ring-white/10"
  />
</div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
            {t("Иммиграционный навигатор", "Immigration navigator")}
          </p>
          <h1 className="mb-4 text-3xl font-bold md:text-5xl">
            {t("Переезд в Великобританию", "Move to the United Kingdom")}
          </h1>
          <p className="max-w-3xl leading-7 text-slate-300">
            {t(
              "Ответьте на вопросы, чтобы увидеть предварительно подходящие визовые и иммиграционные маршруты Великобритании. Навигатор учитывает цель поездки, гражданство, образование, опыт, семейные связи и другие обстоятельства.",
              "Answer the questions to explore potentially relevant UK visa and immigration routes. The navigator considers travel purpose, nationality, education, experience, family relationships and other circumstances."
            )}
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-300">
            {[
              ["💼", "Работа", "Work"],
              ["🎓", "Учёба", "Study"],
              ["👨‍👩‍👧", "Семья", "Family"],
              ["🚀", "Бизнес", "Business"],
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
                  "Это предварительное сопоставление ваших ответов с общими характеристиками визовых категорий Великобритании. Процент не является официальным баллом, юридическим заключением или вероятностью одобрения.",
                  "This is a preliminary comparison of your answers with general UK visa category characteristics. The percentage is not an official score, legal opinion or probability of approval."
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

                        {route.id === "visitor" && (
                          <p className="mt-3 text-sm leading-6 text-amber-300">
                            {t(
                              "Перед поездкой обязательно проверьте, требуется ли вам Standard Visitor visa, электронное разрешение ETA или иной документ. Правила зависят от гражданства и могут меняться.",
                              "Before travelling, check whether you need a Standard Visitor visa, an Electronic Travel Authorisation (ETA) or another document. Requirements depend on nationality and can change."
                            )}
                          </p>
                        )}

                        {route.id === "globalTalent" && (
                          <p className="mt-3 text-sm leading-6 text-amber-300">
                            {t(
                              "Важно: профессиональные достижения сами по себе не гарантируют право на Global Talent. Нужно соответствовать официальным критериям и, как правило, получить одобрение.",
                              "Important: professional achievements alone do not guarantee eligibility for Global Talent. You must meet the official criteria and usually obtain an endorsement."
                            )}
                          </p>
                        )}

                        {route.id === "protection" && (
                          <p className="mt-3 text-sm leading-6 text-amber-300">
                            {t(
                              "Важно: это чувствительная юридическая процедура. Обратитесь к квалифицированному иммиграционному юристу или организации, оказывающей помощь беженцам.",
                              "Important: this is a sensitive legal process. Consult a qualified immigration lawyer or an organisation that assists refugees."
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

            {visitConcern && (
              <div className="mt-6 rounded-2xl border border-amber-300/20 bg-amber-300/5 p-4 text-sm leading-6 text-slate-300">
                <strong className="text-amber-200">
                  {t("Проверьте требования для въезда", "Check entry requirements")}
                </strong>
                <p className="mt-2">
                  {t(
                    "Ваш ответ указывает на обстоятельство, которое может повлиять на поездку. Проверьте официальные правила, в том числе требования к визе или ETA, и при необходимости получите индивидуальную юридическую консультацию.",
                    "Your answer indicates a circumstance that may affect your trip. Check the official rules, including visa or ETA requirements, and seek individual legal advice if necessary."
                  )}
                </p>
                <a
                  className="mt-3 inline-block font-semibold text-blue-300 hover:text-blue-200"
                  href="https://www.gov.uk/check-uk-visa"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("Проверить требования для въезда", "Check UK entry requirements")} ↗
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
                      "Отказ, нарушение условий пребывания или выдворение могут повлиять на будущую заявку, но последствия зависят от обстоятельств и действующих правил. Перед подачей заявления рассмотрите консультацию квалифицированного иммиграционного юриста.",
                      "A refusal, breach of conditions or removal may affect a future application, but the consequences depend on the circumstances and current rules. Consider qualified immigration advice before applying."
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
                    "Если ваше разрешение на пребывание в Великобритании истекло, последствия могут быть серьёзными. Не делайте выводов по анкете; обратитесь за индивидуальной юридической консультацией как можно скорее.",
                    "If your permission to stay in the UK has expired, consequences may be serious. Do not rely on this questionnaire; seek individual legal advice as soon as possible."
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
                  "Иммиграционные правила, визовые категории, сборы и сроки рассмотрения могут меняться. Перед подачей заявления проверяйте актуальную информацию на GOV.UK. Этот навигатор не является юридической консультацией, не проверяет автоматически все требования и не гарантирует результат.",
                  "Immigration rules, visa categories, fees and processing times can change. Check the latest information on GOV.UK before applying. This navigator is not legal advice, does not automatically verify every requirement and cannot guarantee an outcome."
                )}
              </p>
              <div className="mt-3 flex flex-wrap gap-4">
                <a
                  href="https://www.gov.uk/browse/visas-immigration"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-300 hover:text-blue-200"
                >
                  GOV.UK Visas & Immigration ↗
                </a>
                <a
                  href="https://www.gov.uk/check-uk-visa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-300 hover:text-blue-200"
                >
                  {t("Проверка визовых требований", "Check visa requirements")} ↗
                </a>
                <a
                  href="https://www.gov.uk/government/organisations/uk-visas-and-immigration"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-300 hover:text-blue-200"
                >
                  UK Visas and Immigration ↗
                </a>
              </div>
            </div>
          </section>
        </div>

        <footer className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-slate-500">
          {t("Иммиграционный навигатор Великобритании", "UK Immigration Navigator")} ·{" "}
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