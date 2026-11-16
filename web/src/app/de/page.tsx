"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import EsurpysNavigation from "@/shared/EsurpysNavigation";
import { useLanguage } from "@/shared/LanguageProvider";
import CountryFlag from "@/components/CountryFlag";

type Answers = Record<string, string>;

type Option = {
  value: string;
  label: string;
  en?: string;
};

type Question = {
  id: string;
  title: string;
  en: string;
  description?: string;
  descriptionEn?: string;
  options: Option[];
};

type Route = {
  id: string;
  title: string;
  titleEn: string;
  category: string;
  categoryEn: string;
  description: string;
  descriptionEn: string;
  requirements: string[];
  requirementsEn: string[];
  limitations: string[];
  limitationsEn: string[];
  officialUrl: string;
  score: number;
};

const opt = (value: string, label: string, en: string): Option => ({
  value,
  label,
  en,
});

const citizenshipOptions: Option[] = [
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
];

const questions: Question[] = [
  {
    id: "goal",
    title: "Какова ваша главная цель в Германии?",
    en: "What is your main goal in Germany?",
    description: "Выберите основную цель предполагаемого пребывания.",
    descriptionEn: "Select the main purpose of your intended stay.",
    options: [
      opt("work", "Работа по найму", "Employment"),
      opt("bluecard", "EU Blue Card для квалифицированного специалиста", "EU Blue Card for highly qualified employment"),
      opt("jobsearch", "Поиск работы без предложения работодателя", "Job search without a job offer"),
      opt("study", "Учёба в университете", "University studies"),
      opt("ausbildung", "Профессиональное обучение Ausbildung", "Vocational training (Ausbildung)"),
      opt("family", "Воссоединение семьи", "Family reunification"),
      opt("business", "Собственный бизнес или фриланс", "Self-employment or freelancing"),
      opt("visit", "Туризм или краткосрочный визит", "Tourism or short visit"),
      opt("permanent", "Постоянное проживание", "Permanent residence"),
      opt("citizenship", "Получение немецкого гражданства", "German citizenship"),
      opt("protection", "Убежище или гуманитарная защита", "Asylum or humanitarian protection"),
      opt("recognition", "Признание квалификации", "Recognition of qualifications"),
      opt("unsure", "Пока не определился", "Not sure yet"),
    ],
  },
  {
    id: "citizenship",
    title: "Какое у вас гражданство?",
    en: "What is your citizenship?",
    description: "Граждане ЕС/ЕЭЗ и Швейцарии пользуются другими правилами передвижения и проживания.",
    descriptionEn: "EU/EEA and Swiss citizens benefit from different residence and mobility rules.",
    options: citizenshipOptions,
  },
  {
    id: "age",
    title: "Сколько вам лет?",
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
    title: "Где вы сейчас проживаете?",
    en: "Where do you currently live?",
    options: [
      opt("outside", "За пределами Германии", "Outside Germany"),
      opt("germany", "В Германии на законных основаниях", "In Germany with lawful status"),
      opt("eu", "В другой стране ЕС/ЕЭЗ или Швейцарии", "In another EU/EEA country or Switzerland"),
      opt("uncertain", "Статус проживания неясен", "Residence status is uncertain"),
    ],
  },
  {
    id: "german",
    title: "Какой у вас уровень немецкого языка?",
    en: "What is your German language level?",
    description: "Требуемый уровень зависит от визового маршрута, профессии и программы.",
    descriptionEn: "The required level depends on the immigration route, profession and programme.",
    options: [
      opt("none", "Нет подтверждённого уровня", "No certified level"),
      opt("a1", "A1 — начальный", "A1 — beginner"),
      opt("a2", "A2 — базовый", "A2 — elementary"),
      opt("b1", "B1 — средний", "B1 — intermediate"),
      opt("b2", "B2 — выше среднего", "B2 — upper intermediate"),
      opt("c1", "C1 или выше", "C1 or higher"),
    ],
  },
  {
    id: "english",
    title: "Какой у вас уровень английского?",
    en: "What is your English language level?",
    options: [
      opt("none", "Не владею или начальный", "None or beginner"),
      opt("basic", "Базовый", "Basic"),
      opt("b1", "B1", "B1"),
      opt("b2", "B2", "B2"),
      opt("c1", "C1 или выше", "C1 or higher"),
    ],
  },
  {
    id: "education",
    title: "Какое у вас образование или профессиональная квалификация?",
    en: "What education or professional qualification do you have?",
    options: [
      opt("none", "Нет завершённого профессионального образования", "No completed professional qualification"),
      opt("school", "Среднее образование", "Secondary education"),
      opt("vocational", "Профессиональное образование / диплом колледжа", "Vocational qualification"),
      opt("bachelor", "Степень бакалавра или эквивалент", "Bachelor's degree or equivalent"),
      opt("master", "Магистратура или выше", "Master's degree or higher"),
      opt("regulated", "Квалификация в регулируемой профессии", "Qualification in a regulated profession"),
    ],
  },
  {
    id: "workExperience",
    title: "Каков ваш профессиональный опыт?",
    en: "How much professional experience do you have?",
    options: [
      opt("none", "Нет опыта", "No experience"),
      opt("under2", "Менее 2 лет", "Less than 2 years"),
      opt("2-5", "2–5 лет", "2–5 years"),
      opt("5plus", "Более 5 лет", "More than 5 years"),
    ],
  },
  {
    id: "germanyExperience",
    title: "Есть ли у вас опыт работы или обучения в Германии?",
    en: "Do you have work or study experience in Germany?",
    options: [
      opt("yes", "Да", "Yes"),
      opt("no", "Нет", "No"),
      opt("current", "Сейчас работаю или учусь в Германии", "Currently working or studying in Germany"),
    ],
  },
  {
    id: "jobOffer",
    title: "Есть ли у вас предложение работы от немецкого работодателя?",
    en: "Do you have a job offer from a German employer?",
    options: [
      opt("yes", "Да, есть конкретное предложение или договор", "Yes, I have a concrete offer or contract"),
      opt("interview", "Есть переговоры или собеседования", "I have interviews or ongoing discussions"),
      opt("no", "Нет", "No"),
      opt("self", "Планирую работать на себя", "I plan to be self-employed"),
    ],
  },
  {
    id: "profession",
    title: "В какой сфере вы планируете работать?",
    en: "In which field do you plan to work?",
    options: [
      opt("it", "IT, технологии или цифровые профессии", "IT, technology or digital professions"),
      opt("engineering", "Инженерия или технические специальности", "Engineering or technical occupations"),
      opt("health", "Медицина или уход", "Healthcare or nursing"),
      opt("craft", "Ремесло, производство или строительство", "Trades, manufacturing or construction"),
      opt("business", "Бизнес, финансы или управление", "Business, finance or management"),
      opt("education", "Образование или наука", "Education or research"),
      opt("other", "Другая сфера", "Other field"),
      opt("none", "Пока не планирую работать", "I do not plan to work yet"),
    ],
  },
  {
    id: "recognition",
    title: "Как обстоят дела с признанием вашей квалификации в Германии?",
    en: "What is the status of recognition of your qualifications in Germany?",
    description: "Для некоторых профессий признание диплома или лицензия обязательны.",
    descriptionEn: "Recognition of qualifications or a licence is mandatory for some professions.",
    options: [
      opt("recognized", "Квалификация признана или сопоставима", "Recognised or comparable"),
      opt("pending", "Процесс признания начат", "Recognition process has started"),
      opt("notstarted", "Ещё не обращался за признанием", "Not yet applied for recognition"),
      opt("notneeded", "Для моей профессии признание не требуется", "Recognition is not required for my occupation"),
      opt("unknown", "Не знаю", "Not sure"),
    ],
  },
  {
    id: "state",
    title: "В какой федеральной земле Германии вы планируете жить?",
    en: "In which German federal state do you plan to live?",
    options: [
      opt("berlin", "Берлин", "Berlin"),
      opt("bavaria", "Бавария", "Bavaria"),
      opt("baden", "Баден-Вюртемберг", "Baden-Württemberg"),
      opt("nrw", "Северный Рейн — Вестфалия", "North Rhine-Westphalia"),
      opt("hesse", "Гессен", "Hesse"),
      opt("hamburg", "Гамбург", "Hamburg"),
      opt("other", "Другая земля", "Another state"),
      opt("unknown", "Пока не знаю", "Not decided yet"),
    ],
  },
  {
    id: "studyOffer",
    title: "Есть ли у вас подтверждение о зачислении в немецкое учебное заведение?",
    en: "Have you been admitted to a German educational institution?",
    options: [
      opt("yes", "Да, университет или вуз подтвердил зачисление", "Yes, a university has admitted me"),
      opt("conditional", "Есть условное зачисление или подготовительная программа", "Conditional admission or preparatory programme"),
      opt("training", "Есть предложение места Ausbildung", "I have an Ausbildung offer"),
      opt("no", "Нет", "No"),
      opt("planning", "Пока выбираю программу", "I am still choosing a programme"),
    ],
  },
  {
    id: "institution",
    title: "Проверяли ли вы требования к учебному заведению и вашему аттестату?",
    en: "Have you checked the institution and school-leaving qualification requirements?",
    options: [
      opt("yes", "Да, требования проверены", "Yes, I have checked the requirements"),
      opt("partial", "Проверил частично", "Partially checked"),
      opt("no", "Нет", "No"),
      opt("na", "Не относится к моей ситуации", "Not applicable to me"),
    ],
  },
  {
    id: "family",
    title: "Есть ли у вас близкий родственник, проживающий в Германии?",
    en: "Do you have a close family member living in Germany?",
    description: "Возможность воссоединения зависит от родства и статуса родственника.",
    descriptionEn: "Family reunification depends on the relationship and the relative's residence status.",
    options: [
      opt("spouse", "Супруг или зарегистрированный партнёр", "Spouse or registered partner"),
      opt("child", "Несовершеннолетний ребёнок", "Minor child"),
      opt("parent", "Родитель ребёнка, проживающего в Германии", "Parent of a child living in Germany"),
      opt("other", "Другой родственник", "Another relative"),
      opt("no", "Нет", "No"),
    ],
  },
  {
    id: "familyStatus",
    title: "Каков статус родственника в Германии?",
    en: "What is your relative's status in Germany?",
    options: [
      opt("citizen", "Гражданин Германии", "German citizen"),
      opt("eu", "Гражданин другой страны ЕС/ЕЭЗ", "Citizen of another EU/EEA country"),
      opt("permanent", "Постоянный вид на жительство", "Permanent residence permit"),
      opt("work", "Временный ВНЖ для работы", "Temporary work residence permit"),
      opt("study", "ВНЖ для учёбы", "Student residence permit"),
      opt("protection", "Статус защиты или убежища", "Protection or asylum status"),
      opt("unknown", "Не знаю", "Not sure"),
      opt("na", "Нет родственника в Германии", "No relative in Germany"),
    ],
  },
  {
    id: "funds",
    title: "Можете ли вы подтвердить наличие средств на проживание?",
    en: "Can you prove that you have sufficient funds for living expenses?",
    description: "Способы подтверждения зависят от типа визы: например, блокированный счёт, стипендия или обязательство спонсора.",
    descriptionEn: "Accepted proof depends on the visa type and may include a blocked account, scholarship or formal sponsorship.",
    options: [
      opt("yes", "Да, средства или подтверждение финансирования есть", "Yes, funds or financial proof are available"),
      opt("partial", "Есть часть средств", "I have some funds"),
      opt("sponsor", "Есть спонсор или стипендия", "I have a sponsor or scholarship"),
      opt("no", "Пока нет", "Not yet"),
      opt("unknown", "Не знаю, сколько требуется", "I do not know the required amount"),
    ],
  },
  {
    id: "business",
    title: "Планируете ли вы открыть бизнес или работать как фрилансер?",
    en: "Do you plan to start a business or work as a freelancer?",
    options: [
      opt("business", "Открыть компанию или коммерческий бизнес", "Start a company or commercial business"),
      opt("freelance", "Работать как фрилансер", "Work as a freelancer"),
      opt("existing", "У меня уже есть бизнес", "I already have a business"),
      opt("no", "Нет", "No"),
      opt("considering", "Рассматриваю такую возможность", "I am considering it"),
    ],
  },
  {
    id: "visitDuration",
    title: "Как долго вы планируете находиться в Германии?",
    en: "How long do you plan to stay in Germany?",
    options: [
      opt("short", "До 90 дней", "Up to 90 days"),
      opt("long", "Более 90 дней", "More than 90 days"),
      opt("permanent", "Переезд на постоянной основе", "Long-term relocation"),
      opt("unknown", "Пока не знаю", "Not sure yet"),
    ],
  },
  {
    id: "passport",
    title: "Есть ли у вас действующий паспорт?",
    en: "Do you have a valid passport?",
    options: [
      opt("yes", "Да", "Yes"),
      opt("expiring", "Скоро истекает срок действия", "It expires soon"),
      opt("no", "Нет", "No"),
      opt("refugee", "У меня особые документы или документ беженца", "I have special travel documents or a refugee travel document"),
    ],
  },
  {
    id: "immigrationHistory",
    title: "Были ли у вас отказы в визе, нарушения или проблемы с миграционным статусом?",
    en: "Have you had visa refusals, violations or immigration status issues?",
    options: [
      opt("no", "Нет", "No"),
      opt("refusal", "Был отказ в визе или ВНЖ", "I had a visa or residence permit refusal"),
      opt("overstay", "Было превышение разрешённого срока пребывания", "I overstayed a permitted period"),
      opt("violation", "Было другое нарушение миграционных правил", "Another immigration violation"),
      opt("pending", "Есть незавершённое дело или апелляция", "A case or appeal is pending"),
      opt("prefer", "Предпочитаю обсудить это с юристом", "I prefer to discuss this with a lawyer"),
    ],
  },
  {
    id: "status",
    title: "Если вы уже в Германии, какой у вас текущий статус?",
    en: "If you are already in Germany, what is your current status?",
    options: [
      opt("none", "Я за пределами Германии", "I am outside Germany"),
      opt("visa", "Действующая национальная виза D", "Valid national D visa"),
      opt("permit", "Действующий вид на жительство", "Valid residence permit"),
      opt("eu", "Гражданство ЕС/ЕЭЗ или Швейцарии", "EU/EEA or Swiss citizenship"),
      opt("temporary", "Временная защита или другой специальный статус", "Temporary protection or another special status"),
      opt("expired", "Срок действия визы или ВНЖ истёк", "My visa or residence permit has expired"),
      opt("uncertain", "Не уверен в своём статусе", "I am unsure of my status"),
    ],
  },
  {
    id: "protection",
    title: "Связана ли ваша ситуация с преследованием, войной или угрозой безопасности?",
    en: "Is your situation related to persecution, war or a safety threat?",
    description: "Убежище и гуманитарная защита рассматриваются индивидуально компетентными органами.",
    descriptionEn: "Asylum and humanitarian protection are assessed individually by the competent authorities.",
    options: [
      opt("yes", "Да, мне может требоваться защита", "Yes, I may need protection"),
      opt("temporary", "Возможно, мне подходит временная защита", "Temporary protection may be relevant"),
      opt("no", "Нет", "No"),
      opt("unsure", "Не уверен", "Not sure"),
    ],
  },
];

