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
    title: "Какова ваша основная цель?",
    en: "What is your main goal?",
    options: [
      opt("work", "Работа в Великобритании", "Work in the UK"),
      opt("study", "Учёба", "Study"),
      opt("family", "Воссоединение с семьёй", "Join family"),
      opt("visit", "Туризм или краткий визит", "Tourism or short visit"),
      opt("business", "Открыть или развивать бизнес", "Start or develop a business"),
      opt("talent", "Научная, творческая или профессиональная карьера", "Academic, creative or professional career"),
      opt("settle", "Переехать на постоянное проживание", "Settle permanently"),
      opt("protection", "Нужна международная защита", "I need international protection"),
    ],
  },
  {
    id: "citizenship",
    title: "Какое у вас гражданство?",
    en: "What is your citizenship?",
    description: "Гражданство влияет на визовые требования, ETA и доступные специальные маршруты.",
    descriptionEn: "Citizenship affects visa requirements, ETA and access to special routes.",
    options: citizenshipOptions,
  },
  {
    id: "age",
    title: "Сколько вам лет?",
    en: "How old are you?",
    options: [
      opt("under18", "Меньше 18 лет", "Under 18"),
      opt("18-25", "18–25 лет", "18–25"),
      opt("26-30", "26–30 лет", "26–30"),
      opt("31-35", "31–35 лет", "31–35"),
      opt("36-49", "36–49 лет", "36–49"),
      opt("50plus", "50 лет или старше", "50 or older"),
    ],
  },
  {
    id: "residence",
    title: "Где вы сейчас проживаете?",
    en: "Where do you currently live?",
    options: [
      opt("outside", "За пределами Великобритании", "Outside the UK"),
      opt("uk", "В Великобритании", "In the UK"),
      opt("ireland", "В Ирландии", "In Ireland"),
      opt("other", "В другой стране, но статус временный", "Another country, temporary status"),
    ],
  },
  {
    id: "english",
    title: "Какой у вас уровень английского?",
    en: "What is your English level?",
    options: [
      opt("none", "Начальный или практически отсутствует", "Beginner or very limited"),
      opt("basic", "Базовый", "Basic"),
      opt("intermediate", "Средний", "Intermediate"),
      opt("good", "Хороший", "Good"),
      opt("fluent", "Свободный", "Fluent"),
      opt("exempt", "Возможно, есть основание для освобождения от теста", "I may qualify for an exemption"),
    ],
  },
  {
    id: "education",
    title: "Какое у вас образование?",
    en: "What is your highest education level?",
    options: [
      opt("school", "Школа или ниже", "Secondary school or below"),
      opt("vocational", "Профессиональное или колледж", "Vocational qualification or college"),
      opt("bachelor", "Бакалавриат", "Bachelor's degree"),
      opt("master", "Магистратура", "Master's degree"),
      opt("phd", "Докторантура / PhD", "Doctorate / PhD"),
    ],
  },
  {
    id: "workExperience",
    title: "Сколько у вас профессионального опыта?",
    en: "How much professional work experience do you have?",
    options: [
      opt("none", "Нет опыта", "No experience"),
      opt("under2", "Меньше 2 лет", "Less than 2 years"),
      opt("2-5", "2–5 лет", "2–5 years"),
      opt("5plus", "Более 5 лет", "More than 5 years"),
    ],
  },
  {
    id: "ukExperience",
    title: "Есть ли у вас опыт работы в Великобритании?",
    en: "Do you have UK work experience?",
    options: [
      opt("none", "Нет", "No"),
      opt("under1", "Меньше года", "Less than a year"),
      opt("1year", "Один год или больше", "One year or more"),
      opt("graduate", "Учился(ась) в Великобритании и имею право проверить Graduate visa", "I studied in the UK and may qualify for a Graduate visa"),
    ],
  },
  {
    id: "jobOffer",
    title: "Есть ли у вас предложение работы от работодателя в Великобритании?",
    en: "Do you have a job offer from a UK employer?",
    description: "Для Skilled Worker обычно необходим работодатель с лицензией спонсора и Certificate of Sponsorship.",
    descriptionEn: "Skilled Worker normally requires a licensed sponsor and a Certificate of Sponsorship.",
    options: [
      opt("yes", "Да, предложение уже есть", "Yes, I have an offer"),
      opt("interview", "Прохожу собеседования", "I am interviewing"),
      opt("searching", "Пока ищу работу", "I am still looking"),
      opt("no", "Нет и не планирую работать по найму", "No, and I do not plan to take an employed job"),
    ],
  },
  {
    id: "sponsor",
    title: "Есть ли у работодателя лицензия спонсора?",
    en: "Does the employer have a sponsor licence?",
    options: [
      opt("yes", "Да", "Yes"),
      opt("no", "Нет", "No"),
      opt("unknown", "Не знаю", "I do not know"),
      opt("na", "Нет предложения работы", "I do not have a job offer"),
    ],
  },
  {
    id: "occupation",
    title: "К какой сфере относится ваша работа?",
    en: "Which field is your occupation in?",
    options: [
      opt("health", "Медицина и здравоохранение", "Healthcare and medicine"),
      opt("care", "Социальный уход", "Social care"),
      opt("it", "IT, инженерия или технологии", "IT, engineering or technology"),
      opt("science", "Наука и исследования", "Science and research"),
      opt("education", "Образование", "Education"),
      opt("finance", "Финансы, бизнес или управление", "Finance, business or management"),
      opt("creative", "Искусство, культура или креативные индустрии", "Arts, culture or creative industries"),
      opt("trade", "Строительство, производство или техническая специальность", "Construction, manufacturing or skilled trade"),
      opt("other", "Другая сфера", "Other field"),
    ],
  },
  {
    id: "salary",
    title: "Какова предполагаемая годовая зарплата в Великобритании?",
    en: "What is the expected annual salary in the UK?",
    description: "Для рабочих виз важны применимый порог, ставка для профессии и конкретные правила маршрута.",
    descriptionEn: "Work visas depend on the applicable salary threshold, going rate and route-specific rules.",
    options: [
      opt("unknown", "Пока неизвестно", "Not known yet"),
      opt("under25", "Менее £25 000", "Under £25,000"),
      opt("25-35", "£25 000–£34 999", "£25,000–£34,999"),
      opt("35-41700", "£35 000–£41 699", "£35,000–£41,699"),
      opt("41700plus", "£41 700 или больше", "£41,700 or more"),
    ],
  },
  {
    id: "province",
    title: "В какой части Великобритании планируете жить?",
    en: "Where in the UK would you like to live?",
    options: [
      opt("england", "Англия", "England"),
      opt("scotland", "Шотландия", "Scotland"),
      opt("wales", "Уэльс", "Wales"),
      opt("ni", "Северная Ирландия", "Northern Ireland"),
      opt("any", "Пока не определился(ась)", "Not decided"),
    ],
  },
  {
    id: "studyOffer",
    title: "Есть ли предложение о зачислении в британское учебное заведение?",
    en: "Do you have an offer from a UK educational institution?",
    options: [
      opt("yes", "Да, зачисление подтверждено", "Yes, my place is confirmed"),
      opt("conditional", "Есть условное предложение", "I have a conditional offer"),
      opt("searching", "Пока выбираю учебное заведение", "I am still choosing a school"),
      opt("no", "Нет", "No"),
    ],
  },
  {
    id: "cas",
    title: "Выдан ли вам CAS (Confirmation of Acceptance for Studies)?",
    en: "Have you received a CAS (Confirmation of Acceptance for Studies)?",
    options: [
      opt("yes", "Да", "Yes"),
      opt("no", "Нет", "No"),
      opt("unknown", "Не знаю, что это", "I am not sure what it is"),
      opt("na", "Пока нет предложения о зачислении", "I do not have an offer yet"),
    ],
  },
  {
    id: "funds",
    title: "Есть ли у вас средства на переезд и проживание?",
    en: "Do you have funds for relocation and living costs?",
    options: [
      opt("yes", "Да, достаточно средств", "Yes, sufficient funds"),
      opt("some", "Есть часть суммы", "I have some of the funds"),
      opt("sponsor", "Расходы покроет спонсор или стипендия", "A sponsor or scholarship will cover costs"),
      opt("no", "Пока нет", "Not yet"),
    ],
  },
  {
    id: "family",
    title: "Есть ли у вас близкий член семьи в Великобритании?",
    en: "Do you have a close family member in the UK?",
    options: [
      opt("british", "Супруг или партнёр — гражданин Великобритании", "My spouse or partner is a British citizen"),
      opt("settled", "Супруг или партнёр имеет settled status / ILR", "My spouse or partner has settled status / ILR"),
      opt("visa", "Родственник находится по рабочей или учебной визе", "A relative has a work or study visa"),
      opt("child", "В Великобритании живёт мой ребёнок", "My child lives in the UK"),
      opt("other", "Другие родственники", "Other relatives"),
      opt("none", "Нет", "No"),
    ],
  },
  {
    id: "relationship",
    title: "Как долго длится ваше партнёрство, если оно относится к заявке?",
    en: "How long have you been in the relevant partnership?",
    options: [
      opt("married", "Мы официально женаты / состоим в civil partnership", "We are married / in a civil partnership"),
      opt("2plus", "Не менее двух лет в отношениях, как у партнёров", "At least two years in a relationship akin to partners"),
      opt("under2", "Менее двух лет", "Less than two years"),
      opt("na", "Не относится к моей ситуации", "Not applicable"),
    ],
  },
  {
    id: "business",
    title: "Есть ли у вас бизнес-идея или предпринимательский проект?",
    en: "Do you have a business idea or entrepreneurial project?",
    options: [
      opt("innovative", "Да, инновационный проект с потенциалом роста", "Yes, an innovative project with growth potential"),
      opt("existing", "Есть действующий бизнес", "I have an existing business"),
      opt("invest", "Есть капитал для инвестиций", "I have capital to invest"),
      opt("no", "Нет", "No"),
    ],
  },
  {
    id: "talent",
    title: "Есть ли у вас выдающиеся достижения в своей области?",
    en: "Do you have exceptional achievements in your field?",
    options: [
      opt("yes", "Да, международное признание или значимые достижения", "Yes, international recognition or significant achievements"),
      opt("research", "Есть научные публикации или исследовательская карьера", "I have research publications or an academic career"),
      opt("potential", "Есть потенциал, но пока мало подтверждений", "I have potential but limited evidence so far"),
      opt("no", "Нет", "No"),
    ],
  },
  {
    id: "passport",
    title: "Есть ли у вас действующий загранпаспорт?",
    en: "Do you have a valid passport?",
    options: [
      opt("yes", "Да", "Yes"),
      opt("no", "Нет", "No"),
      opt("renew", "Нужно продлить или заменить", "I need to renew or replace it"),
    ],
  },
  {
    id: "visitDuration",
    title: "На какой срок вы хотите приехать?",
    en: "How long do you intend to stay?",
    options: [
      opt("short", "До 6 месяцев", "Up to 6 months"),
      opt("long", "Более 6 месяцев", "More than 6 months"),
      opt("permanent", "Постоянно", "Permanently"),
    ],
  },
  {
    id: "immigrationHistory",
    title: "Были ли отказы в визах или нарушения иммиграционных правил?",
    en: "Have you had visa refusals or immigration breaches?",
    options: [
      opt("none", "Нет", "No"),
      opt("refusal", "Был отказ в визе", "I have had a visa refusal"),
      opt("overstay", "Было превышение срока пребывания", "I have overstayed"),
      opt("deportation", "Было выдворение или депортация", "I have been removed or deported"),
      opt("unknown", "Не уверен(а)", "Not sure"),
    ],
  },
  {
    id: "status",
    title: "Если вы уже в Великобритании, какой у вас статус?",
    en: "If you are already in the UK, what is your status?",
    options: [
      opt("none", "Я нахожусь за пределами Великобритании", "I am outside the UK"),
      opt("valid", "Есть действующая виза или разрешение", "I have valid permission"),
      opt("expired", "Виза или разрешение истекли", "My visa or permission has expired"),
      opt("euss", "Есть settled / pre-settled status", "I have settled / pre-settled status"),
      opt("unknown", "Не знаю", "Not sure"),
    ],
  },
  {
    id: "protection",
    title: "Нуждаетесь ли вы в убежище или защите от преследования?",
    en: "Do you need asylum or protection from persecution?",
    description: "Убежище зависит от индивидуальных обстоятельств и не определяется одним ответом анкеты.",
    descriptionEn: "Asylum depends on individual circumstances and cannot be determined by a questionnaire.",
    options: [
      opt("yes", "Да", "Yes"),
      opt("unsure", "Не уверен(а), нужна консультация", "I am unsure and need advice"),
      opt("no", "Нет", "No"),
    ],
  },
];

