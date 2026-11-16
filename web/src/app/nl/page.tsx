"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
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
  descriptionRu?: string;
  descriptionEn?: string;
  options: Option[];
};

type Route = {
  id: string;
  titleRu: string;
  titleEn: string;
  categoryRu: string;
  categoryEn: string;
  descriptionRu: string;
  descriptionEn: string;
  requirementsRu: string[];
  requirementsEn: string[];
  limitationsRu: string[];
  limitationsEn: string[];
  officialUrl: string;
};

const opt = (value: string, ru: string, en: string): Option => ({
  value,
  ru,
  en,
});

const questions: Question[] = [
  {
    id: "goal",
    ru: "Какова основная цель вашего переезда?",
    en: "What is your main reason for moving?",
    options: [
      opt("work", "Работа", "Work"),
      opt("study", "Учёба", "Study"),
      opt("family", "Воссоединение с семьёй или партнёром", "Family reunification or partner"),
      opt("business", "Бизнес или предпринимательство", "Business or entrepreneurship"),
      opt("orientation", "Поиск работы после окончания университета", "Find work after graduating"),
      opt("visit", "Туризм или краткосрочная поездка", "Tourism or short stay"),
      opt("settle", "Долгосрочное или постоянное проживание", "Long-term or permanent residence"),
      opt("protection", "Защита или убежище", "Protection or asylum"),
    ],
  },
  {
    id: "citizenship",
    ru: "Какое у вас гражданство?",
    en: "What is your citizenship?",
    descriptionRu: "Гражданство влияет на необходимость визы, разрешения на работу и другие условия.",
    descriptionEn: "Citizenship affects visa, work-permit and other requirements.",
    options: [
  opt("ru", "Россия", "Russia"),
  opt("ua", "Украина", "Ukraine"),
  opt("by", "Беларусь", "Belarus"),
  opt("kz", "Казахстан", "Kazakhstan"),
  opt("uz", "Узбекистан", "Uzbekistan"),
  opt("am", "Армения", "Armenia"),
  opt("ge", "Грузия", "Georgia"),
  opt("in", "Индия", "India"),
  opt("cn", "Китай", "China"),
  opt("ph", "Филиппины", "Philippines"),
  opt("br", "Бразилия", "Brazil"),
  opt("mx", "Мексика", "Mexico"),
  opt("au", "Австралия", "Australia"),
  opt("nz", "Новая Зеландия", "New Zealand"),
  opt("jp", "Япония", "Japan"),
  opt("kr", "Южная Корея", "South Korea"),
  opt("ca", "Канада", "Canada"),
  opt("us", "США", "United States"),
  opt("gb", "Великобритания", "United Kingdom"),
  opt("de", "Германия", "Germany"),
  opt("fr", "Франция", "France"),
  opt("other", "Другое гражданство", "Other citizenship"),
  opt("unknown", "Не уверен(а)", "Not sure"),
]

  },
  {
    id: "age",
    ru: "Сколько вам лет?",
    en: "How old are you?",
    options: [
      opt("under18", "Младше 18 лет", "Under 18"),
      opt("18-29", "18–29 лет", "18–29"),
      opt("30-34", "30–34 года", "30–34"),
      opt("35-44", "35–44 года", "35–44"),
      opt("45plus", "45 лет и старше", "45 or older"),
    ],
  },
  {
    id: "residence",
    ru: "Где вы сейчас проживаете?",
    en: "Where do you currently live?",
    options: [
      opt("eu", "В ЕС / ЕЭЗ / Швейцарии", "In the EU / EEA / Switzerland"),
      opt("netherlands", "Уже в Нидерландах", "Already in the Netherlands"),
      opt("outside", "За пределами ЕС", "Outside the EU"),
      opt("uk", "В Великобритании", "In the United Kingdom"),
    ],
  },
  {
    id: "education",
    ru: "Какое у вас образование?",
    en: "What is your highest level of education?",
    options: [
      opt("none", "Без высшего образования", "No higher education"),
      opt("bachelor", "Бакалавриат", "Bachelor's degree"),
      opt("master", "Магистратура", "Master's degree"),
      opt("phd", "Докторская степень / PhD", "Doctorate / PhD"),
      opt("vocational", "Профессиональное образование", "Vocational education"),
      opt("student", "Сейчас учусь в университете", "Currently studying at university"),
    ],
  },
  {
    id: "experience",
    ru: "Каков ваш профессиональный опыт?",
    en: "How much professional experience do you have?",
    options: [
      opt("none", "Пока нет опыта", "No experience yet"),
      opt("under2", "Менее 2 лет", "Less than 2 years"),
      opt("2-5", "2–5 лет", "2–5 years"),
      opt("5plus", "Более 5 лет", "More than 5 years"),
    ],
  },
  {
    id: "jobOffer",
    ru: "Есть ли у вас предложение о работе от работодателя в Нидерландах?",
    en: "Do you have a job offer from an employer in the Netherlands?",
    options: [
      opt("yes", "Да", "Yes"),
      opt("no", "Нет", "No"),
      opt("discussing", "Обсуждаю предложение", "In discussions"),
    ],
  },
  {
    id: "sponsor",
    ru: "Является ли работодатель признанным IND спонсором?",
    en: "Is the employer a recognised IND sponsor?",
    descriptionRu: "Это особенно важно для разрешения highly skilled migrant.",
    descriptionEn: "This is particularly important for the highly skilled migrant route.",
    options: [
      opt("yes", "Да", "Yes"),
      opt("no", "Нет", "No"),
      opt("unknown", "Не знаю", "I don't know"),
      opt("na", "Работодателя пока нет", "I don't have an employer yet"),
    ],
  },
  {
    id: "salary",
    ru: "Какова ваша предполагаемая месячная зарплата брутто?",
    en: "What is your expected gross monthly salary?",
    descriptionRu: "Укажите примерный диапазон. Пороговые суммы IND зависят от категории и могут меняться.",
    descriptionEn: "Choose an approximate range. IND salary thresholds vary by category and may change.",
    options: [
      opt("low", "Ниже €3 000", "Below €3,000"),
      opt("medium", "€3 000–€4 000", "€3,000–€4,000"),
      opt("high", "€4 000–€5 500", "€4,000–€5,500"),
      opt("veryhigh", "Более €5 500", "Above €5,500"),
      opt("unknown", "Пока неизвестно", "Not known yet"),
    ],
  },
  {
    id: "occupation",
    ru: "В какой области вы работаете или планируете работать?",
    en: "What is your occupation or intended field?",
    options: [
      opt("it", "IT и технологии", "IT and technology"),
      opt("engineering", "Инженерия и технические специальности", "Engineering and technical roles"),
      opt("health", "Медицина и здравоохранение", "Healthcare"),
      opt("science", "Наука и исследования", "Science and research"),
      opt("finance", "Финансы и бизнес", "Finance and business"),
      opt("education", "Образование", "Education"),
      opt("trade", "Торговля, логистика и другие профессии", "Trade, logistics and other occupations"),
      opt("creative", "Искусство и творческие профессии", "Arts and creative work"),
      opt("other", "Другая область", "Other"),
    ],
  },
  {
    id: "studyOffer",
    ru: "Есть ли у вас предложение о зачислении от учебного заведения в Нидерландах?",
    en: "Do you have an admission offer from an educational institution in the Netherlands?",
    options: [
      opt("yes", "Да", "Yes"),
      opt("no", "Нет", "No"),
      opt("applying", "Заявка рассматривается", "Application pending"),
    ],
  },
  {
    id: "studySponsor",
    ru: "Является ли учебное заведение признанным спонсором IND?",
    en: "Is the educational institution a recognised IND sponsor?",
    options: [
      opt("yes", "Да", "Yes"),
      opt("no", "Нет", "No"),
      opt("unknown", "Не знаю", "I don't know"),
    ],
  },
  {
    id: "funds",
    ru: "Можете ли вы подтвердить наличие средств на проживание?",
    en: "Can you demonstrate sufficient funds for living expenses?",
    options: [
      opt("yes", "Да, собственные средства", "Yes, my own funds"),
      opt("sponsor", "Да, есть финансовый спонсор", "Yes, I have a financial sponsor"),
      opt("partial", "Частично", "Partially"),
      opt("no", "Нет", "No"),
      opt("unknown", "Не знаю, какая сумма нужна", "I don't know the required amount"),
    ],
  },
  {
    id: "english",
    ru: "Какой у вас уровень английского языка?",
    en: "What is your English proficiency?",
    options: [
      opt("basic", "Начальный", "Basic"),
      opt("intermediate", "Средний", "Intermediate"),
      opt("good", "Выше среднего", "Upper-intermediate"),
      opt("fluent", "Свободный", "Fluent"),
      opt("na", "Не требуется для моей ситуации / не знаю", "Not required for my situation / unsure"),
    ],
  },
  {
    id: "dutch",
    ru: "Какой у вас уровень нидерландского языка?",
    en: "What is your Dutch proficiency?",
    options: [
      opt("none", "Не говорю", "None"),
      opt("basic", "Начальный", "Basic"),
      opt("intermediate", "Средний", "Intermediate"),
      opt("fluent", "Свободный", "Fluent"),
    ],
  },
  {
    id: "graduation",
    ru: "Получили ли вы недавно диплом подходящего университета?",
    en: "Have you recently graduated from an eligible university?",
    descriptionRu: "Для orientation year действуют специальные требования к университету, диплому и срокам.",
    descriptionEn: "The orientation year has specific university, qualification and timing requirements.",
    options: [
      opt("yes-nl", "Да, в Нидерландах", "Yes, in the Netherlands"),
      opt("yes-foreign", "Да, за рубежом", "Yes, abroad"),
      opt("no", "Нет", "No"),
      opt("current", "Ещё учусь", "Still studying"),
    ],
  },
  {
    id: "family",
    ru: "Есть ли у вас супруг, партнёр или близкий родственник в Нидерландах?",
    en: "Do you have a spouse, partner or close family member in the Netherlands?",
    options: [
      opt("dutch", "Гражданин Нидерландов", "Dutch citizen"),
      opt("eu", "Гражданин ЕС / ЕЭЗ", "EU / EEA citizen"),
      opt("resident", "Иностранец с действующим ВНЖ", "Foreign national with a valid residence permit"),
      opt("protection", "Человек со статусом защиты", "Person with protection status"),
      opt("none", "Нет", "No"),
    ],
  },
  {
    id: "relationship",
    ru: "Каков ваш статус отношений с человеком в Нидерландах?",
    en: "What is your relationship status with the person in the Netherlands?",
    options: [
      opt("married", "В браке", "Married"),
      opt("registered", "Зарегистрированное партнёрство", "Registered partnership"),
      opt("durable", "Длительные отношения, можем подтвердить", "Durable relationship we can demonstrate"),
      opt("child", "Я ребёнок или родитель", "I am a child or parent"),
      opt("other", "Другое / не применимо", "Other / not applicable"),
    ],
  },
  {
    id: "business",
    ru: "Какой у вас бизнес-план?",
    en: "What type of business plan do you have?",
    options: [
      opt("innovative", "Инновационный стартап", "Innovative startup"),
      opt("self-employed", "Работа на себя / собственный бизнес", "Self-employment / own business"),
      opt("existing", "Действующий бизнес, который хочу развивать", "Existing business I want to expand"),
      opt("none", "Пока нет бизнес-плана", "No business plan yet"),
    ],
  },
  {
    id: "talent",
    ru: "Есть ли у вас значимые научные, творческие или профессиональные достижения?",
    en: "Do you have significant scientific, creative or professional achievements?",
    options: [
      opt("yes", "Да, есть подтверждающие документы", "Yes, with supporting evidence"),
      opt("research", "Да, в области науки или исследований", "Yes, in science or research"),
      opt("potential", "Есть перспективы, но мало доказательств", "Potential, but limited evidence"),
      opt("no", "Нет", "No"),
    ],
  },
  {
    id: "passport",
    ru: "Есть ли у вас действующий паспорт или другой признанный документ для поездки?",
    en: "Do you have a valid passport or other recognised travel document?",
    options: [
      opt("yes", "Да", "Yes"),
      opt("no", "Нет", "No"),
      opt("renewing", "Оформляю или продлеваю", "Applying for or renewing it"),
    ],
  },
  {
    id: "visitDuration",
    ru: "На какой срок вы планируете приехать?",
    en: "How long do you plan to stay?",
    options: [
      opt("short", "До 90 дней", "Up to 90 days"),
      opt("long", "Более 90 дней", "More than 90 days"),
      opt("permanent", "На постоянной основе", "Permanently"),
    ],
  },
  {
    id: "immigrationHistory",
    ru: "Были ли у вас отказы в визах, нарушения миграционных правил или депортации?",
    en: "Have you had visa refusals, immigration violations or deportations?",
    options: [
      opt("none", "Нет", "No"),
      opt("refusal", "Был отказ в визе или ВНЖ", "A visa or residence permit was refused"),
      opt("overstay", "Было превышение разрешённого срока пребывания", "I overstayed"),
      opt("deportation", "Была депортация или запрет на въезд", "I was deported or banned from entry"),
      opt("unknown", "Не уверен(а), что считать нарушением", "I'm unsure what counts as a violation"),
    ],
  },
  {
    id: "status",
    ru: "Каков ваш текущий миграционный статус в Нидерландах?",
    en: "What is your current immigration status in the Netherlands?",
    options: [
      opt("outside", "Я за пределами Нидерландов", "I am outside the Netherlands"),
      opt("valid", "Есть действующий ВНЖ", "I have a valid residence permit"),
      opt("expired", "Срок действия разрешения истёк", "My permit has expired"),
      opt("eu-free", "Я гражданин ЕС / ЕЭЗ / Швейцарии", "I am an EU / EEA / Swiss citizen"),
      opt("temporary", "Временный статус или заявление рассматривается", "Temporary status or application pending"),
    ],
  },
  {
    id: "protection",
    ru: "Нуждаетесь ли вы в международной защите или хотите узнать об убежище?",
    en: "Do you need international protection or want to learn about asylum?",
    options: [
      opt("yes", "Да", "Yes"),
      opt("unsure", "Не уверен(а), хочу узнать варианты", "Unsure; I want to learn about options"),
      opt("no", "Нет", "No"),
    ],
  },
];

