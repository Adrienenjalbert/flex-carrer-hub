# Editorial Article Audit — March 2026

> Scope: all 55 editorial articles currently defined in the three article data files.
>
> Source files: [nextjs-app/src/lib/data/articles/guides.ts](nextjs-app/src/lib/data/articles/guides.ts), [nextjs-app/src/lib/data/articles/financial-tips.ts](nextjs-app/src/lib/data/articles/financial-tips.ts), and [nextjs-app/src/lib/data/articles/job-application-articles.ts](nextjs-app/src/lib/data/articles/job-application-articles.ts).
>
> Method: live scoring via the shared quality scorer in [nextjs-app/src/lib/content-engine/quality-scorer.ts](nextjs-app/src/lib/content-engine/quality-scorer.ts). Threshold: `80+` counts as genuinely ready under the project’s current editorial bar.

## Executive Summary

The article corpus is broad and strategically useful, but it is not yet consistently publish-ready under the site’s own standards. The good news is that the weak points are systematic, not random:

- AEO is the dominant failure mode.
- Data accuracy is the second-biggest drag, especially where claims are useful but not fully sourced.
- Keyword fields are already populated, so future work should stop treating metadata setup as the main blocker.
- Most articles do not need full rewrites. They need targeted editorial passes: answer-first intros, stronger question-led structure, visible sourcing, and fresher metadata discipline.

## Corpus Summary

| Group | Count | Avg Score | Notes |
|---|---:|---:|---|
| Guides | 31 | 72 | Strong topical coverage, weakest on AEO and data freshness honesty. |
| Financial tips | 8 | 70 | Useful and practical, but still inconsistent on structured sourcing and intro format. |
| Job application | 16 | 72 | Strong query targeting, weaker on citation rigor and “best answer” differentiation. |
| Total | 55 | 72 | Only 5 articles currently clear the 80+ threshold. |

## Cross-Cutting Article Findings

### What is working

- The article system now has `primaryKeyword` and `searchIntent` coverage across the live corpus.
- Most articles already match a real search intent and have enough structural depth to improve without a rewrite from scratch.
- The corpus is strategically aligned with the main Career Hub pillars: getting started, job application, pay and money, work authorization, and career growth.

### What is failing most often

- **AEO:** direct answers are still too weak or too delayed, especially in intros.
- **Data accuracy:** many articles are useful but undersourced.
- **SEO value:** titles and descriptions exist, but many still underperform the target ranges or fail to maximize intent clarity.
- **Readability:** long sentences and dense passages remain common in guides and legal/eligibility content.

## Highest-Priority Article Fixes

| Slug | Why It Rises To The Top |
|---|---|
| `interview-skills` | Lowest live score. Needs major AEO and sourcing work despite strong topic relevance. |
| `government-resources` | Useful topic, but underperforms on SEO and AEO relative to its value. |
| `i9-complete-guide` | Important trust and eligibility content with weak data and AEO signals. |
| `i9-documents-list` | High-intent legal/eligibility content with especially weak answer extraction. |
| `work-authorization-types` | Important but not structured clearly enough for either users or AI extraction. |
| `worker-profile` | High-value platform help content that still underperforms on answer-first structure. |
| `holiday-warehouse-guide` | Strong seasonal intent, but needs better AEO and tone consistency. |
| `ats-resume-tips` | Strong demand, but still weak on data credibility. |
| `gig-benefits` | Important YMYL-adjacent topic that needs stronger sourcing and clearer up-front answers. |
| `first-shift` | Foundational onboarding page that should be a flagship answer-first asset but is not there yet. |

## Full Article Queue

