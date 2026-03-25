# Career Hub — Full Site Audit

**Date:** 2026-03-24  
**Scope:** Full site — all page types, tools, articles, and infrastructure  
**Method:** Automated code analysis via content-loop (audit mode) / site-growth skill  

---

## 8-Category Scorecard

| # | Category | Score | Grade | Key Issue |
|---|----------|:-----:|:-----:|-----------|
| 1 | **Technical SEO** | **7 / 10** | B | 8 dynamic `[year]` routes missing `generateStaticParams`; 6 pages missing canonicals |
| 2 | **Schema Markup** | **7 / 10** | B | Industry pages have no JSON-LD; `speakable` not wired; tool pages missing `BreadcrumbSchema` |
| 3 | **AI Visibility** | **7 / 10** | B | `speakable` absent from article schema output; some guides lack answer-first intros; source citation format inconsistent |
| 4 | **Internal Linking** | **6 / 10** | C+ | 3 guides have broken cross-pillar `relatedArticles`; 19 routes missing `InternalLinkHub`; cities hub caps at 12 |
| 5 | **pSEO Quality** | **8 / 10** | B+ | Strong per-entity data; neighborhood/employer coverage sparse for most cities; `statePageContent` unused on paycheck pages |
| 6 | **Freshness** | **9 / 10** | A | All articles within 6-month window; city/location/how-to data lacks `lastReviewed` fields |
| 7 | **Tool Performance** | **6 / 10** | C+ | Only 5 of 21 tools in registry; duplicate FAQ JSON-LD on 2+ tools; 11 tools have zero article deep-links |
| 8 | **Lead Magnets** | **7 / 10** | B | Tools ungated (good); CTAs are generic app-download, not contextual to tool output; duplicate CTAs on many pages |
| | **Overall** | **57 / 80** | **B** | |

---

## Top 3 Priorities

1. **Fix `generateStaticParams` on all wage-report `[year]` routes** — 8 dynamic routes are server-rendered on demand, hurting TTFB and crawlability. High severity.
2. **Deduplicate FAQ JSON-LD and CTAs on tool pages** — pay-calculator, tax-calculator, cost-of-living, cocktail-quiz, and shift-planner emit duplicate structured data and/or duplicate CTA blocks. Harms CWV and confuses crawlers.
3. **Close the article → tool deep-link gaps** — 11 tools (`take-home-pay`, `salary-converter`, `benefits-checker`, `unemployment-calculator`, `commute-calculator`, `cost-of-living`, `childcare-calculator`, `w2-vs-1099`, `worktalk`, `data-verification`, `paycheck-calculator`) have zero inbound links from article data files.

---

## 1. Technical SEO — 7/10

### 1A. Metadata & Canonicals

| Page / File | Issue | Severity | Fix |
|-------------|-------|:--------:|-----|
| `src/app/career-hub/experience/entry-level/page.tsx` | Static metadata, no `alternates.canonical` | Medium | Add `alternates: { canonical: "…/career-hub/experience/entry-level" }` |
| `src/app/unemployment-benefits/page.tsx` | No canonical | Medium | Add canonical URL |
| `src/app/career-hub/resume-examples/page.tsx` | No canonical | Medium | Add canonical URL |
| `src/app/career-hub/cover-letters/page.tsx` | No canonical | Medium | Add canonical URL |
| `src/app/career-hub/schedule/[type]/page.tsx` | `generateMetadata` returns no canonical | Medium | Add per-slug canonical |
| `src/app/career-hub/pay-range/[range]/page.tsx` | `generateMetadata` returns no canonical | Medium | Add per-range canonical |
| `src/app/page.tsx` (root) | No metadata export (redirects to `/career-hub`) | Low | Acceptable if 308 redirect is permanent |

**Note:** Role, city, salary, and tool pages use `generateSEOMetadata` which sets `alternates.canonical` — these are covered.

### 1B. `generateStaticParams`

