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

const citizenshipOptions: Option[] = [
  opt("ru", "Россия", "Russia"),
  opt("ua", "Украина", "Ukraine"),
  opt("by", "Беларусь", "Belarus"),
  opt("kz", "Казахстан", "Kazakhstan"),
  opt("uz", "Узбекистан", "Uzbekistan"),
  opt("am", "Армения", "Armenia"),
  opt("ge", "Грузия", "Georgia"),
  opt("ca", "Канада", "Canada"),
  opt("us", "США", "United States"),
  opt("gb", "Великобритания", "United Kingdom"),
  opt("de", "Германия", "Germany"),
  opt("fr", "Франция", "France"),
  opt("in", "Индия", "India"),
  opt("cn", "Китай", "China"),
  opt("ph", "Филиппины", "Philippines"),
  opt("br", "Бразилия", "Brazil"),
  opt("mx", "Мексика", "Mexico"),
  opt("au", "Австралия", "Australia"),
  opt("nz", "Новая Зеландия", "New Zealand"),
  opt("jp", "Япония", "Japan"),
  opt("kr", "Южная Корея", "South Korea"),
  opt("other", "Другая страна", "Another country"),
  opt("unknown", "Не уверен(а)", "Not sure"),
];

const questions: Question[] = [
  {
    id: "goal",
    title: "Какова ваша основная цель в Канаде?",
    en: "What is your main goal in Canada?",
    options: [
      opt("permanent", "Получить постоянное место жительства (PR)", "Obtain permanent residence (PR)"),
      opt("work", "Работать в Канаде", "Work in Canada"),
      opt("study", "Учиться в Канаде", "Study in Canada"),
      opt("visit", "Туризм или посещение семьи", "Tourism or visiting family"),
      opt("family", "Воссоединение с семьёй", "Family reunification"),
      opt("business", "Бизнес или предпринимательство", "Business or entrepreneurship"),
      opt("protection", "Получить защиту", "Seek protection"),
      opt("unsure", "Пока не определился(ась)", "Not sure yet"),
    ],
  },
  {
    id: "citizenship",
    title: "Какое у вас гражданство?",
    en: "What is your citizenship?",
    description: "Гражданство влияет на доступность отдельных разрешений, включая IEC.",
    descriptionEn: "Citizenship affects eligibility for certain permits, including IEC.",
    options: citizenshipOptions,
  },
  {
    id: "age",
    title: "Сколько вам лет?",
    en: "How old are you?",
    options: [
      opt("under18", "Младше 18 лет", "Under 18"),
      opt("18to29", "18–29 лет", "18–29"),
      opt("30to35", "30–35 лет", "30–35"),
      opt("36to44", "36–44 года", "36–44"),
      opt("45plus", "45 лет и старше", "45 or older"),
      opt("unknown", "Не хочу указывать", "Prefer not to say"),
    ],
  },
  {
    id: "residence",
    title: "Где вы сейчас проживаете?",
    en: "Where do you currently live?",
    options: [
      opt("citizenship", "В стране своего гражданства", "In my country of citizenship"),
      opt("temporary", "В другой стране временно", "Temporarily in another country"),
      opt("legal", "В другой стране на законных основаниях", "Legally in another country"),
      opt("canada", "Уже нахожусь в Канаде", "Already in Canada"),
      opt("unknown", "Другое / не уверен(а)", "Other / not sure"),
    ],
  },
  {
    id: "english",
    title: "Какой у вас уровень английского?",
    en: "What is your English level?",
    description: "Для иммиграции обычно нужны результаты признанного языкового теста.",
    descriptionEn: "Immigration programs generally require results from an accepted language test.",
    options: [
      opt("basic", "Начальный", "Basic"),
      opt("intermediate", "Средний", "Intermediate"),
      opt("fluent", "Продвинутый / свободный", "Advanced / fluent"),
      opt("test", "Есть действующий результат IELTS / CELPIP / другого теста", "I have a valid IELTS / CELPIP / other test result"),
      opt("unknown", "Не знаю свой уровень", "Not sure"),
    ],
  },
  {
    id: "french",
    title: "Какой у вас уровень французского?",
    en: "What is your French level?",
    options: [
      opt("none", "Не владею", "None"),
      opt("basic", "Начальный", "Basic"),
      opt("intermediate", "Средний", "Intermediate"),
      opt("fluent", "Продвинутый / свободный", "Advanced / fluent"),
      opt("test", "Есть результаты признанного теста", "I have results from an accepted test"),
      opt("unknown", "Не уверен(а)", "Not sure"),
    ],
  },
  {
    id: "education",
    title: "Какое у вас образование?",
    en: "What is your highest level of education?",
    options: [
      opt("secondary", "Среднее образование", "Secondary school"),
      opt("college", "Колледж / профессиональное образование", "College / vocational education"),
      opt("bachelor", "Бакалавриат", "Bachelor's degree"),
      opt("master", "Магистратура", "Master's degree"),
      opt("phd", "Докторская степень", "Doctoral degree"),
      opt("unknown", "Другое / не уверен(а)", "Other / not sure"),
    ],
  },
  {
    id: "workExperience",
    title: "Какой у вас общий профессиональный опыт?",
    en: "How much skilled work experience do you have?",
    options: [
      opt("none", "Нет опыта", "No experience"),
      opt("under1", "Менее одного года", "Less than one year"),
      opt("1to2", "1–2 года", "1–2 years"),
      opt("3plus", "3 года и более", "3 years or more"),
      opt("trades", "Квалифицированная рабочая профессия / trades", "Skilled trade"),
      opt("unknown", "Не уверен(а), подходит ли мой опыт", "Not sure whether my experience qualifies"),
    ],
  },
  {
    id: "canadianExperience",
    title: "Есть ли у вас опыт работы в Канаде?",
    en: "Do you have work experience in Canada?",
    options: [
      opt("none", "Нет", "No"),
      opt("under1", "Есть, но менее 12 месяцев", "Yes, but less than 12 months"),
      opt("1year", "Есть не менее 12 месяцев", "At least 12 months"),
      opt("2plus", "Есть 2 года или более", "Two years or more"),
      opt("unknown", "Не уверен(а)", "Not sure"),
    ],
  },
  {
    id: "jobOffer",
    title: "Есть ли у вас предложение работы в Канаде?",
    en: "Do you have a job offer in Canada?",
    options: [
      opt("yes", "Да, есть конкретное предложение", "Yes, a specific offer"),
      opt("lmia", "Есть предложение и LMIA или подтверждение освобождения от LMIA", "Offer with an LMIA or LMIA-exempt basis"),
      opt("applying", "Ищу работодателя", "Looking for an employer"),
      opt("no", "Нет", "No"),
      opt("unknown", "Не уверен(а)", "Not sure"),
    ],
  },
  {
    id: "province",
    title: "Есть ли у вас выбранная провинция или территория?",
    en: "Have you chosen a province or territory?",
    options: [
      opt("ontario", "Онтарио", "Ontario"),
      opt("bc", "Британская Колумбия", "British Columbia"),
      opt("alberta", "Альберта", "Alberta"),
      opt("atlantic", "Атлантическая Канада", "Atlantic Canada"),
      opt("quebec", "Квебек", "Quebec"),
      opt("other", "Другая провинция или территория", "Another province or territory"),
      opt("no", "Пока нет", "Not yet"),
    ],
  },
  {
    id: "provincialNomination",
    title: "Есть ли у вас номинация провинции?",
    en: "Do you have a provincial nomination?",
    options: [
      opt("yes", "Да", "Yes"),
      opt("applying", "Подаю заявку / изучаю программы", "Applying / researching programs"),
      opt("no", "Нет", "No"),
      opt("unknown", "Не уверен(а)", "Not sure"),
    ],
  },
  {
    id: "studyOffer",
    title: "Есть ли у вас зачисление в канадское учебное заведение?",
    en: "Have you been accepted by a Canadian educational institution?",
    options: [
      opt("yes", "Да, есть письмо о зачислении", "Yes, I have a letter of acceptance"),
      opt("applying", "Подаю документы", "Applying"),
      opt("no", "Нет", "No"),
      opt("unknown", "Не уверен(а)", "Not sure"),
    ],
  },
  {
    id: "dli",
    title: "Проверили ли вы, имеет ли учебное заведение статус DLI?",
    en: "Have you checked whether the school is a Designated Learning Institution (DLI)?",
    options: [
      opt("yes", "Да", "Yes"),
      opt("no", "Нет", "No"),
      opt("unknown", "Не знаю, что такое DLI", "I don't know what DLI means"),
    ],
  },
  {
    id: "family",
    title: "Есть ли у вас супруг(а) или близкие родственники в Канаде?",
    en: "Do you have a spouse or close relatives in Canada?",
    description: "Семейное спонсорство доступно только для определённых отношений и при выполнении требований.",
    descriptionEn: "Family sponsorship is limited to specific relationships and eligibility requirements.",
    options: [
      opt("spouse", "Супруг(а) или партнёр — гражданин или постоянный резидент Канады", "Spouse or partner is a Canadian citizen or permanent resident"),
      opt("parent", "Родитель или ребёнок, потенциально подходящий для спонсорства", "Parent or child who may qualify for sponsorship"),
      opt("other", "Другие родственники в Канаде", "Other relatives in Canada"),
      opt("none", "Нет", "No"),
      opt("unknown", "Не уверен(а)", "Not sure"),
    ],
  },
  {
    id: "funds",
    title: "Можете ли вы подтвердить наличие средств?",
    en: "Can you demonstrate sufficient funds?",
    description: "Требуемая сумма зависит от программы, состава семьи и обстоятельств.",
    descriptionEn: "Required funds depend on the program, family size and circumstances.",
    options: [
      opt("yes", "Да", "Yes"),
      opt("partial", "Частично / нужно дополнительное финансирование", "Partly / need additional funding"),
      opt("no", "Нет", "No"),
      opt("unknown", "Не уверен(а)", "Not sure"),
    ],
  },
  {
    id: "business",
    title: "Есть ли у вас бизнес или опыт предпринимательства?",
    en: "Do you have a business or entrepreneurial experience?",
    options: [
      opt("company", "Есть действующая компания", "I own or operate an existing company"),
      opt("experience", "Есть опыт управления бизнесом", "I have business management experience"),
      opt("startup", "Есть инновационная бизнес-идея или стартап", "I have an innovative business idea or startup"),
      opt("selfemployed", "Работаю на себя / фрилансер", "Self-employed / freelancer"),
      opt("none", "Нет", "No"),
      opt("unknown", "Не уверен(а)", "Not sure"),
    ],
  },
  {
    id: "visitDuration",
    title: "Как долго вы планируете находиться в Канаде?",
    en: "How long do you plan to stay in Canada?",
    options: [
      opt("short", "Краткая поездка — до нескольких месяцев", "Short visit — up to a few months"),
      opt("long", "Длительное пребывание", "Extended stay"),
      opt("permanent", "Постоянное проживание", "Permanent residence"),
      opt("unknown", "Пока не знаю", "Not sure"),
    ],
  },
  {
    id: "passport",
    title: "Есть ли у вас действующий паспорт?",
    en: "Do you have a valid passport?",
    options: [
      opt("yes", "Да", "Yes"),
      opt("no", "Нет", "No"),
      opt("unknown", "Не уверен(а)", "Not sure"),
    ],
  },
  {
    id: "immigrationHistory",
    title: "Были ли у вас отказы или нарушения иммиграционных правил?",
    en: "Have you had immigration refusals or violations?",
    options: [
      opt("none", "Нет", "No"),
      opt("refusal", "Был отказ в визе или разрешении", "Visa or permit refusal"),
      opt("overstay", "Было превышение разрешённого срока пребывания", "Overstay"),
      opt("removal", "Был приказ о выезде / депортация / отказ во въезде", "Removal order / deportation / denial of entry"),
      opt("other", "Другая иммиграционная проблема", "Other immigration issue"),
      opt("unknown", "Не уверен(а)", "Not sure"),
    ],
  },
  {
    id: "status",
    title: "Если вы уже в Канаде, каков ваш текущий статус?",
    en: "If you are already in Canada, what is your current status?",
    options: [
      opt("outside", "Я нахожусь за пределами Канады", "I am outside Canada"),
      opt("visitor", "Посетитель", "Visitor"),
      opt("student", "Студент", "Student"),
      opt("worker", "Работник с разрешением", "Worker with a permit"),
      opt("pr", "Постоянный резидент", "Permanent resident"),
      opt("expired", "Статус или разрешение истекли", "Status or permit has expired"),
      opt("unknown", "Другое / не уверен(а)", "Other / not sure"),
    ],
  },
  {
    id: "protection",
    title: "Нуждаетесь ли вы в защите от преследования или серьёзной опасности?",
    en: "Do you need protection from persecution or serious danger?",
    description: "Ответы анкеты не определяют право на убежище или статус защищённого лица.",
    descriptionEn: "This questionnaire cannot determine eligibility for asylum or protected-person status.",
    options: [
      opt("yes", "Да, мне нужна индивидуальная оценка защиты", "Yes, I need an individual protection assessment"),
      opt("unsure", "Не уверен(а)", "Not sure"),
      opt("no", "Нет", "No"),
      opt("preferNot", "Предпочитаю не отвечать", "Prefer not to answer"),
    ],
  },
];

