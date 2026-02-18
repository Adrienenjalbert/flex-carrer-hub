# Contributing Guide

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm or yarn
- Git
- Code editor (VS Code recommended)

### Setup

```bash
# Clone the repository
git clone <repository-url>
cd nextjs-app

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Start development server
npm run dev
```

---

## Development Workflow

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
```

### 2. Make Changes

Follow the code standards below.

### 3. Test Your Changes

```bash
# Type check
npm run build

# Lint check
npm run lint

# Run development server
npm run dev
```

### 4. Commit Changes

```bash
git add .
git commit -m "feat: add new feature description"
```

### 5. Push and Create PR

```bash
git push origin feature/your-feature-name
```

---

## Code Standards

### TypeScript

- Use strict typing - avoid `any`
- Define interfaces for all props
- Export types for reuse

```typescript
// Good
interface ButtonProps {
  variant: "primary" | "secondary";
  onClick: () => void;
  children: React.ReactNode;
}

// Bad
const Button = (props: any) => { ... }
```

### Components

- Use functional components
- One component per file
- Name files same as component

```
components/
├── MyComponent.tsx       # Component file
├── MyComponent.test.tsx  # Tests (optional)
└── index.ts              # Re-exports
```

### Imports

Order imports:

```typescript
// 1. React/Next
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// 2. Third-party
import { format } from "date-fns";

// 3. Internal - components
import { Button } from "@/components/ui/button";
import Header from "@/components/career-hub/Header";

// 4. Internal - utilities/data
import { cn } from "@/lib/utils";
import { roles } from "@/lib/data/roles";

// 5. Types
import type { Role } from "@/lib/data/roles";
```

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `PayCalculator.tsx` |
| Utilities | camelCase | `formatCurrency.ts` |
| Data files | kebab-case | `state-tax-content.ts` |
| Constants | UPPER_SNAKE | `MAX_ITEMS` |
| Interfaces | PascalCase | `interface UserProps` |
| CSS classes | kebab-case | `container-main` |

### Styling

Use Tailwind CSS utilities:

```tsx
// Good - Tailwind utilities
<div className="flex items-center gap-4 p-6 bg-card rounded-lg">

// Use cn() for conditional classes
<div className={cn(
  "base-class",
  isActive && "active-class",
  variant === "large" && "text-lg"
)}>

// Bad - inline styles
<div style={{ display: 'flex', padding: 24 }}>
```

---

## Adding New Pages

### 1. Static Page

```typescript
// src/app/new-page/page.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Page Title",
  description: "Description for SEO",
};

export default function NewPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1>New Page</h1>
    </main>
  );
}
```

### 2. Dynamic Page with SSG

```typescript
// src/app/[slug]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { data, getBySlug } from "@/lib/data/...";

// Generate all static paths
export function generateStaticParams() {
  return data.map((item) => ({
    slug: item.slug,
  }));
}

// Generate metadata for each page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getBySlug(slug);
  
  if (!item) return { title: "Not Found" };
  
  return {
    title: item.title,
    description: item.description,
  };
}

// Page component
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getBySlug(slug);
  
  if (!item) {
    notFound();
  }
  
  return (
    <main>
      <h1>{item.title}</h1>
    </main>
  );
}
```

---

## Adding New Data

### 1. Create Data File

```typescript
// src/lib/data/new-data.ts

export interface NewItem {
  slug: string;
  name: string;
  description: string;
}

export const newItems: NewItem[] = [
  {
    slug: "item-one",
    name: "Item One",
    description: "Description...",
  },
];

// Helper functions
export const getNewItemBySlug = (slug: string): NewItem | undefined => {
  return newItems.find((item) => item.slug === slug);
};

export const getAllNewItemSlugs = (): string[] => {
  return newItems.map((item) => item.slug);
};
```

### 2. Export from Index

```typescript
// src/lib/data/index.ts
export * from "./new-data";
```

### 3. Update Sitemap

```typescript
// src/app/sitemap.ts
import { newItems } from "@/lib/data/new-data";

const newItemPages = newItems.map((item) => ({
  url: `https://indeedflex.com/new-route/${item.slug}`,
  lastModified: now,
  changeFrequency: "monthly" as const,
  priority: 0.7,
}));
```

---

## Adding New Components

### 1. Create Component

```typescript
// src/components/career-hub/NewComponent.tsx
import { cn } from "@/lib/utils";

interface NewComponentProps {
  title: string;
  className?: string;
}

export function NewComponent({ title, className }: NewComponentProps) {
  return (
    <div className={cn("p-4 rounded-lg bg-card", className)}>
      <h3>{title}</h3>
    </div>
  );
}
```

### 2. Export (if shared)

```typescript
// src/components/career-hub/index.ts
export { NewComponent } from "./NewComponent";
```

### 3. For Interactive Components

```typescript
// src/components/career-hub/interactive/Calculator.tsx
"use client";

import { useState } from "react";

export function Calculator() {
  const [value, setValue] = useState(0);
  
  return (
    <div>
      <input 
        type="number" 
        value={value} 
        onChange={(e) => setValue(Number(e.target.value))} 
      />
    </div>
  );
}
```

---

## Testing Checklist

Before submitting a PR:

- [ ] `npm run build` passes (no TypeScript errors)
- [ ] `npm run lint` passes (no ESLint errors)
- [ ] Page renders correctly at multiple screen sizes
- [ ] All links work
- [ ] Images have alt text
- [ ] No console errors
- [ ] Metadata is present (check `<head>`)
- [ ] Schema markup is valid

---

## Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new feature
fix: fix bug in component
docs: update documentation
style: format code
refactor: restructure code
perf: improve performance
test: add tests
chore: update dependencies
```

Examples:
```
feat: add unemployment benefits pages for all 50 states
fix: correct salary calculation in pay calculator
docs: add SEO documentation
refactor: extract common schema components
```

---

## Questions?

If you have questions:
1. Check existing documentation
2. Search existing issues
3. Create a new issue with details

