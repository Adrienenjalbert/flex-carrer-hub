import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, DollarSign, Clock, TrendingUp, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { stateUnemploymentData, getSortedStatesByBenefit, getSortedStatesByDuration } from "@/lib/data/unemployment-benefits";
import { WebPageSchema, FAQSchema, BreadcrumbSchema } from "@/components/career-hub/seo";

export const metadata: Metadata = {
  title: "Unemployment Benefits by State 2026 | Complete Guide",
  description:
    "Compare unemployment benefits across all 50 states. Find maximum weekly benefits, duration, and how gig work affects your benefits. Updated for 2026.",
  keywords: [
    "unemployment benefits by state",
    "state unemployment comparison",
    "unemployment calculator",
    "gig work unemployment",
    "Indeed Flex unemployment",
  ],
};

export default function UnemploymentBenefitsPage() {
  const statesByBenefit = getSortedStatesByBenefit();
  // Note: statesByDuration available for future use
  const _statesByDuration = getSortedStatesByDuration();
  
  // Group states by region
  const regions = {
    Northeast: ["CT", "ME", "MA", "NH", "RI", "VT", "NJ", "NY", "PA"],
    Southeast: ["AL", "FL", "GA", "KY", "MD", "NC", "SC", "TN", "VA", "WV", "DC", "DE"],
    Midwest: ["IL", "IN", "IA", "KS", "MI", "MN", "MO", "NE", "ND", "OH", "SD", "WI"],
    Southwest: ["AZ", "NM", "OK", "TX"],
    West: ["AK", "CA", "CO", "HI", "ID", "MT", "NV", "OR", "UT", "WA", "WY"],
  };

  // Calculate averages
  const allStates = Object.values(stateUnemploymentData);
  const avgMaxBenefit = Math.round(allStates.reduce((sum, s) => sum + s.maxWeeklyBenefit, 0) / allStates.length);
  const avgDuration = Math.round(allStates.reduce((sum, s) => sum + s.maxWeeks, 0) / allStates.length);

  const faqs = [
    {
      question: "Which state has the highest unemployment benefits?",
      answer: `Massachusetts has the highest maximum weekly unemployment benefit at $1,033 per week. Washington follows at $999, and Rhode Island at $867.`,
    },
    {
      question: "Which state has the longest unemployment benefits?",
      answer: "Montana offers the longest standard unemployment duration at 28 weeks. Most states offer 26 weeks, while some like Florida and North Carolina only offer 12 weeks.",
    },
    {
      question: "Can I work gig jobs while receiving unemployment?",
      answer: "Yes, in most states you can work part-time or gig jobs while receiving unemployment. However, you must report all earnings, and your benefits will typically be reduced based on what you earn. Each state has different rules for earnings disregards.",
    },
    {
      question: "How are unemployment benefits calculated?",
      answer: "Most states calculate benefits as a percentage of your highest quarter earnings, typically around 50%. The specific formula varies by state, with some using two highest quarters or average weekly wages.",
    },
  ];

  return (
    <>
      <WebPageSchema
        name="Unemployment Benefits by State 2026"
        description="Complete guide to unemployment benefits across all 50 US states."
        url="https://indeedflex.com/unemployment-benefits"
        breadcrumb={[
          { name: "Career Hub", url: "https://indeedflex.com/career-hub" },
          { name: "Unemployment Benefits" },
        ]}
      />
      <FAQSchema questions={faqs} />
      <BreadcrumbSchema
        items={[
          { name: "Career Hub", url: "https://indeedflex.com/career-hub" },
          { name: "Unemployment Benefits" },
        ]}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/career-hub" className="hover:text-primary">
              Career Hub
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Unemployment Benefits</span>
          </nav>

          {/* Hero */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">
              Unemployment Benefits by State {new Date().getFullYear()}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Compare unemployment benefits across all 50 states. Understand how much you can receive, how long benefits last, and how gig work affects your eligibility.
            </p>
          </div>

          {/* Overview Stats */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <DollarSign className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Highest Max Benefit</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-primary">$1,033/week</p>
                <p className="text-sm text-muted-foreground">Massachusetts</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <DollarSign className="h-5 w-5 text-red-500" />
                <CardTitle className="text-lg">Lowest Max Benefit</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-red-500">$235/week</p>
                <p className="text-sm text-muted-foreground">Mississippi</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <Clock className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Longest Duration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">28 weeks</p>
                <p className="text-sm text-muted-foreground">Montana</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <TrendingUp className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-lg">National Average</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">${avgMaxBenefit}/week</p>
                <p className="text-sm text-muted-foreground">{avgDuration} weeks avg duration</p>
              </CardContent>
            </Card>
          </div>

          {/* Top 10 by Benefit */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">States with Highest Benefits</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {statesByBenefit.slice(0, 10).map((state, i) => (
                <Link key={state.code} href={`/unemployment-benefits/${state.code.toLowerCase()}`}>
                  <Card className="hover:border-primary transition-colors cursor-pointer">
                    <CardContent className="pt-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Badge variant={i < 3 ? "default" : "outline"} className="w-8 h-8 rounded-full flex items-center justify-center">
                          {i + 1}
                        </Badge>
                        <div>
                          <p className="font-semibold">{state.name}</p>
                          <p className="text-sm text-muted-foreground">${state.maxBenefit}/week max</p>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* States by Region */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Browse by Region</h2>
            <div className="space-y-6">
              {Object.entries(regions).map(([region, codes]) => (
                <div key={region}>
                  <h3 className="text-lg font-medium mb-3">{region}</h3>
                  <div className="flex flex-wrap gap-2">
                    {codes.map((code) => {
                      const state = stateUnemploymentData[code];
                      if (!state) return null;
                      return (
                        <Link key={code} href={`/unemployment-benefits/${code.toLowerCase()}`}>
                          <Badge
                            variant="outline"
                            className="cursor-pointer hover:bg-primary hover:text-primary-foreground py-2 px-3"
                          >
                            {state.name} (${state.maxWeeklyBenefit})
                          </Badge>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Full State List Table */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">All States Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2">State</th>
                    <th className="text-right py-3 px-2">Max Weekly</th>
                    <th className="text-right py-3 px-2">Min Weekly</th>
                    <th className="text-right py-3 px-2">Duration</th>
                    <th className="text-right py-3 px-2">Waiting Week</th>
                    <th className="text-right py-3 px-2">Part-Time OK</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(stateUnemploymentData)
                    .sort(([, a], [, b]) => a.name.localeCompare(b.name))
                    .map(([code, state]) => (
                      <tr key={code} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-2">
                          <Link 
                            href={`/unemployment-benefits/${code.toLowerCase()}`}
                            className="text-primary hover:underline font-medium"
                          >
                            {state.name}
                          </Link>
                        </td>
                        <td className="text-right py-3 px-2">${state.maxWeeklyBenefit}</td>
                        <td className="text-right py-3 px-2">${state.minWeeklyBenefit}</td>
                        <td className="text-right py-3 px-2">{state.maxWeeks} wks</td>
                        <td className="text-right py-3 px-2">
                          <Badge variant={state.waitingWeek ? "outline" : "default"}>
                            {state.waitingWeek ? "Yes" : "No"}
                          </Badge>
                        </td>
                        <td className="text-right py-3 px-2">
                          <Badge variant={state.mustSeekFullTime ? "outline" : "default"}>
                            {state.mustSeekFullTime ? "Full-time" : "Yes"}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
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

          {/* CTA */}
          <section>
            <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
              <CardContent className="pt-6 text-center">
                <h3 className="text-xl font-semibold mb-2">Need Flexible Work?</h3>
                <p className="text-muted-foreground mb-4 max-w-xl mx-auto">
                  Indeed Flex helps you find shifts that work around your schedule. All earnings are reported transparently, making it easy to manage with unemployment benefits.
                </p>
                <Link 
                  href="https://www.indeedflex.com" 
                  className="inline-block bg-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold hover:bg-primary/90"
                >
                  Explore Indeed Flex
                </Link>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </>
  );
}