const ROUTES: Route[] = [
  {
    id: "hsm",
    titleRu: "Высококвалифицированный мигрант (Highly Skilled Migrant)",
    titleEn: "Highly Skilled Migrant",
    categoryRu: "Работа",
    categoryEn: "Work",
    descriptionRu: "Маршрут для специалистов, которых нанимает признанный спонсор IND и которые соответствуют действующим требованиям к зарплате.",
    descriptionEn: "A route for professionals hired by an IND-recognised sponsor who meet the applicable salary requirements.",
    requirementsRu: [
      "Предложение работы от работодателя, признанного спонсором IND.",
      "Зарплата должна соответствовать актуальному порогу для вашей категории.",
      "Трудовой договор и соблюдение прочих требований IND.",
    ],
    requirementsEn: [
      "A job offer from an employer recognised by the IND as a sponsor.",
      "Salary must meet the current threshold for your category.",
      "Employment contract and compliance with other IND requirements.",
    ],
    limitationsRu: [
      "Порог зарплаты зависит от возраста и применимых правил.",
      "Само наличие высокой зарплаты не гарантирует разрешение.",
    ],
    limitationsEn: [
      "The salary threshold depends on age and applicable rules.",
      "A high salary alone does not guarantee approval.",
    ],
    officialUrl: "https://ind.nl/en/residence-permits/work/highly-skilled-migrant",
  },
  {
    id: "bluecard",
    titleRu: "Голубая карта ЕС (EU Blue Card)",
    titleEn: "EU Blue Card",
    categoryRu: "Работа",
    categoryEn: "Work",
    descriptionRu: "Разрешение для квалифицированных специалистов, соответствующих требованиям к трудоустройству, квалификации и зарплате.",
    descriptionEn: "A residence route for qualified professionals who meet employment, qualification and salary requirements.",
    requirementsRu: [
      "Подходящий трудовой договор или обязательное предложение работы.",
      "Соответствующая квалификация или иной допустимый вариант подтверждения компетенций.",
      "Выполнение действующих требований к зарплате и документам.",
    ],
    requirementsEn: [
      "A qualifying employment contract or binding job offer.",
      "A suitable qualification or another permitted way to demonstrate competence.",
      "Compliance with current salary and documentation requirements.",
    ],
    limitationsRu: [
      "Условия отличаются от маршрута Highly Skilled Migrant.",
      "Проверьте текущие критерии и применимость к вашей ситуации.",
    ],
    limitationsEn: [
      "Requirements differ from the Highly Skilled Migrant route.",
      "Check current criteria and applicability to your situation.",
    ],
    officialUrl: "https://ind.nl/en/residence-permits/work/european-blue-card",
  },
  {
    id: "work",
    titleRu: "Работа по найму (GVVA / TWV)",
    titleEn: "Employment (GVVA / TWV)",
    categoryRu: "Работа",
    categoryEn: "Work",
    descriptionRu: "В зависимости от работы и срока пребывания может потребоваться единое разрешение на проживание и работу (GVVA) или разрешение на работу (TWV).",
    descriptionEn: "Depending on the job and length of stay, you may need a combined residence and work permit (GVVA) or a work permit (TWV).",
    requirementsRu: [
      "Работодатель и вакансия должны соответствовать применимым правилам.",
      "В некоторых случаях работодатель должен доказать, что не смог найти подходящего кандидата в ЕС.",
      "Могут потребоваться документы от работодателя и дополнительные разрешения.",
    ],
    requirementsEn: [
      "The employer and vacancy must meet the applicable rules.",
      "In some cases, the employer must show that a suitable candidate could not be found in the EU.",
      "Employer documentation and additional permits may be required.",
    ],
    limitationsRu: [
      "Правила зависят от вида работы, гражданства и срока пребывания.",
      "Предложение работы само по себе не означает право начать работать.",
    ],
    limitationsEn: [
      "Rules depend on the job, nationality and length of stay.",
      "A job offer alone does not mean you can start working.",
    ],
    officialUrl: "https://ind.nl/en/residence-permits/work",
  },
  {
    id: "orientation",
    titleRu: "Год ориентации для выпускников (Orientation Year)",
    titleEn: "Orientation Year",
    categoryRu: "Выпускники",
    categoryEn: "Graduates",
    descriptionRu: "Разрешение для определённых выпускников, позволяющее в установленный период искать работу или начинать профессиональную деятельность.",
    descriptionEn: "A permit for eligible graduates that allows them to look for work or begin professional activities during a defined period.",
    requirementsRu: [
      "Подходящая квалификация или диплом, отвечающий критериям IND.",
      "Соблюдение требований к университету, дате получения диплома и сроку подачи.",
      "Наличие действительного проездного документа и необходимых документов.",
    ],
    requirementsEn: [
      "An eligible qualification or degree meeting IND criteria.",
      "Compliance with university, graduation-date and application-deadline rules.",
      "A valid travel document and required supporting documents.",
    ],
    limitationsRu: [
      "Не каждый зарубежный университет или диплом подходит.",
      "Проверьте точные критерии для зарубежных выпускников.",
    ],
    limitationsEn: [
      "Not every foreign university or degree qualifies.",
      "Check the exact criteria for graduates from abroad.",
    ],
    officialUrl: "https://ind.nl/en/residence-permits/work/residence-permit-for-orientation-year",
  },
  {
    id: "student",
    titleRu: "ВНЖ для учёбы",
    titleEn: "Study Residence Permit",
    categoryRu: "Учёба",
    categoryEn: "Study",
    descriptionRu: "Маршрут для иностранных студентов, поступивших в подходящее учебное заведение, которое выступает спонсором IND.",
    descriptionEn: "A route for international students admitted to an eligible educational institution acting as an IND sponsor.",
    requirementsRu: [
      "Зачисление в учебное заведение, признанное спонсором IND для соответствующего типа обучения.",
      "Выполнение требований к финансированию и документам.",
      "Соблюдение условий обучения и действующих правил пребывания.",
    ],
    requirementsEn: [
      "Admission to an educational institution recognised by the IND for the relevant type of study.",
      "Meeting financial and documentation requirements.",
      "Compliance with study conditions and residence rules.",
    ],
    limitationsRu: [
      "Условия работы во время учёбы ограничены и зависят от ситуации.",
      "Разрешение может зависеть от продолжения обучения и успеваемости.",
    ],
    limitationsEn: [
      "Work during studies is restricted and depends on the circumstances.",
      "The permit may depend on continuing studies and academic progress.",
    ],
    officialUrl: "https://ind.nl/en/residence-permits/study",
  },
  {
    id: "family",
    titleRu: "Воссоединение семьи или проживание с партнёром",
    titleEn: "Family Reunification or Residence with a Partner",
    categoryRu: "Семья",
    categoryEn: "Family",
    descriptionRu: "Маршрут для определённых членов семьи или партнёров граждан Нидерландов и иностранных резидентов.",
    descriptionEn: "A route for eligible family members or partners of Dutch citizens and foreign residents.",
    requirementsRu: [
      "Подтверждение семейных отношений или отношений с партнёром.",
      "Выполнение применимых требований к спонсору и, когда требуется, доходу.",
      "Документы, легализация и другие условия в зависимости от категории.",
    ],
    requirementsEn: [
      "Evidence of the family relationship or partnership.",
      "Compliance with sponsor requirements and, where applicable, income rules.",
      "Documents, legalisation and other conditions depending on the category.",
    ],
    limitationsRu: [
      "Требования зависят от статуса спонсора и вида отношений.",
      "Для отдельных ситуаций действуют исключения и специальные правила.",
    ],
    limitationsEn: [
      "Requirements depend on the sponsor's status and the relationship category.",
      "Some situations have exceptions and special rules.",
    ],
    officialUrl: "https://ind.nl/en/residence-permits/family-and-partner",
  },
  {
    id: "startup",
    titleRu: "Стартап и предпринимательство",
    titleEn: "Startup and Self-Employment",
    categoryRu: "Бизнес",
    categoryEn: "Business",
    descriptionRu: "Варианты для предпринимателей могут включать стартап-маршрут с фасилитатором или разрешение для самозанятых при выполнении отдельных критериев.",
    descriptionEn: "Entrepreneur options may include the startup route with a facilitator or a self-employed permit subject to specific criteria.",
    requirementsRu: [
      "Для стартапа обычно требуется инновационная идея и сотрудничество с признанным фасилитатором.",
      "Для самозанятости могут оцениваться экономический интерес, бизнес-план и профессиональный опыт.",
      "Требования зависят от конкретного маршрута и гражданства.",
    ],
    requirementsEn: [
      "The startup route generally requires an innovative idea and cooperation with a recognised facilitator.",
      "Self-employment applications may be assessed on economic interest, business plan and professional experience.",
      "Requirements depend on the specific route and nationality.",
    ],
    limitationsRu: [
      "Обычного бизнес-плана может быть недостаточно.",
      "Наличие средств или зарегистрированной компании само по себе не гарантирует ВНЖ.",
    ],
    limitationsEn: [
      "A standard business plan may not be sufficient.",
      "Funds or company registration alone do not guarantee a residence permit.",
    ],
    officialUrl: "https://ind.nl/en/residence-permits/work",
  },
  {
    id: "visitor",
    titleRu: "Краткосрочное пребывание",
    titleEn: "Short Stay",
    categoryRu: "Поездка",
    categoryEn: "Travel",
    descriptionRu: "Для поездок продолжительностью до 90 дней в пределах соответствующего 180-дневного периода могут применяться правила краткосрочного пребывания Шенгенской зоны.",
    descriptionEn: "For visits of up to 90 days in the relevant 180-day period, Schengen short-stay rules may apply.",
    requirementsRu: [
      "Действительный проездной документ.",
      "При необходимости — шенгенская виза.",
      "Могут потребоваться подтверждения цели поездки, средств и места проживания.",
    ],
    requirementsEn: [
      "A valid travel document.",
      "A Schengen visa where required.",
      "Evidence of travel purpose, funds and accommodation may be required.",
    ],
    limitationsRu: [
      "Краткосрочное пребывание не предоставляет общего права на работу.",
      "Для пребывания более 90 дней обычно рассматривается другой маршрут.",
    ],
    limitationsEn: [
      "Short stay does not provide a general right to work.",
      "A different route is generally needed for stays longer than 90 days.",
    ],
    officialUrl: "https://www.netherlandsworldwide.nl/visa-the-netherlands/schengen-visa",
  },
  {
    id: "settlement",
    titleRu: "Постоянное проживание или долгосрочный статус",
    titleEn: "Permanent Residence or Long-Term Status",
    categoryRu: "Долгосрочное проживание",
    categoryEn: "Long-term residence",
    descriptionRu: "Возможность постоянного проживания или статуса долгосрочного резидента ЕС зависит от истории пребывания и выполнения установленных условий.",
    descriptionEn: "Permanent residence or EU long-term resident status depends on residence history and meeting specific conditions.",
    requirementsRu: [
      "Как правило, требуется определённый период законного проживания.",
      "Могут применяться требования к доходу, основному месту жительства и интеграции.",
      "Условия зависят от типа разрешения и индивидуальной истории.",
    ],
    requirementsEn: [
      "A qualifying period of lawful residence is generally required.",
      "Income, main-residence and civic integration requirements may apply.",
      "Conditions depend on the permit type and individual history.",
    ],
    limitationsRu: [
      "Не все виды ВНЖ одинаково учитываются при расчёте периода проживания.",
      "Пять лет пребывания не означают автоматического получения постоянного статуса.",
    ],
    limitationsEn: [
      "Not all residence permits count in the same way towards the residence period.",
      "Five years of residence do not automatically guarantee permanent status.",
    ],
    officialUrl: "https://ind.nl/en/residence-permits/permanent-residence",
  },
  {
    id: "protection",
    titleRu: "Международная защита и убежище",
    titleEn: "International Protection and Asylum",
    categoryRu: "Защита",
    categoryEn: "Protection",
    descriptionRu: "Процедуры международной защиты оцениваются индивидуально компетентными органами. Этот инструмент не может определить право на убежище.",
    descriptionEn: "International protection procedures are assessed individually by the competent authorities. This tool cannot determine asylum eligibility.",
    requirementsRu: [
      "Обстоятельства оцениваются в рамках официальной процедуры.",
      "Могут потребоваться документы и подробное изложение обстоятельств.",
      "Для консультации можно обратиться к специализированной юридической или правозащитной организации.",
    ],
    requirementsEn: [
      "Circumstances are assessed through the official procedure.",
      "Documents and a detailed account of circumstances may be required.",
      "Specialist legal or refugee-support organisations may be able to advise.",
    ],
    limitationsRu: [
      "Баллы этого инструмента не оценивают обоснованность заявления.",
      "Если вы в опасности, обратитесь за срочной помощью к компетентным службам.",
    ],
    limitationsEn: [
      "This tool's score does not assess the merits of an application.",
      "If you are in danger, seek urgent help from the relevant services.",
    ],
    officialUrl: "https://ind.nl/en/asylum",
  },
];

