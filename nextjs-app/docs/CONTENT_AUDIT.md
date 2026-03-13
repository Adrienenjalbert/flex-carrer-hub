# Content Audit Log

Living audit of Career Hub content. Review one article at a time. Apply [BRAND.md](./BRAND.md) Real Advice Standards and [RESEARCH_PIPELINE.md](./RESEARCH_PIPELINE.md).

**Process per article:**
1. Read full content
2. Run Real Advice Checklist — score 0–5
3. Run AI Slop Red Flags — list any found
4. Citation audit — every number/claim needs Tier 1–4 source
5. Log below
6. If financial/YMYL: add to verification queue
7. Apply fixes

---

## Audit Template (copy for each article)

| Field | Value |
|-------|-------|
| File path | |
| Slug | |
| Title | |
| Content type | financial / guide / job-app / how-to / other |
| Real advice count | 0–5 |
| AI slop red flags | |
| Citation gaps | |
| Verification status | Pending / In progress / Verified |
| UI/UX | Pass / Issues |
| SEO | Pass / Issues |
| Target keyword | |
| User usefulness | 1–5 or Pass/Issues |
| User intent | Informational / Transactional / Navigational |
| Unique value | One-line summary |
| Last reviewed | |
| Fixes applied | |

---

## Tier 1: Financial Articles

### irregular-income-budget

| Field | Value |
|-------|-------|
| File path | `src/lib/data/articles/financial-tips.ts` |
| Slug | irregular-income-budget |
| Title | Budgeting for Irregular Income |
| Content type | financial |
| Real advice count | 3 (Pay Calculator link, 211.org, Stride/YNAB with specifics) |
| AI slop red flags | "smooths your income fluctuations" in Step 3 — minor B2B phrasing |
| Citation gaps | "$2,000/$3,500" example — illustrative only, OK. "4-5% APY" for Ally/Marcus — add "rates vary, check current rates at bank websites". "30% less in January" — add "if that's your pattern" (observation, not statistic) |
| Verification status | Pending |
| UI/UX | TBD |
| SEO | TBD |
| Target keyword | TBD |
| User usefulness | TBD |
| User intent | Informational |
| Unique value | TBD |
| Last reviewed | March 2025 |
| Fixes applied | Add APY rate caveat; soften "30% less" as pattern; "buffer smooths" → "buffer helps when wages vary" |

### emergency-fund-guide

| Field | Value |
|-------|-------|
| File path | `src/lib/data/articles/financial-tips.ts` |
| Slug | emergency-fund-guide |
| Title | Building an Emergency Fund on Gig Income |
| Content type | financial |
| Real advice count | 4 (211.org, $1,000 milestone with math, Pay Calculator, Ally/Marcus/Discover links) |
| AI slop red flags | None after optimization |
| Citation gaps | "4-5% APY" — add "as of 2025; rates change—check bank websites". "3-6 months" / "4-6 months" — standard CFP advice, acceptable |
| Verification status | Pending |
| UI/UX | TBD |
| SEO | TBD |
| Target keyword | TBD |
| User usefulness | TBD |
| User intent | Informational |
| Unique value | TBD |
| Last reviewed | March 2025 |
| Fixes applied | Add APY rate caveat; "your money should work too" → "rates vary; check bank websites" |

### tax-tips

