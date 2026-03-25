# Content Optimization Process

A repeatable workflow for reviewing and improving Career Hub content based on feedback. Use this process across all sections (financial tips, guides, etc.).

**References:** [BRAND.md](./BRAND.md), [CONTENT_CREATION_LOOP.md](./CONTENT_CREATION_LOOP.md), [CONTENT_DISCOVERY.md](./CONTENT_DISCOVERY.md), [CONTENT_REVIEW_CHECKLIST.md](./CONTENT_REVIEW_CHECKLIST.md)

---

## Phase 0: Discovery (New Content Only)

Before creating new content, run the full [CONTENT_CREATION_LOOP.md](./CONTENT_CREATION_LOOP.md):

| Step | Action |
|------|--------|
| 1 | Run [CONTENT_DISCOVERY.md](./CONTENT_DISCOVERY.md) for the topic area |
| 2 | Use **SEMrush** (`semrush-keyword` Edge Function) to check volume and competition for target keywords |
| 3 | Use Perplexity for "top questions temp workers ask"; Firecrawl for competitor/gap analysis |
| 4 | For comparison topics: Run Comparison-Topic Discovery (Perplexity + Firecrawl for named options) |
| 5 | Prioritize: demand (SEMrush volume/PAA) + gap (we don't cover it) + fit (Career Hub pillars) |
| 6 | Proceed to [RESEARCH_PIPELINE.md](./RESEARCH_PIPELINE.md) (source first) |

**Triggers:** New section, "content feels light" feedback (routes to full loop: Discovery + Research + Write), quarterly planning, low engagement on a topic.

---

## Phase 1: Audit

Map feedback to specific content locations.

| Step | Action |
|------|--------|
| 1 | Collect feedback (copywriter, user testing, analytics) |
| 2 | For each feedback item, identify: file path, section, line/block |
| 3 | Create a feedback log with location + suggested change |

**Example:**
```
Feedback: "Avoid B2B language like 'stay agile'"
Location: financial-tips.ts → irregular-income-budget → keyTakeaways[3]
Current: "Track expenses weekly, not monthly, to stay agile"
Change: "Track expenses weekly, not monthly, to keep on top of things"
```

---

## Phase 2: Categorize

Group edits by type for consistent application:

| Category | Examples | Reference |
|----------|----------|-----------|
| **Voice/language** | B2B terms, verbose phrasing, AI-style comparisons | BRAND Readability, Voice Pillars |
| **Factual verification** | Tax, benefits, retirement claims | Four-Source Rule, E-E-A-T |
| **Structure** | Article overlap, heading hierarchy | BRAND Article Structure, CRAFT |
| **Indeed Flex placement** | Shoehorning, mercenary CTAs | BRAND North Star |
| **Audience mismatch** | UK vs US, freelancer vs temp worker | BRAND Scope (US-first, temp workers) |
| **Unclear terms** | Jargon without definition | BRAND Readability Rules |
| **Unrealistic targets** | Savings goals without time period | BRAND Honest & Grounded |
| **Overly negative framing** | Fear-based lists | BRAND Empowering & Enabling |
| **UI/UX** | Layout, scannability, accessibility, CTAs | [CONTENT_REVIEW_CHECKLIST.md](./CONTENT_REVIEW_CHECKLIST.md) |
| **SEO** | Title, meta, H1, first 100 words, structured data | [SEO.md](./SEO.md) |
| **User usefulness** | Job-to-be-done, intent match, actionable outcome | [CONTENT_REVIEW_CHECKLIST.md](./CONTENT_REVIEW_CHECKLIST.md) |
| **Depth** | Comparison articles: 5+ named options, no "and others" | [BRAND.md](./BRAND.md) Depth Requirements |
| **AI-ish punctuation** | No em dashes; no "delve", "navigate", "when it comes to" | [BRAND.md](./BRAND.md) Punctuation and Phrasing |

---

## Phase 3: Apply

Make edits following BRAND guidelines:

1. **One category at a time** — e.g. do all voice/language edits first
2. **Preserve factual content** — optimize wording, don't change meaning without verification
3. **Check CRAFT** — each edit should improve Context, Real, Actionable, Fresh, or Trustworthy
4. **No new content** — optimization only unless explicitly scoped

---

## Phase 4: Verification

Flag content needing specialist review:

| Article | Verification needed | Status |
|---------|---------------------|--------|
| tax-tips | US payroll/tax specialist | Pending |
| gig-benefits | US HR/payroll | Pending |
| retirement-saving | US tax/pension specialist | Pending |

**Add verification notes** in content when specialist review is pending:
- "This guide provides general information. Tax rules vary by state and situation. Consider having a US tax professional or payroll specialist review your specific case."

---

## Phase 5: Document

- Add "Last reviewed" date to articles when updated
- Update CONTENT_OPTIMIZATION.md verification table when specialists complete review
- Add feedback-derived rules to BRAND.md when patterns emerge
- Log in [CONTENT_AUDIT.md](./CONTENT_AUDIT.md) with UI/UX, SEO, User usefulness columns

---

## Before Publish: Full Review

Run [CONTENT_REVIEW_CHECKLIST.md](./CONTENT_REVIEW_CHECKLIST.md) before publishing any content. Covers Research, Brand, UI/UX, SEO, User usefulness, and Factual verification.

---

## Feedback Categories (from Nicholas Kira)

| Category | Examples |
|----------|----------|
| B2B/verbose language | "smooth income fluctuations", "stay agile", "Market fluctuations", "High-ROI" |
| AI-style comparisons | "It's not X—it's Y" constructions |
| Indeed Flex shoehorning | Mercenary CTAs, leading with Flex benefits |
| Audience mismatch | UK freelancer advice vs US temp workers |
| Factual verification | Tax, benefits, retirement need US specialist |
| Unclear terms | "Automate savings" needs definition |
| Unrealistic targets | $10k–15k emergency fund without time period |
| Overly negative framing | "Why Gig Workers Need Emergency Funds More" list |