const ROUTES: Omit<Route, "score">[] = [
  {
    id: "work",
    title: "Виза для квалифицированных специалистов",
    titleEn: "Visa for qualified professionals",
    category: "Работа",
    categoryEn: "Employment",
    description: "Маршрут для квалифицированных специалистов с признанным или сопоставимым профессиональным образованием и подходящим предложением работы.",
    descriptionEn: "A route for qualified professionals with a recognised or comparable qualification and suitable employment.",
    requirements: [
      "Подходящая квалификация: профессиональное образование или высшее образование в соответствии с правилами конкретного разрешения.",
      "Для многих случаев требуется конкретное предложение квалифицированной работы в Германии.",
      "Для регулируемых профессий может понадобиться признание квалификации и разрешение на профессиональную деятельность.",
      "Для граждан стран вне ЕС/ЕЭЗ обычно необходимо заранее проверить визовые требования.",
    ],
    requirementsEn: [
      "A suitable qualification, depending on the specific residence permit.",
      "A concrete offer of qualified employment is required in many cases.",
      "Regulated professions may require recognition and a professional licence.",
      "Nationals of countries outside the EU/EEA generally need to check visa requirements before travelling.",
    ],
    limitations: [
      "Одного трудового договора может быть недостаточно: проверяются квалификация, условия работы и применимые нормы.",
      "Для отдельных категорий действуют дополнительные требования, включая возрастные или финансовые.",
      "Разрешение на работу не следует считать автоматическим правом на постоянное проживание.",
    ],
    limitationsEn: [
      "An employment contract alone may not be sufficient; qualifications and employment conditions are assessed.",
      "Additional age or financial requirements may apply to certain categories.",
      "A work permit does not automatically grant permanent residence.",
    ],
    officialUrl: "https://www.make-it-in-germany.com/en/visa-residence/types/work-qualified-professionals",
  },
  {
    id: "bluecard",
    title: "Голубая карта ЕС (EU Blue Card)",
    titleEn: "EU Blue Card",
    category: "Квалифицированная работа",
    categoryEn: "Qualified employment",
    description: "Специальный вариант для подходящих специалистов с высшим образованием или соответствующей квалификацией, отвечающих требованиям к работе и заработной плате.",
    descriptionEn: "A route for eligible professionals who meet the qualification, employment and salary requirements.",
    requirements: [
      "Подходящее предложение работы в Германии.",
      "Высшее образование или другая допустимая квалификационная основа согласно действующим правилам.",
      "Зарплата должна соответствовать установленному порогу; он зависит от категории и ежегодно может меняться.",
      "Для регулируемых профессий могут потребоваться признание и лицензия.",
    ],
    requirementsEn: [
      "A suitable job offer in Germany.",
      "A qualifying higher education degree or another permitted qualification basis.",
      "The salary must meet the applicable threshold, which can vary by category and year.",
      "Recognition and a licence may be required for regulated professions.",
    ],
    limitations: [
      "Не каждое рабочее предложение подходит для Голубой карты.",
      "Порог заработной платы и правила для дефицитных профессий необходимо проверять на дату подачи.",
      "Срок получения постоянного проживания зависит от выполнения дополнительных условий, в том числе требований к немецкому языку.",
    ],
    limitationsEn: [
      "Not every job offer qualifies for an EU Blue Card.",
      "Salary thresholds and shortage-occupation rules must be checked at the time of application.",
      "Permanent residence depends on additional conditions, including German language requirements.",
    ],
    officialUrl: "https://www.make-it-in-germany.com/en/visa-residence/types/eu-blue-card",
  },
  {
    id: "opportunity",
    title: "Карта возможностей (Chancenkarte)",
    titleEn: "Opportunity Card (Chancenkarte)",
    category: "Поиск работы",
    categoryEn: "Job search",
    description: "Возможность приехать для поиска работы без заранее оформленного трудового договора, если выполнены соответствующие квалификационные, языковые и финансовые условия.",
    descriptionEn: "A route to come to Germany to search for work without a prior job offer if the qualification, language and financial conditions are met.",
    requirements: [
      "Нужно соответствовать одному из оснований получения карты возможностей.",
      "В зависимости от основания могут учитываться признание квалификации либо баллы за образование, опыт, язык и другие факторы.",
      "Необходимо подтвердить обеспечение средств на проживание.",
      "Следует проверить допустимость работы во время поиска и ограничения конкретного разрешения.",
    ],
    requirementsEn: [
      "You must qualify under one of the Opportunity Card pathways.",
      "Depending on the pathway, recognised qualifications or points for education, experience, language and other factors may apply.",
      "You must demonstrate sufficient funds for living expenses.",
      "Check the permitted work and restrictions of the specific residence title.",
    ],
    limitations: [
      "Это не гарантия трудоустройства и не автоматическое разрешение на любую работу.",
      "Балльный вариант предполагает соблюдение минимальных условий и требуемого количества баллов.",
      "Финансовые требования и допустимые виды занятости необходимо перепроверить перед подачей.",
    ],
    limitationsEn: [
      "It does not guarantee employment or unrestricted permission to work.",
      "The points-based pathway has minimum eligibility requirements and a required points total.",
      "Financial requirements and permitted work must be checked before applying.",
    ],
    officialUrl: "https://www.make-it-in-germany.com/en/visa-recognition/opportunity-card",
  },
  {
    id: "study",
    title: "Виза для учёбы в Германии",
    titleEn: "Visa for studying in Germany",
    category: "Образование",
    categoryEn: "Education",
    description: "Маршрут для поступления в признанное немецкое высшее учебное заведение или для соответствующей подготовительной программы.",
    descriptionEn: "A route for admission to a recognised German higher education institution or an eligible preparatory programme.",
    requirements: [
      "Подтверждение зачисления или подходящего подготовительного этапа.",
      "Документы об образовании, соответствующие условиям поступления.",
      "Подтверждение средств на проживание и требуемая медицинская страховка.",
      "Подтверждение языковых навыков, если этого требует программа.",
    ],
    requirementsEn: [
      "Proof of admission or an eligible preparatory measure.",
      "Educational documents that meet admission requirements.",
      "Proof of sufficient living funds and required health insurance.",
      "Proof of language proficiency where required by the programme.",
    ],
    limitations: [
      "Поступление и получение визы — отдельные процессы.",
      "Финансовые нормативы меняются; проверяйте актуальные суммы перед подачей.",
      "Правила работы студентов ограничены условиями разрешения на проживание.",
    ],
    limitationsEn: [
      "Admission and visa approval are separate processes.",
      "Financial thresholds change and must be checked before applying.",
      "Student work is subject to the applicable residence permit rules.",
    ],
    officialUrl: "https://www.make-it-in-germany.com/en/visa-recognition/visa-types/studying",
  },
  {
    id: "ausbildung",
    title: "Профессиональное обучение (Ausbildung)",
    titleEn: "Vocational training (Ausbildung)",
    category: "Образование и профессия",
    categoryEn: "Training",
    description: "Маршрут для прохождения профессионального обучения в Германии, в том числе дуального обучения в компании и профессиональной школе.",
    descriptionEn: "A route for vocational training in Germany, including dual training in a company and vocational school.",
    requirements: [
      "Как правило, необходимо подтверждение места обучения.",
      "Обычно требуется немецкий язык, часто на уровне B1, если не применимо исключение.",
      "Нужно подтвердить возможность финансировать проживание.",
      "В зависимости от программы могут требоваться документы об образовании и дополнительные согласования.",
    ],
    requirementsEn: [
      "A confirmed training place is generally required.",
      "German language skills are usually required, often at B1 unless an exception applies.",
      "You must demonstrate sufficient funds for living expenses.",
      "Educational documents and additional approvals may be required depending on the programme.",
    ],
    limitations: [
      "Требования различаются между школьным и дуальным профессиональным обучением.",
      "Наличие места обучения не гарантирует выдачу визы.",
      "Если места ещё нет, проверьте отдельные правила въезда для поиска места Ausbildung.",
    ],
    limitationsEn: [
      "Requirements differ between school-based and dual vocational training.",
      "A training offer does not guarantee visa approval.",
      "If you do not yet have a place, check the separate rules for seeking vocational training.",
    ],
    officialUrl: "https://www.make-it-in-germany.com/en/visa-recognition/visa-types/training",
  },
  {
    id: "family",
    title: "Воссоединение семьи",
    titleEn: "Family reunification",
    category: "Семья",
    categoryEn: "Family",
    description: "Возможный маршрут для определённых членов семьи человека, который живёт в Германии. Требования зависят от статуса родственника и конкретного родства.",
    descriptionEn: "A possible route for eligible family members of a person living in Germany. Requirements depend on the sponsor's status and the family relationship.",
    requirements: [
      "Документальное подтверждение семейной связи.",
      "Проверка вида на жительство или гражданства принимающего родственника.",
      "Могут требоваться документы о жилье, средствах и знании языка; существуют исключения.",
      "Для несовершеннолетних детей и отдельных категорий действуют специальные правила.",
    ],
    requirementsEn: [
      "Documentary proof of the family relationship.",
      "Verification of the sponsor's citizenship or residence permit.",
      "Housing, financial or language evidence may be required, subject to exceptions.",
      "Special rules apply to minor children and certain categories.",
    ],
    limitations: [
      "Не каждый родственник имеет право на воссоединение по стандартной процедуре.",
      "Требования зависят от статуса принимающего лица и обстоятельств дела.",
      "Необходимо проверить документы и процедуру в компетентном немецком представительстве.",
    ],
    limitationsEn: [
      "Not every relative qualifies under the standard family reunification procedure.",
      "Requirements depend on the sponsor's status and individual circumstances.",
      "Check documents and procedures with the competent German mission.",
    ],
    officialUrl: "https://www.make-it-in-germany.com/en/visa-residence/types/family-reunification",
  },
  {
    id: "business",
    title: "Предпринимательство или самостоятельная деятельность",
    titleEn: "Self-employment or freelancing",
    category: "Бизнес",
    categoryEn: "Business",
    description: "Вариант для предпринимателей и фрилансеров, если деятельность соответствует немецким требованиям и есть основания для соответствующего разрешения.",
    descriptionEn: "A route for entrepreneurs and freelancers whose planned activity meets the German requirements for the relevant residence permit.",
    requirements: [
      "Описание деятельности и подходящий бизнес-план, если он необходим.",
      "Подтверждение финансирования и способности обеспечивать собственное проживание.",
      "Для коммерческого бизнеса могут оцениваться экономический интерес и региональная потребность.",
      "Для регулируемой деятельности могут потребоваться разрешения или профессиональная лицензия.",
    ],
    requirementsEn: [
      "A description of the activity and a suitable business plan where required.",
      "Proof of financing and ability to support yourself.",
      "Commercial businesses may be assessed for economic interest and regional demand.",
      "Regulated activities may require permits or professional licences.",
    ],
    limitations: [
      "Регистрация компании сама по себе не предоставляет право на проживание.",
      "Правила для Freiberufler и Gewerbe различаются.",
      "Планируемый доход и финансовые доказательства оцениваются индивидуально.",
    ],
    limitationsEn: [
      "Registering a company alone does not grant residence rights.",
      "Rules for freelancers and commercial businesses differ.",
      "Projected income and financial evidence are assessed individually.",
    ],
    officialUrl: "https://www.make-it-in-germany.com/en/working-in-germany/starting-business/visa/visa-for-self-employed-business",
  },
  {
    id: "recognition",
    title: "Признание иностранной квалификации",
    titleEn: "Recognition of foreign qualifications",
    category: "Квалификация",
    categoryEn: "Qualifications",
    description: "Если для вашей профессии требуется признание диплома или дополнительная квалификация, стоит проверить процедуру до выбора рабочего маршрута.",
    descriptionEn: "If your profession requires qualification recognition or additional training, check the process before choosing a work route.",
    requirements: [
      "Документы об образовании и профессиональном опыте.",
      "Определение компетентного органа для конкретной профессии.",
      "Для регулируемых профессий могут требоваться лицензия, языковые экзамены или адаптационные мероприятия.",
      "В зависимости от результата могут быть доступны дополнительные визовые варианты.",
    ],
    requirementsEn: [
      "Educational documents and professional experience evidence.",
      "Identification of the competent authority for your profession.",
      "Regulated professions may require a licence, language exams or adaptation measures.",
      "Additional visa routes may be available depending on the result.",
    ],
    limitations: [
      "Признание не является единым процессом для всех профессий.",
      "Процедура может занять время и потребовать перевода документов.",
      "Результат зависит от конкретной квалификации и регулирующих правил.",
    ],
    limitationsEn: [
      "Recognition is not a single process for every occupation.",
      "The process can take time and may require translated documents.",
      "The outcome depends on the qualification and applicable rules.",
    ],
    officialUrl: "https://www.make-it-in-germany.com/en/visa-residence/recognition",
  },
  {
    id: "visitor",
    title: "Краткосрочная поездка в Германию",
    titleEn: "Short stay in Germany",
    category: "Визит",
    categoryEn: "Visit",
    description: "Для краткосрочного туризма, посещения семьи или деловой поездки может подойти безвизовый режим либо шенгенская виза — в зависимости от гражданства и цели поездки.",
    descriptionEn: "For short tourism, family visits or business trips, visa-free entry or a Schengen visa may apply depending on nationality and purpose.",
    requirements: [
      "Проверка визовых требований по гражданству и документу для поездки.",
      "Действительный проездной документ и соблюдение допустимого срока пребывания.",
      "При необходимости — подтверждение цели поездки, средств и условий размещения.",
      "Для работы или длительного проживания обычно нужен другой правовой маршрут.",
    ],
    requirementsEn: [
      "Check visa requirements based on nationality and travel document.",
      "A valid travel document and compliance with the permitted stay period.",
      "Where required, evidence of purpose, funds and accommodation.",
      "Work or long-term residence usually requires a different legal route.",
    ],
    limitations: [
      "Краткосрочный визит обычно не даёт права работать.",
      "Безвизовый въезд зависит от гражданства и других условий.",
      "Правило 90 дней из 180 дней применяется к соответствующим краткосрочным поездкам в Шенгенской зоне.",
    ],
    limitationsEn: [
      "A short-stay visit generally does not authorise employment.",
      "Visa-free entry depends on nationality and other conditions.",
      "The 90-days-in-any-180-day-period rule applies to relevant short stays in the Schengen Area.",
    ],
    officialUrl: "https://www.auswaertiges-amt.de/en/visa-service",
  },
  {
    id: "permanent",
    title: "Постоянный вид на жительство (Niederlassungserlaubnis)",
    titleEn: "Settlement permit (Niederlassungserlaubnis)",
    category: "Постоянное проживание",
    categoryEn: "Permanent residence",
    description: "Постоянное разрешение на проживание может быть доступно после выполнения требований, которые зависят от вашего текущего статуса и истории проживания.",
    descriptionEn: "A settlement permit may be available after meeting requirements that depend on your current status and residence history.",
    requirements: [
      "Подходящий текущий вид на жительство и необходимый период проживания, если он предусмотрен соответствующей нормой.",
      "Как правило, учитываются средства к существованию и пенсионные взносы в применимых случаях.",
      "Могут требоваться немецкий язык, базовые знания правового и общественного устройства, жильё.",
      "Для отдельных категорий, включая некоторых обладателей Голубой карты, предусмотрены специальные условия.",
    ],
    requirementsEn: [
      "An eligible current residence permit and the required residence period where applicable.",
      "Livelihood and pension contributions are generally assessed where required.",
      "German language, knowledge of the legal and social system, and housing may be required.",
      "Special rules apply to certain categories, including some EU Blue Card holders.",
    ],
    limitations: [
      "Единого срока для всех категорий нет.",
      "Временная защита и некоторые специальные статусы регулируются отдельно.",
      "Перед подачей необходимо проверить условия для вашего конкретного разрешения.",
    ],
    limitationsEn: [
      "There is no single qualifying period for every category.",
      "Temporary protection and certain special statuses are subject to separate rules.",
      "Check the requirements for your specific residence permit before applying.",
    ],
    officialUrl: "https://www.make-it-in-germany.com/en/visa-residence/living-permanently-in-germany",
  },
  {
    id: "citizenship",
    title: "Натурализация и гражданство Германии",
    titleEn: "German naturalisation and citizenship",
    category: "Гражданство",
    categoryEn: "Citizenship",
    description: "Натурализация возможна при соблюдении требований немецкого законодательства к сроку проживания, статусу, языку и другим условиям.",
    descriptionEn: "Naturalisation may be possible if you meet German legal requirements for residence, status, language and other conditions.",
    requirements: [
      "Необходимый срок законного обычного проживания; стандартные сроки и исключения нужно проверять по действующему закону.",
      "Подходящий статус проживания и подтверждение личности и гражданства.",
      "Как правило, требуется немецкий язык на уровне B1 и знание правового и общественного устройства, если не применяется исключение.",
      "Обычно проверяются способность обеспечивать себя, отсутствие определённых судимостей и другие законные условия.",
    ],
    requirementsEn: [
      "The required period of lawful habitual residence; standard periods and exceptions must be checked under current law.",
      "Eligible residence status and proof of identity and nationality.",
      "German at B1 and knowledge of the legal and social system are generally required unless an exception applies.",
      "Livelihood, certain criminal convictions and other statutory conditions are generally assessed.",
    ],
    limitations: [
      "Заполнение анкеты не подтверждает право на гражданство.",
      "Срок проживания сам по себе не гарантирует положительное решение.",
      "Правила могут меняться; решение принимает компетентный орган по гражданству.",
    ],
    limitationsEn: [
      "Completing this questionnaire does not establish eligibility for citizenship.",
      "The residence period alone does not guarantee approval.",
      "Rules can change; the competent naturalisation authority makes the decision.",
    ],
    officialUrl: "https://www.einbuergerung.de/",
  },
  {
    id: "protection",
    title: "Убежище и международная защита",
    titleEn: "Asylum and international protection",
    category: "Защита",
    categoryEn: "Protection",
    description: "Если вы опасаетесь преследования или серьёзного вреда при возвращении, изучите официальную процедуру убежища и доступные консультационные службы.",
    descriptionEn: "If you fear persecution or serious harm upon return, review the official asylum process and available advice services.",
    requirements: [
      "Рассмотрение проводится компетентными органами на основании индивидуальных обстоятельств.",
      "Важно сообщать правдивую информацию и по возможности сохранять относящиеся к делу документы.",
      "Для людей с временной защитой могут действовать отдельные правила.",
      "При необходимости следует получить квалифицированную правовую консультацию.",
    ],
    requirementsEn: [
      "The competent authorities assess each case based on individual circumstances.",
      "Provide truthful information and preserve relevant documents where possible.",
      "Separate rules may apply to people covered by temporary protection.",
      "Seek qualified legal advice where necessary.",
    ],
    limitations: [
      "Нельзя заранее гарантировать предоставление убежища или определённого статуса.",
      "Процедура зависит от обстоятельств, применимого права и компетенции органов.",
      "Не следует выбирать этот маршрут только как альтернативу обычной миграции.",
    ],
    limitationsEn: [
      "Asylum or a particular protection status cannot be guaranteed in advance.",
      "The process depends on the circumstances, applicable law and competent authorities.",
      "This route should not be used merely as an alternative to ordinary immigration.",
    ],
    officialUrl: "https://www.bamf.de/EN/Themen/AsylFluechtlingsschutz/asylfluechtlingsschutz-node.html",
  },
];

