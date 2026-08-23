export const SITE_NAME = "YojnaSetu";
export const SITE_TAGLINE = "Connecting People with Opportunities.";
export const SITE_DESCRIPTION =
  "YojnaSetu helps people discover and understand government schemes through simplified information and personalized scheme discovery.";

export const GLOBAL_DISCLAIMER =
  "YojnaSetu is an independent information and discovery platform. Final eligibility and application approval are determined by the respective government authorities. Please verify all information through the official source before applying.";

export const FOOTER_DISCLAIMER =
  "YojnaSetu is an independent information and discovery platform and is not a government website. Scheme information may change over time. Users should verify eligibility, benefits, deadlines, and application procedures through the respective official government websites before applying.";

export type CategoryKey =
  | "education"
  | "women"
  | "agriculture"
  | "employment"
  | "startup"
  | "welfare";

export interface CategoryDef {
  key: CategoryKey;
  label: string;
  shortLabel: string;
  emoji: string;
  description: string;
}

export const CATEGORIES: CategoryDef[] = [
  {
    key: "education",
    label: "Education & Scholarships",
    shortLabel: "Education",
    emoji: "🎓",
    description: "Scholarships, fellowships, education assistance, and financial support.",
  },
  {
    key: "women",
    label: "Women Empowerment",
    shortLabel: "Women",
    emoji: "👩",
    description: "Education, entrepreneurship, financial support, and welfare.",
  },
  {
    key: "agriculture",
    label: "Agriculture & Farmers",
    shortLabel: "Agriculture",
    emoji: "🌾",
    description: "Financial assistance, insurance, technology, and farmer support.",
  },
  {
    key: "employment",
    label: "Employment & Skills",
    shortLabel: "Employment",
    emoji: "💼",
    description: "Jobs, apprenticeships, training, and skill development.",
  },
  {
    key: "startup",
    label: "Startup & Business",
    shortLabel: "Business",
    emoji: "🚀",
    description: "Loans, subsidies, entrepreneurship, and business support.",
  },
  {
    key: "welfare",
    label: "Social Welfare",
    shortLabel: "Welfare",
    emoji: "🏠",
    description: "Housing, pensions, healthcare, disability, and welfare support.",
  },
];

export const categoryLabel = (key: string) =>
  CATEGORIES.find((c) => c.key === key)?.label ?? key;

export const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

export const SUPPORT_NEEDS = [
  { value: "scholarship", label: "Scholarship", category: "education" },
  { value: "education", label: "Education", category: "education" },
  { value: "employment", label: "Employment", category: "employment" },
  { value: "skill", label: "Skill Development", category: "employment" },
  { value: "business", label: "Business Support", category: "startup" },
  { value: "agriculture", label: "Agriculture", category: "agriculture" },
  { value: "housing", label: "Housing", category: "welfare" },
  { value: "healthcare", label: "Healthcare", category: "welfare" },
  { value: "women", label: "Women Empowerment", category: "women" },
  { value: "welfare", label: "Social Welfare", category: "welfare" },
];

export const OCCUPATIONS = [
  "Student",
  "Employed",
  "Self-employed",
  "Unemployed",
  "Farmer",
  "Business Owner",
  "Other",
];

export const EDUCATION_LEVELS = [
  "Below Class 10",
  "Class 10 Passed",
  "Class 12 Passed",
  "Diploma",
  "Undergraduate",
  "Postgraduate",
  "Doctorate",
];

export const INCOME_RANGES = [
  "Below ₹1 lakh",
  "₹1 – 2.5 lakh",
  "₹2.5 – 5 lakh",
  "₹5 – 8 lakh",
  "Above ₹8 lakh",
  "Prefer not to say",
];

export const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/schemes", label: "Explore Schemes" },
  { to: "/categories", label: "Categories" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/resources", label: "Resources" },
] as const;
