import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Building, DollarSign, ChevronRight, Clock, HelpCircle, Briefcase, Calculator } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { stateUnemploymentData, StateUnemploymentInfo, calculatePartialBenefit, gigWorkGuidanceGeneral } from "@/lib/data/unemployment-benefits";
import { FAQSchema, WebPageSchema, BreadcrumbSchema } from "@/components/career-hub/seo";

// Generate static params for all states
export function generateStaticParams() {
  return Object.keys(stateUnemploymentData).map((code) => ({
    stateSlug: code.toLowerCase(),
  }));
}

function getStateData(slug: string): { code: string; data: StateUnemploymentInfo } | null {
  const code = slug.toUpperCase();
  if (stateUnemploymentData[code]) {
    return { code, data: stateUnemploymentData[code] };
  }
  return null;
}

// Generate metadata for each state
export async function generateMetadata({
  params,
}: {
  params: Promise<{ stateSlug: string }>;
}): Promise<Metadata> {
  const { stateSlug } = await params;
  const stateInfo = getStateData(stateSlug);

  if (!stateInfo) {
    return { title: "State Not Found" };
  }

  const stateName = stateInfo.data.name;

  return {
    title: `${stateName} Unemployment Benefits Guide ${new Date().getFullYear()}`,
    description: `Complete guide to ${stateName} unemployment benefits. Weekly benefit: $${stateInfo.data.minWeeklyBenefit}-$${stateInfo.data.maxWeeklyBenefit}. Duration: up to ${stateInfo.data.maxWeeks} weeks. ${Math.round(stateInfo.data.replacementRate * 100)}% wage replacement.`,
    keywords: [
      `${stateName} unemployment benefits`,
      `${stateName} unemployment calculator`,
      `${stateInfo.code} unemployment`,
      "unemployment benefits",
      "how to file unemployment",
      "gig work unemployment",
    ],
  };
}

