# Data Schema Reference

## Overview

All static data is stored in TypeScript files in `/src/lib/data/`. This document describes each data module and its schema.

---

## Roles (`roles.ts`)

Job role definitions for Indeed Flex positions.

### Interface

```typescript
interface Role {
  slug: string;           // URL-friendly identifier
  title: string;          // Display name
  industry: string;       // hospitality, warehouse, retail, facilities
  description: string;    // Role description
  avgHourlyRate: {
    min: number;
    max: number;
  };
  requirements: string[]; // List of requirements
  skills: string[];       // Required skills
  certifications?: string[]; // Recommended certifications
  physicalDemands?: string;  // Physical requirements
  schedule?: string;      // Typical schedule
}
```

### Usage

```typescript
import { roles, getRoleBySlug, getRolesByIndustry } from "@/lib/data/roles";

// Get all roles
const allRoles = roles;

// Get single role
const bartender = getRoleBySlug("bartender");

// Get roles by industry
const hospitalityRoles = getRolesByIndustry("hospitality");
```

### Data Count: 47 roles

---

## Cities (`cities.ts`)

City data with job market information.

### Interface

```typescript
interface City {
  slug: string;
  city: string;
  state: string;
  stateCode: string;
  region: string;         // Northeast, Southeast, Midwest, Southwest, West
  population: string;
  searchVolume: 'high' | 'medium' | 'low';
  topIndustries: string[];
  avgWages: {
    hospitality: number;
    warehouse: number;
    retail: number;
  };
  costOfLivingIndex: number;  // 100 = national average
  minimumWage: number;
}
```

### Usage

```typescript
import { cities, getCityBySlug, isActiveMarket } from "@/lib/data/cities";

// Get city by slug
const nyc = getCityBySlug("new-york");

// Check if Indeed Flex operates there
const isActive = isActiveMarket("austin"); // true
```

### Data Count: 99 cities

---

## Locations (`locations.ts`)

Indeed Flex operational markets.

### Interface

```typescript
interface Location {
  slug: string;
  city: string;
  state: string;
  region: string;
  active: boolean;
  description: string;
  topRoles: string[];
  avgHourlyRate: number;
}
```

### Usage

```typescript
import { usLocations, getLocationBySlug } from "@/lib/data/locations";

const austin = getLocationBySlug("austin");
```

### Data Count: 19 locations

---

## Certifications (`certifications.ts`)

Career certifications for flex workers.

### Interface

```typescript
interface Certification {
  name: string;
  slug: string;
  category: 'hospitality' | 'warehouse' | 'universal';
  description: string;
  requirements: string[];
  validityPeriod: string;
  payIncrease: string;
  stateSpecific?: boolean;
  providers: CertificationProvider[];
}

interface CertificationProvider {
  name: string;
  url: string;
  cost: string;
  duration: string;
  accredited: boolean;
  description?: string;
}
```

### Usage

```typescript
import {
  certifications,
  getCertificationBySlug,
  getHospitalityCertifications,
  getWarehouseCertifications,
} from "@/lib/data/certifications";

const forklift = getCertificationBySlug("forklift");
const hospitalityCerts = getHospitalityCertifications();
```

### Data Count: 8 certifications

---

## Unemployment Benefits (`unemployment-benefits.ts`)

State unemployment benefit data.

### Interface

```typescript
interface StateUnemploymentInfo {
  name: string;
  abbreviation: string;
  maxWeeklyBenefit: number;
  minWeeklyBenefit: number;
  replacementRate: number;     // 0.5 = 50%
  maxWeeks: number;
  calculationMethod: 'highest-quarter' | 'two-highest-quarters' | 'average-weekly' | 'annual';
  calculationDivisor: number;
  partialEarningsDisregard: number;
  partialEarningsDisregardType: 'flat' | 'percentage' | 'greater-of';
  partialEarningsDisregardPercent?: number;
  benefitReductionRate: number;
  allowsPartTimeWork: boolean;
  mustSeekFullTime: boolean;
  gigWorkImpact: 'reduces-benefits' | 'may-disqualify' | 'allowed-with-reporting';
  waitingWeek: boolean;
  dependentAllowance: number;
  maxDependents: number;
  minBaseWages: number;
  minWeeksWorked: number;
  notes: string;
}
```

