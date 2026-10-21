"use client";

import Link from "next/link";

import { useMemo, useState } from "react";

type Language = "ru" | "en";
type Answer = "yes" | "no" | "unknown";

type Category =
  | "all"
  | "work"
  | "study"
  | "family"
  | "visit"
  | "business"
  | "special"
  | "protection"
  | "settlement";

type Profile = {
  language: Language;
  goal: Category;
  location: "outside" | "inside" | "unknown";
  age: string;
  citizenship: string;
  jobOffer: Answer;
  sponsor: Answer;
  studentOffer: Answer;
  familyInUK: Answer;
  partnerStatus: Answer;
  english: Answer;
  funds: Answer;
  degree: Answer;
  highAchievement: Answer;
  businessIdea: Answer;
  endorsement: Answer;
  ancestry: Answer;
  protectionNeed: Answer;
  currentVisa: Answer;
  notes: string;
};

type VisaRoute = {
  id: string;
  name: string;
  category: Exclude<Category, "all">;
  description: string;
  url: string;
  requirements: string[];
  questions: (keyof Profile)[];
  match: (p: Profile) => number;
  advice: (p: Profile, lang: Language) => string[];
};

const initialProfile: Profile = {
  language: "ru",
  goal: "all",
  location: "unknown",
  age: "",
  citizenship: "",
  jobOffer: "unknown",
  sponsor: "unknown",
  studentOffer: "unknown",
  familyInUK: "unknown",
  partnerStatus: "unknown",
  english: "unknown",
  funds: "unknown",
  degree: "unknown",
  highAchievement: "unknown",
  businessIdea: "unknown",
  endorsement: "unknown",
  ancestry: "unknown",
  protectionNeed: "unknown",
  currentVisa: "unknown",
  notes: "",
};

