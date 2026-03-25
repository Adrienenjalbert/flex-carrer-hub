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
| Real advice count | 4 (BLS, CareerOneStop, 5 temp agencies + 5 staffing apps named, tax-tips link) |
| AI slop red flags | None |
| Citation gaps | Agency/app markets from official sites; SIA/Forbes for agency rankings |
| Verification status | N/A |
| UI/UX | Pass |
| SEO | Pass |
| Target keyword | flexible work options, temp agencies, staffing apps |
| User usefulness | 5 (Named comparison tables: 5 agencies, 5 apps; actionable prep; W-2 vs 1099) |
| User intent | Informational |
| Unique value | Named comparison: Kelly, Manpower, Randstad, Adecco, Express; Indeed Flex, Instawork, Wonolo, Qwick, ShiftSmart |
| Last reviewed | March 2025 |
| Fixes applied | Optimization loop: added 5 temp agencies + 5 staffing apps tables, removed em dashes, 800+ words |

---

## Tier 2: Guides (remaining to be audited)

| Section | Count | Priority |
|---------|-------|----------|
| Guides with pay/rights claims | TBD | High |
| Job application articles | 15 | Medium |
| How-to-become | 24 | Medium |

---

## March 2025: Content Loop Applied to All Guide Articles

Ran the content creation loop across all guide articles in `guides.ts`:

**Fixes applied:**
- **Em dashes:** Replaced all em dashes (—) with commas, colons, or periods per BRAND punctuation rules
- **AI slop phrases:** Removed "when it comes to," "It's not X, it's Y" constructions, "leverage" (replaced with "use")
- **Unverifiable stats:** Softened "85% of warehouse supervisors promoted from within" to "Companies often promote from within"
- **Source attribution:** Added "Indeed Flex data" to worker-profile 40% claim
- **Voice:** Replaced B2B phrasing throughout

**Articles updated:** complete-guide, first-shift, worker-profile, career-paths, skill-boost, certifications, more-shifts, hospitality-guide, warehouse-guide, retail-guide, facilities-guide, networking, resume-tips, interview-skills, multiple-gigs, workplace-success, shift-rating-tips, temp-to-perm-guide, holiday-warehouse-guide, black-friday-hiring, summer-hospitality-guide, student-jobs-fall, event-staffing-guide, tax-season-jobs, i9-complete-guide, i9-documents-list, first-job-america-guide

---

## Changelog

| Date | Change |
|------|--------|
| March 2025 | Created audit template; completed Tier 1 financial articles (8) |
| March 2025 | Added UI/UX, SEO, Target keyword, User usefulness, User intent, Unique value columns to template and Tier 1 entries |
| March 2025 | Rewrote first-flex-job: Flex-only sales pitch → impartial "Finding Flexible Work" guide (temp agencies, staffing apps, gig platforms) |
| March 2025 | Content loop: Removed em dashes and AI slop across all guide articles; softened unverifiable stats; added source attribution |
| March 2025 | Industry guides: Keyword research + BLS data. Hospitality: 2.6M openings, "How to get started," PAA FAQs. Warehouse: picker packer section, BLS $18.12/hr. Retail: interview questions, BLS $16.70. Facilities: BLS $17.27, "What does a custodian do?" |
| March 2025 | Career advice articles: Content loop + keyword research. career-paths: ASA temp stats (90% more employable), BLS $65K food svc mgr, $81K logisticians. skill-boost: BLS forklift $22.41 vs $18.12, sourced pay tables. certifications: WIOA/SNAP free training, food handler $7-25 cost update. resume-tips: ATS guidance, 180+ apps/position stat. interview-skills: 85% behavioral questions stat, LAST method FAQ. networking: 85% jobs via networking, referral 4-5x stats. multiple-gigs: BLS 8.9M record, 5.5% workforce. temp-to-perm: ASA 94% full-time conversion. more-shifts: updated key takeaways. workplace-success: timeline-based takeaways. |
