import Link from "next/link";
import { Briefcase, Calculator, FileText, BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const primaryActions = [
  {
    label: "Browse Jobs",
    href: "/career-hub/roles",
    icon: Briefcase,
    description: "Explore 20+ flexible roles",
    color: "bg-blue-500",
  },
  {
    label: "Calculate Pay",
    href: "/career-hub/tools/paycheck-calculator",
    icon: Calculator,
    description: "Estimate your earnings",
    color: "bg-green-500",
  },
  {
    label: "Get Resume Help",
    href: "/career-hub/job-application-toolkit",
    icon: FileText,
    description: "Free templates & examples",
    color: "bg-purple-500",
  },
  {
    label: "Read Guides",
    href: "/career-hub/guides",
    icon: BookOpen,
    description: "50+ career resources",
    color: "bg-orange-500",
  },
];

export default function PrimaryActions() {
  return (
    <section className="py-12 bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Get Started
            </h2>
            <p className="text-muted-foreground">
              Quick access to the most popular resources
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {primaryActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.label}
                  href={action.href}
                  className="group bg-card rounded-xl p-6 border border-border/50 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`${action.color} p-3 rounded-lg inline-block mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {action.label}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {action.description}
                  </p>
                  <div className="flex items-center gap-2 text-primary font-medium text-sm">
                    Get started
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