export default async function UnemploymentBenefitsPage({
  params,
}: {
  params: Promise<{ stateSlug: string }>;
}) {
  const { stateSlug } = await params;
  const stateInfo = getStateData(stateSlug);

  if (!stateInfo) {
    notFound();
  }

  const stateName = stateInfo.data.name;
  const data = stateInfo.data;
  const replacementPercent = Math.round(data.replacementRate * 100);

  // Calculate example partial benefit for $200/week earnings at 60% of max benefit
  const typicalBenefit = data.maxWeeklyBenefit * 0.6;
  const exampleBenefit = calculatePartialBenefit(stateInfo.code, typicalBenefit, 200);

  // Generate FAQs
  const faqs = [
    {
      question: `How much unemployment can I get in ${stateName}?`,
      answer: `Weekly unemployment benefits in ${stateName} range from $${data.minWeeklyBenefit} to $${data.maxWeeklyBenefit}. ${stateName} replaces approximately ${replacementPercent}% of your previous wages.`,
    },
    {
      question: `How long do ${stateName} unemployment benefits last?`,
      answer: `Standard ${stateName} unemployment benefits last up to ${data.maxWeeks} weeks. ${data.waitingWeek ? "There is a 1-week unpaid waiting period before benefits start." : "There is no waiting period - benefits start immediately."}`,
    },
    {
      question: `Can I work part-time while receiving ${stateName} unemployment?`,
      answer: `Yes, ${stateName} allows part-time work while receiving benefits. ${data.partialEarningsDisregardType === 'percentage' ? `You can earn up to ${data.partialEarningsDisregardPercent}% of your weekly benefit amount before reductions.` : data.partialEarningsDisregardType === 'flat' ? `The first $${data.partialEarningsDisregard} you earn each week is disregarded.` : `You can earn either $${data.partialEarningsDisregard} or ${data.partialEarningsDisregardPercent}% of your WBA (whichever is greater) before reductions.`}`,
    },
    {
      question: `Can gig workers receive unemployment in ${stateName}?`,
      answer: `Gig workers using platforms like Indeed Flex should report all earnings. In ${stateName}, gig work ${data.gigWorkImpact === 'reduces-benefits' ? 'will reduce your weekly benefit based on earnings' : data.gigWorkImpact === 'may-disqualify' ? 'may affect eligibility - consult your state office' : 'is allowed with proper reporting'}. ${data.mustSeekFullTime ? "You must seek full-time work." : "You can seek part-time work matching your normal schedule."}`,
    },
  ];

  return (
    <>
      {/* Schema Markup */}
      <WebPageSchema
        name={`${stateName} Unemployment Benefits Guide`}
        description={`Complete guide to unemployment benefits in ${stateName}.`}
        url={`https://indeedflex.com/unemployment-benefits/${stateSlug}`}
        breadcrumb={[
          { name: "Career Hub", url: "https://indeedflex.com/career-hub" },
          { name: "Unemployment Benefits" },
          { name: stateName },
        ]}
      />
      <FAQSchema questions={faqs} />
      <BreadcrumbSchema
        items={[
          { name: "Career Hub", url: "https://indeedflex.com/career-hub" },
          { name: "Unemployment Benefits" },
          { name: stateName },
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
            <span className="text-foreground">{stateName} Unemployment</span>
          </nav>

          {/* Hero */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <Building className="h-6 w-6 text-primary" />
              <Badge variant="outline">{stateInfo.code}</Badge>
              <Badge variant="secondary">Updated {new Date().getFullYear()}</Badge>
            </div>
            <h1 className="text-4xl font-bold mb-4">
              {stateName} Unemployment Benefits Guide {new Date().getFullYear()}
            </h1>
            <p className="text-xl text-muted-foreground">
              Everything you need to know about filing for and receiving unemployment benefits in {stateName}, including how gig work affects your benefits.
            </p>
          </div>

          {/* Key Stats */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <DollarSign className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Weekly Benefit Range</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-primary">
                  ${data.minWeeklyBenefit} - ${data.maxWeeklyBenefit}
                </p>
                <p className="text-sm text-muted-foreground">{replacementPercent}% wage replacement</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <Clock className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Maximum Duration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  {data.maxWeeks} weeks
                </p>
                <p className="text-sm text-muted-foreground">
                  {data.maxWeeks >= 26 ? "Standard" : data.maxWeeks < 16 ? "Below average" : "Moderate"} duration
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <Clock className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Waiting Period</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  {data.waitingWeek ? "1 week" : "None"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {data.waitingWeek ? "Unpaid waiting week" : "Benefits start immediately"}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <Briefcase className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Part-Time Work</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  {data.allowsPartTimeWork ? "Allowed" : "Limited"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {data.mustSeekFullTime ? "Must seek full-time" : "Can seek part-time"}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Benefit Calculation */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary" />
              How Benefits Are Calculated
            </h2>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2">Calculation Method</h3>
                    <p className="text-muted-foreground">
                      {data.calculationMethod === 'highest-quarter' && `Based on your highest quarter earnings divided by ${data.calculationDivisor}`}
                      {data.calculationMethod === 'two-highest-quarters' && `Based on your two highest quarters divided by ${data.calculationDivisor}`}
                      {data.calculationMethod === 'average-weekly' && "Based on your average weekly wage"}
                      {data.calculationMethod === 'annual' && "Based on your annual wages divided by 52"}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Minimum Base Wages</h3>
                    <p className="text-muted-foreground">
                      You must have earned at least ${data.minBaseWages.toLocaleString()} during your base period
                      {data.minWeeksWorked > 0 && ` with at least ${data.minWeeksWorked} weeks of work`}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Gig Work & Partial Benefits */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" />
              Working While Receiving Benefits
            </h2>
            <Card className="border-primary/20">
              <CardContent className="pt-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Earnings Disregard</h3>
                    <p className="text-muted-foreground">
                      {data.partialEarningsDisregardType === 'flat' && `First $${data.partialEarningsDisregard} per week is not counted`}
                      {data.partialEarningsDisregardType === 'percentage' && `First ${data.partialEarningsDisregardPercent}% of your weekly benefit is not counted`}
                      {data.partialEarningsDisregardType === 'greater-of' && `Greater of $${data.partialEarningsDisregard} or ${data.partialEarningsDisregardPercent}% of WBA is not counted`}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Benefit Reduction Rate</h3>
                    <p className="text-muted-foreground">
                      {data.benefitReductionRate === 1 
                        ? "Benefits reduce dollar-for-dollar above the disregard" 
                        : `Benefits reduce at ${data.benefitReductionRate * 100}% rate - favorable for part-time work`}
                    </p>
                  </div>
                </div>

                {/* Example calculation */}
                <div className="bg-muted/50 p-4 rounded-lg mt-4">
                  <h4 className="font-semibold mb-2">Example: Earning $200/week from gig work</h4>
                  <p className="text-sm text-muted-foreground">
                    If your weekly benefit is ${Math.round(typicalBenefit)}:
                  </p>
                  <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                    <li>• Earnings disregard: ${Math.round(exampleBenefit.earningsDisregard)}</li>
                    <li>• Benefit reduction: ${Math.round(exampleBenefit.netReduction)}</li>
                    <li>• Remaining benefit: ${Math.round(exampleBenefit.benefit)}</li>
                    <li className="font-semibold text-foreground">• Total income: ${Math.round(exampleBenefit.benefit + 200)}</li>
                  </ul>
                </div>

                {/* Gig work guidance */}
                <div className="border-t pt-4 mt-4">
                  <h4 className="font-semibold mb-2">Important for Indeed Flex Workers</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {gigWorkGuidanceGeneral.recommendations.map((rec, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Eligibility */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Eligibility Requirements</h2>
            <Card>
              <CardContent className="pt-6">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Lost your job through no fault of your own</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Earned at least ${data.minBaseWages.toLocaleString()} during the base period</span>
                  </li>
                  {data.minWeeksWorked > 0 && (
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>Worked at least {data.minWeeksWorked} weeks during the base period</span>
                    </li>
                  )}
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Able and available to work</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>{data.mustSeekFullTime ? "Actively seeking full-time employment" : "Actively seeking employment (part-time OK if that was your normal schedule)"}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Dependent Allowance */}
          {data.dependentAllowance > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Dependent Allowance</h2>
              <Card className="border-green-500/20 bg-green-50/50 dark:bg-green-900/10">
                <CardContent className="pt-6">
                  <p className="text-lg">
                    {stateName} provides an additional <span className="font-bold text-green-600">${data.dependentAllowance}/week</span> per dependent, up to {data.maxDependents} dependents.
                  </p>
                  <p className="text-muted-foreground mt-2">
                    Maximum additional benefit: ${data.dependentAllowance * data.maxDependents}/week
                  </p>
                </CardContent>
              </Card>
            </section>
          )}

          {/* State-specific notes */}
          {data.notes && (
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Key Information for {stateName}</h2>
              <Card className="border-blue-500/20 bg-blue-50/50 dark:bg-blue-900/10">
                <CardContent className="pt-6">
                  <p className="text-muted-foreground">{data.notes}</p>
                </CardContent>
              </Card>
            </section>
          )}

          {/* FAQs */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              Frequently Asked Questions
            </h2>
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

          {/* Other States */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              Unemployment Benefits by State
            </h2>
            <div className="flex flex-wrap gap-2">
              {Object.keys(stateUnemploymentData)
                .filter((code) => code !== stateInfo.code)
                .map((code) => (
                  <Link key={code} href={`/unemployment-benefits/${code.toLowerCase()}`}>
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                    >
                      {stateUnemploymentData[code].name}
                    </Badge>
                  </Link>
                ))}
            </div>
          </section>

          {/* CTA */}
          <section className="mb-8">
            <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
              <CardContent className="pt-6 text-center">
                <h3 className="text-xl font-semibold mb-2">Looking for Flexible Work?</h3>
                <p className="text-muted-foreground mb-4">
                  Indeed Flex offers transparent, reported earnings that integrate seamlessly with unemployment benefits. Find shifts that work for you.
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