const ROUTES: Route[] = [
  {
    id: "skilled",
    title: "Skilled Worker visa",
    titleEn: "Skilled Worker visa",
    category: "Работа",
    categoryEn: "Work",
    description: "Маршрут для квалифицированной работы у работодателя, одобренного Home Office.",
    descriptionEn: "A route for eligible skilled work with a Home Office-approved employer.",
    requirements: [
      "Подтверждённое предложение подходящей работы от лицензированного работодателя.",
      "Certificate of Sponsorship от работодателя.",
      "Профессия должна соответствовать правилам маршрута.",
      "Необходимо соответствовать применимому зарплатному порогу и ставке для профессии.",
      "Требуется знание английского на установленном уровне, если не применяется исключение.",
      "Могут потребоваться средства на содержание и дополнительные документы.",
    ],
    requirementsEn: [
      "A confirmed offer for eligible work from a licensed sponsor.",
      "A Certificate of Sponsorship from the employer.",
      "The occupation must meet the route requirements.",
      "The applicable salary threshold and going rate must be met.",
      "English language requirements apply unless an exemption is available.",
      "Maintenance funds and additional documents may be required.",
    ],
    limitations: [
      "Самостоятельный поиск работы не даёт права на эту визу без подходящего спонсора.",
      "Порог зарплаты и допустимость профессии нужно проверять по действующим правилам.",
      "Возможность привезти членов семьи зависит от профессии и условий маршрута.",
    ],
    limitationsEn: [
      "Job searching alone does not qualify you without an eligible sponsor.",
      "Salary thresholds and eligible occupations must be checked against current rules.",
      "Dependant eligibility depends on the occupation and route conditions.",
    ],
    officialUrl: "https://www.gov.uk/skilled-worker-visa",
  },
  {
    id: "health",
    title: "Health and Care Worker visa",
    titleEn: "Health and Care Worker visa",
    category: "Работа в здравоохранении",
    categoryEn: "Healthcare work",
    description: "Специальный рабочий маршрут для определённых медицинских и социальных профессий.",
    descriptionEn: "A dedicated work route for eligible health and certain care professionals.",
    requirements: [
      "Предложение подходящей работы от одобренного работодателя.",
      "Профессия и работодатель должны соответствовать условиям маршрута.",
      "Нужен Certificate of Sponsorship и выполнение применимых требований к зарплате.",
      "Нужно подтвердить английский и другие требования, если они применяются.",
    ],
    requirementsEn: [
      "An eligible job offer from an approved employer.",
      "The occupation and employer must qualify under the route.",
      "A Certificate of Sponsorship and applicable salary requirements are needed.",
      "English and other applicable requirements must be met.",
    ],
    limitations: [
      "Не каждая работа в сфере ухода или медицины подходит под этот маршрут.",
      "Правила для новых заявителей, профессий и dependants могут различаться.",
    ],
    limitationsEn: [
      "Not every healthcare or care job qualifies for this route.",
      "Rules for new applicants, occupations and dependants may differ.",
    ],
    officialUrl: "https://www.gov.uk/health-care-worker-visa",
  },
  {
    id: "graduate",
    title: "Graduate visa",
    titleEn: "Graduate visa",
    category: "После учёбы",
    categoryEn: "Post-study",
    description: "Возможность остаться в Великобритании после подходящей программы обучения.",
    descriptionEn: "A route to remain in the UK after completing an eligible course.",
    requirements: [
      "Нужно находиться в Великобритании на подходящем Student visa.",
      "Учебное заведение должно сообщить Home Office об успешном завершении курса.",
      "Заявка подаётся до окончания действующего разрешения.",
    ],
    requirementsEn: [
      "You must be in the UK on an eligible Student visa.",
      "Your education provider must notify the Home Office that you completed the course.",
      "You must apply before your current permission expires.",
    ],
    limitations: [
      "Необходимо проверить продолжительность разрешения по дате подачи и действующим правилам.",
      "Graduate visa не является автоматическим постоянным статусом.",
    ],
    limitationsEn: [
      "Check the duration applicable to your application date and current rules.",
      "A Graduate visa does not automatically grant permanent residence.",
    ],
    officialUrl: "https://www.gov.uk/graduate-visa",
  },
  {
    id: "globaltalent",
    title: "Global Talent visa",
    titleEn: "Global Talent visa",
    category: "Таланты",
    categoryEn: "Talent",
    description: "Маршрут для лидеров и потенциальных лидеров в академической сфере, исследованиях, искусстве и цифровых технологиях.",
    descriptionEn: "A route for leaders and potential leaders in academia, research, arts and digital technology.",
    requirements: [
      "Нужно соответствовать требованиям выбранной области.",
      "В большинстве случаев необходимо одобрение уполномоченного endorsing body либо подходящая престижная награда.",
      "Потребуются доказательства достижений и профессиональной репутации.",
    ],
    requirementsEn: [
      "You must qualify under the requirements for your field.",
      "Most applicants need endorsement from an authorised body or an eligible prestigious award.",
      "Evidence of achievements and professional standing may be required.",
    ],
    limitations: [
      "Высокая квалификация сама по себе не гарантирует одобрение.",
      "Критерии доказательств отличаются в зависимости от области.",
    ],
    limitationsEn: [
      "High qualifications alone do not guarantee endorsement.",
      "Evidence criteria differ by field.",
    ],
    officialUrl: "https://www.gov.uk/global-talent",
  },
  {
    id: "hpi",
    title: "High Potential Individual visa",
    titleEn: "High Potential Individual visa",
    category: "Квалифицированные выпускники",
    categoryEn: "Graduate talent",
    description: "Маршрут для выпускников определённых зарубежных университетов из актуального списка.",
    descriptionEn: "A route for graduates of eligible overseas universities on the current list.",
    requirements: [
      "Нужна квалификация подходящего уровня, полученная в университете из действующего списка.",
      "Квалификация должна отвечать правилам по дате присуждения и признанию.",
      "Нужно выполнить финансовые, документальные и другие условия.",
    ],
    requirementsEn: [
      "You need an eligible qualification from a university on the current list.",
      "The qualification must meet award-date and recognition rules.",
      "Financial, documentary and other requirements apply.",
    ],
    limitations: [
      "Не каждый университет или диплом даёт право на этот маршрут.",
      "Маршрут имеет ограниченную продолжительность и не гарантирует settlement.",
    ],
    limitationsEn: [
      "Not every university or degree qualifies.",
      "The route is time-limited and does not guarantee settlement.",
    ],
    officialUrl: "https://www.gov.uk/high-potential-individual-visa",
  },
  {
    id: "yms",
    title: "Youth Mobility Scheme",
    titleEn: "Youth Mobility Scheme",
    category: "Молодёжь",
    categoryEn: "Youth mobility",
    description: "Временный маршрут для молодых граждан определённых стран и территорий.",
    descriptionEn: "A temporary route for young nationals of eligible countries and territories.",
    requirements: [
      "Гражданство должно входить в список стран, участвующих в схеме.",
      "Применяются возрастные ограничения, зависящие от гражданства.",
      "Нужно выполнить требования к средствам и документам.",
    ],
    requirementsEn: [
      "Your nationality must be eligible under the scheme.",
      "Age limits depend on nationality.",
      "Financial and documentary requirements apply.",
    ],
    limitations: [
      "Маршрут доступен не всем гражданствам.",
      "Для отдельных стран могут применяться квоты или система приглашений.",
    ],
    limitationsEn: [
      "The route is not available to all nationalities.",
      "Some countries have quotas or invitation arrangements.",
    ],
    officialUrl: "https://www.gov.uk/youth-mobility",
  },
  {
    id: "student",
    title: "Student visa",
    titleEn: "Student visa",
    category: "Учёба",
    categoryEn: "Study",
    description: "Основной маршрут для обучения на подходящем курсе в Великобритании.",
    descriptionEn: "The main route for eligible study at a UK education provider.",
    requirements: [
      "Предложение от лицензированного Student sponsor.",
      "CAS — Confirmation of Acceptance for Studies.",
      "Доказательства финансовых средств, если не применяется исключение.",
      "Выполнение требований по английскому языку и документам.",
    ],
    requirementsEn: [
      "An offer from a licensed Student sponsor.",
      "A CAS — Confirmation of Acceptance for Studies.",
      "Evidence of funds unless an exemption applies.",
      "English language and documentary requirements must be met.",
    ],
    limitations: [
      "Право на работу ограничено условиями визы.",
      "Право привезти партнёра и детей есть только в определённых случаях.",
      "Для Graduate visa потребуется отдельно выполнить её требования.",
    ],
    limitationsEn: [
      "Work rights are restricted by visa conditions.",
      "Bringing a partner and children is allowed only in specific circumstances.",
      "A separate set of requirements applies to the Graduate visa.",
    ],
    officialUrl: "https://www.gov.uk/student-visa",
  },
  {
    id: "family",
    title: "Family visa: partner / spouse",
    titleEn: "Family visa: partner / spouse",
    category: "Семья",
    categoryEn: "Family",
    description: "Возможный маршрут для проживания с супругом, партнёром или определённым членом семьи в Великобритании.",
    descriptionEn: "A possible route to live with a spouse, partner or eligible family member in the UK.",
    requirements: [
      "Спонсирующий член семьи должен соответствовать правилам маршрута.",
      "Нужно доказать подлинность отношений и соблюдение требований к партнёрству.",
      "Обычно применяются финансовые требования и требования к жилью.",
      "Может потребоваться подтверждение английского языка.",
    ],
    requirementsEn: [
      "The sponsoring family member must meet the route requirements.",
      "You must prove the relationship is genuine and meets the partner rules.",
      "Financial and accommodation requirements normally apply.",
      "English language evidence may be required.",
    ],
    limitations: [
      "Наличие родственника в Великобритании само по себе не даёт права на Family visa.",
      "Требования зависят от статуса спонсора и конкретной категории родственника.",
    ],
    limitationsEn: [
      "Having a relative in the UK does not automatically qualify you for a Family visa.",
      "Requirements depend on the sponsor's status and the family category.",
    ],
    officialUrl: "https://www.gov.uk/uk-family-visa",
  },
  {
    id: "innovator",
    title: "Innovator Founder visa",
    titleEn: "Innovator Founder visa",
    category: "Предпринимательство",
    categoryEn: "Entrepreneurship",
    description: "Маршрут для запуска инновационного бизнеса в Великобритании при выполнении условий одобрения.",
    descriptionEn: "A route to establish an innovative business in the UK, subject to endorsement requirements.",
    requirements: [
      "Бизнес-идея должна отвечать требованиям инновационности, жизнеспособности и масштабируемости.",
      "Как правило, требуется одобрение уполномоченной организации.",
      "Нужно выполнить требования к английскому и документам.",
    ],
    requirementsEn: [
      "The business idea must meet innovation, viability and scalability criteria.",
      "Endorsement from an authorised body is generally required.",
      "English language and documentary requirements apply.",
    ],
    limitations: [
      "Обычная регистрация компании или наличие капитала не гарантирует право на визу.",
      "Нужны доказательства соответствия именно критериям Innovator Founder.",
    ],
    limitationsEn: [
      "Registering a company or having capital does not automatically qualify you.",
      "You must demonstrate that the proposal meets Innovator Founder criteria.",
    ],
    officialUrl: "https://www.gov.uk/innovator-founder-visa",
  },
  {
    id: "visitor",
    title: "Standard Visitor",
    titleEn: "Standard Visitor",
    category: "Визит",
    categoryEn: "Visit",
    description: "Краткосрочный визит с целью туризма, определённых деловых мероприятий или посещения близких.",
    descriptionEn: "A short visit for tourism, certain business activities or visiting family and friends.",
    requirements: [
      "Нужно соответствовать требованиям посетителя и показать цель визита.",
      "Нужно иметь средства на поездку и намерение покинуть Великобританию по окончании визита.",
      "В зависимости от гражданства нужна виза либо ETA; некоторым путешественникам требуется иной документ.",
    ],
    requirementsEn: [
      "You must meet visitor requirements and demonstrate the purpose of your trip.",
      "You need funds for the visit and must intend to leave the UK at the end of your stay.",
      "Depending on nationality, you may need a visa or ETA; some travellers need another document.",
    ],
    limitations: [
      "Standard Visitor обычно не разрешает работать на работодателя в Великобритании.",
      "Нельзя использовать частые визиты для фактического проживания в стране.",
      "Необходимо проверить требования именно для вашего паспорта.",
    ],
    limitationsEn: [
      "A Standard Visitor visa normally does not permit employment for a UK employer.",
      "You cannot use frequent visits to effectively live in the UK.",
      "Check the requirements for your specific passport.",
    ],
    officialUrl: "https://www.gov.uk/standard-visitor",
  },
  {
    id: "settlement",
    title: "Settlement / Indefinite Leave to Remain",
    titleEn: "Settlement / Indefinite Leave to Remain",
    category: "Постоянное проживание",
    categoryEn: "Settlement",
    description: "Постоянное проживание обычно доступно только после подходящего периода проживания и при соблюдении правил конкретного маршрута.",
    descriptionEn: "Settlement is generally available only after a qualifying period and subject to route-specific rules.",
    requirements: [
      "Нужно иметь иммиграционный маршрут, который ведёт к settlement.",
      "Требуется соответствовать срокам проживания и правилам непрерывного проживания.",
      "Могут применяться требования к английскому языку, Life in the UK Test и другим условиям.",
    ],
    requirementsEn: [
      "You need an immigration route that leads to settlement.",
      "Qualifying residence periods and continuous residence rules apply.",
      "English language, Life in the UK Test and other requirements may apply.",
    ],
    limitations: [
      "Не все визы ведут к постоянному проживанию.",
      "Время по некоторым временным маршрутам может не засчитываться в обычный пятилетний срок.",
      "Нельзя определить право на settlement только по общему стажу пребывания.",
    ],
    limitationsEn: [
      "Not all visas lead to settlement.",
      "Time on some temporary routes may not count towards the usual five-year period.",
      "Eligibility cannot be determined by total time in the UK alone.",
    ],
    officialUrl: "https://www.gov.uk/indefinite-leave-to-remain",
  },
  {
    id: "protection",
    title: "Asylum and protection",
    titleEn: "Asylum and protection",
    category: "Защита",
    categoryEn: "Protection",
    description: "Процедура для людей, которые опасаются преследования или серьёзного вреда при возвращении в свою страну.",
    descriptionEn: "A process for people who fear persecution or serious harm if returned to their country.",
    requirements: [
      "Обстоятельства рассматриваются индивидуально.",
      "Важно подробно изложить причины опасения и предоставить доступные доказательства.",
      "Следует получить специализированную юридическую консультацию.",
    ],
    requirementsEn: [
      "Each case is assessed individually.",
      "You should explain the reasons for your fear and provide available evidence.",
      "Specialist legal advice is recommended.",
    ],
    limitations: [
      "Анкета не устанавливает право на убежище и не заменяет юридическую оценку.",
      "Процедура зависит от обстоятельств, применимых правил и этапа дела.",
    ],
    limitationsEn: [
      "This questionnaire does not determine asylum eligibility or replace legal assessment.",
      "The process depends on circumstances, applicable rules and the stage of the case.",
    ],
    officialUrl: "https://www.gov.uk/claim-asylum",
  },
];