const ROUTES: Route[] = [
  {
    id: "expressEntry",
    title: "Express Entry",
    titleEn: "Express Entry",
    category: "Постоянное проживание",
    categoryEn: "Permanent residence",
    description: "Система управления заявками на некоторые программы экономической иммиграции. Приглашение зависит от соответствия программе и действующих критериев отбора.",
    descriptionEn: "A system managing applications for selected economic immigration programs. Invitations depend on program eligibility and current selection criteria.",
    requirements: [
      "Соответствие требованиям одной из программ Express Entry.",
      "Подтверждённые результаты языкового теста.",
      "Оценка иностранного образования, если требуется.",
      "Подходящий опыт работы и документы.",
    ],
    requirementsEn: [
      "Eligibility for an Express Entry program.",
      "Valid language test results.",
      "An educational credential assessment where required.",
      "Qualifying work experience and supporting documents.",
    ],
    limitations: [
      "Создание профиля не гарантирует приглашение.",
      "Баллы CRS и проходные значения меняются.",
      "Потребуются дополнительные проверки и документы.",
    ],
    limitationsEn: [
      "Creating a profile does not guarantee an invitation.",
      "CRS scores and cut-offs change.",
      "Additional checks and documents are required.",
    ],
    officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry.html",
  },
  {
    id: "fsw",
    title: "Federal Skilled Worker Program (FSW)",
    titleEn: "Federal Skilled Worker Program (FSW)",
    category: "Экономическая иммиграция",
    categoryEn: "Economic immigration",
    description: "Программа для квалифицированных работников с подходящим зарубежным опытом, образованием и языковыми результатами.",
    descriptionEn: "A program for skilled workers with qualifying foreign work experience, education and language results.",
    requirements: [
      "Как правило, не менее года непрерывного квалифицированного опыта в соответствующей категории за установленный период.",
      "Минимальные языковые результаты и оценка образования, если оно получено за рубежом.",
      "Соответствие отборочным критериям FSW.",
      "Подтверждение средств, если не действует исключение.",
    ],
    requirementsEn: [
      "Generally at least one continuous year of qualifying skilled work in the relevant period.",
      "Minimum language results and an assessment of foreign education where applicable.",
      "Meeting FSW selection criteria.",
      "Proof of funds unless an exemption applies.",
    ],
    limitations: [
      "Соответствие минимальным требованиям не гарантирует приглашение.",
      "Квалификация работы определяется официальной классификацией NOC/TEER.",
    ],
    limitationsEn: [
      "Meeting minimum requirements does not guarantee an invitation.",
      "Work eligibility depends on the official NOC/TEER classification.",
    ],
    officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/eligibility/federal-skilled-workers.html",
  },
  {
    id: "cec",
    title: "Canadian Experience Class (CEC)",
    titleEn: "Canadian Experience Class (CEC)",
    category: "Опыт работы в Канаде",
    categoryEn: "Canadian work experience",
    description: "Программа Express Entry для кандидатов с подходящим квалифицированным опытом работы в Канаде.",
    descriptionEn: "An Express Entry program for candidates with qualifying skilled work experience in Canada.",
    requirements: [
      "Обычно не менее 12 месяцев квалифицированного оплачиваемого опыта работы в Канаде за последние 3 года.",
      "Опыт должен соответствовать требованиям программы и классификации NOC/TEER.",
      "Нужны результаты признанного языкового теста.",
      "Для CEC подтверждение средств обычно не требуется.",
    ],
    requirementsEn: [
      "Usually at least 12 months of qualifying paid skilled work in Canada in the last 3 years.",
      "Experience must meet program and NOC/TEER requirements.",
      "Results from an accepted language test are required.",
      "Proof of funds is generally not required for CEC.",
    ],
    limitations: [
      "Работа во время учёбы и некоторые виды самозанятости не засчитываются для минимального опыта CEC.",
      "Менее 12 месяцев подходящего опыта обычно недостаточно.",
    ],
    limitationsEn: [
      "Work while studying and some self-employment may not count toward the minimum CEC experience.",
      "Less than 12 months of qualifying experience is generally insufficient.",
    ],
    officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/eligibility/canadian-experience-class.html",
  },
  {
    id: "trades",
    title: "Federal Skilled Trades Program",
    titleEn: "Federal Skilled Trades Program",
    category: "Квалифицированные рабочие профессии",
    categoryEn: "Skilled trades",
    description: "Федеральный маршрут для соответствующих специалистов рабочих профессий.",
    descriptionEn: "A federal pathway for eligible skilled trades workers.",
    requirements: [
      "Обычно требуется установленный объём опыта в квалифицированной рабочей профессии за предыдущие годы.",
      "Необходимо соответствовать требованиям конкретной группы профессий.",
      "Обычно требуется квалифицирующее предложение работы или канадский сертификат квалификации.",
      "Нужны языковые результаты.",
    ],
    requirementsEn: [
      "A specified amount of qualifying experience in an eligible trade in the relevant period is generally required.",
      "The occupation must fall within an eligible trade group.",
      "A qualifying job offer or Canadian certificate of qualification is generally required.",
      "Language results are required.",
    ],
    limitations: [
      "Не все профессии относятся к подходящим группам.",
      "Требования следует проверять по официальной классификации и действующим правилам.",
    ],
    limitationsEn: [
      "Not all occupations qualify.",
      "Check the official occupational classification and current rules.",
    ],
    officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/eligibility/skilled-trades.html",
  },
  {
    id: "pnp",
    title: "Provincial Nominee Program (PNP)",
    titleEn: "Provincial Nominee Program (PNP)",
    category: "Провинциальные программы",
    categoryEn: "Provincial programs",
    description: "Провинции и территории могут выдвигать кандидатов, отвечающих требованиям конкретного потока.",
    descriptionEn: "Provinces and territories may nominate candidates who meet the requirements of a specific stream.",
    requirements: [
      "Подходящий поток провинции или территории.",
      "Соответствие профессиональным, языковым и другим критериям потока.",
      "Намерение жить в соответствующей провинции или территории.",
      "При необходимости — предложение работы или профиль Express Entry.",
    ],
    requirementsEn: [
      "An eligible stream in a province or territory.",
      "Meeting the stream's occupational, language and other criteria.",
      "Intention to live in the nominating province or territory.",
      "A job offer or Express Entry profile where required.",
    ],
    limitations: [
      "Условия и приём заявок различаются между потоками и меняются.",
      "Номинация не означает автоматическое получение PR.",
    ],
    limitationsEn: [
      "Requirements and intake differ between streams and can change.",
      "A nomination does not automatically grant PR.",
    ],
    officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/provincial-nominees.html",
  },
  {
    id: "atlantic",
    title: "Atlantic Immigration Program",
    titleEn: "Atlantic Immigration Program",
    category: "Региональная иммиграция",
    categoryEn: "Regional immigration",
    description: "Маршрут для подходящих кандидатов с предложением работы от назначенного работодателя в атлантической Канаде.",
    descriptionEn: "A pathway for eligible candidates with a job offer from a designated employer in Atlantic Canada.",
    requirements: [
      "Предложение работы от назначенного работодателя.",
      "Соответствие требованиям опыта, образования и языка для применимого потока.",
      "Подтверждение средств, если не действует исключение.",
      "Выполнение требований по поселению и документам.",
    ],
    requirementsEn: [
      "A job offer from a designated employer.",
      "Meeting applicable work experience, education and language requirements.",
      "Proof of funds unless exempt.",
      "Meeting settlement and documentation requirements.",
    ],
    limitations: [
      "Не каждое предложение работы подходит.",
      "Нужно проверить статус работодателя и условия предложения.",
    ],
    limitationsEn: [
      "Not every job offer qualifies.",
      "The employer's designation and offer conditions must be checked.",
    ],
    officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/atlantic-immigration.html",
  },
  {
    id: "quebec",
    title: "Иммиграция в Квебек",
    titleEn: "Quebec immigration programs",
    category: "Квебек",
    categoryEn: "Quebec",
    description: "Квебек использует собственные программы отбора иммигрантов. Требования зависят от программы и могут включать французский язык.",
    descriptionEn: "Quebec has its own immigration selection programs. Requirements depend on the program and may include French-language ability.",
    requirements: [
      "Выбор действующей программы Квебека.",
      "Соответствие требованиям языка, образования, опыта и других критериев.",
      "Получение необходимого отбора Квебека и дальнейшее оформление федерального статуса, если применимо.",
    ],
    requirementsEn: [
      "Choosing an active Quebec program.",
      "Meeting language, education, work experience and other criteria.",
      "Obtaining Quebec selection and completing the federal process where applicable.",
    ],
    limitations: [
      "Правила Квебека отличаются от федеральных потоков Express Entry.",
      "Программы и периоды приёма могут меняться.",
    ],
    limitationsEn: [
      "Quebec rules differ from federal Express Entry pathways.",
      "Programs and intake periods can change.",
    ],
    officialUrl: "https://www.quebec.ca/en/immigration",
  },
  {
    id: "work",
    title: "Разрешение на работу (Work Permit)",
    titleEn: "Work permit",
    category: "Работа",
    categoryEn: "Work",
    description: "Разрешение на работу может требовать LMIA либо основываться на применимом освобождении от LMIA.",
    descriptionEn: "A work permit may require an LMIA or qualify for an applicable LMIA exemption.",
    requirements: [
      "Подходящая работа и выполнение условий соответствующей категории.",
      "При необходимости — LMIA работодателя или основание для освобождения.",
      "Соответствие требованиям к документам и допустимости.",
      "Выполнение специальных условий программы, если применимо.",
    ],
    requirementsEn: [
      "An eligible job and compliance with the relevant category's conditions.",
      "An employer LMIA or exemption basis where required.",
      "Meeting document and admissibility requirements.",
      "Meeting any program-specific conditions.",
    ],
    limitations: [
      "Предложение работы само по себе не гарантирует разрешение.",
      "Обычный work permit не равен постоянному резидентству.",
    ],
    limitationsEn: [
      "A job offer alone does not guarantee a permit.",
      "A regular work permit is not permanent residence.",
    ],
    officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada.html",
  },
  {
    id: "iec",
    title: "International Experience Canada (IEC)",
    titleEn: "International Experience Canada (IEC)",
    category: "Молодёжные программы",
    categoryEn: "Youth mobility",
    description: "Программы молодёжной мобильности, доступность которых зависит от гражданства, возраста и соглашений с Канадой.",
    descriptionEn: "Youth mobility programs whose availability depends on citizenship, age and Canada's agreements.",
    requirements: [
      "Гражданство страны, участвующей в IEC, и соответствие категории.",
      "Соответствие возрастным ограничениям конкретного соглашения.",
      "Выполнение требований к средствам, страховке и документам.",
      "При необходимости — приглашение или участие в пуле кандидатов.",
    ],
    requirementsEn: [
      "Citizenship of an IEC-participating country and eligibility for a category.",
      "Meeting the age limits under the relevant agreement.",
      "Meeting funds, insurance and document requirements.",
      "An invitation or pool participation where applicable.",
    ],
    limitations: [
      "IEC доступна не гражданам всех стран.",
      "Возрастные ограничения, квоты и доступные категории различаются.",
    ],
    limitationsEn: [
      "IEC is not available to citizens of every country.",
      "Age limits, quotas and categories vary.",
    ],
    officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada/iec.html",
  },
  {
    id: "study",
    title: "Study Permit",
    titleEn: "Study permit",
    category: "Учёба",
    categoryEn: "Study",
    description: "Разрешение на обучение для подходящих иностранных студентов, зачисленных в соответствующее учебное заведение.",
    descriptionEn: "A study permit for eligible international students accepted by an appropriate educational institution.",
    requirements: [
      "Письмо о зачислении от Designated Learning Institution (DLI).",
      "Подтверждение средств на обучение и проживание.",
      "Необходимые документы и соответствие требованиям допустимости.",
      "Выполнение дополнительных требований, действующих для конкретного заявителя.",
    ],
    requirementsEn: [
      "A letter of acceptance from a Designated Learning Institution (DLI).",
      "Proof of funds for tuition and living expenses.",
      "Required documents and admissibility requirements.",
      "Any additional requirements applicable to the applicant.",
    ],
    limitations: [
      "Зачисление не гарантирует выдачу разрешения.",
      "Для ряда заявителей действуют дополнительные требования, включая возможное provincial attestation letter или исключения.",
    ],
    limitationsEn: [
      "Acceptance does not guarantee a permit.",
      "Additional requirements may apply, including a provincial attestation letter or an exemption.",
    ],
    officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit.html",
  },
  {
    id: "pgwp",
    title: "Post-Graduation Work Permit (PGWP)",
    titleEn: "Post-Graduation Work Permit (PGWP)",
    category: "После учёбы",
    categoryEn: "After study",
    description: "Разрешение на работу после окончания подходящей программы в соответствующем учебном заведении при соблюдении действующих условий.",
    descriptionEn: "A work permit after completing an eligible program at an eligible institution, subject to current rules.",
    requirements: [
      "Окончание подходящей программы в соответствующем учебном заведении.",
      "Соблюдение сроков и условий подачи.",
      "Выполнение действующих требований к программе обучения и языку, если они применимы.",
    ],
    requirementsEn: [
      "Completion of an eligible program at an eligible institution.",
      "Compliance with application deadlines and conditions.",
      "Meeting current program and language requirements where applicable.",
    ],
    limitations: [
      "Не все программы и учебные заведения дают право на PGWP.",
      "Правила зависят от типа программы, даты поступления и других обстоятельств.",
    ],
    limitationsEn: [
      "Not all programs or institutions qualify for a PGWP.",
      "Rules depend on program type, enrollment date and other circumstances.",
    ],
    officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/work/after-graduation.html",
  },
  {
    id: "family",
    title: "Семейное спонсорство",
    titleEn: "Family sponsorship",
    category: "Семья",
    categoryEn: "Family",
    description: "Определённые граждане и постоянные резиденты Канады могут спонсировать соответствующих членов семьи.",
    descriptionEn: "Eligible Canadian citizens and permanent residents may sponsor certain family members.",
    requirements: [
      "Отношения должны относиться к подходящей категории.",
      "Спонсор должен соответствовать установленным требованиям.",
      "Необходимы доказательства отношений и документы.",
      "Применяются требования к допустимости и финансовые условия, если они предусмотрены.",
    ],
    requirementsEn: [
      "The relationship must fall within an eligible category.",
      "The sponsor must meet the applicable requirements.",
      "Evidence of the relationship and supporting documents are required.",
      "Admissibility and financial requirements apply where relevant.",
    ],
    limitations: [
      "Не все родственники могут быть спонсированы.",
      "Наличие родственника в Канаде само по себе не даёт права на PR.",
    ],
    limitationsEn: [
      "Not every relative can be sponsored.",
      "Having a relative in Canada alone does not confer PR eligibility.",
    ],
    officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/family-sponsorship.html",
  },
  {
    id: "business",
    title: "Бизнес-иммиграция и предпринимательство",
    titleEn: "Business immigration and entrepreneurship",
    category: "Бизнес",
    categoryEn: "Business",
    description: "Бизнес-маршруты зависят от федеральных и провинциальных программ, которые могут менять условия и приём заявок.",
    descriptionEn: "Business pathways depend on federal and provincial programs, which may change their requirements and intake.",
    requirements: [
      "Определение конкретной действующей программы.",
      "Подтверждение опыта, средств и бизнес-плана, если это требуется.",
      "Выполнение требований конкретной провинции или федеральной программы.",
    ],
    requirementsEn: [
      "Identify a specific active program.",
      "Provide experience, funds and a business plan where required.",
      "Meet the requirements of the relevant province or federal program.",
    ],
    limitations: [
      "Наличие капитала или компании не гарантирует иммиграционный статус.",
      "Статус федеральных стартап-программ и провинциальных потоков следует проверять непосредственно перед подачей.",
    ],
    limitationsEn: [
      "Capital or company ownership does not guarantee immigration status.",
      "Check the status of federal startup programs and provincial streams before applying.",
    ],
    officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada.html",
  },
  {
    id: "visitor",
    title: "Visitor Visa или eTA",
    titleEn: "Visitor visa or eTA",
    category: "Посещение",
    categoryEn: "Visit",
    description: "В зависимости от гражданства и способа прибытия для краткой поездки может требоваться visitor visa либо eTA.",
    descriptionEn: "Depending on citizenship and mode of travel, a short visit may require a visitor visa or an eTA.",
    requirements: [
      "Действующий паспорт и соответствующее разрешение на поездку.",
      "Временная цель поездки и намерение соблюдать условия пребывания.",
      "Достаточные средства и документы по обстоятельствам поездки.",
      "Выполнение требований допустимости.",
    ],
    requirementsEn: [
      "A valid passport and the appropriate travel authorization.",
      "A temporary purpose of travel and intention to comply with stay conditions.",
      "Sufficient funds and supporting documents for the trip.",
      "Meeting admissibility requirements.",
    ],
    limitations: [
      "eTA доступна только подходящим путешественникам и обычно связана с прибытием воздушным транспортом.",
      "Visitor status не разрешает обычную работу.",
      "Разрешение на поездку не гарантирует допуск на границе.",
    ],
    limitationsEn: [
      "An eTA is available only to eligible travellers and is generally associated with air travel.",
      "Visitor status does not authorize regular employment.",
      "Travel authorization does not guarantee entry at the border.",
    ],
    officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada.html",
  },
  {
    id: "protection",
    title: "Убежище и защита в Канаде",
    titleEn: "Asylum and protection in Canada",
    category: "Защита",
    categoryEn: "Protection",
    description: "Обращения за защитой рассматриваются по установленным юридическим критериям и с учётом индивидуальных обстоятельств.",
    descriptionEn: "Protection claims are assessed under legal criteria and in light of individual circumstances.",
    requirements: [
      "Индивидуальная оценка обстоятельств и применимого правового основания.",
      "Соблюдение процедурных требований и правил допустимости.",
      "Документы и доказательства, если они доступны.",
    ],
    requirementsEn: [
      "An individual assessment of circumstances and the applicable legal basis.",
      "Compliance with procedural requirements and eligibility rules.",
      "Supporting documents and evidence where available.",
    ],
    limitations: [
      "Анкета не устанавливает право на убежище.",
      "Могут действовать ограничения и специальные правила в зависимости от обстоятельств.",
      "При риске преследования рекомендуется обратиться к квалифицированному юристу или уполномоченной организации.",
    ],
    limitationsEn: [
      "This questionnaire cannot determine asylum eligibility.",
      "Restrictions and special rules may apply depending on the circumstances.",
      "If you fear persecution, contact a qualified lawyer or authorized support organization.",
    ],
    officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/refugees.html",
  },
];

