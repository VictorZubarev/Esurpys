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
};

const opt = (value: string, label: string, en: string): Option => ({
  value,
  label,
  en,
});

const questions: Question[] = [
  {
    id: "goal",
    title: "Какова ваша главная цель?",
    en: "What is your main goal?",
    options: [
      opt("work", "Работа в США", "Work in the United States"),
      opt("settle", "Переехать на постоянное жительство", "Move permanently"),
      opt("study", "Учёба", "Study"),
      opt("visit", "Туризм или краткий визит", "Tourism or a short visit"),
      opt("family", "Воссоединение с семьёй или брак", "Family reunification or marriage"),
      opt("business", "Бизнес или инвестиции", "Business or investment"),
      opt("talent", "Научные, профессиональные или творческие достижения", "Research, professional or artistic achievements"),
      opt("exchange", "Обменная программа или стажировка", "Exchange program or internship"),
      opt("protection", "Защита или убежище", "Protection or asylum"),
    ],
  },
  {
    id: "citizenship",
    title: "Гражданство какого государства у вас есть?",
    en: "What is your citizenship?",
    description: "Гражданство может влиять на доступность отдельных программ и требования к въезду.",
    descriptionEn: "Nationality can affect program availability and entry requirements.",
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
    title: "Сколько вам лет?",
    en: "How old are you?",
    options: [
      opt("under18", "Младше 18 лет", "Under 18"),
      opt("18-24", "18–24 года", "18–24"),
      opt("25-34", "25–34 года", "25–34"),
      opt("35-44", "35–44 года", "35–44"),
      opt("45-54", "45–54 года", "45–54"),
      opt("55plus", "55 лет или старше", "55 or older"),
    ],
  },
  {
    id: "residence",
    title: "Где вы сейчас проживаете?",
    en: "Where do you currently live?",
    options: [
      opt("outside", "За пределами США", "Outside the United States"),
      opt("uslegal", "В США с действующим статусом", "In the U.S. with valid status"),
      opt("usstudent", "В США по студенческому статусу", "In the U.S. in student status"),
      opt("uswork", "В США по рабочему статусу", "In the U.S. in work status"),
      opt("uspending", "В США, заявление рассматривается", "In the U.S. with an application pending"),
      opt("usexpired", "В США, статус истёк или неясен", "In the U.S.; status expired or unclear"),
    ],
  },
  {
    id: "english",
    title: "Какой у вас уровень английского?",
    en: "What is your English level?",
    options: [
      opt("basic", "Начальный", "Basic"),
      opt("intermediate", "Средний", "Intermediate"),
      opt("advanced", "Продвинутый", "Advanced"),
      opt("fluent", "Свободный", "Fluent"),
      opt("test", "Есть результаты языкового теста", "I have language test results"),
      opt("unknown", "Не уверен(а)", "Unsure"),
    ],
  },
  {
    id: "education",
    title: "Какое у вас образование?",
    en: "What is your highest level of education?",
    options: [
      opt("school", "Среднее образование", "High school"),
      opt("vocational", "Профессиональное / техническое", "Vocational or technical"),
      opt("bachelor", "Бакалавриат", "Bachelor's degree"),
      opt("master", "Магистратура", "Master's degree"),
      opt("phd", "Докторская степень / PhD", "Doctoral degree / PhD"),
      opt("none", "Нет завершённого образования", "No completed qualification"),
    ],
  },
  {
    id: "workExperience",
    title: "Сколько у вас профессионального опыта?",
    en: "How much professional experience do you have?",
    options: [
      opt("none", "Нет опыта", "No experience"),
      opt("under2", "Менее 2 лет", "Less than 2 years"),
      opt("2-4", "2–4 года", "2–4 years"),
      opt("5-9", "5–9 лет", "5–9 years"),
      opt("10plus", "10 лет и более", "10 years or more"),
    ],
  },
  {
    id: "occupation",
    title: "Какая сфера лучше всего описывает вашу профессию?",
    en: "Which field best describes your occupation?",
    options: [
      opt("it", "IT, программирование, данные", "IT, software or data"),
      opt("engineering", "Инженерия и технические специальности", "Engineering and technical fields"),
      opt("health", "Медицина и здравоохранение", "Medicine and healthcare"),
      opt("science", "Наука и исследования", "Science and research"),
      opt("education", "Образование", "Education"),
      opt("business", "Бизнес, финансы, менеджмент", "Business, finance or management"),
      opt("arts", "Искусство, медиа, дизайн, развлечения", "Arts, media, design or entertainment"),
      opt("trade", "Строительство и квалифицированные рабочие профессии", "Construction and skilled trades"),
      opt("hospitality", "Гостиницы, рестораны, сервис", "Hospitality and service"),
      opt("other", "Другая профессия", "Other occupation"),
      opt("none", "Пока нет профессии / опыта", "No occupation or experience yet"),
    ],
  },
  {
    id: "jobOffer",
    title: "Есть ли у вас предложение о работе от работодателя в США?",
    en: "Do you have a job offer from a U.S. employer?",
    options: [
      opt("yes", "Да, есть официальное предложение", "Yes, a formal offer"),
      opt("interview", "Иду по процессу собеседований", "I am interviewing"),
      opt("searching", "Пока ищу работодателя", "I am looking for an employer"),
      opt("no", "Нет и не планирую искать", "No, and I do not plan to look"),
      opt("unknown", "Не уверен(а)", "Unsure"),
    ],
  },
  {
    id: "sponsor",
    title: "Готов ли работодатель заниматься иммиграционным оформлением?",
    en: "Is the employer willing to handle immigration sponsorship?",
    description: "Для многих рабочих категорий работодатель должен подать петицию или выполнить другие формальные требования.",
    descriptionEn: "Many employment categories require an employer petition or other formal steps.",
    options: [
      opt("yes", "Да, готов", "Yes"),
      opt("possible", "Возможно, нужно уточнить", "Possibly; needs confirmation"),
      opt("no", "Нет", "No"),
      opt("self", "Я хочу подаваться самостоятельно, если это допускается", "I want to self-petition if permitted"),
      opt("unknown", "Не обсуждали", "Not discussed"),
    ],
  },
  {
    id: "salary",
    title: "Какой предполагается годовой доход в США?",
    en: "What annual U.S. salary do you expect?",
    options: [
      opt("under50", "Менее $50 000", "Under $50,000"),
      opt("50-90", "$50 000–$89 999", "$50,000–$89,999"),
      opt("90-150", "$90 000–$149 999", "$90,000–$149,999"),
      opt("150plus", "$150 000 и выше", "$150,000 or more"),
      opt("unknown", "Пока неизвестно", "Not known yet"),
      opt("na", "Не относится к моей ситуации", "Not applicable"),
    ],
  },
  {
    id: "studyOffer",
    title: "Есть ли у вас зачисление в американское учебное заведение?",
    en: "Have you been accepted by a U.S. educational institution?",
    options: [
      opt("yes", "Да, зачислен(а)", "Yes, accepted"),
      opt("applying", "Подал(а) заявки", "Applications submitted"),
      opt("planning", "Пока выбираю учебное заведение", "Still choosing a school"),
      opt("no", "Нет", "No"),
    ],
  },
  {
    id: "i20",
    title: "Есть ли у вас форма I-20 или документы для студенческой визы?",
    en: "Do you have Form I-20 or student visa documents?",
    description: "Для большинства академических программ F-1 учебное заведение оформляет Form I-20 после выполнения условий зачисления.",
    descriptionEn: "For most F-1 academic programs, the school issues Form I-20 after enrollment requirements are met.",
    options: [
      opt("yes", "Да, I-20 получена", "Yes, I have Form I-20"),
      opt("pending", "Оформляется", "In progress"),
      opt("no", "Нет", "No"),
      opt("na", "Пока не относится", "Not applicable yet"),
    ],
  },
  {
    id: "funds",
    title: "Сможете ли вы подтвердить средства на поездку, учёбу или проживание?",
    en: "Can you document funds for travel, study or living costs?",
    options: [
      opt("yes", "Да, собственные средства", "Yes, personal funds"),
      opt("sponsor", "Да, есть финансовый спонсор", "Yes, a financial sponsor"),
      opt("some", "Часть средств есть", "Some funds available"),
      opt("no", "Нет", "No"),
      opt("unknown", "Нужно оценить бюджет", "Need to assess the budget"),
    ],
  },
  {
    id: "family",
    title: "Есть ли у вас близкий родственник или партнёр в США?",
    en: "Do you have a close relative or partner in the United States?",
    options: [
      opt("uscitizen", "Супруг(а) — гражданин США", "Spouse is a U.S. citizen"),
      opt("lprspouse", "Супруг(а) — обладатель грин-карты", "Spouse is a green card holder"),
      opt("fiance", "Жених или невеста — гражданин США", "Fiancé(e) is a U.S. citizen"),
      opt("parentchild", "Родитель или ребёнок — гражданин США", "Parent or child is a U.S. citizen"),
      opt("sibling", "Брат или сестра — гражданин США", "Sibling is a U.S. citizen"),
      opt("otherrelative", "Другой родственник или партнёр", "Other relative or partner"),
      opt("none", "Нет", "No"),
    ],
  },
  {
    id: "relationship",
    title: "Каков ваш статус отношений?",
    en: "What is your relationship status?",
    options: [
      opt("married", "В браке", "Married"),
      opt("engaged", "Помолвка с гражданином США", "Engaged to a U.S. citizen"),
      opt("longterm", "Длительные отношения, не в браке", "Long-term relationship, not married"),
      opt("new", "Недавно начали отношения", "New relationship"),
      opt("single", "Нет партнёра", "Single"),
      opt("other", "Другое", "Other"),
    ],
  },
  {
    id: "business",
    title: "Какой вариант лучше описывает ваши бизнес-планы?",
    en: "Which best describes your business plans?",
    options: [
      opt("startup", "Запустить новый бизнес", "Start a new business"),
      opt("existing", "Есть действующий бизнес за рубежом", "I own an existing business abroad"),
      opt("investor", "Инвестировать значительный капитал", "Invest substantial capital"),
      opt("treaty", "Есть гражданство страны с подходящим договором E-1/E-2", "I am a national of a country eligible for an E-1/E-2 treaty"),
      opt("none", "Нет бизнес-планов", "No business plans"),
    ],
  },
  {
    id: "investment",
    title: "Какой объём капитала доступен для инвестиций?",
    en: "How much capital is available for investment?",
    options: [
      opt("under100", "Менее $100 000", "Under $100,000"),
      opt("100-500", "$100 000–$499 999", "$100,000–$499,999"),
      opt("500-800", "$500 000–$799 999", "$500,000–$799,999"),
      opt("800plus", "$800 000 и более", "$800,000 or more"),
      opt("unknown", "Пока не определено", "Not determined yet"),
      opt("none", "Нет капитала для инвестиций", "No investment capital"),
    ],
  },
  {
    id: "talent",
    title: "Есть ли у вас выдающиеся профессиональные достижения?",
    en: "Do you have extraordinary professional achievements?",
    description: "Например, значимые награды, публикации, патенты, ведущая роль, международное признание или доказанный вклад в отрасль.",
    descriptionEn: "Examples include major awards, publications, patents, leading roles, international recognition or documented field contributions.",
    options: [
      opt("international", "Есть международное признание и сильные доказательства", "International recognition with strong evidence"),
      opt("strong", "Есть существенные достижения и подтверждения", "Substantial achievements and evidence"),
      opt("research", "Научные публикации, исследования или патенты", "Research publications, research or patents"),
      opt("potential", "Есть потенциал, но мало доказательств", "Potential, but limited evidence"),
      opt("no", "Нет", "No"),
      opt("unknown", "Не уверен(а)", "Unsure"),
    ],
  },
  {
    id: "transfer",
    title: "Работаете ли вы в международной компании, имеющей офис в США?",
    en: "Do you work for a multinational company with a U.S. office?",
    options: [
      opt("yes", "Да, и возможен перевод в США", "Yes, and a U.S. transfer may be possible"),
      opt("maybe", "Да, но перевод не обсуждался", "Yes, but no transfer has been discussed"),
      opt("no", "Нет", "No"),
    ],
  },
  {
    id: "passport",
    title: "Есть ли у вас действующий паспорт?",
    en: "Do you have a valid passport?",
    options: [
      opt("yes", "Да", "Yes"),
      opt("no", "Нет", "No"),
      opt("renewal", "Находится в процессе обновления", "Being renewed"),
    ],
  },
  {
    id: "visitDuration",
    title: "Как долго вы планируете находиться в США?",
    en: "How long do you plan to stay in the United States?",
    options: [
      opt("short", "До 90 дней", "Up to 90 days"),
      opt("medium", "Несколько месяцев", "Several months"),
      opt("long", "Год или дольше", "A year or longer"),
      opt("permanent", "Постоянно", "Permanently"),
    ],
  },
  {
    id: "travelPurpose",
    title: "Какова цель краткого визита, если вы едете ненадолго?",
    en: "What is the purpose of a short visit, if applicable?",
    options: [
      opt("tourism", "Туризм, друзья или семья", "Tourism, friends or family"),
      opt("business", "Деловые встречи или конференция без обычной работы в США", "Business meetings or conference, not ordinary U.S. employment"),
      opt("medical", "Медицинское лечение", "Medical treatment"),
      opt("work", "Работа с оплатой в США", "Paid work in the United States"),
      opt("study", "Учёба с зачётами или получением степени", "Credit-bearing study or degree program"),
      opt("other", "Другое", "Other"),
    ],
  },
  {
    id: "lottery",
    title: "Рассматриваете ли вы Diversity Visa Lottery (лотерею грин-карт)?",
    en: "Are you considering the Diversity Visa lottery?",
    description: "Участие зависит от страны рождения и актуальных правил конкретного года; образование или квалифицированный опыт также могут иметь значение.",
    descriptionEn: "Eligibility depends on country of birth and the rules for the relevant year; education or qualifying work experience can also matter.",
    options: [
      opt("eligible", "Страна рождения может быть допущена, проверю требования", "My country of birth may qualify; I will check the rules"),
      opt("noteligible", "Похоже, страна рождения не подходит", "My country of birth may not qualify"),
      opt("unknown", "Не знаю", "I do not know"),
      opt("no", "Не интересует", "Not interested"),
    ],
  },
  {
    id: "immigrationHistory",
    title: "Были ли раньше отказы, нарушения визового режима или депортация?",
    en: "Have you had visa refusals, status violations or removal?",
    options: [
      opt("none", "Нет", "No"),
      opt("refusal", "Был отказ в визе", "A visa was refused"),
      opt("overstay", "Было превышение разрешённого срока пребывания", "I overstayed"),
      opt("removal", "Была депортация или removal order", "I was removed or received a removal order"),
      opt("fraud", "Есть вопрос о недостоверных сведениях или документах", "There is an issue involving misrepresentation or documents"),
      opt("unknown", "Не уверен(а)", "Unsure"),
    ],
  },
  {
    id: "status",
    title: "Каков ваш текущий иммиграционный статус в США, если вы уже там?",
    en: "What is your current U.S. immigration status, if you are already there?",
    options: [
      opt("outside", "Я за пределами США", "I am outside the U.S."),
      opt("valid", "Статус действителен", "Status is valid"),
      opt("student", "Студенческий статус F-1/M-1", "F-1/M-1 student status"),
      opt("work", "Рабочий статус", "Employment status"),
      opt("pending", "Есть ожидающее рассмотрения заявление", "Application pending"),
      opt("expired", "Статус истёк или нарушен", "Status expired or was violated"),
    ],
  },
  {
    id: "protection",
    title: "Опасаетесь ли вы преследования или серьёзного вреда при возвращении в свою страну?",
    en: "Do you fear persecution or serious harm if returned to your country?",
    description: "Это чувствительный вопрос. Анкета не определяет наличие оснований для убежища или другой защиты.",
    descriptionEn: "This is a sensitive question. The questionnaire cannot determine eligibility for asylum or other protection.",
    options: [
      opt("yes", "Да, опасаюсь", "Yes, I fear harm"),
      opt("unsure", "Не уверен(а), нужна консультация", "Unsure; I need advice"),
      opt("no", "Нет", "No"),
      opt("skip", "Предпочитаю не отвечать", "Prefer not to answer"),
    ],
  },
];

