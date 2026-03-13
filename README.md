# Indeed Flex Career Hub

An SEO-optimized career resource platform for US flexible workers, built with Next.js 14.

## Quick Start

```bash
cd nextjs-app
npm install
npm run dev
```

The app will be available at http://localhost:3000

---

## Website Structure

The Career Hub is organized into the following sections:

### Core Pages
| Route | Description |
|-------|-------------|
| `/` | Homepage |
| `/career-hub` | Career hub landing page |
| `/career-hub/about` | About page |
| `/career-hub/tools` | Interactive tools directory |
| `/career-hub/roles` | All job roles listing |
| `/career-hub/locations` | All Indeed Flex locations |
| `/career-hub/cities` | All cities |
| `/career-hub/guides` | Career guides |
| `/career-hub/industries` | Industry overview |
| `/career-hub/resources` | Resource hub |
| `/career-hub/financial-tips` | Financial tips hub |
| `/career-hub/wage-report` | Wage report hub |

### Dynamic Content Pages
| Pattern | Description |
|---------|-------------|
| `/career-hub/roles/[roleSlug]` | Role detail (salary, requirements, career path) |
| `/career-hub/cities/[citySlug]` | City-specific job market |
| `/career-hub/cities/[citySlug]/[roleSlug]` | City + role combination (high-value cities) |
| `/career-hub/locations/[locationSlug]` | Location detail |
| `/career-hub/guides/[slug]` | Guide articles |
| `/career-hub/financial-tips/[slug]` | Financial tip articles |
| `/career-hub/industries/[industryId]` | Industry detail |
| `/career-hub/salary/[roleSlug]` | Salary by location |

### Tools & Calculators
| Pattern | Description |
|---------|-------------|
| `/career-hub/tools` | Tools directory |
| `/career-hub/tools/[toolSlug]` | Individual tools (paycheck, tax, commute, cost-of-living, etc.) |
| `/paycheck-calculator/[stateSlug]` | State-specific paycheck calculator |
| `/paycheck-calculator/[roleId]` | Role-preset calculator |
| `/paycheck-calculator/adp-alternative` | ADP alternative comparison |
| `/unemployment-benefits` | Unemployment benefits hub |
| `/unemployment-benefits/[stateSlug]` | State unemployment guides |

### Career Resources
| Pattern | Description |
|---------|-------------|
| `/how-to-become` | Career path guides hub |
| `/how-to-become/[roleSlug]` | How to become [role] |
| `/interview-questions` | Interview prep hub |
| `/interview-questions/[roleSlug]` | Role-specific interview questions |
| `/certifications` | Certification guides hub |
| `/certifications/[slug]` | Certification detail |

### Job Application Toolkit
| Pattern | Description |
|---------|-------------|
| `/career-hub/job-application-toolkit` | Application toolkit hub |
| `/career-hub/templates` | Resume templates |
| `/career-hub/templates/[templateId]` | Template detail |
| `/career-hub/cover-letters` | Cover letter templates |
| `/career-hub/cover-letters/[templateId]` | Cover letter template detail |
| `/career-hub/resume-examples` | Resume examples |
| `/career-hub/resume-examples/[roleSlug]` | Role-specific resume examples |

### Persona & Intent Pages
| Pattern | Description |
|---------|-------------|
| `/career-hub/for` | Persona hub (students, parents, retirees, etc.) |
| `/career-hub/for/[personaSlug]` | Persona-specific content |
| `/career-hub/experience/entry-level` | Entry-level jobs |
| `/career-hub/pay-range/[range]` | Jobs by pay range (15-under, 15-18, 18-22, etc.) |
| `/career-hub/schedule/[type]` | Jobs by schedule (weekend, night-shift, flexible) |

### Seasonal & Wage Report
| Pattern | Description |
|---------|-------------|
| `/career-hub/seasonal-hiring` | Seasonal hiring hub |
| `/career-hub/seasonal-hiring/[seasonSlug]` | Season-specific hiring |
| `/career-hub/seasonal-hiring/events/[eventSlug]` | Seasonal events |
| `/career-hub/summer-jobs-2026` | Summer jobs landing |
| `/career-hub/holiday-jobs-2026` | Holiday jobs landing |
| `/career-hub/wage-report/2026` | Annual wage report |
| `/career-hub/wage-report/2026/methodology` | Report methodology |
| `/career-hub/wage-report/2026/by-industry/[slug]` | Industry wage data |
| `/career-hub/wage-report/2026/by-occupation/[slug]` | Occupation wage data |
| `/career-hub/wage-report/2026/by-region/[slug]` | Regional wage data |