const tRu = {
  title: "Навигатор виз и иммиграции в Канаду",
  subtitle: "Ответьте на вопросы, чтобы найти возможные канадские иммиграционные маршруты для дальнейшей проверки.",
  progress: "Заполнено",
  of: "из",
  questions: "вопросов",
  allQuestions: "Анкета",
  choose: "Выберите ответ",
  answered: "Отвечено",
  notAnswered: "Не отвечено",
  results: "Предварительные варианты",
  resultsDescription: "Варианты отсортированы по условному соответствию вашим ответам.",
  noResults: "Пока нет подходящих вариантов по вашим ответам.",
  noResultsDescription: "Уточните ответы или выберите цель. Отсутствие результата не означает, что законного пути нет.",
  scoreDisclaimer: "Баллы — условная оценка совпадения с вашими ответами, а не вероятность одобрения. Это не официальный расчёт CRS и не юридическая оценка.",
  requirements: "Основные требования для проверки",
  limitations: "Важные ограничения",
  official: "Официальный источник",
  reset: "Сбросить ответы",
  showResults: "Показать результаты",
  showAll: "Показать все варианты",
  showFewer: "Показать меньше вариантов",
  top: "Лучшее совпадение",
  noticeTitle: "Важно перед подачей",
  noticeText: "Иммиграционные правила, списки подходящих профессий, квоты и приём заявок меняются. Анкета не проверяет в реальном времени право на участие, актуальные лимиты или индивидуальную допустимость. Проверьте требования на официальном сайте IRCC.",
  rulesLink: "Официальный сайт иммиграции Канады",
  historyTitle: "Нужна индивидуальная проверка иммиграционной истории",
  historyText: "Предыдущий отказ, нарушение условий пребывания, приказ о выезде или отказ во въезде могут повлиять на варианты. Результат анкеты не заменяет индивидуальную проверку.",
  expiredTitle: "Проверьте последствия истечения статуса",
  expiredText: "Если срок разрешённого пребывания или разрешения истёк, возможные действия зависят от дат и обстоятельств. Проверьте официальные правила восстановления статуса и получите квалифицированную консультацию.",
  protectionTitle: "Защита требует индивидуальной оценки",
  protectionText: "Если вы опасаетесь возвращения в свою страну, обратитесь к квалифицированному иммиграционному юристу или уполномоченной организации. Не публикуйте здесь подробности, которые могут подвергнуть вас риску.",
  passportTitle: "Проверьте паспорт и разрешение на поездку",
  passportText: "Для поездки обычно нужен действующий паспорт и, в зависимости от гражданства и способа прибытия, visitor visa или eTA.",
  generalDisclaimer: "Информация носит общий справочный характер и не является юридической консультацией. Решение принимает уполномоченный государственный орган.",
  footer: "Вернуться к World Navigator",
};