const tRu = {
  title: "Навигатор иммиграции в Великобританию",
  subtitle:
    "Ответьте на вопросы, чтобы увидеть возможные визовые маршруты, основные условия и официальные источники для дальнейшей проверки.",
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
    "Баллы — это ориентир для навигации, а не вероятность одобрения и не юридическое заключение. Окончательные требования определяет GOV.UK.",
  noResults: "Пока нет подходящих результатов",
  noResultsDescription:
    "Попробуйте ответить на вопросы о цели поездки, работе, учёбе и семье. Не все визовые маршруты можно определить по краткой анкете.",
  top: "Наиболее подходящий",
  requirements: "Основные требования",
  limitations: "Ограничения и что проверить",
  official: "Официальные требования",
  showAll: "Показать все маршруты",
  showFewer: "Показать меньше",
  noticeTitle: "Важная информация",
  noticeText:
    "Иммиграционные правила Великобритании меняются. Перед подачей заявления проверяйте актуальные требования, стоимость, сроки и право на dependants на официальном сайте.",
  rulesLink: "Официальный каталог виз GOV.UK",
  passportTitle: "Проверка въезда",
  passportText:
    "Необходимость визы или Electronic Travel Authorisation (ETA) зависит от гражданства и цели поездки. Проверяйте требования для своего паспорта до покупки билетов.",
  historyTitle: "Предыдущие отказы или нарушения",
  historyText:
    "Отказы, превышение срока пребывания и другие иммиграционные обстоятельства могут повлиять на заявление. Важно раскрывать информацию честно и проверить, какие документы потребуются.",
  expiredTitle: "Истёкший статус",
  expiredText:
    "Если ваше разрешение уже истекло, не полагайтесь на общие рекомендации анкеты. Срочно проверьте официальные правила и при необходимости получите консультацию специалиста.",
  protectionTitle: "Защита и убежище",
  protectionText:
    "Если вы опасаетесь преследования или серьёзного вреда при возвращении, обратитесь к официальной информации и квалифицированному специалисту. Этот инструмент не оценивает обоснованность заявления.",
  generalDisclaimer:
    "Информация предназначена для общей навигации и не является иммиграционной или юридической консультацией. Баллы не отражают вероятность одобрения. Проверяйте актуальные правила на GOV.UK.",
  footer: "Вернуться к World Navigator",
};