const tRu = {
  title: "Навигатор иммиграции в Германию",
  subtitle: "Ответьте на вопросы, чтобы предварительно определить подходящие визовые маршруты, варианты проживания, учёбы, работы и натурализации в Германии.",
  reset: "Сбросить ответы",
  progress: "Заполнено",
  of: "из",
  questions: "вопросов",
  allQuestions: "Ваша ситуация",
  answered: "Заполнено",
  notAnswered: "Не заполнено",
  choose: "Выберите ответ",
  showResults: "Подобрать варианты",
  results: "Возможные маршруты",
  resultsDescription: "Результаты ранжированы по совпадению ваших ответов с общими признаками маршрутов.",
  scoreDisclaimer: "Баллы показывают ориентировочное совпадение ответов, а не вероятность одобрения, юридическое заключение или подтверждение права на визу.",
  noResults: "Пока недостаточно данных",
  noResultsDescription: "Ответьте на несколько вопросов, чтобы получить предварительный список маршрутов.",
  top: "Наиболее подходящий",
  requirements: "Основные требования",
  limitations: "Ограничения и что проверить",
  official: "Официальный источник",
  showAll: "Показать все варианты",
  showFewer: "Свернуть список",
  noticeTitle: "Важная информация",
  noticeText: "Навигатор предназначен для первичной ориентации. Требования зависят от гражданства, цели въезда, индивидуальных обстоятельств и действующего законодательства Германии. Перед подачей документов сверяйтесь с официальными источниками и компетентным ведомством.",
  rulesLink: "Официальный портал миграции",
  passportTitle: "Проверьте требования для въезда",
  passportText: "Необходимость визы зависит от гражданства, проездного документа, цели поездки и продолжительности пребывания. Правила краткосрочного въезда отличаются от правил работы и долгосрочного проживания.",
  historyTitle: "Предыдущие миграционные решения",
  historyText: "Отказы, нарушения сроков пребывания и незавершённые дела могут влиять на дальнейшие действия. В сложной ситуации полезна консультация квалифицированного миграционного юриста.",
  expiredTitle: "Истёкший статус пребывания",
  expiredText: "Если срок визы или вида на жительство истёк, не полагайтесь на общий результат анкеты. Незамедлительно уточните ситуацию в компетентной Ausländerbehörde и при необходимости получите юридическую консультацию.",
  protectionTitle: "Вопросы защиты и убежища",
  protectionText: "Если вам угрожает опасность, обратитесь за официальной информацией и квалифицированной консультацией. Не отправляйте через эту анкету документы, содержащие чувствительные сведения.",
  generalDisclaimer: "Информация предоставляется только для общей ориентации и не является юридической консультацией. Миграционные правила Германии могут меняться. Решение о визе, разрешении на проживание, натурализации или защите принимает компетентный государственный орган.",
  footer: "Вернуться к мировому навигатору",
};

