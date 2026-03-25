# Career Hub Site Audit — March 2026

> Scope: full-site audit of SEO, usefulness, pSEO, trust, psychology, and content quality.
>
> Method: live code review of route templates, `tsx` imports from the current data modules, article scoring with the quality scorer, existing audit-doc validation, and external guidance from Google Search Central, Google spam policy summaries, NNGroup trust research, and the Princeton GEO paper.

## Executive Summary

The Career Hub is stronger than the earlier draft audits suggested, but it is also more inconsistent than the current docs admit. The site has good structural bones: broad static coverage, substantial schema usage, many page families, strong role and city templates, and several genuinely differentiated assets such as the wage report, tools, and persona hubs.

The biggest issues are no longer the ones the earlier audit docs focused on. The highest-impact problems in the live codebase are:

1. The documentation baseline is stale. Multiple inventory counts in the README and older audit docs no longer match the live code and data files.
2. Editorial quality is the main bottleneck. The live article scorer puts most of the 55 editorial articles below the project’s own 80/100 threshold, with AEO and data-accuracy patterns causing the most drag.
3. pSEO risk is concentrated, not site-wide. The city-role footprint is smaller than the docs claim, but 1,880 generated pages still depend on a partially templated narrative layer and need stronger uniqueness controls before expansion.
4. Internal linking has a real logic bug. The role pages link to nonexistent `/compare/...` routes, and the link hub still contains dead helper patterns plus several `generic` fallback contexts.
5. Trust and freshness governance are inconsistent. Some templates use live `dateModified` values, others use fixed hardcoded dates, and several tool pages surface unsupported aggregate ratings that should not be presented as fact unless sourced.

## Scorecard

| Category | Score | Why |
|---|---:|---|
| Technical SEO | 7/10 | Broad SSG coverage and generally solid metadata patterns, but secondary templates still have canonical, social, or freshness gaps. |
| Schema & Freshness | 6/10 | Schema coverage is extensive, but date handling is inconsistent and some inline JSON-LD is hardcoded or duplicated. |
| Editorial Usefulness | 5/10 | The site has good topical coverage, but only a small minority of articles currently clear the project’s own quality threshold. |
| AEO / AI Visibility | 4/10 | Answer-first structure, question-led H2 coverage, and extractable source-backed passages remain the weakest dimensions across the article corpus. |
| Internal Linking | 5/10 | The site links aggressively, but some links are generic, some contexts are under-specified, and one compare pattern is broken. |
| pSEO Quality | 5/10 | Stronger than the old docs suggested, but city-role pages still rely on reusable copy and need tighter quality gates. |
| Trust & Psychology | 5/10 | Role and city templates now include more E-E-A-T than earlier audits claimed, but trust markers and CTA design are uneven. |
| Tool-to-Content Integration | 6/10 | Tool coverage is a real advantage, but some tool pages use unsupported ratings and not every high-intent article family routes users cleanly into tools. |

**Overall: 43/80**

## Top Priorities

1. Re-baseline the whole content system around live counts and live templates, not stale doc assumptions.
2. Raise the 55 editorial articles to the project’s own 80/100 standard, starting with AEO and data-accuracy fixes.
3. Fix broken and low-context internal linking, especially the dead `/compare/...` route path and `InternalLinkHub` fallbacks.
4. Hard-code freshness honestly: remove live schema timestamps, replace fixed placeholder dates, and align visible “updated” signals with actual review state.
5. Harden the city-role, seasonal, and tool credibility layers before expanding the pSEO footprint or adding more comparison pages.

## Re-Baselined Inventory

The current repo is materially different from the README and earlier audit drafts.

