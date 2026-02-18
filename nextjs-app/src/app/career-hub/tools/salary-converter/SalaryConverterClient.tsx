"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { 
  ArrowLeftRight, DollarSign, ChevronRight, HelpCircle, ArrowRight, 
  Clock, Calendar, Repeat, Info
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  FAQSchema, 
  WebPageSchema, 
  BreadcrumbSchema, 
  SoftwareApplicationSchema 
} from "@/components/career-hub/seo";
import { 
  getToolBySlug, 
  getRelatedTools,
} from "@/lib/data/tool-registry";

const tool = getToolBySlug('salary-converter')!;

type InputType = 'hourly' | 'weekly' | 'biweekly' | 'monthly' | 'annual';

const inputTypes: { value: InputType; label: string; icon: React.ElementType }[] = [
  { value: 'hourly', label: 'Hourly Rate', icon: Clock },
  { value: 'weekly', label: 'Weekly Pay', icon: Calendar },
  { value: 'biweekly', label: 'Bi-Weekly Pay', icon: Repeat },
  { value: 'monthly', label: 'Monthly Salary', icon: Calendar },
  { value: 'annual', label: 'Annual Salary', icon: DollarSign },
];

const formatCurrency = (value: number) => 
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);

const formatCurrencyWhole = (value: number) => 
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);

