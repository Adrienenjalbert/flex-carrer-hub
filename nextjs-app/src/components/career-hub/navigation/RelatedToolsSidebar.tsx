import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Calculator, 
  DollarSign, 
  MapPin, 
  TrendingUp, 
  Target,
  Car,
  Baby,
  GraduationCap,
  Shield,
  Scale,
  Calendar,
  Award,
  ArrowRight
} from "lucide-react";

interface Tool {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  category: string;
}

const allTools: Tool[] = [
  { name: "Pay Calculator", path: "/career-hub/tools/pay-calculator", icon: DollarSign, description: "Calculate take-home pay", category: "financial" },
  { name: "Tax Calculator", path: "/career-hub/tools/tax-calculator", icon: Calculator, description: "1099 & W-2 tax estimates", category: "financial" },
  { name: "Cost of Living", path: "/career-hub/tools/cost-of-living", icon: MapPin, description: "Compare city costs", category: "financial" },
  { name: "Shift Planner", path: "/career-hub/tools/shift-planner", icon: Calendar, description: "Plan your schedule", category: "planning" },
  { name: "Career Path", path: "/career-hub/tools/career-path", icon: TrendingUp, description: "See growth opportunities", category: "career" },
  { name: "Skills Analyzer", path: "/career-hub/tools/skills-analyzer", icon: Target, description: "Find your skill gaps", category: "career" },
  { name: "Commute Calculator", path: "/career-hub/tools/commute-calculator", icon: Car, description: "Commute cost analysis", category: "financial" },
  { name: "Childcare Calculator", path: "/career-hub/tools/childcare-calculator", icon: Baby, description: "Childcare costs by state", category: "financial" },
  { name: "Unemployment Calculator", path: "/career-hub/tools/unemployment-calculator", icon: Shield, description: "Estimate UI benefits", category: "financial" },
  { name: "Job Offer Analyzer", path: "/career-hub/tools/job-offer-analyzer", icon: Scale, description: "Compare job offers", category: "career" },
  { name: "Certification ROI", path: "/career-hub/tools/certification-roi", icon: Award, description: "Certification payback", category: "career" },
  { name: "Benefits Checker", path: "/career-hub/tools/benefits-checker", icon: Shield, description: "Check benefit eligibility", category: "financial" },
  { name: "CocktailQuiz", path: "/career-hub/tools/cocktail-quiz", icon: GraduationCap, description: "Learn mixology", category: "training" },
  { name: "SafetyFirst", path: "/career-hub/tools/safety-first", icon: Shield, description: "Safety training", category: "training" },
  { name: "WorkTalk", path: "/career-hub/tools/worktalk", icon: GraduationCap, description: "Workplace Spanish", category: "training" },
  { name: "MenuMaster", path: "/career-hub/tools/menu-master", icon: GraduationCap, description: "Culinary terms", category: "training" },
];

// Tool relationship mapping - which tools are most related to each other
const toolRelationships: Record<string, string[]> = {
  "/career-hub/tools/pay-calculator": ["tax-calculator", "cost-of-living", "shift-planner", "childcare-calculator"],
  "/career-hub/tools/tax-calculator": ["pay-calculator", "unemployment-calculator", "benefits-checker"],
  "/career-hub/tools/cost-of-living": ["pay-calculator", "commute-calculator", "childcare-calculator", "job-offer-analyzer"],
  "/career-hub/tools/shift-planner": ["pay-calculator", "career-path", "job-offer-analyzer"],
  "/career-hub/tools/career-path": ["skills-analyzer", "certification-roi", "pay-calculator"],
  "/career-hub/tools/skills-analyzer": ["career-path", "certification-roi"],
  "/career-hub/tools/commute-calculator": ["pay-calculator", "cost-of-living", "job-offer-analyzer"],
  "/career-hub/tools/childcare-calculator": ["pay-calculator", "benefits-checker", "job-offer-analyzer"],
  "/career-hub/tools/unemployment-calculator": ["pay-calculator", "benefits-checker", "tax-calculator"],
  "/career-hub/tools/job-offer-analyzer": ["pay-calculator", "commute-calculator", "childcare-calculator", "cost-of-living"],
  "/career-hub/tools/certification-roi": ["career-path", "skills-analyzer", "pay-calculator"],
  "/career-hub/tools/benefits-checker": ["pay-calculator", "childcare-calculator", "tax-calculator"],
  "/career-hub/tools/cocktail-quiz": ["safety-first", "career-path", "certification-roi"],
  "/career-hub/tools/safety-first": ["cocktail-quiz", "career-path", "certification-roi"],
  "/career-hub/tools/worktalk": ["menu-master", "cocktail-quiz"],
  "/career-hub/tools/menu-master": ["worktalk", "cocktail-quiz", "safety-first"],
};

interface RelatedToolsSidebarProps {
  currentPath: string;
  className?: string;
}

const RelatedToolsSidebar = ({ currentPath, className = "" }: RelatedToolsSidebarProps) => {
  // Get related tool slugs for current page
  const relatedSlugs = toolRelationships[currentPath] || [];
  
  // Get full tool objects for related tools
  const relatedTools = relatedSlugs
    .map(slug => allTools.find(t => t.path.includes(slug)))
    .filter(Boolean) as Tool[];

  // If no specific relationships, show tools from different categories
  const defaultTools = relatedTools.length > 0 
    ? relatedTools 
    : allTools.filter(t => t.path !== currentPath).slice(0, 4);

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Related Tools</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {defaultTools.map(tool => (
          <Link
            key={tool.path}
            href={tool.path}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors group"
          >
            <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
              <tool.icon className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium group-hover:text-primary transition-colors">
                {tool.name}
              </div>
              <div className="text-xs text-muted-foreground truncate">
                {tool.description}
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        ))}

        <Link
          href="/career-hub/tools"
          className="flex items-center justify-center gap-1 pt-3 mt-2 border-t text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          View all tools
          <ArrowRight className="h-3 w-3" />
        </Link>
      </CardContent>
    </Card>
  );
};

export default RelatedToolsSidebar;




