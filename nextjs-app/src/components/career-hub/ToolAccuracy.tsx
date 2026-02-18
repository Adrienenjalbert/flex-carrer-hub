import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Info, ShieldCheck, FileText, ExternalLink } from "lucide-react";

// ============================================
// DATA SOURCE CITATION COMPONENT
// ============================================

export interface DataSource {
  name: string;
  url: string;
  lastVerified: string;
  description?: string;
}

interface DataSourceCitationProps {
  sources: DataSource[];
  lastUpdated?: string;
  className?: string;
}

export function DataSourceCitation({ sources, lastUpdated, className = "" }: DataSourceCitationProps) {
  return (
    <Card className={`bg-muted/50 border-dashed ${className}`}>
      <CardContent className="pt-4">
        <div className="flex items-start gap-2 mb-3">
          <ShieldCheck className="h-4 w-4 text-green-600 mt-0.5" />
          <p className="text-xs font-medium text-green-700">
            Verified Data Sources
          </p>
        </div>
        <ul className="text-xs space-y-2 text-muted-foreground">
          {sources.map((source, i) => (
            <li key={i} className="flex items-start gap-1">
              <span>•</span>
              <div>
                <a 
                  href={source.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline inline-flex items-center gap-1"
                >
                  {source.name}
                  <ExternalLink className="h-2.5 w-2.5" />
                </a>
                {source.description && (
                  <span className="text-muted-foreground"> - {source.description}</span>
                )}
                <span className="text-muted-foreground/70"> (verified {source.lastVerified})</span>
              </div>
            </li>
          ))}
        </ul>
        {lastUpdated && (
          <p className="text-xs text-muted-foreground mt-3 pt-3 border-t italic">
            Calculator last updated: {lastUpdated}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

// ============================================
// METHODOLOGY SECTION COMPONENT
// ============================================

interface MethodologyStep {
  step: number;
  title: string;
  description: string;
  formula?: string;
}

interface MethodologySectionProps {
  title?: string;
  steps: MethodologyStep[];
  sources?: DataSource[];
  className?: string;
}

export function MethodologySection({ 
  title = "How We Calculate Your Results", 
  steps, 
  sources,
  className = "" 
}: MethodologySectionProps) {
  return (
    <Accordion type="single" collapsible className={`w-full ${className}`}>
      <AccordionItem value="methodology">
        <AccordionTrigger>
          <span className="flex items-center gap-2">
            <Info className="h-4 w-4" />
            {title}
          </span>
        </AccordionTrigger>
        <AccordionContent>
          <div className="p-4 bg-muted/50 rounded-lg space-y-4">
            <ol className="space-y-3">
              {steps.map((step) => (
                <li key={step.step} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-sm flex items-center justify-center font-medium">
                    {step.step}
                  </span>
                  <div>
                    <p className="font-medium text-sm">{step.title}</p>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                    {step.formula && (
                      <code className="text-xs bg-muted px-2 py-1 rounded mt-1 inline-block font-mono">
                        {step.formula}
                      </code>
                    )}
                  </div>
                </li>
              ))}
            </ol>
            
            {sources && sources.length > 0 && (
              <div className="pt-4 border-t">
                <p className="text-xs font-medium mb-2">Data Sources:</p>
                <ul className="text-xs space-y-1 text-muted-foreground">
                  {sources.map((source, i) => (
                    <li key={i}>
                      • {source.name} - {source.description} (verified {source.lastVerified})
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

// ============================================
// CALCULATOR DISCLAIMER COMPONENT
// ============================================

interface CalculatorDisclaimerProps {
  type?: "default" | "tax" | "financial" | "estimate";
  customMessage?: string;
  className?: string;
}

const disclaimerMessages = {
  default: "This calculator provides estimates only. Actual results may vary based on individual circumstances.",
  tax: "This calculator provides tax estimates based on 2026 rates. Actual taxes depend on your complete financial situation, deductions, and credits. Consult a tax professional for accurate calculations.",
  financial: "This calculator is for informational purposes only and does not constitute financial advice. Consult a qualified financial advisor for personalized guidance.",
  estimate: "Results are estimates based on the information provided. Actual amounts may differ due to additional factors not included in this calculation.",
};

export function CalculatorDisclaimer({ 
  type = "default", 
  customMessage,
  className = "" 
}: CalculatorDisclaimerProps) {
  return (
    <Alert className={className}>
      <Info className="h-4 w-4" />
      <AlertTitle>Estimate Only</AlertTitle>
      <AlertDescription>
        {customMessage || disclaimerMessages[type]}
      </AlertDescription>
    </Alert>
  );
}

// ============================================
// ACCURACY BADGE COMPONENT
// ============================================

interface AccuracyBadgeProps {
  tier: 1 | 2 | 3;
  showLabel?: boolean;
  className?: string;
}

const tierInfo = {
  1: { 
    label: "High Confidence", 
    description: "Simple math, no external variables",
    color: "bg-green-100 text-green-700 border-green-200"
  },
  2: { 
    label: "Estimated", 
    description: "Uses simplified tax models",
    color: "bg-yellow-100 text-yellow-700 border-yellow-200"
  },
  3: { 
    label: "Range Estimate", 
    description: "Provides conservative ranges",
    color: "bg-orange-100 text-orange-700 border-orange-200"
  },
};

export function AccuracyBadge({ tier, showLabel = true, className = "" }: AccuracyBadgeProps) {
  const info = tierInfo[tier];
  
  return (
    <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full border text-xs ${info.color} ${className}`}>
      <ShieldCheck className="h-3 w-3" />
      {showLabel && <span>{info.label}</span>}
    </div>
  );
}

// ============================================
// LAST UPDATED BADGE
// ============================================

interface LastUpdatedBadgeProps {
  date: string;
  className?: string;
}

export function LastUpdatedBadge({ date, className = "" }: LastUpdatedBadgeProps) {
  return (
    <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-muted text-xs text-muted-foreground ${className}`}>
      <FileText className="h-3 w-3" />
      <span>Updated {date}</span>
    </div>
  );
}

// ============================================
// COMBINED TOOL FOOTER COMPONENT
// ============================================

interface ToolAccuracyFooterProps {
  accuracyTier?: 1 | 2 | 3;
  methodology?: MethodologyStep[];
  sources?: DataSource[];
  lastUpdated?: string;
  disclaimerType?: "default" | "tax" | "financial" | "estimate";
  customDisclaimer?: string;
  className?: string;
}

export function ToolAccuracyFooter({
  accuracyTier = 2,
  methodology,
  sources = [],
  lastUpdated,
  disclaimerType = "default",
  customDisclaimer,
  className = ""
}: ToolAccuracyFooterProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      {methodology && methodology.length > 0 && (
        <MethodologySection steps={methodology} sources={sources} />
      )}
      
      <CalculatorDisclaimer 
        type={disclaimerType} 
        customMessage={customDisclaimer} 
      />
      
      {sources.length > 0 && (
        <DataSourceCitation sources={sources} lastUpdated={lastUpdated} />
      )}
    </div>
  );
}

// Export default methodology steps for common calculators
export const paycheckMethodology: MethodologyStep[] = [
  { 
    step: 1, 
    title: "Calculate Gross Pay", 
    description: "Multiply hourly rate by hours per week, then by 52 weeks",
    formula: "Hourly × Hours × 52 = Annual Gross"
  },
  { 
    step: 2, 
    title: "Apply Pre-tax Deductions", 
    description: "Subtract 401(k) and other pre-tax contributions",
    formula: "Gross - 401k = Taxable Income"
  },
  { 
    step: 3, 
    title: "Calculate Federal Tax", 
    description: "Apply 2026 IRS marginal tax brackets (10% - 37%)",
  },
  { 
    step: 4, 
    title: "Calculate State Tax", 
    description: "Apply your state's income tax rate (0% - 13.3%)",
  },
  { 
    step: 5, 
    title: "Calculate FICA", 
    description: "6.2% Social Security (up to $168,600) + 1.45% Medicare",
    formula: "FICA = (6.2% × min(Gross, $168,600)) + (1.45% × Gross)"
  },
  { 
    step: 6, 
    title: "Calculate Take-Home", 
    description: "Subtract all taxes and deductions from gross",
    formula: "Take-Home = Gross - Federal - State - FICA - 401k"
  },
];

export const taxMethodology: MethodologyStep[] = [
  { 
    step: 1, 
    title: "Calculate Gross Income", 
    description: "Sum all income sources (wages, tips, gig income)",
  },
  { 
    step: 2, 
    title: "Apply Deductions", 
    description: "Subtract eligible deductions (mileage, business expenses)",
    formula: "Taxable = Gross - Deductions"
  },
  { 
    step: 3, 
    title: "Calculate Self-Employment Tax (1099)", 
    description: "15.3% on 92.35% of net self-employment earnings",
    formula: "SE Tax = Net × 0.9235 × 0.153"
  },
  { 
    step: 4, 
    title: "Calculate Federal Income Tax", 
    description: "Apply 2026 brackets after SE tax deduction",
  },
  { 
    step: 5, 
    title: "Calculate State Tax", 
    description: "Apply state-specific rates and brackets",
  },
  { 
    step: 6, 
    title: "Estimate Quarterly Payments", 
    description: "Divide total tax by 4 for quarterly estimates",
    formula: "Quarterly = Total Tax ÷ 4"
  },
];

