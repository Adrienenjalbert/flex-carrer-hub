import { Metadata } from "next";
import Link from "next/link";
import { Search, Home, Briefcase, Calculator, BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Page Not Found | Indeed Flex Career Hub",
  description: "The page you're looking for doesn't exist. Return to the Career Hub to find jobs, tools, and career resources.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-primary/5 to-background">
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-primary/20 mb-4">404</h1>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Page Not Found
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <Link href="/career-hub">
              <Card className="h-full hover:shadow-soft transition-shadow cursor-pointer group hover:border-primary/30">
                <CardHeader>
                  <div className="p-3 bg-primary/10 rounded-lg w-fit mb-3 group-hover:bg-primary/20 transition-colors">
                    <Home className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    Career Hub Home
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Return to the main Career Hub page
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>

            <Link href="/career-hub/roles">
              <Card className="h-full hover:shadow-soft transition-shadow cursor-pointer group hover:border-primary/30">
                <CardHeader>
                  <div className="p-3 bg-primary/10 rounded-lg w-fit mb-3 group-hover:bg-primary/20 transition-colors">
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    Browse Jobs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Explore flexible work roles
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>

            <Link href="/career-hub/tools">
              <Card className="h-full hover:shadow-soft transition-shadow cursor-pointer group hover:border-primary/30">
                <CardHeader>
                  <div className="p-3 bg-primary/10 rounded-lg w-fit mb-3 group-hover:bg-primary/20 transition-colors">
                    <Calculator className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    Career Tools
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Use our free calculators and tools
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>

            <Link href="/career-hub/guides">
              <Card className="h-full hover:shadow-soft transition-shadow cursor-pointer group hover:border-primary/30">
                <CardHeader>
                  <div className="p-3 bg-primary/10 rounded-lg w-fit mb-3 group-hover:bg-primary/20 transition-colors">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    Career Guides
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Read helpful career resources
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="font-semibold">
              <Link href="/career-hub">
                <Home className="mr-2 h-4 w-4" />
                Go to Career Hub
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="https://indeedflex.com">
                Visit Indeed Flex
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-12 p-6 bg-card rounded-xl border border-border/50">
            <h3 className="font-semibold text-foreground mb-2">Popular Searches</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {[
                "Pay Calculator",
                "Resume Templates",
                "Interview Questions",
                "I-9 Forms",
                "Entry-Level Jobs",
                "Tax Calculator",
              ].map((term) => (
                <Link
                  key={term}
                  href={`/career-hub?search=${encodeURIComponent(term)}`}
                  className="px-3 py-1 bg-secondary hover:bg-secondary/80 rounded-full text-sm text-foreground transition-colors"
                >
                  {term}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