const ROUTES: Route[] = [
  {
    id: "h1b",
    title: "H-1B — специалист по специальности",
    titleEn: "H-1B — Specialty Occupation Worker",
    category: "Работа",
    categoryEn: "Employment",
    description: "Временная рабочая категория для определённых specialty occupations, обычно требующих профильной степени или эквивалентной квалификации.",
    descriptionEn: "A temporary work category for certain specialty occupations, generally requiring a related degree or equivalent qualification.",
    requirements: [
      "Обычно требуется предложение работы от американского работодателя.",
      "Работодатель должен подать соответствующую петицию и соблюдать применимые правила.",
      "Для многих заявлений действует лимит и процедура отбора; существуют исключения для некоторых работодателей.",
      "Квалификация должна соответствовать конкретной должности и применимым требованиям.",
    ],
    requirementsEn: [
      "A U.S. job offer is generally required.",
      "The employer must file the relevant petition and comply with applicable rules.",
      "Many cases are subject to a cap and selection process; some employers are exempt.",
      "The qualification must fit the specific position and applicable requirements.",
    ],
    limitations: [
      "Предложение работы само по себе не гарантирует визу.",
      "Наличие диплома не означает автоматическое соответствие требованиям specialty occupation.",
      "Проверьте актуальные правила USCIS, процедуру отбора и требования работодателя.",
    ],
    limitationsEn: [
      "A job offer alone does not guarantee a visa.",
      "A degree does not automatically establish that the position qualifies as a specialty occupation.",
      "Check current USCIS rules, selection procedures and employer requirements.",
    ],
    officialUrl: "https://www.uscis.gov/working-in-the-united-states/temporary-workers",
  },
  {
    id: "l1",
    title: "L-1 — перевод внутри международной компании",
    titleEn: "L-1 — Intracompany Transferee",
    category: "Работа",
    categoryEn: "Employment",
    description: "Временная категория для перевода определённых руководителей, менеджеров или сотрудников со специализированными знаниями в связанную организацию в США.",
    descriptionEn: "A temporary category for certain executives, managers or employees with specialized knowledge transferring to a related U.S. organization.",
    requirements: [
      "Нужна квалифицирующая связь между иностранной и американской организациями.",
      "Обычно требуется соответствующий период работы за рубежом в квалифицирующей организации.",
      "Должность в США должна соответствовать требованиям L-1A или L-1B.",
    ],
    requirementsEn: [
      "A qualifying relationship between the foreign and U.S. entities is required.",
      "A qualifying period of employment abroad is generally required.",
      "The U.S. position must meet L-1A or L-1B criteria.",
    ],
    limitations: [
      "Обычное предложение работы от несвязанной компании не подходит.",
      "Работодатель должен подтвердить организационную связь и требования к должности.",
    ],
    limitationsEn: [
      "A regular job offer from an unrelated company does not qualify.",
      "The employer must document the qualifying relationship and position.",
    ],
    officialUrl: "https://www.uscis.gov/working-in-the-united-states/temporary-workers",
  },
  {
    id: "o1",
    title: "O-1 — выдающиеся способности или достижения",
    titleEn: "O-1 — Extraordinary Ability or Achievement",
    category: "Талант и достижения",
    categoryEn: "Talent and achievements",
    description: "Временная категория для людей с доказанными выдающимися способностями или достижениями в определённых областях.",
    descriptionEn: "A temporary category for people with documented extraordinary ability or achievement in qualifying fields.",
    requirements: [
      "Нужны сильные документальные доказательства достижений по применимым критериям.",
      "Как правило, требуется американский заявитель-петиционер или работодатель и соответствующая работа или деятельность.",
      "Петиция рассматривается с учётом конкретной категории O-1.",
    ],
    requirementsEn: [
      "Strong documentary evidence must meet the applicable criteria.",
      "A U.S. petitioner or employer and qualifying work or activity are generally required.",
      "The petition is assessed under the specific O-1 category.",
    ],
    limitations: [
      "Самооценка таланта или высокий доход сами по себе недостаточны.",
      "Нужны документы, подтверждающие соответствие официальным критериям.",
    ],
    limitationsEn: [
      "A self-assessment of talent or high salary alone is not sufficient.",
      "Evidence must demonstrate that the official criteria are met.",
    ],
    officialUrl: "https://www.uscis.gov/working-in-the-united-states/temporary-workers/o-1-visa-individuals-with-extraordinary-ability-or-achievement",
  },
  {
    id: "eb1",
    title: "EB-1 — трудовая иммиграция первой категории",
    titleEn: "EB-1 — Employment-Based First Preference",
    category: "Постоянное проживание",
    categoryEn: "Permanent residence",
    description: "Категория иммиграции для некоторых людей с выдающимися способностями, выдающихся профессоров/исследователей и определённых руководителей международных компаний.",
    descriptionEn: "An employment-based immigrant category for certain people of extraordinary ability, outstanding professors or researchers, and qualifying multinational executives or managers.",
    requirements: [
      "Необходимо соответствовать требованиям конкретной подкатегории EB-1.",
      "В зависимости от подкатегории могут требоваться работодатель, предложение работы или трудовая петиция.",
      "Нужно учитывать доступность иммиграционной визы и очереди по категории и стране chargeability.",
    ],
    requirementsEn: [
      "You must meet the requirements of the specific EB-1 subcategory.",
      "Depending on the subcategory, an employer, job offer or employment petition may be required.",
      "Immigrant visa availability and category/country queues must be considered.",
    ],
    limitations: [
      "EB-1 не является общей программой для любого квалифицированного специалиста.",
      "Высокая квалификация без доказательств, предусмотренных законом, может быть недостаточна.",
    ],
    limitationsEn: [
      "EB-1 is not a general program for every skilled professional.",
      "High qualifications without legally relevant evidence may be insufficient.",
    ],
    officialUrl: "https://www.uscis.gov/working-in-the-united-states/permanent-workers",
  },
  {
    id: "eb2",
    title: "EB-2 — продвинутая степень или исключительные способности",
    titleEn: "EB-2 — Advanced Degree or Exceptional Ability",
    category: "Постоянное проживание",
    categoryEn: "Permanent residence",
    description: "Рабочая иммиграционная категория для некоторых специалистов с продвинутой степенью или исключительными способностями. В отдельных случаях возможен National Interest Waiver.",
    descriptionEn: "An employment-based immigrant category for certain professionals with advanced degrees or exceptional ability. A National Interest Waiver may be available in qualifying cases.",
    requirements: [
      "Нужно соответствовать критериям продвинутой степени или исключительных способностей.",
      "Во многих случаях требуется предложение работы и трудовая сертификация, если не применяется исключение.",
      "Для National Interest Waiver необходимо отдельно обосновать критерии национального интереса.",
    ],
    requirementsEn: [
      "You must qualify under the advanced-degree or exceptional-ability criteria.",
      "Many cases require a job offer and labor certification unless an exception applies.",
      "A National Interest Waiver requires a separate showing under its legal criteria.",
    ],
    limitations: [
      "Диплом магистра или PhD сам по себе не гарантирует EB-2 или NIW.",
      "Для NIW важны конкретный план, квалификация и доказательства общественной значимости работы.",
    ],
    limitationsEn: [
      "A master's degree or PhD alone does not guarantee EB-2 or NIW eligibility.",
      "NIW cases depend on the proposed endeavor, qualifications and evidence of its merit and importance.",
    ],
    officialUrl: "https://www.uscis.gov/working-in-the-united-states/permanent-workers",
  },
  {
    id: "eb3",
    title: "EB-3 — квалифицированные работники и специалисты",
    titleEn: "EB-3 — Skilled Workers, Professionals and Other Workers",
    category: "Постоянное проживание",
    categoryEn: "Permanent residence",
    description: "Рабочая иммиграционная категория для подходящих специалистов, квалифицированных работников и некоторых других работников при выполнении условий.",
    descriptionEn: "An employment-based immigrant category for qualifying professionals, skilled workers and certain other workers.",
    requirements: [
      "Обычно требуется постоянное предложение работы от работодателя в США.",
      "Часто необходимы трудовая сертификация и петиция работодателя.",
      "Квалификация и требования к опыту зависят от подкатегории.",
    ],
    requirementsEn: [
      "A permanent job offer from a U.S. employer is generally required.",
      "Labor certification and an employer petition are often required.",
      "Qualification and experience requirements depend on the subcategory.",
    ],
    limitations: [
      "Процесс может быть длительным из-за трудовой сертификации и иммиграционных очередей.",
      "Работодатель и должность должны соответствовать официальным требованиям.",
    ],
    limitationsEn: [
      "The process can be lengthy because of labor certification and immigrant visa queues.",
      "The employer and position must meet official requirements.",
    ],
    officialUrl: "https://www.uscis.gov/working-in-the-united-states/permanent-workers",
  },
  {
    id: "eb5",
    title: "EB-5 — иммиграция через инвестиции",
    titleEn: "EB-5 — Immigrant Investor Program",
    category: "Инвестиции",
    categoryEn: "Investment",
    description: "Иммиграционный маршрут для соответствующих требованиям инвесторов, выполняющих требования к капиталу, инвестиционному проекту и созданию рабочих мест.",
    descriptionEn: "An immigrant route for qualifying investors who meet capital, project and job-creation requirements.",
    requirements: [
      "Нужно инвестировать требуемую сумму в соответствующее требованиям коммерческое предприятие.",
      "Необходимо выполнить применимые требования к созданию рабочих мест.",
      "Требуется подтвердить законное происхождение средств и соблюсти требования к документации.",
    ],
    requirementsEn: [
      "The required amount must be invested in a qualifying commercial enterprise.",
      "Applicable job-creation requirements must be met.",
      "The lawful source of funds and required documentation must be established.",
    ],
    limitations: [
      "Размер капитала — только один из критериев и не гарантирует грин-карту.",
      "Требования, суммы, категории проектов и доступность виз нужно проверять по актуальным правилам USCIS.",
    ],
    limitationsEn: [
      "Capital alone is only one criterion and does not guarantee a green card.",
      "Verify current USCIS rules, amounts, project categories and visa availability.",
    ],
    officialUrl: "https://www.uscis.gov/working-in-the-united-states/permanent-workers/eb-5-immigrant-investor-program",
  },
  {
    id: "e2",
    title: "E-2 — инвестор по международному договору",
    titleEn: "E-2 — Treaty Investor",
    category: "Бизнес",
    categoryEn: "Business",
    description: "Неиммиграционная категория для граждан определённых договорных стран, инвестирующих существенный капитал в реальное действующее предприятие в США.",
    descriptionEn: "A nonimmigrant category for nationals of qualifying treaty countries who invest substantial capital in a bona fide U.S. enterprise.",
    requirements: [
      "Гражданство должно соответствовать договорным требованиям E-2.",
      "Инвестиция должна быть существенной с учётом характера бизнеса и находиться под риском коммерческой деятельности.",
      "Заявитель должен развивать и направлять предприятие по применимым правилам.",
    ],
    requirementsEn: [
      "Nationality must meet E-2 treaty requirements.",
      "The investment must be substantial in context and subject to commercial risk.",
      "The applicant must develop and direct the enterprise under the applicable rules.",
    ],
    limitations: [
      "E-2 доступна не гражданам всех стран.",
      "E-2 — не прямой маршрут к грин-карте; продление и статус зависят от соответствия требованиям.",
    ],
    limitationsEn: [
      "E-2 is not available to nationals of every country.",
      "E-2 is not a direct green-card route; continued status depends on meeting its requirements.",
    ],
    officialUrl: "https://travel.state.gov/content/travel/en/us-visas/investor.html",
  },
  {
    id: "f1",
    title: "F-1 — академическая студенческая виза",
    titleEn: "F-1 — Academic Student Visa",
    category: "Учёба",
    categoryEn: "Study",
    description: "Студенческая категория для обучения в соответствующем требованиям американском учебном заведении.",
    descriptionEn: "A student category for study at a qualifying U.S. educational institution.",
    requirements: [
      "Нужно быть принято в учебное заведение, имеющее право принимать иностранных студентов.",
      "Для соответствующих программ требуется Form I-20 и регистрация в SEVIS.",
      "Необходимо выполнить финансовые и другие требования и пройти визовую процедуру.",
    ],
    requirementsEn: [
      "You must be accepted by an institution authorized to enroll international students.",
      "Qualifying programs require Form I-20 and SEVIS registration.",
      "You must meet financial and other requirements and complete the visa process.",
    ],
    limitations: [
      "Студенческая виза не является разрешением на свободную работу.",
      "Правила трудоустройства, включая CPT/OPT, имеют отдельные условия.",
      "Виза и статус — разные понятия; проверяйте актуальные инструкции.",
    ],
    limitationsEn: [
      "A student visa is not unrestricted work authorization.",
      "Employment options, including CPT/OPT, have separate conditions.",
      "A visa and immigration status are different concepts; check current instructions.",
    ],
    officialUrl: "https://travel.state.gov/content/travel/en/us-visas/study/student-visa.html",
  },
  {
    id: "j1",
    title: "J-1 — программа обмена",
    titleEn: "J-1 — Exchange Visitor",
    category: "Обмен и стажировка",
    categoryEn: "Exchange and internship",
    description: "Категория для участия в утверждённых программах обмена: исследование, преподавание, стажировка, обучение и другие допустимые программы.",
    descriptionEn: "A category for approved exchange programs, including research, teaching, internships, training and other qualifying programs.",
    requirements: [
      "Нужно быть принято в программу через уполномоченного спонсора.",
      "Для оформления обычно требуется Form DS-2019 и выполнение требований программы.",
      "Необходимо соблюдать условия соответствующей категории J-1.",
    ],
    requirementsEn: [
      "You must be accepted into a program through an authorized sponsor.",
      "Form DS-2019 and program requirements generally apply.",
      "You must follow the conditions of the relevant J-1 category.",
    ],
    limitations: [
      "Некоторые участники подпадают под требование двухлетнего пребывания в стране проживания; применимость зависит от конкретных обстоятельств.",
      "J-1 не является универсальной рабочей или иммиграционной визой.",
    ],
    limitationsEn: [
      "Some participants are subject to a two-year home-country physical presence requirement, depending on their circumstances.",
      "J-1 is not a general work or immigrant visa.",
    ],
    officialUrl: "https://travel.state.gov/content/travel/en/us-visas/study/exchange.html",
  },
  {
    id: "b1b2",
    title: "B-1/B-2 — деловая поездка или туризм",
    titleEn: "B-1/B-2 — Business or Visitor Visa",
    category: "Краткий визит",
    categoryEn: "Short visit",
    description: "Временная категория для допустимых деловых поездок, туризма, посещения семьи и некоторых медицинских целей.",
    descriptionEn: "A temporary category for permitted business visits, tourism, family visits and certain medical purposes.",
    requirements: [
      "Цель поездки должна соответствовать разрешённым действиям по категории B.",
      "Нужно пройти процедуру подачи заявления и убедить консульского сотрудника в соответствии требованиям.",
      "Могут потребоваться подтверждения цели поездки, финансов и намерения покинуть США после визита.",
    ],
    requirementsEn: [
      "The purpose of travel must fit activities permitted under the B category.",
      "You must apply and establish eligibility to the consular officer.",
      "Evidence of travel purpose, finances and intent to depart may be requested.",
    ],
    limitations: [
      "B-1/B-2 не разрешает обычную работу в США.",
      "Для полноценной учёбы и постоянного проживания нужны другие категории.",
      "Принадлежность к Visa Waiver Program зависит от гражданства и дополнительных условий.",
    ],
    limitationsEn: [
      "B-1/B-2 does not authorize ordinary employment in the United States.",
      "Full-time study and permanent residence require other categories.",
      "Visa Waiver Program eligibility depends on nationality and additional conditions.",
    ],
    officialUrl: "https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visitor.html",
  },
  {
    id: "esta",
    title: "Visa Waiver Program / ESTA",
    titleEn: "Visa Waiver Program / ESTA",
    category: "Краткий визит",
    categoryEn: "Short visit",
    description: "Для подходящих граждан стран-участниц программа может позволять деловые или туристические поездки до 90 дней с предварительным разрешением ESTA.",
    descriptionEn: "Eligible nationals of participating countries may travel for permitted business or tourism visits of up to 90 days with approved ESTA.",
    requirements: [
      "Нужно иметь гражданство страны, участвующей в Visa Waiver Program.",
      "Требуется одобренное ESTA и соблюдение правил программы.",
      "Цель поездки должна быть допустимой, а путешественник должен соответствовать всем применимым требованиям.",
    ],
    requirementsEn: [
      "You must be a national of a Visa Waiver Program country.",
      "Approved ESTA and compliance with program rules are required.",
      "The purpose of travel must be permitted and all applicable requirements must be met.",
    ],
    limitations: [
      "ESTA не является визой и не гарантирует допуск на границе.",
      "Программа не разрешает работу или постоянное проживание.",
      "Некоторые поездки в определённые страны и другие обстоятельства могут исключать право на VWP.",
    ],
    limitationsEn: [
      "ESTA is not a visa and does not guarantee admission at the border.",
      "The program does not authorize employment or permanent residence.",
      "Certain travel history and other circumstances may make a traveler ineligible for VWP.",
    ],
    officialUrl: "https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visa-waiver-program.html",
  },
  {
    id: "family",
    title: "Семейная иммиграция",
    titleEn: "Family-Based Immigration",
    category: "Семья",
    categoryEn: "Family",
    description: "Путь к постоянному проживанию для определённых родственников граждан США и обладателей грин-карты.",
    descriptionEn: "A permanent residence route for qualifying relatives of U.S. citizens and lawful permanent residents.",
    requirements: [
      "Спонсор должен иметь подходящий иммиграционный статус и соответствовать требованиям категории.",
      "Родство или брак необходимо подтвердить документами.",
      "В большинстве случаев требуется петиция; могут применяться финансовые требования и визовые очереди.",
    ],
    requirementsEn: [
      "The sponsor must have qualifying immigration status and meet category requirements.",
      "The family relationship or marriage must be documented.",
      "A petition is generally required; financial rules and visa queues may apply.",
    ],
    limitations: [
      "Не все родственники имеют право на семейную иммиграцию.",
      "Для категорий предпочтения возможны длительные очереди; сроки зависят от категории и страны.",
      "Брак сам по себе не гарантирует одобрения.",
    ],
    limitationsEn: [
      "Not every relative qualifies for family immigration.",
      "Preference categories may have long queues depending on category and country.",
      "Marriage alone does not guarantee approval.",
    ],
    officialUrl: "https://www.uscis.gov/family",
  },
  {
    id: "k1",
    title: "K-1 — виза жениха или невесты гражданина США",
    titleEn: "K-1 — Fiancé(e) of a U.S. Citizen",
    category: "Семья и отношения",
    categoryEn: "Family and relationships",
    description: "Неиммиграционная виза для подходящего жениха или невесты гражданина США с целью заключить брак в США в установленный срок.",
    descriptionEn: "A nonimmigrant visa for a qualifying fiancé(e) of a U.S. citizen to marry in the United States within the required period.",
    requirements: [
      "Петицию подаёт гражданин США.",
      "Нужно выполнить требования к отношениям, встрече и намерению вступить в брак, если применимо.",
      "После въезда необходимо соблюдать установленный законом порядок дальнейшего оформления.",
    ],
    requirementsEn: [
      "The petition is filed by the U.S. citizen.",
      "Relationship, meeting and intent-to-marry requirements must be met where applicable.",
      "After entry, the required subsequent immigration process must be followed.",
    ],
    limitations: [
      "K-1 предназначена для брака с гражданином США, а не с любым обладателем грин-карты.",
      "Необходимо соблюдать сроки и правила последующего оформления статуса.",
    ],
    limitationsEn: [
      "K-1 is for marriage to a U.S. citizen, not any green card holder.",
      "Timing and subsequent status procedures must be followed.",
    ],
    officialUrl: "https://travel.state.gov/content/travel/en/us-visas/immigrate/family-immigration/fiancee-visa.html",
  },
  {
    id: "dv",
    title: "Diversity Visa — лотерея грин-карт",
    titleEn: "Diversity Visa — Green Card Lottery",
    category: "Постоянное проживание",
    categoryEn: "Permanent residence",
    description: "Ежегодная программа, если она проводится и применима к заявителю, для граждан стран с исторически низким уровнем иммиграции в США.",
    descriptionEn: "An annual program, when conducted and applicable, for people from countries with historically lower rates of immigration to the United States.",
    requirements: [
      "Право на участие обычно связано со страной рождения и официальным списком соответствующего года.",
      "Требуется выполнить критерии образования или квалифицирующего опыта работы.",
      "Даже отбор не гарантирует выдачу визы: нужны доступность визы и выполнение всех требований.",
    ],
    requirementsEn: [
      "Eligibility is generally tied to country of birth and the official list for that year.",
      "Education or qualifying work experience criteria must be met.",
      "Selection does not guarantee a visa; availability and all other requirements still apply.",
    ],
    limitations: [
      "Правила и сроки меняются по годам; используйте только официальный сайт Государственного департамента.",
      "Остерегайтесь мошенников и платных обещаний гарантированного выигрыша.",
    ],
    limitationsEn: [
      "Rules and dates vary by year; use the official Department of State website.",
      "Beware of scams and paid promises of guaranteed selection.",
    ],
    officialUrl: "https://travel.state.gov/content/travel/en/us-visas/immigrate/diversity-visa-program-entry.html",
  },
  {
    id: "asylum",
    title: "Убежище и гуманитарная защита",
    titleEn: "Asylum and Humanitarian Protection",
    category: "Защита",
    categoryEn: "Protection",
    description: "Информация о возможных путях защиты для людей, которые опасаются преследования и могут соответствовать установленным законом критериям.",
    descriptionEn: "Information about possible protection routes for people who fear persecution and may meet the legal criteria.",
    requirements: [
      "Основания защиты оцениваются индивидуально с учётом фактов и применимого законодательства.",
      "Важны обстоятельства, доказательства и соблюдение процедурных правил.",
      "Для некоторых процедур существенны место нахождения заявителя и сроки подачи.",
    ],
    requirementsEn: [
      "Protection claims are assessed individually based on facts and applicable law.",
      "Circumstances, evidence and procedural rules are important.",
      "Location and filing deadlines can matter for some procedures.",
    ],
    limitations: [
      "Эта анкета не определяет право на убежище и не заменяет юридическую помощь.",
      "Не делайте вывод о наличии или отсутствии оснований только по гражданству или одному ответу.",
      "Если вопрос срочный, обратитесь к квалифицированному иммиграционному адвокату или аккредитованному представителю.",
    ],
    limitationsEn: [
      "This questionnaire cannot determine asylum eligibility or replace legal advice.",
      "Do not infer eligibility or ineligibility from nationality or one answer.",
      "For urgent issues, contact a qualified immigration attorney or accredited representative.",
    ],
    officialUrl: "https://www.uscis.gov/humanitarian/refugees-and-asylum/asylum",
  },
  {
    id: "change",
    title: "Изменение или продление статуса в США",
    titleEn: "Change or Extension of Status in the U.S.",
    category: "Статус в США",
    categoryEn: "U.S. status",
    description: "Информация о возможности запросить изменение или продление определённых неиммиграционных статусов, если заявитель соответствует требованиям.",
    descriptionEn: "Information about requesting a change or extension of certain nonimmigrant statuses when the applicant qualifies.",
    requirements: [
      "Доступность процедуры зависит от текущего статуса, обстоятельств и категории.",
      "Заявление может потребоваться подать до истечения разрешённого пребывания.",
      "Нужно проверить применимые формы, сроки и ограничения.",
    ],
    requirementsEn: [
      "Availability depends on current status, circumstances and category.",
      "An application may need to be filed before authorized stay expires.",
      "Applicable forms, deadlines and restrictions must be checked.",
    ],
    limitations: [
      "Не каждый статус можно изменить или продлить.",
      "Некоторые нарушения могут иметь серьёзные последствия; анкета не оценивает правовую ситуацию.",
    ],
    limitationsEn: [
      "Not every status can be changed or extended.",
      "Some violations can have serious consequences; this questionnaire does not assess legal status.",
    ],
    officialUrl: "https://www.uscis.gov/visit-the-united-states/extend-your-stay",
  },
];

