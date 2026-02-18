# Architecture Guide

## Overview

The Indeed Flex Career Hub is built with Next.js 14 using the App Router architecture. This document explains the key architectural decisions and patterns used throughout the application.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui + Radix UI |
| State Management | React Context + URL State |
| Backend | Supabase |
| Deployment | Vercel (recommended) |

---

## Directory Structure

### `/src/app` - Pages & Routes

The App Router uses file-based routing:

```
app/
├── layout.tsx          # Root layout (providers, fonts)
├── page.tsx            # Homepage (/)
├── globals.css         # Global styles
├── sitemap.ts          # Dynamic sitemap generation
├── robots.ts           # Robots.txt generation
│
├── career-hub/         # /career-hub/*
│   ├── layout.tsx      # Shared career-hub layout
│   ├── page.tsx        # /career-hub
│   ├── cities/
│   │   ├── page.tsx    # /career-hub/cities
│   │   └── [citySlug]/
│   │       └── page.tsx # /career-hub/cities/[citySlug]
│   └── ...
│
├── paycheck-calculator/
│   └── [stateSlug]/
│       └── page.tsx    # /paycheck-calculator/[stateSlug]
│
└── unemployment-benefits/
    ├── page.tsx        # /unemployment-benefits (index)
    └── [stateSlug]/
        └── page.tsx    # /unemployment-benefits/[stateSlug]
```

### `/src/components` - React Components

```
components/
├── ui/                 # shadcn/ui components
│   ├── button.tsx
│   ├── card.tsx
│   └── ...
│
├── career-hub/         # Career hub specific
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── interactive/    # Interactive components
│   │   ├── PayCalculator.tsx
│   │   └── SkillsAssessment.tsx
│   ├── seo/           # SEO components
│   │   ├── EnhancedSchema.tsx
│   │   └── index.ts
│   └── tools/         # Tool components
│
└── providers.tsx       # Context providers
```

### `/src/lib` - Utilities & Data

```
lib/
├── data/              # Static data modules
│   ├── roles.ts       # Job role definitions
│   ├── cities.ts      # City data
│   ├── certifications.ts
│   └── ...
│
├── seo/
│   └── metadata.ts    # Metadata generation helpers
│
└── utils.ts           # Utility functions (cn, etc.)
```

---

## Rendering Strategy

### Static Site Generation (SSG)

All pages use SSG for optimal performance and SEO:

```typescript
// Example: Generate all city pages at build time
export function generateStaticParams() {
  return cities.map((city) => ({
    citySlug: city.slug,
  }));
}
```

### Server Components (Default)

All components are Server Components by default. Only add `"use client"` when:
- Using React hooks (useState, useEffect)
- Using browser APIs
- Handling user interactions

```typescript
// Server Component (default)
export default function RolePage({ params }) {
  const role = getRoleBySlug(params.roleSlug);
  return <div>{role.title}</div>;
}
```

```typescript
// Client Component (when needed)
"use client";
import { useState } from "react";

export default function Calculator() {
  const [value, setValue] = useState(0);
  return <input value={value} onChange={(e) => setValue(Number(e.target.value))} />;
}
```

---

## Data Flow

### Static Data
All job/location/certification data is stored in TypeScript files:

```typescript
// src/lib/data/roles.ts
export const roles: Role[] = [
  {
    slug: "bartender",
    title: "Bartender",
    avgHourlyRate: { min: 15, max: 28 },
    // ...
  },
];

export const getRoleBySlug = (slug: string): Role | undefined => {
  return roles.find((r) => r.slug === slug);
};
```

### Dynamic Data (Supabase)
For user-specific data, use the Supabase client:

```typescript
import { supabase } from "@/integrations/supabase/client";

const { data, error } = await supabase
  .from("table_name")
  .select("*");
```

---

## SEO Architecture

### Metadata API

Each page exports a `generateMetadata` function:

```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const role = getRoleBySlug(params.roleSlug);
  
  return {
    title: `${role.title} Jobs | Indeed Flex`,
    description: role.description,
    openGraph: {
      title: role.title,
      description: role.description,
    },
  };
}
```

### Structured Data

JSON-LD schemas are rendered as script tags:

```typescript
import { FAQSchema, WebPageSchema } from "@/components/career-hub/seo";

export default function Page() {
  return (
    <>
      <FAQSchema questions={[...]} />
      <WebPageSchema name="..." description="..." />
      {/* Page content */}
    </>
  );
}
```

---

## Component Patterns

### Page Component Structure

```typescript
// Imports
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getData } from "@/lib/data/...";
import { FAQSchema } from "@/components/career-hub/seo";

// Static params for SSG
export function generateStaticParams() {
  return getData().map((item) => ({ slug: item.slug }));
}

// Metadata
export async function generateMetadata({ params }): Promise<Metadata> {
  // ...
}

// Page component
export default async function Page({ params }) {
  const data = getDataBySlug(params.slug);
  
  if (!data) {
    notFound();
  }
  
  return (
    <>
      <FAQSchema questions={[...]} />
      <main>
        {/* Content */}
      </main>
    </>
  );
}
```

### UI Component Pattern

```typescript
import { cn } from "@/lib/utils";

interface ComponentProps {
  variant?: "default" | "outline";
  children: React.ReactNode;
}

export function Component({ variant = "default", children }: ComponentProps) {
  return (
    <div className={cn(
      "base-styles",
      variant === "outline" && "outline-styles"
    )}>
      {children}
    </div>
  );
}
```

---

## Performance Considerations

1. **Server Components**: Default to server rendering
2. **Static Generation**: All pages pre-rendered
3. **Image Optimization**: Use `next/image`
4. **Code Splitting**: Automatic per-page bundles
5. **Font Optimization**: `next/font` for Inter

---

## Future Enhancements

1. **ISR (Incremental Static Regeneration)**: For frequently updated content
2. **Edge Runtime**: For dynamic personalization
3. **Streaming**: For progressive page loads
4. **Parallel Routes**: For complex layouts

