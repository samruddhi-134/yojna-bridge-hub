import type { Scheme } from "@/lib/schemes.functions";
import { SUPPORT_NEEDS, categoryLabel } from "@/lib/site";

export interface EligibilityAnswers {
  age: string;
  gender: string;
  state: string;
  district: string;
  areaType: string;
  education: string;
  isStudent: string;
  course: string;
  occupation: string;
  income: string;
  needs: string[];
  hasDisability: string;
  seniorCitizen: string;
  notes: string;
}

export const emptyAnswers: EligibilityAnswers = {
  age: "",
  gender: "",
  state: "",
  district: "",
  areaType: "",
  education: "",
  isStudent: "",
  course: "",
  occupation: "",
  income: "",
  needs: [],
  hasDisability: "",
  seniorCitizen: "",
  notes: "",
};

const STORAGE_KEY = "yojnasetu:eligibility-answers";

export function saveAnswers(answers: EligibilityAnswers) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
}

export function loadAnswers(): EligibilityAnswers | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return { ...emptyAnswers, ...(JSON.parse(raw) as EligibilityAnswers) };
  } catch {
    return null;
  }
}

export interface SchemeMatch {
  scheme: Scheme;
  reasons: string[];
  score: number;
}

/**
 * Simple, transparent matching over clearly labelled demo scheme records.
 * It never claims official eligibility — only that a scheme may be relevant.
 */
export function matchSchemes(schemes: Scheme[], answers: EligibilityAnswers): SchemeMatch[] {
  const needCategories = new Set(
    answers.needs
      .map((n) => SUPPORT_NEEDS.find((s) => s.value === n)?.category)
      .filter(Boolean) as string[],
  );
  const age = Number(answers.age) || 0;

  const results: SchemeMatch[] = [];

  for (const scheme of schemes) {
    const reasons: string[] = [];
    let score = 0;

    if (needCategories.has(scheme.category)) {
      score += 3;
      reasons.push(`Matches the ${categoryLabel(scheme.category)} support you selected.`);
    }

    if (scheme.government_level === "State" && scheme.state) {
      if (answers.state && scheme.state === answers.state) {
        score += 3;
        reasons.push(`Offered in ${answers.state}, the state you selected.`);
      } else {
        continue; // state schemes from other states are not relevant
      }
    } else {
      score += 1;
    }

    const targets = scheme.target_users ?? [];
    if (answers.occupation === "Student" && targets.includes("Students")) {
      score += 2;
      reasons.push("Relevant for students based on your occupation.");
    }
    if (answers.occupation === "Farmer" && targets.includes("Farmers")) {
      score += 2;
      reasons.push("Relevant for farmers based on your occupation.");
    }
    if (answers.occupation === "Unemployed" && targets.includes("Unemployed")) {
      score += 2;
      reasons.push("Relevant for people currently seeking work.");
    }
    if (
      (answers.occupation === "Business Owner" || answers.occupation === "Self-employed") &&
      (targets.includes("Business Owners") || targets.includes("Self-employed"))
    ) {
      score += 2;
      reasons.push("Relevant for self-employed people and business owners.");
    }
    if (answers.gender === "Female" && scheme.category === "women") {
      score += 2;
      reasons.push("Designed for women applicants.");
    }
    if (answers.gender !== "Female" && scheme.category === "women") {
      continue;
    }
    if (answers.seniorCitizen === "Yes" && targets.includes("Senior Citizens")) {
      score += 2;
      reasons.push("Relevant for senior citizens.");
    }
    if (targets.includes("Senior Citizens") && answers.seniorCitizen !== "Yes" && age && age < 60) {
      continue;
    }
    if (scheme.category === "education" && answers.education) {
      score += 1;
      reasons.push(`Considered alongside your education level (${answers.education}).`);
    }
    if (answers.income && answers.income !== "Prefer not to say") {
      reasons.push(`Income-linked criteria may apply for your range (${answers.income}).`);
    }

    if (score >= 3) {
      results.push({ scheme, reasons: reasons.slice(0, 3), score });
    }
  }

  return results.sort((a, b) => b.score - a.score);
}