const tRu = {
  title: "Навигатор иммиграции в США",
  subtitle:
    "Ответьте на вопросы, чтобы изучить возможные визовые маршруты, основные условия и официальные источники для дальнейшей проверки.",
  reset: "Сбросить ответы",
  progress: "Прогресс",
  of: "из",
  questions: "вопросов",
  allQuestions: "Ваша ситуация",
  answered: "Заполнено",
  notAnswered: "Не заполнено",
  choose: "Выберите ответ",
  showResults: "Показать подходящие маршруты",
  results: "Возможные маршруты",
  resultsDescription:
    "Маршруты отсортированы по ориентировочному соответствию вашим ответам.",
  scoreDisclaimer:
    "Баллы — ориентир для навигации, а не вероятность одобрения и не юридическое заключение. Окончательные требования определяют USCIS и Государственный департамент США.",
  noResults: "Пока нет подходящих результатов",
  noResultsDescription:
    "Ответьте на вопросы о цели поездки, работе, образовании, семье и финансах. Не все юридические критерии можно определить по краткой анкете.",
  top: "Наиболее подходящий",
  requirements: "Основные требования",
  limitations: "Ограничения и что проверить",
  official: "Официальные требования",
  showAll: "Показать все маршруты",
  showFewer: "Показать меньше",
  noticeTitle: "Важная информация",
  noticeText:
    "Иммиграционные правила США меняются. Перед подачей проверяйте актуальные условия, формы, сборы, сроки и доступность маршрута на официальных сайтах.",
  rulesLink: "Официальный визовый справочник США",
  passportTitle: "Проверьте требования для въезда",
  passportText:
    "Виза или ESTA зависят от гражданства, цели поездки и индивидуальных обстоятельств. Одобрение ESTA или наличие визы не гарантирует допуск на границе.",
  historyTitle: "Предыдущие отказы или нарушения",
  historyText:
    "Отказы, превышение срока пребывания, депортация и вопросы о недостоверных сведениях могут иметь серьёзные последствия. Не скрывайте обстоятельства и получите квалифицированную консультацию при необходимости.",
  expiredTitle: "Истёкший статус или неясное положение",
  expiredText:
    "Если срок разрешённого пребывания истёк или ваш статус неясен, не полагайтесь на общие результаты анкеты. Проверьте официальные требования и оперативно обратитесь к квалифицированному специалисту.",
  protectionTitle: "Защита и гуманитарные вопросы",
  protectionText:
    "Если вы опасаетесь преследования или серьёзного вреда при возвращении, изучите официальную информацию и обратитесь за квалифицированной юридической помощью. Этот инструмент не оценивает обоснованность заявления.",
  generalDisclaimer:
    "Инструмент предназначен для общей навигации и не является иммиграционной или юридической консультацией. Баллы не отражают вероятность одобрения. Проверяйте актуальные правила на официальных сайтах правительства США.",
  footer: "Вернуться к World Navigator",
};

