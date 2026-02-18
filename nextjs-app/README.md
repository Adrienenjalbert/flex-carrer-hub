# Indeed Flex Career Hub

A Next.js 14 SEO-optimized career platform for flexible work opportunities.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
nextjs-app/
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── career-hub/           # Career hub section
│   │   │   ├── cities/           # City-specific pages
│   │   │   ├── locations/        # Location pages
│   │   │   ├── roles/            # Role detail pages
│   │   │   ├── guides/           # Career guides
│   │   │   └── tools/            # Interactive tools
│   │   ├── certifications/       # Certification guides
│   │   ├── how-to-become/        # Career path guides
│   │   ├── interview-questions/  # Interview prep
│   │   ├── paycheck-calculator/  # State tax calculators
│   │   ├── unemployment-benefits/# Unemployment guides
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Homepage
│   │   ├── sitemap.ts            # Dynamic sitemap
│   │   └── robots.ts             # Robots.txt
│   │
│   ├── components/
│   │   ├── career-hub/           # Career hub components
│   │   │   ├── interactive/      # Interactive components
│   │   │   ├── seo/              # SEO schema components
│   │   │   └── tools/            # Tool components
│   │   ├── providers.tsx         # Context providers
│   │   └── ui/                   # shadcn/ui components
│   │
│   ├── hooks/                    # Custom React hooks
│   │
│   ├── integrations/
│   │   └── supabase/             # Supabase client
│   │
│   └── lib/
│       ├── data/                 # All data modules
│       │   ├── articles/         # Article content
│       │   └── ...               # Other data files
│       ├── seo/                  # SEO utilities
│       └── utils.ts              # Utility functions
│
├── public/                       # Static assets
├── docs/                         # Documentation
├── tailwind.config.ts            # Tailwind configuration
├── next.config.mjs               # Next.js configuration
└── package.json
```

---

## 📄 Pages Overview

### Core Pages
| Route | Description |
|-------|-------------|
| `/` | Homepage |
| `/career-hub` | Career hub landing page |
| `/career-hub/tools` | Tools directory |
| `/career-hub/roles` | All roles listing |
| `/career-hub/locations` | All locations |
| `/career-hub/cities` | All cities |
| `/career-hub/guides` | Career guides |

### Dynamic Pages (308 total)
| Pattern | Count | Description |
|---------|-------|-------------|
| `/career-hub/roles/[slug]` | 47 | Role detail pages |
| `/career-hub/cities/[slug]` | 99 | City pages |
| `/career-hub/locations/[slug]` | 19 | Location pages |
| `/paycheck-calculator/[state]` | 51 | State tax calculators |
| `/unemployment-benefits/[state]` | 51 | Unemployment guides |
| `/certifications/[slug]` | 8 | Certification guides |
| `/how-to-become/[role]` | 7 | Career path guides |
| `/interview-questions/[role]` | 10 | Interview prep |

---

## 🛠️ Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Environment Variables
Create `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

### Scripts
```bash
npm run dev       # Development server (port 3000)
npm run build     # Production build
npm run start     # Start production server
npm run lint      # Run ESLint
```

---

## 🎨 Styling

### Tailwind CSS
Custom theme configuration in `tailwind.config.ts`:
- **Colors**: Indeed Flex brand colors, wellness palette
- **Fonts**: Inter font family
- **Animations**: Custom keyframes for UI effects

### shadcn/ui
Pre-built accessible components in `/src/components/ui/`:
- Button, Card, Badge, Input, Select
- NavigationMenu, Tooltip, Sonner (toasts)
- Dialog, Sheet, and more

---

## 🔍 SEO Features

### Static Generation
All pages are pre-rendered at build time for:
- Faster page loads
- Better search engine indexing
- Lower server costs

### Structured Data (JSON-LD)
Schema markup for rich search results:
- `FAQSchema` - FAQ rich snippets
- `ArticleSchema` - Article snippets
- `BreadcrumbSchema` - Breadcrumb trails
- `WebPageSchema` - Page metadata
- `JobPostingSchema` - Job listings

### SEO Files
- `/sitemap.xml` - Dynamic sitemap (308 URLs)
- `/robots.txt` - Crawler instructions

---

## 📦 Data Layer

All data is in `/src/lib/data/`:

| File | Description |
|------|-------------|
| `roles.ts` | 47 job role definitions |
| `cities.ts` | 99 city data with job markets |
| `locations.ts` | 19 Indeed Flex locations |
| `certifications.ts` | 8 career certifications |
| `how-to-become.ts` | Career path guides |
| `interview-questions.ts` | Interview prep content |
| `unemployment-benefits.ts` | 51 state UI data |
| `state-tax-content.ts` | Tax information |

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Other Platforms
Build output is in `.next/` directory:
```bash
npm run build
npm start
```

---

## 📚 Documentation

See `/docs/` for detailed documentation:
- [Architecture Guide](docs/ARCHITECTURE.md)
- [Component Reference](docs/COMPONENTS.md)
- [Data Schema](docs/DATA.md)
- [SEO Guide](docs/SEO.md)
- [Contributing](docs/CONTRIBUTING.md)

---

## 📊 Build Stats

- **Pages**: 308 static pages
- **First Load JS**: ~96 kB (most pages)
- **Build Time**: ~30 seconds
- **TypeScript**: 100% typed
- **ESLint**: 0 warnings/errors

---

## 📝 License

Proprietary - Indeed Flex