| Route | Status | Severity |
|-------|--------|:--------:|
| `career-hub/wage-report/[year]/page.tsx` | **Missing** | High |
| `career-hub/wage-report/[year]/trends/page.tsx` | **Missing** | High |
| `career-hub/wage-report/[year]/methodology/page.tsx` | **Missing** | High |
| `career-hub/wage-report/[year]/by-industry/page.tsx` | **Missing** | High |
| `career-hub/wage-report/[year]/by-region/page.tsx` | **Missing** | High |
| `career-hub/wage-report/[year]/by-occupation/page.tsx` | **Missing** | High |
| `career-hub/wage-report/[year]/by-region/[regionSlug]/page.tsx` | **Missing** | High |
| `career-hub/wage-report/[year]/by-occupation/[roleSlug]/page.tsx` | **Missing** | High |
| All other dynamic routes (roles, cities, states, personas, etc.) | Present | — |

### 1C. Sitemap

- Multi-sitemap via `generateSitemaps()` with 14 chunks: `core`, `roles`, `cities`, `city-roles`, `tools`, `guides`, `articles`, `states`, `job-application`, `personas`, `seasonal`, `wage-report`, `career-evaluations`, `salary-by-city`.
- **Gap:** `/career-hub/wage-report/{year}/trends` is not in any sitemap chunk.
- **Low risk:** Verify unemployment-benefits index, resume-examples index, and cover-letters index appear in `core` or another chunk.

### 1D. Robots

- `userAgent: "*"` allows `/`, disallows `/api/`, `/_next/`, `/private/`, `/admin/` — correct.
- AI crawlers (`OAI-SearchBot`, `PerplexityBot`, `ClaudeBot`, `GoogleOther`) explicitly allowed with `/api/`, `/_next/`, `/private/` disallowed.
- **Minor:** `GPTBot` and `Google-Extended` not explicitly named (fall through to `*` allow — functional but not explicit).
- No accidental `noindex` found on marketing pages. `noindex` is only applied via `generateSEOMetadata({ noindex: true })`.

---

## 2. Schema Markup — 7/10

### Coverage by Page Type

| Page Type | Required Schemas | Actual | Status |
|-----------|-----------------|--------|:------:|
| Guides / financial articles | Article, FAQ, Breadcrumb | Article + FAQ + Breadcrumb | ✅ |
| Role pages | JobPosting, Occupation, FAQ, Breadcrumb | JobPosting + Occupation + FAQ + WebPage + Breadcrumb | ✅ |
| City pages | LocalBusiness, Breadcrumb | WebPage + Breadcrumb + FAQ | ⚠️ No LocalBusiness |
| City × Role pages | JobPosting, Occupation, Breadcrumb | JobPosting + Occupation + FAQ + Breadcrumb + LocalBusiness + WebPage | ✅ |
| Tool pages | SoftwareApplication, FAQ, Breadcrumb | SoftwareApplication + FAQ | ⚠️ No Breadcrumb |
| Persona hubs | WebPage, FAQ, Breadcrumb | Inline WebPage + FAQPage (nested) | ⚠️ No standalone Breadcrumb |
| State pages | WebPage, FAQ, Breadcrumb | WebPage + FAQ + Breadcrumb | ✅ |
| **Industry pages** | WebPage, Breadcrumb (minimum) | **None** | ❌ No JSON-LD |

### Specific Issues

