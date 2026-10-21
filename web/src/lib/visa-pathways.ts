export type Language = "en" | "ru";

export type VisaGoal =
  | "work"
  | "study"
  | "business"
  | "family"
  | "research"
  | "humanitarian"
  | "other";

export type VisaPathway = {
  id: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  goals: VisaGoal[];
  preparation: Record<Language, string[]>;
  questions: Record<Language, string[]>;
};

export const visaPathways: VisaPathway[] = [
  {
    id: "skilled-work",
    title: {
      en: "Skilled work",
      ru: "Квалифицированная работа",
    },
    description: {
      en: "Explore immigration routes connected with professional skills, qualifications, and employment.",
      ru: "Изучи маршруты, связанные с профессиональными навыками, квалификацией и трудоустройством.",
    },
    goals: ["work"],
    preparation: {
      en: [
        "Describe your occupation and professional skills.",
        "Document your work experience and qualifications.",
        "Check whether the destination requires a job offer or employer sponsorship.",
        "Verify language, salary, licensing, and other country-specific rules.",
      ],
      ru: [
        "Опиши профессию и профессиональные навыки.",
        "Подготовь подтверждения опыта работы и квалификации.",
        "Проверь, требуется ли предложение о работе или спонсорство работодателя.",
        "Уточни языковые, зарплатные, лицензионные и другие требования выбранной страны.",
      ],
    },
    questions: {
      en: [
        "What is your occupation?",
        "How many years of relevant experience do you have?",
        "Do you have a job offer?",
        "Can you document your qualifications?",
      ],
      ru: [
        "Какая у тебя профессия?",
        "Сколько лет релевантного опыта у тебя есть?",
        "Есть ли предложение о работе?",
        "Можешь ли ты документально подтвердить квалификацию?",
      ],
    },
  },
  {
    id: "study",
    title: {
      en: "Study and education",
      ru: "Учёба и образование",
    },
    description: {
      en: "Explore routes related to universities, colleges, vocational training, and other educational programs.",
      ru: "Изучи маршруты для университетов, колледжей, профессионального обучения и других образовательных программ.",
    },
    goals: ["study"],
    preparation: {
      en: [
        "Choose an educational program and institution.",
        "Check admission and language requirements.",
        "Review tuition, living costs, and accepted proof of funds.",
        "Verify student immigration rules for the destination.",
      ],
      ru: [
        "Выбери образовательную программу и учебное заведение.",
        "Проверь требования к поступлению и языку.",
        "Оцени стоимость обучения, проживания и допустимые подтверждения средств.",
        "Уточни иммиграционные правила для студентов в выбранной стране.",
      ],
    },
    questions: {
      en: [
        "What level of education do you want to pursue?",
        "Have you received an admission offer?",
        "Can you document your available funds?",
        "Do you meet the program's language requirements?",
      ],
      ru: [
        "На какой уровень образования ты хочешь поступить?",
        "Есть ли приглашение или подтверждение зачисления?",
        "Можешь ли ты подтвердить наличие средств?",
        "Соответствуешь ли ты языковым требованиям программы?",
      ],
    },
  },
  {
    id: "entrepreneur",
    title: {
      en: "Business and entrepreneurship",
      ru: "Бизнес и предпринимательство",
    },
    description: {
      en: "Explore routes that may relate to founding a company, running a business, or developing a startup.",
      ru: "Изучи маршруты, которые могут быть связаны с открытием компании, ведением бизнеса или развитием стартапа.",
    },
    goals: ["business"],
    preparation: {
      en: [
        "Describe your business idea and business model.",
        "Prepare a business plan and evidence of relevant experience.",
        "Document available investment or operating funds.",
        "Check whether the destination has a suitable business immigration category.",
      ],
      ru: [
        "Опиши бизнес-идею и бизнес-модель.",
        "Подготовь бизнес-план и подтверждение релевантного опыта.",
        "Подготовь документы о доступных инвестициях или оборотных средствах.",
        "Проверь, существует ли в выбранной стране подходящая бизнес-категория.",
      ],
    },
    questions: {
      en: [
        "Do you have an operating business or a business idea?",
        "Can you document business or management experience?",
        "What funding can you demonstrate?",
        "Have you researched the destination's business rules?",
      ],
      ru: [
        "У тебя уже есть действующий бизнес или только идея?",
        "Можешь ли ты подтвердить предпринимательский или управленческий опыт?",
        "Какой объём финансирования ты можешь подтвердить?",
        "Изучал ли ты правила для предпринимателей в выбранной стране?",
      ],
    },
  },
  {
    id: "family",
    title: {
      en: "Family reunification",
      ru: "Воссоединение семьи",
    },
    description: {
      en: "Explore possible routes based on family relationships with a citizen or resident of the destination.",
      ru: "Изучи возможные маршруты на основании родственных отношений с гражданином или резидентом выбранной страны.",
    },
    goals: ["family"],
    preparation: {
      en: [
        "Identify the family relationship relevant to the application.",
        "Check the sponsor's citizenship or residence status.",
        "Gather official documents proving the relationship.",
        "Verify financial, housing, age, and other applicable conditions.",
      ],
      ru: [
        "Определи родственную связь, на которой может основываться заявление.",
        "Уточни гражданство или статус проживания принимающего родственника.",
        "Подготовь официальные документы, подтверждающие родство.",
        "Проверь финансовые, жилищные, возрастные и другие применимые условия.",
      ],
    },
    questions: {
      en: [
        "Which family relationship is relevant?",
        "Does your family member live legally in the destination?",
        "Can you provide official proof of the relationship?",
        "Have you checked the destination's family immigration rules?",
      ],
      ru: [
        "Какая родственная связь имеет значение?",
        "Проживает ли член семьи в выбранной стране на законных основаниях?",
        "Можешь ли ты предоставить официальное подтверждение родства?",
        "Проверял ли ты правила воссоединения семьи в этой стране?",
      ],
    },
  },
  {
    id: "research",
    title: {
      en: "Research and exceptional expertise",
      ru: "Наука и выдающаяся экспертиза",
    },
    description: {
      en: "Explore routes that may be relevant to researchers, academics, or people with documented specialist achievements.",
      ru: "Изучи маршруты, которые могут подойти исследователям, учёным и специалистам с документально подтверждёнными достижениями.",
    },
    goals: ["research", "work"],
    preparation: {
      en: [
        "Document research, publications, specialist work, or achievements.",
        "Check whether a host institution, employer, or invitation is needed.",
        "Collect evidence of qualifications and professional recognition.",
        "Verify the exact criteria of any destination-specific program.",
      ],
      ru: [
        "Подтверди исследования, публикации, специализированную работу или достижения.",
        "Уточни, нужны ли принимающая организация, работодатель или приглашение.",
        "Собери подтверждения квалификации и профессионального признания.",
        "Проверь точные критерии программы выбранной страны.",
      ],
    },
    questions: {
      en: [
        "Do you have research, publications, or documented achievements?",
        "Do you have a potential host institution or employer?",
        "Can you provide evidence of your qualifications?",
        "Have you identified a specific program?",
      ],
      ru: [
        "Есть ли у тебя исследования, публикации или подтверждённые достижения?",
        "Есть ли потенциальная принимающая организация или работодатель?",
        "Можешь ли ты подтвердить свою квалификацию?",
        "Нашёл ли ты конкретную программу?",
      ],
    },
  },
  {
    id: "humanitarian",
    title: {
      en: "Humanitarian protection",
      ru: "Гуманитарная защита",
    },
    description: {
      en: "Find official information about protection routes where a person's circumstances may be relevant.",
      ru: "Найди официальную информацию о защитных механизмах, если обстоятельства человека могут иметь значение.",
    },
    goals: ["humanitarian"],
    preparation: {
      en: [
        "Read the official protection guidance for the destination.",
        "Check which circumstances and legal grounds the process covers.",
        "Keep relevant identity documents and evidence safe where possible.",
        "Seek qualified legal or specialist support for individual circumstances.",
      ],
      ru: [
        "Изучи официальные правила предоставления защиты в выбранной стране.",
        "Проверь, какие обстоятельства и правовые основания охватывает процедура.",
        "По возможности сохрани удостоверяющие личность документы и относящиеся к делу материалы.",
        "Обратись за квалифицированной юридической или специализированной помощью.",
      ],
    },
    questions: {
      en: [
        "Which destination's official protection guidance do you need?",
        "Have you reviewed the relevant official procedure?",
        "Would you benefit from specialist legal support?",
      ],
      ru: [
        "Правила какой страны тебе нужно изучить?",
        "Ознакомился ли ты с официальной процедурой?",
        "Нужна ли тебе помощь профильного юриста или специалиста?",
      ],
    },
  },
  {
    id: "other",
    title: {
      en: "Other immigration routes",
      ru: "Другие иммиграционные маршруты",
    },
    description: {
      en: "Explore other possible categories, including temporary residence, exchange, and special-purpose programs.",
      ru: "Изучи другие возможные категории: временное проживание, обменные программы и специальные основания.",
    },
    goals: ["other"],
    preparation: {
      en: [
        "Define the purpose and expected duration of your stay.",
        "Identify the official immigration authority for the destination.",
        "Check the available categories and their specific conditions.",
        "Prepare documents only after confirming the applicable route.",
      ],
      ru: [
        "Определи цель и предполагаемую продолжительность пребывания.",
        "Найди официальный миграционный орган выбранной страны.",
        "Изучи доступные категории и их конкретные условия.",
        "Готовь документы после того, как подтвердил подходящий маршрут.",
      ],
    },
    questions: {
      en: [
        "What is the purpose of your move?",
        "How long do you plan to stay?",
        "Have you identified an official immigration category?",
      ],
      ru: [
        "Какова цель переезда?",
        "Как долго ты планируешь оставаться?",
        "Нашёл ли ты официальную иммиграционную категорию?",
      ],
    },
  },
];