const tEn = {
  title: "U.S. Immigration Navigator",
  subtitle:
    "Answer the questions to explore possible visa routes, key requirements and official sources for further checks.",
  reset: "Reset answers",
  progress: "Progress",
  of: "of",
  questions: "questions",
  allQuestions: "Your situation",
  answered: "Answered",
  notAnswered: "Not answered",
  choose: "Choose an answer",
  showResults: "Show possible routes",
  results: "Possible routes",
  resultsDescription:
    "Routes are sorted by indicative fit with your answers.",
  scoreDisclaimer:
    "Scores are navigation aids, not approval probabilities or legal advice. USCIS and the U.S. Department of State set the definitive requirements.",
  noResults: "No matching results yet",
  noResultsDescription:
    "Answer questions about your goals, work, education, family and funds. A short questionnaire cannot assess every legal criterion.",
  top: "Best match",
  requirements: "Main requirements",
  limitations: "Limitations and checks",
  official: "Official requirements",
  showAll: "Show all routes",
  showFewer: "Show fewer",
  noticeTitle: "Important information",
  noticeText:
    "U.S. immigration rules change. Check current requirements, forms, fees, timelines and route availability on official websites before applying.",
  rulesLink: "Official U.S. visa information",
  passportTitle: "Check entry requirements",
  passportText:
    "A visa or ESTA depends on nationality, purpose of travel and individual circumstances. ESTA approval or a visa does not guarantee admission at the border.",
  historyTitle: "Previous refusals or violations",
  historyText:
    "Refusals, overstays, removal and misrepresentation issues can have serious consequences. Disclose circumstances truthfully and seek qualified advice when needed.",
  expiredTitle: "Expired status or unclear situation",
  expiredText:
    "If your authorized stay has expired or your status is unclear, do not rely on general questionnaire results. Check official requirements and promptly seek qualified assistance.",
  protectionTitle: "Protection and humanitarian matters",
  protectionText:
    "If you fear persecution or serious harm on return, consult official information and qualified legal assistance. This tool does not assess the merits of a claim.",
  generalDisclaimer:
    "This tool provides general navigation and is not immigration or legal advice. Scores do not represent the probability of approval. Check current rules on official U.S. government websites.",
  footer: "Back to World Navigator",
};