const routes: VisaRoute[] = [
  {
    id: "skilled-worker",
    name: "Skilled Worker visa",
    category: "work",
    description: "Работа по подходящей профессии у работодателя, одобренного Home Office.",
    url: "https://www.gov.uk/skilled-worker-visa",
    requirements: ["Подходящая работа", "Одобренный спонсор", "Certificate of Sponsorship", "Зарплата по правилам маршрута", "Английский язык"],
    questions: ["jobOffer", "sponsor", "english", "funds"],
    match: p => p.jobOffer === "yes" && p.sponsor === "yes" ? 88 : p.jobOffer === "yes" || p.sponsor === "yes" ? 65 : 30,
    advice: (p, l) => [
      p.jobOffer !== "yes" ? (l === "ru" ? "Найти работодателя, готового предложить подходящую должность." : "Find an employer offering an eligible role.") : "",
      p.sponsor !== "yes" ? (l === "ru" ? "Проверить работодателя в официальном реестре спонсоров." : "Check the employer in the official sponsor register.") : "",
      l === "ru" ? "Проверить код профессии, актуальную зарплатную ставку и требования к английскому." : "Check the occupation code, current salary rules and English requirement.",
    ],
  },
  {
    id: "health-care",
    name: "Health and Care Worker visa",
    category: "work",
    description: "Для определённых медицинских и социальных профессий у соответствующего работодателя.",
    url: "https://www.gov.uk/health-care-worker-visa",
    requirements: ["Подходящая медицинская или социальная должность", "Одобренный работодатель", "Предложение работы", "Требования к зарплате и английскому"],
    questions: ["jobOffer", "sponsor", "english", "funds"],
    match: p => p.jobOffer === "yes" && p.sponsor === "yes" ? 85 : p.jobOffer === "yes" ? 62 : 28,
    advice: (p, l) => [
      l === "ru" ? "Уточнить, входит ли конкретная должность в список профессий для этого маршрута." : "Check whether the specific job qualifies for this route.",
      p.sponsor !== "yes" ? (l === "ru" ? "Найти работодателя, имеющего право спонсировать именно эту визу." : "Find an employer eligible to sponsor this route.") : "",
    ],
  },
  {
    id: "global-talent",
    name: "Global Talent visa",
    category: "special",
    description: "Для лидеров и потенциальных лидеров в предусмотренных областях, например науке, искусстве и цифровых технологиях.",
    url: "https://www.gov.uk/global-talent",
    requirements: ["Соответствующая область", "Признанные достижения или потенциал", "Одобрение уполномоченного органа либо допустимая альтернатива"],
    questions: ["highAchievement", "degree"],
    match: p => p.highAchievement === "yes" ? 82 : p.degree === "yes" ? 48 : 25,
    advice: (p, l) => [
      l === "ru" ? "Подготовить доказательства достижений, публикаций, наград, влияния или профессионального признания." : "Prepare evidence of achievements, publications, awards, impact or professional recognition.",
      l === "ru" ? "Проверить, требуется ли одобрение и какой орган отвечает за вашу область." : "Check whether endorsement is required and which body covers your field.",
    ],
  },
  {
    id: "innovator-founder",
    name: "Innovator Founder visa",
    category: "business",
    description: "Для запуска инновационного бизнеса в Великобритании при соблюдении требований маршрута.",
    url: "https://www.gov.uk/innovator-founder-visa",
    requirements: ["Бизнес-идея", "Инновационность, жизнеспособность и масштабируемость", "Одобрение уполномоченного органа", "Английский язык и финансовые условия"],
    questions: ["businessIdea", "endorsement", "english", "funds"],
    match: p => p.businessIdea === "yes" && p.endorsement === "yes" ? 88 : p.businessIdea === "yes" ? 60 : 25,
    advice: (p, l) => [
      p.businessIdea !== "yes" ? (l === "ru" ? "Определить продукт, рынок, инновационное отличие и план развития." : "Define the product, market, innovation and growth plan.") : "",
      p.endorsement !== "yes" ? (l === "ru" ? "Изучить требования к одобрению бизнес-идеи уполномоченным органом." : "Review the endorsement requirements.") : "",
    ],
  },
  {
    id: "scale-up",
    name: "Scale-up Worker visa",
    category: "work",
    description: "Для подходящей работы у квалифицирующейся быстрорастущей компании.",
    url: "https://www.gov.uk/scale-up-worker-visa",
    requirements: ["Подходящее предложение работы", "Соответствующий работодатель", "Зарплата и английский по правилам маршрута"],
    questions: ["jobOffer", "sponsor", "english", "funds"],
    match: p => p.jobOffer === "yes" && p.sponsor === "yes" ? 82 : p.jobOffer === "yes" ? 55 : 25,
    advice: (p, l) => [
      l === "ru" ? "Проверить соответствие работодателя и вакансии условиям Scale-up." : "Check that the employer and role qualify for Scale-up.",
      l === "ru" ? "Сверить зарплату и английский с актуальными правилами." : "Check current salary and English requirements.",
    ],
  },
  {
    id: "graduate",
    name: "Graduate visa",
    category: "study",
    description: "Для подходящих выпускников, которые завершили квалифицирующуюся учёбу в Великобритании.",
    url: "https://www.gov.uk/graduate-visa",
    requirements: ["Учёба в Великобритании по подходящей программе", "Подходящий статус Student", "Учебное заведение сообщило об успешном завершении курса"],
    questions: ["studentOffer", "currentVisa", "degree"],
    match: p => p.currentVisa === "yes" && p.degree === "yes" ? 85 : p.currentVisa === "yes" ? 65 : 25,
    advice: (p, l) => [
      l === "ru" ? "Проверить, имеете ли вы право подать заявление после завершения подходящего курса в Великобритании." : "Check whether your completed UK course qualifies.",
      l === "ru" ? "Уточнить действующие правила Graduate visa и сроки подачи." : "Check current Graduate visa rules and application timing.",
    ],
  },
  {
    id: "student",
    name: "Student visa",
    category: "study",
    description: "Для обучения на подходящем курсе у лицензированного учебного спонсора.",
    url: "https://www.gov.uk/student-visa",
    requirements: ["Предложение от лицензированного учебного заведения", "Confirmation of Acceptance for Studies", "Финансовые условия", "Английский, если требуется"],
    questions: ["studentOffer", "english", "funds"],
    match: p => p.studentOffer === "yes" && p.funds === "yes" ? 85 : p.studentOffer === "yes" ? 65 : 30,
    advice: (p, l) => [
      p.studentOffer !== "yes" ? (l === "ru" ? "Получить предложение от лицензированного учебного заведения." : "Obtain an offer from a licensed student sponsor.") : "",
      p.funds !== "yes" ? (l === "ru" ? "Проверить необходимую сумму и правила подтверждения средств." : "Check the required funds and evidence rules.") : "",
    ],
  },
  {
    id: "child-student",
    name: "Child Student visa",
    category: "study",
    description: "Для детей, которые хотят учиться в подходящей независимой школе Великобритании.",
    url: "https://www.gov.uk/child-study-visa",
    requirements: ["Возраст и подходящая школа", "Предложение о месте", "Согласие и условия проживания", "Финансы"],
    questions: ["studentOffer", "funds"],
    match: p => p.studentOffer === "yes" ? 72 : 30,
    advice: (_p, l) => [l === "ru" ? "Проверить возрастные условия, тип школы и требования к согласию родителей." : "Check age limits, school eligibility and parental consent requirements."],
  },
  {
    id: "family-partner",
    name: "Family visa — partner or spouse",
    category: "family",
    description: "Для партнёра или супруга человека, который соответствует требованиям спонсора в Великобритании.",
    url: "https://www.gov.uk/uk-family-visa/partner-spouse",
    requirements: ["Подходящий статус партнёра в Великобритании", "Настоящие отношения", "Финансовые требования", "Жильё и язык, где применимо"],
    questions: ["familyInUK", "partnerStatus", "english", "funds"],
    match: p => p.familyInUK === "yes" && p.partnerStatus === "yes" ? 86 : p.familyInUK === "yes" ? 62 : 25,
    advice: (p, l) => [
      p.familyInUK !== "yes" ? (l === "ru" ? "Уточнить, есть ли подходящий член семьи или партнёр в Великобритании." : "Confirm whether you have a qualifying family member or partner in the UK.") : "",
      l === "ru" ? "Проверить конкретные финансовые условия и доказательства отношений." : "Check the applicable financial rules and evidence of the relationship.",
    ],
  },
  {
    id: "family-child",
    name: "Family visa — child",
    category: "family",
    description: "Для ребёнка, который хочет присоединиться к родителю или остаться с ним в Великобритании.",
    url: "https://www.gov.uk/uk-family-visa/child",
    requirements: ["Подходящий родитель или спонсор", "Возраст и обстоятельства ребёнка", "Документы о родстве и уходе"],
    questions: ["familyInUK", "funds"],
    match: p => p.familyInUK === "yes" ? 72 : 25,
    advice: (_p, l) => [l === "ru" ? "Проверить требования к статусу родителя, возрасту ребёнка и документам о родстве." : "Check the parent's status, the child's age and relationship evidence."],
  },
  {
    id: "family-adult",
    name: "Family visa — adult coming to be cared for",
    category: "family",
    description: "Узкий семейный маршрут для взрослых, которым требуется долгосрочный уход от родственника в Великобритании.",
    url: "https://www.gov.uk/uk-family-visa/adult-dependent-relative",
    requirements: ["Необходимость долгосрочного ухода", "Подходящий родственник в Великобритании", "Строгие условия доступности ухода"],
    questions: ["familyInUK"],
    match: p => p.familyInUK === "yes" ? 55 : 15,
    advice: (_p, l) => [l === "ru" ? "Это узкий маршрут с высокими требованиями; проверьте официальный критерий ухода до подачи." : "This is a narrow route with strict care requirements; check the official criteria before applying."],
  },
  {
    id: "visitor",
    name: "Standard Visitor visa",
    category: "visit",
    description: "Для туризма, посещения друзей или семьи, некоторых деловых мероприятий и разрешённых краткосрочных целей.",
    url: "https://www.gov.uk/standard-visitor",
    requirements: ["Временная цель визита", "Достаточные средства", "Намерение соблюдать условия визита", "Виза, если требуется по гражданству"],
    questions: ["funds", "location"],
    match: p => p.funds === "yes" ? 75 : 50,
    advice: (_p, l) => [
      l === "ru" ? "Проверить, нужна ли именно виза или ETA для вашего гражданства и поездки." : "Check whether your nationality and trip require a visa or an ETA.",
      l === "ru" ? "Подготовить цель поездки, бюджет, жильё и доказательства планов вернуться." : "Prepare evidence of purpose, budget, accommodation and plans to leave.",
    ],
  },
  {
    id: "marriage-visitor",
    name: "Marriage Visitor visa",
    category: "visit",
    description: "Для поездки в Великобританию с целью заключить брак или зарегистрировать партнёрство без планов остаться по семейному маршруту.",
    url: "https://www.gov.uk/marriage-visa",
    requirements: ["Намерение заключить брак или зарегистрировать партнёрство", "Временный визит", "Финансы и соблюдение условий"],
    questions: ["funds", "partnerStatus"],
    match: p => p.partnerStatus === "yes" ? 70 : 40,
    advice: (_p, l) => [l === "ru" ? "Сравните этот маршрут с Family visa: Marriage Visitor обычно не предназначена для дальнейшего проживания в Великобритании." : "Compare this route with a Family visa; Marriage Visitor is not intended for settlement in the UK."],
  },
  {
    id: "high-potential",
    name: "High Potential Individual (HPI) visa",
    category: "special",
    description: "Для выпускников определённых зарубежных университетов, отвечающих актуальным критериям.",
    url: "https://www.gov.uk/high-potential-individual-visa",
    requirements: ["Подходящая зарубежная квалификация", "Университет из актуального списка", "Английский и финансовые условия"],
    questions: ["degree", "english", "funds"],
    match: p => p.degree === "yes" ? 70 : 30,
    advice: (_p, l) => [l === "ru" ? "Проверьте год окончания, соответствие диплома и официальный список университетов." : "Check your graduation date, qualification and the official university list."],
  },
  {
    id: "youth-mobility",
    name: "Youth Mobility Scheme visa",
    category: "special",
    description: "Временное проживание и работа для граждан определённых стран, отвечающих возрастным и другим условиям.",
    url: "https://www.gov.uk/youth-mobility",
    requirements: ["Подходящее гражданство", "Возраст в допустимом диапазоне", "Финансовые условия и дополнительные правила страны"],
    questions: ["age", "citizenship", "funds"],
    match: p => {
      const age = Number(p.age);
      return age >= 18 && age <= 35 ? 65 : age > 0 ? 25 : 40;
    },
    advice: (_p, l) => [l === "ru" ? "Проверьте список стран и возрастные условия: они различаются по гражданству." : "Check the country list and age limits, which vary by nationality."],
  },
  {
    id: "uk-ancestry",
    name: "UK Ancestry visa",
    category: "special",
    description: "Для некоторых граждан стран Содружества с квалифицирующимся британским дедушкой или бабушкой.",
    url: "https://www.gov.uk/ancestry-visa",
    requirements: ["Подходящее гражданство", "Квалифицирующееся происхождение", "Намерение и возможность работать"],
    questions: ["ancestry", "funds"],
    match: p => p.ancestry === "yes" ? 82 : p.ancestry === "no" ? 10 : 30,
    advice: (p, l) => [
      p.ancestry !== "yes" ? (l === "ru" ? "Проверить гражданство и документы о рождении, подтверждающие происхождение." : "Check nationality and birth records proving ancestry.") : "",
    ],
  },
  {
    id: "global-business-mobility",
    name: "Global Business Mobility — Senior or Specialist Worker",
    category: "work",
    description: "Для некоторых сотрудников зарубежной компании, переводимых в связанную британскую организацию.",
    url: "https://www.gov.uk/senior-specialist-worker-visa",
    requirements: ["Работа в зарубежной компании", "Подходящая связь между компаниями", "Перевод на соответствующую должность", "Спонсорство"],
    questions: ["jobOffer", "sponsor"],
    match: p => p.jobOffer === "yes" && p.sponsor === "yes" ? 78 : 35,
    advice: (_p, l) => [l === "ru" ? "Проверьте, подходит ли перевод внутри компании и соответствует ли должность маршруту." : "Check whether your intra-company transfer and role qualify."],
  },
  {
    id: "seasonal-worker",
    name: "Seasonal Worker visa",
    category: "work",
    description: "Для временной сезонной работы в предусмотренных секторах.",
    url: "https://www.gov.uk/seasonal-worker-visa",
    requirements: ["Подходящая сезонная работа", "Утверждённый оператор схемы", "Спонсорство и финансовые условия"],
    questions: ["jobOffer", "sponsor", "funds"],
    match: p => p.jobOffer === "yes" && p.sponsor === "yes" ? 78 : 35,
    advice: (_p, l) => [l === "ru" ? "Проверяйте только утверждённых операторов и условия конкретной сезонной схемы." : "Use approved scheme operators and check the specific seasonal scheme."],
  },
  {
    id: "creative-worker",
    name: "Temporary Work — Creative Worker visa",
    category: "work",
    description: "Для подходящих временных проектов в творческой индустрии.",
    url: "https://www.gov.uk/creative-worker-visa",
    requirements: ["Подходящая творческая работа", "Спонсор", "Certificate of Sponsorship", "Условия маршрута"],
    questions: ["jobOffer", "sponsor"],
    match: p => p.jobOffer === "yes" && p.sponsor === "yes" ? 78 : 35,
    advice: (_p, l) => [l === "ru" ? "Проверьте критерии Creative Worker и требования к спонсору." : "Check Creative Worker eligibility and sponsor requirements."],
  },
  {
    id: "charity-worker",
    name: "Temporary Work — Charity Worker visa",
    category: "work",
    description: "Для подходящей неоплачиваемой добровольческой работы в благотворительной организации.",
    url: "https://www.gov.uk/charity-worker-visa",
    requirements: ["Подходящая благотворительная работа", "Лицензированный спонсор", "Временная цель"],
    questions: ["jobOffer", "sponsor"],
    match: p => p.sponsor === "yes" ? 70 : 35,
    advice: (_p, l) => [l === "ru" ? "Проверьте, соответствует ли работа условиям маршрута: обычная оплачиваемая работа не подходит." : "Check the route's permitted volunteer role; ordinary paid employment does not qualify."],
  },
  {
    id: "religious-worker",
    name: "Temporary Work — Religious Worker visa",
    category: "work",
    description: "Для временной религиозной деятельности, отвечающей условиям маршрута.",
    url: "https://www.gov.uk/religious-worker-visa",
    requirements: ["Подходящая религиозная деятельность", "Спонсорство", "Временный маршрут"],
    questions: ["jobOffer", "sponsor"],
    match: p => p.sponsor === "yes" ? 70 : 30,
    advice: (_p, l) => [l === "ru" ? "Проверьте, какой религиозный маршрут подходит: Religious Worker и Minister of Religion различаются." : "Check which religious route applies; Religious Worker and Minister of Religion differ."],
  },
  {
    id: "international-sportsperson",
    name: "International Sportsperson visa",
    category: "work",
    description: "Для квалифицирующихся спортсменов и тренеров с одобрением и спонсорством по правилам маршрута.",
    url: "https://www.gov.uk/sportsperson-visa",
    requirements: ["Подходящая спортивная роль", "Одобрение соответствующего органа", "Спонсорство"],
    questions: ["jobOffer", "sponsor", "highAchievement"],
    match: p => p.highAchievement === "yes" && p.sponsor === "yes" ? 82 : 35,
    advice: (_p, l) => [l === "ru" ? "Проверить требования соответствующего спортивного органа и спонсора." : "Check the relevant sporting body's endorsement and sponsor requirements."],
  },
  {
    id: "minister-religion",
    name: "Minister of Religion visa (T2)",
    category: "work",
    description: "Для подходящих религиозных служителей с соответствующим спонсорством.",
    url: "https://www.gov.uk/minister-of-religion-visa",
    requirements: ["Подходящая религиозная должность", "Одобренный спонсор", "Документы и условия маршрута"],
    questions: ["jobOffer", "sponsor"],
    match: p => p.jobOffer === "yes" && p.sponsor === "yes" ? 78 : 35,
    advice: (_p, l) => [l === "ru" ? "Проверьте конкретную должность и лицензию спонсора." : "Check the specific role and sponsor licence."],
  },
  {
    id: "representative",
    name: "Representative of an Overseas Business",
    category: "business",
    description: "Узкий маршрут для определённых представителей зарубежного бизнеса и работников СМИ.",
    url: "https://www.gov.uk/representative-overseas-business",
    requirements: ["Соответствующая зарубежная компания или СМИ", "Критерии представителя", "Документы работодателя"],
    questions: ["jobOffer", "sponsor"],
    match: p => p.jobOffer === "yes" ? 55 : 20,
    advice: (_p, l) => [l === "ru" ? "Проверьте доступность маршрута для вашей ситуации и актуальные ограничения." : "Check route availability and current restrictions for your circumstances."],
  },
  {
    id: "bn-o",
    name: "British National (Overseas) visa",
    category: "special",
    description: "Для лиц с соответствующим статусом British National (Overseas) и, в предусмотренных случаях, членов семьи.",
    url: "https://www.gov.uk/british-national-overseas-bno-visa",
    requirements: ["Статус BN(O) или соответствующая семейная связь", "Условия проживания и финансов"],
    questions: ["familyInUK", "funds"],
    match: p => p.familyInUK === "yes" ? 50 : 20,
    advice: (_p, l) => [l === "ru" ? "Этот маршрут относится к конкретному статусу BN(O); обычного гражданства Гонконга недостаточно." : "This route is tied to BN(O) status; Hong Kong residence alone is not enough."],
  },
  {
    id: "protection",
    name: "Asylum / international protection",
    category: "protection",
    description: "Для людей, которым нужна защита от преследования или серьёзной опасности. Это не обычная рабочая или миграционная виза.",
    url: "https://www.gov.uk/claim-asylum",
    requirements: ["Индивидуальные обстоятельства", "Основания для международной защиты", "Рассмотрение компетентными органами"],
    questions: ["protectionNeed", "location"],
    match: p => p.protectionNeed === "yes" ? 75 : 10,
    advice: (_p, l) => [
      l === "ru" ? "Вопросы защиты зависят от индивидуальных фактов и доказательств. Онлайн-анкета не может определить право на убежище." : "Protection claims depend on individual facts and evidence. This questionnaire cannot determine asylum eligibility.",
      l === "ru" ? "При непосредственной опасности обратитесь к экстренным службам; по юридическим вопросам ищите квалифицированную иммиграционную помощь." : "If you are in immediate danger, contact emergency services; seek qualified immigration advice for legal questions.",
    ],
  },
  {
    id: "settlement",
    name: "Indefinite Leave to Remain (ILR)",
    category: "settlement",
    description: "Постоянное проживание по одному из подходящих маршрутов при выполнении соответствующих условий.",
    url: "https://www.gov.uk/indefinite-leave-to-remain",
    requirements: ["Подходящий текущий иммиграционный маршрут", "Необходимый срок и условия проживания", "Требования к языку и Life in the UK, где применимо"],
    questions: ["currentVisa", "location", "english"],
    match: p => p.currentVisa === "yes" ? 65 : 20,
    advice: (_p, l) => [l === "ru" ? "Сроки и условия ILR зависят от текущего маршрута; проверьте правила именно для вашего статуса." : "ILR qualifying periods and conditions depend on your current route; check the rules for your status."],
  },
];