const tEn = {
  title: "Canada Visa & Immigration Navigator",
  subtitle: "Answer the questions to explore possible Canadian immigration pathways for further review.",
  progress: "Completed",
  of: "of",
  questions: "questions",
  allQuestions: "Questionnaire",
  choose: "Choose an answer",
  answered: "Answered",
  notAnswered: "Not answered",
  results: "Preliminary options",
  resultsDescription: "Options are ranked by a heuristic match to your answers.",
  noResults: "No matching options based on your answers yet.",
  noResultsDescription: "Review your answers or choose a goal. No result does not mean that no lawful pathway exists.",
  scoreDisclaimer: "Scores are heuristic matches to your answers, not approval probabilities. They are not an official CRS calculation or a legal assessment.",
  requirements: "Key requirements to review",
  limitations: "Important limitations",
  official: "Official source",
  reset: "Reset answers",
  showResults: "Show results",
  showAll: "Show all options",
  showFewer: "Show fewer options",
  top: "Top match",
  noticeTitle: "Important before applying",
  noticeText: "Immigration rules, eligible occupations, quotas and application intake change. This questionnaire does not verify eligibility, current limits or individual admissibility in real time. Check the requirements on the official IRCC website.",
  rulesLink: "Official Canada immigration website",
  historyTitle: "Your immigration history needs individual review",
  historyText: "A previous refusal, breach of stay conditions, removal order or denial of entry may affect your options. This questionnaire is not an individual assessment.",
  expiredTitle: "Review the consequences of expired status",
  expiredText: "If your authorized stay or permit has expired, available steps depend on dates and circumstances. Check the official restoration rules and seek qualified advice.",
  protectionTitle: "Protection claims require individual assessment",
  protectionText: "If you fear returning to your country, contact a qualified immigration lawyer or authorized support organization. Avoid sharing details here that could put you at risk.",
  passportTitle: "Check your passport and travel authorization",
  passportText: "Travel generally requires a valid passport and, depending on citizenship and mode of arrival, a visitor visa or eTA.",
  generalDisclaimer: "This is general information, not legal advice. Decisions are made by the relevant government authorities.",
  footer: "Back to World Navigator",
};

