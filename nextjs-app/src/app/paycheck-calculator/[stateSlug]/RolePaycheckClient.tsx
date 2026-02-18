"use client";

import { useState, useMemo, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { 
  DollarSign, ChevronRight, HelpCircle, Share2, 
  TrendingUp, Check, Info, Briefcase, Users, Clock, MapPin
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  FAQSchema, 
  WebPageSchema, 
  BreadcrumbSchema, 
  OccupationSchema,
} from "@/components/career-hub/seo";
import { 
  calculatorRolePresets, 
  stateTaxData,
  getRelatedTools,
  RolePreset,
} from "@/lib/data/tool-registry";

// Tax calculation functions
const FEDERAL_TAX_BRACKETS_2026 = [
  { min: 0, max: 12150, rate: 0.10 },
  { min: 12150, max: 49400, rate: 0.12 },
  { min: 49400, max: 105400, rate: 0.22 },
  { min: 105400, max: 201200, rate: 0.24 },
  { min: 201200, max: 255600, rate: 0.32 },
  { min: 255600, max: 639200, rate: 0.35 },
  { min: 639200, max: Infinity, rate: 0.37 },
];

function calculateFederalTax(annualIncome: number): number {
  let tax = 0;
  let remainingIncome = annualIncome;
  
  for (const bracket of FEDERAL_TAX_BRACKETS_2026) {
    if (remainingIncome <= 0) break;
    const taxableInBracket = Math.min(remainingIncome, bracket.max - bracket.min);
    tax += taxableInBracket * bracket.rate;
    remainingIncome -= taxableInBracket;
  }
  
  return tax;
}

function calculateStateTax(annualIncome: number, stateCode: string): number {
  const stateData = stateTaxData[stateCode];
  if (!stateData || stateData.hasNoIncomeTax) return 0;
  return annualIncome * stateData.incomeTaxRate;
}

const sortedStates = Object.entries(stateTaxData)
  .map(([code, data]) => ({ code, name: data.name, hasNoIncomeTax: data.hasNoIncomeTax }))
  .sort((a, b) => a.name.localeCompare(b.name));

const formatCurrency = (value: number) => 
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);

const formatCurrencyDetailed = (value: number) => 
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);

interface RolePaycheckInnerProps {
  rolePreset: RolePreset;
}