function isAnswered(value: string | undefined) {
  return value !== undefined && value !== "";
}

function clampScore(score: number, max = 95) {
  return Math.max(0, Math.min(score, max));
}

function getRouteScore(id: string, a: Answers): number {
  const goal = a.goal;
  let score = 0;

  const job = a.jobOffer === "yes";
  const interviewing = a.jobOffer === "interview";
  const sponsor = a.sponsor === "yes";
  const potentialSponsor = ["possible", "unknown"].includes(a.sponsor);
  const selfPetition = a.sponsor === "self";
  const hasDegree = ["bachelor", "master", "phd"].includes(a.education);
  const advancedDegree = ["master", "phd"].includes(a.education);
  const experienced = ["2-4", "5-9", "10plus"].includes(a.workExperience);
  const highlyExperienced = ["5-9", "10plus"].includes(a.workExperience);
  const strongEnglish = ["advanced", "fluent", "test"].includes(a.english);
  const someEnglish = ["intermediate", "advanced", "fluent", "test"].includes(a.english);
  const hasFunds = ["yes", "sponsor"].includes(a.funds);
  const someFunds = ["yes", "sponsor", "some"].includes(a.funds);
  const validPassport = a.passport === "yes";
  const familySpouse = ["uscitizen", "lprspouse"].includes(a.family);
  const USCitizenPartner = a.family === "uscitizen";
  const achievement = ["international", "strong", "research"].includes(a.talent);
  const seriousHistory = ["overstay", "removal", "fraud"].includes(a.immigrationHistory);
  const statusProblem = a.status === "expired" || a.residence === "usexpired";
  const STEM = ["it", "engineering", "science"].includes(a.occupation);
  const highSalary = ["90-150", "150plus"].includes(a.salary);
  const treatyNationality = ["au", "ca", "mx", "jp", "kr", "uk", "nz", "eu"].includes(a.citizenship);

  switch (id) {
    case "h1b": {
      if (!["work", "settle"].includes(goal)) return 0;
      if (a.occupation === "none") return 0;

      score = 12;
      if (job) score += 22;
      else if (interviewing) score += 12;
      else if (a.jobOffer === "searching") score += 5;
      if (sponsor) score += 22;
      else if (potentialSponsor) score += 8;
      if (hasDegree) score += 16;
      if (advancedDegree) score += 5;
      if (STEM) score += 7;
      if (experienced) score += 6;
      if (highSalary) score += 5;
      if (strongEnglish) score += 3;
      if (a.education === "school" || a.education === "none") score -= 12;
      if (a.jobOffer === "no") score -= 15;
      if (a.sponsor === "no") score -= 10;
      if (statusProblem) score -= 15;
      if (seriousHistory) score -= 8;
      return clampScore(score);
    }

    case "l1": {
      if (!["work", "settle"].includes(goal)) return 0;
      if (a.transfer === "no") return 0;

      score = 18;
      if (a.transfer === "yes") score += 32;
      if (a.transfer === "maybe") score += 14;
      if (highlyExperienced) score += 12;
      else if (experienced) score += 7;
      if (a.occupation === "business") score += 7;
      if (job) score += 3;
      if (statusProblem) score -= 12;
      if (seriousHistory) score -= 8;
      return clampScore(score);
    }

    case "o1": {
      if (!["work", "settle", "talent"].includes(goal)) return 0;
      if (a.talent === "no") return 0;

      score = 8;
      if (a.talent === "international") score += 45;
      if (a.talent === "strong") score += 30;
      if (a.talent === "research") score += 28;
      if (a.talent === "potential") score += 8;
      if (a.education === "phd") score += 7;
      if (highlyExperienced) score += 5;
      if (["science", "arts", "it", "health"].includes(a.occupation)) score += 5;
      if (selfPetition) score -= 8;
      if (statusProblem) score -= 12;
      if (seriousHistory) score -= 8;
      return clampScore(score);
    }

    case "eb1": {
      if (!["work", "settle", "talent"].includes(goal)) return 0;
      if (!achievement && a.transfer !== "yes") return 0;

      score = 8;
      if (a.talent === "international") score += 42;
      if (a.talent === "strong") score += 25;
      if (a.talent === "research") score += 24;
      if (a.transfer === "yes") score += 22;
      if (a.transfer === "maybe") score += 8;
      if (a.education === "phd") score += 7;
      if (a.workExperience === "10plus") score += 6;
      if (selfPetition && a.talent === "international") score += 4;
      if (statusProblem) score -= 12;
      if (seriousHistory) score -= 8;
      return clampScore(score);
    }

    case "eb2": {
      if (!["work", "settle", "talent"].includes(goal)) return 0;
      if (!advancedDegree && !achievement) return 0;

      score = 12;
      if (advancedDegree) score += 24;
      if (a.talent === "international") score += 24;
      if (a.talent === "strong") score += 16;
      if (a.talent === "research") score += 18;
      if (selfPetition) score += 10;
      if (job) score += 10;
      if (sponsor) score += 8;
      if (experienced) score += 6;
      if (a.occupation === "science" || a.occupation === "health") score += 4;
      if (statusProblem) score -= 12;
      if (seriousHistory) score -= 8;
      return clampScore(score);
    }

    case "eb3": {
      if (!["work", "settle"].includes(goal)) return 0;
      if (a.occupation === "none") return 0;

      score = 12;
      if (job) score += 24;
      else if (interviewing) score += 12;
      if (sponsor) score += 20;
      else if (potentialSponsor) score += 7;
      if (hasDegree) score += 10;
      if (experienced) score += 10;
      if (highlyExperienced) score += 4;
      if (a.occupation === "trade" || a.occupation === "health" || a.occupation === "engineering") score += 5;
      if (a.jobOffer === "no") score -= 12;
      if (a.sponsor === "no") score -= 10;
      if (statusProblem) score -= 15;
      if (seriousHistory) score -= 8;
      return clampScore(score);
    }

    case "eb5": {
      if (!["business", "settle"].includes(goal)) return 0;
      score = 8;

      if (a.investment === "800plus") score += 42;
      if (a.investment === "500-800") score += 15;
      if (a.investment === "100-500") score += 5;
      if (a.business === "investor") score += 15;
      if (a.business === "existing" || a.business === "startup") score += 5;
      if (hasFunds) score += 8;
      if (a.investment === "none" || a.funds === "no") score -= 20;
      if (statusProblem) score -= 10;
      if (seriousHistory) score -= 10;
      return clampScore(score);
    }

    case "e2": {
      if (goal !== "business") return 0;
      if (!["treaty", "startup", "existing", "investor"].includes(a.business)) return 0;

      score = 12;
      if (a.business === "treaty") score += 28;
      if (a.business === "startup" || a.business === "existing") score += 18;
      if (a.business === "investor") score += 18;
      if (["100-500", "500-800", "800plus"].includes(a.investment)) score += 18;
      if (a.investment === "under100") score += 6;
      if (hasFunds) score += 8;
      if (a.citizenship === "unknown" || a.citizenship === "other") score -= 3;
      if (a.investment === "none" || a.funds === "no") score -= 20;
      if (statusProblem) score -= 10;
      if (seriousHistory) score -= 8;
      return clampScore(score);
    }

    case "f1": {
      if (goal !== "study") return 0;

      score = 12;
      if (a.studyOffer === "yes") score += 25;
      else if (a.studyOffer === "applying") score += 14;
      else if (a.studyOffer === "planning") score += 5;
      if (a.i20 === "yes") score += 24;
      else if (a.i20 === "pending") score += 12;
      if (hasFunds) score += 14;
      else if (a.funds === "some") score += 5;
      if (validPassport) score += 5;
      if (hasDegree) score += 3;
      if (a.studyOffer === "no") score -= 8;
      if (a.i20 === "no") score -= 5;
      if (a.funds === "no") score -= 18;
      if (a.passport === "no") score -= 20;
      if (statusProblem) score -= 18;
      if (seriousHistory) score -= 10;
      return clampScore(score);
    }

    case "j1": {
      if (goal !== "exchange") return 0;

      score = 12;
      if (hasDegree) score += 10;
      if (experienced) score += 8;
      if (a.occupation === "science" || a.occupation === "education" || a.occupation === "health") score += 10;
      if (someEnglish) score += 5;
      if (hasFunds) score += 5;
      if (validPassport) score += 5;
      if (a.studyOffer === "yes" || a.studyOffer === "applying") score += 10;
      if (a.passport === "no") score -= 18;
      if (statusProblem) score -= 15;
      if (seriousHistory) score -= 8;
      return clampScore(score);
    }

    case "b1b2": {
      if (goal !== "visit") return 0;
      if (a.visitDuration === "permanent") return 0;
      if (a.travelPurpose === "work" || a.travelPurpose === "study") return 0;

      score = 28;
      if (validPassport) score += 15;
      if (someFunds) score += 12;
      if (a.visitDuration === "short") score += 10;
      if (a.residence === "outside") score += 5;
      if (a.travelPurpose === "tourism" || a.travelPurpose === "business" || a.travelPurpose === "medical") score += 8;
      if (a.travelPurpose === "other") score -= 3;
      if (a.funds === "no") score -= 15;
      if (a.passport === "no") score -= 25;
      if (a.passport === "renewal") score -= 8;
      if (seriousHistory) score -= 15;
      if (a.immigrationHistory === "refusal") score -= 5;
      if (statusProblem) score -= 12;
      return clampScore(score, 85);
    }

    case "esta": {
      if (goal !== "visit") return 0;
      if (a.visitDuration !== "short") return 0;
      if (!["eu", "uk", "au", "nz", "jp", "kr"].includes(a.citizenship)) return 0;
      if (a.travelPurpose === "work" || a.travelPurpose === "study") return 0;

      score = 38;
      if (validPassport) score += 18;
      if (a.travelPurpose === "tourism" || a.travelPurpose === "business") score += 8;
      if (someFunds) score += 5;
      if (seriousHistory) score -= 30;
      if (a.immigrationHistory === "refusal") score -= 10;
      if (a.citizenship === "unknown") score -= 10;
      if (a.passport === "no") score -= 25;
      return clampScore(score, 85);
    }

    case "family": {
      if (!["family", "settle"].includes(goal)) return 0;
      if (a.family === "none" || !a.family) return 0;

      score = 20;
      if (a.family === "uscitizen") score += 35;
      if (a.family === "lprspouse") score += 30;
      if (a.family === "parentchild") score += 20;
      if (a.family === "sibling") score += 10;
      if (a.family === "otherrelative") score += 5;
      if (a.relationship === "married") score += 10;
      if (validPassport) score += 3;
      if (hasFunds) score += 3;
      if (seriousHistory) score -= 15;
      if (statusProblem) score -= 12;
      return clampScore(score, 90);
    }

    case "k1": {
      if (!["family", "settle"].includes(goal)) return 0;
      if (a.family !== "fiance" && a.relationship !== "engaged") return 0;

      score = 25;
      if (USCitizenPartner) score += 30;
      if (a.family === "fiance") score += 25;
      if (a.relationship === "engaged") score += 15;
      if (validPassport) score += 5;
      if (seriousHistory) score -= 15;
      if (statusProblem) score -= 10;
      return clampScore(score, 90);
    }

    case "dv": {
      if (!["settle", "work"].includes(goal)) return 0;
      if (a.lottery === "no" || a.lottery === "noteligible") return 0;

      score = 20;
      if (a.lottery === "eligible") score += 25;
      if (a.lottery === "unknown") score += 10;
      if (["school", "vocational", "bachelor", "master", "phd"].includes(a.education)) score += 10;
      if (["5-9", "10plus"].includes(a.workExperience)) score += 5;
      if (validPassport) score += 3;
      if (a.lottery === "noteligible") score = 0;
      if (seriousHistory) score -= 12;
      return clampScore(score, 65);
    }

    case "asylum": {
      if (goal !== "protection" && !["yes", "unsure"].includes(a.protection)) return 0;

      score = a.protection === "yes" ? 65 : 35;
      if (a.protection === "skip") score = goal === "protection" ? 25 : 0;
      if (a.residence === "uslegal" || a.residence === "usstudent" || a.residence === "uswork" || a.residence === "uspending") score += 8;
      if (a.residence === "outside") score -= 5;
      if (a.residence === "usexpired") score += 2;
      if (a.protection === "no" && goal !== "protection") return 0;
      return clampScore(score, 75);
    }

    case "change": {
      if (!["uslegal", "usstudent", "uswork", "uspending", "usexpired"].includes(a.residence) &&
          !["valid", "student", "work", "pending", "expired"].includes(a.status)) return 0;

      score = 18;
      if (a.residence === "uslegal" || a.status === "valid") score += 18;
      if (a.residence === "usstudent" || a.status === "student") score += 15;
      if (a.residence === "uswork" || a.status === "work") score += 15;
      if (a.residence === "uspending" || a.status === "pending") score += 8;
      if (a.residence === "usexpired" || a.status === "expired") score -= 25;
      if (seriousHistory) score -= 15;
      if (goal === "settle" || goal === "work" || goal === "study") score += 5;
      return clampScore(score, 80);
    }

    default:
      return 0;
  }
}

