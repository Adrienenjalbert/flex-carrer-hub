# Content Creation Loop

The recurring system for producing high-quality, engaging, useful, on-brand Career Hub content. Follow this loop for all new content and when existing content "feels light." No ad-hoc prompts required; the docs drive the process.

**References:** [CONTENT_DISCOVERY.md](./CONTENT_DISCOVERY.md), [RESEARCH_PIPELINE.md](./RESEARCH_PIPELINE.md), [BRAND.md](./BRAND.md), [CONTENT_REVIEW_CHECKLIST.md](./CONTENT_REVIEW_CHECKLIST.md)

---

## When to Run

| Trigger | Action |
|---------|--------|
| **New content** | Run full loop (Discovery through Publish) |
| **Content feels light** | Run Discovery + Research, then rewrite with depth |
| **Quarterly planning** | Run Discovery across pillars; prioritize refresh candidates |

---

## Phase 1: Discovery

Run [CONTENT_DISCOVERY.md](./CONTENT_DISCOVERY.md) for the topic area.

| Step | Action |
|------|--------|
| 1 | SEMrush: Check volume and competition for target keywords |
| 2 | Perplexity: "Top questions temp workers ask about [topic]" |
| 3 | Firecrawl: Gap analysis (top SERP results vs our content) |
| 4 | For comparison/options topics: Run [Comparison-Topic Discovery](./CONTENT_DISCOVERY.md#comparison-topic-discovery) |
| 5 | Output: Prioritized topic list with demand signals |

---

## Phase 2: Research

Run [RESEARCH_PIPELINE.md](./RESEARCH_PIPELINE.md). Source first, write second.

| Content type | Research steps |
|--------------|----------------|
| Financial/YMYL | IRS, DOL, BLS, state agencies only |
| Pay/rights | BLS OEWS, state labor, wage-report methodology |
| Career/how-to | BLS OOH, O*NET, research-templates.ts |
| **Comparison/options** | Perplexity (named list + citations), Firecrawl (2-3 sites), BLS/SIA or official |

Output: Source log with URLs and dates. For comparison articles: named list (5+ options) with markets, pay type, industries.

---

## Phase 3: Write

Follow [BRAND.md](./BRAND.md): CRAFT, Article Structure, Real Advice.

| Requirement | Reference |
|-------------|-----------|
| Depth (comparison articles) | 5+ named options; no "and others" |
| Punctuation | No em dashes; use comma, colon, or parentheses |
| Phrasing | No "delve", "navigate", "when it comes to", "in today's" |
| Length | Comparison articles: 800-1,200 words minimum |

---

## Phase 4: Review

Run [CONTENT_REVIEW_CHECKLIST.md](./CONTENT_REVIEW_CHECKLIST.md) before publish.

| Check | Pass if |
|-------|---------|
| Research | Every claim traced to Tier 1-4 source |
| Brand | Real Advice score 2+; no AI slop |
| Depth (comparison) | 5+ named options with markets, pay, industries |
| Punctuation | No em dashes; no AI opener phrases |
| UI/UX | Layout, scannability, accessibility |
| SEO | Title, meta, H1, first 100 words, structured data |

---

## Phase 5: Publish

- Add "Last reviewed" date to article
- Log in [CONTENT_AUDIT.md](./CONTENT_AUDIT.md) with all columns
- Add to sitemap if new page

---

## Loop Diagram

```mermaid
flowchart TD
    subgraph trigger [Trigger]
        T1[New content]
        T2[Content feels light]
        T3[Quarterly planning]
    end
    
    subgraph discovery [Discovery]
        D1[SEMrush: volume + competition]
        D2[Perplexity: top questions]
        D3[Firecrawl: gap analysis]
        D4[Prioritized topic list]
    end
    
    subgraph research [Research]
        R1{Content type?}
        R2[Primary sources: BLS, IRS, DOL]
        R3[Comparison: Perplexity + Firecrawl named options]
        R4[Source log + citations]
    end
    
    subgraph write [Write]
        W1[BRAND + CRAFT + structure]
        W2[Depth rules: named examples]
        W3[No AI-ish punctuation]
    end
    
    subgraph review [Review]
        V1[CONTENT_REVIEW_CHECKLIST]
        V2[Depth check for comparisons]
    end
    
    T1 --> D1
    T2 --> D1
    T3 --> D1
    D1 --> D2 --> D3 --> D4
    D4 --> R1
    R1 -->|Financial/Pay| R2
    R1 -->|Comparison/Options| R3
    R2 --> R4
    R3 --> R4
    R4 --> W1 --> W2 --> W3
    W3 --> V1 --> V2
```
