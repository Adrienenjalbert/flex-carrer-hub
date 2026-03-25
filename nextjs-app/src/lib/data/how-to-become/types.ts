export interface CareerStep {
  step: number;
  title: string;
  description: string;
  timeframe: string;
  cost: string;
  tips: string[];
  resources?: { name: string; url: string }[];
}

export interface HowToBecomeGuide {
  roleSlug: string;
  roleTitle: string;
  industry: string;
  overview: string;
  timeToStart: string;
  totalCost: string;
  difficulty: 'easy' | 'moderate' | 'challenging';
  steps: CareerStep[];
  requiredQualifications: string[];
  helpfulQualifications: string[];
  certifications: {
    name: string;
    required: boolean;
    cost: string;
    time: string;
    description: string;
  }[];
  education: {
    required: string;
    helpful: string;
  };
  ageRequirements: string;
  physicalRequirements: string[];
  backgroundCheck: boolean;
  drugTest: boolean;
  commonPaths: {
    path: string;
    description: string;
    timeframe: string;
  }[];
  firstJobTips: string[];
  expectedStartingPay: string;
  faqs: { question: string; answer: string }[];
}