function isAnswered(value?: string) {
  return Boolean(value && value.trim());
}

function getRouteScore(id: string, a: Answers): number {
  const goal = a.goal;
  const language = a.english;
  const education = a.education;
  const experience = a.workExperience;
  const canadianExperience = a.canadianExperience;
  const jobOffer = a.jobOffer;
  const family = a.family;
  const funds = a.funds;
  const studyOffer = a.studyOffer;
  const nomination = a.provincialNomination;
  const province = a.province;

  switch (id) {
    case "expressEntry": {
      if (!["permanent", "unsure"].includes(goal)) return 0;
      let score = 20;
      if (["bachelor", "master", "phd"].includes(education)) score += 20;
      if (["1to2", "3plus", "trades"].includes(experience)) score += 15;
      if (["fluent", "test"].includes(language)) score += 20;
      if (["1year", "2plus"].includes(canadianExperience)) score += 15;
      if (a.french === "fluent" || a.french === "test") score += 5;
      if (a.age === "18to29" || a.age === "30to35") score += 5;
      if (funds === "yes") score += 5;
      return Math.min(score, 95);
    }
    case "fsw": {
      if (!["permanent", "unsure"].includes(goal)) return 0;
      if (experience === "none" || experience === "under1") return 0;
      let score = 25;
      if (["1to2", "3plus"].includes(experience)) score += 20;
      if (["bachelor", "master", "phd"].includes(education)) score += 15;
      if (["fluent", "test"].includes(language)) score += 20;
      if (funds === "yes") score += 10;
      if (a.age === "18to29" || a.age === "30to35") score += 10;
      return Math.min(score, 90);
    }
    case "cec": {
      if (!["permanent", "unsure"].includes(goal)) return 0;
      if (!["1year", "2plus"].includes(canadianExperience)) return 0;
      let score = 45;
      if (canadianExperience === "2plus") score += 10;
      if (["fluent", "test"].includes(language)) score += 20;
      if (["bachelor", "master", "phd"].includes(education)) score += 10;
      if (a.age === "18to29" || a.age === "30to35") score += 5;
      return Math.min(score, 90);
    }
    case "trades": {
      if (!["permanent", "work", "unsure"].includes(goal)) return 0;
      if (experience !== "trades" && jobOffer === "no") return 0;
      let score = experience === "trades" ? 55 : 25;
      if (jobOffer === "yes" || jobOffer === "lmia") score += 20;
      if (["fluent", "test", "intermediate"].includes(language)) score += 10;
      if (funds === "yes") score += 5;
      return Math.min(score, 85);
    }
    case "pnp": {
      if (!["permanent", "work", "unsure"].includes(goal)) return 0;
      let score = 25;
      if (nomination === "yes") score += 45;
      else if (nomination === "applying") score += 20;
      if (jobOffer === "yes" || jobOffer === "lmia") score += 15;
      if (province !== "no" && province !== "quebec") score += 10;
      if (["bachelor", "master", "phd", "college"].includes(education)) score += 5;
      return Math.min(score, 90);
    }
    case "atlantic": {
      if (!["permanent", "work", "unsure"].includes(goal)) return 0;
      if (jobOffer === "no" || jobOffer === "applying") return 15;
      let score = 40;
      if (jobOffer === "yes" || jobOffer === "lmia") score += 25;
      if (province === "atlantic") score += 15;
      if (["fluent", "test", "intermediate"].includes(language)) score += 10;
      if (funds === "yes") score += 5;
      return Math.min(score, 90);
    }
    case "quebec": {
      if (!["permanent", "work", "study", "unsure"].includes(goal)) return 0;
      let score = 25;
      if (province === "quebec") score += 25;
      if (a.french === "fluent" || a.french === "test") score += 25;
      if (["bachelor", "master", "phd", "college"].includes(education)) score += 10;
      if (["1to2", "3plus", "trades"].includes(experience)) score += 10;
      return Math.min(score, 85);
    }
    case "work": {
      if (goal !== "work" && goal !== "unsure") return 0;
      let score = 25;
      if (jobOffer === "yes") score += 25;
      if (jobOffer === "lmia") score += 35;
      if (["1to2", "3plus", "trades"].includes(experience)) score += 15;
      if (education !== "secondary" && education !== "unknown") score += 10;
      if (funds === "yes") score += 5;
      return Math.min(score, 90);
    }
    case "iec": {
      if (goal !== "work" && goal !== "unsure") return 0;
      if (!["18to29", "30to35"].includes(a.age)) return 0;
      const eligibleCitizenships = ["au", "gb", "de", "fr", "nz", "jp", "kr"];
      if (!eligibleCitizenships.includes(a.citizenship)) return 0;
      let score = 60;
      if (funds === "yes") score += 10;
      if (a.passport === "yes") score += 10;
      return Math.min(score, 80);
    }
    case "study": {
      if (goal !== "study") return 0;
      let score = 25;
      if (studyOffer === "yes") score += 35;
      if (studyOffer === "applying") score += 15;
      if (a.dli === "yes") score += 10;
      if (funds === "yes") score += 20;
      if (a.passport === "yes") score += 5;
      return Math.min(score, 95);
    }
    case "pgwp": {
      if (goal !== "work" && goal !== "permanent" && goal !== "unsure") return 0;
      if (a.status !== "student" && a.residence !== "canada") return 0;
      if (studyOffer === "yes" || a.status === "student") return 45;
      return 0;
    }
    case "family": {
      if (goal !== "family" && goal !== "permanent" && goal !== "unsure") return 0;
      if (family === "spouse") return 85;
      if (family === "parent") return 60;
      if (family === "other") return 20;
      return 0;
    }
    case "business": {
      if (goal !== "business" && goal !== "permanent" && goal !== "unsure") return 0;
      if (a.business === "none") return 0;
      let score = 25;
      if (a.business === "company") score += 25;
      if (a.business === "experience") score += 20;
      if (a.business === "startup") score += 20;
      if (a.business === "selfemployed") score += 10;
      if (funds === "yes") score += 15;
      return Math.min(score, 75);
    }
    case "visitor": {
      if (goal !== "visit") return 0;
      if (a.visitDuration === "permanent") return 0;
      let score = 50;
      if (a.passport === "yes") score += 15;
      if (funds === "yes") score += 20;
      if (a.visitDuration === "short") score += 10;
      if (a.passport === "no") score -= 25;
      return Math.max(10, Math.min(score, 90));
    }
    case "protection": {
      if (goal !== "protection" && a.protection !== "yes" && a.protection !== "unsure") return 0;
      if (a.protection === "yes") return 75;
      if (a.protection === "unsure" || goal === "protection") return 45;
      return 0;
    }
    default:
      return 0;
  }
}

