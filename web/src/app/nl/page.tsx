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
  { value: "in", ru: "🇮🇳 Индия", en: "🇮🇳 India" },
  { value: "cn", ru: "🇨🇳 Китай", en: "🇨🇳 China" },
  { value: "tr", ru: "🇹🇷 Турция", en: "🇹🇷 Turkey" },
  { value: "us", ru: "🇺🇸 США", en: "🇺🇸 United States" },
  { value: "ca", ru: "🇨🇦 Канада", en: "🇨🇦 Canada" },
  { value: "uk", ru: "🇬🇧 Великобритания", en: "🇬🇧 United Kingdom" },
  { value: "au", ru: "🇦🇺 Австралия", en: "🇦🇺 Australia" },
  { value: "de", ru: "🇩🇪 Германия", en: "🇩🇪 Germany" },
  { value: "fr", ru: "🇫🇷 Франция", en: "🇫🇷 France" },
  { value: "pl", ru: "🇵🇱 Польша", en: "🇵🇱 Poland" },
  { value: "cz", ru: "🇨🇿 Чехия", en: "🇨🇿 Czechia" },
  { value: "otherEU", ru: "Другая страна ЕС / ЕЭЗ", en: "Another EU / EEA country" },
  { value: "other", ru: "Другая страна", en: "Another country" },
  { value: "unknown", ru: "Не хочу указывать", en: "Prefer not to say" },
];