const tEn = {
  title: "UK Immigration Navigator",
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
    "Scores are navigation aids, not approval probabilities or legal advice. GOV.UK sets the definitive requirements.",
  noResults: "No matching results yet",
  noResultsDescription:
    "Try answering questions about your visit, work, study and family. Not every visa route can be assessed by a short questionnaire.",
  top: "Best match",
  requirements: "Main requirements",
  limitations: "Limitations and checks",
  official: "Official requirements",
  showAll: "Show all routes",
  showFewer: "Show fewer",
  noticeTitle: "Important information",
  noticeText:
    "UK immigration rules change. Before applying, check the latest requirements, fees, processing times and dependant eligibility on the official website.",
  rulesLink: "Official GOV.UK visa directory",
  passportTitle: "Check entry requirements",
  passportText:
    "Whether you need a visa or Electronic Travel Authorisation (ETA) depends on your nationality and purpose of travel. Check the rules for your passport before booking.",
  historyTitle: "Previous refusals or breaches",
  historyText:
    "Refusals, overstaying and other immigration circumstances can affect an application. Disclose information honestly and check which documents are required.",
  expiredTitle: "Expired immigration status",
  expiredText:
    "If your permission has already expired, do not rely on general questionnaire guidance. Check the official rules promptly and seek professional advice if needed.",
  protectionTitle: "Protection and asylum",
  protectionText:
    "If you fear persecution or serious harm on return, consult official information and a qualified specialist. This tool does not assess the merits of an asylum claim.",
  generalDisclaimer:
    "This tool provides general navigation and is not immigration or legal advice. Scores do not represent the probability of approval. Check current rules on GOV.UK.",
  footer: "Back to World Navigator",
};

