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
  { value: "us", ru: "🇺🇸 США", en: "🇺🇸 United States" },
  { value: "ca", ru: "🇨🇦 Канада", en: "🇨🇦 Canada" },
  { value: "uk", ru: "🇬🇧 Великобритания", en: "🇬🇧 United Kingdom" },
  { value: "in", ru: "🇮🇳 Индия", en: "🇮🇳 India" },
  { value: "cn", ru: "🇨🇳 Китай", en: "🇨🇳 China" },
  { value: "tr", ru: "🇹🇷 Турция", en: "🇹🇷 Türkiye" },
  { value: "de", ru: "🇩🇪 Германия", en: "🇩🇪 Germany" },
  { value: "fr", ru: "🇫🇷 Франция", en: "🇫🇷 France" },
  { value: "it", ru: "🇮🇹 Италия", en: "🇮🇹 Italy" },
  { value: "es", ru: "🇪🇸 Испания", en: "🇪🇸 Spain" },
  { value: "pl", ru: "🇵🇱 Польша", en: "🇵🇱 Poland" },
  { value: "otherEU", ru: "Другая страна ЕС / ЕЭЗ", en: "Another EU / EEA country" },
  { value: "other", ru: "Другая страна", en: "Another country" },
  { value: "unknown", ru: "Не хочу указывать", en: "Prefer not to say" },
];