### Career Evaluations
| Pattern | Description |
|---------|-------------|
| `/career-hub/is-it-a-good-job` | Career evaluation hub |
| `/career-hub/is-it-a-good-job/[roleSlug]` | Role-specific evaluation |

---

## SEO Strategy & Practices

### Technical SEO
- **Static Generation (SSG)**: All pages pre-rendered at build time for fast loads and full HTML for crawlers
- **Dynamic Sitemap**: 14 sitemap indexes (core, roles, cities, city-roles, tools, guides, articles, states, job-application, personas, seasonal, wage-report, career-evaluations, salary-by-city)
- **Robots.txt**: Crawler rules for Google, Bing, Ahrefs, Semrush; sitemap references; `api/`, `_next/`, `private/` disallowed
- **Canonical URLs**: Every page has a canonical URL in metadata
- **URL Structure**: Descriptive slugs, hierarchical paths, lowercase, hyphens (e.g. `/career-hub/roles/bartender`)

### Metadata API
- **Page-level `generateMetadata()`**: Unique title, description, keywords per page
- **Open Graph**: `og:title`, `og:description`, `og:image`, `og:type` (website/article)
- **Twitter Cards**: `summary_large_image` for social sharing
- **Geo targeting**: `geoRegion`, `geoPlacename` for location pages
- **Keyword generation**: Dynamic keywords from role, location, industry via `generateKeywords()` helper

### Structured Data (JSON-LD)
Schema markup for rich search results:

| Schema | Use Case |
|--------|----------|
| `FAQSchema` | FAQ sections → FAQ rich snippets |
| `ArticleSchema` | Blog/guide content |
| `WebPageSchema` | General pages with breadcrumbs |
| `BreadcrumbSchema` | Navigation breadcrumbs |
| `JobPostingSchema` | Job listings |
| `OccupationSchema` | Role/career pages |
| `HowToSchema` | Step-by-step guides |
| `LocalBusinessSchema` | Location pages |
| `SoftwareApplicationSchema` | Tools and calculators |
| `CreativeWorkSchema` | Templates and guides |
| `CollectionPageSchema` | Index/list pages |
| `ItemListSchema` | Featured items |
| `AggregateRatingSchema` | Ratings |
| `EmployerAggregateRatingSchema` | Employer info on city pages |

### Content SEO
- **Heading hierarchy**: Single H1 per page, logical H2 → H3 structure
- **FAQ sections**: On key pages to trigger FAQ rich snippets
- **Internal linking**: Contextual links, related content sections, breadcrumbs
- **Alt text**: Descriptive alt on all images

### Performance (Core Web Vitals)
- **LCP** (< 2.5s): Static generation, optimized images
- **FID** (< 100ms): Minimal client-side JS
- **CLS** (< 0.1): Reserved space for dynamic content
- **TTFB** (< 600ms): CDN delivery of static pages

---

## Project Structure

```
.
├── nextjs-app/          # Main Next.js application
│   ├── src/
│   │   ├── app/         # Next.js App Router pages
│   │   ├── components/  # React components (incl. SEO schema components)
│   │   └── lib/         # Data, utilities, SEO helpers (metadata.ts, faq-generator)
│   ├── docs/            # Documentation (SEO.md, ARCHITECTURE.md, etc.)
│   └── README.md        # Detailed Next.js app documentation
├── supabase/            # Supabase configuration and functions
│   └── functions/       # Edge Functions (perplexity-search, firecrawl-scrape, semrush-keyword)
├── LICENSE
└── CHANGELOG.md
```

### Supabase Edge Functions (Content Pipeline)

| Function | Purpose | Required secret |
|----------|---------|-----------------|
| `perplexity-search` | Research, top questions | `PERPLEXITY_API_KEY` |
| `firecrawl-scrape` | Scrape competitor pages, SERP | `FIRECRAWL_API_KEY` |
| `semrush-keyword` | Keyword volume, competition, CPC | `SEMRUSH_API_KEY` |

Set secrets: `supabase secrets set SEMRUSH_API_KEY=your_key` (and similarly for other keys).

## Documentation

See [nextjs-app/README.md](nextjs-app/README.md) for complete documentation including:

- Architecture overview
- Component library
- Data structure
- Deployment guide

See [nextjs-app/docs/SEO.md](nextjs-app/docs/SEO.md) for the full SEO implementation guide.

## License

MIT License - see [LICENSE](LICENSE) for details.
