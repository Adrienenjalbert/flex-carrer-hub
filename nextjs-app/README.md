# Indeed Flex Career Hub

A Next.js 14 SSG career platform for flexible work in the US. All pages are statically generated at build time.

**Live:** https://flex-carrer-hub.vercel.app

---

## Quick Start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # Production build
npm start        # Start production server
npm run lint     # ESLint
```

---

## Content Inventory by Category

### Articles (51 total)

#### Guide Articles (28)

| Category | Slug | Title |
|----------|------|-------|
| Getting Started | `complete-guide` | Indeed Flex: Everything You Need to Know |
| Getting Started | `first-flex-job` | Finding Flexible Work: Your Options Explained |
| Getting Started | `first-shift` | What to Expect on Your First Shift |
| Getting Started | `worker-profile` | Building Your Worker Profile |
| Career Growth | `career-paths` | From Entry-Level to Management: Career Paths |
| Career Growth | `skill-boost` | Skills That Boost Your Hourly Rate: 2026 Certification Guide |
| Career Growth | `certifications` | Getting Certifications That Pay Off |
| Career Growth | `more-shifts` | How to Get More Shifts on Gig Apps Like Indeed Flex |
| Career Growth | `temp-to-perm-guide` | From Temp to Permanent: Making the Transition |
| Industry Guides | `hospitality-guide` | Breaking Into Hospitality Work |
| Industry Guides | `warehouse-guide` | Warehouse Work: What You Need to Know |
| Industry Guides | `retail-guide` | Retail Jobs: Tips for Success |
| Industry Guides | `facilities-guide` | Facilities & Cleaning Careers |
| Professional Dev | `networking` | How to Network as a Gig Worker and Get Hired Faster |
| Professional Dev | `resume-tips` | Resume Tips for Hourly and Gig Workers: Stand Out in 2026 |
| Professional Dev | `interview-skills` | Interview Skills for Flex Work |
| Professional Dev | `multiple-gigs` | Balancing Multiple Gigs |
| Workplace Success | `workplace-success` | Your First 90 Days at Work: A Week-by-Week Success Plan |
| Workplace Success | `shift-rating-tips` | How to Get 5-Star Ratings on Every Shift |
| Seasonal Hiring | `holiday-warehouse-guide` | Holiday Warehouse Jobs 2026: Your Hiring Guide |
| Seasonal Hiring | `black-friday-hiring` | How to Get Hired for Black Friday 2026 |
| Seasonal Hiring | `summer-hospitality-guide` | Summer 2026 Hospitality Jobs: Peak Season Guide |
| Seasonal Hiring | `student-jobs-fall` | Part-Time Jobs for Students Fall 2026 |
| Seasonal Hiring | `event-staffing-guide` | Event Staffing: Concerts, Sports & More (2026) |
| Seasonal Hiring | `tax-season-jobs` | Tax Season 2026 Jobs: Hiring Guide |
| Employment Eligibility | `i9-complete-guide` | Form I-9 Explained: A Guide for Workers |
| Employment Eligibility | `i9-documents-list` | Acceptable I-9 Documents: Lists A, B, C Explained |
| Employment Eligibility | `first-job-america-guide` | Working in America: First Job Guide |
| Employment Eligibility | `work-authorization-types` | Work Permit vs EAD: Work Authorization Types |
| Employment Eligibility | `work-without-ssn` | Can I Work Without a Social Security Number? |
| Employment Eligibility | `e-verify-explained` | E-Verify Explained: What Workers Need to Know |

**URL pattern:** `/career-hub/guides/[slug]`

#### Job Application & Resume Articles (15)

| Slug | Title |
|------|-------|
| `fresher-resume-guide` | Resume for Freshers 2026: Step-by-Step Guide |
| `student-resume-template` | Student Resume Template: Balance Work & School |
| `zero-experience-jobs` | How to Get Hired With Zero Experience |
| `transferable-skills-guide` | Transferable Skills for Your First Resume |
| `ats-resume-tips` | ATS Resume Tips: Beat the Bots in 2026 |
| `best-resume-builders-2026` | Best Free Resume Builders 2026: Complete Comparison |
| `best-job-boards-2026` | Best Job Boards by Industry 2026 |
| `indeed-flex-vs-staffing-agencies` | Indeed Flex vs Staffing Agencies: Complete Comparison |
| `warehouse-interview-questions` | Warehouse Interview Questions & Answers 2026 |
| `hospitality-interview-questions` | Hospitality Interview Questions & Answers 2026 |
| `temp-to-permanent-guide` | How to Turn a Temp Job Into Permanent Employment |
| `reverse-chronological-resume` | Reverse-Chronological Resume Guide 2026 |
| `chronological-vs-functional` | Chronological vs Functional Resume |
| `canva-resume-builder-ats` | Canva Resume Builder: What Works for ATS |
| `zety-alternative` | Zety Templates Alternative: Free ATS-Safe Resume Options 2026 |
| `resume-genius-alternative` | Resume Genius Alternative: Top Free Resume Builders 2026 |

**URL pattern:** `/career-hub/guides/[slug]` (same as guides)

#### Financial Tips (8)

| Slug | Title |
|------|-------|
| `irregular-income-budget` | Budgeting for Irregular Income |
| `emergency-fund-guide` | Building an Emergency Fund on Gig Income |
| `tax-tips` | Tax Tips for Flexible Workers |
| `between-shifts` | Managing Money Between Shifts |
| `gig-benefits` | Benefits and Insurance Options |
| `retirement-saving` | Retirement Saving for Gig Workers |
| `government-resources` | Free Government Resources for Gig Workers |
| `maximize-indeed-flex` | How to Maximize Indeed Flex Earnings |

**URL pattern:** `/career-hub/financial-tips/[slug]`

---

### Roles (47)

Pages for every job role with pay data, skills, responsibilities, career paths, and FAQs.

**URL pattern:** `/career-hub/roles/[roleSlug]`

Industries: Hospitality (14 roles), Industrial/Warehouse (10), Retail (8), Facilities (5), Events (5), Healthcare (5)

---

### Cities & Locations (83 cities, 23 locations)

| Content Type | Count | URL Pattern |
|--------------|-------|-------------|
| City pages | 83 | `/career-hub/cities/[citySlug]` |
| City x Role pages | ~3,900 | `/career-hub/cities/[citySlug]/[roleSlug]` |
| Location pages | 23 | `/career-hub/locations/[locationSlug]` |

---

### Wage Report (2026)

| Section | URL | Content |
|---------|-----|---------|
| Hub | `/career-hub/wage-report` | Summary, WageExplorer |
| Year Overview | `/career-hub/wage-report/2026` | Executive summary, key stats |
| By Industry | `/career-hub/wage-report/2026/by-industry` | 6 industry cards |
| Industry Detail | `/career-hub/wage-report/2026/by-industry/[slug]` | 6 pages (hospitality, industrial, retail, facilities, healthcare, events) |
| By Occupation | `/career-hub/wage-report/2026/by-occupation` | All 47 roles grouped by industry |
| Occupation Detail | `/career-hub/wage-report/2026/by-occupation/[slug]` | 47 pages with charts |
| By Region | `/career-hub/wage-report/2026/by-region` | 20 metro areas |
| Region Detail | `/career-hub/wage-report/2026/by-region/[slug]` | 20 pages |
| Trends | `/career-hub/wage-report/2026/trends` | Min wage impact, inflation, seasonal |
| Methodology | `/career-hub/wage-report/2026/methodology` | Data sources, methodology |

---

### Interactive Tools (20)

| Tool | URL | Type |
|------|-----|------|
| Pay Calculator | `/career-hub/tools/pay-calculator` | Financial |
| Tax Calculator | `/career-hub/tools/tax-calculator` | Financial |
| Take-Home Pay | `/career-hub/tools/take-home-pay` | Financial |
| Paycheck Calculator | `/career-hub/tools/paycheck-calculator` | Financial |
| Salary Converter | `/career-hub/tools/salary-converter` | Financial |
| Unemployment Calculator | `/career-hub/tools/unemployment-calculator` | Financial |
| Cost of Living | `/career-hub/tools/cost-of-living` | Financial |
| Childcare Calculator | `/career-hub/tools/childcare-calculator` | Financial |
| Commute Calculator | `/career-hub/tools/commute-calculator` | Planning |
| Shift Planner | `/career-hub/tools/shift-planner` | Planning |
| Career Path | `/career-hub/tools/career-path` | Planning |
| Job Offer Analyzer | `/career-hub/tools/job-offer-analyzer` | Planning |
| Skills Analyzer | `/career-hub/tools/skills-analyzer` | Planning |
| Certification ROI | `/career-hub/tools/certification-roi` | Planning |
| Benefits Checker | `/career-hub/tools/benefits-checker` | Planning |
| Cocktail Quiz | `/career-hub/tools/cocktail-quiz` | Industry |
| Menu Master | `/career-hub/tools/menu-master` | Industry |
| Safety First | `/career-hub/tools/safety-first` | Industry |
| WorkTalk | `/career-hub/tools/worktalk` | Industry |
| Data Verification | `/career-hub/tools/data-verification` | Internal |

---

### Career Guides (programmatic)

| Content Type | Count | URL Pattern |
|--------------|-------|-------------|
| How to Become | 24 | `/how-to-become/[roleSlug]` |
| Interview Questions | 10 | `/interview-questions/[roleSlug]` |
| Certifications | 8 | `/certifications/[slug]` |
| Career Evaluations | 11 | `/career-hub/is-it-a-good-job/[roleSlug]` |
| Salary by Location | 6 | `/career-hub/salary/[roleSlug]` |

---

### Resume & Application Resources

| Content Type | Count | URL Pattern |
|--------------|-------|-------------|
| Resume Templates | 6 | `/career-hub/templates/[templateId]` |
| Cover Letter Templates | 6 | `/career-hub/cover-letters/[templateId]` |
| Resume Examples | 19 | `/career-hub/resume-examples/[roleSlug]` |
| Job Application Toolkit | 1 | `/career-hub/job-application-toolkit` |

---

### State-Level Content (102 pages)

| Content Type | Count | URL Pattern |
|--------------|-------|-------------|
| Paycheck Calculator by State | 51 | `/paycheck-calculator/[stateSlug]` |
| Unemployment Benefits by State | 51 | `/unemployment-benefits/[stateSlug]` |

---

### Persona Hubs (5)

| Persona | URL |
|---------|-----|
| Students | `/career-hub/for/students` |
| Career Changers | `/career-hub/for/career-changers` |
| Gig Workers | `/career-hub/for/gig-workers` |
| Parents | `/career-hub/for/parents` |
| Retirees | `/career-hub/for/retirees` |

---

### Seasonal & Events

| Content Type | Count | URL Pattern |
|--------------|-------|-------------|
| Seasons | 4 | `/career-hub/seasonal-hiring/[seasonSlug]` |
| Seasonal Events | 8+ | `/career-hub/seasonal-hiring/events/[eventSlug]` |
| Summer Jobs 2026 | 1 | `/career-hub/summer-jobs-2026` |
| Holiday Jobs 2026 | 1 | `/career-hub/holiday-jobs-2026` |

---

### Other Pages

| Page | URL | Purpose |
|------|-----|---------|
| Career Hub Home | `/career-hub` | Main hub with search, personas, industries |
| About | `/career-hub/about` | Editorial team, data sources |
| Resources | `/career-hub/resources` | External resource links |
| Guides Index | `/career-hub/guides` | All guides by category |
| Financial Tips Index | `/career-hub/financial-tips` | All financial articles |
| Tools Index | `/career-hub/tools` | All tools with search |
| Roles Index | `/career-hub/roles` | All roles with filters |
| Cities Index | `/career-hub/cities` | All cities |
| Industries Index | `/career-hub/industries` | 4 industry hubs |
| Industry Detail | `/career-hub/industries/[industryId]` | 4 pages |
| Pay Ranges | `/career-hub/pay-range/[range]` | 5 pay bracket pages |
| Schedule Types | `/career-hub/schedule/[type]` | 5 schedule pages |
| Entry Level | `/career-hub/experience/entry-level` | Entry-level role hub |
| ADP Alternative | `/paycheck-calculator/adp-alternative` | Paycheck calculator comparison |

---

## Total Page Count

| Category | Pages |
|----------|-------|
| Guide articles | 43 |
| Financial tips | 8 |
| Role pages | 47 |
| City pages | 83 |
| City x Role pages | ~3,900 |
| Location pages | 23 |
| Wage report pages | 79 |
| Interactive tools | 20 |
| How to become | 24 |
| Interview questions | 10 |
| Certifications | 8 |
| Career evaluations | 11 |
| Resume templates | 6 |
| Cover letter templates | 6 |
| Resume examples | 19 |
| Paycheck calculator states | 51 |
| Unemployment benefits states | 51 |
| Persona hubs | 5 |
| Seasonal | 13 |
| Salary pages | 6 |
| Pay range pages | 5 |
| Schedule pages | 5 |
| Index / hub pages | 20 |
| Other pages | 5 |
| **Total** | **~4,448** |

---

## Tech Stack

- **Framework:** Next.js 14 (App Router, SSG)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Data:** Static TypeScript files (no CMS)
- **Backend:** Supabase Edge Functions (SEMrush, Perplexity, Firecrawl, Search Console)
- **Hosting:** Vercel
- **SEO:** JSON-LD schemas (FAQ, Article, JobPosting, Occupation, HowTo, Breadcrumb, SoftwareApplication)

---

## Documentation

| Document | Purpose |
|----------|---------|
| [BRAND.md](docs/BRAND.md) | Editorial guidelines, quality scoring, banned phrases (single source of truth) |
| [SEO.md](docs/SEO.md) | SEO implementation, AEO, schema markup |
| [ARCHITECTURE.md](docs/ARCHITECTURE.md) | Technical architecture, directory structure |
| [COMPONENTS.md](docs/COMPONENTS.md) | Component reference |
| [PAGE_TEMPLATE_STANDARDS.md](docs/PAGE_TEMPLATE_STANDARDS.md) | Page requirements by type |
| [CONTENT_REVIEW_CHECKLIST.md](docs/CONTENT_REVIEW_CHECKLIST.md) | Pre-publish checklist |
| [CONTENT_AUDIT.md](docs/CONTENT_AUDIT.md) | Audit log |

---

## Content Engine (Cursor Skills)

7 skills that automate content creation, review, and growth:

| Skill | Purpose |
|-------|---------|
| `content-loop` | 4-mode orchestrator (new / optimize / refresh / audit) |
| `content-scout` | SEO discovery + usefulness evaluation |
| `content-researcher` | Factual research with source verification |
| `content-strategist` | Structure planning, pillars, hub-and-spoke |
| `content-writer` | Draft creation as TypeScript data objects |
| `content-review` | Quality gate: 6-dimension scoring + UX + verify |
| `site-growth` | SEO audit + tool evaluation + lead magnets |

Skills are in `.cursor/skills/`. Read `BRAND.md` for all editorial rules.
