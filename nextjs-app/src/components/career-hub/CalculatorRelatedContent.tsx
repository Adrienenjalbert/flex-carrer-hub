import Link from "next/link";
import { ArrowRight, Calculator, FileText, BookOpen, MapPin, Briefcase } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getToolBySlug, toolRegistry, calculatorRolePresets } from "@/lib/data/tool-registry";

// ============================================
// RELATED TOOLS COMPONENT
// ============================================

interface RelatedToolsProps {
  currentToolSlug: string;
  limit?: number;
  className?: string;
}

export function RelatedTools({ currentToolSlug, limit = 4, className = "" }: RelatedToolsProps) {
  const currentTool = getToolBySlug(currentToolSlug);
  
  if (!currentTool) {
    // Fallback to showing first few tools
    const tools = toolRegistry.filter(t => t.slug !== currentToolSlug).slice(0, limit);
    return <RelatedToolsList tools={tools} className={className} />;
  }
  
  const relatedSlugs = currentTool.relatedTools.slice(0, limit);
  const tools = relatedSlugs
    .map(slug => getToolBySlug(slug))
    .filter((t): t is NonNullable<typeof t> => t !== undefined);
  
  return <RelatedToolsList tools={tools} className={className} />;
}

interface RelatedToolsListProps {
  tools: typeof toolRegistry;
  className?: string;
}