| Type | Slug | Score | Action | Weakest Dimensions |
|---|---|---:|---|---|
| Guide | `interview-skills` | 62 | `minor-edits` | AEO 43; Data 45 |
| Financial | `government-resources` | 62 | `minor-edits` | SEO 41; AEO 51 |
| Guide | `i9-complete-guide` | 63 | `minor-edits` | Data 45; AEO 52 |
| Guide | `i9-documents-list` | 63 | `minor-edits` | AEO 26; Data 45 |
| Guide | `work-authorization-types` | 64 | `minor-edits` | AEO 21; SEO 63 |
| Financial | `irregular-income-budget` | 65 | `minor-edits` | Data 45; AEO 63 |
| Guide | `worker-profile` | 66 | `minor-edits` | AEO 39; SEO 61 |
| Guide | `holiday-warehouse-guide` | 66 | `minor-edits` | AEO 36; Brand 58 |
| Guide | `e-verify-explained` | 66 | `minor-edits` | AEO 32; Data 45 |
| Financial | `emergency-fund-guide` | 67 | `minor-edits` | Usefulness 50; AEO 68 |
| JobApp | `warehouse-interview-questions` | 67 | `minor-edits` | Data 45; Usefulness 57 |
| JobApp | `hospitality-interview-questions` | 67 | `minor-edits` | Data 45; Usefulness 52 |
| Guide | `black-friday-hiring` | 68 | `minor-edits` | AEO 38; SEO 59 |
| Financial | `gig-benefits` | 68 | `minor-edits` | AEO 35; Usefulness 63 |
| JobApp | `ats-resume-tips` | 68 | `minor-edits` | Data 45; Usefulness 66 |
| Guide | `first-shift` | 69 | `minor-edits` | AEO 42; SEO 45 |
| Guide | `shift-rating-tips` | 69 | `minor-edits` | AEO 43; Usefulness 56 |
| Guide | `student-jobs-fall` | 69 | `minor-edits` | AEO 34; Brand 59 |
| JobApp | `chronological-vs-functional` | 69 | `minor-edits` | Usefulness 58; Data 60 |
| JobApp | `canva-resume-builder-ats` | 69 | `minor-edits` | Usefulness 51; AEO 62 |
| JobApp | `temp-to-permanent-guide` | 70 | `minor-edits` | SEO 56; AEO 63 |
| Guide | `retail-guide` | 71 | `minor-edits` | AEO 44; Data 61 |
| Guide | `first-job-america-guide` | 71 | `minor-edits` | AEO 43; Data 45 |
| JobApp | `student-resume-template` | 71 | `minor-edits` | AEO 61; UX 63 |
| JobApp | `indeed-flex-vs-staffing-agencies` | 71 | `minor-edits` | Data 45; SEO 65 |
| Guide | `facilities-guide` | 72 | `minor-edits` | AEO 56; Usefulness 70 |
| Guide | `event-staffing-guide` | 72 | `minor-edits` | AEO 32; Data 60 |
| Guide | `work-without-ssn` | 72 | `minor-edits` | AEO 50; SEO 53 |
| Financial | `maximize-indeed-flex` | 72 | `minor-edits` | AEO 43; Data 65 |
| JobApp | `fresher-resume-guide` | 72 | `minor-edits` | Data 60; SEO 70 |
| JobApp | `transferable-skills-guide` | 72 | `minor-edits` | Brand 53; SEO 57 |
| JobApp | `reverse-chronological-resume` | 72 | `minor-edits` | Data 62; SEO 67 |
| Guide | `multiple-gigs` | 73 | `minor-edits` | Data 37; AEO 64 |
| Financial | `retirement-saving` | 73 | `minor-edits` | AEO 40; Data 63 |
| Guide | `skill-boost` | 74 | `minor-edits` | Data 40; SEO 71 |
| Guide | `certifications` | 74 | `minor-edits` | Data 45; SEO 64 |
| Guide | `warehouse-guide` | 74 | `minor-edits` | Data 63; SEO 66 |
| Guide | `summer-hospitality-guide` | 74 | `minor-edits` | AEO 28; Data 60 |
| JobApp | `best-resume-builders-2026` | 74 | `minor-edits` | AEO 49; Data 64 |
| Guide | `complete-guide` | 75 | `minor-edits` | Data 45; SEO 65 |
| Guide | `hospitality-guide` | 75 | `minor-edits` | Data 53; SEO 67 |
| Guide | `tax-season-jobs` | 75 | `minor-edits` | AEO 18; SEO 61 |
| Financial | `between-shifts` | 75 | `minor-edits` | AEO 33; Usefulness 72 |
| Financial | `tax-tips` | 76 | `minor-edits` | SEO 53; AEO 63 |
| Guide | `first-flex-job` | 77 | `minor-edits` | Data 60; AEO 71 |
| Guide | `workplace-success` | 77 | `minor-edits` | SEO 50; Usefulness 70 |
| JobApp | `best-job-boards-2026` | 77 | `minor-edits` | AEO 46; Usefulness 68 |
| Guide | `career-paths` | 79 | `minor-edits` | AEO 70; Data 71 |
| Guide | `temp-to-perm-guide` | 79 | `minor-edits` | SEO 59; AEO 71 |
| JobApp | `zety-alternative` | 79 | `minor-edits` | Data 45; SEO 73 |
| Guide | `networking` | 80 | `none` | SEO 61; UX 63 |
| JobApp | `zero-experience-jobs` | 80 | `none` | SEO 61; AEO 68 |
| Guide | `resume-tips` | 81 | `none` | Data 73; UX 74 |
| JobApp | `resume-genius-alternative` | 81 | `none` | Data 60; SEO 73 |
| Guide | `more-shifts` | 83 | `none` | AEO 75; Data 80 |

## What To Do With This Queue

1. Start with the lowest-score articles that are also strategically central: onboarding, work authorization, high-intent resume guidance, and financial stability content.
2. Treat AEO work as the default intervention, not a nice-to-have.
3. Use data-accuracy passes to decide whether a stat should be sourced, softened, or removed.
4. Hold net-new article creation until the weakest cluster articles are no longer dragging the overall quality baseline down.

## Related Deliverables

- Full site findings: [nextjs-app/docs/SITE_AUDIT_2026.md](nextjs-app/docs/SITE_AUDIT_2026.md)
- Non-article asset backlog: [nextjs-app/docs/CONTENT_ASSET_BACKLOG_2026.md](nextjs-app/docs/CONTENT_ASSET_BACKLOG_2026.md)
- Improvement roadmap: [nextjs-app/docs/SITE_IMPROVEMENT_PRD.md](nextjs-app/docs/SITE_IMPROVEMENT_PRD.md)
- Net-new opportunity briefs: [nextjs-app/docs/NEW_CONTENT_BRIEFS_2026.md](nextjs-app/docs/NEW_CONTENT_BRIEFS_2026.md)
