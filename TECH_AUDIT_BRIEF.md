# Indeed Flex Career Hub — Technical Audit Brief

**Date:** 26 March 2026
**Prepared for:** Tech team
**Scope:** Full codebase audit of the Next.js 14 Career Hub (`nextjs-app/`)
**Goal:** Get the site launch-ready, scalable, and maintainable as a state-of-the-art SEO/UX resource hub

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Critical Blockers (Must Fix Before Launch)](#2-critical-blockers)
3. [Analytics & Tracking Setup](#3-analytics--tracking-setup)
4. [CMS Strategy](#4-cms-strategy)
5. [Content Loop & Lifecycle](#5-content-loop--lifecycle)
6. [Release Plan — Phased Rollout](#6-release-plan--phased-rollout)
7. [Component Architecture Refactoring](#7-component-architecture-refactoring)
8. [Data Layer Issues](#8-data-layer-issues)
9. [Performance Optimisation](#9-performance-optimisation)
10. [CSS & Design System Cleanup](#10-css--design-system-cleanup)
11. [Accessibility (a11y)](#11-accessibility)
12. [Security Review](#12-security-review)
13. [Testing Strategy](#13-testing-strategy)
14. [CI/CD Pipeline](#14-cicd-pipeline)
15. [SEO Audit](#15-seo-audit)
16. [Documentation Cleanup](#16-documentation-cleanup)
17. [Dead Code & Unused Dependencies](#17-dead-code--unused-dependencies)
18. [Scaling Path](#18-scaling-path)
19. [Maintenance Runbook](#19-maintenance-runbook)
20. [Priority Matrix](#20-priority-matrix)

---

## 1. Executive Summary

The Career Hub is a large Next.js 14 statically-generated site with ~76 page routes, ~308+ generated pages (roles, cities, tools, guides, states), and a rich interactive tool suite. The codebase is functional but has significant technical debt that must be addressed before a production launch on `indeedflex.com`.

**Key stats:**
- 176 component files, 76 page routes, 61 data modules
- 50 client components, 84 inline style occurrences
- 0 tests, 0 CI/CD workflows
- GA4 and Search Console not connected
- Missing public assets (favicon, OG image, apple-touch-icon)
- CSP allows unsafe-inline and unsafe-eval
- 4 mega-components over 500 lines, largest at 1,932 lines
- Recharts (~200KB) loaded eagerly on multiple routes
- Heavy data files shipped to client bundles (state-taxes: 1,603 lines, cities: 2,419 lines, roles: 1,833 lines)

---

## 2. Critical Blockers

These MUST be resolved before any public launch.

### 2.1 Missing Public Assets
**Current state:** `public/` only contains `logo.svg`, `manifest.json`, and `ASSETS_README.md`.
**Missing files referenced in layout.tsx and manifest.json:**
- `favicon.ico` — referenced in layout.tsx line 196 and manifest.json
- `apple-touch-icon.png` — referenced in layout.tsx line 197
- `og-image.png` — referenced in layout.tsx metadata (lines 73-79) as `https://indeedflex.com/og-image.png`
- `logo.png` — described as required in ASSETS_README.md

**Action:** Create/obtain all brand assets from the design team and place in `public/`. Verify all metadata references match actual filenames.

### 2.2 GA4 Not Connected
**Current state:** The GA4 gtag snippet exists in layout.tsx (lines 225-242) but is gated behind `NEXT_PUBLIC_GA_MEASUREMENT_ID` environment variable, which is not set. No .env.example file exists to document required variables.
**Action:** See Section 3 for full analytics setup plan.

### 2.3 Search Console Not Verified
**Current state:** layout.tsx line 105 has `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` env var placeholder, but it's not configured.
**Action:** See Section 3 for full setup.

### 2.4 No .env.example
**Current state:** `docs/CONTRIBUTING.md` references `cp .env.example .env.local` but no `.env.example` exists. A root `.env` file exists that is NOT in `.gitignore` (risk of secret leakage).
**Action:**
1. Create `nextjs-app/.env.example` with all required variables documented
2. Verify root `.env` is either removed or added to root `.gitignore`
3. Required env vars to document:
   - `NEXT_PUBLIC_GA_MEASUREMENT_ID` (GA4)
   - `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` (Search Console)

### 2.5 Domain Typo
**Current state:** Vercel project URL is `flex-carrer-hub.vercel.app` (typo: "carrer" not "career"). README references this URL.
**Action:** Verify this doesn't appear in production. Ensure `indeedflex.com` domain is properly configured as primary.

### 2.6 No vercel.json Configuration
**Current state:** No `vercel.json` or `vercel.ts` exists. Platform runs entirely on defaults.
**Action:** Create `vercel.json` with:
- Cron job definitions (if needed for ISR/revalidation)
- Region configuration
- Function timeout settings
- Any redirects not handled by middleware

---

## 3. Analytics & Tracking Setup

### 3.1 GA4 Configuration (Step-by-Step)

1. **Create GA4 property** at analytics.google.com for `indeedflex.com`
2. **Get Measurement ID** (format: `G-XXXXXXXXXX`)
3. **Set environment variable:**
   - Vercel Dashboard → Project Settings → Environment Variables
   - Add `NEXT_PUBLIC_GA_MEASUREMENT_ID` = `G-XXXXXXXXXX` for Production, Preview, Development
   - Or via CLI: `vercel env add NEXT_PUBLIC_GA_MEASUREMENT_ID`
4. **Verify:** The existing gtag implementation in layout.tsx (lines 225-242) will activate automatically

**Recommended custom events to add:**
| Event | Trigger | Parameters |
|-------|---------|------------|
| `tool_usage` | User interacts with any calculator/tool | `tool_name`, `tool_action` (calculate, reset, share) |
| `cta_click` | Any CTA button click | `cta_type` (download_app, sign_up), `page_section` |
| `role_view` | Role detail page view | `role_slug`, `role_name` |
| `city_view` | City detail page view | `city_slug`, `city_name` |
| `guide_read` | Guide article scrolled >50% | `guide_slug`, `category` |
| `quiz_completion` | Tool quiz finished | `tool_name`, `score`, `time_spent` |
| `salary_calculation` | Pay calculator used | `state`, `role`, `hourly_rate` |
| `internal_link_click` | InternalLinkHub link clicked | `source_page`, `target_page`, `section` |
| `external_resource_click` | External resource link clicked | `resource_url`, `source_page` |

**Implementation:** Create a `src/lib/analytics.ts` utility that wraps `gtag()` calls with type-safe event names and parameters. Import into interactive components.

### 3.2 Google Search Console Setup

1. **Verify ownership** via HTML tag method (already scaffolded with `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` in layout.tsx)
2. **Set env var:** `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` = verification code from GSC
3. **Submit sitemaps** — the site generates 14 sitemap indexes. Submit all:
   - `https://indeedflex.com/sitemap/core.xml`
   - `https://indeedflex.com/sitemap/roles.xml`
   - `https://indeedflex.com/sitemap/cities.xml`
   - `https://indeedflex.com/sitemap/city-roles.xml`
   - `https://indeedflex.com/sitemap/tools.xml`
   - `https://indeedflex.com/sitemap/guides.xml`
   - `https://indeedflex.com/sitemap/articles.xml`
   - `https://indeedflex.com/sitemap/states.xml`
   - `https://indeedflex.com/sitemap/job-application.xml`
   - `https://indeedflex.com/sitemap/personas.xml`
   - `https://indeedflex.com/sitemap/seasonal.xml`
   - `https://indeedflex.com/sitemap/wage-report.xml`
   - `https://indeedflex.com/sitemap/career-evaluations.xml`
   - `https://indeedflex.com/sitemap/salary-by-city.xml`
4. **Request indexing** for priority pages (tools, top roles, top cities)
5. **Monitor:** Core Web Vitals report, Coverage report (check for 404s, redirect chains)

### 3.3 Vercel Analytics (Already Installed)
- `@vercel/analytics` and `@vercel/speed-insights` are in dependencies
- Both `<Analytics />` and `<SpeedInsights />` are rendered in layout.tsx (lines 222-223)
- These activate automatically on Vercel deployments — no additional config needed

### 3.4 Ongoing Tracking Dashboard
Create a shared dashboard with:
- Page views by section (tools, roles, cities, guides)
- Tool usage rates and completion rates
- CTA click-through rates
- Bounce rate by page type
- Core Web Vitals trends
- Search Console: impressions, clicks, average position by page type

---

## 4. CMS Strategy

### Current State
All content is hardcoded in TypeScript files under `src/lib/data/`. Articles are TS objects with markdown strings rendered via `react-markdown`. There are 61 data files totalling ~30,000+ lines.

### 3-Phase CMS Migration Plan

**Phase 1 (Launch → Month 1): Keep Hardcoded Data**
- Ship with current TypeScript data files
- Content updates happen via git commits and redeploys
- This is acceptable for launch since all content is pre-written
- Add a `lastUpdated` field audit to ensure all data files have accurate dates

**Phase 2 (Month 1-2): Headless CMS for Articles**
- Recommended: **Sanity** (available via Vercel Marketplace, auto-provisioned env vars)
- Migrate first: guide articles (`articles.ts` — 2,496 lines), financial tips (`financial-tips.ts` — 652 lines), job application articles (`job-application-articles.ts` — 1,250 lines)
- Keep calculator data, tax data, and role/city data in TypeScript (these are structured datasets, not editorial content)
- Set up Sanity Studio for the content team
- Use ISR (revalidate on webhook) so content updates don't require full redeploys

**Phase 3 (Month 3-6): Full Content Pipeline**
- Migrate seasonal content, testimonials, and localized content to CMS
- Build a content preview workflow (Sanity draft → Vercel preview deployment)
- Add content scheduling for seasonal hiring pages
- Integrate with the Content Loop (Section 5)
- Consider migrating role/city descriptions to CMS while keeping numerical data in TypeScript

### What Stays in TypeScript (Forever)
- Tax bracket data (`state-taxes.ts`) — needs precise numerical accuracy, better in code
- Calculator logic (`tax-engine.ts`, tool configs)
- SEO datasets, sitemap config
- Component registry, navigation config

---

## 5. Content Loop & Lifecycle

### The Cycle: Identify → Create → Review → Publish → Measure → Optimise

**Weekly:**
- Monitor Search Console for new keyword opportunities
- Check GA4 for underperforming pages (high impressions, low CTR)
- Review and respond to any indexing issues
- Update any time-sensitive content (seasonal hiring, events)

**Monthly:**
- Run `npm run audit:quality` to score all guide articles
- Run `npm run audit:pages` to check page template compliance
- Review top 10 and bottom 10 pages by traffic
- Create 2-4 new articles targeting discovered keyword gaps
- Update data freshness indicators on pages with stale data

**Quarterly:**
- Full site audit using `scripts/score-guides.ts` (wire this into package.json)
- Update wage/salary data from BLS sources
- Refresh employer listings per city
- Review and update tax bracket data (annual cycle)
- Update seasonal content calendar
- Competitive SERP analysis on core keywords

**Annually:**
- Major data refresh (all salary, tax, cost-of-living data)
- Architecture review and technical debt sprint
- SEO strategy review based on full year of Search Console data

### Content Quality Scoring
The project already has audit scripts. Standardise the process:
1. Every new article must score ≥70/100 on the quality audit before publish
2. Existing articles below 60/100 get queued for rewrite
3. Track scores over time in a spreadsheet or CMS field

---

## 6. Release Plan — Phased Rollout

Release the site section by section to manage risk, gather data, and iterate.

### Phase 0: Pre-Launch Foundations (Week 0)
- [ ] Fix all critical blockers (Section 2)
- [ ] Set up GA4 and Search Console
- [ ] Set up CI/CD pipeline (Section 14)
- [ ] Add basic smoke tests (Section 13)
- [ ] Create .env.example
- [ ] Fix missing public assets
- [ ] Run Lighthouse audit on key pages, establish baselines

### Phase 1: Calculator Tools (Week 1)
**Pages:** /career-hub/tools/* (18 tool pages)
**Why first:** Tools drive engagement, have clear user value, and generate backlinks
**Checklist:**
- [ ] Verify all calculators produce correct results
- [ ] Test on mobile (responsive layout)
- [ ] Check all tool disclaimer and data source citations
- [ ] Verify schema markup (SoftwareApplication, FAQPage)
- [ ] Submit tool pages to Search Console for indexing
- [ ] Set up tool_usage GA4 events

### Phase 2: Role Pages (Week 2)
**Pages:** /career-hub/roles/* (~20 roles), /career-hub/salary/*, /how-to-become/*, /interview-questions/*, /certifications/*
**Checklist:**
- [ ] Verify all role data accuracy (wages, descriptions)
- [ ] Check internal linking between related roles
- [ ] Verify schema markup (Occupation, FAQPage, BreadcrumbList)
- [ ] Test OG images for role pages
- [ ] Submit to Search Console

### Phase 3: City & Location Pages (Week 3-4)
**Pages:** /career-hub/cities/* (~20 cities × ~20 roles = up to 400 pages), /career-hub/locations/*
**Checklist:**
- [ ] Verify city-role intersection data quality
- [ ] Check for 404s on city-role combinations that shouldn't exist
- [ ] Verify local employer data freshness
- [ ] Test commute calculator with city-specific data
- [ ] Monitor build times (this is the largest page set)

### Phase 4: State Pages (Week 4-5)
**Pages:** /paycheck-calculator/*, /unemployment-benefits/* (50 states each)
**Checklist:**
- [ ] Verify state tax data accuracy against official sources
- [ ] Cross-check unemployment benefits data
- [ ] Verify data source citations and last-updated dates
- [ ] Test calculator accuracy for edge cases (no income tax states, etc.)

### Phase 5: Content Ecosystem (Week 5-6)
**Pages:** /career-hub/guides/*, /career-hub/financial-tips/*, /career-hub/seasonal-hiring/*, /career-hub/resume-examples/*, /career-hub/cover-letters/*, /career-hub/templates/*, /career-hub/for/*, /career-hub/wage-report/*
**Checklist:**
- [ ] Run content quality audit on all articles
- [ ] Verify all internal links resolve
- [ ] Check external resource links are not broken
- [ ] Verify FAQ schema on all pages that have FAQs
- [ ] Final full-site Lighthouse audit
- [ ] Submit complete sitemap set to Search Console

### Phase 6: Post-Launch Optimisation (Week 7+)
- Monitor Search Console for crawl errors
- A/B test CTA placements
- Optimise pages with high impressions but low CTR
- Begin CMS migration (Phase 2 from Section 4)

---

## 7. Component Architecture Refactoring

### 7.1 Mega-Components to Split

| Component | Lines | File | Refactoring Plan |
|-----------|------:|------|-----------------|
| PaycheckCalculatorClient | 1,932 | `src/app/career-hub/tools/paycheck-calculator/PaycheckCalculatorClient.tsx` | Extract: InputForm, ResultsDisplay, TaxBreakdownTable, StateSelector, DeductionsPanel. Move tax calculation to a custom hook `usePaycheckCalculation`. |
| InternalLinkHub | 1,140 | `src/components/career-hub/navigation/InternalLinkHub.tsx` | Split by section type: RoleLinks, CityLinks, ToolLinks, GuideLinks, SeasonalLinks. Create a factory pattern with a config-driven renderer. |
| EnhancedSchema | 883 | `src/components/career-hub/seo/EnhancedSchema.tsx` | Split by schema type: OrganizationSchema, ArticleSchema, FAQSchema, BreadcrumbSchema, ToolSchema, etc. Each returns its own `<script type="application/ld+json">`. |
| Header | 583 | `src/components/career-hub/Header.tsx` | Extract: DesktopNav, MobileNav, MegaMenu, SearchBar. Replace 53 inline styles with Tailwind classes. Current inline styles use hardcoded `rgb()` values — map to design tokens. |
| CocktailQuizClient | 783 | `src/app/career-hub/tools/cocktail-quiz/CocktailQuizClient.tsx` | Extract: QuizQuestion, QuizResult, ProgressBar, AnswerOption. |
| StatePaycheckClient | 777 | `src/app/paycheck-calculator/[stateSlug]/StatePaycheckClient.tsx` | Similar to PaycheckCalculatorClient — share common calculator components. |
| MenuMasterClient | 752 | `src/app/career-hub/tools/menu-master/MenuMasterClient.tsx` | Extract: TermCard, CategoryFilter, ProgressTracker, FlashcardMode (already partially extracted). |

### 7.2 Unnecessary Client Components
These files have `"use client"` but may not need it:
- `InsightCard.tsx` — purely presentational (no useState, useEffect, or browser APIs). Remove directive.
- `PageHero.tsx` — only needs client when `onSearch` prop is used. Split into ServerHero + ClientSearchForm.

### 7.3 Duplicate Toast System
**Current state:** Two toast systems are installed and configured:
1. **Sonner** (`sonner` package) — imported in `providers.tsx`, rendered as `<Toaster />`
2. **Radix Toast** (`@radix-ui/react-toast`) — `src/components/ui/toast.tsx` + `src/components/ui/toaster.tsx` + `src/hooks/use-toast.ts`

**Usage:** Only `CopyButton.tsx` imports from Sonner (via `sonner`). The Radix toast hook (`use-toast.ts`) and Radix `Toaster` component exist but are NOT imported by any application code.
**Action:** Remove Radix toast files (`toast.tsx`, `toaster.tsx`, `use-toast.ts`), keep Sonner. One toast system.

### 7.4 Re-export Indirection
~48 single-line `.ts` re-export files exist at `src/components/career-hub/*.ts` (e.g. `FAQSection.ts` re-exports from `content/FAQSection`), plus barrel files in each subfolder.
**Problem:** Two valid import paths for the same component, making imports inconsistent.
**Action:** Pick one convention. Recommend removing the flat re-exports and importing from subfolders directly (e.g. `@/components/career-hub/content/FAQSection`). Or keep barrels only and remove individual re-exports.

---

## 8. Data Layer Issues

### 8.1 Naming Collisions (High Priority)
Three different interfaces named `DataSource`:
- `src/lib/data/tool-registry.ts` (line 47)
- `src/lib/data/tax-sources.ts` (line 15)
- `src/lib/data/data-sources.ts` (line 10)

**Action:** Rename to `ToolDataSource`, `TaxCitationSource`, `ContentDataSource`.

Two different interfaces named `RoleComparison`:
- `src/lib/data/role-comparisons.ts` (lines 4-8) — SEO comparison pairs
- `src/lib/data/role-content.ts` (lines 222-234) — detailed comparison data

**Action:** Rename to `RoleComparisonPair` and `DetailedRoleComparison`.

Two different interfaces named `LocalEmployer`:
- `src/lib/data/articles/seasonal-location-data.ts` (lines 8-15)
- `src/lib/data/local-employers.ts` (lines 17-43)

**Action:** Consolidate into one interface or rename.

### 8.2 Client-Side Data Bloat (High Priority)
These client components import large data modules that ship entirely to the browser:

| Client Component | Data Import | Approx Size |
|-----------------|-------------|-------------|
| PaycheckCalculatorClient | state-taxes.ts | 1,603 lines |
| RolesClient | roles.ts + how-to-become + interview-questions + resume-examples | ~5,000+ lines combined |
| CitiesClient | cities/data.ts | 2,419 lines |
| SkillsAssessment | skill-recommendations.ts | 1,400 lines |
| UnemploymentCalculatorClient | unemployment-benefits.ts | 1,312 lines |
| SafetyFirstClient | safety-scenarios.ts | 1,837 lines |

**Action:**
1. For list/filter pages (RolesClient, CitiesClient): Move filtering to server. Pass only the filtered/paginated subset as serialised props. Consider API route for search.
2. For calculators: Pass only the relevant state's tax data from the server page, not all 50 states. Create a `getStateTaxData(slug)` helper.
3. For tools (Safety, Menu Master, Cocktail Quiz): Consider loading scenario data lazily as needed (fetch from API route or use dynamic import with specific chunks).

### 8.3 Duplicate Tax Logic
- `src/lib/calculators/tax-engine.ts` (667 lines) — the canonical tax calculation engine
- `src/components/career-hub/content/EarningsBreakdown.tsx` (lines 23-29) — a separate `estimateTaxes()` function with hardcoded "rough" brackets

**Action:** Remove the local `estimateTaxes()` and use the canonical `tax-engine` for consistency.

### 8.4 Geographic Data Not Single-Sourced
City/location data is spread across:
- `cities/data.ts` — canonical city records
- `locations.ts` — separate `usLocations`/`ukLocations` for /locations pages
- `salary-by-location.ts` — city wages for pSEO pages
- `location-role-data.ts` — city salary multipliers
- `local-employers.ts` — employer listings per city
- `seasonal-location-data.ts` — seasonal location data
- `commute-costs.ts` — city commute data
- `city-neighborhoods.ts` — neighbourhood descriptions

**Action:** Create a `City` canonical type that all modules reference. City-specific data should be keyed by city slug and importable from a single module or set of clearly layered modules.

### 8.5 Documentation vs Code Drift
`docs/DATA.md` describes a `City` interface with fields that don't match `cities/types.ts`.
**Action:** Regenerate DATA.md from actual TypeScript interfaces, or keep a script that validates docs match code.

---

## 9. Performance Optimisation

### 9.1 Recharts Bundle Size (~200KB)
**Current state:** Recharts is imported eagerly (static `import from "recharts"`) in:
- `YoYComparisonChart.tsx` (line 5)
- `WageDistributionChart.tsx` (line 5)
- `SalaryComparison.tsx` (line 5)

`DynamicCalculator.tsx` uses `next/dynamic` for lazy loading, but `SalaryComparison` is also directly imported by `RolePageClient`, bypassing the lazy loading.

**Action:**
1. Ensure all Recharts components are loaded via `next/dynamic` with `{ ssr: false }`
2. Remove direct imports of Recharts components from page-level client components
3. Add loading skeletons for chart placeholders

### 9.2 Missing Dynamic Imports
Only 5 `dynamic()` calls exist in the entire codebase (all in `DynamicCalculator.tsx`).
**Action:** Add dynamic imports for:
- All chart components (Recharts)
- Heavy interactive tools (CocktailQuiz, MenuMaster, SafetyFirst, WorkTalk)
- SkillsAssessment and SkillRecommendationCard
- Any component >300 lines that's below the fold

### 9.3 Missing useMemo in Calculators
While some calculators use `useMemo`, several heavy computations may not be memoised.
**Action:** Audit all calculator client components and ensure expensive calculations (tax computation, salary conversion) are wrapped in `useMemo` with proper dependency arrays.

### 9.4 Image Optimisation
- `next/image` is only used in Header.tsx and Footer.tsx (logo)
- All other image-like content is either text-based or OG images (which correctly use `ImageResponse`)
- No article hero images or content images exist yet
**Action:** When images are added (via CMS or otherwise), ensure they always use `next/image`. The next.config already has proper AVIF/WebP and caching configuration.

### 9.5 Build Time Monitoring
With 308+ statically generated pages and `generateStaticParams` on 25 dynamic routes, build times will grow.
**Current state:** Fully SSG (no ISR or dynamic rendering configured, except one `dynamicParams = false` on city-role pages).
**Action:**
- Establish a build time baseline now
- When builds exceed 5 minutes, migrate lowest-traffic pages to ISR (`export const revalidate = 86400` for daily refresh)
- City-role intersection pages (up to 400) are the first candidates for ISR

---

## 10. CSS & Design System Cleanup

### 10.1 Inline Styles (84 occurrences)
- **53 in Header.tsx** — hardcoded `rgb()` values, pixel dimensions, transitions
- 9 in ResumePreview.tsx
- The rest in OG images (acceptable) and a few other components

**Action:** Map all Header inline styles to Tailwind utilities or CSS custom properties. The Header alone accounts for 63% of all inline styles.

### 10.2 !important Usage (6 occurrences)
All in `globals.css` (lines 136, 141, 147, 148, 149):
- `.sub-nav-link-hover:hover` color override
- `.download-btn-hover:hover` background override
- Responsive button padding/font overrides

**Action:** Refactor these to use Tailwind utilities with proper specificity instead of `!important`.

### 10.3 Hardcoded Colors
- Header.tsx: `#fff`, `#ffffff`, plus ~30 `rgb()`/`rgba()` values
- globals.css: `rgb(221, 0, 169)`, `rgb(181, 4, 139)` (brand pink variants)
- Various HSL values in globals.css gradients

**Action:**
1. Add all brand colours to `tailwind.config.ts` as named tokens (e.g. `flex-pink`, `flex-pink-hover`, `flex-blue`)
2. Replace hardcoded values in Header with Tailwind classes
3. Replace globals.css `rgb()` with `hsl()` variables matching the existing design system

### 10.4 ThemeProvider Overhead
`providers.tsx` wraps the entire app in `next-themes` ThemeProvider but forces light mode (`forcedTheme="light"`, `enableSystem={false}`).
**Action:** If dark mode is not planned, remove `next-themes` dependency entirely to save bundle size. Replace with a simple provider that only wraps `TooltipProvider` and `Toaster`.

---

## 11. Accessibility

### 11.1 Good Practices Already in Place
- 63 `aria-*` attributes across 19 files
- `sr-only` classes used in 10 files for screen reader text
- `role` attributes on semantic elements (pagination, carousels, breadcrumbs)
- shadcn/ui components come with built-in accessibility (Radix primitives)

### 11.2 Gaps to Address

**Keyboard Navigation:**
- Header mega menu: No `onKeyDown` handlers found for keyboard navigation between menu items
- Interactive tools (quiz, flashcards): Need keyboard support for navigation between options
**Action:** Add arrow key navigation to mega menu, Enter/Space for interactive tool controls.

**Focus Management:**
- No custom focus indicator styles in `tailwind.config.ts`
- shadcn components use `focus-visible:ring-*` which is good, but custom components may not
**Action:** Audit all interactive custom components (non-shadcn) for `focus-visible` styles.

**Colour Contrast:**
- Brand pink (#dd01aa / rgb(221,0,169)) on white background needs contrast ratio verification
- Ensure all text meets WCAG 2.1 AA (4.5:1 for body text, 3:1 for large text)
**Action:** Run automated contrast checks. The pink may need a darker variant for text usage.

**Images:**
- Only 3 images exist (logos in Header/Footer) and all have `alt` text
- When content images are added, enforce `alt` text via ESLint rule (`jsx-a11y/alt-text`)

**Forms:**
- Calculator forms should be audited for proper label associations
- Error messages should be linked via `aria-describedby`

---

## 12. Security Review

### 12.1 CSP Issues (High Priority)
**File:** `src/middleware.ts` (lines 113-123)

Current CSP allows:
- `script-src 'unsafe-inline' 'unsafe-eval'` — allows arbitrary script injection and eval
- `style-src 'unsafe-inline'` — allows arbitrary style injection

**Action (Phase 1 — Launch):**
- Keep `unsafe-inline` for styles (required for Tailwind and inline styles in Header)
- Keep `unsafe-inline` for scripts (required for GA4 gtag inline script)
- Remove `unsafe-eval` — verify no code uses `eval()`. If Recharts or other deps need it, investigate alternatives.

**Action (Phase 2 — Post-Launch):**
- Migrate GA4 to `next/script` with nonce-based CSP
- Replace inline styles with Tailwind classes (enables removing style `unsafe-inline`)
- Add nonce-based script execution: generate nonce per request in middleware, pass to layout

### 12.2 dangerouslySetInnerHTML (35 occurrences across 18 files)
**Acceptable uses:** JSON-LD schema injection (EnhancedSchema.tsx, JsonLd.tsx, Breadcrumbs.tsx, Footer.tsx, AuthorByline.tsx, layout.tsx) — these stringify trusted TS objects.
**Review needed:**
- Resume examples, cover letters, templates pages — if content is from TypeScript constants (trusted), this is acceptable. If it will come from CMS in the future, sanitise with DOMPurify.
- FAQSection.tsx — renders FAQ answers. Verify these are trusted strings.

### 12.3 Root .env File
A `.env` file exists at the repository root. Root `.gitignore` does NOT include `.env`.
**Action:** Either add `.env` to root `.gitignore` or remove the file if secrets are in it. Use `nextjs-app/.env.local` (which IS gitignored) for local secrets.

---

## 13. Testing Strategy

### Current State: Zero Tests
No test framework (Jest, Vitest, Playwright, Cypress) in dependencies. No test files. No CI.

### Recommended Testing Stack

**Unit Tests (Jest + React Testing Library):**
- Tax engine calculations (`tax-engine.ts`) — critical for accuracy
- Data helper functions (getCityBySlug, salary calculations, etc.)
- Sitemap generation logic
- Utility functions

**Component Tests (Jest + RTL):**
- Calculator input/output validation
- FAQ section rendering
- Breadcrumb generation
- Schema markup output verification

**Integration / E2E Tests (Playwright):**
- Calculator flows: input values → verify results match expected
- Navigation: mega menu → role page → tool → back
- Search: QuickSearch component functionality
- Tool completion flows (quiz, flashcards, planner)
- Mobile responsive layout

**Data Integrity Tests:**
- All role slugs in `roles.ts` have matching routes
- All city slugs in `cities/data.ts` have matching routes
- All sitemap URLs return 200
- No broken internal links
- Tax data matches expected format (no NaN, no missing states)

### Implementation Priority
1. Tax engine unit tests (financial accuracy is critical)
2. Data integrity tests (catch broken routes before deploy)
3. Calculator E2E tests (user-facing accuracy)
4. Smoke tests for all page routes (200 status)

---

## 14. CI/CD Pipeline

### Current State
- No `.github/workflows/` directory
- No CI configuration of any kind
- Deploys presumably happen via Vercel git integration on push

### Recommended GitHub Actions Pipeline

**PR Checks (`.github/workflows/ci.yml`):**
```
On pull_request:
  1. Install dependencies (npm ci)
  2. TypeScript check (tsc --noEmit)
  3. ESLint (next lint)
  4. Unit tests (jest --ci)
  5. Build (next build) — catches SSG errors
  6. Lighthouse CI on preview deployment (optional, post-deploy)
```

**Production Deploy (`.github/workflows/deploy.yml`):**
```
On push to main:
  1. All PR checks
  2. E2E tests against preview deployment (Playwright)
  3. Auto-promote to production if all pass
  4. Post-deploy smoke test (hit key URLs, verify 200)
```

**Scheduled Jobs (`.github/workflows/scheduled.yml`):**
```
Weekly (cron):
  1. Run data integrity tests
  2. Check external links for 404s
  3. Run content quality audit
  4. Alert on failures via Slack/email
```

### Immediate Actions
1. Create `.github/workflows/ci.yml` with lint + type check + build
2. Add `npm run test` script to package.json (even if it's a no-op initially)
3. Set up branch protection on `main` requiring CI pass

---

## 15. SEO Audit

### 15.1 Strengths (Already in Place)
- Comprehensive sitemap generation (14 indexes covering all page types)
- Proper robots.ts with bot-specific crawl delays
- JSON-LD structured data on most page types (Organization, Article, FAQ, BreadcrumbList, SoftwareApplication, Occupation)
- Dynamic OG images for roles and guides
- Canonical URL handling in metadata
- Internal linking via InternalLinkHub component
- ContextualLink component for inline keyword-to-page linking
- AuthorByline with schema.org Person markup
- ContentFreshness indicators with dateModified schema
- Data source citations (DataSourceCitation component)

### 15.2 SEO Issues to Fix

**Missing meta descriptions:** Audit all pages to ensure every page has a unique meta description. Run `npm run audit:pages` to check.

**OG images:** Only 3 routes have dynamic OG images (hub root, guides, roles). Add OG images for:
- City pages
- Tool pages
- State pages (paycheck calculator, unemployment)
- Financial tips
- Seasonal hiring

**Heading hierarchy:** Verify every page has exactly one H1 and proper H2-H6 nesting. The audit script checks this — run it.

**Internal linking depth:** Pages should be reachable in ≤3 clicks from the hub root. Verify with a crawl tool.

**Page speed:** Run Lighthouse on representative pages from each section. Largest Contentful Paint and Cumulative Layout Shift are the key metrics for SEO.

**URL structure:** Current structure is clean (`/career-hub/roles/[slug]`, `/career-hub/cities/[slug]`). Ensure no orphan pages exist outside the `/career-hub/` prefix that should be inside it.

### 15.3 AEO (Answer Engine Optimisation)
The codebase already has AEO considerations documented in BRAND.md and SEO.md. Key actions:
- Ensure FAQ sections use the `FAQPage` schema (already implemented in FAQSection.tsx)
- Structure content in question-answer format where appropriate
- Use definition lists and concise answer paragraphs
- Keep key statistics and data points in easily extractable formats

---

## 16. Documentation Cleanup

### 16.1 Broken Links and Stale References
| Issue | Fix |
|-------|-----|
| BRAND.md links to `./RESEARCH_PIPELINE.md` — file is in `archive/` | Update link to `./archive/RESEARCH_PIPELINE.md` |
| nextjs-app/README.md lists `CONTENT_REVIEW_CHECKLIST.md` and `CONTENT_AUDIT.md` at `docs/` root — both are in `archive/` | Update paths or remove from table |
| Root README promises a "Deployment guide" in nextjs-app README — doesn't exist | Add deployment section to nextjs-app/README.md |
| CONTRIBUTING.md references `.env.example` — file doesn't exist | Create `.env.example` |
| ARCHITECTURE.md references `@/integrations/supabase/client` — doesn't exist in nextjs-app | Remove or update Supabase reference |

### 16.2 CHANGELOG is From a Different Project
`CHANGELOG.md` references Vite, React Router, TanStack Query, and Lovable Cloud — technologies not used in the current Next.js app. This appears to be from an earlier version of the project.
**Action:** Rewrite CHANGELOG to reflect the actual Next.js codebase history.

### 16.3 Missing Documentation
- **Deployment guide:** How to deploy, preview environments, domain setup
- **Engineering maintenance runbook:** Scripts, schedules, alert thresholds
- **Environment variables guide:** All required/optional env vars with descriptions
- **API/data refresh guide:** How to update salary, tax, and employment data

### 16.4 Documentation That Needs Updating
- **DATA.md:** City interface doesn't match `cities/types.ts`
- **ARCHITECTURE.md:** Remove Supabase client references, add current architecture patterns
- Wire `score-guides.ts` into package.json scripts (currently undiscoverable)

---

## 17. Dead Code & Unused Dependencies

### 17.1 Confirmed Dead Code
| Item | Files | Action |
|------|-------|--------|
| Radix Toast system | `src/components/ui/toast.tsx`, `src/components/ui/toaster.tsx`, `src/hooks/use-toast.ts` | Delete. Sonner is the active toast system. |
| ThemeProvider (forces light mode) | `next-themes` package + providers.tsx wrapping | Remove `next-themes` if dark mode is not planned. Simplify providers.tsx. |
| Sidebar component | `src/components/ui/sidebar.tsx` (637 lines) | Verify if used anywhere. If not, remove. |

### 17.2 Potentially Unused shadcn/ui Components
46 shadcn primitives are installed. Audit which are actually imported by application code:
- `input-otp.tsx` — only used if OTP flows exist
- `menubar.tsx` — 207 lines, may not be used
- `context-menu.tsx` — 178 lines, may not be used
- `hover-card.tsx` — may not be used
- `aspect-ratio.tsx` — may not be used

**Action:** Run `grep -r` for each component name across `src/app/` and `src/components/career-hub/` to find actual usage. Remove unused components to reduce complexity.

### 17.3 Supabase Integration
- `supabase/` folder exists at repo root with migrations and edge functions
- Zero Supabase imports in `nextjs-app/src/`
- No Supabase packages in `nextjs-app/package.json`
**Status:** Supabase appears to be used for backend/research functions only (Firecrawl, Perplexity, SEMrush, Search Console), not for the public-facing site. Document this clearly.

### 17.4 Unused Package Candidates
Review these dependencies for actual usage:
- `input-otp` — only if OTP UI exists
- `react-day-picker` — only if date pickers are used
- `cmdk` — only if command palette exists
- `vaul` — only if drawer component is used
- `embla-carousel-react` — only if carousels are used

---

## 18. Scaling Path

### Current Scale: ~308 pages (fully SSG)

### Path to 1,000+ Pages

**Phase 1 (Current → 500 pages):**
- Continue with SSG
- Monitor build times (target: under 3 minutes)
- Optimise `generateStaticParams` to avoid redundant data loading

**Phase 2 (500 → 1,000 pages):**
- Migrate low-traffic pages to ISR with daily revalidation
- Keep high-traffic pages (tools, top roles, top cities) as SSG
- Implement `export const revalidate = 86400` on:
  - City-role intersection pages
  - Salary-by-city pages
  - Less popular role pages

**Phase 3 (1,000+ pages):**
- Consider on-demand ISR with `revalidatePath()` / `revalidateTag()` via webhook
- Move article content to CMS with webhook-triggered revalidation
- Use `dynamicParams = true` with ISR for new content without rebuilds
- Consider edge caching for calculator API routes

### Data Scaling
- Tax data updates: Script to pull from official sources and generate `state-taxes.ts`
- Wage data: Automate BLS data ingestion
- City expansion: Template for adding new cities with required data structure
- Role expansion: Template for adding new roles with all associated data

### Infrastructure Scaling
- **Vercel Hobby → Pro plan** required for production (custom domains, analytics, more functions)
- **Build cache:** Enable remote caching if monorepo grows
- **Edge functions:** Consider for calculators if response time matters
- **CDN caching:** Already configured in next.config.mjs with 30-day image cache

---

## 19. Maintenance Runbook

### Weekly Tasks
- [ ] Check Search Console for crawl errors and indexing issues
- [ ] Review GA4 for traffic anomalies
- [ ] Monitor Vercel deployment logs for errors
- [ ] Update any time-sensitive content (seasonal hiring, events)

### Monthly Tasks
- [ ] Run `npm run audit:pages` — check for template compliance
- [ ] Run `npm run audit:quality` — score all guide articles
- [ ] Review and update external resource links (check for 404s)
- [ ] Update data freshness indicators where needed
- [ ] Review Lighthouse scores on 5 representative pages

### Quarterly Tasks
- [ ] Full content quality audit with `npx tsx scripts/score-guides.ts`
- [ ] Update wage/salary data from BLS
- [ ] Refresh employer listings per city
- [ ] Review and update tax bracket data if needed
- [ ] Competitive analysis: check SERP rankings for top keywords
- [ ] Dependency updates: `npm outdated`, upgrade minor/patch versions
- [ ] Review and clean up any dead code or unused components

### Annual Tasks
- [ ] Major data refresh (all salary, tax, cost-of-living data)
- [ ] Review Next.js version and upgrade path
- [ ] Full architecture review and technical debt assessment
- [ ] SEO strategy review based on full year of data
- [ ] Accessibility audit (WCAG 2.1 AA compliance check)

### Alert Thresholds
| Metric | Warning | Critical |
|--------|---------|----------|
| Build time | > 3 minutes | > 5 minutes |
| Lighthouse Performance | < 80 | < 60 |
| Lighthouse Accessibility | < 90 | < 80 |
| Core Web Vitals (LCP) | > 2.5s | > 4.0s |
| Core Web Vitals (CLS) | > 0.1 | > 0.25 |
| Pages returning 404 | > 5 | > 20 |
| ESLint warnings | > 50 | > 100 |

---

## 20. Priority Matrix

### P0 — Must Fix Before Launch (Week 0)
1. Add favicon.ico, apple-touch-icon.png, og-image.png to public/
2. Set up GA4 (`NEXT_PUBLIC_GA_MEASUREMENT_ID`)
3. Set up Search Console verification (`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`)
4. Create `.env.example` with all required variables
5. Add `.env` to root `.gitignore` (prevent secret leakage)
6. Remove `unsafe-eval` from CSP (verify nothing breaks)
7. Create basic CI workflow (lint + type check + build)

### P1 — Fix in First 2 Weeks Post-Launch
1. Refactor Header.tsx: replace 53 inline styles with Tailwind
2. Remove dead toast system (Radix toast files)
3. Remove `next-themes` if dark mode not planned
4. Fix data naming collisions (DataSource ×3, RoleComparison ×2, LocalEmployer ×2)
5. Lazy-load Recharts via `next/dynamic`
6. Add OG images for city, tool, and state pages
7. Fix broken documentation links
8. Add tax engine unit tests
9. Add data integrity tests (all slugs have routes)

### P2 — Fix in First Month
1. Split mega-components (PaycheckCalculatorClient, InternalLinkHub, EnhancedSchema)
2. Reduce client-side data bloat (server-side filtering for roles/cities lists)
3. Add E2E tests for calculator flows
4. Add keyboard navigation to mega menu
5. Audit and remove unused shadcn components
6. Rewrite CHANGELOG.md
7. Add deployment documentation
8. Set up GA4 custom events
9. Audit colour contrast for brand pink

### P3 — Fix in First Quarter
1. Begin CMS migration (Phase 2: articles to Sanity)
2. Set up content preview workflow
3. Implement ISR for low-traffic pages if build times exceed target
4. Add nonce-based CSP (remove unsafe-inline for scripts)
5. Full accessibility audit and remediation
6. Create automated external link checker
7. Consolidate geographic data into canonical sources

### P4 — Ongoing Optimisation
1. Complete CMS migration (Phase 3)
2. Scale to 1,000+ pages with ISR strategy
3. Automate data refresh pipelines
4. A/B test CTA placements
5. Build real-time analytics dashboard
6. Consider i18n for UK market

---

## Appendix A: File Size Reference (Largest Files)

| Lines | File | Category |
|------:|------|----------|
| 2,496 | `src/lib/data/articles/guides/articles.ts` | Content data |
| 2,419 | `src/lib/data/cities/data.ts` | Geographic data |
| 1,932 | `src/app/.../PaycheckCalculatorClient.tsx` | Component |
| 1,837 | `src/lib/data/safety-scenarios.ts` | Tool data |
| 1,833 | `src/lib/data/roles.ts` | Core data |
| 1,603 | `src/lib/data/state-taxes.ts` | Financial data |
| 1,400 | `src/lib/data/skill-recommendations.ts` | Tool data |
| 1,326 | `src/lib/data/how-to-become/hospitality-guides.ts` | Content data |
| 1,312 | `src/lib/data/unemployment-benefits.ts` | Financial data |
| 1,250 | `src/lib/data/articles/job-application-articles.ts` | Content data |
| 1,140 | `src/components/.../InternalLinkHub.tsx` | Component |
| 1,108 | `src/lib/data/resume-examples.ts` | Content data |
| 1,105 | `src/lib/data/state-tax-content.ts` | SEO data |

## Appendix B: Environment Variables Required

| Variable | Purpose | Required For |
|----------|---------|-------------|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 tracking | Analytics |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Search Console verification | SEO |

## Appendix C: Key Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 14.2.35 | Framework |
| React | 18.3.1 | UI library |
| TypeScript | 5.x | Language |
| Tailwind CSS | 3.4.1 | Styling |
| Recharts | 3.7.0 | Charts/data viz |
| Radix UI | Various | Accessible primitives |
| Sonner | 2.0.7 | Toast notifications |
| react-markdown | 10.1.0 | Markdown rendering |
| Fuse.js | 7.0.0 | Client-side search |
| Zod | 4.3.6 | Schema validation |
| @vercel/analytics | 1.3.1 | Vercel analytics |
| @vercel/speed-insights | 1.1.0 | Core Web Vitals |
