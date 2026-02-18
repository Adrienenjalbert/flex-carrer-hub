import Link from "next/link";
import { roles } from "@/lib/data/roles";
import { cities } from "@/lib/data/cities";

interface ContextualLinkProps {
  children: string;
  className?: string;
}

// Maps for role and city matching
const roleMap = new Map(
  roles.map((role) => [role.title.toLowerCase(), role.slug])
);
const cityMap = new Map(
  cities.map((c) => [c.city.toLowerCase(), c.slug])
);

// Tool keywords to paths
const toolKeywords: Record<string, string> = {
  "pay calculator": "/career-hub/tools/paycheck-calculator",
  "paycheck calculator": "/career-hub/tools/paycheck-calculator",
  "tax calculator": "/career-hub/tools/tax-calculator",
  "shift planner": "/career-hub/tools/shift-planner",
  "cost of living": "/career-hub/tools/cost-of-living",
  "benefits checker": "/career-hub/tools/benefits-checker",
  "unemployment calculator": "/career-hub/tools/unemployment-calculator",
  "career path": "/career-hub/tools/career-path",
  "career path explorer": "/career-hub/tools/career-path",
  "job offer analyzer": "/career-hub/tools/job-offer-analyzer",
  "skills analyzer": "/career-hub/tools/skills-analyzer",
  "commute calculator": "/career-hub/tools/commute-calculator",
  "childcare calculator": "/career-hub/tools/childcare-calculator",
  "take home pay": "/career-hub/tools/take-home-pay",
  "salary converter": "/career-hub/tools/salary-converter",
};

/**
 * ContextualLink - Automatically creates internal links from text content
 * 
 * This component scans text for mentions of:
 * - Role names (e.g., "warehouse associate", "bartender")
 * - City names (e.g., "Los Angeles", "Chicago")
 * - Tool references (e.g., "pay calculator", "tax calculator")
 * 
 * And converts them to internal links automatically.
 */
export function ContextualLink({ children, className }: ContextualLinkProps) {
  const text = children;
  const segments: Array<{ text: string; href?: string }> = [];
  let remainingText = text;
  let lastIndex = 0;

  // Function to find and mark links
  const findLinks = () => {
    const lowerText = text.toLowerCase();
    const matches: Array<{ start: number; end: number; href: string; original: string }> = [];

    // Check for role mentions
    roleMap.forEach((slug, roleName) => {
      let index = lowerText.indexOf(roleName, 0);
      while (index !== -1) {
        matches.push({
          start: index,
          end: index + roleName.length,
          href: `/career-hub/roles/${slug}`,
          original: text.substring(index, index + roleName.length),
        });
        index = lowerText.indexOf(roleName, index + 1);
      }
    });

    // Check for city mentions
    cityMap.forEach((slug, cityName) => {
      let index = lowerText.indexOf(cityName, 0);
      while (index !== -1) {
        matches.push({
          start: index,
          end: index + cityName.length,
          href: `/career-hub/cities/${slug}`,
          original: text.substring(index, index + cityName.length),
        });
        index = lowerText.indexOf(cityName, index + 1);
      }
    });

    // Check for tool mentions
    Object.entries(toolKeywords).forEach(([keyword, path]) => {
      let index = lowerText.indexOf(keyword, 0);
      while (index !== -1) {
        matches.push({
          start: index,
          end: index + keyword.length,
          href: path,
          original: text.substring(index, index + keyword.length),
        });
        index = lowerText.indexOf(keyword, index + 1);
      }
    });

    // Sort by start position and filter overlaps
    matches.sort((a, b) => a.start - b.start);
    const nonOverlapping: typeof matches = [];
    let lastEnd = 0;

    for (const match of matches) {
      if (match.start >= lastEnd) {
        nonOverlapping.push(match);
        lastEnd = match.end;
      }
    }

    return nonOverlapping;
  };

  const links = findLinks();

  // Build segments
  for (const link of links) {
    if (link.start > lastIndex) {
      segments.push({ text: text.substring(lastIndex, link.start) });
    }
    segments.push({ text: link.original, href: link.href });
    lastIndex = link.end;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    segments.push({ text: text.substring(lastIndex) });
  }

  // If no links found, just return the text
  if (segments.length === 0) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className}>
      {segments.map((segment, index) =>
        segment.href ? (
          <Link
            key={index}
            href={segment.href}
            className="text-primary hover:underline"
          >
            {segment.text}
          </Link>
        ) : (
          <span key={index}>{segment.text}</span>
        )
      )}
    </span>
  );
}

/**
 * AutoLinkContent - Wraps content and auto-links recognized terms
 * Use this for paragraphs of content where you want automatic linking
 */
export function AutoLinkContent({
  content,
  className,
  maxLinks = 5,
}: {
  content: string;
  className?: string;
  maxLinks?: number;
}) {
  // For longer content, limit the number of auto-links to avoid over-linking
  // This is a simplified version - for production, you'd want more sophisticated logic
  return <ContextualLink className={className}>{content}</ContextualLink>;
}

export default ContextualLink;