const tEn = {
  title: "Germany Immigration Navigator",
  subtitle: "Answer a few questions to identify potentially relevant German visa routes, residence options, work, study and naturalisation pathways.",
  reset: "Reset answers",
  progress: "Completed",
  of: "of",
  questions: "questions",
  allQuestions: "Your situation",
  answered: "Answered",
  notAnswered: "Not answered",
  choose: "Choose an answer",
  showResults: "Find possible routes",
  results: "Possible routes",
  resultsDescription: "Results are ranked according to how closely your answers match general route characteristics.",
  scoreDisclaimer: "Scores indicate approximate alignment with your answers. They are not approval probabilities, legal advice or confirmation of visa eligibility.",
  noResults: "Not enough information yet",
  noResultsDescription: "Answer a few questions to see a preliminary list of routes.",
  top: "Best match",
  requirements: "Main requirements",
  limitations: "Limitations and items to check",
  official: "Official source",
  showAll: "Show all routes",
  showFewer: "Show fewer",
  noticeTitle: "Important information",
  noticeText: "This navigator is for initial orientation only. Requirements depend on nationality, purpose of entry, individual circumstances and current German law. Check official sources and the competent authority before applying.",
  rulesLink: "Official immigration portal",
  passportTitle: "Check entry requirements",
  passportText: "Visa requirements depend on nationality, travel document, purpose and length of stay. Short visits are subject to different rules from employment and long-term residence.",
  historyTitle: "Previous immigration decisions",
  historyText: "Refusals, overstays and pending cases may affect your next steps. In complex situations, consider consulting a qualified immigration lawyer.",
  expiredTitle: "Expired residence status",
  expiredText: "If your visa or residence permit has expired, do not rely on this questionnaire. Contact the competent Ausländerbehörde promptly and obtain legal advice if necessary.",
  protectionTitle: "Protection and asylum",
  protectionText: "If you face danger, seek official information and qualified advice. Do not submit sensitive personal documents through this questionnaire.",
  generalDisclaimer: "This information is for general orientation only and is not legal advice. German immigration rules can change. Decisions on visas, residence permits, naturalisation and protection are made by the competent public authority.",
  footer: "Back to the world navigator",
};

