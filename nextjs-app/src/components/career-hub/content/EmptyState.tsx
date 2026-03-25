import { ReactNode } from "react";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    href: string;
  };
  onClearFilters?: () => void;
  className?: string;
}

export default function EmptyState({
  icon,
  title,
  description,
  action,
  onClearFilters,
  className = "",
}: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-16 px-4 text-center ${className}`}>
      <div className="mb-4 text-muted-foreground">
        {icon || <Search className="h-12 w-12" />}
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6 max-w-md">{description}</p>
      <div className="flex flex-col sm:flex-row gap-3">
        {onClearFilters && (
          <Button variant="outline" onClick={onClearFilters}>
            <Filter className="mr-2 h-4 w-4" />
            Clear Filters
          </Button>
        )}
        {action && (
          <Button asChild>
            <Link href={action.href}>{action.label}</Link>
          </Button>
        )}
      </div>
    </div>
  );
}

