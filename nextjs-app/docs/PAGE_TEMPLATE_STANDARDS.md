# Page Template Standards

This document defines the required elements and structure for all pages in the Career Hub to ensure consistency, SEO optimization, and excellent user experience.

## Required Elements

### 1. Metadata (All Pages)

Every page MUST have complete metadata in the `generateMetadata` function or `metadata` export:

```typescript
export const metadata: Metadata = {
  title: "Page Title | Indeed Flex Career Hub", // 50-60 chars
  description: "Compelling description that includes primary keyword. 150-160 characters.", // 150-160 chars
  keywords: ["keyword1", "keyword2", "keyword3"], // 5-10 relevant keywords
  alternates: {
    canonical: "https://indeedflex.com/career-hub/page-slug",
  },
  openGraph: {
    title: "Page Title",
    description: "OG description",
    url: "https://indeedflex.com/career-hub/page-slug",
    type: "website",
    images: [
      {
        url: "https://indeedflex.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Image description",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Page Title",
    description: "Twitter description",
  },
};
```

### 2. Structured Data (All Pages)

Minimum required schemas:

- **WebPageSchema**: All pages
- **BreadcrumbSchema**: All pages (except homepage)

Additional schemas by page type:

- **ArticleSchema**: Article/guide pages
- **FAQSchema**: Pages with FAQ sections
- **OccupationSchema**: Role pages
- **SoftwareApplicationSchema**: Tool pages
- **LocalBusinessSchema**: City/location pages (if applicable)
- **HowToSchema**: How-to guides

### 3. Breadcrumbs

**Required on**: All pages except homepage (`/` and `/career-hub`)

```typescript
<Breadcrumbs
  items={[
    { label: "Section", href: "/career-hub/section" },
    { label: "Current Page" },
  ]}
/>
```

### 4. H1 Heading

- **One H1 per page** (matches page title)
- **Must match or closely align with page title**
- **Should include primary keyword**

### 5. Content Depth

Minimum word counts:

- **Index pages**: 200+ words
- **Detail pages**: 300+ words
- **Article pages**: 500+ words
- **Tool pages**: 200+ words (excluding tool UI)

### 6. InternalLinkHub

**Required on**: All pages

```typescript
<InternalLinkHub
  variant="full" // or "sidebar" for detail pages
  currentPage={{ type: "page-type", ...context }}
/>
```

### 7. CTASection

**Recommended on**: All pages

```typescript
<CTASection
  title="Ready to Find Your Next Shift?"
  subtitle="Download the Indeed Flex app..."
/>
```

## Page Type Templates

### Index Pages

Example: `/career-hub/roles`, `/career-hub/tools`

**Required Elements:**
- [ ] PageHero with stats
- [ ] Breadcrumbs
- [ ] Content grid/list
- [ ] InternalLinkHub (full variant)
- [ ] CTASection

**Template:**
```typescript
export default function IndexPage() {
  return (
    <>
      <StandardPageLayout
        breadcrumbs={[{ label: "Section Name" }]}
        usePageHero={true}
        pageHeroProps={{
          title: "Page Title",
          description: "Page description",
          stats: [
            { value: "47", label: "Total Items" },
          ],
        }}
        currentPage={{ type: "generic" }}
        internalLinkHubVariant="full"
      >
        {/* Content grid/list */}
      </StandardPageLayout>
    </>
  );
}
```

### Detail Pages

Example: `/career-hub/roles/[slug]`, `/career-hub/cities/[slug]`

**Required Elements:**
- [ ] Breadcrumbs
- [ ] H1 header
- [ ] Rich content (min 300 words)
- [ ] FAQ section (if applicable)
- [ ] Related content
- [ ] InternalLinkHub (sidebar variant)
- [ ] CTASection
- [ ] Structured data (ArticleSchema, FAQSchema, etc.)