export default function SalaryConverterClient() {
  const [amount, setAmount] = useState<number>(18);
  const [inputType, setInputType] = useState<InputType>('hourly');
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(40);

  const results = useMemo(() => {
    let annual: number;
    
    // Convert input to annual first
    switch (inputType) {
      case 'hourly':
        annual = amount * hoursPerWeek * 52;
        break;
      case 'weekly':
        annual = amount * 52;
        break;
      case 'biweekly':
        annual = amount * 26;
        break;
      case 'monthly':
        annual = amount * 12;
        break;
      case 'annual':
        annual = amount;
        break;
      default:
        annual = 0;
    }
    
    // Calculate all conversions
    const hourly = annual / (hoursPerWeek * 52);
    const weekly = annual / 52;
    const biweekly = annual / 26;
    const monthly = annual / 12;
    
    return {
      hourly,
      weekly,
      biweekly,
      monthly,
      annual,
      daily: annual / 260, // ~260 working days per year
    };
  }, [amount, inputType, hoursPerWeek]);

  const relatedTools = getRelatedTools('salary-converter');

  // Common salary examples for comparison
  const salaryExamples = [
    { hourly: 15, label: "Entry-level warehouse" },
    { hourly: 18, label: "Experienced warehouse" },
    { hourly: 20, label: "Forklift operator" },
    { hourly: 25, label: "Skilled trades" },
    { hourly: 30, label: "Supervisor/Lead" },
  ];

  return (
    <>
      {/* Schema Markup */}
      <WebPageSchema
        name={tool.name}
        description={tool.description}
        url="https://indeedflex.com/career-hub/tools/salary-converter"
        breadcrumb={[
          { name: "Career Hub", url: "https://indeedflex.com/career-hub" },
          { name: "Tools", url: "https://indeedflex.com/career-hub/tools" },
          { name: tool.name },
        ]}
      />
      <FAQSchema questions={tool.faqTemplates.map(f => ({ question: f.question, answer: f.answer }))} />
      <BreadcrumbSchema
        items={[
          { name: "Career Hub", url: "https://indeedflex.com/career-hub" },
          { name: "Tools", url: "https://indeedflex.com/career-hub/tools" },
          { name: tool.name },
        ]}
      />
      <SoftwareApplicationSchema
        name={`Indeed Flex ${tool.name}`}
        description={tool.description}
        url="https://indeedflex.com/career-hub/tools/salary-converter"
        applicationCategory={tool.schema.category}
        operatingSystem="Web"
        offers={{ price: 0, priceCurrency: "USD" }}
        aggregateRating={tool.schema.aggregateRating}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
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
            <span className="text-foreground">{tool.name}</span>
          </nav>

          {/* Hero */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <ArrowLeftRight className="h-6 w-6 text-primary" />
              <Badge variant="outline">Free Tool</Badge>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                Instant Conversion
              </Badge>
            </div>
            <h1 className="text-4xl font-bold mb-4">{tool.name}</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              {tool.description}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card>
              <CardHeader>
                <CardTitle>Enter Your Pay</CardTitle>
                <CardDescription>
                  Convert between hourly, weekly, and annual
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Input Type Selection */}
                <div className="space-y-2">
                  <Label>I know my...</Label>
                  <Select value={inputType} onValueChange={(v) => setInputType(v as InputType)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {inputTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center gap-2">
                            <type.icon className="h-4 w-4" />
                            {type.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Amount Input */}
                <div className="space-y-2">
                  <Label htmlFor="amount">
                    {inputTypes.find(t => t.value === inputType)?.label}
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="amount"
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="pl-8 text-2xl font-mono h-14"
                      step={inputType === 'hourly' ? 0.25 : 100}
                    />
                  </div>
                </div>

                {/* Hours Per Week (for hourly conversion) */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Hours Per Week</Label>
                    <span className="font-mono font-bold">{hoursPerWeek} hrs</span>
                  </div>
                  <Slider
                    value={[hoursPerWeek]}
                    onValueChange={([v]) => setHoursPerWeek(v)}
                    min={10}
                    max={60}
                    step={1}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Part-time (10)</span>
                    <span>Full-time (40)</span>
                    <span>Overtime (60)</span>
                  </div>
                </div>

                {/* Quick Examples */}
                <div className="pt-4 border-t">
                  <p className="text-sm font-medium mb-3">Quick Examples:</p>
                  <div className="flex flex-wrap gap-2">
                    {salaryExamples.map((ex) => (
                      <button
                        key={ex.hourly}
                        onClick={() => {
                          setInputType('hourly');
                          setAmount(ex.hourly);
                        }}
                        className="px-3 py-1 text-xs border rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        ${ex.hourly}/hr
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results Section */}
            <div className="space-y-6">
              {/* Conversion Results */}
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ArrowLeftRight className="h-5 w-5 text-primary" />
                    All Conversions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Hourly */}
                    <div className={`p-4 rounded-lg ${inputType === 'hourly' ? 'bg-primary/10 border-2 border-primary' : 'bg-muted'}`}>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Hourly</span>
                          {inputType === 'hourly' && <Badge variant="secondary" className="text-xs">Input</Badge>}
                        </div>
                        <span className="text-2xl font-bold font-mono">
                          {formatCurrency(results.hourly)}
                        </span>
                      </div>
                    </div>

                    {/* Weekly */}
                    <div className={`p-4 rounded-lg ${inputType === 'weekly' ? 'bg-primary/10 border-2 border-primary' : 'bg-muted'}`}>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Weekly</span>
                          {inputType === 'weekly' && <Badge variant="secondary" className="text-xs">Input</Badge>}
                        </div>
                        <span className="text-2xl font-bold font-mono">
                          {formatCurrencyWhole(results.weekly)}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">52 weeks/year</p>
                    </div>

                    {/* Bi-Weekly */}
                    <div className={`p-4 rounded-lg ${inputType === 'biweekly' ? 'bg-primary/10 border-2 border-primary' : 'bg-muted'}`}>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Repeat className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Bi-Weekly</span>
                          {inputType === 'biweekly' && <Badge variant="secondary" className="text-xs">Input</Badge>}
                        </div>
                        <span className="text-2xl font-bold font-mono">
                          {formatCurrencyWhole(results.biweekly)}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">26 pay periods/year</p>
                    </div>

                    {/* Monthly */}
                    <div className={`p-4 rounded-lg ${inputType === 'monthly' ? 'bg-primary/10 border-2 border-primary' : 'bg-muted'}`}>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Monthly</span>
                          {inputType === 'monthly' && <Badge variant="secondary" className="text-xs">Input</Badge>}
                        </div>
                        <span className="text-2xl font-bold font-mono">
                          {formatCurrencyWhole(results.monthly)}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">12 months/year</p>
                    </div>

                    {/* Annual */}
                    <div className={`p-4 rounded-lg ${inputType === 'annual' ? 'bg-primary/10 border-2 border-primary' : 'bg-green-50 border-2 border-green-200'}`}>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-green-600" />
                          <span className="text-sm font-semibold text-green-700">Annual</span>
                          {inputType === 'annual' && <Badge variant="secondary" className="text-xs">Input</Badge>}
                        </div>
                        <span className="text-3xl font-bold font-mono text-green-700">
                          {formatCurrencyWhole(results.annual)}
                        </span>
                      </div>
                      <p className="text-xs text-green-600 mt-1">Before taxes • {hoursPerWeek} hrs/week × 52 weeks</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Formula Reference */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Conversion Formulas</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p className="font-mono text-muted-foreground">
                    Hourly × {hoursPerWeek} × 52 = Annual
                  </p>
                  <p className="font-mono text-muted-foreground">
                    Annual ÷ 52 = Weekly
                  </p>
                  <p className="font-mono text-muted-foreground">
                    Annual ÷ 26 = Bi-Weekly
                  </p>
                  <p className="font-mono text-muted-foreground">
                    Annual ÷ 12 = Monthly
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Comparison Table */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold mb-4">Quick Reference: Common Hourly Rates</h2>
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="text-left p-4 font-semibold">Role</th>
                        <th className="text-right p-4 font-semibold">Hourly</th>
                        <th className="text-right p-4 font-semibold">Weekly</th>
                        <th className="text-right p-4 font-semibold">Annual (40hrs)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {salaryExamples.map((ex, i) => (
                        <tr key={i} className="border-b last:border-0">
                          <td className="p-4">{ex.label}</td>
                          <td className="p-4 text-right font-mono">${ex.hourly}</td>
                          <td className="p-4 text-right font-mono">${ex.hourly * 40}</td>
                          <td className="p-4 text-right font-mono">{formatCurrencyWhole(ex.hourly * 40 * 52)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Disclaimer */}
          <Alert className="mt-8">
            <Info className="h-4 w-4" />
            <AlertTitle>Gross Pay Only</AlertTitle>
            <AlertDescription>
              These conversions show gross pay before taxes. 
              Use our <Link href="/career-hub/tools/paycheck-calculator" className="text-primary underline">Paycheck Calculator</Link> to see take-home pay after taxes.
            </AlertDescription>
          </Alert>

          {/* FAQs */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {tool.faqTemplates.map((faq, i) => (
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

          {/* Related Tools */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold mb-4">Related Tools</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {relatedTools.map(relatedTool => (
                <Link 
                  key={relatedTool.slug}
                  href={`/career-hub/tools/${relatedTool.slug}`}
                  className="p-4 border rounded-lg hover:bg-muted transition-colors group"
                >
                  <h3 className="font-medium group-hover:text-primary transition-colors">
                    {relatedTool.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {relatedTool.shortDescription}
                  </p>
                  <span className="text-sm text-primary mt-2 inline-flex items-center gap-1">
                    Try it <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