const questions: Question[] = [
  {
    id: "goal",
    ru: "Какова ваша главная цель в Германии?",
    en: "What is your main goal in Germany?",
    options: [
      { value: "work", ru: "Работа по найму", en: "Employment" },
      { value: "study", ru: "Учёба в университете", en: "University studies" },
      { value: "business", ru: "Бизнес или самозанятость", en: "Business or self-employment" },
      { value: "family", ru: "Переезд к семье или партнёру", en: "Join family or partner" },
      { value: "permanent", ru: "Долгосрочное или постоянное проживание", en: "Long-term or permanent residence" },
      { value: "visit", ru: "Туризм, гости или деловая поездка", en: "Tourism, visiting or business trip" },
      { value: "exchange", ru: "Профессиональное обучение или стажировка", en: "Vocational training or internship" },
      { value: "research", ru: "Научная работа или исследования", en: "Academic work or research" },
      { value: "protection", ru: "Поиск защиты от преследования или опасности", en: "Seeking protection from persecution or danger" },
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
      { value: "de", ru: "Германия", en: "Germany" },
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
      { value: "de", ru: "Германия", en: "Germany" },
      { value: "pl", ru: "Польша", en: "Poland" },
      { value: "cz", ru: "Чехия", en: "Czechia" },
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
      { value: "vocational", ru: "Профессиональное образование", en: "Vocational qualification" },
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
    ru: "Есть ли у вас предложение работы от работодателя в Германии?",
    en: "Do you have a job offer from an employer in Germany?",
    options: [
      { value: "yes", ru: "Да", en: "Yes" },
      { value: "no", ru: "Нет", en: "No" },
      { value: "maybe", ru: "Веду переговоры", en: "In discussion" },
    ],
  },
  {
    id: "sponsor",
    ru: "Готов ли работодатель оформить документы для трудоустройства иностранца?",
    en: "Is the employer willing to support the required immigration paperwork?",
    options: [
      { value: "yes", ru: "Да", en: "Yes" },
      { value: "no", ru: "Нет", en: "No" },
      { value: "unknown", ru: "Не знаю", en: "Not sure" },
      { value: "na", ru: "Нет предложения работы", en: "No job offer" },
    ],
  },
  {
    id: "studentOffer",
    ru: "Есть ли у вас зачисление или приглашение от учебного заведения Германии?",
    en: "Have you been admitted to an educational institution in Germany?",
    options: [
      { value: "yes", ru: "Да", en: "Yes" },
      { value: "no", ru: "Нет", en: "No" },
      { value: "applying", ru: "Планирую подать документы", en: "Planning to apply" },
    ],
  },
  {
    id: "exchangeOffer",
    ru: "Есть ли у вас место на программе Ausbildung, стажировке или профессиональном обучении?",
    en: "Do you have a place in an Ausbildung, internship or vocational training programme?",
    options: [
      { value: "yes", ru: "Да", en: "Yes" },
      { value: "no", ru: "Нет", en: "No" },
      { value: "unknown", ru: "Не знаю", en: "Not sure" },
    ],
  },
  {
    id: "familyUS",
    ru: "Есть ли у вас супруг(-а), зарегистрированный партнёр или близкий родственник в Германии?",
    en: "Do you have a spouse, registered partner or close relative in Germany?",
    options: [
      { value: "citizen", ru: "Супруг(-а) или партнёр — гражданин Германии", en: "Spouse or partner is a German citizen" },
      { value: "resident", ru: "Супруг(-а) или родственник легально проживает в Германии", en: "Spouse or relative legally resides in Germany" },
      { value: "fiance", ru: "Планирую заключить брак с гражданином Германии", en: "I plan to marry a German citizen" },
      { value: "no", ru: "Нет", en: "No" },
      { value: "unknown", ru: "Не уверен(-а)", en: "Not sure" },
    ],
  },
  {
    id: "achievements",
    ru: "Есть ли у вас значимые профессиональные или научные достижения?",
    en: "Do you have significant professional or academic achievements?",
    options: [
      { value: "strong", ru: "Да: признание, публикации, награды или значимые достижения", en: "Yes: recognition, publications, awards or significant achievements" },
      { value: "some", ru: "Есть достижения, но не знаю, подходят ли они", en: "Some achievements, but unsure if they qualify" },
      { value: "no", ru: "Нет", en: "No" },
    ],
  },
  {
    id: "business",
    ru: "Каковы ваши планы в отношении бизнеса или самозанятости?",
    en: "What are your plans for business or self-employment?",
    options: [
      { value: "large", ru: "Есть капитал и подробный бизнес-план", en: "I have capital and a detailed business plan" },
      { value: "some", ru: "Есть идея или предварительный бизнес-план", en: "I have an idea or an initial business plan" },
      { value: "company", ru: "У меня есть действующая компания", en: "I own or operate an existing company" },
      { value: "no", ru: "Не планирую бизнес", en: "No business plans" },
    ],
  },
  {
    id: "visitPurpose",
    ru: "Что вы планируете делать во время краткой поездки?",
    en: "What do you plan to do during a short visit?",
    options: [
      { value: "tourism", ru: "Туризм, отдых, посещение друзей или семьи", en: "Tourism, vacation, visiting friends or family" },
      { value: "business", ru: "Деловые встречи или конференция", en: "Business meetings or a conference" },
      { value: "medical", ru: "Получение медицинской помощи", en: "Medical treatment" },
      { value: "transit", ru: "Транзит через Германию", en: "Transit through Germany" },
      { value: "other", ru: "Другая цель", en: "Another purpose" },
    ],
  },
  {
    id: "visitDuration",
    ru: "Как долго планируете находиться в Германии?",
    en: "How long do you plan to stay in Germany?",
    options: [
      { value: "under90", ru: "До 90 дней", en: "Up to 90 days" },
      { value: "over90", ru: "Более 90 дней", en: "More than 90 days" },
      { value: "unsure", ru: "Пока не знаю", en: "Not sure yet" },
    ],
  },
  {
    id: "passport",
    ru: "Есть ли у вас действующий заграничный паспорт?",
    en: "Do you have a valid travel passport?",
    options: [
      { value: "yes", ru: "Да", en: "Yes" },
      { value: "no", ru: "Нет", en: "No" },
      { value: "unknown", ru: "Не уверен(-а)", en: "Not sure" },
    ],
  },
  {
    id: "vwpRestrictions",
    ru: "Есть ли обстоятельства, которые могут повлиять на получение визы или въезд?",
    en: "Are there circumstances that may affect visa issuance or entry?",
    options: [
      { value: "none", ru: "Насколько мне известно, нет", en: "Not to my knowledge" },
      { value: "restrictedTravel", ru: "Есть сложная история поездок или документов", en: "I have a complicated travel or document history" },
      { value: "dualNationality", ru: "У меня несколько гражданств или паспортов", en: "I hold multiple nationalities or passports" },
      { value: "denied", ru: "Ранее был отказ в визе или во въезде", en: "I have had a visa or entry refusal" },
      { value: "unknown", ru: "Не уверен(-а)", en: "Not sure" },
    ],
  },
  {
    id: "funds",
    ru: "Можете ли вы подтвердить средства на проживание, поездку или учёбу?",
    en: "Can you demonstrate sufficient funds for living costs, travel or study?",
    options: [
      { value: "yes", ru: "Да", en: "Yes" },
      { value: "sponsor", ru: "Есть финансовый спонсор или стипендия", en: "I have a financial sponsor or scholarship" },
      { value: "no", ru: "Пока нет", en: "Not yet" },
    ],
  },
  {
    id: "immigrationHistory",
    ru: "Были ли отказы в визах, нарушения правил пребывания или выдворение?",
    en: "Have you had visa refusals, residence violations or removal?",
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
    ru: "Каков ваш текущий статус, если вы уже находитесь в Германии?",
    en: "What is your current status, if you are already in Germany?",
    options: [
      { value: "abroad", ru: "Нахожусь за пределами Германии", en: "I am outside Germany" },
      { value: "valid", ru: "Есть действующая виза или вид на жительство", en: "I have a valid visa or residence permit" },
      { value: "student", ru: "Нахожусь в Германии как студент", en: "I am in Germany as a student" },
      { value: "work", ru: "Нахожусь в Германии по работе", en: "I am in Germany for work" },
      { value: "expired", ru: "Документы истекли или ситуация сложная", en: "My documents expired or my situation is complicated" },
      { value: "unknown", ru: "Не уверен(-а)", en: "Not sure" },
    ],
  },
  {
    id: "protection",
    ru: "Связана ли ваша ситуация с опасением преследования или серьёзной опасности в стране происхождения?",
    en: "Does your situation involve fear of persecution or serious danger in your country of origin?",
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
    title: "Шенгенская виза для краткой поездки",
    enTitle: "Schengen visa for a short stay",
    visa: "Краткосрочное пребывание — обычно до 90 дней в течение 180 дней",
    desc: "Для туризма, посещения семьи и друзей, деловых встреч и других разрешённых краткосрочных целей.",
    enDesc: "For tourism, visiting family and friends, business meetings and other permitted short-stay purposes.",
    link: "https://www.auswaertiges-amt.de/en/visa-service",
    requirements: "Необходимость визы зависит от гражданства и обстоятельств. Обычно требуется подтвердить цель поездки, средства, размещение и намерение соблюдать срок пребывания. Краткосрочная виза не даёт общего права работать в Германии.",
    enRequirements: "Whether you need a visa depends on your nationality and circumstances. Applicants generally need to demonstrate the purpose of travel, funds, accommodation and compliance with the permitted stay. A short-stay visa does not provide a general right to work in Germany.",
    goals: ["visit"],
  },
  {
    id: "bluecard",
    emoji: "💼",
    title: "Голубая карта ЕС",
    enTitle: "EU Blue Card",
    visa: "EU Blue Card — Blaue Karte EU",
    desc: "Для квалифицированных специалистов с подходящим предложением работы и соответствующей квалификацией.",
    enDesc: "For qualified professionals with a suitable job offer and qualifying credentials.",
    link: "https://www.make-it-in-germany.com/en/visa-recognition/visa-types/eu-blue-card",
    requirements: "Обычно необходимы признанная или сопоставимая квалификация, конкретное предложение работы, соответствие должности квалификации и установленному порогу зарплаты. Порог зависит от года и категории профессии; для некоторых IT-специалистов действуют особые условия.",
    enRequirements: "Usually requires a recognised or comparable qualification, a specific job offer, a role matching the qualification and the applicable salary threshold. The threshold depends on the year and occupation category; special rules apply to some IT professionals.",
    goals: ["work", "permanent"],
  },
  {
    id: "work",
    emoji: "🧰",
    title: "Рабочая виза для квалифицированных специалистов",
    enTitle: "Work visa for qualified professionals",
    visa: "Skilled worker residence permit",
    desc: "Для специалистов с профессиональным или высшим образованием, которые получили подходящее предложение работы в Германии.",
    enDesc: "For people with vocational or academic qualifications who have a suitable job offer in Germany.",
    link: "https://www.make-it-in-germany.com/en/visa-recognition/visa-types/work-qualified-professionals",
    requirements: "Как правило, необходимо признание или сопоставимость квалификации, подходящая работа и выполнение требований к профессии. Для регулируемых профессий может потребоваться отдельное разрешение. Одного предложения работы недостаточно для автоматического получения визы.",
    enRequirements: "Generally requires recognition or comparability of qualifications, suitable employment and compliance with occupation-specific rules. Regulated professions may require a separate licence. A job offer alone does not guarantee a visa.",
    goals: ["work", "permanent"],
  },
  {
    id: "opportunity",
    emoji: "🧭",
    title: "Карта возможностей для поиска работы",
    enTitle: "Opportunity Card (Chancenkarte)",
    visa: "Chancenkarte",
    desc: "Возможность приехать для поиска квалифицированной работы, если вы соответствуете одному из предусмотренных законом наборов требований.",
    enDesc: "A route to come to Germany to seek qualified employment if you meet one of the legal eligibility pathways.",
    link: "https://www.make-it-in-germany.com/en/visa-residence/types/job-search-opportunity-card",
    requirements: "В зависимости от основания могут потребоваться признанная квалификация либо соответствие балльной системе, языковые знания и подтверждение средств на проживание. Наличие диплома или опыта само по себе не гарантирует право на Chancenkarte.",
    enRequirements: "Depending on the eligibility pathway, you may need a recognised qualification or to meet the points system, language requirements and proof of funds. A degree or work experience alone does not guarantee eligibility.",
    goals: ["work", "permanent"],
  },
  {
    id: "student",
    emoji: "🎓",
    title: "Студенческая виза",
    enTitle: "Student visa",
    visa: "Residence permit for study",
    desc: "Для обучения в признанном немецком университете или другом подходящем учебном заведении.",
    enDesc: "For study at a recognised German university or other eligible educational institution.",
    link: "https://www.make-it-in-germany.com/en/visa-recognition/visa-types/studying",
    requirements: "Обычно нужны зачисление, подтверждение финансового обеспечения и документы о знании языка, если они требуются программой. Для некоторых случаев доступны отдельные варианты въезда для поиска места обучения. Проверьте актуальный размер финансового обеспечения.",
    enRequirements: "Usually requires admission, proof of sufficient funds and language evidence where required by the programme. Separate options may be available to seek a study place. Check the current financial requirements.",
    goals: ["study"],
  },
  {
    id: "family",
    emoji: "👨‍👩‍👧",
    title: "Воссоединение семьи",
    enTitle: "Family reunification",
    visa: "Family reunification residence permit",
    desc: "Для определённых членов семьи, которые хотят жить вместе с родственником, законно проживающим в Германии.",
    enDesc: "For eligible family members seeking to join a relative legally residing in Germany.",
    link: "https://www.make-it-in-germany.com/en/visa-recognition/family-reunification",
    requirements: "Право зависит от родства, гражданства и статуса родственника в Германии. Для супругов и детей действуют конкретные требования; в некоторых случаях нужны подтверждение жилья, средств или языковых знаний. Не каждый родственник имеет право на воссоединение.",
    enRequirements: "Eligibility depends on the relationship, nationality and the relative's status in Germany. Specific rules apply to spouses and children; housing, funds or language evidence may be required in some cases. Not every relative qualifies.",
    goals: ["family", "permanent"],
  },
  {
    id: "ausbildung",
    emoji: "🛠️",
    title: "Профессиональное обучение — Ausbildung",
    enTitle: "Vocational training (Ausbildung)",
    visa: "Visa for vocational training",
    desc: "Для прохождения профессионального обучения в Германии, в том числе по дуальной системе с практикой у работодателя.",
    enDesc: "For vocational training in Germany, including dual training combining classroom learning and workplace practice.",
    link: "https://www.make-it-in-germany.com/en/visa-residence/types/visa-vocational-training",
    requirements: "Обычно требуется место на программе обучения, достаточное финансирование и, как правило, немецкий язык на уровне, необходимом для обучения. Конкретные условия зависят от программы и обстоятельств.",
    enRequirements: "Usually requires a training place, sufficient funds and generally German language skills appropriate for the programme. Exact requirements depend on the training and circumstances.",
    goals: ["exchange", "work"],
  },
  {
    id: "research",
    emoji: "🔬",
    title: "Виза для научных исследований",
    enTitle: "Research visa",
    visa: "Residence permit for research",
    desc: "Для исследователей, которые приезжают работать с немецким университетом или исследовательской организацией.",
    enDesc: "For researchers coming to work with a German university or research organisation.",
    link: "https://www.make-it-in-germany.com/en/visa-recognition/visa-types/research",
    requirements: "Как правило, необходимы соглашение о приёме или трудовой договор с исследовательской организацией и выполнение условий финансового обеспечения. Для докторантов подходящий тип разрешения зависит от структуры обучения и трудового договора.",
    enRequirements: "Generally requires a hosting agreement or employment contract with a research organisation and compliance with financial requirements. For doctoral candidates, the appropriate permit depends on the study arrangement and employment contract.",
    goals: ["research", "work"],
  },
  {
    id: "business",
    emoji: "📈",
    title: "Виза для предпринимательства и самозанятости",
    enTitle: "Self-employment and business visa",
    visa: "Residence permit for self-employment",
    desc: "Для тех, кто планирует вести предпринимательскую деятельность или работать на себя в Германии.",
    enDesc: "For people planning to establish a business or become self-employed in Germany.",
    link: "https://www.make-it-in-germany.com/en/visa-residence/types/self-employment",
    requirements: "Оцениваются жизнеспособность бизнес-плана, финансирование, опыт заявителя и экономический интерес или региональная потребность. Наличие капитала или идеи само по себе не гарантирует разрешение.",
    enRequirements: "Authorities assess the viability of the business plan, financing, the applicant's experience and the economic interest or regional need. Capital or an idea alone does not guarantee approval.",
    goals: ["business"],
  },
  {
    id: "recognition",
    emoji: "📚",
    title: "Виза для признания квалификации",
    enTitle: "Visa for recognition of qualifications",
    visa: "Recognition of foreign qualifications",
    desc: "Для заявителей, которым необходимо пройти процедуру признания зарубежного профессионального образования или компенсирующие мероприятия.",
    enDesc: "For applicants who need recognition of foreign professional qualifications or compensatory measures.",
    link: "https://www.make-it-in-germany.com/en/visa-residence/types/visa-recognition-foreign-qualifications",
    requirements: "Необходимо соответствовать условиям конкретной процедуры признания и предоставить документы о квалификации. В зависимости от профессии могут потребоваться языковые знания и дополнительные меры обучения.",
    enRequirements: "You must meet the conditions of the relevant recognition procedure and provide qualification documents. Depending on the occupation, language skills and additional training measures may be required.",
    goals: ["work", "exchange"],
  },
  {
    id: "protection",
    emoji: "🛡️",
    title: "Убежище и международная защита",
    enTitle: "Asylum and international protection",
    visa: "Отдельная процедура по законодательству о защите",
    desc: "Это не обычная иммиграционная виза. Возможность получить защиту зависит от индивидуальных обстоятельств и применимого законодательства.",
    enDesc: "This is not an ordinary immigration visa. Eligibility depends on individual circumstances and applicable law.",
    link: "https://www.bamf.de/EN/Themen/AsylFluechtlingsschutz/asylfluechtlingsschutz-node.html",
    requirements: "Процедура защиты отличается от обычной визовой подачи. Навигатор не оценивает доказательства, риски возвращения или юридическое право на убежище. По возможности обратитесь за независимой квалифицированной консультацией.",
    enRequirements: "The protection procedure differs from an ordinary visa application. This navigator does not assess evidence, return risks or legal eligibility for asylum. Seek qualified independent advice where possible.",
    goals: ["protection"],
  },
];

function getScore(id: string, a: Answers): number {
  const goal = a.goal;

  const hasFamily = ["citizen", "resident", "fiance"].includes(a.familyUS);
  const hasOffer = a.jobOffer === "yes";
  const workReady = hasOffer && a.sponsor === "yes";
  const strongAchievement = a.achievements === "strong";
  const someAchievement = a.achievements === "some";
  const hasFunds = ["yes", "sponsor"].includes(a.funds);
  const skilled = ["bachelor", "master", "vocational"].includes(a.education);
  const experienced = ["3plus", "specialist", "manager", "research"].includes(a.workExperience);
  const strongLanguage = ["advanced", "native"].includes(a.english);
  const usableLanguage = ["intermediate", "advanced", "native"].includes(a.english);

  let score = 0;

  switch (id) {
    case "visitor": {
      if (goal !== "visit") return 0;

      score = 45;

      if (a.visitDuration === "under90") score += 10;
      if (a.visitDuration === "over90") score -= 25;
      if (a.visitDuration === "unsure") score -= 5;

      if (a.visitPurpose === "tourism") score += 5;
      if (a.visitPurpose === "business") score += 8;
      if (a.visitPurpose === "medical") score += 3;
      if (a.visitPurpose === "transit") score += 3;
      if (a.visitPurpose === "other") score -= 5;

      if (hasFunds) score += 15;
      if (a.funds === "no") score -= 20;

      if (a.passport === "yes") score += 5;
      if (a.passport === "no") score -= 30;
      if (a.passport === "unknown") score -= 5;

      if (["otherEU", "de"].includes(a.citizenship)) score += 5;
      if (a.citizenship === "unknown") score -= 5;

      if (a.residence === "de") score += 3;
      if (a.residence === "unknown") score -= 2;

      if (a.vwpRestrictions === "none") score += 3;
      if (a.vwpRestrictions === "restrictedTravel") score -= 10;
      if (a.vwpRestrictions === "dualNationality") score -= 2;
      if (a.vwpRestrictions === "denied") score -= 18;
      if (a.vwpRestrictions === "unknown") score -= 4;

      if (a.immigrationHistory === "refusal") score -= 12;
      if (a.immigrationHistory === "overstay") score -= 22;
      if (a.immigrationHistory === "removed") score -= 30;
      if (a.immigrationHistory === "unknown") score -= 4;

      if (a.currentStatus === "expired") score -= 25;
      if (a.currentStatus === "valid") score += 3;
      if (a.currentStatus === "unknown") score -= 3;

      if (a.age === "under18") score -= 3;
      if (a.age === "unknown") score -= 2;

      break;
    }

    case "bluecard": {
      if (!["work", "permanent"].includes(goal)) return 0;

      score = 15;

      if (hasOffer) score += 25;
      if (a.jobOffer === "maybe") score += 10;
      if (a.jobOffer === "no") score -= 5;

      if (workReady) score += 15;
      if (a.sponsor === "no" && hasOffer) score -= 12;
      if (a.sponsor === "unknown" && hasOffer) score -= 3;

      if (a.education === "bachelor") score += 15;
      if (a.education === "master") score += 18;
      if (a.education === "vocational") score += 5;
      if (a.education === "school") score -= 12;
      if (a.education === "none") score -= 15;

      if (a.workExperience === "specialist") score += 12;
      if (a.workExperience === "3plus") score += 10;
      if (a.workExperience === "manager") score += 8;
      if (a.workExperience === "research") score += 8;
      if (a.workExperience === "under3") score += 3;
      if (a.workExperience === "none") score -= 10;

      if (a.age === "18-24") score += 3;
      if (a.age === "25-29") score += 5;
      if (a.age === "30-35") score += 5;
      if (a.age === "36-49") score += 2;
      if (a.age === "50plus") score -= 3;
      if (a.age === "under18") score -= 25;
      if (a.age === "unknown") score -= 2;

      if (strongLanguage) score += 3;
      if (a.english === "basic") score -= 2;
      if (a.english === "unknown") score -= 2;

      if (strongAchievement) score += 5;
      if (someAchievement) score += 2;

      if (a.residence === "de") score += 2;
      if (a.residence === "unknown") score -= 2;

      if (a.currentStatus === "valid") score += 2;
      if (a.currentStatus === "work") score += 3;
      if (a.currentStatus === "student") score += 1;
      if (a.currentStatus === "expired") score -= 20;
      if (a.currentStatus === "unknown") score -= 2;

      if (a.immigrationHistory === "refusal") score -= 8;
      if (a.immigrationHistory === "overstay") score -= 18;
      if (a.immigrationHistory === "removed") score -= 25;
      if (a.immigrationHistory === "unknown") score -= 3;

      if (a.vwpRestrictions === "denied") score -= 8;
      if (a.vwpRestrictions === "restrictedTravel") score -= 5;
      if (a.vwpRestrictions === "unknown") score -= 2;

      if (!hasFunds) score -= 3;
      if (a.funds === "no") score -= 5;

      break;
    }

    case "work": {
      if (!["work", "permanent"].includes(goal)) return 0;

      score = 15;

      if (hasOffer) score += 25;
      if (a.jobOffer === "maybe") score += 10;
      if (a.jobOffer === "no") score -= 5;

      if (workReady) score += 15;
      if (a.sponsor === "no" && hasOffer) score -= 12;
      if (a.sponsor === "unknown" && hasOffer) score -= 3;

      if (a.education === "bachelor") score += 12;
      if (a.education === "master") score += 15;
      if (a.education === "vocational") score += 15;
      if (a.education === "school") score -= 5;
      if (a.education === "none") score -= 10;

      if (a.workExperience === "specialist") score += 12;
      if (a.workExperience === "3plus") score += 10;
      if (a.workExperience === "manager") score += 8;
      if (a.workExperience === "research") score += 8;
      if (a.workExperience === "under3") score += 3;
      if (a.workExperience === "none") score -= 10;

      if (a.age === "18-24") score += 3;
      if (a.age === "25-29") score += 5;
      if (a.age === "30-35") score += 5;
      if (a.age === "36-49") score += 2;
      if (a.age === "50plus") score -= 3;
      if (a.age === "under18") score -= 25;
      if (a.age === "unknown") score -= 2;

      if (strongLanguage) score += 3;
      if (a.english === "basic") score -= 2;
      if (a.english === "unknown") score -= 2;

      if (strongAchievement) score += 4;
      if (someAchievement) score += 2;

      if (a.residence === "de") score += 3;
      if (a.residence === "unknown") score -= 2;

      if (a.currentStatus === "valid") score += 2;
      if (a.currentStatus === "work") score += 3;
      if (a.currentStatus === "student") score += 2;
      if (a.currentStatus === "expired") score -= 20;
      if (a.currentStatus === "unknown") score -= 2;

      if (a.immigrationHistory === "refusal") score -= 8;
      if (a.immigrationHistory === "overstay") score -= 18;
      if (a.immigrationHistory === "removed") score -= 25;
      if (a.immigrationHistory === "unknown") score -= 3;

      if (a.vwpRestrictions === "denied") score -= 8;
      if (a.vwpRestrictions === "restrictedTravel") score -= 5;
      if (a.vwpRestrictions === "unknown") score -= 2;

      if (a.funds === "no") score -= 3;

      break;
    }

    case "opportunity": {
      if (!["work", "permanent"].includes(goal)) return 0;

      score = 20;

      if (skilled) score += 15;
      if (a.education === "master") score += 3;
      if (a.education === "school") score -= 8;
      if (a.education === "none") score -= 12;

      if (experienced) score += 15;
      if (a.workExperience === "specialist") score += 5;
      if (a.workExperience === "manager") score += 3;
      if (a.workExperience === "under3") score += 2;
      if (a.workExperience === "none") score -= 10;

      if (hasFunds) score += 15;
      if (a.funds === "no") score -= 20;

      if (usableLanguage) score += 8;
      if (a.english === "basic") score -= 5;
      if (a.english === "unknown") score -= 3;

      if (a.age === "18-24") score += 3;
      if (a.age === "25-29") score += 5;
      if (a.age === "30-35") score += 5;
      if (a.age === "36-49") score += 2;
      if (a.age === "50plus") score -= 3;
      if (a.age === "under18") score -= 25;
      if (a.age === "unknown") score -= 2;

      if (a.jobOffer === "yes") score += 3;
      if (a.jobOffer === "maybe") score += 2;
      if (a.sponsor === "no" && hasOffer) score -= 3;

      if (strongAchievement) score += 4;
      if (someAchievement) score += 2;

      if (a.residence === "de") score += 2;
      if (a.residence === "unknown") score -= 2;

      if (a.currentStatus === "valid") score += 2;
      if (a.currentStatus === "student") score += 2;
      if (a.currentStatus === "work") score += 2;
      if (a.currentStatus === "expired") score -= 20;
      if (a.currentStatus === "unknown") score -= 2;

      if (a.immigrationHistory === "refusal") score -= 8;
      if (a.immigrationHistory === "overstay") score -= 18;
      if (a.immigrationHistory === "removed") score -= 25;
      if (a.immigrationHistory === "unknown") score -= 3;

      if (a.vwpRestrictions === "denied") score -= 8;
      if (a.vwpRestrictions === "restrictedTravel") score -= 5;
      if (a.vwpRestrictions === "unknown") score -= 2;

      break;
    }

    case "student": {
      if (goal !== "study") return 0;

      score = 25;

      if (a.studentOffer === "yes") score += 35;
      if (a.studentOffer === "applying") score += 15;
      if (a.studentOffer === "no") score -= 8;

      if (hasFunds) score += 20;
      if (a.funds === "no") score -= 20;

      if (a.education === "bachelor" || a.education === "master") score += 5;
      if (a.education === "school") score += 5;
      if (a.education === "vocational") score += 2;
      if (a.education === "none") score -= 8;

      if (usableLanguage) score += 5;
      if (a.english === "basic") score -= 3;
      if (a.english === "unknown") score -= 2;

      if (a.age === "18-24") score += 5;
      if (a.age === "25-29") score += 3;
      if (a.age === "30-35") score += 1;
      if (a.age === "50plus") score -= 5;
      if (a.age === "under18") score -= 5;
      if (a.age === "unknown") score -= 2;

      if (a.residence === "de") score += 2;
      if (a.residence === "unknown") score -= 2;

      if (a.currentStatus === "valid") score += 2;
      if (a.currentStatus === "student") score += 4;
      if (a.currentStatus === "work") score += 1;
      if (a.currentStatus === "expired") score -= 20;
      if (a.currentStatus === "unknown") score -= 2;

      if (a.immigrationHistory === "refusal") score -= 8;
      if (a.immigrationHistory === "overstay") score -= 18;
      if (a.immigrationHistory === "removed") score -= 25;
      if (a.immigrationHistory === "unknown") score -= 3;

      if (a.vwpRestrictions === "denied") score -= 8;
      if (a.vwpRestrictions === "restrictedTravel") score -= 5;
      if (a.vwpRestrictions === "unknown") score -= 2;

      break;
    }

    case "family": {
      if (!["family", "permanent"].includes(goal)) return 0;

      score = 15;

      if (a.familyUS === "citizen") score += 55;
      if (a.familyUS === "resident") score += 45;
      if (a.familyUS === "fiance") score += 25;
      if (a.familyUS === "no") score -= 10;
      if (a.familyUS === "unknown") score -= 3;

      if (goal === "family" && hasFamily) score += 10;
      if (goal === "permanent" && hasFamily) score += 5;

      if (a.age === "under18") score += 2;
      if (a.age === "unknown") score -= 2;

      if (a.residence === "de") score += 3;
      if (a.residence === "unknown") score -= 2;

      if (a.currentStatus === "valid") score += 2;
      if (a.currentStatus === "student") score += 1;
      if (a.currentStatus === "work") score += 1;
      if (a.currentStatus === "expired") score -= 20;
      if (a.currentStatus === "unknown") score -= 2;

      if (a.immigrationHistory === "refusal") score -= 8;
      if (a.immigrationHistory === "overstay") score -= 18;
      if (a.immigrationHistory === "removed") score -= 25;
      if (a.immigrationHistory === "unknown") score -= 3;

      if (a.vwpRestrictions === "denied") score -= 8;
      if (a.vwpRestrictions === "restrictedTravel") score -= 5;
      if (a.vwpRestrictions === "unknown") score -= 2;

      break;
    }

    case "ausbildung": {
      if (!["exchange", "work"].includes(goal)) return 0;

      score = 20;

      if (a.exchangeOffer === "yes") score += 35;
      if (a.exchangeOffer === "unknown") score += 5;
      if (a.exchangeOffer === "no") score -= 8;

      if (hasFunds) score += 15;
      if (a.funds === "no") score -= 20;

      if (a.education === "school") score += 8;
      if (a.education === "vocational") score += 5;
      if (a.education === "bachelor" || a.education === "master") score += 2;
      if (a.education === "none") score -= 5;

      if (usableLanguage) score += 5;
      if (a.english === "basic") score -= 2;
      if (a.english === "unknown") score -= 2;

      if (a.age === "18-24") score += 5;
      if (a.age === "25-29") score += 3;
      if (a.age === "30-35") score += 1;
      if (a.age === "50plus") score -= 5;
      if (a.age === "under18") score -= 5;
      if (a.age === "unknown") score -= 2;

      if (a.jobOffer === "yes") score += 3;
      if (a.jobOffer === "maybe") score += 2;

      if (a.residence === "de") score += 2;
      if (a.residence === "unknown") score -= 2;

      if (a.currentStatus === "valid") score += 2;
      if (a.currentStatus === "student") score += 2;
      if (a.currentStatus === "expired") score -= 20;
      if (a.currentStatus === "unknown") score -= 2;

      if (a.immigrationHistory === "refusal") score -= 8;
      if (a.immigrationHistory === "overstay") score -= 18;
      if (a.immigrationHistory === "removed") score -= 25;
      if (a.immigrationHistory === "unknown") score -= 3;

      if (a.vwpRestrictions === "denied") score -= 8;
      if (a.vwpRestrictions === "restrictedTravel") score -= 5;
      if (a.vwpRestrictions === "unknown") score -= 2;

      break;
    }

    case "research": {
      if (!["research", "work"].includes(goal)) return 0;

      score = 20;

      if (a.workExperience === "research") score += 25;
      if (a.workExperience === "specialist") score += 10;
      if (a.workExperience === "3plus") score += 8;
      if (a.workExperience === "manager") score += 5;
      if (a.workExperience === "under3") score += 2;
      if (a.workExperience === "none") score -= 10;

      if (hasOffer) score += 25;
      if (a.jobOffer === "maybe") score += 10;
      if (a.jobOffer === "no") score -= 5;
      if (a.sponsor === "no" && hasOffer) score -= 5;

      if (a.education === "master") score += 15;
      if (a.education === "bachelor") score += 10;
      if (a.education === "vocational") score += 2;
      if (a.education === "school" || a.education === "none") score -= 10;

      if (strongAchievement) score += 10;
      if (someAchievement) score += 5;

      if (hasFunds) score += 5;
      if (a.funds === "no") score -= 8;

      if (usableLanguage) score += 3;
      if (a.english === "basic") score -= 2;
      if (a.english === "unknown") score -= 2;

      if (a.age === "18-24") score += 2;
      if (a.age === "25-29") score += 3;
      if (a.age === "30-35") score += 3;
      if (a.age === "50plus") score -= 2;
      if (a.age === "under18") score -= 20;
      if (a.age === "unknown") score -= 2;

      if (a.residence === "de") score += 2;
      if (a.residence === "unknown") score -= 2;

      if (a.currentStatus === "valid") score += 2;
      if (a.currentStatus === "student") score += 3;
      if (a.currentStatus === "work") score += 2;
      if (a.currentStatus === "expired") score -= 20;
      if (a.currentStatus === "unknown") score -= 2;

      if (a.immigrationHistory === "refusal") score -= 8;
      if (a.immigrationHistory === "overstay") score -= 18;
      if (a.immigrationHistory === "removed") score -= 25;
      if (a.immigrationHistory === "unknown") score -= 3;

      if (a.vwpRestrictions === "denied") score -= 8;
      if (a.vwpRestrictions === "restrictedTravel") score -= 5;
      if (a.vwpRestrictions === "unknown") score -= 2;

      break;
    }

    case "business": {
      if (goal !== "business") return 0;

      score = 20;

      if (a.business === "large") score += 25;
      if (a.business === "company") score += 25;
      if (a.business === "some") score += 10;
      if (a.business === "no") score -= 20;

      if (hasFunds) score += 15;
      if (a.funds === "no") score -= 20;

      if (experienced) score += 10;
      if (a.workExperience === "specialist") score += 3;
      if (a.workExperience === "none") score -= 5;

      if (a.education === "bachelor" || a.education === "master") score += 3;
      if (a.education === "vocational") score += 2;
      if (a.education === "none") score -= 3;

      if (strongAchievement) score += 5;
      if (someAchievement) score += 2;

      if (a.age === "18-24") score += 2;
      if (a.age === "25-29") score += 3;
      if (a.age === "30-35") score += 3;
      if (a.age === "50plus") score -= 2;
      if (a.age === "under18") score -= 25;
      if (a.age === "unknown") score -= 2;

      if (a.residence === "de") score += 2;
      if (a.residence === "unknown") score -= 2;

      if (a.currentStatus === "valid") score += 2;
      if (a.currentStatus === "work") score += 2;
      if (a.currentStatus === "student") score += 1;
      if (a.currentStatus === "expired") score -= 20;
      if (a.currentStatus === "unknown") score -= 2;

      if (a.immigrationHistory === "refusal") score -= 8;
      if (a.immigrationHistory === "overstay") score -= 18;
      if (a.immigrationHistory === "removed") score -= 25;
      if (a.immigrationHistory === "unknown") score -= 3;

      if (a.vwpRestrictions === "denied") score -= 8;
      if (a.vwpRestrictions === "restrictedTravel") score -= 5;
      if (a.vwpRestrictions === "unknown") score -= 2;

      break;
    }

    case "recognition": {
      if (!["work", "exchange"].includes(goal)) return 0;

      score = 20;

      if (a.education === "vocational") score += 25;
      if (a.education === "bachelor") score += 20;
      if (a.education === "master") score += 20;
      if (a.education === "school") score -= 5;
      if (a.education === "none") score -= 15;

      if (experienced) score += 15;
      if (a.workExperience === "specialist") score += 5;
      if (a.workExperience === "under3") score += 2;
      if (a.workExperience === "none") score -= 10;

      if (hasOffer) score += 5;
      if (a.jobOffer === "maybe") score += 2;

      if (a.exchangeOffer === "yes") score += 5;
      if (a.exchangeOffer === "no") score -= 2;

      if (usableLanguage) score += 3;
      if (a.english === "basic") score -= 2;
      if (a.english === "unknown") score -= 2;

      if (a.age === "18-24") score += 2;
      if (a.age === "25-29") score += 3;
      if (a.age === "30-35") score += 3;
      if (a.age === "50plus") score -= 2;
      if (a.age === "under18") score -= 20;
      if (a.age === "unknown") score -= 2;

      if (a.residence === "de") score += 2;
      if (a.residence === "unknown") score -= 2;

      if (a.currentStatus === "valid") score += 2;
      if (a.currentStatus === "work") score += 2;
      if (a.currentStatus === "student") score += 1;
      if (a.currentStatus === "expired") score -= 20;
      if (a.currentStatus === "unknown") score -= 2;

      if (a.immigrationHistory === "refusal") score -= 8;
      if (a.immigrationHistory === "overstay") score -= 18;
      if (a.immigrationHistory === "removed") score -= 25;
      if (a.immigrationHistory === "unknown") score -= 3;

      if (a.vwpRestrictions === "denied") score -= 8;
      if (a.vwpRestrictions === "restrictedTravel") score -= 5;
      if (a.vwpRestrictions === "unknown") score -= 2;

      break;
    }

    case "protection": {
      if (goal !== "protection" && a.protection !== "yes" && a.protection !== "unsure") {
        return 0;
      }

      score = 20;

      if (goal === "protection") score += 25;
      if (a.protection === "yes") score += 35;
      if (a.protection === "unsure") score += 10;
      if (a.protection === "no") score -= 25;

      if (a.birthCountry === "unknown") score -= 2;
      if (a.birthCountry === "other") score += 2;
      if (a.citizenship === "unknown") score -= 2;

      if (a.residence === "de") score += 2;
      if (a.residence === "unknown") score -= 2;

      if (a.currentStatus === "expired") score -= 5;
      if (a.currentStatus === "unknown") score -= 2;

      break;
    }

    default:
      return 0;
  }

  // Дополнительные общие поправки для релевантных маршрутов.
  // Гражданство и страна рождения не означают автоматически право на визу или защиту.
  if (
    ["bluecard", "work", "opportunity", "student", "family", "ausbildung", "research", "business", "recognition", "visitor"].includes(id)
  ) {
    if (a.immigrationHistory === "removed") score -= 5;
    if (a.currentStatus === "expired") score -= 3;
  }

  // Убираем незначительные случайные значения и держим процент в диапазоне 0–100.
  return Math.max(0, Math.min(100, Math.round(score)));
}

export default function DEPage() {
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

  const entryConcern =
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
    code="DE"
    name="Germany"
    className="h-12 w-18 rounded-md ring-1 ring-white/10"
  />
</div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
            {t("Иммиграционный навигатор", "Immigration navigator")}
          </p>
          <h1 className="mb-4 text-3xl font-bold md:text-5xl">
            {t("Переезд в Германию", "Move to Germany")}
          </h1>
          <p className="max-w-3xl leading-7 text-slate-300">
            {t(
              "Ответьте на вопросы, чтобы увидеть предварительно подходящие визовые и иммиграционные маршруты Германии. Навигатор учитывает цель поездки, гражданство, образование, опыт, предложение работы, семейные связи и другие обстоятельства.",
              "Answer the questions to explore potentially relevant German visa and immigration routes. The navigator considers travel purpose, nationality, education, experience, job offers, family relationships and other circumstances."
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
                  "Это предварительное сопоставление ваших ответов с общими характеристиками иммиграционных категорий. Процент не является официальным баллом, юридическим заключением или вероятностью одобрения.",
                  "This is a preliminary comparison of your answers with general immigration category characteristics. The percentage is not an official score, legal opinion or probability of approval."
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
                              "Важно: необходимость визы зависит от гражданства, цели и срока поездки. Для краткосрочных поездок обычно применяется правило 90 дней в течение 180 дней. Не используйте эту карточку как подтверждение права на въезд.",
                              "Important: visa requirements depend on nationality, purpose and duration. Short stays generally follow the 90-days-in-any-180-day-period rule. Do not treat this card as confirmation of entry eligibility."
                            )}
                          </p>
                        )}

                        {route.id === "bluecard" && (
                          <p className="mt-3 text-sm leading-6 text-amber-300">
                            {t(
                              "Важно: требования к зарплате и квалификации меняются. Проверьте действующие пороги и специальные условия на официальном сайте.",
                              "Important: salary thresholds and qualification requirements can change. Check current thresholds and special conditions on the official website."
                            )}
                          </p>
                        )}

                        {route.id === "opportunity" && (
                          <p className="mt-3 text-sm leading-6 text-amber-300">
                            {t(
                              "Важно: карта возможностей не гарантирует работу или дальнейший вид на жительство. Проверьте официальный список условий и требования к подтверждению средств.",
                              "Important: the Opportunity Card does not guarantee a job or a subsequent residence permit. Check the official eligibility rules and proof-of-funds requirements."
                            )}
                          </p>
                        )}

                        {route.id === "protection" && (
                          <p className="mt-3 text-sm leading-6 text-amber-300">
                            {t(
                              "Важно: это чувствительная юридическая процедура. Обратитесь к квалифицированной независимой консультационной службе или юристу, если это безопасно и доступно.",
                              "Important: this is a sensitive legal process. Consult a qualified independent advice service or lawyer if safe and available."
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

            {entryConcern && (
              <div className="mt-6 rounded-2xl border border-amber-300/20 bg-amber-300/5 p-4 text-sm leading-6 text-slate-300">
                <strong className="text-amber-200">
                  {t("Нужна дополнительная проверка требований", "Additional eligibility review needed")}
                </strong>
                <p className="mt-2">
                  {t(
                    "Ваш ответ указывает на обстоятельства, которые могут иметь значение при подаче заявления. Проверьте требования для своего гражданства и ситуации через официальные источники.",
                    "Your answer indicates circumstances that may matter for an application. Check the requirements for your nationality and situation through official sources."
                  )}
                </p>
                <a
                  className="mt-3 inline-block font-semibold text-blue-300 hover:text-blue-200"
                  href="https://www.auswaertiges-amt.de/en/visa-service"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("Официальная визовая информация", "Official visa information")} ↗
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
                      "Предыдущий отказ, нарушение условий пребывания или выдворение могут повлиять на новое заявление, но последствия зависят от обстоятельств. Перед подачей документов рассмотрите консультацию квалифицированного иммиграционного юриста.",
                      "A previous refusal, residence violation or removal may affect a new application, but the consequences depend on the circumstances. Consider qualified immigration advice before applying."
                    )}
                  </p>
                </div>
              )}

            {answers.currentStatus === "expired" && (
              <div className="mt-6 rounded-2xl border border-amber-300/20 bg-amber-300/5 p-4 text-sm leading-6 text-slate-300">
                <strong className="text-amber-200">
                  {t("Возможная проблема с документами", "Potential document or status issue")}
                </strong>
                <p className="mt-2">
                  {t(
                    "Если вы уже находитесь в Германии и срок действия документов или разрешённого пребывания истёк, последствия могут быть серьёзными. Не полагайтесь на результат анкеты — обратитесь за индивидуальной юридической консультацией.",
                    "If you are already in Germany and your documents or authorised stay have expired, the consequences may be serious. Do not rely on this questionnaire; seek individual legal advice."
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
                  "Иммиграционные правила, сборы, требования к зарплате и финансовому обеспечению, сроки обработки заявлений и визовые ограничения могут меняться. Гражданам ЕС/ЕЭЗ и Швейцарии могут применяться другие правила, чем гражданам третьих стран. Этот навигатор не является юридической консультацией и не проверяет автоматически все требования.",
                  "Immigration rules, fees, salary and financial requirements, processing times and visa restrictions can change. Different rules may apply to EU/EEA and Swiss citizens compared with third-country nationals. This navigator is not legal advice and does not automatically verify every requirement."
                )}
              </p>
              <div className="mt-3 flex flex-wrap gap-4">
                <a
                  href="https://www.make-it-in-germany.com/en/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-300 hover:text-blue-200"
                >
                  Make it in Germany ↗
                </a>
                <a
                  href="https://www.auswaertiges-amt.de/en/visa-service"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-300 hover:text-blue-200"
                >
                  {t("МИД Германии", "Federal Foreign Office")} ↗
                </a>
                <a
                  href="https://www.bamf.de/EN/Startseite/startseite_node.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-300 hover:text-blue-200"
                >
                  BAMF ↗
                </a>
              </div>
            </div>
          </section>
        </div>

        <footer className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-slate-500">
          {t("Иммиграционный навигатор Германии", "Germany Immigration Navigator")} ·{" "}
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