function RelatedToolsList({ tools, className = "" }: RelatedToolsListProps) {
  if (tools.length === 0) return null;
  
  return (
    <section className={className}>
      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
        <Calculator className="h-5 w-5 text-primary" />
        Related Tools
      </h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
        {tools.map(tool => (
          <Link 
            key={tool.slug}
            href={`/career-hub/tools/${tool.slug}`}
            className="p-4 border rounded-lg hover:bg-muted transition-colors group"
          >
            <h3 className="font-medium group-hover:text-primary transition-colors">
              {tool.name}
            </h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {tool.shortDescription}
            </p>
            <span className="text-sm text-primary mt-2 inline-flex items-center gap-1">
              Try it <ArrowRight className="h-3 w-3" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

// ============================================
// RELATED ROLES COMPONENT (for calculator pages)
// ============================================

interface RelatedRolesProps {
  currentRoleId?: string;
  limit?: number;
  className?: string;
}

export function RelatedRoles({ currentRoleId, limit = 6, className = "" }: RelatedRolesProps) {
  const roles = calculatorRolePresets
    .filter(r => r.roleId !== currentRoleId)
    .slice(0, limit);
  
  if (roles.length === 0) return null;
  
  return (
    <section className={className}>
      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
        <Briefcase className="h-5 w-5 text-primary" />
        Calculate Pay for Other Roles
      </h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {roles.map(role => (
          <Link 
            key={role.roleId}
            href={`/paycheck-calculator/${role.roleId}`}
            className="p-4 border rounded-lg hover:bg-muted transition-colors"
          >
            <h3 className="font-medium">{role.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              ${role.hourlyRate}/hr • {role.hoursPerWeek}hrs/wk
              {role.hasTips && ` • + tips`}
            </p>
            <p className="text-sm text-primary mt-2">
              ${(role.hourlyRate * role.hoursPerWeek * 52).toLocaleString()}/yr →
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

// ============================================
// RELATED GUIDES COMPONENT
// ============================================

interface GuideLink {
  title: string;
  slug: string;
  description?: string;
}

const calculatorGuides: GuideLink[] = [
  { 
    title: "Understanding Your Paycheck", 
    slug: "understanding-your-paycheck",
    description: "Learn what each deduction means"
  },
  { 
    title: "Tax Tips for Hourly Workers", 
    slug: "tax-tips-hourly-workers",
    description: "Maximize your take-home pay"
  },
  { 
    title: "How to Increase Your Hourly Rate", 
    slug: "increase-hourly-rate",
    description: "Strategies to earn more"
  },
  { 
    title: "Overtime Rules by State", 
    slug: "overtime-rules",
    description: "Know your rights"
  },
];

interface RelatedGuidesProps {
  guides?: GuideLink[];
  limit?: number;
  className?: string;
}

export function RelatedGuides({ guides = calculatorGuides, limit = 4, className = "" }: RelatedGuidesProps) {
  const displayGuides = guides.slice(0, limit);
  
  return (
    <section className={className}>
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <BookOpen className="h-5 w-5 text-primary" />
        Learn More
      </h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {displayGuides.map(guide => (
          <Link 
            key={guide.slug}
            href={`/career-hub/guides/${guide.slug}`}
            className="p-4 border rounded-lg hover:bg-muted transition-colors"
          >
            <h3 className="font-medium">{guide.title}</h3>
            {guide.description && (
              <p className="text-sm text-muted-foreground mt-1">
                {guide.description}
              </p>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}

// ============================================
// STATE CALCULATORS GRID
// ============================================

const popularStates = [
  { code: "CA", name: "California", slug: "california" },
  { code: "TX", name: "Texas", slug: "texas" },
  { code: "FL", name: "Florida", slug: "florida" },
  { code: "NY", name: "New York", slug: "new-york" },
  { code: "WA", name: "Washington", slug: "washington" },
  { code: "NV", name: "Nevada", slug: "nevada" },
  { code: "AZ", name: "Arizona", slug: "arizona" },
  { code: "CO", name: "Colorado", slug: "colorado" },
  { code: "GA", name: "Georgia", slug: "georgia" },
  { code: "IL", name: "Illinois", slug: "illinois" },
];

interface StateCalculatorsProps {
  currentStateCode?: string;
  limit?: number;
  className?: string;
}

export function StateCalculators({ currentStateCode, limit = 10, className = "" }: StateCalculatorsProps) {
  const states = popularStates
    .filter(s => s.code !== currentStateCode)
    .slice(0, limit);
  
  return (
    <section className={className}>
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <MapPin className="h-5 w-5 text-primary" />
        State Paycheck Calculators
      </h2>
      <div className="flex flex-wrap gap-2">
        {states.map(state => (
          <Link 
            key={state.code}
            href={`/paycheck-calculator/${state.slug}`}
            className="px-3 py-1.5 border rounded-full text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            {state.name}
          </Link>
        ))}
        <Link 
          href="/career-hub/tools/paycheck-calculator"
          className="px-3 py-1.5 bg-muted rounded-full text-sm hover:bg-muted/80 transition-colors"
        >
          All States →
        </Link>
      </div>
    </section>
  );
}

// ============================================
// COMBINED CALCULATOR FOOTER
// ============================================

interface CalculatorFooterProps {
  currentToolSlug: string;
  currentRoleId?: string;
  currentStateCode?: string;
  className?: string;
}

export function CalculatorFooter({
  currentToolSlug,
  currentRoleId,
  currentStateCode,
  className = "",
}: CalculatorFooterProps) {
  return (
    <div className={`space-y-12 ${className}`}>
      <RelatedTools currentToolSlug={currentToolSlug} />
      <RelatedRoles currentRoleId={currentRoleId} />
      <StateCalculators currentStateCode={currentStateCode} />
      <RelatedGuides />
    </div>
  );
}

// ============================================
// INLINE CALCULATOR CTA
// ============================================

interface InlineCalculatorCTAProps {
  toolSlug?: string;
  roleId?: string;
  stateCode?: string;
  headline?: string;
  className?: string;
}

export function InlineCalculatorCTA({
  toolSlug = "paycheck-calculator",
  roleId,
  stateCode,
  headline = "Calculate Your Take-Home Pay",
  className = "",
}: InlineCalculatorCTAProps) {
  // Build URL with prefill params
  let url = `/career-hub/tools/${toolSlug}`;
  const params = new URLSearchParams();
  if (roleId) params.set('role', roleId);
  if (stateCode) params.set('state', stateCode);
  if (params.toString()) url += `?${params.toString()}`;
  
  return (
    <Card className={`border-primary/20 bg-primary/5 ${className}`}>
      <CardContent className="pt-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Calculator className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">{headline}</h3>
              <p className="text-sm text-muted-foreground">
                Free calculator with state taxes and deductions
              </p>
            </div>
          </div>
          <Link 
            href={url}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Open Calculator
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default RelatedTools;