function getRouteWarning(id: string, a: Answers, isEnglish: boolean): string | null {
  const warning = (ru: string, en: string) => isEnglish ? en : ru;

  if (id === "iec") {
    return warning(
      "Участие в IEC зависит от гражданства, возраста, категории и действующего соглашения. Список стран в алгоритме не является полной официальной проверкой.",
      "IEC eligibility depends on citizenship, age, category and current agreements. The citizenship check in this tool is not a complete official eligibility assessment.",
    );
  }
  if (id === "cec" && !["1year", "2plus"].includes(a.canadianExperience)) {
    return warning(
      "Обычно требуется не менее 12 месяцев подходящего оплачиваемого опыта работы в Канаде за последние 3 года.",
      "CEC generally requires at least 12 months of qualifying paid work experience in Canada in the last 3 years.",
    );
  }
  if (id === "pnp") {
    return warning(
      "У каждой провинции свои потоки, критерии, квоты и периоды приёма. Проверьте действующие условия выбранной провинции.",
      "Each province has its own streams, criteria, quotas and intake periods. Check the current rules for your chosen province.",
    );
  }
  if (id === "business") {
    return warning(
      "Статус бизнес-программ и приём заявок могут меняться. Проверьте, открыт ли конкретный поток для новых заявителей.",
      "Business program status and intake may change. Check whether the specific stream is open to new applicants.",
    );
  }
  if (id === "protection") {
    return warning(
      "Этот результат не определяет право на убежище. Для оценки обстоятельств обратитесь к квалифицированному специалисту.",
      "This result does not determine asylum eligibility. Consult a qualified professional for an assessment of your circumstances.",
    );
  }
  return null;
}