function isAnswered(value: string | undefined) {
  return value !== undefined && value !== "";
}

function getRouteScore(id: string, a: Answers): number {
  const goal = a.goal;
  let score = 0;

  const hasJobOffer = a.jobOffer === "yes";
  const hasSponsor = a.sponsor === "yes";
  const hasStudyOffer = a.studyOffer === "yes";
  const hasCas = a.cas === "yes";
  const hasFunds = ["yes", "sponsor"].includes(a.funds);
  const familySponsor = ["british", "settled"].includes(a.family);
  const hasPassport = a.passport === "yes";

  switch (id) {
    case "skilled": {
      if (goal !== "work" && goal !== "settle") return 0;
      score = 15;
      if (hasJobOffer) score += 30;
      if (hasSponsor) score += 25;
      if (["it", "science", "education", "finance", "health", "trade"].includes(a.occupation)) score += 10;
      if (["41700plus", "35-41700"].includes(a.salary)) score += 8;
      if (["good", "fluent", "exempt"].includes(a.english)) score += 7;
      if (a.workExperience === "5plus" || a.workExperience === "2-5") score += 5;
      if (a.jobOffer === "no") score -= 15;
      return Math.max(0, Math.min(score, 95));
    }

    case "health": {
      if (goal !== "work" && goal !== "settle") return 0;
      if (!["health", "care"].includes(a.occupation)) return 0;
      score = 25;
      if (hasJobOffer) score += 25;
      if (hasSponsor) score += 25;
      if (a.occupation === "health") score += 10;
      if (["good", "fluent", "exempt"].includes(a.english)) score += 5;
      if (a.jobOffer === "no") score -= 10;
      return Math.max(0, Math.min(score, 95));
    }

    case "graduate": {
      if (a.ukExperience !== "graduate") return 0;
      score = 55;
      if (a.status === "valid") score += 15;
      if (a.education === "master" || a.education === "phd") score += 10;
      if (a.status === "expired") score -= 35;
      return Math.max(0, Math.min(score, 85));
    }

    case "globaltalent": {
      if (goal !== "talent" && goal !== "work") return 0;
      score = 20;
      if (a.talent === "yes") score += 40;
      if (a.talent === "research") score += 30;
      if (a.talent === "potential") score += 10;
      if (a.education === "phd") score += 10;
      if (a.workExperience === "5plus") score += 10;
      if (a.talent === "no") score -= 15;
      return Math.max(0, Math.min(score, 90));
    }

    case "hpi": {
      if (goal !== "work" && goal !== "settle" && goal !== "study") return 0;
      score = 10;
      if (["bachelor", "master", "phd"].includes(a.education)) score += 20;
      if (a.education === "master" || a.education === "phd") score += 10;
      if (["good", "fluent", "exempt"].includes(a.english)) score += 5;
      if (hasFunds) score += 10;
      return Math.min(score, 55);
    }

    case "yms": {
      if (goal !== "work" && goal !== "visit" && goal !== "settle") return 0;
      const eligibleCitizenships = ["au", "nz", "ca", "jp", "kr"];
      if (!eligibleCitizenships.includes(a.citizenship)) return 0;
      score = 35;
      if (["18-25", "26-30"].includes(a.age)) score += 30;
      if (a.age === "31-35") score += 15;
      if (hasFunds) score += 10;
      if (hasPassport) score += 10;
      if (a.age === "under18" || a.age === "50plus") score = 0;
      return Math.min(score, 85);
    }

    case "student": {
      if (goal !== "study") return 0;
      score = 20;
      if (hasStudyOffer) score += 25;
      if (hasCas) score += 25;
      if (hasFunds) score += 15;
      if (["good", "fluent", "exempt"].includes(a.english)) score += 5;
      if (a.studyOffer === "no") score -= 5;
      return Math.max(0, Math.min(score, 95));
    }

    case "family": {
      if (goal !== "family" && goal !== "settle") return 0;
      score = 15;
      if (familySponsor) score += 30;
      if (a.family === "visa") score += 10;
      if (a.family === "child") score += 15;
      if (["married", "2plus"].includes(a.relationship)) score += 15;
      if (hasFunds) score += 10;
      if (a.family === "none") score = 0;
      return Math.min(score, 90);
    }

    case "innovator": {
      if (goal !== "business" && goal !== "work") return 0;
      score = 15;
      if (a.business === "innovative") score += 45;
      if (a.business === "existing") score += 15;
      if (a.business === "invest") score += 10;
      if (hasFunds) score += 10;
      if (["good", "fluent", "exempt"].includes(a.english)) score += 5;
      if (a.business === "no") score = 0;
      return Math.min(score, 85);
    }

    case "visitor": {
      if (goal !== "visit") return 0;
      if (a.visitDuration === "permanent") return 0;
      score = 50;
      if (hasPassport) score += 15;
      if (hasFunds) score += 20;
      if (a.visitDuration === "short") score += 10;
      if (a.passport === "no") score -= 25;
      return Math.max(10, Math.min(score, 90));
    }

    case "settlement": {
      if (goal !== "settle") return 0;
      score = 10;
      if (a.status === "valid") score += 15;
      if (a.status === "euss") score += 45;
      if (a.ukExperience === "1year") score += 10;
      if (a.family === "british" || a.family === "settled") score += 15;
      if (a.status === "expired") score -= 10;
      return Math.max(0, Math.min(score, 75));
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

function getRouteWarning(
  id: string,
  a: Answers,
  isEnglish: boolean,
): string | null {
  const warning = (ru: string, en: string) => (isEnglish ? en : ru);

  if (id === "yms") {
    return warning(
      "Доступность Youth Mobility Scheme зависит от гражданства, возраста и действующих соглашений. Этот инструмент не заменяет официальную проверку.",
      "Youth Mobility Scheme eligibility depends on nationality, age and current arrangements. This tool is not an official eligibility check.",
    );
  }

  if (id === "skilled" && a.jobOffer !== "yes") {
    return warning(
      "Для Skilled Worker обычно требуется предложение подходящей работы от лицензированного работодателя и Certificate of Sponsorship.",
      "Skilled Worker normally requires an eligible job offer from a licensed sponsor and a Certificate of Sponsorship.",
    );
  }

  if (id === "health") {
    return warning(
      "Не каждая работа в медицине или социальном уходе подходит для Health and Care Worker visa. Проверьте профессию и статус работодателя.",
      "Not every healthcare or care role qualifies for the Health and Care Worker visa. Check the occupation and sponsor.",
    );
  }

  if (id === "student" && !a.cas) {
    return warning(
      "Для подачи обычно требуется CAS от лицензированного учебного заведения. Проверьте также требования к финансам и английскому языку.",
      "A CAS from a licensed education provider is normally needed. Check the financial and English language requirements too.",
    );
  }

  if (id === "family") {
    return warning(
      "Финансовые требования и критерии отношений зависят от категории и статуса спонсора. Проверьте действующие правила до подачи.",
      "Financial and relationship requirements depend on the category and sponsor's status. Check the current rules before applying.",
    );
  }

  if (id === "innovator") {
    return warning(
      "Нужна проверка соответствия критериям Innovator Founder и требованиям к одобрению проекта. Обычного бизнес-плана может быть недостаточно.",
      "You must meet Innovator Founder criteria and endorsement requirements. A standard business plan may not be sufficient.",
    );
  }

  if (id === "visitor") {
    return warning(
      "Проверьте, требуется ли вам Standard Visitor visa, ETA или иной документ. Это зависит от гражданства и цели поездки.",
      "Check whether you need a Standard Visitor visa, ETA or another document. This depends on nationality and purpose of travel.",
    );
  }

  if (id === "settlement") {
    return warning(
      "Не все визовые маршруты ведут к постоянному проживанию. Проверьте требования именно для вашего текущего статуса и маршрута.",
      "Not all visa routes lead to settlement. Check the rules for your specific current status and route.",
    );
  }

  if (id === "protection") {
    return warning(
      "Этот результат не определяет право на убежище. Для оценки обстоятельств обратитесь к квалифицированному специалисту.",
      "This result does not determine asylum eligibility. Consult a qualified professional for an assessment of your circumstances.",
    );
  }

  if (id === "globaltalent") {
    return warning(
      "Для Global Talent действуют отдельные критерии по области деятельности, одобрению и доказательствам достижений.",
      "Global Talent has specific field-based criteria, endorsement rules and evidence requirements.",
    );
  }

  if (id === "hpi") {
    return warning(
      "Проверьте актуальный список университетов и требования к дате получения квалификации. Не любой зарубежный диплом подходит.",
      "Check the current eligible university list and qualification award-date rules. Not every overseas degree qualifies.",
    );
  }

  return null;
}

export default function UKPage() {
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
                  code="GB"
                  name="United Kingdom"
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
                  href="https://www.gov.uk/browse/visas-immigration"
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
                    href="https://www.gov.uk/check-uk-visa"
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
                    href="https://www.gov.uk/government/organisations/uk-visas-and-immigration"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-orange-200 hover:text-orange-100"
                  >
                    {isEnglish ? "Official UKVI information" : "Официальная информация UKVI"}
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
                    href="https://www.gov.uk/visa-expired"
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
                    href="https://www.gov.uk/claim-asylum"
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