function isAnswered(value?: string) {
  return Boolean(value && value.trim());
}

function getRouteScore(id: string, a: Answers): number {
  let score = 0;
  const euCitizen = a.citizenship === "eu";

  if (euCitizen) {
    if (["work", "study", "family", "business", "permanent"].includes(id)) score += 42;
    if (["bluecard", "opportunity", "visitor"].includes(id)) score += 10;
  } else {
    if (id === "work" && a.goal === "work") score += 30;
    if (id === "bluecard" && a.goal === "bluecard") score += 35;
    if (id === "opportunity" && (a.goal === "jobsearch" || a.jobOffer === "no")) score += 28;
    if (id === "study" && a.goal === "study") score += 35;
    if (id === "ausbildung" && a.goal === "ausbildung") score += 35;
    if (id === "family" && a.goal === "family") score += 35;
    if (id === "business" && a.goal === "business") score += 35;
    if (id === "visitor" && a.goal === "visit") score += 35;
    if (id === "permanent" && a.goal === "permanent") score += 35;
    if (id === "citizenship" && a.goal === "citizenship") score += 35;
    if (id === "protection" && a.goal === "protection") score += 40;
    if (id === "recognition" && (a.goal === "recognition" || a.recognition === "pending" || a.recognition === "notstarted")) score += 25;
  }

  if (id === "work") {
    if (a.jobOffer === "yes") score += 25;
    if (["vocational", "bachelor", "master", "regulated"].includes(a.education)) score += 14;
    if (["recognized", "notneeded"].includes(a.recognition)) score += 12;
    if (["2-5", "5plus"].includes(a.workExperience)) score += 8;
    if (a.jobOffer === "no") score -= 8;
  }

  if (id === "bluecard") {
    if (["bachelor", "master"].includes(a.education)) score += 20;
    if (a.jobOffer === "yes") score += 24;
    if (["recognized", "notneeded"].includes(a.recognition)) score += 8;
    if (a.profession === "it" && ["2-5", "5plus"].includes(a.workExperience)) score += 5;
    if (a.jobOffer === "no") score -= 15;
  }

  if (id === "opportunity") {
    if (a.jobOffer === "no") score += 18;
    if (["vocational", "bachelor", "master"].includes(a.education)) score += 14;
    if (["2-5", "5plus"].includes(a.workExperience)) score += 8;
    if (["a2", "b1", "b2", "c1"].includes(a.german)) score += 8;
    if (["b2", "c1"].includes(a.english)) score += 5;
    if (a.funds === "no") score -= 15;
  }

  if (id === "study") {
    if (["yes", "conditional"].includes(a.studyOffer)) score += 25;
    if (["bachelor", "master"].includes(a.education)) score += 5;
    if (a.funds === "yes" || a.funds === "sponsor") score += 12;
    if (a.funds === "no") score -= 12;
    if (a.studyOffer === "no") score -= 8;
  }

  if (id === "ausbildung") {
    if (a.studyOffer === "training") score += 28;
    if (["a2", "b1", "b2", "c1"].includes(a.german)) score += 8;
    if (a.age === "under18" || a.age === "18-29" || a.age === "30-34") score += 4;
    if (a.funds === "yes" || a.funds === "sponsor") score += 5;
  }

  if (id === "family") {
    if (["spouse", "child", "parent"].includes(a.family)) score += 25;
    if (["citizen", "eu", "permanent", "work", "protection"].includes(a.familyStatus)) score += 12;
    if (a.family === "no") score -= 20;
  }

  if (id === "business") {
    if (["business", "freelance", "existing", "considering"].includes(a.business)) score += 25;
    if (a.funds === "yes" || a.funds === "sponsor") score += 10;
    if (a.business === "no") score -= 15;
  }

  if (id === "recognition") {
    if (a.recognition === "pending") score += 20;
    if (a.recognition === "notstarted") score += 15;
    if (a.education === "regulated") score += 20;
    if (a.profession === "health") score += 10;
  }

  if (id === "visitor") {
    if (a.visitDuration === "short") score += 22;
    if (a.goal === "visit") score += 20;
    if (a.visitDuration === "long" || a.visitDuration === "permanent") score -= 25;
  }

  if (id === "permanent") {
    if (a.status === "permit") score += 10;
    if (a.residence === "germany") score += 10;
    if (a.germanyExperience === "current" || a.germanyExperience === "yes") score += 8;
    if (a.status === "none") score -= 8;
  }

  if (id === "citizenship") {
    if (a.status === "permit") score += 8;
    if (a.residence === "germany") score += 8;
    if (a.german === "b1" || a.german === "b2" || a.german === "c1") score += 10;
    if (a.residence === "outside") score -= 20;
  }

  if (id === "protection") {
    if (a.protection === "yes") score += 40;
    if (a.protection === "temporary") score += 20;
    if (a.protection === "no") score -= 30;
  }

  if (a.status === "expired" || a.status === "uncertain") score -= 10;
  if (a.passport === "no") score -= 5;

  return Math.max(0, Math.min(100, score));
}