function isAnswered(value: string | undefined) {
  return value !== undefined && value !== "";
}

function getRouteScore(id: string, a: Answers): number {
  const goal = a.goal;
  const hasJob = a.jobOffer === "yes";
  const hasSponsor = a.sponsor === "yes";
  const hasFunds = ["yes", "sponsor"].includes(a.funds);
  const hasStudyOffer = a.studyOffer === "yes";
  const recognisedStudySponsor = a.studySponsor === "yes";
  const familySponsor = ["dutch", "eu", "resident", "protection"].includes(a.family);
  const eligibleSalary = ["high", "veryhigh"].includes(a.salary);
  let score = 0;

  switch (id) {
    case "hsm":
      if (goal !== "work" && goal !== "settle") return 0;
      score = 10;
      if (hasJob) score += 25;
      if (hasSponsor) score += 30;
      if (eligibleSalary) score += 20;
      if (["it", "engineering", "science", "finance", "health"].includes(a.occupation)) score += 5;
      if (["master", "phd"].includes(a.education)) score += 5;
      if (a.jobOffer === "no") score -= 20;
      if (a.sponsor === "no") score -= 15;
      return Math.max(0, Math.min(score, 95));

    case "bluecard":
      if (goal !== "work" && goal !== "settle") return 0;
      score = 10;
      if (hasJob) score += 25;
      if (eligibleSalary) score += 20;
      if (["bachelor", "master", "phd"].includes(a.education)) score += 20;
      if (["2-5", "5plus"].includes(a.experience)) score += 10;
      if (a.jobOffer === "no") score -= 15;
      return Math.max(0, Math.min(score, 85));

    case "work":
      if (goal !== "work") return 0;
      score = 15;
      if (hasJob) score += 25;
      if (a.jobOffer === "discussing") score += 10;
      if (["2-5", "5plus"].includes(a.experience)) score += 10;
      if (["it", "engineering", "health", "trade", "finance"].includes(a.occupation)) score += 5;
      if (a.jobOffer === "no") score -= 10;
      return Math.max(0, Math.min(score, 75));

    case "orientation":
      if (goal !== "orientation" && goal !== "work") return 0;
      score = 10;
      if (a.graduation === "yes-nl") score += 55;
      if (a.graduation === "yes-foreign") score += 35;
      if (a.graduation === "current") score += 5;
      if (a.education === "master" || a.education === "phd") score += 10;
      if (a.graduation === "no") score = 0;
      return Math.max(0, Math.min(score, 85));

    case "student":
      if (goal !== "study") return 0;
      score = 15;
      if (hasStudyOffer) score += 30;
      if (recognisedStudySponsor) score += 25;
      if (hasFunds) score += 15;
      if (["good", "fluent"].includes(a.english)) score += 5;
      if (a.studyOffer === "no") score -= 10;
      if (a.studySponsor === "no") score -= 20;
      return Math.max(0, Math.min(score, 95));

    case "family":
      if (goal !== "family" && goal !== "settle") return 0;
      score = 10;
      if (familySponsor) score += 30;
      if (["married", "registered", "durable"].includes(a.relationship)) score += 20;
      if (hasFunds) score += 10;
      if (a.family === "none") score = 0;
      return Math.max(0, Math.min(score, 80));

    case "startup":
      if (goal !== "business" && goal !== "work") return 0;
      score = 10;
      if (a.business === "innovative") score += 40;
      if (a.business === "self-employed") score += 20;
      if (a.business === "existing") score += 20;
      if (hasFunds) score += 10;
      if (["master", "phd"].includes(a.education)) score += 5;
      if (a.business === "none") score = 0;
      return Math.min(score, 85);

    case "visitor":
      if (goal !== "visit") return 0;
      if (a.visitDuration !== "short") return 0;
      score = 40;
      if (a.passport === "yes") score += 20;
      if (hasFunds) score += 20;
      if (["eu", "uk", "us", "ca", "au", "nz", "jp", "kr"].includes(a.citizenship)) score += 10;
      if (a.passport === "no") score -= 25;
      return Math.max(0, Math.min(score, 90));

    case "settlement":
      if (goal !== "settle") return 0;
      score = 10;
      if (a.status === "valid") score += 20;
      if (a.status === "eu-free") score += 15;
      if (a.status === "temporary") score += 5;
      if (a.status === "expired") score -= 15;
      if (a.residence === "netherlands") score += 10;
      if (a.family === "dutch") score += 5;
      return Math.max(0, Math.min(score, 65));

    case "protection":
      if (goal !== "protection" && a.protection !== "yes" && a.protection !== "unsure") return 0;
      if (a.protection === "yes") return 75;
      if (a.protection === "unsure" || goal === "protection") return 45;
      return 0;

    default:
      return 0;
  }
}