function getRouteWarning(id: string, a: Answers, isEnglish: boolean): string | null {
  const warning = (ru: string, en: string) => (isEnglish ? en : ru);

  if (id === "h1b") {
    return warning(
      "Обычно нужны подходящая должность и петиция работодателя. Для многих заявлений действует лимит и отбор; проверьте актуальные правила USCIS.",
      "A qualifying position and employer petition are generally required. Many cases are subject to a cap and selection; check current USCIS rules.",
    );
  }

  if (id === "l1") {
    return warning(
      "L-1 предполагает перевод внутри квалифицирующей корпоративной группы, а не обычный найм сторонней компанией.",
      "L-1 requires a qualifying intracompany transfer, not ordinary hiring by an unrelated company.",
    );
  }

  if (id === "o1" || id === "eb1") {
    return warning(
      "Для этой категории нужны документальные доказательства, соответствующие конкретным юридическим критериям. Обычного диплома или стажа может быть недостаточно.",
      "This category requires documentary evidence meeting specific legal criteria. A degree or work experience alone may be insufficient.",
    );
  }

  if (id === "eb2") {
    return warning(
      "Проверьте требования к степени или исключительным способностям. Для National Interest Waiver действуют отдельные критерии; баллы анкеты их не заменяют.",
      "Check the degree or exceptional-ability criteria. National Interest Waiver cases have separate legal tests; questionnaire scores do not replace them.",
    );
  }

  if (id === "eb3") {
    return warning(
      "Как правило, нужен работодатель, постоянная вакансия и выполнение процедур трудовой сертификации, если применимо. Проверьте очередь Visa Bulletin.",
      "An employer, permanent position and labor-certification process are generally required where applicable. Check the Visa Bulletin.",
    );
  }

  if (id === "eb5") {
    return warning(
      "Инвестиционная сумма сама по себе не даёт права на грин-карту. Нужны квалифицирующая инвестиция, создание рабочих мест и подтверждение происхождения средств.",
      "Investment capital alone does not qualify you for a green card. A qualifying investment, job creation and lawful source of funds must be established.",
    );
  }

  if (id === "e2") {
    return warning(
      "Сначала проверьте, допускает ли договор E-2 граждан вашей страны. Требуются реальная инвестиция и действующее предприятие; E-2 не является прямой грин-картой.",
      "First check whether your nationality qualifies under an E-2 treaty. A real investment and operating enterprise are required; E-2 is not a direct green-card route.",
    );
  }

  if (id === "f1") {
    return warning(
      "Обычно необходимы зачисление, Form I-20, SEVIS и подтверждение финансов. Учёба по туристическому статусу обычно не подходит для программы с зачётами или степенью.",
      "Admission, Form I-20, SEVIS and financial evidence are generally required. Visitor status is generally not suitable for credit-bearing or degree study.",
    );
  }

  if (id === "j1") {
    return warning(
      "Нужна утверждённая программа и спонсор. В некоторых случаях применяется требование двухлетнего физического присутствия в стране проживания после программы.",
      "An approved program and sponsor are required. In some cases, a two-year home-country physical presence requirement applies after the program.",
    );
  }

  if (id === "b1b2") {
    if (a.travelPurpose === "work" || a.travelPurpose === "study") {
      return warning(
        "Работа и полноценная учёба обычно не разрешены по B-1/B-2. Изучите рабочие или студенческие категории.",
        "Employment and full-time study are generally not permitted on B-1/B-2. Explore work or student categories.",
      );
    }

    return warning(
      "Нужно доказать соответствие требованиям временного визита. Решение зависит от индивидуальных обстоятельств; приглашение от родственника само по себе не гарантирует визу.",
      "You must establish eligibility for a temporary visit. The decision depends on individual circumstances; an invitation from a relative does not guarantee a visa.",
    );
  }

  if (id === "esta") {
    return warning(
      "ESTA доступна только подходящим путешественникам по Visa Waiver Program. Она не разрешает работу или постоянное проживание и не гарантирует допуск в США.",
      "ESTA is only available to qualifying Visa Waiver Program travelers. It does not authorize work or permanent residence and does not guarantee admission.",
    );
  }

  if (id === "family") {
    return warning(
      "Категория зависит от точного родства и статуса спонсора. Для некоторых родственников предусмотрены длительные очереди; брак или родство необходимо подтвердить.",
      "The category depends on the exact relationship and sponsor status. Some relatives face long queues; the relationship must be documented.",
    );
  }

  if (id === "k1") {
    return warning(
      "K-1 предназначена для жениха или невесты гражданина США. Нужно выполнить правила петиции, отношений и дальнейшего оформления после въезда.",
      "K-1 is for the fiancé(e) of a U.S. citizen. Petition, relationship and post-entry requirements must be met.",
    );
  }

  if (id === "dv") {
    return warning(
      "Проверьте официальный список стран и требования именно для текущего года. Отбор не гарантирует визу; не доверяйте обещаниям гарантированного выигрыша.",
      "Check the official country list and requirements for the current year. Selection does not guarantee a visa; beware of guaranteed-win claims.",
    );
  }

  if (id === "asylum") {
    return warning(
      "Результат не определяет право на убежище. Имеют значение конкретные факты, применимые правовые критерии, сроки и место нахождения заявителя.",
      "This result does not determine asylum eligibility. Specific facts, legal criteria, deadlines and the applicant's location matter.",
    );
  }

  if (id === "change") {
    return warning(
      "Возможность изменить или продлить статус зависит от категории и истории пребывания. При истёкшем статусе или нарушениях как можно скорее получите квалифицированную консультацию.",
      "The ability to change or extend status depends on the category and immigration history. If status expired or was violated, seek qualified advice promptly.",
    );
  }

  return null;
}