| Issue | Severity | Fix |
|-------|:--------:|-----|
| Industry pages (`industries/[industryId]/page.tsx`) have no structured data | High | Add WebPage + Breadcrumb + FAQ schemas |
| `speakable` property supported in `ArticleSchema` but never passed from guide/financial pages | Medium | Pass `cssSelector` values for hero summary and key takeaways |
| Tool pages missing `BreadcrumbSchema` | Medium | Add Breadcrumb JSON-LD alongside SoftwareApplication |
| City pages missing `LocalBusinessSchema` | Medium | Add LocalBusiness with geo data, or align internal docs to "WebPage only" |
| Persona hubs use inline JSON-LD instead of shared schema components | Medium | Migrate to `WebPageSchema` + `FAQSchema` + `BreadcrumbSchema` for consistency |
| `ArticleSchema` `datePublished` falls back to `2024-01-15` when article field is missing | Low | Ensure all articles have explicit date fields |
| Duplicate FAQ JSON-LD on `pay-calculator` (page + client both emit) | High | Keep one FAQ source; remove duplicate |
| Duplicate FAQ JSON-LD on `tax-calculator` (page + client both emit) | High | Use `suppressSchema` on client FAQs |

---

## 3. AI Visibility — 7/10

### AI Crawler Access

| Bot | Status |
|-----|:------:|
| OAI-SearchBot | ✅ Explicitly allowed |
| PerplexityBot | ✅ Explicitly allowed |
| ClaudeBot | ✅ Explicitly allowed |
| GoogleOther | ✅ Explicitly allowed |
| GPTBot | ⚠️ Falls through to `*` (allowed, but not explicit) |
| Google-Extended | ⚠️ Falls through to `*` (allowed, but not explicit) |

### Content Extractability (Spot-Check: 3 Guide Articles)

| Article | Answer-First Intro? | Self-Contained Sections? | Inline Sources? | FAQ (≥4 Qs)? | AuthorByline? | Score |
|---------|:-------------------:|:------------------------:|:---------------:|:------------:|:-------------:|:-----:|
| `complete-guide` | ✅ Strong | ✅ | ✅ | ✅ | ✅ | 88 |
| `work-without-ssn` | ✅ Strong | ✅ | Partial | ✅ | ✅ | 84 |
| `first-flex-job` | ⚠️ Partial | ✅ | ✅ (BLS) | ✅ | ✅ | 72 |

### Cross-Cutting Issues

| Issue | Severity | Fix |
|-------|:--------:|-----|
| `speakable` not wired from article pages to `ArticleSchema` | Medium | Pass `cssSelector` for hero summary + first H2 |
| Source citations use markdown links, not consistent `(Source, Year)` format | Low | Standardize to `(Source, Year)` for AI extractability |
| `Article` author in schema is generic "Indeed Flex Career Hub" org, not named expert | Low | Align schema `author` with `AuthorByline` component if using named attribution |
| Some guides lack a data point in the first 40-60 words | Low | Tighten opening sentences to lead with a key statistic |
| Comparison tables present on role pages (salary × location) and city pages (nearby cities) | — | ✅ Good for vs-query extraction |

---

## 4. Internal Linking — 6/10

### `relatedArticles` Cross-Pillar Bugs

Guide detail pages resolve `relatedArticles` only from `allGuideArticles` (guides + job-application), dropping financial-tip slugs silently.

| Article | `relatedArticles` | Resolved Cards | Severity |
|---------|-------------------|:--------------:|:--------:|
| `w2-vs-1099-temp-workers` | `["tax-tips", "gig-benefits", "first-flex-job"]` | **1** (2 are financial slugs → dropped) | High |
| `multiple-gigs` | Includes `irregular-income-budget` (financial) | **2** | Medium |
| `worker-rights-temp` | Includes `government-resources` (financial) | **2** | Medium |

### Orphan Page Candidates (No `InternalLinkHub`)

19 routes lack the `InternalLinkHub` component:

| Route | Risk |
|-------|------|
| `src/app/page.tsx` (root redirect) | Low |
| `career-hub/resources/page.tsx` | Medium |
| `career-hub/experience/entry-level/page.tsx` | Medium |
| `career-hub/schedule/[type]/page.tsx` | Medium |
| `paycheck-calculator/adp-alternative/page.tsx` | Medium |
| **14 tool routes:** `w2-vs-1099`, `worktalk`, `unemployment-calculator`, `skills-analyzer`, `safety-first`, `menu-master`, `job-offer-analyzer`, `data-verification`, `commute-calculator`, `cocktail-quiz`, `childcare-calculator`, `certification-roi`, `benefits-checker`, `career-path` | Medium |