function getRouteWarning(id: string, a: Answers, isEnglish: boolean): string {
  const warnings: Record<string, { ru: string; en: string }> = {
    expired: {
      ru: "В ваших ответах указан истёкший или неясный статус. Сначала уточните свои права и обязанности в Ausländerbehörde или у квалифицированного юриста.",
      en: "Your answers indicate an expired or uncertain status. First clarify your rights and obligations with the Ausländerbehörde or a qualified lawyer.",
    },
    history: {
      ru: "Вы указали предыдущий отказ или миграционную проблему. Она может повлиять на заявление; оцените обстоятельства индивидуально.",
      en: "You indicated a previous refusal or immigration issue. It may affect an application and should be assessed individually.",
    },
    funds: {
      ru: "Подтверждение средств может быть обязательным. Проверьте актуальные требования именно для этого маршрута.",
      en: "Proof of funds may be mandatory. Check the current requirements for this specific route.",
    },
  };

  if (a.status === "expired" || a.status === "uncertain") return warnings.expired[isEnglish ? "en" : "ru"];

  if (["refusal", "overstay", "violation", "pending", "prefer"].includes(a.immigrationHistory)) {
    if (["work", "bluecard", "opportunity", "study", "family", "visitor"].includes(id)) {
      return warnings.history[isEnglish ? "en" : "ru"];
    }
  }

  if (["study", "ausbildung", "opportunity"].includes(id) && a.funds === "no") {
    return warnings.funds[isEnglish ? "en" : "ru"];
  }

  if (id === "bluecard" && a.jobOffer !== "yes") {
    return isEnglish
      ? "An eligible job offer and the applicable salary threshold are central to the EU Blue Card route."
      : "Для Голубой карты важны подходящее предложение работы и соблюдение применимого порога заработной платы.";
  }

  if (id === "family" && !["spouse", "child", "parent"].includes(a.family)) {
    return isEnglish
      ? "Family reunification is generally limited to eligible family relationships. Other relatives are subject to special rules."
      : "Воссоединение обычно доступно для определённых членов семьи. Для других родственников действуют специальные правила.";
  }

  if (id === "visitor" && a.visitDuration === "long") {
    return isEnglish
      ? "A short-stay visa is generally not suitable for long-term residence or employment."
      : "Краткосрочная виза обычно не подходит для длительного проживания или работы.";
  }

  if (id === "protection" && a.protection === "unsure") {
    return isEnglish
      ? "Protection eligibility requires an individual assessment. Contact an authorised counselling service."
      : "Право на защиту оценивается индивидуально. Обратитесь в квалифицированную консультационную службу.";
  }

  return "";
}

