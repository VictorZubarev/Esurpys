export type Language = "en" | "ru";

export type VisaCategory =
  | "work"
  | "study"
  | "business"
  | "family"
  | "humanitarian"
  | "other";

export type RequirementType =
  | "boolean"
  | "text"
  | "number"
  | "conditional";

export type VisaRequirement = {
  id: string;
  type: RequirementType;
  required: boolean;
  title: Record<Language, string>;
  description: Record<Language, string>;
  profileField?: string;
  officialSourceIds: string[];
};

export type OfficialSource = {
  id: string;
  title: Record<Language, string>;
  url: string;
  authority: string;
  lastChecked: string;
  sourceUpdated?: string;
};

export type VisaProgram = {
  id: string;
  slug: string;
  countryCode: string;
  countryName: Record<Language, string>;
  name: Record<Language, string>;
  category: VisaCategory;
  summary: Record<Language, string>;
  officialUrl: string;
  status: "published" | "needs_review" | "draft";
  lastChecked: string;
  ruleVersion: string;
  requirements: VisaRequirement[];
  sources: OfficialSource[];
  disclaimer: Record<Language, string>;
};

export const visaPrograms: VisaProgram[] = [
  {
    id: "uk-skilled-worker",
    slug: "uk-skilled-worker",
    countryCode: "GB",
    countryName: {
      en: "United Kingdom",
      ru: "Великобритания",
    },
    name: {
      en: "Skilled Worker visa",
      ru: "Рабочая виза Skilled Worker",
    },
    category: "work",
    summary: {
      en: "A work route for eligible jobs with an employer approved to sponsor workers in the UK.",
      ru: "Рабочий маршрут для подходящих вакансий у работодателей, имеющих право спонсировать иностранных работников в Великобритании.",
    },
    officialUrl: "https://www.gov.uk/skilled-worker-visa",
    status: "needs_review",
    lastChecked: "2026-10-21",
    ruleVersion: "UK Skilled Worker rules; official pages reviewed 2026-10-21",

    requirements: [
      {
        id: "job-offer",
        type: "boolean",
        required: true,
        title: {
          en: "Eligible job offer",
          ru: "Предложение подходящей работы",
        },
        description: {
          en: "You generally need a confirmed job offer before applying.",
          ru: "Как правило, до подачи заявления необходимо получить подтверждённое предложение работы.",
        },
        profileField: "hasEligibleJobOffer",
        officialSourceIds: ["uk-skilled-worker-overview"],
      },
      {
        id: "approved-sponsor",
        type: "boolean",
        required: true,
        title: {
          en: "Approved employer",
          ru: "Работодатель с разрешением на спонсорство",
        },
        description: {
          en: "The employer must be approved by the UK Home Office to sponsor workers.",
          ru: "Работодатель должен иметь одобрение Home Office на спонсирование работников.",
        },
        profileField: "hasApprovedSponsor",
        officialSourceIds: ["uk-skilled-worker-overview"],
      },
      {
        id: "certificate-of-sponsorship",
        type: "boolean",
        required: true,
        title: {
          en: "Certificate of Sponsorship",
          ru: "Certificate of Sponsorship",
        },
        description: {
          en: "You generally need a valid Certificate of Sponsorship from your employer.",
          ru: "Как правило, необходим действительный Certificate of Sponsorship от работодателя.",
        },
        profileField: "hasCertificateOfSponsorship",
        officialSourceIds: ["uk-skilled-worker-overview"],
      },
      {
        id: "eligible-occupation",
        type: "boolean",
        required: true,
        title: {
          en: "Eligible occupation",
          ru: "Подходящая профессия",
        },
        description: {
          en: "The job must meet the current occupation rules for this route.",
          ru: "Должность должна соответствовать действующим правилам для этого маршрута.",
        },
        profileField: "occupationEligible",
        officialSourceIds: ["uk-skilled-worker-job"],
      },
      {
        id: "salary",
        type: "conditional",
        required: true,
        title: {
          en: "Salary requirement",
          ru: "Требования к зарплате",
        },
        description: {
          en: "The applicable minimum depends on the job, its going rate and any relevant exceptions. Check the current official rules.",
          ru: "Применимый минимум зависит от должности, установленной для неё ставки и возможных исключений. Необходимо проверить актуальные официальные правила.",
        },
        profileField: "salaryMeetsApplicableThreshold",
        officialSourceIds: ["uk-skilled-worker-job"],
      },
      {
        id: "english",
        type: "conditional",
        required: true,
        title: {
          en: "English language requirement",
          ru: "Требование к знанию английского",
        },
        description: {
          en: "You must meet the applicable English-language requirement or qualify for an exemption. The required evidence and level can depend on your circumstances and application date.",
          ru: "Необходимо выполнить применимое требование к английскому языку либо подпадать под исключение. Подходящий уровень и способ подтверждения зависят от обстоятельств и даты подачи заявления.",
        },
        profileField: "englishRequirementMet",
        officialSourceIds: ["uk-skilled-worker-english"],
      },
    ],

    sources: [
      {
        id: "uk-skilled-worker-overview",
        title: {
          en: "Skilled Worker visa: Overview",
          ru: "Skilled Worker visa: общие требования",
        },
        url: "https://www.gov.uk/skilled-worker-visa",
        authority: "UK Home Office / GOV.UK",
        lastChecked: "2026-10-21",
      },
      {
        id: "uk-skilled-worker-job",
        title: {
          en: "Skilled Worker visa: Your job",
          ru: "Skilled Worker visa: требования к работе",
        },
        url: "https://www.gov.uk/skilled-worker-visa/your-job",
        authority: "UK Home Office / GOV.UK",
        lastChecked: "2026-10-21",
      },
      {
        id: "uk-skilled-worker-english",
        title: {
          en: "Skilled Worker visa: Knowledge of English",
          ru: "Skilled Worker visa: знание английского",
        },
        url: "https://www.gov.uk/skilled-worker-visa/knowledge-of-english",
        authority: "UK Home Office / GOV.UK",
        lastChecked: "2026-10-21",
      },
    ],

    disclaimer: {
      en: "Informational guidance only, not legal advice. This record is a pilot and needs further review before being used for eligibility decisions. Always confirm current rules with the official authority.",
      ru: "Информация носит справочный характер и не является юридической консультацией. Эта запись — пилотная версия, требующая дополнительной проверки перед использованием для оценки соответствия требованиям. Всегда сверяйтесь с актуальными правилами официального органа.",
    },
  },
];

export function getVisaProgramBySlug(
  slug: string,
): VisaProgram | undefined {
  return visaPrograms.find((program) => program.slug === slug);
}

export function getVisaProgramsByCountry(
  countryCode: string,
): VisaProgram[] {
  return visaPrograms.filter(
    (program) => program.countryCode === countryCode,
  );
}

export function getVisaProgramsByCategory(
  category: VisaCategory,
): VisaProgram[] {
  return visaPrograms.filter(
    (program) => program.category === category,
  );
}
