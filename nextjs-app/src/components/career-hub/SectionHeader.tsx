import { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    href: string;
  };
  badge?: string | number;
  icon?: ReactNode;
  className?: string;
}

export default function SectionHeader({
  title,
  description,
  action,
  badge,
  icon,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`flex items-start justify-between gap-4 mb-6 ${className}`}>
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          {icon && <div className="text-primary">{icon}</div>}
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h2>
          {badge && (
            <span className="px-2 py-1 bg-muted text-muted-foreground text-sm font-medium rounded">
              {badge}
            </span>
          )}
        </div>
        {description && (
          <p className="text-muted-foreground text-base md:text-lg max-w-3xl">{description}</p>
        )}
      </div>
      {action && (
        <Link
          href={action.href}
          className="flex items-center gap-2 text-primary hover:text-primary/80 font-semibold text-sm whitespace-nowrap transition-colors"
        >
          {action.label}
          <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}