const categories: { id: Category; ru: string; en: string }[] = [
  { id: "all", ru: "Все маршруты", en: "All routes" },
  { id: "work", ru: "Работа", en: "Work" },
  { id: "study", ru: "Учёба", en: "Study" },
  { id: "family", ru: "Семья", en: "Family" },
  { id: "visit", ru: "Визит", en: "Visit" },
  { id: "business", ru: "Бизнес", en: "Business" },
  { id: "special", ru: "Специальные маршруты", en: "Special routes" },
  { id: "protection", ru: "Защита", en: "Protection" },
  { id: "settlement", ru: "ПМЖ", en: "Settlement" },
];

function isAnswer(v: unknown): v is Answer {
  return v === "yes" || v === "no" || v === "unknown";
}

function answerLabel(value: Answer, lang: Language) {
  if (lang === "en") {
    return value === "yes" ? "Yes" : value === "no" ? "No" : "Not sure";
  }
  return value === "yes" ? "Да" : value === "no" ? "Нет" : "Не знаю";
}

export default function NavigatorPage() {
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [submitted, setSubmitted] = useState(false);
  const lang = profile.language;
  const ru = lang === "ru";

  function update<K extends keyof Profile>(key: K, value: Profile[K]) {
    setProfile(current => ({ ...current, [key]: value }));
  }

  const t = {
    eyebrow: ru ? "ESURPYS · ИММИГРАЦИОННЫЙ НАВИГАТОР" : "ESURPYS · IMMIGRATION NAVIGATOR",
    title: ru ? "Найди свой маршрут в Великобританию" : "Find your route to the UK",
    intro: ru
      ? "Расскажи о своих целях и обстоятельствах. Мы подберём варианты, покажем официальные названия маршрутов и подскажем, что проверить дальше."
      : "Tell us about your goals and circumstances. We’ll suggest routes, show official route names and explain what to check next.",
    profile: ru ? "1. О тебе" : "1. About you",
    goal: ru ? "Какая у тебя цель?" : "What is your goal?",
    location: ru ? "Где ты сейчас находишься?" : "Where are you now?",
    outside: ru ? "За пределами Великобритании" : "Outside the UK",
    inside: ru ? "В Великобритании" : "In the UK",
    unknown: ru ? "Пока не уверен(а)" : "Not sure yet",
    age: ru ? "Возраст" : "Age",
    citizenship: ru ? "Гражданство" : "Citizenship",
    job: ru ? "Есть предложение работы?" : "Do you have a job offer?",
    sponsor: ru ? "Работодатель имеет лицензию спонсора?" : "Is the employer a licensed sponsor?",
    student: ru ? "Есть предложение от учебного заведения?" : "Do you have an offer from an educational institution?",
    family: ru ? "Есть член семьи в Великобритании?" : "Do you have a family member in the UK?",
    partner: ru ? "Есть подходящий партнёр / супруг?" : "Do you have a qualifying partner or spouse?",
    english: ru ? "Можешь подтвердить знание английского, если это требуется?" : "Can you meet the English requirement, if applicable?",
    funds: ru ? "Есть средства на расходы, если они требуются?" : "Do you have funds for required expenses?",
    degree: ru ? "Есть высшее образование или подходящая квалификация?" : "Do you have a degree or qualifying qualification?",
    achievement: ru ? "Есть значительные профессиональные достижения?" : "Do you have significant professional achievements?",
    idea: ru ? "Есть идея для бизнеса?" : "Do you have a business idea?",
    endorsement: ru ? "Есть одобрение уполномоченного органа для бизнес-маршрута?" : "Do you have endorsement for a business route?",
    ancestry: ru ? "Есть основания для UK Ancestry?" : "Could you qualify for UK Ancestry?",
    protection: ru ? "Тебе нужна защита от преследования или серьёзной опасности?" : "Do you need protection from persecution or serious danger?",
    currentVisa: ru ? "Есть действующая или недавняя британская виза / статус?" : "Do you have current or recent UK permission?",
    notes: ru ? "Дополнительная информация (необязательно)" : "Additional information (optional)",
    notesPlaceholder: ru ? "Например: профессия, диплом, семейные обстоятельства, желаемый срок переезда..." : "For example: occupation, degree, family circumstances, intended move date...",
    button: ru ? "Подобрать маршруты" : "Find my routes",
    results: ru ? "2. Предварительные результаты" : "2. Preliminary results",
    noResults: ru ? "Пока недостаточно данных. Заполни хотя бы цель и несколько вопросов — тогда мы сможем предложить маршруты." : "There is not enough information yet. Select a goal and answer a few questions to see routes.",
    match: ru ? "Совпадение с ответами" : "Answer match",
    advice: ru ? "Что проверить дальше" : "What to check next",
    requirements: ru ? "Основные требования для проверки" : "Main requirements to check",
    official: ru ? "Официальная страница GOV.UK ↗" : "Official GOV.UK page ↗",
    reset: ru ? "Сбросить анкету" : "Reset questionnaire",
    disclaimer: ru
      ? "Важно: процент показывает предварительное совпадение с ответами анкеты, а не вероятность одобрения визы. Это не юридическая консультация. Полный список виз и специальных схем зависит от гражданства и обстоятельств; проверяй актуальные правила на GOV.UK."
      : "Important: the percentage indicates preliminary alignment with your answers, not the probability of visa approval. This is not legal advice. Available routes depend on nationality and circumstances; verify current rules on GOV.UK.",
  };

  const results = useMemo(() => {
    const hasProfile = profile.goal !== "all" ||
      [profile.jobOffer, profile.sponsor, profile.studentOffer, profile.familyInUK,
        profile.partnerStatus, profile.english, profile.funds, profile.degree,
        profile.highAchievement, profile.businessIdea, profile.endorsement,
        profile.ancestry, profile.protectionNeed, profile.currentVisa]
        .some(v => v !== "unknown");

    if (!submitted || !hasProfile) return [];

    const selected = routes.filter(route => {
      if (profile.goal !== "all" && route.category !== profile.goal) return false;
      return true;
    });

    return selected.map(route => {
      let score = route.match(profile);
      const knownCount = route.questions.filter(key => {
        const value = profile[key];
        return isAnswer(value) && value !== "unknown";
      }).length;
      const questionCount = Math.max(route.questions.length, 1);
      const knownRatio = knownCount / questionCount;

      // The score is a rough profile-to-route fit indicator, not a legal eligibility score.
      score = Math.round(score * 0.75 + knownRatio * 25);
      score = Math.max(5, Math.min(score, 95));

      const advice = route.advice(profile, lang).filter(Boolean);
      const unknowns = route.questions.filter(key => {
        const value = profile[key];
        return isAnswer(value) && value === "unknown";
      });

      if (unknowns.length > 0) {
        advice.push(ru
          ? `Уточни ещё ${unknowns.length} пункт(а/ов) анкеты, связанных с этим маршрутом.`
          : `Answer ${unknowns.length} more question(s) related to this route.`);
      }

      return { ...route, score, advice };
    }).sort((a, b) => b.score - a.score);
  }, [profile, submitted, lang, ru]);

  function selectAnswer(
    key: keyof Profile,
    label: string,
  ) {
    const value = profile[key];
    return (
      <label className="flex flex-col gap-2 text-sm text-slate-300" key={key}>
        <span className="font-medium">{label}</span>
        <select
          value={String(value)}
          onChange={e => update(key, e.target.value as Profile[keyof Profile])}
          className="w-full rounded-xl border border-white/15 bg-slate-900 px-3 py-3 text-base outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
        >
          <option value="unknown">{answerLabel("unknown", lang)}</option>
          <option value="yes">{answerLabel("yes", lang)}</option>
          <option value="no">{answerLabel("no", lang)}</option>
        </select>
      </label>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="text-lg font-black tracking-tight">
            Esurpys<span className="text-cyan-300">.</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">{t.eyebrow}</span>
            <button
              type="button"
              onClick={() => update("language", ru ? "en" : "ru")}
              className="rounded-full border border-white/15 bg-slate-900 px-3 py-2 text-sm font-semibold hover:bg-slate-800"
            >
              {ru ? "EN" : "RU"}
            </button>
          </div>
        </header>

        <section className="mb-8 rounded-3xl bg-slate-900 px-6 py-8 text-white sm:px-10 sm:py-12">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-blue-300">
            {t.eyebrow}
          </p>
          <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
            {t.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            {t.intro}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {[
              ru ? "Работа" : "Work",
              ru ? "Учёба" : "Study",
              ru ? "Семья" : "Family",
              ru ? "Бизнес" : "Business",
              ru ? "Другие маршруты" : "Other routes",
            ].map(item => (
              <span key={item} className="rounded-full border border-white/20 px-3 py-1.5 text-sm text-slate-200">
                {item}
              </span>
            ))}
          </div>
        </section>

        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <section className="rounded-3xl border border-white/10 bg-slate-900 p-5 shadow-sm sm:p-7">
            <div className="mb-6">
              <p className="text-sm font-semibold text-cyan-300">ESURPYS / 01</p>
              <h2 className="mt-1 text-2xl font-bold">{t.profile}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                {ru
                  ? "Если не знаешь ответ, оставь «Не знаю». Мы не будем считать неизвестное подтверждённым требованием."
                  : "If you do not know an answer, leave it as “Not sure”. Unknown requirements will not be treated as confirmed."}
              </p>
            </div>

            <div className="space-y-5">
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-300">
                {t.goal}
                <select
                  value={profile.goal}
                  onChange={e => update("goal", e.target.value as Category)}
                  className="rounded-xl border border-white/15 bg-slate-900 px-3 py-3 text-base"
                >
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{ru ? c.ru : c.en}</option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-2 text-sm font-medium text-slate-300">
                {t.location}
                <select
                  value={profile.location}
                  onChange={e => update("location", e.target.value as Profile["location"])}
                  className="rounded-xl border border-white/15 bg-slate-900 px-3 py-3 text-base"
                >
                  <option value="unknown">{t.unknown}</option>
                  <option value="outside">{t.outside}</option>
                  <option value="inside">{t.inside}</option>
                </select>
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm font-medium text-slate-300">
                  {t.age}
                  <input
                    type="number"
                    min="0"
                    max="120"
                    value={profile.age}
                    onChange={e => update("age", e.target.value)}
                    placeholder={ru ? "Например, 29" : "e.g. 29"}
                    className="rounded-xl border border-white/15 px-3 py-3 text-base"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-medium text-slate-300">
                  {t.citizenship}
                  <input
                    value={profile.citizenship}
                    onChange={e => update("citizenship", e.target.value)}
                    placeholder={ru ? "Например, Россия" : "e.g. Russia"}
                    className="rounded-xl border border-white/15 px-3 py-3 text-base"
                  />
                </label>
              </div>

              <div className="border-t border-white/10 pt-5">
                <h3 className="mb-4 font-bold">
                  {ru ? "Работа и квалификация" : "Work and qualifications"}
                </h3>
                <div className="space-y-4">
                  {selectAnswer("jobOffer", t.job)}
                  {selectAnswer("sponsor", t.sponsor)}
                  {selectAnswer("degree", t.degree)}
                  {selectAnswer("highAchievement", t.achievement)}
                </div>
              </div>

              <div className="border-t border-white/10 pt-5">
                <h3 className="mb-4 font-bold">
                  {ru ? "Учёба и семья" : "Study and family"}
                </h3>
                <div className="space-y-4">
                  {selectAnswer("studentOffer", t.student)}
                  {selectAnswer("familyInUK", t.family)}
                  {selectAnswer("partnerStatus", t.partner)}
                </div>
              </div>

              <div className="border-t border-white/10 pt-5">
                <h3 className="mb-4 font-bold">
                  {ru ? "Бизнес и специальные обстоятельства" : "Business and special circumstances"}
                </h3>
                <div className="space-y-4">
                  {selectAnswer("businessIdea", t.idea)}
                  {selectAnswer("endorsement", t.endorsement)}
                  {selectAnswer("ancestry", t.ancestry)}
                  {selectAnswer("protectionNeed", t.protection)}
                  {selectAnswer("currentVisa", t.currentVisa)}
                </div>
              </div>

              <div className="border-t border-white/10 pt-5">
                <h3 className="mb-4 font-bold">
                  {ru ? "Общие условия" : "General requirements"}
                </h3>
                <div className="space-y-4">
                  {selectAnswer("english", t.english)}
                  {selectAnswer("funds", t.funds)}
                </div>
              </div>

              <label className="flex flex-col gap-2 text-sm font-medium text-slate-300">
                {t.notes}
                <textarea
                  rows={3}
                  value={profile.notes}
                  onChange={e => update("notes", e.target.value)}
                  placeholder={t.notesPlaceholder}
                  className="rounded-xl border border-white/15 px-3 py-3 text-base"
                />
              </label>

              <button
                type="button"
                onClick={() => {
                  setSubmitted(true);
                  document.getElementById("navigator-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="w-full rounded-xl bg-cyan-400 px-5 py-4 font-bold text-white transition hover:bg-cyan-300"
              >
                {t.button}
              </button>
              <p className="text-xs leading-5 text-slate-500">{t.disclaimer}</p>
            </div>
          </section>

          <section id="navigator-results" className="scroll-mt-6">
            <div className="mb-5">
              <p className="text-sm font-semibold text-cyan-300">ESURPYS / 02</p>
              <h2 className="mt-1 text-2xl font-bold">{t.results}</h2>
            </div>

            {!submitted ? (
              <div className="rounded-3xl border border-dashed border-white/15 bg-slate-900 p-8 sm:p-10">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-2xl">
                  ↗
                </div>
                <h3 className="text-xl font-bold">
                  {ru ? "Твой результат появится здесь" : "Your results will appear here"}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {ru
                    ? "Выбери цель, ответь на вопросы и нажми «Подобрать маршруты». Мы покажем варианты для дальнейшей проверки."
                    : "Choose a goal, answer the questions and select “Find my routes” to see routes to investigate."}
                </p>
              </div>
            ) : results.length === 0 ? (
              <div className="rounded-3xl border border-white/10 bg-slate-900 p-8">
                <p className="leading-7 text-slate-400">{t.noResults}</p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm leading-6 text-slate-500">
                  {ru
                    ? `Показано маршрутов: ${results.length}. Сначала — маршруты с наибольшим предварительным совпадением.`
                    : `${results.length} routes shown, ordered by preliminary match.`}
                </p>

                {results.map((route, index) => (
                  <article key={route.id} className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-sm">
                    <div className="p-5 sm:p-6">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            {ru ? `ВАРИАНТ ${index + 1}` : `OPTION ${index + 1}`}
                          </p>
                          <h3 className="mt-1 text-xl font-bold">{route.name}</h3>
                        </div>
                        <div className="shrink-0 rounded-2xl bg-cyan-400/10 px-3 py-2 text-center">
                          <div className="text-2xl font-black text-cyan-300">{route.score}%</div>
                          <div className="text-[10px] font-semibold text-cyan-300">{t.match}</div>
                        </div>
                      </div>

                      <p className="mt-3 text-sm leading-6 text-slate-400">{route.description}</p>

                      <div className="mt-5">
                        <div className="mb-2 flex justify-between text-xs text-slate-500">
                          <span>{ru ? "Предварительное совпадение" : "Preliminary match"}</span>
                          <span>{route.score}%</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                          <div className="h-full rounded-full bg-cyan-400" style={{ width: `${route.score}%` }} />
                        </div>
                      </div>

                      <div className="mt-5">
                        <h4 className="text-sm font-bold">{t.requirements}</h4>
                        <ul className="mt-2 space-y-2">
                          {route.requirements.map(item => (
                            <li key={item} className="flex gap-2 text-sm leading-5 text-slate-400">
                              <span className="text-cyan-300">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-5 rounded-2xl bg-slate-950 p-4">
                        <h4 className="text-sm font-bold">{t.advice}</h4>
                        <ul className="mt-2 space-y-2">
                          {route.advice.length ? route.advice.map((item, i) => (
                            <li key={`${route.id}-advice-${i}`} className="text-sm leading-6 text-slate-400">
                              {i + 1}. {item}
                            </li>
                          )) : (
                            <li className="text-sm leading-6 text-slate-400">
                              {ru ? "Проверь официальные требования для своей ситуации." : "Check the official requirements for your circumstances."}
                            </li>
                          )}
                        </ul>
                      </div>

                      <a
                        href={route.url}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-cyan-300 hover:text-cyan-200"
                      >
                        {t.official}
                      </a>
                    </div>
                  </article>
                ))}

                <div className="rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm leading-6 text-amber-200">
                  {t.disclaimer}
                </div>
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://www.gov.uk/browse/visas-immigration"
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-white/15 bg-slate-900 px-4 py-3 text-sm font-semibold hover:bg-slate-800"
              >
                {ru ? "Все визы на GOV.UK ↗" : "All visas on GOV.UK ↗"}
              </a>
              <button
                type="button"
                onClick={() => {
                  setProfile(initialProfile);
                  setSubmitted(false);
                }}
                className="rounded-xl border border-white/15 px-4 py-3 text-sm font-semibold hover:bg-slate-800"
              >
                {t.reset}
              </button>
            </div>
          </section>
        </div>

        <footer className="mt-10 border-t border-white/10 py-6 text-xs leading-5 text-slate-500">
          Esurpys · {ru ? "Предварительная информация об иммиграционных маршрутах Великобритании." : "Preliminary information about UK immigration routes."}
          {" "}
          <Link className="underline" href="https://www.gov.uk/guidance/immigration-rules" target="_blank" rel="noreferrer">
            {ru ? "Официальные иммиграционные правила" : "Official Immigration Rules"}
          </Link>
        </footer>
      </div>
    </main>
  );
}