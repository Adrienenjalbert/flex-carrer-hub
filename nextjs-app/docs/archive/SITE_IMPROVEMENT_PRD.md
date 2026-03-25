# Career Hub Site Improvement PRD

> Date: March 19, 2026
>
> Related inputs:
>
> - site audit: [nextjs-app/docs/SITE_AUDIT_2026.md](nextjs-app/docs/SITE_AUDIT_2026.md)
> - article score backlog: [nextjs-app/docs/CONTENT_SCORE_AUDIT.md](nextjs-app/docs/CONTENT_SCORE_AUDIT.md)
> - non-article backlog: [nextjs-app/docs/CONTENT_ASSET_BACKLOG_2026.md](nextjs-app/docs/CONTENT_ASSET_BACKLOG_2026.md)
> - new opportunities: [nextjs-app/docs/NEW_CONTENT_BRIEFS_2026.md](nextjs-app/docs/NEW_CONTENT_BRIEFS_2026.md)

## Product Goal

Make the Career Hub the most useful, trustworthy, and search-resilient destination for flexible and temporary workers in the US, while preserving editorial credibility and reducing pSEO risk.

## Problem Statement

The Career Hub has grown quickly and now has stronger assets than the earlier audits suggested, but the quality system has not kept pace with that growth.

The current problems are not “we need more pages” or “we forgot metadata.” The real problems are:

- the source-of-truth inventory is stale
- the article corpus is below the project’s own quality threshold
- trust and freshness signals are inconsistent
- pSEO quality controls are weaker than the site’s scale now requires
- internal linking logic has at least one real route break and several low-context fallbacks

## Goals

1. Raise the usefulness, trustworthiness, and AEO readiness of the current site before expanding the footprint.
2. Normalize freshness, schema, and metadata governance across all major templates.
3. Keep pSEO expansion disciplined by improving uniqueness and avoiding doorway-like growth.
4. Strengthen trust and conversion patterns without turning the Career Hub into overt product marketing.
5. Create a research-backed backlog for the next wave of content once the current system is cleaner.

## Non-Goals

- Do not expand city-role coverage beyond the current high-value footprint in the first phase.
- Do not create new content from unsourced assumptions.
- Do not treat vanity metrics or unsupported aggregate ratings as trust signals.
- Do not redesign the whole front end before fixing content quality and credibility basics.

## Target Users

- Students looking for flexible first-job options
- Career changers testing new industries
- Current gig workers comparing W-2 and 1099 work models
- Parents and retirees seeking schedule-friendly income
- Search users with high-intent questions around pay, interviews, certifications, rights, and resume help

## Success Definition

### Internal quality targets

- 100% of audited article templates use real freshness dates, not runtime or placeholder timestamps
- 0 dead internal route patterns remain in live content or link hubs
- 100% of high-intent seasonal landing pages have full canonical, OpenGraph, and Twitter coverage
- 0 unsupported aggregate ratings remain in structured data
- 20 of 55 editorial articles reach `80+` by day 60
- 40 of 55 editorial articles reach `80+` by day 90

### Measurement baselines to establish in sprint 0

These were **not** fabricated in this PRD and must be pulled from real systems first:

- Google Search Console clicks, impressions, CTR, and average position by page family
- zero-click URL count by family
- AI citation coverage for priority queries
- tool CTA click-through and tool completion events
- return visits and session depth by content family

## Requirements

## P0: Baseline And Credibility Cleanup

### Requirement

Re-baseline the live site inventory and remove the most credibility-damaging inconsistencies before broader optimization work begins.

### Why this comes first

The current docs, templates, and some trust signals are inconsistent enough that they can distort every other decision downstream.

### Acceptance criteria

- Inventory counts in the audit and PRD match the live importable source data.
- The dead `/compare/...` role-page link is removed or replaced with a real destination.
- Unsupported tool aggregate ratings are removed or fully sourced before continued use.
- Article-family freshness fields are standardized on real review dates.
- Seasonal landing pages have canonical coverage.

### Key files

- [nextjs-app/src/app/career-hub/roles/[roleSlug]/page.tsx](nextjs-app/src/app/career-hub/roles/[roleSlug]/page.tsx)
- [nextjs-app/src/components/career-hub/InternalLinkHub.tsx](nextjs-app/src/components/career-hub/InternalLinkHub.tsx)
- [nextjs-app/src/lib/data/tool-registry.ts](nextjs-app/src/lib/data/tool-registry.ts)
- [nextjs-app/src/app/career-hub/guides/[slug]/page.tsx](nextjs-app/src/app/career-hub/guides/[slug]/page.tsx)
- [nextjs-app/src/app/career-hub/financial-tips/[slug]/page.tsx](nextjs-app/src/app/career-hub/financial-tips/[slug]/page.tsx)
- [nextjs-app/src/app/interview-questions/[roleSlug]/page.tsx](nextjs-app/src/app/interview-questions/[roleSlug]/page.tsx)
- [nextjs-app/src/app/certifications/[slug]/page.tsx](nextjs-app/src/app/certifications/[slug]/page.tsx)

## P1: Editorial Quality Program

### Requirement

Upgrade the 55 editorial articles to the live quality standard using the existing scoring system rather than ad hoc rewrites.

### Why this matters

The article corpus is the part of the site most exposed to search quality systems and the place where usefulness, trust, and AI extractability are currently weakest.

### Acceptance criteria

- Every article has a keep / refresh / rewrite decision.
- The top 20 highest-priority articles get answer-first intros and better question-led structure.
- Data-accuracy gaps are either sourced, softened, or removed.
- Financial and rights-adjacent content includes clear caveat language.
- Any refreshed article is re-scored against the shared scorer before being considered done.

### Execution rule