function getRouteWarning(id: string, a: Answers, isEnglish: boolean): string | null {
  const warning = (ru: string, en: string) => (isEnglish ? en : ru);

  if (id === "hsm" && (!a.jobOffer || a.jobOffer !== "yes" || a.sponsor !== "yes")) {
    return warning(
      "Обычно необходим работодатель, признанный спонсором IND, и зарплата не ниже действующего порога. Проверьте требования для вашей категории.",
      "A recognised IND sponsor and salary meeting the applicable threshold are generally required. Check the rules for your category.",
    );
  }
  if (id === "bluecard") {
    return warning(
      "Для EU Blue Card действуют отдельные критерии к квалификации, договору и зарплате. Сверьте текущие требования IND.",
      "The EU Blue Card has specific qualification, contract and salary criteria. Check the current IND requirements.",
    );
  }
  if (id === "work" && a.jobOffer !== "yes") {
    return warning(
      "Без конкретного работодателя определить подходящий вариант сложно. Для некоторых категорий работодателю требуется разрешение на работу.",
      "Without a specific employer, the appropriate route is difficult to determine. Some categories require the employer to obtain a work permit.",
    );
  }
  if (id === "orientation") {
    return warning(
      "Право на orientation year зависит от конкретного диплома, учебного заведения и срока подачи. Не каждый зарубежный диплом подходит.",
      "Eligibility for the orientation year depends on the degree, institution and application timing. Not every foreign degree qualifies.",
    );
  }
  if (id === "student" && (!a.studyOffer || a.studyOffer !== "yes" || a.studySponsor !== "yes")) {
    return warning(
      "Обычно требуется зачисление в учебное заведение, признанное спонсором IND, и подтверждение необходимых средств.",
      "Admission to an IND-recognised educational sponsor and evidence of sufficient funds are generally required.",
    );
  }
  if (id === "family") {
    return warning(
      "Условия зависят от статуса спонсора, характера отношений, дохода и применимых правил. Проверьте требования именно для вашей ситуации.",
      "Requirements depend on the sponsor's status, relationship, income and applicable rules. Check the requirements for your situation.",
    );
  }
  if (id === "startup") {
    return warning(
      "Стартап и самозанятость — разные маршруты с разными критериями. Инновационность, фасилитатор или экономическая ценность могут иметь значение.",
      "Startup and self-employment are different routes with different criteria. Innovation, a facilitator or economic value may matter.",
    );
  }
  if (id === "visitor") {
    return warning(
      "Необходимость шенгенской визы зависит от гражданства. Краткосрочное пребывание обычно ограничено 90 днями в соответствующем 180-дневном периоде.",
      "Whether you need a Schengen visa depends on nationality. Short stays are generally limited to 90 days in the relevant 180-day period.",
    );
  }
  if (id === "settlement") {
    return warning(
      "Постоянное проживание не предоставляется автоматически. Проверьте необходимый период законного проживания, интеграцию и требования к доходу.",
      "Permanent residence is not automatic. Check the required lawful residence period, integration and income requirements.",
    );
  }
  if (id === "protection") {
    return warning(
      "Этот инструмент не оценивает право на убежище и не заменяет юридическую консультацию. Обратитесь к IND или квалифицированной организации.",
      "This tool does not assess asylum eligibility or replace legal advice. Contact the IND or a qualified organisation.",
    );
  }
  return null;
}

