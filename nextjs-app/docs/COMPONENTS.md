# Component Reference

## Overview

This document provides a comprehensive reference for all components in the Indeed Flex Career Hub.

---

## UI Components (`/src/components/ui/`)

These are shadcn/ui components - pre-built, accessible, and customizable.

### Button

```tsx
import { Button } from "@/components/ui/button";

<Button variant="default">Click me</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
```

### Card

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description text</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Main content here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### Badge

```tsx
import { Badge } from "@/components/ui/badge";

<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Error</Badge>
```

### Input

```tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

<div>
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="you@example.com" />
</div>
```

### Select

```tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

<Select>
  <SelectTrigger>
    <SelectValue placeholder="Choose..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
  </SelectContent>
</Select>
```

### Navigation Menu

```tsx
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Menu Item</NavigationMenuTrigger>
      <NavigationMenuContent>
        {/* Dropdown content */}
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```

### Tooltip

```tsx
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>Hover me</TooltipTrigger>
    <TooltipContent>
      <p>Tooltip text</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

---

## Career Hub Components (`/src/components/career-hub/`)

### Header

Main navigation header with mega menu.

```tsx
import Header from "@/components/career-hub/Header";

<Header />
```

Features:
- Sticky positioning
- Mega menu navigation
- Mobile hamburger menu
- Indeed Flex logo

### Footer

Site footer with links and branding.

```tsx
import Footer from "@/components/career-hub/Footer";

<Footer />
```

### ToolCard

Card component for displaying tools.

```tsx
import ToolCard from "@/components/career-hub/ToolCard";

<ToolCard
  title="Pay Calculator"
  description="Calculate your earnings"
  icon="calculator"
  href="/career-hub/tools/pay-calculator"
  estimatedTime="2 min"
  compact={false}
/>
```

Props:
| Prop | Type | Description |
|------|------|-------------|
| `title` | string | Tool name |
| `description` | string | Brief description |
| `icon` | string | Icon key (calculator, dollar, etc.) |
| `href` | string | Link destination |
| `estimatedTime` | string | Time to complete |
| `compact` | boolean | Compact display mode |

---

## Interactive Components (`/src/components/career-hub/interactive/`)

### PayCalculator

Interactive pay calculator with state tax integration.

```tsx
"use client";
import PayCalculator from "@/components/career-hub/interactive/PayCalculator";

<PayCalculator />
```

Features:
- Hourly rate input
- Hours per week slider
- State tax selection
- Tips calculation
- Annual/monthly/weekly breakdown

### SkillsAssessment

Interactive skills assessment quiz.

```tsx
"use client";
import SkillsAssessment from "@/components/career-hub/interactive/SkillsAssessment";

<SkillsAssessment />
```

### SalaryComparison

Visual salary comparison chart.

```tsx
"use client";
import SalaryComparison from "@/components/career-hub/interactive/SalaryComparison";

<SalaryComparison
  currentRole="server"
  citySlug="new-york"
/>
```

### EmbeddedPayCalculator

Simplified pay calculator for embedding in pages.

```tsx
import EmbeddedPayCalculator from "@/components/career-hub/interactive/EmbeddedPayCalculator";

<EmbeddedPayCalculator
  roleTitle="Bartender"
  minRate={15}
  maxRate={28}
  tipsRange={{ min: 50, max: 150 }}
/>
```

---

## SEO Components (`/src/components/career-hub/seo/`)

### FAQSchema

Renders FAQ structured data.

```tsx
import { FAQSchema } from "@/components/career-hub/seo";

<FAQSchema
  questions={[
    {
      question: "How much does X cost?",
      answer: "X costs $Y...",
    },
    // More questions...
  ]}
/>
```

### WebPageSchema

Renders WebPage structured data.

```tsx
import { WebPageSchema } from "@/components/career-hub/seo";

<WebPageSchema
  name="Page Title"
  description="Page description"
  url="https://indeedflex.com/page"
  breadcrumb={[
    { name: "Home", url: "https://indeedflex.com" },
    { name: "Current Page" },
  ]}
/>
```

### ArticleSchema

Renders Article structured data.

```tsx
import { ArticleSchema } from "@/components/career-hub/seo";

<ArticleSchema
  headline="Article Title"
  description="Article description"
  author={{ name: "Author Name", url: "https://..." }}
  publisher={{ name: "Indeed Flex", logo: "...", url: "..." }}
  datePublished="2026-01-01T00:00:00Z"
  mainEntityOfPage="https://indeedflex.com/article"
/>
```

### BreadcrumbSchema

Renders breadcrumb structured data.

```tsx
import { BreadcrumbSchema } from "@/components/career-hub/seo";

<BreadcrumbSchema
  items={[
    { name: "Home", url: "https://indeedflex.com" },
    { name: "Career Hub", url: "https://indeedflex.com/career-hub" },
    { name: "Current Page" },
  ]}
/>
```

---

## Layout Components

### Providers

Wraps the app with necessary providers.

```tsx
// src/components/providers.tsx
"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";

export function Providers({ children }) {
  return (
    <ThemeProvider>
      {children}
      <Toaster />
    </ThemeProvider>
  );
}
```

Used in root layout:
```tsx
// src/app/layout.tsx
import { Providers } from "@/components/providers";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

---

## Component Best Practices

### 1. Use TypeScript Interfaces

```tsx
interface CardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function Card({ title, description, children }: CardProps) {
  // ...
}
```

### 2. Use `cn()` for Conditional Classes

```tsx
import { cn } from "@/lib/utils";

<div className={cn(
  "base-class",
  isActive && "active-class",
  variant === "large" && "text-lg"
)}>
```

### 3. Client Components Only When Needed

```tsx
// Only add "use client" if you need:
// - useState, useEffect, useRef
// - Event handlers
// - Browser APIs

"use client";
import { useState } from "react";
```

### 4. Export Named Components

```tsx
// Good
export function MyComponent() {}

// Avoid for components
export default function() {}
```