export default function USPage() {
  const languageContext = useLanguage() as {
    lang?: string;
    language?: string;
  };

  const lang = languageContext?.lang ?? languageContext?.language ?? "ru";
  const isEnglish = lang.toLowerCase().startsWith("en");
  const t = isEnglish ? tEn : tRu;

  const [answers, setAnswers] = useState<Answers>({});
  const [showAll, setShowAll] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

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

  const hasExpiredStatus =
    answers.status === "expired" ||
    answers.residence === "usexpired";

  const protectionRelevant =
    answers.goal === "protection" ||
    answers.protection === "yes" ||
    answers.protection === "unsure";

  const visitRelevant = answers.goal === "visit";

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
    return option
      ? isEnglish
        ? option.en ?? option.label
        : option.label
      : value;
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
                  code="US"
                  name="United States"
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
                                    const details =
                                      event.currentTarget.closest("details");
                                    if (details) details.open = false;
                                  }}
                                  className="h-4 w-4 shrink-0 accent-blue-400"
                                />
                                <span>
                                  {isEnglish
                                    ? option.en ?? option.label
                                    : option.label}
                                </span>
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
                            {(isEnglish
                              ? route.requirementsEn
                              : route.requirements
                            ).map((requirement) => (
                              <li key={requirement} className="list-disc">
                                {requirement}
                              </li>
                            ))}
                          </ul>

                          <h4 className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                            {t.limitations}
                          </h4>

                          <ul className="mt-2 space-y-2 pl-4 text-sm leading-6 text-slate-400">
                            {(isEnglish
                              ? route.limitationsEn
                              : route.limitations
                            ).map((limitation) => (
                              <li key={limitation} className="list-disc">
                                {limitation}
                              </li>
                            ))}
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
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {t.noticeText}
                </p>
                <a
                  href="https://travel.state.gov/content/travel/en/us-visas.html"
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
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {t.passportText}
                  </p>
                  <a
                    href="https://travel.state.gov/content/travel/en/us-visas/tourism-visit.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-blue-200 hover:text-blue-100"
                  >
                    {isEnglish
                      ? "Check official entry requirements"
                      : "Проверить официальные требования для въезда"}
                    <span aria-hidden="true">↗</span>
                  </a>
                </section>
              )}

              {hasImmigrationHistory && (
                <section className="rounded-2xl border border-orange-300/20 bg-orange-300/[0.04] p-5">
                  <h3 className="font-semibold text-orange-100">{t.historyTitle}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {t.historyText}
                  </p>
                  <a
                    href="https://www.uscis.gov/laws-and-policy/other-resources/unlawful-presence-and-inadmissibility"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-orange-200 hover:text-orange-100"
                  >
                    {isEnglish
                      ? "Official immigration information"
                      : "Официальная информация об иммиграционных требованиях"}
                    <span aria-hidden="true">↗</span>
                  </a>
                </section>
              )}

              {hasExpiredStatus && (
                <section className="rounded-2xl border border-red-300/20 bg-red-300/[0.04] p-5">
                  <h3 className="font-semibold text-red-100">{t.expiredTitle}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {t.expiredText}
                  </p>
                  <a
                    href="https://www.uscis.gov/visit-the-united-states/extend-your-stay"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-red-200 hover:text-red-100"
                  >
                    {isEnglish
                      ? "Check official status information"
                      : "Проверить официальную информацию о статусе"}
                    <span aria-hidden="true">↗</span>
                  </a>
                </section>
              )}

              {protectionRelevant && (
                <section className="rounded-2xl border border-purple-300/20 bg-purple-300/[0.04] p-5">
                  <h3 className="font-semibold text-purple-100">{t.protectionTitle}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {t.protectionText}
                  </p>
                  <a
                    href="https://www.uscis.gov/humanitarian/refugees-and-asylum/asylum"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-purple-200 hover:text-purple-100"
                  >
                    {isEnglish
                      ? "Official asylum information"
                      : "Официальная информация об убежище"}
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
          <p className="text-xs leading-6 text-slate-500">
            {t.generalDisclaimer}
          </p>

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