const questions: Question[] = [
  {
    id: "goal",
    ru: "Какова ваша главная цель?",
    en: "What is your main goal?",
    options: [
      { value: "work", ru: "Работа в Нидерландах", en: "Work in the Netherlands" },
      { value: "study", ru: "Учёба", en: "Study" },
      { value: "business", ru: "Бизнес или предпринимательство", en: "Business or entrepreneurship" },
      { value: "family", ru: "Переезд к семье или партнёру", en: "Join family or partner" },
      { value: "permanent", ru: "Долгосрочное или постоянное проживание", en: "Long-term or permanent residence" },
      { value: "visit", ru: "Туризм, гости или деловая поездка", en: "Tourism, visiting or business trip" },
      { value: "exchange", ru: "Стажировка, исследование или программа обмена", en: "Internship, research or exchange programme" },
      { value: "protection", ru: "Поиск международной защиты", en: "Seeking international protection" },
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
      { value: "tr", ru: "Турция", en: "Turkey" },
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
      { value: "pl", ru: "Польша", en: "Poland" },
      { value: "de", ru: "Германия", en: "Germany" },
      { value: "be", ru: "Бельгия", en: "Belgium" },
      { value: "fr", ru: "Франция", en: "France" },
      { value: "uk", ru: "Великобритания", en: "United Kingdom" },
      { value: "otherEU", ru: "Другая страна ЕС / ЕЭЗ", en: "Another EU / EEA country" },
      { value: "us", ru: "США", en: "United States" },
      { value: "other", ru: "Другая страна", en: "Another country" },
      { value: "unknown", ru: "Не хочу указывать", en: "Prefer not to say" },
    ],
  },
  {
    id: "english",
    ru: "Какой у вас уровень английского языка?",
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
    ru: "Есть ли предложение работы от работодателя в Нидерландах?",
    en: "Do you have a job offer from an employer in the Netherlands?",
    options: [
      { value: "yes", ru: "Да", en: "Yes" },
      { value: "no", ru: "Нет", en: "No" },
      { value: "maybe", ru: "Веду переговоры", en: "In discussion" },
    ],
  },
  {
    id: "sponsor",
    ru: "Является ли работодатель признанным спонсором IND или готов ли он оформить разрешение?",
    en: "Is the employer an IND-recognised sponsor or willing to arrange the relevant permit?",
    options: [
      { value: "yes", ru: "Да, признанный спонсор / готов оформить", en: "Yes, recognised sponsor / willing to apply" },
      { value: "no", ru: "Нет", en: "No" },
      { value: "unknown", ru: "Не знаю", en: "Not sure" },
      { value: "na", ru: "Нет предложения работы", en: "No job offer" },
    ],
  },
  {
    id: "studentOffer",
    ru: "Есть ли зачисление или предложение от учебного заведения в Нидерландах?",
    en: "Have you been accepted by an educational institution in the Netherlands?",
    options: [
      { value: "yes", ru: "Да", en: "Yes" },
      { value: "no", ru: "Нет", en: "No" },
      { value: "applying", ru: "Планирую подать документы", en: "Planning to apply" },
    ],
  },
  {
    id: "exchangeOffer",
    ru: "Есть ли приглашение на стажировку, исследование или программу обмена?",
    en: "Do you have an offer for an internship, research position or exchange programme?",
    options: [
      { value: "yes", ru: "Да", en: "Yes" },
      { value: "no", ru: "Нет", en: "No" },
      { value: "unknown", ru: "Не знаю", en: "Not sure" },
    ],
  },
  {
    id: "familyUS",
    ru: "Есть ли у вас близкий родственник или партнёр в Нидерландах?",
    en: "Do you have a close relative or partner in the Netherlands?",
    options: [
      { value: "citizen", ru: "Супруг(-а) или партнёр — гражданин Нидерландов", en: "Spouse or partner is a Dutch citizen" },
      { value: "resident", ru: "Партнёр или родственник имеет ВНЖ Нидерландов", en: "Partner or relative has Dutch residence status" },
      { value: "child", ru: "Речь о несовершеннолетнем ребёнке или родителе", en: "The case involves a minor child or parent" },
      { value: "no", ru: "Нет", en: "No" },
      { value: "unknown", ru: "Не уверен(-а)", en: "Not sure" },
    ],
  },
  {
    id: "achievements",
    ru: "Есть ли у вас квалификация, научные или профессиональные достижения?",
    en: "Do you have notable qualifications, academic or professional achievements?",
    options: [
      { value: "strong", ru: "Да: значимые публикации, награды, признание или достижения", en: "Yes: significant publications, awards, recognition or achievements" },
      { value: "some", ru: "Есть достижения, но не знаю, подходят ли они", en: "Some achievements, but unsure if they qualify" },
      { value: "no", ru: "Нет", en: "No" },
    ],
  },
  {
    id: "business",
    ru: "Каковы ваши планы в отношении бизнеса?",
    en: "What are your business plans?",
    options: [
      { value: "large", ru: "Есть финансирование и конкретный инвестиционный план", en: "I have funding and a concrete investment plan" },
      { value: "some", ru: "Есть бизнес-план или идея стартапа", en: "I have a business plan or startup idea" },
      { value: "company", ru: "У меня есть компания за пределами Нидерландов", en: "I own or work for a company outside the Netherlands" },
      { value: "no", ru: "Не планирую бизнес", en: "No business plans" },
    ],
  },
  {
    id: "visitPurpose",
    ru: "Что вы планируете делать во время краткой поездки?",
    en: "What do you plan to do during a short visit?",
    options: [
      { value: "tourism", ru: "Туризм, отдых, посещение друзей или семьи", en: "Tourism, vacation, visiting friends or family" },
      { value: "business", ru: "Деловые встречи или конференция без трудоустройства", en: "Business meetings or a conference without employment" },
      { value: "medical", ru: "Получение медицинской помощи", en: "Medical treatment" },
      { value: "transit", ru: "Транзит через Нидерланды", en: "Transit through the Netherlands" },
      { value: "other", ru: "Другая цель", en: "Another purpose" },
    ],
  },
  {
    id: "visitDuration",
    ru: "Как долго планируете находиться в Нидерландах?",
    en: "How long do you plan to stay in the Netherlands?",
    options: [
      { value: "under90", ru: "До 90 дней в течение 180 дней", en: "Up to 90 days in any 180-day period" },
      { value: "over90", ru: "Более 90 дней", en: "More than 90 days" },
      { value: "unsure", ru: "Пока не знаю", en: "Not sure yet" },
    ],
  },
  {
    id: "passport",
    ru: "Есть ли у вас действующий паспорт для поездки?",
    en: "Do you have a valid passport for travel?",
    options: [
      { value: "yes", ru: "Да", en: "Yes" },
      { value: "no", ru: "Нет", en: "No" },
      { value: "unknown", ru: "Не уверен(-а)", en: "Not sure" },
    ],
  },
  {
    id: "vwpRestrictions",
    ru: "Были ли у вас отказы в визах, превышение срока пребывания или запрет на въезд в Шенген?",
    en: "Have you had visa refusals, overstayed in the Schengen Area or received an entry ban?",
    options: [
      { value: "none", ru: "Насколько мне известно, нет", en: "Not to my knowledge" },
      { value: "refused", ru: "Был отказ в визе", en: "I have had a visa refusal" },
      { value: "overstay", ru: "Превышал(-а) разрешённый срок пребывания", en: "I have overstayed an authorised stay" },
      { value: "ban", ru: "Есть или был запрет на въезд", en: "I have or had an entry ban" },
      { value: "unknown", ru: "Не уверен(-а)", en: "Not sure" },
    ],
  },
  {
    id: "funds",
    ru: "Можете ли вы подтвердить средства на поездку, учёбу или проживание?",
    en: "Can you document sufficient funds for your trip, studies or stay?",
    options: [
      { value: "yes", ru: "Да", en: "Yes" },
      { value: "sponsor", ru: "Есть финансовый спонсор", en: "I have a financial sponsor" },
      { value: "no", ru: "Пока нет", en: "Not yet" },
    ],
  },
  {
    id: "immigrationHistory",
    ru: "Были ли отказы в визах, нарушения миграционных правил или выдворение?",
    en: "Have you had visa refusals, immigration violations or removal?",
    options: [
      { value: "none", ru: "Нет", en: "No" },
      { value: "refusal", ru: "Был отказ в визе или ВНЖ", en: "Visa or residence permit refusal" },
      { value: "overstay", ru: "Превышение срока пребывания или нарушение условий", en: "Overstay or violation of conditions" },
      { value: "removed", ru: "Депортация, выдворение или запрет на въезд", en: "Deportation, removal or entry ban" },
      { value: "unknown", ru: "Не уверен(-а) / не хочу указывать", en: "Not sure / prefer not to say" },
    ],
  },
  {
    id: "currentStatus",
    ru: "Каков ваш текущий статус, если вы уже находитесь в Нидерландах?",
    en: "What is your current status if you are already in the Netherlands?",
    options: [
      { value: "abroad", ru: "Нахожусь за пределами Нидерландов", en: "I am outside the Netherlands" },
      { value: "valid", ru: "Есть действующий ВНЖ или разрешение на пребывание", en: "I have valid residence or stay permission" },
      { value: "student", ru: "Учебный ВНЖ", en: "Student residence permit" },
      { value: "work", ru: "Рабочий ВНЖ", en: "Work residence permit" },
      { value: "expired", ru: "Статус истёк или ситуация сложная", en: "My status expired or my situation is complicated" },
      { value: "unknown", ru: "Не уверен(-а)", en: "Not sure" },
    ],
  },
  {
    id: "protection",
    ru: "Связана ли ваша ситуация с опасением преследования или серьёзной опасности в стране происхождения?",
    en: "Does your situation involve fear of persecution or serious harm in your country of origin?",
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
    title: "Краткосрочная поездка в Шенген",
    enTitle: "Short-stay Schengen visit",
    visa: "Шенгенская виза C / безвизовый въезд, если применимо",
    desc: "Для туризма, посещения друзей или семьи, деловых встреч и других разрешённых краткосрочных целей.",
    enDesc: "For tourism, visiting friends or family, business meetings and other permitted short-stay purposes.",
    link: "https://www.netherlandsworldwide.nl/visa-the-netherlands/schengen-visa",
    requirements: "Для краткосрочного пребывания обычно действует ограничение до 90 дней в течение любого 180-дневного периода. Необходимость визы зависит прежде всего от гражданства и обстоятельств поездки. Потребуются действующий проездной документ, цель поездки и подтверждение средств и других применимых условий. Краткосрочный въезд не даёт общего права работать.",
    enRequirements: "Short stays are generally limited to 90 days in any 180-day period. Whether a visa is required depends primarily on nationality and travel circumstances. A valid travel document, purpose of travel, funds and other applicable requirements may be needed. Short-stay entry does not provide a general right to work.",
    goals: ["visit"],
  },
  {
    id: "highlySkilled",
    emoji: "💼",
    title: "ВНЖ для высококвалифицированного мигранта",
    enTitle: "Highly skilled migrant residence permit",
    visa: "Highly skilled migrant",
    desc: "Для специалистов, которые приезжают работать к работодателю в Нидерландах, признанному спонсором IND.",
    enDesc: "For professionals coming to work for an employer in the Netherlands that is recognised by the IND as a sponsor.",
    link: "https://ind.nl/en/residence-permits/work/highly-skilled-migrant",
    requirements: "Обычно необходимы трудовой договор с признанным IND спонсором, соответствие установленному уровню дохода и рыночной зарплате, а также выполнение общих требований. Размеры зарплатных критериев меняются; проверяйте актуальные значения IND.",
    enRequirements: "Usually requires an employment contract with an IND-recognised sponsor, meeting the applicable income threshold and market-rate salary requirements, and satisfying general conditions. Salary thresholds change; check the current IND criteria.",
    goals: ["work", "permanent"],
  },
  {
    id: "blueCard",
    emoji: "🌐",
    title: "Европейская голубая карта",
    enTitle: "European Blue Card",
    visa: "EU Blue Card",
    desc: "Вариант разрешения на проживание и работу для высококвалифицированных специалистов из стран вне ЕС, ЕЭЗ и Швейцарии.",
    enDesc: "A residence and work permit option for highly qualified professionals from outside the EU, EEA and Switzerland.",
    link: "https://ind.nl/en/residence-permits/work/european-blue-card-residence-permit",
    requirements: "Обычно требуются квалифицируемое предложение высококвалифицированной работы, подходящее высшее образование или соответствующий опыт, договор требуемой продолжительности и зарплата, соответствующая критериям IND. В отличие от маршрута highly skilled migrant, работодатель не всегда должен быть признанным спонсором.",
    enRequirements: "Usually requires a qualifying highly skilled job offer, suitable higher education or relevant experience, a contract of the required duration and salary meeting IND criteria. Unlike the highly skilled migrant route, the employer does not always need to be a recognised sponsor.",
    goals: ["work", "permanent"],
  },
  {
    id: "study",
    emoji: "🎓",
    title: "ВНЖ для учёбы",
    enTitle: "Student residence permit",
    visa: "Study residence permit",
    desc: "Для обучения в подходящем университете или другом признанном учебном заведении Нидерландов.",
    enDesc: "For study at an eligible university or other recognised educational institution in the Netherlands.",
    link: "https://ind.nl/en/residence-permits/study/student-residence-permit-for-university-or-higher-professional-education",
    requirements: "Обычно необходимо зачисление в учебное заведение, которое может выступать признанным спонсором, выполнение условий программы и подтверждение достаточных средств. Условия для других видов обучения могут отличаться. Зачисление само по себе не гарантирует ВНЖ.",
    enRequirements: "Usually requires admission to an educational institution that can act as a recognised sponsor, meeting programme conditions and proving sufficient funds. Requirements for other types of education may differ. Admission alone does not guarantee a residence permit.",
    goals: ["study"],
  },
  {
    id: "family",
    emoji: "👨‍👩‍👧",
    title: "Воссоединение с семьёй или партнёром",
    enTitle: "Family or partner residence",
    visa: "Residence permit for a partner or family member",
    desc: "Для определённых супругов, зарегистрированных или соответствующих требованиям незарегистрированных партнёров и членов семьи человека, проживающего в Нидерландах.",
    enDesc: "For eligible spouses, registered or qualifying unmarried partners, and family members of a person living in the Netherlands.",
    link: "https://ind.nl/en/residence-permits/family-and-partner",
    requirements: "Требования зависят от отношений, возраста, гражданства и статуса человека, к которому планируется переезд. Могут потребоваться доказательства подлинности отношений, дохода спонсора и выполнения интеграционных или иных требований. Не каждый родственник имеет право на семейный ВНЖ.",
    enRequirements: "Requirements depend on the relationship, age, nationality and status of the person you intend to join. Evidence of a genuine relationship, sponsor income and integration or other requirements may apply. Not every relative qualifies for family residence.",
    goals: ["family", "permanent"],
  },
  {
    id: "orientation",
    emoji: "🧭",
    title: "Год ориентации для поиска работы",
    enTitle: "Orientation year for highly educated persons",
    visa: "Orientation year residence permit",
    desc: "Для определённых выпускников, докторов и исследователей, соответствующих условиям программы, чтобы искать работу или начинать профессиональную деятельность.",
    enDesc: "For eligible graduates, doctoral graduates and researchers to look for work or start professional activities.",
    link: "https://ind.nl/en/residence-permits/work/residence-permit-for-orientation-year",
    requirements: "Право зависит от типа и даты окончания учёбы или исследования и других критериев IND. Подходят не все зарубежные дипломы. Разрешение обычно ограничено по сроку; проверьте актуальные критерии и возможность перехода на другой вид ВНЖ.",
    enRequirements: "Eligibility depends on the type and date of study or research completion and other IND criteria. Not every foreign degree qualifies. The permit is time-limited; check current criteria and options for switching to another residence permit.",
    goals: ["work", "permanent"],
  },
  {
    id: "business",
    emoji: "📈",
    title: "Предпринимательство или стартап",
    enTitle: "Self-employment or startup residence",
    visa: "Self-employed person / Start-up",
    desc: "Для предпринимателей, которые хотят развивать бизнес в Нидерландах и могут соответствовать требованиям выбранной категории.",
    enDesc: "For entrepreneurs who want to develop a business in the Netherlands and can meet the requirements of the chosen category.",
    link: "https://ind.nl/en/residence-permits/work",
    requirements: "Условия зависят от категории. Для самостоятельной предпринимательской деятельности могут оцениваться существенный интерес для экономики Нидерландов, бизнес-план, опыт и финансовая устойчивость. Для стартапа действуют отдельные критерии и требования к сопровождающему посреднику. Наличие капитала или идеи само по себе не гарантирует разрешение.",
    enRequirements: "Requirements depend on the category. Self-employment applications may be assessed on their added value to the Dutch economy, business plan, experience and financial viability. Start-up permits have separate criteria and facilitator requirements. Capital or an idea alone does not guarantee approval.",
    goals: ["business"],
  },
  {
    id: "exchange",
    emoji: "🔬",
    title: "Исследование, стажировка или обмен",
    enTitle: "Research, internship or exchange",
    visa: "Research / exchange / work experience",
    desc: "Для подходящих исследователей, участников программ обмена и стажёров, если конкретная программа предусматривает соответствующий вид разрешения.",
    enDesc: "For eligible researchers, exchange participants and trainees where the specific programme provides an appropriate permit route.",
    link: "https://ind.nl/en/residence-permits/work",
    requirements: "Необходимы подходящее приглашение или договор и выполнение требований соответствующей категории. Для отдельных маршрутов организация должна быть признанным спонсором IND. Стажировка или исследовательская работа не всегда оформляются одинаково.",
    enRequirements: "A suitable invitation or contract and compliance with the relevant category requirements are needed. Some routes require the organisation to be an IND-recognised sponsor. Internships and research positions do not all use the same permit route.",
    goals: ["exchange", "work"],
  },
  {
    id: "protection",
    emoji: "🛡️",
    title: "Убежище и международная защита",
    enTitle: "Asylum and international protection",
    visa: "Отдельная юридическая процедура",
    desc: "Это не обычная виза для переезда. Возможность обратиться за защитой и применимая процедура зависят от индивидуальных обстоятельств и действующего законодательства.",
    enDesc: "This is not an ordinary migration visa. Access to protection and the applicable procedure depend on individual circumstances and current law.",
    link: "https://ind.nl/en/residence-permits/asylum",
    requirements: "Требуется индивидуальная оценка ситуации. Применяться могут специальные правила ответственности за рассмотрение заявления, сроки и процессуальные требования. Этот навигатор не определяет право на убежище и не заменяет юридическую помощь.",
    enRequirements: "An individual assessment is necessary. Special rules on responsibility for examining the application, deadlines and procedural requirements may apply. This navigator cannot determine asylum eligibility or replace legal assistance.",
    goals: ["protection"],
  },
];