**Template:**
```typescript
export default function DetailPage({ params }) {
  return (
    <>
      {/* Structured Data */}
      <ArticleSchema {...} />
      <FAQSchema questions={faqs} />
      <BreadcrumbSchema items={breadcrumbs} />

      <StandardPageLayout
        breadcrumbs={[
          { label: "Section", href: "/career-hub/section" },
          { label: "Current Page" },
        ]}
        customHeader={<h1>Page Title</h1>}
        currentPage={{ type: "detail", ...context }}
        internalLinkHubVariant="sidebar"
      >
        {/* Main content */}
        {/* FAQ section */}
        {/* Related content */}
      </StandardPageLayout>
    </>
  );
}
```

### Tool Pages

Example: `/career-hub/tools/[toolSlug]`

**Required Elements:**
- [ ] Breadcrumbs
- [ ] Tool description/intro
- [ ] Interactive tool component
- [ ] How-to-use section
- [ ] Related tools
- [ ] InternalLinkHub
- [ ] SoftwareApplicationSchema

**Template:**
```typescript
export default function ToolPage({ params }) {
  return (
    <>
      <SoftwareApplicationSchema {...} />
      <BreadcrumbSchema items={breadcrumbs} />

      <StandardPageLayout
        breadcrumbs={[
          { label: "Tools", href: "/career-hub/tools" },
          { label: "Tool Name" },
        ]}
        currentPage={{ type: "tool", slug: tool.slug }}
        internalLinkHubVariant="sidebar"
      >
        {/* Tool intro */}
        {/* Tool component */}
        {/* How-to-use */}
        {/* Related tools */}
      </StandardPageLayout>
    </>
  );
}
```

### Article Pages

Example: `/career-hub/guides/[slug]`, `/career-hub/financial-tips/[slug]`

**Required Elements:**
- [ ] ArticleSchema
- [ ] BreadcrumbSchema
- [ ] FAQSchema (if applicable)
- [ ] Breadcrumbs
- [ ] H1
- [ ] Article content (min 500 words)
- [ ] InternalLinkHub
- [ ] CTASection

## Heading Hierarchy

```
H1: Page Title (one per page)
├── H2: Major Section
│   ├── H3: Subsection
│   └── H3: Subsection
├── H2: Another Section
│   ├── H3: Subsection
│   └── H3: Subsection
└── H2: FAQ Section
    ├── H3: Question 1
    └── H3: Question 2
```

## Brand Voice Guidelines

- **Tone**: Helpful, professional, approachable
- **Style**: Clear, concise, actionable
- **Examples**: Real-world, relatable
- **CTAs**: Action-oriented, benefit-focused

## Internal Linking

- **Minimum**: 3-5 contextual internal links per page
- **Anchor text**: Descriptive, keyword-rich
- **Context**: Link to related content naturally
- **Use**: InternalLinkHub component for consistent placement

## Quality Checklist

Before publishing any page, verify:

- [ ] Complete metadata (title, description, OpenGraph, Twitter, canonical)
- [ ] Appropriate structured data schemas
- [ ] Breadcrumbs (if not homepage)
- [ ] One H1 per page
- [ ] Minimum word count met
- [ ] InternalLinkHub included
- [ ] CTASection included
- [ ] Proper heading hierarchy
- [ ] No broken internal links
- [ ] Images have alt text
- [ ] Mobile responsive

## Using StandardPageLayout

The `StandardPageLayout` component enforces these standards:

```typescript
import StandardPageLayout from "@/components/career-hub/StandardPageLayout";

export default function MyPage() {
  return (
    <StandardPageLayout
      breadcrumbs={[{ label: "Section" }, { label: "Page" }]}
      usePageHero={true}
      pageHeroProps={{
        title: "Page Title",
        description: "Description",
      }}
      currentPage={{ type: "page-type" }}
      showInternalLinkHub={true}
      showCTASection={true}
    >
      {/* Your content */}
    </StandardPageLayout>
  );
}
```

## Migration Guide

When updating existing pages:

1. Add missing metadata
2. Add structured data schemas
3. Add breadcrumbs (if missing)
4. Ensure H1 is present and unique
5. Add InternalLinkHub
6. Add CTASection
7. Verify content depth
8. Check heading hierarchy
9. Test on mobile
10. Run audit script