export default function CanadaPage() {
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

  const hasExpiredStatus = answers.status === "expired";

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
                  code="CA"
                  name="Canada"
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
                            {value
                              ? getOptionLabel(question, value)
                              : t.choose}
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
                                  {isEnglish ? option.en ?? option.label : option.label}
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
                      {showAll
                        ? t.showFewer
                        : `${t.showAll} (${results.length})`}
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
                  href="https://www.canada.ca/en/immigration-refugees-citizenship.html"
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
                  <h3 className="font-semibold text-blue-100">{tRu.passportTitle && (isEnglish ? tEn.passportTitle : tRu.passportTitle)}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {isEnglish ? tEn.passportText : tRu.passportText}
                  </p>
                  <a
                    href="https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/entry-requirements-country.html"
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
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {t.historyText}
                  </p>
                  <a
                    href="https://www.canada.ca/en/immigration-refugees-citizenship.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-orange-200 hover:text-orange-100"
                  >
                    {isEnglish ? "Official IRCC website" : "Официальный сайт IRCC"}
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
                    href="https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/extend-stay.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-red-200 hover:text-red-100"
                  >
                    {isEnglish ? "Check official status information" : "Проверить официальную информацию о статусе"}
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
                    href="https://www.canada.ca/en/immigration-refugees-citizenship/services/refugees.html"
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