| Family | Earlier Docs | Live Code / Data | Audit Note |
|---|---:|---:|---|
| Guide articles | 28 | 31 | README undercounts the live guide corpus in [nextjs-app/src/lib/data/articles/guides.ts](nextjs-app/src/lib/data/articles/guides.ts). |
| Job application articles | 15 | 16 | README undercounts the live job-application set in [nextjs-app/src/lib/data/articles/job-application-articles.ts](nextjs-app/src/lib/data/articles/job-application-articles.ts). |
| Financial articles | 8 | 8 | Count is current. |
| Total editorial articles | 51 | 55 | Live article inventory is larger than the documented baseline. |
| Resume examples | 19 | 20 | README undercounts [nextjs-app/src/lib/data/resume-examples.ts](nextjs-app/src/lib/data/resume-examples.ts). |
| How-to-become guides | 24 | 23 | README overcounts [nextjs-app/src/lib/data/how-to-become.ts](nextjs-app/src/lib/data/how-to-become.ts). |
| Cities | 83 | 101 | Live city inventory in [nextjs-app/src/lib/data/cities.ts](nextjs-app/src/lib/data/cities.ts) is materially larger. |
| Locations | 23 | 19 | README overcounts [nextjs-app/src/lib/data/locations.ts](nextjs-app/src/lib/data/locations.ts). |
| City-role pages | ~3,900 | 1,880 | Live generation is limited to 40 high-value cities x 47 roles in [nextjs-app/src/app/career-hub/cities/[citySlug]/[roleSlug]/page.tsx](nextjs-app/src/app/career-hub/cities/[citySlug]/[roleSlug]/page.tsx). |
| Wage report occupations | 49 in page copy | 47 in data | [nextjs-app/src/app/career-hub/wage-report/page.tsx](nextjs-app/src/app/career-hub/wage-report/page.tsx) still overstates the live dataset in [nextjs-app/src/lib/data/wage-report/2026-data.ts](nextjs-app/src/lib/data/wage-report/2026-data.ts). |
| “All 308 pages pre-rendered” | 308 | stale | [nextjs-app/docs/SEO.md](nextjs-app/docs/SEO.md) no longer reflects the live route footprint. |

## Confirmed Findings