| Field | Value |
|-------|-------|
| File path | `src/lib/data/articles/financial-tips.ts` |
| Slug | tax-tips |
| Title | Tax Tips for Flexible Workers |
| Content type | financial |
| Real advice count | 5 (IRS VITA with phone, IRS Free File, 70¢/mile 2026, 15.3% self-employment, IRS Direct Pay, EFTPS) |
| AI slop red flags | None |
| Citation gaps | 70¢/mile 2026 — verify against [IRS](https://www.irs.gov/tax-professionals/standard-mileage-rates). $67,000 VITA, $84,000 Free File — verify IRS thresholds. 15.3% self-employment tax — IRS |
| Verification status | Pending US payroll/tax specialist |
| UI/UX | TBD |
| SEO | TBD |
| Target keyword | TBD |
| User usefulness | TBD |
| User intent | Informational |
| Unique value | TBD |
| Last reviewed | March 2025 |
| Fixes applied | Verification note added; IRS link for mileage rate verification |

### between-shifts

| Field | Value |
|-------|-------|
| File path | `src/lib/data/articles/financial-tips.ts` |
| Slug | between-shifts |
| Title | Managing Money Between Shifts |
| Content type | financial |
| Real advice count | 4 (211.org, SNAP, IRS VITA, CareerOneStop, certification table with costs) |
| AI slop red flags | None after optimization |
| Citation gaps | Certification costs ($60-150 forklift, etc.) — verify against provider sites or add "costs vary by provider" |
| Verification status | Pending |
| UI/UX | TBD |
| SEO | TBD |
| Target keyword | TBD |
| User usefulness | TBD |
| User intent | Informational |
| Unique value | TBD |
| Last reviewed | March 2025 |
| Fixes applied | Added "costs vary by provider" / "costs vary" to certification table |

### gig-benefits

| Field | Value |
|-------|-------|
| File path | `src/lib/data/articles/financial-tips.ts` |
| Slug | gig-benefits |
| Title | Benefits and Insurance Options |
| Content type | financial |
| Real advice count | 4 (healthcare.gov, Medicaid, IRS limits for IRA, Freelancers Union) |
| AI slop red flags | None after optimization |
| Citation gaps | IRA limits $7,000/$8,000 — verify [IRS](https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-ira-contribution-limits). ACA open enrollment dates — verify healthcare.gov |
| Verification status | Pending US HR/payroll |
| UI/UX | TBD |
| SEO | TBD |
| Target keyword | TBD |
| User usefulness | TBD |
| User intent | Informational |
| Unique value | TBD |
| Last reviewed | March 2025 |
| Fixes applied | Verification note added; Indeed Flex Benefits section integrated |

### retirement-saving

| Field | Value |
|-------|-------|
| File path | `src/lib/data/articles/financial-tips.ts` |
| Slug | retirement-saving |
| Title | Retirement Saving for Gig Workers |
| Content type | financial |
| Real advice count | 4 (Fidelity/Schwab/Vanguard links, IRA limits, 7% return assumption stated, target-date funds) |
| AI slop red flags | None |
| Citation gaps | "$7,000 ($8,000 if 50+)" — add "2024 limit; IRS adjusts annually". "$69,000" Solo 401k — same. "7% average annual return" — already caveated in table |
| Verification status | Pending US tax/pension specialist |
| UI/UX | TBD |
| SEO | TBD |
| Target keyword | TBD |
| User usefulness | TBD |
| User intent | Informational |
| Unique value | TBD |
| Last reviewed | March 2025 |
| Fixes applied | Verification note added; IRS link and "IRS adjusts annually" for IRA/Solo 401k/SEP-IRA limits |

### government-resources

| Field | Value |
|-------|-------|
| File path | `src/lib/data/articles/financial-tips.ts` |
| Slug | government-resources |
| Title | Free Government Resources for Gig Workers |
| Content type | financial |
| Real advice count | 5 (211.org, SNAP eligibility link, IRS VITA with phone, CareerOneStop, Benefits.gov, healthcare.gov) |
| AI slop red flags | None |
| Citation gaps | "$67,000" VITA — IRS. "$84,000" Free File — IRS. "~$200/month" SNAP — USDA average; add "varies by household" |
| Verification status | Pending |
| UI/UX | TBD |
| SEO | TBD |
| Target keyword | TBD |
| User usefulness | TBD |
| User intent | Informational |
| Unique value | TBD |
| Last reviewed | March 2025 |
| Fixes applied | None needed; strong official links |

### maximize-indeed-flex

| Field | Value |
|-------|-------|
| File path | `src/lib/data/articles/financial-tips.ts` |
| Slug | maximize-indeed-flex |
| Title | How to Maximize Indeed Flex Earnings |
| Content type | platform-specific (Indeed Flex) |
| Real advice count | 4 (platform-specific tips, Same Day Pay, certification table, Talent Pools) |
| AI slop red flags | None; article is appropriately platform-focused |
| Citation gaps | Certification pay increases (+$3-5/hr etc) — consider "typical range" or BLS/O*NET. Platform features — Indeed Flex internal |
| Verification status | N/A (platform content) |
| UI/UX | TBD |
| SEO | TBD |
| Target keyword | TBD |
| User usefulness | TBD |
| User intent | Informational |
| Unique value | TBD |
| Last reviewed | March 2025 |
| Fixes applied | N/A |

---

## Verification Queue

| Article | Verification needed | Status |
|---------|---------------------|--------|
| tax-tips | US payroll/tax specialist | Pending |
| gig-benefits | US HR/payroll | Pending |
| retirement-saving | US tax/pension specialist | Pending |

---

## Tier 2: Guides

### first-flex-job

| Field | Value |
|-------|-------|
| File path | `src/lib/data/articles/guides.ts` |
| Slug | first-flex-job |
| Title | Finding Flexible Work: Your Options Explained |
| Content type | guide |
| Real advice count | 3 (BLS contingent work data, CareerOneStop, tax-tips link) |
| AI slop red flags | None |
| Citation gaps | BLS link added; pay ranges from wage-report methodology |
| Verification status | N/A |
| UI/UX | Pass |
| SEO | Pass |
| Target keyword | flexible work options, temp agencies, staffing apps |
| User usefulness | 4 — Impartial comparison, actionable prep steps, W-2 vs 1099 clarity |
| User intent | Informational |
| Unique value | Impartial overview of options (temp agencies, apps, gig) with Flex as one choice |
| Last reviewed | March 2025 |
| Fixes applied | Full rewrite: Flex-only sales pitch → impartial guide to flexible work options per BRAND North Star |

---

## Tier 2: Guides (remaining to be audited)

| Section | Count | Priority |
|---------|-------|----------|
| Guides with pay/rights claims | TBD | High |
| Job application articles | 15 | Medium |
| How-to-become | 24 | Medium |

---

## Changelog

| Date | Change |
|------|--------|
| March 2025 | Created audit template; completed Tier 1 financial articles (8) |
| March 2025 | Added UI/UX, SEO, Target keyword, User usefulness, User intent, Unique value columns to template and Tier 1 entries |
| March 2025 | Rewrote first-flex-job: Flex-only sales pitch → impartial "Finding Flexible Work" guide (temp agencies, staffing apps, gig platforms) |