export default function GermanyPage() {
  const language = useLanguage() as any;
  const isEnglish =
    language?.language === "en" ||
    language?.locale === "en" ||
    language?.lang === "en" ||
    language?.isEnglish === true;

  const t = isEnglish ? tEn : tRu;
  const [answers, setAnswers] = useState<Answers>({});
  const [showAll, setShowAll] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const answered = questions.filter((q) => isAnswered(answers[q.id])).length;
  const progress = Math.round((answered / questions.length) * 100);

  const results = useMemo(() => {
    return ROUTES.map((route) => ({
      ...route,
      score: getRouteScore(route.id, answers),
    }))
      .filter((route) => route.score > 0)
      .sort((a, b) => b.score - a.score);
  }, [answers]);

  const visibleResults = showAll ? results : results.slice(0, 8);

  const hasImmigrationHistory = [
    "refusal",
    "overstay",
    "violation",
    "pending",
    "prefer",
  ].includes(answers.immigrationHistory);

  const hasExpiredStatus = ["expired", "uncertain"].includes(answers.status);
  const protectionRelevant = ["yes", "temporary", "unsure"].includes(answers.protection);
  const visitRelevant = answers.goal === "visit" || answers.visitDuration === "short";

  function updateAnswer(questionId: string, value: string) {
    setAnswers((current) => ({
      ...current,
      [questionId]: value,
    }));
  }

  function resetAnswers() {
    setAnswers({});
    setShowAll(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function getOptionLabel(question: Question, value: string) {
    const option = question.options.find((item) => item.value === value);
    return option ? (isEnglish ? option.en ?? option.label : option.label) : value;
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
                  code="DE"
                  name="Germany"
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
              <h2 className="text-xl font-semibold text-white">
                {t.allQuestions}
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                {isEnglish
                  ? "Choose the answer that best describes your situation."
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
                      {isEnglish ? question.en : question.title}
                    </legend>

                    <div className="mb-4 flex items-start gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-blue-300/20 bg-blue-400/10 text-sm font-semibold text-blue-200">
                        {index + 1}
                      </span>

                      <div className="min-w-0 flex-1">
                        <h3 className="text-base font-semibold leading-6 text-white">
                          {isEnglish ? question.en : question.title}
                        </h3>

                        {(question.description || question.descriptionEn) && (
                          <p className="mt-2 text-sm leading-6 text-slate-400">
                            {isEnglish
                              ? question.descriptionEn ?? question.description
                              : question.description}
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
                                <span>{isEnglish ? option.en ?? option.label : option.label}</span>
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
                                {isEnglish ? route.categoryEn : route.category}
                              </span>

                              {index === 0 && (
                                <span className="rounded-md bg-emerald-400/10 px-2 py-1 text-[11px] font-medium text-emerald-200">
                                  {t.top}
                                </span>
                              )}
                            </div>

                            <h3 className="font-semibold leading-6 text-white">
                              {isEnglish ? route.titleEn : route.title}
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
                          {isEnglish ? route.descriptionEn : route.description}
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
                            {(isEnglish ? route.requirementsEn : route.requirements).map(
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
                            {(isEnglish ? route.limitationsEn : route.limitations).map(
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
                  href="https://www.make-it-in-germany.com/en/"
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
                    href="https://www.auswaertiges-amt.de/en/visa-service"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-blue-200 hover:text-blue-100"
                  >
                    {isEnglish ? "Check official entry requirements" : "Проверить официальные требования для въезда"}
                    <span aria-hidden="true">↗</span>
                  </a>
                </section>
              )}

              {hasImmigrationHistory && (
                <section className="rounded-2xl border border-orange-300/20 bg-orange-300/[0.04] p-5">
                  <h3 className="font-semibold text-orange-100">{t.historyTitle}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{t.historyText}</p>
                  <a
                    href="https://www.bamf.de/EN/Startseite/startseite_node.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-orange-200 hover:text-orange-100"
                  >
                    {isEnglish ? "Official BAMF website" : "Официальный сайт BAMF"}
                    <span aria-hidden="true">↗</span>
                  </a>
                </section>
              )}

              {hasExpiredStatus && (
                <section className="rounded-2xl border border-red-300/20 bg-red-300/[0.04] p-5">
                  <h3 className="font-semibold text-red-100">{t.expiredTitle}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{t.expiredText}</p>
                  <a
                    href="https://www.make-it-in-germany.com/en/visa-residence"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-red-200 hover:text-red-100"
                  >
                    {isEnglish ? "Check official residence information" : "Проверить официальную информацию о проживании"}
                    <span aria-hidden="true">↗</span>
                  </a>
                </section>
              )}

              {protectionRelevant && (
                <section className="rounded-2xl border border-purple-300/20 bg-purple-300/[0.04] p-5">
                  <h3 className="font-semibold text-purple-100">{t.protectionTitle}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{t.protectionText}</p>
                  <a
                    href="https://www.bamf.de/EN/Themen/AsylFluechtlingsschutz/asylfluechtlingsschutz-node.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-purple-200 hover:text-purple-100"
                  >
                    {isEnglish ? "Official protection information" : "Официальная информация о защите"}
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
                            {isEnglish ? question.en : question.title}
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