| Issue | Category | Severity | Current State | Why It Matters | Fix |
|---|---|---|---|---|---|
| Inventory and page-count docs are stale | Governance | High | README, SEO docs, and earlier audits disagree with live code/data counts. | Planning, prioritization, and success metrics are being set from outdated assumptions. | Re-baseline docs and future audits against importable source-of-truth data files. |
| Editorial corpus underperforms the project’s own quality threshold | Content | High | Live article scoring shows only 5 of 55 articles clear 80/100. | The brand’s own review rules are stricter than the current publish state. | Work the article backlog from [nextjs-app/docs/CONTENT_SCORE_AUDIT.md](nextjs-app/docs/CONTENT_SCORE_AUDIT.md) in priority order. |
| AEO is the weakest editorial dimension | AEO | High | Answer-first intros, question-format H2 coverage, and FAQ extractability are consistently the lowest scoring patterns. | This limits both classic snippet capture and AI citation potential. | Rewrite intros, reframe H2s as user questions, and tighten FAQ answers across the article set. |
| Data-accuracy governance is still too loose | Trust | High | Many articles score poorly on data accuracy even when overall content is useful. | Unsupported claims weaken E-E-A-T and can damage trust on YMYL topics. | Add explicit sources arrays, verify year-sensitive claims, and remove unsupported numbers. |
| Role pages link to nonexistent compare URLs | Internal Linking | High | [nextjs-app/src/app/career-hub/roles/[roleSlug]/page.tsx](nextjs-app/src/app/career-hub/roles/[roleSlug]/page.tsx) emits `/compare/...` links, but there is no live compare route. | This is a real crawl and UX break, not a theoretical issue. | Remove or replace the compare CTA until the route exists. |
| `InternalLinkHub` still contains dead helper paths and weak fallback contexts | Internal Linking | High | [nextjs-app/src/components/career-hub/InternalLinkHub.tsx](nextjs-app/src/components/career-hub/InternalLinkHub.tsx) defines unused patterns like `/warehouse-jobs-austin` and `/how-to-find-temp-work-in-austin`, and several pages pass `type: \"generic\"`. | Internal link equity is diluted by links with weak or nonexistent topical context. | Remove dead helper paths and replace generic contexts with page-family-specific contexts. |
| City-role footprint is smaller than feared, but still needs stronger uniqueness controls | pSEO | High | Live generation is 1,880 pages, not ~3,900, but the template still includes a reusable city-role “about” paragraph. | Expansion without stronger uniqueness rules could trigger doorway-like outcomes. | Keep the current high-value cap, enrich top city-role pages, and avoid footprint expansion until uniqueness rules are stronger. |
| Article schema freshness is inconsistent | Schema | High | [nextjs-app/src/app/career-hub/guides/[slug]/page.tsx](nextjs-app/src/app/career-hub/guides/[slug]/page.tsx) and [nextjs-app/src/app/career-hub/financial-tips/[slug]/page.tsx](nextjs-app/src/app/career-hub/financial-tips/[slug]/page.tsx) use live `new Date().toISOString()` for `dateModified`, while interview and certification pages use fixed hardcoded dates. | Search engines and users get misleading freshness signals. | Standardize all article-family dates on real source data such as `lastReviewed` and `dateModified`. |
| High-intent seasonal landing pages do not meet the project’s own canonical standard | Technical SEO | Medium | [nextjs-app/src/app/career-hub/summer-jobs-2026/page.tsx](nextjs-app/src/app/career-hub/summer-jobs-2026/page.tsx) and [nextjs-app/src/app/career-hub/holiday-jobs-2026/page.tsx](nextjs-app/src/app/career-hub/holiday-jobs-2026/page.tsx) have metadata but no canonical. | These are exactly the kind of pages that should be cleanly canonicalized for season-over-season reuse. | Add canonical metadata and explicit year-lifecycle handling. |
| Some secondary templates are thinly governed or partially under-optimized | Technical SEO | Medium | Examples include [nextjs-app/src/app/career-hub/resources/page.tsx](nextjs-app/src/app/career-hub/resources/page.tsx) and [nextjs-app/src/app/career-hub/experience/entry-level/page.tsx](nextjs-app/src/app/career-hub/experience/entry-level/page.tsx). | The flagship families are stronger than the long tail. | Add schema, richer metadata, and stronger internal linking to secondary templates. |
| Several tool pages surface unsupported aggregate ratings | Trust / Tools | High | Tool ratings such as `4.8 / 2847` and similar values are hardcoded in [nextjs-app/src/lib/data/tool-registry.ts](nextjs-app/src/lib/data/tool-registry.ts). | Unsupported rating markup is a direct trust risk and can become a structured-data quality issue. | Remove ratings unless a verifiable source and display method exist. |

## Technical SEO And Template Audit

### Stronger than earlier docs suggested

- Major dynamic families do use `generateStaticParams`, including roles, cities, city-role pages, state tax pages, unemployment pages, how-to-become, interview questions, certifications, personas, and wage-report families.
- The state paycheck and unemployment families already include visible breadcrumbs and stronger E-E-A-T signals than the earlier audits claimed.
- Salary-by-city pages already render FAQ content and FAQ schema, so the earlier “salary pages have no FAQ” conclusion is stale.
- Resume-example pages already render `FAQSchema` and `BreadcrumbSchema`, so that earlier finding is also stale.

### Confirmed template issues

- [nextjs-app/src/app/career-hub/guides/[slug]/page.tsx](nextjs-app/src/app/career-hub/guides/[slug]/page.tsx) and [nextjs-app/src/app/career-hub/financial-tips/[slug]/page.tsx](nextjs-app/src/app/career-hub/financial-tips/[slug]/page.tsx) still use live `dateModified` schema values.
- [nextjs-app/src/app/interview-questions/[roleSlug]/page.tsx](nextjs-app/src/app/interview-questions/[roleSlug]/page.tsx) and [nextjs-app/src/app/certifications/[slug]/page.tsx](nextjs-app/src/app/certifications/[slug]/page.tsx) still rely on fixed publish/modify timestamps.
- [nextjs-app/src/app/career-hub/for/[personaSlug]/page.tsx](nextjs-app/src/app/career-hub/for/[personaSlug]/page.tsx), [nextjs-app/src/app/career-hub/templates/[templateId]/page.tsx](nextjs-app/src/app/career-hub/templates/[templateId]/page.tsx), and [nextjs-app/src/app/career-hub/cover-letters/[templateId]/page.tsx](nextjs-app/src/app/career-hub/cover-letters/[templateId]/page.tsx) use inline JSON-LD instead of the shared schema discipline used elsewhere.
- [nextjs-app/src/app/career-hub/wage-report/page.tsx](nextjs-app/src/app/career-hub/wage-report/page.tsx) still describes “49 occupations” while the live wage dataset exposes 47.
- [nextjs-app/src/app/career-hub/resources/page.tsx](nextjs-app/src/app/career-hub/resources/page.tsx) is useful but under-schematized and under-linked relative to the project’s template standards.
- [nextjs-app/src/app/career-hub/experience/entry-level/page.tsx](nextjs-app/src/app/career-hub/experience/entry-level/page.tsx) has good copy depth but lacks the metadata completeness expected elsewhere.