function getScore(id: string, a: Answers): number {
  const goal = a.goal;

  const hasFamily = ["citizen", "resident", "child"].includes(a.familyUS);
  const hasOffer = a.jobOffer === "yes";
  const sponsorReady = a.sponsor === "yes";
  const hasFunds = ["yes", "sponsor"].includes(a.funds);

  const hasRelevantExperience = [
    "3plus",
    "specialist",
    "manager",
    "research",
  ].includes(a.workExperience);

  const hasHigherEducation = ["bachelor", "master"].includes(a.education);

  const isEU = ["otherEU", "de", "fr", "pl", "be"].includes(a.citizenship);
  const isDutchCitizen = a.citizenship === "nl";
  const isNonEU = !isEU && !isDutchCitizen && a.citizenship !== "unknown";

  const hasImmigrationConcern =
    ["refusal", "overstay", "removed"].includes(a.immigrationHistory) ||
    ["refused", "overstay", "ban"].includes(a.vwpRestrictions);

  const seriousImmigrationConcern =
    ["overstay", "removed"].includes(a.immigrationHistory) ||
    ["overstay", "ban"].includes(a.vwpRestrictions);

  const hasValidPassport = a.passport === "yes";
  const hasLanguageSkills = ["intermediate", "advanced", "native"].includes(
    a.english
  );

  const ageKnown = a.age && a.age !== "unknown";
  const isMinor = a.age === "under18";

  const hasCurrentDutchStatus = ["valid", "student", "work"].includes(
    a.currentStatus
  );

  const hasStudyPotential =
    a.education !== "none" &&
    a.education !== "" &&
    !isMinor;

  const hasBusinessPotential = ["large", "some", "company"].includes(
    a.business
  );

  const hasStrongProfile =
    hasHigherEducation ||
    hasRelevantExperience ||
    a.achievements === "strong";

  const goalMatch: Record<string, string[]> = {
    visitor: ["visit"],
    highlySkilled: ["work", "permanent"],
    blueCard: ["work", "permanent"],
    study: ["study"],
    family: ["family", "permanent"],
    orientation: ["work", "permanent"],
    business: ["business"],
    exchange: ["exchange", "work"],
    protection: ["protection"],
  };

  if (!goal || goal === "unsure") return 0;

  if (id !== "protection" && !goalMatch[id]?.includes(goal)) {
    // Не скрываем альтернативы полностью, если ответы показывают,
    // что маршрут всё же может быть релевантен.
    const alternativeRelevant =
      (id === "family" && hasFamily) ||
      (id === "study" && a.studentOffer === "yes") ||
      (id === "exchange" && a.exchangeOffer === "yes") ||
      (id === "highlySkilled" && hasOffer && sponsorReady) ||
      (id === "blueCard" && hasOffer && hasHigherEducation) ||
      (id === "business" && hasBusinessPotential);

    if (!alternativeRelevant) return 0;
  }

  let score = 0;

  switch (id) {
    case "visitor": {
      if (goal !== "visit") {
        score = 10;
        if (
          a.visitDuration === "under90" &&
          ["tourism", "business", "medical", "transit", "other"].includes(
            a.visitPurpose
          )
        ) {
          score += 5;
        }
      } else {
        score = 35;

        if (a.visitDuration === "under90") score += 15;
        if (a.visitDuration === "over90") score -= 30;
        if (a.visitPurpose === "tourism") score += 5;
        if (a.visitPurpose === "business") score += 5;
        if (a.visitPurpose === "medical") score += 3;
        if (a.visitPurpose === "transit") score += 2;

        if (hasValidPassport) score += 10;
        if (a.passport === "no") score -= 25;

        if (hasFunds) score += 12;
        if (a.funds === "no") score -= 12;

        if (isEU) score += 8;
        if (isNonEU) score += 2;

        if (a.residence === "otherEU") score += 3;
        if (["ru", "by", "ua", "kz", "uz"].includes(a.citizenship)) {
          score -= 2;
        }

        if (hasImmigrationConcern) score -= 15;
        if (seriousImmigrationConcern) score -= 20;

        if (a.currentStatus === "expired") score -= 10;
        if (a.currentStatus === "unknown") score -= 2;

        if (a.age === "under18") score -= 3;
        if (ageKnown && !isMinor) score += 2;
      }

      break;
    }

    case "highlySkilled": {
      score = 15;

      if (hasOffer) score += 25;
      if (a.jobOffer === "maybe") score += 10;
      if (sponsorReady) score += 25;
      if (a.sponsor === "unknown") score += 5;
      if (a.sponsor === "no") score -= 15;

      if (hasRelevantExperience) score += 12;
      if (a.workExperience === "specialist") score += 5;
      if (a.workExperience === "manager") score += 3;
      if (hasHigherEducation) score += 8;
      if (a.education === "master") score += 3;
      if (hasLanguageSkills) score += 3;

      if (a.achievements === "strong") score += 4;
      if (a.achievements === "some") score += 2;

      if (isEU) score -= 8;
      if (isNonEU) score += 3;

      if (a.age === "under18") score -= 20;
      if (a.age === "18-24") score += 2;
      if (a.age === "25-29" || a.age === "30-35") score += 4;
      if (a.age === "50plus") score -= 2;

      if (a.residence === "otherEU") score += 2;
      if (a.currentStatus === "work") score += 3;
      if (hasImmigrationConcern) score -= 12;
      if (seriousImmigrationConcern) score -= 18;

      if (a.funds === "no") score -= 3;
      if (a.funds === "yes" || a.funds === "sponsor") score += 2;

      break;
    }

    case "blueCard": {
      score = 12;

      if (hasOffer) score += 25;
      if (a.jobOffer === "maybe") score += 8;
      if (hasHigherEducation) score += 20;
      if (a.education === "master") score += 4;
      if (a.workExperience === "specialist") score += 12;
      if (a.workExperience === "research") score += 8;
      if (a.workExperience === "manager") score += 5;
      if (a.workExperience === "3plus") score += 5;
      if (hasLanguageSkills) score += 3;
      if (a.achievements === "strong") score += 5;
      if (a.achievements === "some") score += 2;

      if (hasFunds) score += 3;
      if (a.funds === "no") score -= 3;

      if (isEU) score -= 10;
      if (isNonEU) score += 5;

      if (a.age === "under18") score -= 20;
      if (a.age === "25-29" || a.age === "30-35") score += 3;
      if (a.age === "50plus") score -= 2;

      if (a.currentStatus === "work") score += 3;
      if (a.residence === "otherEU") score += 2;

      if (hasImmigrationConcern) score -= 12;
      if (seriousImmigrationConcern) score -= 18;

      break;
    }

    case "study": {
      score = 20;

      if (a.studentOffer === "yes") score += 35;
      if (a.studentOffer === "applying") score += 20;
      if (a.studentOffer === "no") score -= 5;

      if (hasFunds) score += 15;
      if (a.funds === "no") score -= 15;

      if (hasStudyPotential) score += 5;
      if (a.education === "master") score += 3;
      if (a.education === "none") score -= 8;

      if (hasLanguageSkills) score += 5;
      if (a.english === "basic") score -= 3;

      if (isEU) score -= 5;
      if (isNonEU) score += 3;

      if (a.age === "under18") score -= 5;
      if (a.age === "18-24") score += 5;
      if (a.age === "25-29") score += 3;
      if (a.age === "50plus") score -= 3;

      if (a.currentStatus === "student") score += 5;
      if (a.currentStatus === "expired") score -= 10;

      if (hasImmigrationConcern) score -= 12;
      if (seriousImmigrationConcern) score -= 18;

      break;
    }

    case "family": {
      score = 10;

      if (hasFamily) score += 45;
      if (a.familyUS === "citizen") score += 10;
      if (a.familyUS === "resident") score += 7;
      if (a.familyUS === "child") score += 5;
      if (a.familyUS === "no") score -= 15;
      if (a.familyUS === "unknown") score -= 2;

      if (goal === "family") score += 20;
      if (a.sponsor === "yes") score += 2;
      if (hasFunds) score += 3;
      if (a.funds === "no") score -= 3;

      if (isEU) score -= 3;
      if (isNonEU) score += 2;

      if (a.age === "under18") score -= 5;
      if (a.currentStatus === "valid") score += 3;
      if (a.currentStatus === "expired") score -= 10;

      if (hasImmigrationConcern) score -= 12;
      if (seriousImmigrationConcern) score -= 18;

      break;
    }

    case "orientation": {
      score = 10;

      if (hasHigherEducation) score += 20;
      if (a.education === "master") score += 5;
      if (a.workExperience === "research") score += 15;
      if (a.workExperience === "specialist") score += 10;
      if (hasRelevantExperience) score += 8;
      if (a.achievements === "strong") score += 12;
      if (a.achievements === "some") score += 5;
      if (a.studentOffer === "yes") score += 3;
      if (hasLanguageSkills) score += 3;

      if (isEU) score -= 8;
      if (isNonEU) score += 2;

      if (a.age === "under18") score -= 20;
      if (a.age === "25-29" || a.age === "30-35") score += 3;
      if (a.age === "50plus") score -= 2;

      if (a.currentStatus === "student") score += 5;
      if (a.currentStatus === "expired") score -= 10;

      if (hasImmigrationConcern) score -= 10;
      if (seriousImmigrationConcern) score -= 15;

      break;
    }

    case "business": {
      score = 15;

      if (a.business === "large") score += 30;
      if (a.business === "some") score += 20;
      if (a.business === "company") score += 15;
      if (a.business === "no") score -= 15;

      if (hasFunds) score += 12;
      if (a.funds === "no") score -= 12;

      if (a.workExperience === "manager") score += 8;
      if (a.workExperience === "specialist") score += 5;
      if (a.workExperience === "3plus") score += 4;
      if (hasHigherEducation) score += 4;
      if (a.achievements === "strong") score += 5;
      if (a.achievements === "some") score += 2;

      if (isEU) score -= 5;
      if (isNonEU) score += 2;

      if (a.age === "under18") score -= 20;
      if (a.age === "25-29" || a.age === "30-35") score += 3;
      if (a.age === "50plus") score -= 2;

      if (a.currentStatus === "expired") score -= 10;
      if (hasImmigrationConcern) score -= 10;
      if (seriousImmigrationConcern) score -= 15;

      break;
    }

    case "exchange": {
      score = 10;

      if (a.exchangeOffer === "yes") score += 35;
      if (a.exchangeOffer === "unknown") score += 5;
      if (a.exchangeOffer === "no") score -= 5;

      if (goal === "exchange") score += 20;
      if (a.workExperience === "research") score += 10;
      if (a.workExperience === "specialist") score += 5;
      if (hasHigherEducation) score += 5;
      if (a.education === "master") score += 3;
      if (hasLanguageSkills) score += 5;

      if (isEU) score -= 3;
      if (isNonEU) score += 2;

      if (a.age === "under18") score -= 10;
      if (a.age === "18-24") score += 4;
      if (a.age === "25-29") score += 3;
      if (a.age === "50plus") score -= 3;

      if (a.currentStatus === "student") score += 5;
      if (a.currentStatus === "expired") score -= 10;

      if (hasImmigrationConcern) score -= 10;
      if (seriousImmigrationConcern) score -= 15;

      break;
    }

    case "protection": {
      score = 5;

      if (a.protection === "yes") score += 55;
      if (a.protection === "unsure") score += 25;
      if (a.protection === "no") score -= 15;

      if (goal === "protection") score += 20;

      if (["ru", "ua", "by", "other"].includes(a.birthCountry)) score += 2;
      if (a.birthCountry === "unknown") score -= 1;

      if (a.citizenship === "unknown") score -= 1;
      if (a.residence === "otherEU") score += 2;

      if (a.currentStatus === "expired") score += 2;
      if (a.currentStatus === "unknown") score -= 1;

      break;
    }

    default:
      return 0;
  }

  // Дополнительная корректировка для общих факторов, применимых
  // к большинству маршрутов.
  if (id !== "protection") {
    if (a.passport === "no") score -= 3;
    if (a.passport === "unknown") score -= 1;

    if (a.immigrationHistory === "unknown") score -= 1;
    if (a.vwpRestrictions === "unknown") score -= 1;

    if (a.residence === "unknown") score -= 1;
    if (a.citizenship === "unknown") score -= 1;
    if (a.birthCountry === "unknown") score -= 1;
    if (a.age === "unknown") score -= 1;
    if (a.english === "unknown") score -= 1;
    if (a.currentStatus === "unknown") score -= 1;

    if (a.immigrationHistory === "refusal") score -= 5;
    if (a.immigrationHistory === "overstay") score -= 12;
    if (a.immigrationHistory === "removed") score -= 18;

    if (a.vwpRestrictions === "refused") score -= 4;
    if (a.vwpRestrictions === "overstay") score -= 12;
    if (a.vwpRestrictions === "ban") score -= 18;

    if (a.residence === "ru" || a.residence === "by") score -= 1;
    if (a.residence === "other") score -= 1;
    if (a.residence === "uk" || a.residence === "us") score += 1;

    if (a.citizenship === "ru" || a.citizenship === "by") score -= 1;
    if (a.citizenship === "uk" || a.citizenship === "us") score += 1;

    if (a.birthCountry === "ru" || a.birthCountry === "by") score -= 1;

    if (a.age === "18-24") score += 1;
    if (a.age === "36-49") score += 1;
    if (a.age === "50plus") score -= 1;

    if (a.english === "advanced" || a.english === "native") score += 2;
    if (a.english === "basic") score -= 1;

    if (a.education === "none") score -= 2;
    if (a.education === "master") score += 1;

    if (a.workExperience === "none") score -= 2;
    if (a.workExperience === "under3") score -= 1;

    if (a.achievements === "strong") score += 1;
    if (a.achievements === "no") score -= 1;

    if (a.studentOffer === "no") score -= 1;
    if (a.exchangeOffer === "no") score -= 1;

    if (a.familyUS === "unknown") score -= 1;

    if (a.sponsor === "no" && hasOffer) score -= 3;
    if (a.sponsor === "unknown" && hasOffer) score -= 1;

    if (a.visitPurpose === "other") score -= 1;
    if (a.visitDuration === "unsure") score -= 1;

    if (a.funds === "no") score -= 2;

    if (a.protection === "unsure") score -= 1;
  }

  // Итоговая оценка ограничена диапазоном 0–100.
  return Math.max(0, Math.min(100, Math.round(score)));
}

