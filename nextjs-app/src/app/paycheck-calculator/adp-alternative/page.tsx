import { Metadata } from "next";
import Link from "next/link";
import { 
  Calculator, ChevronRight, Check, X, Zap, Shield, Clock, 
  DollarSign, Users, ArrowRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  FAQSchema, 
  WebPageSchema, 
  BreadcrumbSchema,
} from "@/components/career-hub/seo";

export const metadata: Metadata = {
  title: "Free Paycheck Calculator - ADP Alternative | No Signup Required",
  description: "Looking for an ADP paycheck calculator alternative? Our free calculator requires no signup, provides instant results, and is designed specifically for hourly workers.",
  keywords: [
    "adp paycheck calculator",
    "adp paycheck calculator alternative",
    "free paycheck calculator",
    "paycheck calculator no signup",
    "adp alternative",
    "simple paycheck calculator",
  ],
  alternates: {
    canonical: "https://indeedflex.com/paycheck-calculator/adp-alternative",
  },
  openGraph: {
    title: "Free Paycheck Calculator - ADP Alternative",
    description: "No signup required. Calculate take-home pay instantly.",
    url: "https://indeedflex.com/paycheck-calculator/adp-alternative",
    type: "website",
  },
};

const comparisonFeatures = [
  {
    feature: "Signup Required",
    adp: true,
    us: false,
    usLabel: "No signup needed",
    advantage: true,
  },
  {
    feature: "Instant Results",
    adp: false,
    us: true,
    usLabel: "Real-time calculation",
    advantage: true,
  },
  {
    feature: "Hourly Worker Focus",
    adp: false,
    us: true,
    usLabel: "Built for hourly jobs",
    advantage: true,
  },
  {
    feature: "Role-Based Presets",
    adp: false,
    us: true,
    usLabel: "Pre-filled for your job",
    advantage: true,
  },
  {
    feature: "Tips Calculator",
    adp: false,
    us: true,
    usLabel: "For hospitality workers",
    advantage: true,
  },
  {
    feature: "What-If Scenarios",
    adp: false,
    us: true,
    usLabel: "See impact of changes",
    advantage: true,
  },
  {
    feature: "Shareable Results",
    adp: false,
    us: true,
    usLabel: "Share with one click",
    advantage: true,
  },
  {
    feature: "Mobile Optimized",
    adp: true,
    us: true,
    usLabel: "Works on any device",
    advantage: false,
  },
];

const faqs = [
  {
    question: "Is this paycheck calculator free?",
    answer: "Yes! Our paycheck calculator is 100% free with no signup required. Unlike ADP, which primarily serves businesses, our calculator is designed for individual workers to quickly estimate their take-home pay."
  },
  {
    question: "How accurate is this calculator compared to ADP?",
    answer: "Both calculators use the same 2026 IRS federal tax brackets and state tax rates. Our calculator provides estimates based on standard withholding. For exact payroll calculations tied to your employer's system, you would need your employer's ADP portal."
  },
  {
    question: "Why use this instead of ADP?",
    answer: "Our calculator is ideal if you want quick estimates without signing up, are comparing job offers, planning shift schedules, or are a gig/hourly worker. ADP is better if you need to access your actual pay stubs from an employer using ADP payroll."
  },
  {
    question: "Can I calculate tips with this calculator?",
    answer: "Yes! Unlike most paycheck calculators, we include a tips toggle specifically for hospitality workers like servers and bartenders. ADP doesn't typically include tip calculations in their public calculator."
  },
];

