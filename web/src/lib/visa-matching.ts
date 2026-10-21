import type {
  VisaProgram,
  VisaRequirement,
} from "@/lib/visa-programs";

export type ProfileAnswer =
  | boolean
  | string
  | number
  | null
  | undefined;

export type UserProfile = Record<string, ProfileAnswer>;

export type RequirementStatus =
  | "met"
  | "unmet"
  | "unknown";

export type RequirementResult = {
  requirement: VisaRequirement;
  status: RequirementStatus;
  explanation: string;
};

export type VisaMatchResult = {
  program: VisaProgram;
  requirements: RequirementResult[];
  metCount: number;
  unmetCount: number;
  unknownCount: number;
  totalCount: number;
  matchStatus: "promising" | "gaps" | "incomplete";
  disclaimer: string;
};

function evaluateRequirement(
  requirement: VisaRequirement,
  profile: UserProfile,
): RequirementResult {
  const field = requirement.profileField;
  const answer = field ? profile[field] : undefined;

  if (typeof answer !== "boolean") {
    return {
      requirement,
      status: "unknown",
      explanation:
        "Недостаточно данных, чтобы оценить это требование.",
    };
  }

  if (answer) {
    return {
      requirement,
      status: "met",
      explanation:
        "По вашему ответу это требование выполнено. Необходима проверка подтверждающих документов.",
    };
  }

  return {
    requirement,
    status: "unmet",
    explanation:
      requirement.type === "conditional"
        ? "По вашему ответу условие пока не выполнено. Проверьте возможные исключения и альтернативные правила."
        : "По вашему ответу это требование пока не выполнено.",
  };
}

export function matchVisaProgram(
  program: VisaProgram,
  profile: UserProfile,
): VisaMatchResult {
  const requirements = program.requirements.map(
    (requirement) => evaluateRequirement(requirement, profile),
  );

  const metCount = requirements.filter(
    (item) => item.status === "met",
  ).length;

  const unmetCount = requirements.filter(
    (item) => item.status === "unmet",
  ).length;

  const unknownCount = requirements.filter(
    (item) => item.status === "unknown",
  ).length;

  let matchStatus: VisaMatchResult["matchStatus"];

  if (unknownCount > 0) {
    matchStatus = "incomplete";
  } else if (unmetCount > 0) {
    matchStatus = "gaps";
  } else {
    matchStatus = "promising";
  }

  return {
    program,
    requirements,
    metCount,
    unmetCount,
    unknownCount,
    totalCount: requirements.length,
    matchStatus,
    disclaimer: program.disclaimer.ru,
  };
}

export function matchVisaPrograms(
  programs: VisaProgram[],
  profile: UserProfile,
): VisaMatchResult[] {
  return programs
    .map((program) => matchVisaProgram(program, profile))
    .sort((a, b) => {
      const statusOrder = {
        promising: 0,
        incomplete: 1,
        gaps: 2,
      };

      return (
        statusOrder[a.matchStatus] -
          statusOrder[b.matchStatus] ||
        b.metCount - a.metCount
      );
    });
}