### Hub-to-Spoke Coverage

| Hub Page | Full Coverage? | Issue |
|----------|:--------------:|-------|
| `/career-hub/roles/page.tsx` | ✅ | Lists all roles by industry |
| `/career-hub/guides/page.tsx` | ✅ | Iterates all guide categories |
| `/career-hub/cities/page.tsx` | ⚠️ | Major cities capped at 12; browse-by-state shows max 5 per state |

### Metrics

| Metric | Count |
|--------|------:|
| Total articles audited | 65 |
| Articles with `relatedArticles` | 65 |
| Articles with < 3 resolved related links | 3 |
| Routes missing `InternalLinkHub` | 19 |

---

## 5. pSEO Quality — 8/10

### Page Counts (from `generateStaticParams`)

| Page Type | Count |
|-----------|------:|
| Roles | 47 |
| Cities | 102 |
| City × Role | ~1,833+ |
| Paycheck Calculator (states + role variants) | 67 |
| Unemployment Benefits (states) | 51 |
| Personas | 6 (5 + index) |
| Guides | 54 |
| **Total programmatic pages** | **~2,160+** |

### Quality Verdict (Spot-Check by Type)

| Type | Verdict | Unique Data Sources | Issues |
|------|:-------:|---------------------|--------|
| Role | ✅ Pass | Skills, responsibilities, career path, pay data, day-in-the-life, role comparisons, earnings breakdown, embedded calculators | — |
| City | ✅ Pass | COL data, comparison table, budget snapshot | Neighborhood guide renders nothing for most cities; local employers only for ~10 metros |
| City × Role | ✅ Pass | Local salary adjustment, national vs local comparison, nearby-city salary table, monthly earnings | Content is formula-driven; could add city+industry nuance |
| State (paycheck) | ✅ Pass | State tax rules, min wage, overtime | Rich `statePageContent` in `state-tax-content.ts` is not rendered on the page |
| State (unemployment) | ✅ Pass | Per-state benefit rules, weekly amounts, partial earnings, gig impact | — |
| Persona | ✅ Pass | 5-8 related guides, 4-6 tools, 5-8 roles, 5-6 FAQs per persona | — |

### Specific Issues

| Issue | Severity | Fix |
|-------|:--------:|-----|
| `statePageContent` (neighboring states, gig tips, agency URLs, extra FAQs) in `state-tax-content.ts` is never imported or rendered by paycheck pages | Medium | Render a "State tax snapshot" module or merge the extra FAQs |
| Neighborhood guide is null for most cities (only renders where `getCityNeighborhoods()` returns data) | Medium | Add more neighborhood data or hide section titles where null |
| Local employers section only populated for ~10 metro areas | Low | Expand `localEmployers` dataset or source dynamically |
| City × Role content is primarily formula + FAQs with swapped variables | Low | Add 1-2 sentences of city+industry context where data permits |

---

## 6. Freshness — 9/10

### Article Freshness

| Metric | Result |
|--------|--------|
| Total articles audited | 65 |
| Articles with `lastReviewed` within 6 months | **65** |
| Articles with stale dates (before 2025-09-24) | **0** |
| Articles missing date fields | **0** |

All `lastReviewed` values are on or after 2025-10-22.

### Data Source Refresh Schedule

From `src/lib/data/data-sources.ts`:

| Data Category | Next Refresh | Update Frequency |
|---------------|-------------|-----------------|
| Wage data (BLS OEWS) | 2026-04-20 | Annual |
| Cost of living (Census ACS) | 2027-01-15 | Annual |
| Tax data (IRS) | 2027-01-01 | Annual |
| Employer data (Indeed Flex) | 2026-03-20 | Quarterly |
| Tip/gratuity data | 2027-01-10 | Annual |
| BLS OOH (projections) | — | Biennial |