## Editorial Quality Audit

The live article scorer is directionally clear even if it is harsher than the older bespoke audit docs: the editorial system is not failing because it lacks keyword fields anymore. It is failing because the writing and source patterns still do not consistently satisfy the brand’s own rules.

### Article summary

| Article Group | Count | Avg Composite | Notes |
|---|---:|---:|---|
| Guides | 31 | 72 | Strong topical breadth, weakest on AEO and freshness honesty. |
| Financial tips | 8 | 70 | Good usefulness, but still weak on structured sourcing and freshness governance. |
| Job application | 16 | 72 | Strong search intent alignment, weaker on citation quality and durable value. |
| Total editorial articles | 55 | 72 | Only 5 currently clear the 80/100 project threshold. |

### Cross-cutting article failures

- AEO is usually the weakest dimension, not keyword targeting.
- Data accuracy is still fragile across high-intent and YMYL-adjacent articles.
- Titles and descriptions are present, but many articles still leave SERP value on the table.
- Readability and long-sentence density remain a recurring brand-tone problem, especially in legal and eligibility content.
- The site now has `primaryKeyword` fields populated, so future work should stop treating that as a foundational gap.

For the full article-by-article backlog, see [nextjs-app/docs/CONTENT_SCORE_AUDIT.md](nextjs-app/docs/CONTENT_SCORE_AUDIT.md).

## pSEO Audit

### 1. City pages

- Live footprint: 101 pages.
- Current state: substantially better than a typical thin location pattern because the pages include cost-of-living, role cards, employer data, FAQs, and neighborhood blocks.
- Risk: inventory is larger than the docs claim, and location pages are notably lighter than city pages.

### 2. City-role pages

- Live footprint: 1,880 pages generated from 40 high-value cities x 47 roles.
- Current state: better constrained than the earlier docs claimed. Hyperlocal blocks such as employer and neighborhood sections help.
- Risk: the reusable “about” section is still too formulaic, and several supporting link blocks remain generic.
- Recommendation: keep the current cap, enrich the highest-opportunity city-role pages, and do not expand the footprint until uniqueness scoring is in place.

### 3. Role pages

- Current state: among the strongest page families on the site.
- Strengths: rich schemas, testimonials, inline CTAs, earnings breakdowns, cross-links, and visible author/data cues.
- Risks: dead compare route, potentially unsupported “48 hours” style onboarding claims, and some hardcoded role-independent messaging.

### 4. State content

- Current state: stronger than prior docs suggested.
- Strengths: visible breadcrumbs, schemas, and author/data components are already present.
- Risks: unemployment pages still use `generic` link-hub context, and state/role intent pages need tighter topical linking.

### 5. Salary, resume example, and application-support pages

- Salary pages are more complete than earlier audits suggested and already include FAQs.
- Resume-example, template, and cover-letter pages have solid topical intent but weaker schema governance and weaker trust/freshness discipline than the main article families.
- The job-application toolkit is useful, but it behaves more like a high-value hub than the current PRD treated it.

### 6. Seasonal and event pages

- The seasonal cluster has strong demand shaping and clear page intent.
- The canonical and lifecycle model is weaker than it should be for pages that will be reissued every year.
- Seasonal hub pages should become a formal annual content program, not one-off campaign pages.

