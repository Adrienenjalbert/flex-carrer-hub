import { ArrowRight, Download, FileText } from "lucide-react";

interface InlineCTAProps {
  title: string;
  subtitle: string;
  href: string;
  variant: "app" | "resume-builder";
}

const InlineCTA = ({ title, subtitle, href, variant }: InlineCTAProps) => {
  const Icon = variant === "app" ? Download : FileText;

  return (
    <div className="my-8 rounded-xl border border-border bg-secondary/50 px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-4">
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <div className="flex-shrink-0 p-2 rounded-lg bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-foreground leading-snug">{title}</p>
          <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>
        </div>
      </div>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors flex-shrink-0"
      >
        {variant === "app" ? "Get the App" : "Build Resume"}
        <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  );
};

export default InlineCTA;