### Non-Article Data Gaps

| Data Source | Has `lastReviewed`? | Severity |
|-------------|:-------------------:|:--------:|
| `cities.ts` / `cities/data.ts` | ❌ No date fields | Low |
| `locations.ts` | ❌ No date fields | Low |
| `how-to-become` types | ❌ No date fields | Low |

### Year References in Data

BLS "May 2024" and "2024–2034 projections" citations appear in guide articles. These are appropriate as source-year labels and align with the data source refresh schedule.

---

## 7. Tool Performance — 6/10

### Tool Inventory

**21 tool routes deployed** under `src/app/career-hub/tools/`:

| Category | Tools |
|----------|-------|
| **Calculators (11)** | Pay Calculator, Tax Calculator, Take-Home Pay, Paycheck Calculator, Salary Converter, Cost of Living, Commute Calculator, Childcare Calculator, Certification ROI, Unemployment Calculator, W2 vs 1099 |
| **Planners (2)** | Shift Planner, Career Path |
| **Analyzers (3)** | Skills Analyzer, Job Offer Analyzer, Benefits Checker |
| **Interactive (4)** | Cocktail Quiz, Menu Master, Safety First, WorkTalk |
| **Utility (1)** | Data Verification (internal) |

### Registry Gap

- `tool-registry.ts` defines only **5** tools (`paycheck-calculator`, `take-home-pay`, `tax-calculator`, `salary-converter`, `shift-planner`).
- **16 tools are unregistered** — affects related-tools linking and centralized metadata management.

### Metadata & Schema

| Metric | Count |
|--------|------:|
| Tools with `generateToolMetadata` static metadata | 21/21 ✅ |
| Tools with FAQ schema | 21/21 ✅ |
| Tools with SoftwareApplication schema | 21/21 ✅ |
| Tools missing BreadcrumbSchema | ~21 ⚠️ |
| Tools with duplicate FAQ JSON-LD (page + client) | 2+ (pay-calculator, tax-calculator) |
| Tools with duplicate CTA blocks | 4+ (cost-of-living, cocktail-quiz, shift-planner, tax-calculator) |

### Article → Tool Deep-Link Matrix

