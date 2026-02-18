import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Briefcase, MapPin, Calculator, BookOpen } from "lucide-react";

interface RelatedRole {
  title: string;
  slug: string;
  pay: string;
}

interface RelatedLocation {
  name: string;
  slug: string;
}

interface RelatedTool {
  title: string;
  slug: string;
  description: string;
}

interface RelatedGuide {
  title: string;
  slug: string;
  readTime: string;
}

interface RelatedContentProps {
  currentRole?: string;
  roles?: RelatedRole[];
  locations?: RelatedLocation[];
  tools?: RelatedTool[];
  guides?: RelatedGuide[];
  variant?: "full" | "compact" | "minimal";
  className?: string;
}

export default function RelatedContent({
  currentRole,
  roles = [],
  locations = [],
  tools = [],
  guides = [],
  variant = "full",
  className = "",
}: RelatedContentProps) {
  if (variant === "minimal") {
    return (
      <div className={`container mx-auto px-4 py-8 ${className}`}>
        <div className="flex flex-wrap gap-4 justify-center">
          {roles.slice(0, 3).map((role) => (
            <Link
              key={role.slug}
              href={`/career-hub/roles/${role.slug}`}
              className="text-primary hover:underline text-sm"
            >
              {role.title} Jobs
            </Link>
          ))}
          {locations.slice(0, 3).map((location) => (
            <Link
              key={location.slug}
              href={`/career-hub/cities/${location.slug}`}
              className="text-primary hover:underline text-sm"
            >
              {location.name}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className={`container mx-auto px-4 py-12 ${className}`}>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">Explore More</h2>
        <p className="text-muted-foreground mt-2">
          {currentRole
            ? `Discover roles similar to ${currentRole} and helpful resources`
            : "Discover more roles and helpful resources"}
        </p>
      </div>

      <div className={`grid ${variant === "compact" ? "md:grid-cols-2" : "md:grid-cols-4"} gap-6`}>
        {/* Related Roles */}
        {roles.length > 0 && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-primary" />
                Similar Roles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {roles.map((role) => (
                  <li key={role.slug}>
                    <Link
                      href={`/career-hub/roles/${role.slug}`}
                      className="flex items-center justify-between group hover:text-primary transition-colors"
                    >
                      <span className="text-sm group-hover:underline">
                        {role.title}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {role.pay}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/career-hub/roles"
                className="flex items-center gap-1 mt-4 text-sm text-primary hover:underline"
              >
                View all roles <ArrowRight className="h-3 w-3" />
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Related Locations */}
        {locations.length > 0 && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                Job Markets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {locations.map((location) => (
                  <li key={location.slug}>
                    <Link
                      href={`/career-hub/cities/${location.slug}`}
                      className="text-sm hover:text-primary hover:underline transition-colors"
                    >
                      {location.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/career-hub/cities"
                className="flex items-center gap-1 mt-4 text-sm text-primary hover:underline"
              >
                View all cities <ArrowRight className="h-3 w-3" />
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Related Tools */}
        {tools.length > 0 && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calculator className="h-4 w-4 text-primary" />
                Tools
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {tools.map((tool) => (
                  <li key={tool.slug}>
                    <Link
                      href={`/career-hub/tools/${tool.slug}`}
                      className="block group"
                    >
                      <span className="text-sm group-hover:text-primary group-hover:underline transition-colors">
                        {tool.title}
                      </span>
                      <p className="text-xs text-muted-foreground">
                        {tool.description}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/career-hub/tools"
                className="flex items-center gap-1 mt-4 text-sm text-primary hover:underline"
              >
                View all tools <ArrowRight className="h-3 w-3" />
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Related Guides */}
        {guides.length > 0 && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" />
                Guides
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {guides.map((guide) => (
                  <li key={guide.slug}>
                    <Link
                      href={`/career-hub/guides/${guide.slug}`}
                      className="flex items-center justify-between group"
                    >
                      <span className="text-sm group-hover:text-primary group-hover:underline transition-colors">
                        {guide.title}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {guide.readTime}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/career-hub/guides"
                className="flex items-center gap-1 mt-4 text-sm text-primary hover:underline"
              >
                View all guides <ArrowRight className="h-3 w-3" />
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}