### Usage

```typescript
import {
  stateUnemploymentData,
  calculateWeeklyBenefit,
  calculatePartialBenefit,
  getSortedStatesByBenefit,
} from "@/lib/data/unemployment-benefits";

// Get state data
const californiaUI = stateUnemploymentData["CA"];

// Calculate benefit
const weeklyBenefit = calculateWeeklyBenefit("CA", 15000);

// Calculate with part-time work
const partial = calculatePartialBenefit("CA", 400, 200);
// Returns: { benefit: 300, earningsDisregard: 100, netReduction: 100 }
```

### Data Count: 51 states/territories

---

## State Tax Content (`state-tax-content.ts`)

State tax information for paycheck calculators.

### Interface

```typescript
interface StatePageContent {
  slug: string;
  title: string;           // State name
  abbreviation: string;
  description: string;
  hasStateTax: boolean;
  taxBrackets?: TaxBracket[];
  deductions?: Deduction[];
  content: string;         // Long-form content
}

interface TaxBracket {
  min: number;
  max: number | null;
  rate: number;
}
```

### Usage

```typescript
import {
  getAllStateSlugs,
  getStatePageContent,
} from "@/lib/data/state-tax-content";

// Get all state slugs for SSG
const slugs = getAllStateSlugs(); // ["alabama", "alaska", ...]

// Get content for a state
const texas = getStatePageContent("texas");
```

### Data Count: 51 states

---

## How to Become (`how-to-become.ts`)

Career path guides.

### Interface

```typescript
interface HowToBecomeGuide {
  roleSlug: string;
  roleTitle: string;
  description: string;
  timeToStart: string;      // "1-2 weeks"
  totalCost: string;        // "$0-100"
  expectedStartingPay: string;
  steps: Step[];
  certifications: string[];
  skills: string[];
  faqs: FAQ[];
}
```

### Usage

```typescript
import {
  howToBecomeGuides,
  getHowToBecomeBySlug,
} from "@/lib/data/how-to-become";

const bartenderGuide = getHowToBecomeBySlug("bartender");
```

### Data Count: 7 guides

---

## Interview Questions (`interview-questions.ts`)

Interview preparation content.

### Interface

```typescript
interface RoleInterviewGuide {
  roleSlug: string;
  roleTitle: string;
  description: string;
  questions: InterviewQuestion[];
}

interface InterviewQuestion {
  question: string;
  category: 'behavioral' | 'technical' | 'situational';
  tips: string[];
  sampleAnswer: string;
}
```

### Usage

```typescript
import {
  interviewGuides,
  getInterviewGuideBySlug,
} from "@/lib/data/interview-questions";

const serverInterview = getInterviewGuideBySlug("server");
```

### Data Count: 10 guides

---

## Data Helper Functions

### SSG Helpers (`ssg-helpers.ts`)

Utilities for generating static paths:

```typescript
import {
  getAllRoleSlugs,
  getAllCitySlugs,
  getAllLocationSlugs,
} from "@/lib/data/ssg-helpers";

// Use in generateStaticParams()
export function generateStaticParams() {
  return getAllRoleSlugs().map((slug) => ({ roleSlug: slug }));
}
```

---

## Adding New Data

### 1. Define Interface

```typescript
// src/lib/data/new-data.ts
export interface NewItem {
  slug: string;
  name: string;
  // ...
}
```

### 2. Add Data Array

```typescript
export const newItems: NewItem[] = [
  { slug: "item-1", name: "Item One" },
  { slug: "item-2", name: "Item Two" },
];
```

### 3. Add Helper Functions

```typescript
export const getNewItemBySlug = (slug: string): NewItem | undefined => {
  return newItems.find((item) => item.slug === slug);
};

export const getAllNewItemSlugs = (): string[] => {
  return newItems.map((item) => item.slug);
};
```

### 4. Export from Index

```typescript
// src/lib/data/index.ts
export * from "./new-data";
```

### 5. Create Page

```typescript
// src/app/new-route/[slug]/page.tsx
import { newItems, getNewItemBySlug } from "@/lib/data/new-data";

export function generateStaticParams() {
  return newItems.map((item) => ({ slug: item.slug }));
}

export default function Page({ params }) {
  const item = getNewItemBySlug(params.slug);
  // ...
}
```