Use the live queue in [nextjs-app/docs/CONTENT_SCORE_AUDIT.md](nextjs-app/docs/CONTENT_SCORE_AUDIT.md) instead of picking articles by intuition.

## P2: Template And Schema Governance

### Requirement

Normalize metadata, schema, freshness, and supporting content discipline across article, application-support, persona, seasonal, and long-tail utility templates.

### Why this matters

The flagship page families are stronger than the long tail. Secondary templates are where inconsistency is most likely to erode trust.

### Acceptance criteria

- Shared article templates no longer use runtime `dateModified`.
- Fixed placeholder dates on interview and certification templates are replaced with real dates.
- Resume example, template, cover-letter, and persona pages use a clearer shared schema pattern.
- Secondary pages such as `resources` and `entry-level` meet the site’s own metadata and internal-link expectations.
- Wage-report copy and summary counts reflect the live dataset.

## P3: pSEO Hardening

### Requirement

Keep the current pSEO footprint, improve its uniqueness and trust profile, and block expansion until the quality gate is stronger.

### Why this matters

The current footprint is smaller and more constrained than the stale docs suggested, but it is still large enough to create scaled-content risk if expanded carelessly.

### Acceptance criteria

- City-role coverage remains capped at the current high-value generation set until a stronger uniqueness model is approved.
- The city-role template gets a documented uniqueness plan for the top-priority pages.
- Lower-value secondary pSEO families are triaged rather than expanded blindly.
- Unemployment, salary, persona, and seasonal pages get more context-aware supporting links.

### Decision rule

No net-new pSEO family expansion until the site can clearly demonstrate that current template families are both useful and stable.

## P4: Trust, Psychology, And Conversion

### Requirement

Increase user trust and actionability without sacrificing the site’s people-first posture.

### Why this matters

The Career Hub should feel like a genuinely helpful resource first. Stronger trust and conversion comes from better structure and better timing, not more aggressive product copy.

### Acceptance criteria

- YMYL-adjacent templates clearly show review freshness and source context.
- Role, city, salary, and tool experiences have more purposeful mid-content or result-state CTAs.
- Persona-aware routing is strengthened on relevant role and guide pages.
- Social proof plans are tied to verifiable evidence, not invented counts.

### Candidate improvements

- result-state CTAs on tools
- stronger stage-aware links from content into persona hubs
- expert-reviewed or fact-checked visual patterns on financial and rights content
- worker stories only after sourcing and permissions standards are clear

## P5: Net-New Content And Cluster Expansion

### Requirement

Create the next wave of content only where the site has both a real gap and a sourcing path strong enough to support it.

### Why this matters

The site already has enough breadth to gain from depth and internal coherence before chasing more footprint.

### Acceptance criteria

- Each new opportunity passes the discovery -> research -> strategy sequence.
- No article is drafted from an unsourced brief.
- Worker-rights expansion starts as a hub plus a small state pilot, not a 50-state blast.
- Resume and comparison spokes are prioritized ahead of speculative new pSEO templates.

### Initial brief queue

- `first-job-resume-template`
- `warehouse-resume-guide`
- `hospitality-resume-tips`
- `w-2-vs-1099-temp-workers`
- `worker-rights` hub plus 2-state pilot
- `indeed-flex-vs-instawork`
- `indeed-flex-vs-wonolo`

See [nextjs-app/docs/NEW_CONTENT_BRIEFS_2026.md](nextjs-app/docs/NEW_CONTENT_BRIEFS_2026.md).

## 30 / 60 / 90 Day Rollout

### Day 0-30

- finalize the live audit baseline
- remove dead route patterns and unsupported trust signals
- fix freshness-schema governance
- add canonical coverage to seasonal landers and secondary template gaps
- start article refreshes with the lowest-score and highest-intent content

### Day 31-60

- complete the top 20 article refreshes
- harden the application-support, persona, and interview/certification templates
- define and approve the city-role uniqueness plan
- establish real GSC, AI citation, and product-event baselines

### Day 61-90

- push the article pass-rate well beyond the current baseline
- ship the first net-new spoke articles from approved briefs
- launch the worker-rights hub and small state pilot
- improve tool result-state CTAs and persona-aware internal routing

## Prioritization Matrix

| Priority | Theme | Impact | Effort | Notes |
|---|---|---|---|---|
| P0 | Baseline and credibility cleanup | Very high | Low to medium | Fixes that unblock every later decision |
| P1 | Editorial quality program | Very high | Medium | Biggest direct usefulness and AEO gains |
| P2 | Template and schema governance | High | Medium | Prevents trust drift across families |
| P3 | pSEO hardening | High | Medium to high | Protects the largest scaled page set |
| P4 | Trust and conversion | Medium to high | Medium | Raises app and tool value without becoming salesy |
| P5 | Net-new content | High long-term | Medium to high | Only after current system is cleaner |

## Risks

- The content engine utilities are useful, but not all of them are mature enough to treat as fully productionized audit automation.
- Some earlier internal docs are stale enough that they can still mislead future planning if left unchallenged.
- Tool-schema trust issues can undermine otherwise good SEO work if not cleaned up.
- Rights and tax content can create credibility risk quickly if freshness and expert review discipline are weak.

## Dependencies

- real Search Console and analytics extraction for traffic baselines
- editorial review time for sourcing and claim cleanup
- product or legal input for YMYL-adjacent content where necessary
- source validation before any external or schema-based trust claims are displayed

## Final Recommendation

Treat the next phase as a quality-and-trust program, not a page-launch program.

The site is already broad enough to benefit more from:

- tighter sourcing
- clearer answer-first structure
- fresher and more honest metadata
- stronger internal routing
- disciplined pSEO controls

Once those are in place, the next wave of spokes and comparison pages becomes much more valuable and much less risky.