export default function ADPAlternativePage() {
  return (
    <>
      {/* Schema Markup */}
      <WebPageSchema
        name="Free Paycheck Calculator - ADP Alternative"
        description="Free paycheck calculator with no signup required. A simple alternative to ADP for calculating take-home pay."
        url="https://indeedflex.com/paycheck-calculator/adp-alternative"
        breadcrumb={[
          { name: "Career Hub", url: "https://indeedflex.com/career-hub" },
          { name: "Tools", url: "https://indeedflex.com/career-hub/tools" },
          { name: "ADP Alternative" },
        ]}
      />
      <FAQSchema questions={faqs} />
      <BreadcrumbSchema
        items={[
          { name: "Career Hub", url: "https://indeedflex.com/career-hub" },
          { name: "Tools", url: "https://indeedflex.com/career-hub/tools" },
          { name: "ADP Alternative" },
        ]}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/career-hub" className="hover:text-primary">
              Career Hub
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/career-hub/tools" className="hover:text-primary">
              Tools
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/career-hub/tools/paycheck-calculator" className="hover:text-primary">
              Paycheck Calculator
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">ADP Alternative</span>
          </nav>

          {/* Hero */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Free • No Signup • Instant Results
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Free Paycheck Calculator
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
              Looking for an ADP paycheck calculator alternative? 
              Calculate your take-home pay instantly — no account required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/career-hub/tools/paycheck-calculator">
                  <Calculator className="mr-2 h-5 w-5" />
                  Try Calculator Now
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#comparison">
                  See Comparison
                </Link>
              </Button>
            </div>
          </div>

          {/* Key Benefits */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center p-6">
              <Zap className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Instant Results</h3>
              <p className="text-sm text-muted-foreground">
                No waiting, no loading. See your take-home pay as you type.
              </p>
            </Card>
            <Card className="text-center p-6">
              <Shield className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">No Signup Required</h3>
              <p className="text-sm text-muted-foreground">
                No email, no password, no personal info needed.
              </p>
            </Card>
            <Card className="text-center p-6">
              <Users className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Built for Hourly Workers</h3>
              <p className="text-sm text-muted-foreground">
                Pre-filled with typical rates for warehouse, server, bartender jobs.
              </p>
            </Card>
          </div>

          {/* Comparison Table */}
          <section id="comparison" className="mb-12">
            <h2 className="text-2xl font-bold text-center mb-6">
              How We Compare to ADP
            </h2>
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="text-left p-4 font-semibold">Feature</th>
                        <th className="text-center p-4 font-semibold">ADP</th>
                        <th className="text-center p-4 font-semibold text-primary">Indeed Flex</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonFeatures.map((row, i) => (
                        <tr key={i} className="border-b last:border-0">
                          <td className="p-4">{row.feature}</td>
                          <td className="p-4 text-center">
                            {row.adp ? (
                              <Check className="h-5 w-5 text-green-600 mx-auto" />
                            ) : (
                              <X className="h-5 w-5 text-gray-400 mx-auto" />
                            )}
                          </td>
                          <td className="p-4 text-center">
                            {row.us ? (
                              <div className="flex items-center justify-center gap-2">
                                <Check className="h-5 w-5 text-green-600" />
                                {row.advantage && (
                                  <span className="text-xs text-green-600 hidden sm:inline">
                                    {row.usLabel}
                                  </span>
                                )}
                              </div>
                            ) : (
                              <X className="h-5 w-5 text-gray-400 mx-auto" />
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* When to Use Each */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">When to Use Each Calculator</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Use ADP When...
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 mt-1 text-gray-500" />
                      <span>Your employer uses ADP payroll and you need actual pay stubs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 mt-1 text-gray-500" />
                      <span>You&apos;re an HR professional managing payroll</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 mt-1 text-gray-500" />
                      <span>You need official payroll documentation</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-primary/30 bg-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <Calculator className="h-5 w-5" />
                    Use Indeed Flex When...
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 mt-1 text-primary" />
                      <span>You want quick estimates without signing up</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 mt-1 text-primary" />
                      <span>You&apos;re comparing job offers or hourly rates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 mt-1 text-primary" />
                      <span>You work hourly jobs (warehouse, restaurant, retail)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 mt-1 text-primary" />
                      <span>You need to calculate tips or shift differentials</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 mt-1 text-primary" />
                      <span>You want to see &quot;what-if&quot; scenarios</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center mb-12 p-8 bg-primary/5 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">
              Ready to Calculate Your Take-Home Pay?
            </h2>
            <p className="text-muted-foreground mb-6">
              No signup. No email. Just answers.
            </p>
            <Button size="lg" asChild>
              <Link href="/career-hub/tools/paycheck-calculator">
                Open Free Calculator
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </section>

          {/* FAQs */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <Card key={i}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Other Alternatives */}
          <section className="mt-12">
            <h2 className="text-xl font-semibold mb-4">Other Calculator Alternatives</h2>
            <div className="flex flex-wrap gap-2">
              <Link href="/career-hub/tools/paycheck-calculator">
                <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                  PaycheckCity Alternative
                </Badge>
              </Link>
              <Link href="/career-hub/tools/tax-calculator">
                <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                  TurboTax Calculator Alternative
                </Badge>
              </Link>
              <Link href="/career-hub/tools/salary-converter">
                <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                  SmartAsset Alternative
                </Badge>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