| Tool | Linked from Articles? | Gap Severity |
|------|:---------------------:|:------------:|
| Pay Calculator | ✅ Yes | — |
| Tax Calculator | ✅ Yes | — |
| Shift Planner | ✅ Yes | — |
| Skills Analyzer | ✅ Yes | — |
| Career Path | ✅ Yes | — |
| Cocktail Quiz | ✅ Yes | — |
| Menu Master | ✅ Yes | — |
| Safety First | ✅ Yes | — |
| Certification ROI | ✅ Yes | — |
| Job Offer Analyzer | ⚠️ Likely gap | Medium |
| **Take-Home Pay** | ❌ Zero links | Medium |
| **Salary Converter** | ❌ Zero links | Medium |
| **Benefits Checker** | ❌ Zero links | Medium |
| **Unemployment Calculator** | ❌ Zero links | Medium |
| **Commute Calculator** | ❌ Zero links | Medium |
| **Cost of Living** | ❌ Zero links | Medium |
| **Childcare Calculator** | ❌ Zero links | Medium |
| **W2 vs 1099 (tool)** | ❌ Zero links (guide exists but doesn't link the tool page) | Medium |
| **WorkTalk** | ❌ Zero links | Low |
| **Data Verification** | ❌ Zero links (internal tool) | — |
| **Paycheck Calculator** | ❌ Zero deep-links | Medium |

---

## 8. Lead Magnets — 7/10

### Gating

- **All tools are ungated** — no email gates, sign-up walls, or "unlock results" friction. ✅
- App download is the conversion event, not lead capture. ✅

### CTA Quality

| Issue | Severity | Detail |
|-------|:--------:|--------|
| CTAs are generic "Download the Indeed Flex app" | Medium | Not tailored to tool output (e.g., no "Find shifts paying $X/hr on Indeed Flex" after calculator result) |
| Duplicate CTAs on many tool pages | Medium | `StandardPageLayout` renders CTA + client also renders CTA + some server pages add a third |
| CTA copy is decision-stage only | Low | No awareness or consideration stage variants |

### Buyer Stage Matching

| Stage | Expected Tools | CTA Pattern | Status |
|-------|---------------|-------------|:------:|
| **Awareness** | Cost of Living, Pay Calculator, Salary Converter, Unemployment Calculator | "See what flexible workers earn…" | ⚠️ Generic |
| **Consideration** | Job Offer Analyzer, Benefits Checker, Certification ROI, Skills Analyzer, Commute Calculator | "Compare shifts that match…" | ⚠️ Generic |
| **Decision** | Shift Planner, Career Path, Childcare Calculator, Tax Calculator | "Book your first shift…" | ⚠️ Generic |

### Content Upgrade Integration

| Check | Status |
|-------|:------:|
| Articles embed tool links in body content | ✅ Partial (10 tools linked, 11 not) |
| "Related tools" block on article pages | ⚠️ Not systematic — varies by page |
| Tool results → article back-links | ⚠️ Some tools (e.g., tax calculator → W-2 guide) but not consistent |
| Reusable callout component for article→tool links | ❌ Not implemented |

---

## Prioritized Action Plan

### High Priority (Do First)

| # | Action | Category | Files |
|---|--------|----------|-------|
| 1 | Add `generateStaticParams` to all 8 wage-report `[year]` routes | Technical SEO | `src/app/career-hub/wage-report/[year]/**/page.tsx` |
| 2 | Deduplicate FAQ JSON-LD on pay-calculator and tax-calculator | Schema | `pay-calculator/page.tsx`, `PayCalculatorClient.tsx`, `tax-calculator/page.tsx`, `TaxCalculatorClient.tsx` |
| 3 | Add JSON-LD schemas to industry pages | Schema | `src/app/career-hub/industries/[industryId]/page.tsx` |
| 4 | Fix `relatedArticles` on `w2-vs-1099-temp-workers` (replace financial slugs with guide slugs) | Internal Linking | `src/lib/data/articles/guides/articles.ts` |
| 5 | Deduplicate CTA blocks (single CTA per page) | Lead Magnets | `cost-of-living`, `cocktail-quiz`, `shift-planner`, `tax-calculator` page/client files |

### Medium Priority (Next Sprint)

| # | Action | Category | Files |
|---|--------|----------|-------|
| 6 | Add canonical URLs to 6 pages missing them | Technical SEO | Entry-level, unemployment index, resume-examples index, cover-letters index, schedule, pay-range |
| 7 | Add `BreadcrumbSchema` to all tool pages | Schema | All `tools/*/page.tsx` |
| 8 | Wire `speakable` from guide pages into `ArticleSchema` | AI Visibility | `guides/[slug]/page.tsx`, `financial-tips/[slug]/page.tsx` |
| 9 | Add `InternalLinkHub` to 14 tool routes missing it | Internal Linking | See orphan list above |
| 10 | Add article deep-links for 11 unlinked tools | Tool Performance | `guides/articles.ts`, `financial-tips.ts`, `job-application-articles.ts` |
| 11 | Register all 21 tools in `tool-registry.ts` | Tool Performance | `src/lib/data/tool-registry.ts` |
| 12 | Fix `relatedArticles` on `multiple-gigs` and `worker-rights-temp` | Internal Linking | `src/lib/data/articles/guides/articles.ts` |
| 13 | Add `/career-hub/wage-report/{year}/trends` to sitemap | Technical SEO | `src/app/sitemap.ts` |
| 14 | Render `statePageContent` on paycheck calculator pages | pSEO Quality | `src/app/paycheck-calculator/[stateSlug]/page.tsx` |

### Low Priority (Backlog)

| # | Action | Category | Files |
|---|--------|----------|-------|
| 15 | Expand cities hub to show all cities (not capped at 12) | Internal Linking | `CitiesClient.tsx` |
| 16 | Add `dataAsOf` field to city/location/how-to data types | Freshness | `cities/types.ts`, `locations.ts`, `how-to-become/types.ts` |
| 17 | Explicitly name `GPTBot` and `Google-Extended` in robots.ts | AI Visibility | `src/app/robots.ts` |
| 18 | Create contextual CTA variants per tool buyer stage | Lead Magnets | `CTASection.tsx` |
| 19 | Add persona-specific `BreadcrumbSchema` using shared components | Schema | `for/[personaSlug]/page.tsx` |
| 20 | Expand neighborhood data for more cities | pSEO Quality | `cities/` data files |
| 21 | Build a reusable article→tool callout component | Lead Magnets | New component |
| 22 | Standardize source citations to `(Source, Year)` format | AI Visibility | All article data files |

---

## Appendix A: Programmatic Page Inventory

| Type | Route Pattern | Count |
|------|--------------|------:|
| Roles | `/career-hub/roles/[roleSlug]` | 47 |
| Cities | `/career-hub/cities/[citySlug]` | 102 |
| City × Role | `/career-hub/cities/[citySlug]/[roleSlug]` | ~1,833 |
| Salary by Role | `/career-hub/salary/[roleSlug]` | 47 |
| How to Become | `/how-to-become/[roleSlug]` | 47 |
| Interview Questions | `/interview-questions/[roleSlug]` | 47 |
| Resume Examples | `/career-hub/resume-examples/[roleSlug]` | 47 |
| Career Evaluations | `/career-hub/is-it-a-good-job/[roleSlug]` | 47 |
| Paycheck Calculator | `/paycheck-calculator/[stateSlug]` | 67 |
| Unemployment Benefits | `/unemployment-benefits/[stateSlug]` | 51 |
| Guides | `/career-hub/guides/[slug]` | 54 |
| Financial Tips | `/career-hub/financial-tips/[slug]` | 9 |
| Persona Hubs | `/career-hub/for/[personaSlug]` | 5 |
| Industries | `/career-hub/industries/[industryId]` | 4 |
| Seasonal Hiring | `/career-hub/seasonal-hiring/[seasonSlug]` | varies |
| Wage Report | `/career-hub/wage-report/[year]/**` | varies |
| **Estimated total** | | **~2,500+** |

## Appendix B: Data Source Refresh Calendar

| Data Category | Source | Frequency | Next Due |
|---------------|--------|-----------|----------|
| Wages | BLS OEWS | Annual | 2026-04-20 |
| Cost of Living | Census ACS | Annual | 2027-01-15 |
| Tax Rates | IRS | Annual | 2027-01-01 |
| Employers | Indeed Flex | Quarterly | 2026-03-20 (due now) |
| Tips/Gratuity | Industry surveys | Annual | 2027-01-10 |
| Job Projections | BLS OOH | Biennial | — |
| State Labor | State agencies | Varies | — |

## Appendix C: Tool → Article Mapping Rules

| Article Topic | Should Link To |
|---------------|---------------|
| Pay / salary | Pay Calculator, Take-Home Pay, Salary Converter |
| Tax / 1099 / W-2 | Tax Calculator, Benefits Checker, W2 vs 1099 |
| Scheduling / shifts | Shift Planner, Commute Calculator |
| Skills / certifications | Skills Analyzer, Certification ROI, Career Path |
| Location / city | Cost of Living, Commute Calculator |
| Hospitality | Cocktail Quiz, Menu Master |
| Warehouse / safety | Safety First Quiz |
| Applications / interviews | Job Offer Analyzer, Skills Analyzer |
| Benefits / insurance | Benefits Checker, Unemployment Calculator |
| Working parents | Childcare Calculator, Shift Planner |
