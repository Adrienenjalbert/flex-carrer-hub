import { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CTASection from "@/components/career-hub/CTASection";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { financialTips } from "@/lib/data/articles/financial-tips";
import {
  ArrowRight,
  Wallet,
  PiggyBank,
  Receipt,
  TrendingUp,
  Shield,
  Calculator,
  Lightbulb,
  Globe,
  AlertCircle,
} from "lucide-react";

const canonical = "https://indeedflex.com/career-hub/financial-tips";

export const metadata: Metadata = {
  title: "Financial Tips for Flexible Workers | Indeed Flex Career Hub",
  description:
    "Master your finances as a flexible worker. Learn budgeting, saving, tax tips, and money management strategies for irregular income.",
  keywords: [
    "financial tips gig workers",
    "budgeting irregular income",
    "flexible work finances",
    "tax tips contractors",
    "emergency fund gig economy",
    "retirement saving freelancers",
  ],
  alternates: {
    canonical,
  },
  openGraph: {
    title: "Financial Tips for Flexible Workers",
    description: "Master your finances as a flexible worker. Learn budgeting, saving, tax tips, and money management strategies.",
    url: canonical,
    type: "website",
    siteName: "Indeed Flex Career Hub",
  },
  twitter: {
    card: "summary_large_image",
    title: "Financial Tips for Flexible Workers",
    description: "Master your finances as a flexible worker.",
  },
};

const quickTips = [
  "Set aside 25-30% of each paycheck for taxes if you're an independent contractor",
  "Use the 50/30/20 rule: 50% needs, 30% wants, 20% savings",
  "Track your mileage if you drive for work—it's a valuable tax deduction",
  "Pay yourself first: set up automatic transfers to savings on paydays",
  "Keep a separate bank account for taxes and business expenses",
  "Review your expenses monthly to find areas to cut",
];

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "irregular-income-budget": Wallet,
  "emergency-fund-guide": PiggyBank,
  "tax-tips": Receipt,
  "between-shifts": TrendingUp,
  "gig-benefits": Shield,
  "retirement-saving": Calculator,
};

export default function FinancialTipsPage() {
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs
          items={[{ label: "Career Hub", href: "/career-hub" }, { label: "Financial Tips" }]}
        />
      </div>

      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Financial Tips for Flexible Workers
            </h1>
            <p className="text-xl text-primary-foreground/90">
              Master your money when your income varies. Practical advice for
              budgeting, saving, and building financial security.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Tips */}
      <section className="py-12 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Lightbulb className="h-6 w-6 text-yellow-500" />
              <h2 className="text-2xl font-bold">Quick Money Tips</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickTips.map((tip, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 bg-card p-4 rounded-lg border"
                >
                  <span className="text-primary font-bold">{index + 1}.</span>
                  <p className="text-sm">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">In-Depth Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {financialTips.slice(0, 6).map((tip) => {
              const Icon = iconMap[tip.slug] || Wallet;
              return (
                <Link
                  key={tip.slug}
                  href={`/career-hub/financial-tips/${tip.slug}`}
                  className="group"
                >
                  <Card className="h-full hover:shadow-soft transition-shadow cursor-pointer group-hover:border-primary/30">
                    <CardHeader>
                      <div className="p-3 bg-primary/10 rounded-lg w-fit mb-3 group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {tip.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm mb-4">
                        {tip.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          {tip.readTime} read
                        </span>
                        <ArrowRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Related Tools */}
      <section className="py-12 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Calculator className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Related Financial Tools</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              Use these calculators to plan your finances and understand your earning potential.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link
                href="/career-hub/tools/paycheck-calculator"
                className="group"
              >
                <Card className="h-full hover:shadow-soft transition-shadow cursor-pointer group-hover:border-primary/30">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <Calculator className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold group-hover:text-primary transition-colors mb-1">
                          Paycheck Calculator
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Calculate your take-home pay after taxes
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link
                href="/career-hub/tools/tax-calculator"
                className="group"
              >
                <Card className="h-full hover:shadow-soft transition-shadow cursor-pointer group-hover:border-primary/30">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <Receipt className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold group-hover:text-primary transition-colors mb-1">
                          Tax Calculator
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Estimate your federal and state taxes
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link
                href="/career-hub/tools/unemployment-calculator"
                className="group"
              >
                <Card className="h-full hover:shadow-soft transition-shadow cursor-pointer group-hover:border-primary/30">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <AlertCircle className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold group-hover:text-primary transition-colors mb-1">
                          Unemployment Calculator
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Estimate unemployment benefits by state
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link
                href="/career-hub/tools/cost-of-living"
                className="group"
              >
                <Card className="h-full hover:shadow-soft transition-shadow cursor-pointer group-hover:border-primary/30">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <Globe className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold group-hover:text-primary transition-colors mb-1">
                          Cost of Living
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Compare living costs across cities
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link
                href="/unemployment-benefits"
                className="group"
              >
                <Card className="h-full hover:shadow-soft transition-shadow cursor-pointer group-hover:border-primary/30">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <Shield className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold group-hover:text-primary transition-colors mb-1">
                          Unemployment Benefits
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          State-by-state benefits guide
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Internal Links */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <InternalLinkHub
            variant="sidebar"
            currentPage={{ type: "financial" }}
          />
        </div>
      </section>

      <CTASection />
    </>
  );
}