export default function NetherlandsPage() {
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

  const schengenConcern =
    answers.goal === "visit" &&
    answers.vwpRestrictions &&
    !["none", "unknown"].includes(answers.vwpRestrictions);

  return (
    <main className="min-h-screen bg-[#080d18] text-slate-100">
      <EsurpysNavigation />

      <section className="mx-auto max-w-6xl px-5 pb-12 pt-12">
        <div className="mb-10 rounded-3xl border border-blue-400/20 bg-gradient-to-br from-blue-950 via-slate-900 to-red-950 p-7 md:p-10">
          <div className="mb-4 text-5xl">🇳🇱</div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
            {t("Иммиграционный навигатор", "Immigration navigator")}
          </p>
          <h1 className="mb-4 text-3xl font-bold md:text-5xl">
            {t("Переезд в Нидерланды", "Move to the Netherlands")}
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

                        {route.id === "highlySkilled" && (
                          <p className="mt-3 text-sm leading-6 text-amber-300">
                            {t(
                              "Важно: работодатель для маршрута highly skilled migrant должен быть признанным спонсором IND. Проверьте его в официальном реестре.",
                              "Important: an employer using the highly skilled migrant route must be an IND-recognised sponsor. Check the official register."
                            )}
                          </p>
                        )}

                        {route.id === "blueCard" && (
                          <p className="mt-3 text-sm leading-6 text-amber-300">
                            {t(
                              "Важно: у Голубой карты ЕС отдельные требования к квалификации, договору и зарплате. Сверьте актуальные критерии IND перед подачей.",
                              "Important: the EU Blue Card has specific qualification, contract and salary requirements. Check the current IND criteria before applying."
                            )}
                          </p>
                        )}

                        {route.id === "orientation" && (
                          <p className="mt-3 text-sm leading-6 text-amber-300">
                            {t(
                              "Важно: год ориентации доступен только определённым выпускникам и исследователям. Не каждый диплом, полученный за пределами Нидерландов, подходит.",
                              "Important: the orientation year is available only to certain graduates and researchers. Not every degree obtained outside the Netherlands qualifies."
                            )}
                          </p>
                        )}

                        {route.id === "protection" && (
                          <p className="mt-3 text-sm leading-6 text-amber-300">
                            {t(
                              "Важно: это чувствительная юридическая процедура. Обратитесь за квалифицированной юридической помощью или к профильной организации.",
                              "Important: this is a sensitive legal process. Seek qualified legal assistance or contact a specialist organisation."
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

            {schengenConcern && (
              <div className="mt-6 rounded-2xl border border-amber-300/20 bg-amber-300/5 p-4 text-sm leading-6 text-slate-300">
                <strong className="text-amber-200">
                  {t(
                    "Нужна дополнительная проверка права на въезд",
                    "Additional entry eligibility review needed"
                  )}
                </strong>
                <p className="mt-2">
                  {t(
                    "Предыдущий отказ, превышение срока пребывания или запрет на въезд могут повлиять на решение. Проверьте свою ситуацию по официальным правилам и при необходимости получите индивидуальную консультацию.",
                    "A previous refusal, overstay or entry ban may affect a decision. Check your situation against the official rules and seek individual advice if needed."
                  )}
                </p>
                <a
                  className="mt-3 inline-block font-semibold text-blue-300 hover:text-blue-200"
                  href="https://www.netherlandsworldwide.nl/visa-the-netherlands"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("Информация о визах", "Visa information")} ↗
                </a>
              </div>
            )}

            {answers.immigrationHistory &&
              !["none", "unknown"].includes(answers.immigrationHistory) && (
                <div className="mt-6 rounded-2xl border border-amber-300/20 bg-amber-300/5 p-4 text-sm leading-6 text-slate-300">
                  <strong className="text-amber-200">
                    {t("Внимание к миграционной истории", "Immigration history")}
                  </strong>
                  <p className="mt-2">
                    {t(
                      "Отказ, нарушение условий пребывания или выдворение не всегда автоматически исключают все варианты, но последствия зависят от обстоятельств и применимых правил. Перед подачей заявления рассмотрите возможность консультации квалифицированного иммиграционного юриста.",
                      "A refusal, violation of stay conditions or removal does not automatically rule out every option, but consequences depend on the circumstances and applicable rules. Consider qualified immigration advice before applying."
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
                    "Если вы находитесь в Нидерландах и срок разрешённого пребывания или ВНЖ истёк, последствия зависят от вашей ситуации. Не делайте выводов по анкете; обратитесь в IND или за индивидуальной юридической консультацией.",
                    "If you are in the Netherlands and your authorised stay or residence permit has expired, the consequences depend on your situation. Do not rely on this questionnaire; contact the IND or seek individual legal advice."
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
                  "Иммиграционные правила, зарплатные критерии, сборы и сроки рассмотрения могут меняться. Необходимость визы зависит от гражданства и обстоятельств. Перед подачей заявления проверьте актуальные требования IND и официальные инструкции для въезда в Нидерланды. Этот навигатор не является юридической консультацией и не проверяет автоматически все индивидуальные условия.",
                  "Immigration rules, salary thresholds, fees and processing times can change. Visa requirements depend on nationality and circumstances. Check the current IND requirements and official Netherlands entry guidance before applying. This navigator is not legal advice and does not automatically verify every individual condition."
                )}
              </p>
              <div className="mt-3 flex flex-wrap gap-4">
                <a
                  href="https://ind.nl/en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-300 hover:text-blue-200"
                >
                  IND ↗
                </a>
                <a
                  href="https://www.netherlandsworldwide.nl/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-300 hover:text-blue-200"
                >
                  {t("Netherlands Worldwide", "Netherlands Worldwide")} ↗
                </a>
                <a
                  href="https://www.government.nl/topics/immigration-to-the-netherlands"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-300 hover:text-blue-200"
                >
                  {t("Правительство Нидерландов", "Government of the Netherlands")} ↗
                </a>
              </div>
            </div>
          </section>
        </div>

        <footer className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-slate-500">
          {t("Иммиграционный навигатор Нидерландов", "Netherlands Immigration Navigator")} ·{" "}
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