## Trust, Psychology, And Conversion

Applying the NNGroup trust lenses to the live site produces a more nuanced picture than the earlier docs:

### Design quality

- Strong on flagship templates such as role pages, city pages, wage-report pages, and main tools.
- Weaker on secondary hubs and some long-tail utilities where metadata/schema discipline and supporting trust elements are thinner.

### Up-front disclosure

- Good on city and role templates where data source citations and bylines are visible.
- Weaker on tool pages that expose ratings without visible evidence and on YMYL-ish content with inconsistent freshness signals.

### Comprehensive, correct, current content

- Good on the wage report, role pages, city pages, and many comparison-oriented article families.
- Weaker on articles that still rely on thin direct answers, generic advice, or unsurfaced sources arrays.

### Connection to the rest of the web

- Mixed. Government and official-source links exist in many places, but social proof and external-validation patterns remain inconsistent.

### Conversion psychology

- Role and city pages now have stronger CTA placement than older audits acknowledged.
- The site still over-relies on footer CTAs and could do more with mid-content, result-state, and persona-aware CTAs.
- The application and seasonal hubs are useful, but they can do more to move users into the most relevant tool or next action.

## What The Earlier Audits Got Wrong

These older assumptions should be retired in future planning:

- `primaryKeyword` is no longer missing across the article corpus.
- State paycheck pages already render server-side schema and visible breadcrumbs.
- Resume-example pages already include breadcrumb and FAQ schema.
- Salary pages already include FAQ content and schema.
- The city-role footprint is 1,880, not ~3,900, under the current generation model.
- The README and SEO docs are no longer safe sources for page counts without a live-code check.

## Recommended Audit-to-Execution Order

1. Fix trust-breaking or crawl-breaking issues first: dead compare links, unsupported tool ratings, stale doc baselines, and freshness-schema mismatches.
2. Raise the article corpus to 80/100 using the live backlog rather than broad rewrites by feel.
3. Tighten pSEO quality gates on city-role, seasonal, and long-tail location families before adding more pages.
4. Normalize schema and metadata governance across the application-support, persona, and seasonal families.
5. Only then expand net-new content and comparison coverage.

## Primary References

- [nextjs-app/README.md](nextjs-app/README.md)
- [nextjs-app/docs/BRAND.md](nextjs-app/docs/BRAND.md)
- [nextjs-app/docs/SEO.md](nextjs-app/docs/SEO.md)
- [nextjs-app/docs/PAGE_TEMPLATE_STANDARDS.md](nextjs-app/docs/PAGE_TEMPLATE_STANDARDS.md)
- [nextjs-app/src/app/sitemap.ts](nextjs-app/src/app/sitemap.ts)
- [nextjs-app/src/components/career-hub/InternalLinkHub.tsx](nextjs-app/src/components/career-hub/InternalLinkHub.tsx)
- [nextjs-app/src/app/career-hub/cities/[citySlug]/[roleSlug]/page.tsx](nextjs-app/src/app/career-hub/cities/[citySlug]/[roleSlug]/page.tsx)
- [nextjs-app/src/app/career-hub/roles/[roleSlug]/page.tsx](nextjs-app/src/app/career-hub/roles/[roleSlug]/page.tsx)
- [nextjs-app/src/app/career-hub/guides/[slug]/page.tsx](nextjs-app/src/app/career-hub/guides/[slug]/page.tsx)
- [nextjs-app/src/app/career-hub/financial-tips/[slug]/page.tsx](nextjs-app/src/app/career-hub/financial-tips/[slug]/page.tsx)
- [nextjs-app/src/app/paycheck-calculator/[stateSlug]/page.tsx](nextjs-app/src/app/paycheck-calculator/[stateSlug]/page.tsx)
- [nextjs-app/src/app/unemployment-benefits/[stateSlug]/page.tsx](nextjs-app/src/app/unemployment-benefits/[stateSlug]/page.tsx)
- [nextjs-app/src/lib/content-engine/quality-scorer.ts](nextjs-app/src/lib/content-engine/quality-scorer.ts)
