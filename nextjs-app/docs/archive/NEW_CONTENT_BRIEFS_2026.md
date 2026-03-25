# New Content Briefs — March 2026

> These briefs are based on live site gaps plus external search research.
>
> Important: numeric search volume is **not** included here because it was not verified with a live keyword tool in this pass. Each brief uses SERP evidence, internal linking gaps, and source availability instead of invented volume estimates.

## 1. First Job Resume Template

**Proposed route:** `/career-hub/guides/first-job-resume-template`

**Why this belongs in the backlog**

- The site currently references this slug in earlier strategy thinking, but no live article exists.
- Search results for `first job resume template` are dominated by entry-level and student-resume pages, which signals a clear beginner JTBD.
- The current article set covers freshers and students, but it does not own the exact “first job resume template” query pattern cleanly.

**SERP shape observed**

- Resume-example pages
- Entry-level template roundups
- Beginner resume how-to articles

**Audience**

- First-time workers
- Students
- Career starters applying to retail, warehouse, and hospitality roles

**Must include**

- One-page first-job template
- “What counts as experience” examples
- ATS-safe section order
- Warehouse, hospitality, and retail bullet examples
- Internal links to resume examples, ATS guide, and zero-experience hiring guide

**Research starting points**

- SERP examples for `first job resume template`
- [BLS Occupational Outlook Handbook](https://www.bls.gov/ooh/)
- Existing internal resume-example data in [nextjs-app/src/lib/data/resume-examples.ts](nextjs-app/src/lib/data/resume-examples.ts)

**Recommended pipeline**

`content-scout` -> `content-researcher` -> `content-strategist`

## 2. Warehouse Resume Guide

**Proposed route:** `/career-hub/guides/warehouse-resume-guide`

**Why this belongs in the backlog**

- The search results for `warehouse resume examples` and similar queries are crowded with generic resume sites.
- The Career Hub already has a strong warehouse career guide and warehouse interview content, but not a dedicated warehouse resume page.
- This is a natural spoke that can interlink with warehouse role pages, resume examples, interview content, and certifications.

**SERP shape observed**

- Warehouse resume examples
- Warehouse-worker resume template articles
- ATS and keyword guidance for warehouse roles

**Audience**

- Entry-level warehouse applicants
- Experienced pickers/packers and forklift operators
- Career changers moving into logistics

**Must include**

- Reverse-chronological example for experienced applicants
- Entry-level version for no-experience warehouse roles
- Keywords for RF scanners, inventory, safety, shipping/receiving, forklift
- Metrics examples for productivity, accuracy, and safety
- Links to forklift certification and warehouse interview pages

**Research starting points**

- SERP examples for `warehouse resume examples`
- [BLS OOH](https://www.bls.gov/ooh/)
- Existing warehouse resume examples in [nextjs-app/src/lib/data/resume-examples.ts](nextjs-app/src/lib/data/resume-examples.ts)

## 3. Hospitality Resume Tips

**Proposed route:** `/career-hub/guides/hospitality-resume-tips`

**Why this belongs in the backlog**

- The site has hospitality interview content, role pages, and resume examples, but no dedicated hospitality resume advice page.
- This fills a clear spoke gap between the hospitality guide and the application-toolkit cluster.
- It also helps persona hubs, especially students and career changers.

**Audience**

- Servers, bartenders, hosts, barbacks, banquet staff
- Applicants moving from retail or other customer-facing roles into hospitality

**Must include**

- How to position customer-service experience
- Tip-friendly achievement examples
- Event, banquet, and restaurant keyword blocks
- Common mistakes on hospitality resumes
- Links to TIPS certification, hospitality interview questions, and role pages

**Research starting points**

- Existing hospitality examples in [nextjs-app/src/lib/data/resume-examples.ts](nextjs-app/src/lib/data/resume-examples.ts)
- [BLS OOH](https://www.bls.gov/ooh/)
- Hospitality-specific employer requirements from live role pages

## 4. W-2 Vs 1099 For Temp Workers

**Proposed route:** `/career-hub/guides/w-2-vs-1099-temp-workers`

**Why this belongs in the backlog**

- The site already has a `w2-vs-1099` tool route, but it does not yet own the supporting article query well.
- Search results for `w-2 vs 1099` are dominated by tax explainers and contractor guidance, which creates space for a temp-worker-specific version.
- This topic is central to the Career Hub’s trust proposition because Indeed Flex differentiates on W-2 employment.

**SERP shape observed**

- IRS guidance
- Tax explainer articles
- Self-employment tax explainers

**Audience**

- Gig workers
- Career changers comparing flexible work models
- Users deciding between app-based W-2 staffing and 1099 platforms

**Must include**

- Tax withholding vs self-employment tax
- Benefits and protections differences
- Temp-worker-specific scenarios
- Clear caution language for state variation and individual tax advice
- Links to tax calculator, tax tips article, and the W-2 vs 1099 tool

**Research starting points**

- [IRS contractor reporting guidance](https://www.irs.gov/)
- [U.S. Department of Labor](https://www.dol.gov/)
- State labor sites where worker classification rules differ

**Go / no-go note**

- Go only with strict YMYL sourcing and explicit caveats.

## 5. Temporary Worker Rights Hub And State Pilot

**Proposed routes**

- Hub: `/career-hub/worker-rights`
- Pilot state pages: `/career-hub/worker-rights/new-jersey`, `/career-hub/worker-rights/massachusetts`

**Why this belongs in the backlog**

- Search results show real state-level protection pages from New Jersey and Massachusetts plus NELP coverage.
- This is one of the strongest E-E-A-T opportunities on the site because the existing state footprint is already large through paycheck and unemployment pages.
- It creates a valuable authority cluster the site currently lacks.

**SERP shape observed**

- Official state labor department pages
- Worker-rights advocacy resources
- Legal explainers of temp protections

**Audience**

- Temp and flexible workers trying to understand pay, notice, equal pay, fees, and transportation rules
- Workers in states with specific temporary-worker laws

**Must include**

- Clear state-by-state caveat language
- Federal baseline protections vs state-specific additions
- “What your agency can and cannot charge you for”
- Links to state labor departments and official complaint pages
- Internal links to unemployment and paycheck pages by state

**Research starting points**

- [New Jersey temporary worker protections](https://www.nj.gov/labor/myworkrights/worker-protections/temp_workers/)
- [Massachusetts temporary workers guidance](https://www.mass.gov/info-details/temporary-workers)
- [National Employment Law Project temporary worker resources](https://www.nelp.org/explore-the-issues/contracted-workers/temporary-workers/)

**Go / no-go note**

- Start with the hub plus 2 pilot states. Expand only after confirming a durable sourcing workflow.

## 6. Indeed Flex Vs Instawork

**Proposed route:** `/career-hub/guides/indeed-flex-vs-instawork`

**Why this belongs in the backlog**

- The comparison query exists in the wild and the site already has one successful comparison pattern with staffing agencies.
- Search results are currently weak, thin, or affiliate-style, which creates room for a better worker-first comparison.
- This is a direct middle-funnel asset for users actively comparing flexible-work platforms.

**SERP shape observed**

- Software comparison pages
- “Apps like Instawork” listicles
- Brand-owned feature pages

**Audience**

- Workers deciding between staffing apps
- Users focused on pay timing, benefits, and industries

**Must include**

- Worker-first comparison table
- Markets, industries, pay model, W-2 vs contractor status, payout timing
- Same Day Pay and benefits comparison, only if sourced carefully
- “Best fit if...” decision framework
- Links to tax tips, pay calculators, and the Indeed Flex guide

**Research starting points**

- Official Indeed Flex pages
- Official Instawork pages
- App-store / public review patterns, only as supporting context

## 7. Indeed Flex Vs Wonolo

**Proposed route:** `/career-hub/guides/indeed-flex-vs-wonolo`

**Why this belongs in the backlog**

- The comparison query exists, and the current search landscape appears thin or listicle-heavy.
- This is another close-to-conversion comparison where the site can add value with a clear W-2, benefits, and market-coverage lens.

**Audience**

- App-based hourly workers comparing on-demand staffing options
- Users focused on warehouses, events, and general labor

**Must include**

- Coverage and city-availability comparison
- Worker policy comparison, including cancellation and reliability implications
- Benefits and take-home-pay implications
- Decision tree for who should choose which platform

**Research starting points**

- Official Wonolo materials
- Official Indeed Flex materials
- Public policy and worker-experience references where verifiable

## Recommendation Order

1. `first-job-resume-template`
2. `warehouse-resume-guide`
3. `hospitality-resume-tips`
4. `w-2-vs-1099-temp-workers`
5. `worker-rights` hub plus 2-state pilot
6. `indeed-flex-vs-instawork`
7. `indeed-flex-vs-wonolo`

## Next Step

Only move a brief into drafting after it passes the full pipeline:

`content-scout` -> `content-researcher` -> `content-strategist` -> user approval -> writing