export default function NetherlandsPage() {
  const languageContext = useLanguage() as {
    lang?: string;
    language?: string;
  };

  const lang = languageContext?.lang ?? languageContext?.language ?? "ru";
  const isEnglish = lang.toLowerCase().startsWith("en");

  const [answers, setAnswers] = useState<Answers>({});
  const [showAll, setShowAll] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const t = {
    title: isEnglish ? "Netherlands Immigration Navigator" : "Навигатор иммиграции в Нидерланды",
    subtitle: isEnglish
      ? "Explore possible residence routes based on your goals, education, work, family and circumstances."
      : "Изучите возможные варианты проживания с учётом ваших целей, образования, работы, семьи и обстоятельств.",
    reset: isEnglish ? "Reset answers" : "Сбросить ответы",
    progress: isEnglish ? "Progress" : "Прогресс",
    of: isEnglish ? "of" : "из",
    questions: isEnglish ? "questions" : "вопросов",
    allQuestions: isEnglish ? "Your situation" : "Ваша ситуация",
    answered: isEnglish ? "Answered" : "Отвечено",
    notAnswered: isEnglish ? "Not answered" : "Не отвечено",
    choose: isEnglish ? "Choose an answer" : "Выберите ответ",
    showResults: isEnglish ? "Find possible routes" : "Подобрать возможные маршруты",
    results: isEnglish ? "Possible routes" : "Возможные маршруты",
    resultsDescription: isEnglish
      ? "Routes are ranked by how closely your answers match a simplified set of indicators."
      : "Маршруты отсортированы по соответствию ваших ответов упрощённому набору критериев.",
    scoreDisclaimer: isEnglish
      ? "Scores are navigation indicators, not approval probabilities or legal eligibility decisions."
      : "Баллы — ориентир для навигации, а не вероятность одобрения или юридическое решение о соответствии требованиям.",
    noResults: isEnglish ? "No matching route yet" : "Пока нет подходящих результатов",
    noResultsDescription: isEnglish
      ? "Try reviewing your goal and answers. Some routes require an offer, sponsor or other specific conditions."
      : "Попробуйте проверить цель и ответы. Для некоторых маршрутов необходимы предложение, спонсор или другие конкретные условия.",
    top: isEnglish ? "Closest match" : "Наиболее подходящий вариант",
    requirements: isEnglish ? "Requirements and limitations" : "Требования и ограничения",
    limitations: isEnglish ? "Important limitations" : "Важные ограничения",
    official: isEnglish ? "Official information" : "Официальная информация",
    showAll: isEnglish ? "Show all results" : "Показать все результаты",
    showFewer: isEnglish ? "Show fewer" : "Свернуть список",
    noticeTitle: isEnglish ? "Important notice" : "Важная информация",
    noticeText: isEnglish
      ? "Immigration rules, salary thresholds and procedures can change. Verify your situation with the Dutch Immigration and Naturalisation Service (IND) before applying."
      : "Иммиграционные правила, пороги зарплаты и процедуры могут меняться. Перед подачей проверьте свою ситуацию в Службе иммиграции и натурализации Нидерландов (IND).",
    rulesLink: isEnglish ? "Visit the IND website" : "Перейти на сайт IND",
    passportTitle: isEnglish ? "Short-stay entry requirements" : "Требования для краткосрочного въезда",
    passportText: isEnglish
      ? "Visa requirements depend on your nationality and travel purpose. Confirm the current Schengen rules before travelling."
      : "Необходимость визы зависит от гражданства и цели поездки. Перед поездкой проверьте действующие правила Шенгенской зоны.",
    historyTitle: isEnglish ? "Previous immigration issues" : "Предыдущие миграционные проблемы",
    historyText: isEnglish
      ? "A previous refusal, overstay or entry ban may affect an application. Provide accurate information and seek qualified advice if needed."
      : "Предыдущий отказ, превышение срока пребывания или запрет на въезд могут повлиять на заявление. Указывайте достоверные сведения и при необходимости получите профессиональную консультацию.",
    expiredTitle: isEnglish ? "Residence status needs attention" : "Требуется проверить статус пребывания",
    expiredText: isEnglish
      ? "If your residence permit has expired, promptly check the official rules and seek qualified advice about your circumstances."
      : "Если срок действия ВНЖ истёк, своевременно проверьте официальные правила и получите квалифицированную консультацию по вашей ситуации.",
    protectionTitle: isEnglish ? "International protection" : "Международная защита",
    protectionText: isEnglish
      ? "Asylum is a separate legal procedure and cannot be assessed by this questionnaire. Consult official information and qualified support."
      : "Убежище — отдельная юридическая процедура, которую нельзя оценить с помощью этой анкеты. Изучите официальную информацию и обратитесь за квалифицированной помощью.",
    generalDisclaimer: isEnglish
      ? "This tool provides general navigation and is not immigration or legal advice. Scores do not represent the probability of approval or determine eligibility. Check current rules with the IND and other competent Dutch authorities."
      : "Этот инструмент предназначен для общей навигации и не является иммиграционной или юридической консультацией. Баллы не показывают вероятность одобрения и не определяют право на получение разрешения. Проверяйте актуальные правила в IND и других компетентных органах Нидерландов.",
    footer: isEnglish ? "Back to World Navigator" : "Назад к навигатору мира",
  };

  const answered = useMemo(
    () => questions.filter((question) => isAnswered(answers[question.id])).length,
    [answers],
  );

  const progress = Math.round((answered / questions.length) * 100);

  const results = useMemo(
    () =>
      ROUTES.map((route) => ({
        ...route,
        score: getRouteScore(route.id, answers),
      }))
        .filter((route) => route.score > 0)
        .sort((a, b) => b.score - a.score),
    [answers],
  );

  const visibleResults = showAll ? results : results.slice(0, 8);

  const hasImmigrationHistory =
    Boolean(answers.immigrationHistory) &&
    !["none", "unknown"].includes(answers.immigrationHistory);

  const hasExpiredStatus = answers.status === "expired";
  const protectionRelevant =
    answers.goal === "protection" ||
    answers.protection === "yes" ||
    answers.protection === "unsure";
  const visitRelevant = answers.goal === "visit";

  function updateAnswer(questionId: string, value: string) {
    setAnswers((current) => ({ ...current, [questionId]: value }));
  }

  function resetAnswers() {
    setAnswers({});
    setShowAll(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function getOptionLabel(question: Question, value: string) {
    const option = question.options.find((item) => item.value === value);
    return option ? (isEnglish ? option.en : option.ru) : value;
  }

  function showResultsAndScroll() {
    setShowAll(false);
    window.setTimeout(() => {
      resultsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  }

  return (
    <main className="min-h-screen bg-[#07111f] text-slate-100">
      <EsurpysNavigation />

      <div className="mx-auto w-full max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <header className="mb-8 rounded-3xl border border-white/10 bg-gradient-to-br from-[#10223a] via-[#0b192b] to-[#091322] p-6 shadow-2xl shadow-black/20 sm:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div className="max-w-3xl">
              <div className="mb-4 flex items-center gap-3">
                <CountryFlag
                  code="NL"
                  name="Netherlands"
                  className="h-12 w-18 rounded-md ring-1 ring-white/10"
                />
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {t.title}
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                {t.subtitle}
              </p>
            </div>

            <button
              type="button"
              onClick={resetAnswers}
              className="inline-flex shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-white/30 hover:bg-white/10"
            >
              {t.reset}
            </button>
          </div>

          <div className="mt-8">
            <div className="mb-2 flex items-center justify-between gap-3 text-xs text-slate-400">
              <span>
                {t.progress}: {answered} {t.of} {questions.length} {t.questions}
              </span>
              <span>{progress}%</span>
            </div>

            <div
              className="h-2 overflow-hidden rounded-full bg-slate-700/70"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${t.progress}: ${progress}%`}
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-300 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)]">
          <section className="min-w-0">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-white">{t.allQuestions}</h2>
              <p className="mt-1 text-sm text-slate-400">
                {isEnglish
                  ? "Choose the answers that best describe your situation."
                  : "Выберите ответы, которые лучше всего описывают вашу ситуацию."}
              </p>
            </div>

            <div className="space-y-4">
              {questions.map((question, index) => {
                const value = answers[question.id] ?? "";

                return (
                  <fieldset
                    key={question.id}
                    className="rounded-2xl border border-white/10 bg-[#0b1929] p-5 transition hover:border-white/15 sm:p-6"
                  >
                    <legend className="sr-only">
                      {isEnglish ? question.en : question.ru}
                    </legend>

                    <div className="mb-4 flex items-start gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-blue-300/20 bg-blue-400/10 text-sm font-semibold text-blue-200">
                        {index + 1}
                      </span>

                      <div className="min-w-0 flex-1">
                        <h3 className="text-base font-semibold leading-6 text-white">
                          {isEnglish ? question.en : question.ru}
                        </h3>

                        {(question.descriptionRu || question.descriptionEn) && (
                          <p className="mt-2 text-sm leading-6 text-slate-400">
                            {isEnglish
                              ? question.descriptionEn ?? question.descriptionRu
                              : question.descriptionRu}
                          </p>
                        )}
                      </div>

                      <span
                        className={`hidden shrink-0 rounded-full px-2.5 py-1 text-xs sm:inline-flex ${
                          value
                            ? "bg-emerald-400/10 text-emerald-300"
                            : "bg-white/5 text-slate-500"
                        }`}
                      >
                        {value ? t.answered : t.notAnswered}
                      </span>
                    </div>

                    <div className="relative mt-4">
                      <details className="group">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm transition hover:border-blue-300/30 hover:bg-white/[0.05]">
                          <span className={value ? "text-white" : "text-slate-400"}>
                            {value ? getOptionLabel(question, value) : t.choose}
                          </span>
                          <span className="text-slate-400 transition group-open:rotate-180">
                            ▾
                          </span>
                        </summary>

                        <div className="absolute left-0 right-0 top-full z-30 mt-2 max-h-64 overflow-y-auto rounded-xl border border-white/10 bg-[#0b1929] p-2 shadow-xl">
                          {question.options.map((option) => {
                            const selected = value === option.value;

                            return (
                              <label
                                key={option.value}
                                className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-3 text-sm transition ${
                                  selected
                                    ? "bg-blue-400/10 text-white"
                                    : "text-slate-300 hover:bg-white/[0.05]"
                                }`}
                              >
                                <input
                                  type="radio"
                                  name={question.id}
                                  value={option.value}
                                  checked={selected}
                                  onChange={(event) => {
                                    updateAnswer(question.id, option.value);
                                    const details = event.currentTarget.closest("details");
                                    if (details) details.open = false;
                                  }}
                                  className="h-4 w-4 shrink-0 accent-blue-400"
                                />
                                <span>{isEnglish ? option.en : option.ru}</span>
                                {selected && (
                                  <span className="ml-auto text-blue-300">✓</span>
                                )}
                              </label>
                            );
                          })}
                        </div>
                      </details>
                    </div>
                  </fieldset>
                );
              })}
            </div>

            <button
              type="button"
              onClick={showResultsAndScroll}
              className="mt-6 w-full rounded-xl bg-blue-500 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-950/30 transition hover:bg-blue-400"
            >
              {t.showResults}
            </button>
          </section>

          <aside className="min-w-0 lg:sticky lg:top-6 lg:self-start">
            <div
              ref={resultsRef}
              className="scroll-mt-6 rounded-2xl border border-white/10 bg-[#0b1929] p-5 sm:p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-white">{t.results}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {t.resultsDescription}
                  </p>
                </div>

                <span className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-sm font-semibold text-slate-300">
                  {results.length}
                </span>
              </div>

              <p className="mt-4 rounded-xl border border-amber-300/20 bg-amber-300/5 p-3 text-xs leading-5 text-amber-100/80">
                {t.scoreDisclaimer}
              </p>

              {results.length === 0 ? (
                <div className="mt-5 rounded-xl border border-dashed border-white/15 p-5">
                  <h3 className="font-semibold text-slate-200">{t.noResults}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {t.noResultsDescription}
                  </p>
                </div>
              ) : (
                <div className="mt-5 space-y-4">
                  {visibleResults.map((route, index) => {
                    const warning = getRouteWarning(route.id, answers, isEnglish);

                    return (
                      <article
                        key={route.id}
                        className="rounded-xl border border-white/10 bg-[#081421] p-4 transition hover:border-blue-300/25"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="mb-2 flex flex-wrap items-center gap-2">
                              <span className="rounded-md bg-blue-400/10 px-2 py-1 text-[11px] font-medium text-blue-200">
                                {isEnglish ? route.categoryEn : route.categoryRu}
                              </span>

                              {index === 0 && (
                                <span className="rounded-md bg-emerald-400/10 px-2 py-1 text-[11px] font-medium text-emerald-200">
                                  {t.top}
                                </span>
                              )}
                            </div>

                            <h3 className="font-semibold leading-6 text-white">
                              {isEnglish ? route.titleEn : route.titleRu}
                            </h3>
                          </div>

                          <div className="shrink-0 text-right">
                            <div className="text-xl font-bold tabular-nums text-blue-200">
                              {route.score}
                            </div>
                            <div className="text-[10px] text-slate-500">/100</div>
                          </div>
                        </div>

                        <p className="mt-3 text-sm leading-6 text-slate-400">
                          {isEnglish ? route.descriptionEn : route.descriptionRu}
                        </p>

                        {warning && (
                          <p className="mt-3 rounded-lg border border-amber-300/20 bg-amber-300/5 p-3 text-xs leading-5 text-amber-100/80">
                            {warning}
                          </p>
                        )}

                        <details className="group mt-4">
                          <summary className="cursor-pointer list-none text-sm font-medium text-blue-200 marker:hidden">
                            <span className="inline-flex items-center gap-2">
                              {t.requirements}
                              <span className="text-slate-500 transition group-open:rotate-180">
                                ▾
                              </span>
                            </span>
                          </summary>

                          <ul className="mt-3 space-y-2 pl-4 text-sm leading-6 text-slate-300">
                            {(isEnglish ? route.requirementsEn : route.requirementsRu).map(
                              (requirement) => (
                                <li key={requirement} className="list-disc">
                                  {requirement}
                                </li>
                              ),
                            )}
                          </ul>

                          <h4 className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                            {t.limitations}
                          </h4>

                          <ul className="mt-2 space-y-2 pl-4 text-sm leading-6 text-slate-400">
                            {(isEnglish ? route.limitationsEn : route.limitationsRu).map(
                              (limitation) => (
                                <li key={limitation} className="list-disc">
                                  {limitation}
                                </li>
                              ),
                            )}
                          </ul>
                        </details>

                        <a
                          href={route.officialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-blue-300 transition hover:text-blue-200"
                        >
                          {t.official}
                          <span aria-hidden="true">↗</span>
                        </a>
                      </article>
                    );
                  })}

                  {results.length > 8 && (
                    <button
                      type="button"
                      onClick={() => setShowAll((current) => !current)}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/[0.06]"
                    >
                      {showAll ? t.showFewer : `${t.showAll} (${results.length})`}
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="mt-4 space-y-4">
              <section className="rounded-2xl border border-amber-300/20 bg-amber-300/[0.04] p-5">
                <h3 className="font-semibold text-amber-100">{t.noticeTitle}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{t.noticeText}</p>
                <a
                  href="https://ind.nl/en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-amber-200 hover:text-amber-100"
                >
                  {t.rulesLink}
                  <span aria-hidden="true">↗</span>
                </a>
              </section>

              {visitRelevant && (
                <section className="rounded-2xl border border-blue-300/20 bg-blue-300/[0.04] p-5">
                  <h3 className="font-semibold text-blue-100">{t.passportTitle}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{t.passportText}</p>
                  <a
                    href="https://www.netherlandsworldwide.nl/visa-the-netherlands"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-blue-200 hover:text-blue-100"
                  >
                    {isEnglish
                      ? "Check official visa information"
                      : "Проверить официальную информацию о визах"}
                    <span aria-hidden="true">↗</span>
                  </a>
                </section>
              )}

              {hasImmigrationHistory && (
                <section className="rounded-2xl border border-orange-300/20 bg-orange-300/[0.04] p-5">
                  <h3 className="font-semibold text-orange-100">{t.historyTitle}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{t.historyText}</p>
                  <a
                    href="https://ind.nl/en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-orange-200 hover:text-orange-100"
                  >
                    {isEnglish ? "Official IND information" : "Официальная информация IND"}
                    <span aria-hidden="true">↗</span>
                  </a>
                </section>
              )}

              {hasExpiredStatus && (
                <section className="rounded-2xl border border-red-300/20 bg-red-300/[0.04] p-5">
                  <h3 className="font-semibold text-red-100">{t.expiredTitle}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{t.expiredText}</p>
                  <a
                    href="https://ind.nl/en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-red-200 hover:text-red-100"
                  >
                    {isEnglish ? "Check official status information" : "Проверить официальный статус"}
                    <span aria-hidden="true">↗</span>
                  </a>
                </section>
              )}

              {protectionRelevant && (
                <section className="rounded-2xl border border-purple-300/20 bg-purple-300/[0.04] p-5">
                  <h3 className="font-semibold text-purple-100">{t.protectionTitle}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{t.protectionText}</p>
                  <a
                    href="https://ind.nl/en/asylum"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-purple-200 hover:text-purple-100"
                  >
                    {isEnglish ? "Official asylum information" : "Официальная информация об убежище"}
                    <span aria-hidden="true">↗</span>
                  </a>
                </section>
              )}

              {answered > 0 && (
                <section className="rounded-2xl border border-white/10 bg-[#0b1929] p-5">
                  <h3 className="font-semibold text-white">
                    {isEnglish ? "Your answers" : "Ваши ответы"}
                  </h3>

                  <div className="mt-4 space-y-3">
                    {questions
                      .filter((question) => isAnswered(answers[question.id]))
                      .map((question) => (
                        <div
                          key={question.id}
                          className="border-b border-white/[0.06] pb-3 last:border-0 last:pb-0"
                        >
                          <p className="text-xs leading-5 text-slate-500">
                            {isEnglish ? question.en : question.ru}
                          </p>
                          <p className="mt-1 text-sm leading-5 text-slate-300">
                            {getOptionLabel(question, answers[question.id])}
                          </p>
                        </div>
                      ))}
                  </div>
                </section>
              )}
            </div>
          </aside>
        </div>

        <footer className="mt-10 border-t border-white/10 pt-6">
          <p className="text-xs leading-6 text-slate-500">{t.generalDisclaimer}</p>

          <Link
            href="/world-navigator"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-blue-300 transition hover:text-blue-200"
          >
            <span aria-hidden="true">←</span>
            {t.footer}
          </Link>
        </footer>
      </div>
    </main>
  );
}