function RolePaycheckInner({ rolePreset }: RolePaycheckInnerProps) {
  const searchParams = useSearchParams();
  
  const [hourlyRate, setHourlyRate] = useState<number>(rolePreset.hourlyRate);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(rolePreset.hoursPerWeek);
  const [state, setState] = useState<string>("TX");
  const [retirement401k, setRetirement401k] = useState<number>(0);
  const [includeTips, setIncludeTips] = useState<boolean>(rolePreset.hasTips);
  const [tipsPerHour, setTipsPerHour] = useState<number>(rolePreset.avgTipsPerHour || 0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const stateParam = searchParams.get('state');
    if (stateParam && stateTaxData[stateParam.toUpperCase()]) setState(stateParam.toUpperCase());
  }, [searchParams]);

  const results = useMemo(() => {
    const totalHourlyRate = includeTips ? hourlyRate + tipsPerHour : hourlyRate;
    const weeklyGross = totalHourlyRate * hoursPerWeek;
    const annualGross = weeklyGross * 52;
    const annual401k = annualGross * (retirement401k / 100);
    const taxableIncome = annualGross - annual401k;
    const federalTax = calculateFederalTax(taxableIncome);
    const stateTax = calculateStateTax(taxableIncome, state);
    const socialSecurityTax = Math.min(annualGross, 168600) * 0.062;
    const medicareTax = annualGross * 0.0145;
    const totalTaxes = federalTax + stateTax + socialSecurityTax + medicareTax;
    const annualNet = annualGross - totalTaxes - annual401k;
    const weeklyNet = annualNet / 52;
    const hourlyNet = hoursPerWeek > 0 ? weeklyNet / hoursPerWeek : 0;
    const monthlyNet = annualNet / 12;
    const effectiveTaxRate = annualGross > 0 ? (totalTaxes / annualGross) * 100 : 0;
    const takeHomePercentage = annualGross > 0 ? (annualNet / annualGross) * 100 : 0;
    
    return {
      weeklyGross, annualGross, federalTax, stateTax, socialSecurityTax, medicareTax,
      fica: socialSecurityTax + medicareTax, annual401k, totalTaxes, annualNet,
      weeklyNet, hourlyNet, monthlyNet, effectiveTaxRate, takeHomePercentage,
    };
  }, [hourlyRate, hoursPerWeek, state, retirement401k, includeTips, tipsPerHour]);

  const copyShareableUrl = async () => {
    if (typeof window === 'undefined') return;
    const url = new URL(window.location.href);
    url.searchParams.set('hourly', hourlyRate.toString());
    url.searchParams.set('state', state);
    try {
      await navigator.clipboard.writeText(url.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const relatedTools = getRelatedTools('paycheck-calculator');
  const relatedRoles = calculatorRolePresets.filter(r => r.roleId !== rolePreset.roleId).slice(0, 6);
  
  const roleFaqs = [
    {
      question: `How much do ${rolePreset.name}s make per hour?`,
      answer: `The average ${rolePreset.name} earns around $${rolePreset.hourlyRate}/hour.${rolePreset.hasTips ? ` Tips can add ~$${rolePreset.avgTipsPerHour}/hour on average.` : ''}`
    },
    {
      question: `What is the annual salary for a ${rolePreset.name}?`,
      answer: `Working ${rolePreset.hoursPerWeek} hours/week at $${rolePreset.hourlyRate}/hour, a ${rolePreset.name} earns approximately ${formatCurrency(rolePreset.hourlyRate * rolePreset.hoursPerWeek * 52)}/year before taxes.`
    },
  ];

  return (
    <>
      <WebPageSchema
        name={`${rolePreset.name} Pay Calculator`}
        description={`Calculate take-home pay for ${rolePreset.name} jobs.`}
        url={`https://indeedflex.com/paycheck-calculator/${rolePreset.roleId}`}
        breadcrumb={[
          { name: "Career Hub", url: "https://indeedflex.com/career-hub" },
          { name: "Tools", url: "https://indeedflex.com/career-hub/tools" },
          { name: `${rolePreset.name} Calculator` },
        ]}
      />
      <FAQSchema questions={roleFaqs} />
      <BreadcrumbSchema
        items={[
          { name: "Career Hub", url: "https://indeedflex.com/career-hub" },
          { name: "Tools", url: "https://indeedflex.com/career-hub/tools" },
          { name: `${rolePreset.name} Calculator` },
        ]}
      />
      <OccupationSchema
        name={rolePreset.name}
        description={rolePreset.description}
        estimatedSalary={{
          currency: "USD",
          minValue: (rolePreset.hourlyRate - 3) * rolePreset.hoursPerWeek * 52,
          maxValue: (rolePreset.hourlyRate + 5) * rolePreset.hoursPerWeek * 52,
          unitText: "YEAR",
        }}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/career-hub" className="hover:text-primary">Career Hub</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/career-hub/tools" className="hover:text-primary">Tools</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/career-hub/tools/paycheck-calculator" className="hover:text-primary">Paycheck Calculator</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{rolePreset.name}</span>
          </nav>

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <Briefcase className="h-6 w-6 text-primary" />
              <Badge variant="outline">{rolePreset.name}</Badge>
              {rolePreset.hasTips && <Badge variant="secondary" className="bg-green-100 text-green-700">+ Tips</Badge>}
            </div>
            <h1 className="text-4xl font-bold mb-4">{rolePreset.name} Pay Calculator</h1>
            <p className="text-xl text-muted-foreground">
              How much do {rolePreset.name}s make? Calculate your take-home pay at ${rolePreset.hourlyRate}/hr
              {rolePreset.hasTips ? ` plus tips` : ''}.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase">Avg Hourly Rate</p>
              <p className="text-2xl font-bold text-primary">${rolePreset.hourlyRate}/hr</p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase">Typical Hours</p>
              <p className="text-2xl font-bold">{rolePreset.hoursPerWeek}/week</p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase">{rolePreset.hasTips ? 'Avg Tips' : 'Night Premium'}</p>
              <p className="text-2xl font-bold">{rolePreset.hasTips ? `+$${rolePreset.avgTipsPerHour}/hr` : rolePreset.hasNightShift ? '+$1.50' : 'N/A'}</p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase">Est. Annual</p>
              <p className="text-2xl font-bold">{formatCurrency(rolePreset.hourlyRate * rolePreset.hoursPerWeek * 52)}</p>
            </Card>
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Your {rolePreset.name} Pay</CardTitle>
                  <CardDescription>Pre-filled with typical rates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Base Hourly Rate</Label>
                      <span className="font-mono font-bold text-primary">${hourlyRate.toFixed(2)}</span>
                    </div>
                    <Slider value={[hourlyRate]} onValueChange={([v]) => setHourlyRate(v)} min={7.25} max={50} step={0.25} />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Hours Per Week</Label>
                      <span className="font-mono font-bold">{hoursPerWeek} hrs</span>
                    </div>
                    <Slider value={[hoursPerWeek]} onValueChange={([v]) => setHoursPerWeek(v)} min={1} max={60} step={1} />
                  </div>

                  <div className="space-y-2">
                    <Label>Work State</Label>
                    <Select value={state} onValueChange={setState}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {sortedStates.map((s) => (
                          <SelectItem key={s.code} value={s.code}>{s.name} {s.hasNoIncomeTax && "✓ No tax"}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {rolePreset.hasTips && (
                    <div className="space-y-4 p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center justify-between">
                        <Label className="text-green-700">Include Tips</Label>
                        <Switch checked={includeTips} onCheckedChange={setIncludeTips} />
                      </div>
                      {includeTips && (
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label className="text-green-700">Tips/Hour</Label>
                            <span className="font-mono text-green-700">${tipsPerHour}</span>
                          </div>
                          <Slider value={[tipsPerHour]} onValueChange={([v]) => setTipsPerHour(v)} min={0} max={50} step={1} />
                        </div>
                      )}
                    </div>
                  )}

                  <Button variant="outline" className="w-full" onClick={copyShareableUrl}>
                    {copied ? <><Check className="h-4 w-4 mr-2 text-green-600" />Copied!</> : <><Share2 className="h-4 w-4 mr-2" />Share</>}
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-3 space-y-6">
              <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    {rolePreset.name} Take-Home Pay
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-background rounded-lg shadow-sm">
                      <p className="text-xs text-muted-foreground uppercase">Hourly</p>
                      <p className="text-2xl font-bold text-primary">{formatCurrencyDetailed(results.hourlyNet)}</p>
                    </div>
                    <div className="text-center p-4 bg-background rounded-lg shadow-sm">
                      <p className="text-xs text-muted-foreground uppercase">Weekly</p>
                      <p className="text-2xl font-bold text-primary">{formatCurrency(results.weeklyNet)}</p>
                    </div>
                    <div className="text-center p-4 bg-background rounded-lg shadow-sm">
                      <p className="text-xs text-muted-foreground uppercase">Monthly</p>
                      <p className="text-2xl font-bold text-primary">{formatCurrency(results.monthlyNet)}</p>
                    </div>
                  </div>

                  <div className="p-6 bg-background rounded-lg shadow-sm text-center">
                    <p className="text-sm text-muted-foreground uppercase">Annual Take-Home</p>
                    <p className="text-4xl font-bold mt-1">{formatCurrency(results.annualNet)}</p>
                    <div className="flex justify-center gap-4 mt-3">
                      <Badge variant="outline">{results.takeHomePercentage.toFixed(0)}% take-home</Badge>
                      <Badge variant="secondary">{results.effectiveTaxRate.toFixed(1)}% tax rate</Badge>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold text-sm">Pay Breakdown</h3>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-green-700">Take-Home</span>
                        <span>{formatCurrency(results.annualNet)}</span>
                      </div>
                      <Progress value={results.takeHomePercentage} className="h-3 [&>div]:bg-green-500" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-red-600">Federal Tax</span>
                        <span>{formatCurrency(results.federalTax)}</span>
                      </div>
                      <Progress value={(results.federalTax / results.annualGross) * 100} className="h-2 [&>div]:bg-red-400" />
                    </div>
                    {results.stateTax > 0 && (
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-orange-600">State Tax</span>
                          <span>{formatCurrency(results.stateTax)}</span>
                        </div>
                        <Progress value={(results.stateTax / results.annualGross) * 100} className="h-2 [&>div]:bg-orange-400" />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Alert className="mt-8">
            <Info className="h-4 w-4" />
            <AlertTitle>Estimate Only</AlertTitle>
            <AlertDescription>{rolePreset.name} pay varies by location and employer.</AlertDescription>
          </Alert>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Compare Other Roles
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {relatedRoles.map(role => (
                <Link key={role.roleId} href={`/paycheck-calculator/${role.roleId}`} className="p-4 border rounded-lg hover:bg-muted transition-colors">
                  <h3 className="font-medium">{role.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">${role.hourlyRate}/hr • {role.hoursPerWeek}hrs/wk{role.hasTips && ` • + tips`}</p>
                  <p className="text-sm text-primary mt-2">{formatCurrency(role.hourlyRate * role.hoursPerWeek * 52)}/yr →</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              {rolePreset.name} Pay FAQs
            </h2>
            <div className="space-y-4">
              {roleFaqs.map((faq, i) => (
                <Card key={i}>
                  <CardHeader className="pb-2"><CardTitle className="text-lg">{faq.question}</CardTitle></CardHeader>
                  <CardContent><p className="text-muted-foreground">{faq.answer}</p></CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold mb-4">Related Tools</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              {relatedTools.map(tool => (
                <Link key={tool.slug} href={`/career-hub/tools/${tool.slug}`} className="p-4 border rounded-lg hover:bg-muted transition-colors group">
                  <h3 className="font-medium group-hover:text-primary">{tool.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{tool.shortDescription}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

interface RolePaycheckClientProps {
  roleId: string;
}

export default function RolePaycheckClient({ roleId }: RolePaycheckClientProps) {
  const rolePreset = calculatorRolePresets.find(r => r.roleId === roleId);
  
  if (!rolePreset) {
    return <div>Role not found</div>;
  }

  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8"><div className="animate-pulse space-y-4"><div className="h-12 bg-muted rounded w-1/2"></div></div></div>}>
      <RolePaycheckInner rolePreset={rolePreset} />
    </Suspense>
  );
}

