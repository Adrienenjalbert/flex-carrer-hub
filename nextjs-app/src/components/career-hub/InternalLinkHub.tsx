import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cities, City, isActiveMarket } from '@/lib/data/cities';
import { roles, industries, Role, getRoleBySlug } from '@/lib/data/roles';
import { howToBecomeGuides, HowToBecomeGuide } from '@/lib/data/how-to-become';
import { getToolBySlug, toolRegistry } from '@/lib/data/tool-registry';
import { personaHubs, getPersonaHub } from '@/lib/data/persona-hubs';
import { allGuideArticles } from '@/lib/data/articles/guides';
import { 
  MapPin, 
  Briefcase, 
  Building2, 
  Wrench, 
  TrendingUp,
  Search,
  GraduationCap,
  Calculator,
  FileText,
  DollarSign,
  Calendar,
  Target,
  Wallet,
  ArrowRight
} from 'lucide-react';

interface LinkItem {
  href: string;
  label: string;
  description?: string;
}

interface LinkSection {
  title: string;
  icon: React.ReactNode;
  links: LinkItem[];
}

export interface PageContext {
  type: 'role' | 'city' | 'tool' | 'guide' | 'financial' | 'application'
       | 'seasonal' | 'how-to-become' | 'interview' | 'persona'
       | 'wage-report' | 'certification' | 'home' | 'generic' | 'about' | 'industry' | 'location'
       | 'career-evaluation' | 'salary-by-city' | 'pay-range';
  slug?: string;
  title?: string;       // For dynamic headings
  city?: string;
  role?: string;
  industry?: string;
  season?: string;      // For seasonal pages
  guideCategory?: string; // For guide articles
  personaSlug?: string;   // To pull from persona-hubs.ts
  relatedTools?: string[];  // Passed from tool page
  relatedArticles?: string[]; // Passed from guide page
}

interface InternalLinkHubProps {
  variant?: 'sidebar' | 'footer' | 'full';
  currentPage?: PageContext;
  maxLinksPerSection?: number;
  showAllSections?: boolean;
}

interface ContextualRecommendations {
  title: string;
  subtitle: string;
  sections: LinkSection[];
}

// Get top cities - prioritize Indeed Flex active markets
export const getTopCities = (limit: number = 8, excludeSlug?: string): City[] => {
  const activeMarkets = cities
    .filter(city => city.slug !== excludeSlug)
    .filter(city => isActiveMarket(city.slug));
  
  const otherHighVolume = cities
    .filter(city => city.slug !== excludeSlug)
    .filter(city => !isActiveMarket(city.slug) && city.searchVolume === 'high');
  
  return [...activeMarkets, ...otherHighVolume].slice(0, limit);
};

// Get roles by industry
export const getRolesByIndustry = (industry?: string, limit: number = 6, excludeSlug?: string): Role[] => {
  let filtered = roles.filter(role => role.slug !== excludeSlug);
  if (industry) {
    filtered = filtered.filter(role => role.industry === industry);
  }
  return filtered.slice(0, limit);
};

// Get related cities (same region or nearby)
const getRelatedCities = (currentCity: City, limit: number = 6): City[] => {
  return cities
    .filter(city => city.slug !== currentCity.slug)
    .filter(city => city.region === currentCity.region || city.searchVolume === 'high')
    .slice(0, limit);
};

// Generate city + role links
export const getCityRoleLinks = (citySlug?: string, roleSlug?: string, limit: number = 6): LinkItem[] => {
  const links: LinkItem[] = [];
  const topCities = cities.filter(c => c.searchVolume === 'high').slice(0, 4);
  const topRoles = roles.slice(0, 4);
  
  if (citySlug) {
    topRoles.filter(r => r.slug !== roleSlug).forEach(role => {
      links.push({
        href: `/career-hub/cities/${citySlug}/${role.slug}`,
        label: `${role.title} Jobs in ${cities.find(c => c.slug === citySlug)?.city || citySlug}`,
      });
    });
  } else if (roleSlug) {
    topCities.forEach(city => {
      links.push({
        href: `/career-hub/cities/${city.slug}/${roleSlug}`,
        label: `${roles.find(r => r.slug === roleSlug)?.title || roleSlug} in ${city.city}`,
      });
    });
  } else {
    topCities.slice(0, 3).forEach(city => {
      topRoles.slice(0, 2).forEach(role => {
        links.push({
          href: `/career-hub/cities/${city.slug}/${role.slug}`,
          label: `${role.title} Jobs in ${city.city}`,
        });
      });
    });
  }
  
  return links.slice(0, limit);
};

// Generate industry + location links
export const getIndustryLocationLinks = (currentIndustry?: string, currentCity?: string, limit: number = 6): LinkItem[] => {
  const links: LinkItem[] = [];
  const industryNames = ['warehouse', 'hospitality', 'retail', 'logistics'];
  const topCities = cities.filter(c => c.searchVolume === 'high').slice(0, 8);
  
  industryNames.filter(ind => ind !== currentIndustry).forEach(industry => {
    topCities.filter(city => city.slug !== currentCity).slice(0, 2).forEach(city => {
      links.push({
        href: `/${industry}-jobs-${city.slug}`,
        label: `${industry.charAt(0).toUpperCase() + industry.slice(1)} Jobs in ${city.city}`,
      });
    });
  });
  
  return links.slice(0, limit);
};

// Generate intent-based page links
export const getIntentPageLinks = (currentCity?: string, limit: number = 6): LinkItem[] => {
  const links: LinkItem[] = [];
  const topCities = cities.filter(c => c.searchVolume === 'high' && c.slug !== currentCity).slice(0, 6);
  
  topCities.forEach(city => {
    links.push({
      href: `/how-to-find-temp-work-in-${city.slug}`,
      label: `How to Find Temp Work in ${city.city}`,
    });
  });
  
  return links.slice(0, limit);
};

// Generate How-To guide links
const getHowToGuideLinks = (industry?: string, roleSlug?: string, limit: number = 6): LinkItem[] => {
  let filtered = howToBecomeGuides.filter(g => g.roleSlug !== roleSlug);
  
  if (industry) {
    const sameIndustry = filtered.filter(g => g.industry === industry);
    const otherIndustry = filtered.filter(g => g.industry !== industry);
    filtered = [...sameIndustry, ...otherIndustry];
  }
  
  return filtered.slice(0, limit).map(guide => ({
    href: `/how-to-become/${guide.roleSlug}`,
    label: `How to Become a ${guide.roleTitle}`,
    description: guide.timeToStart ? `Start in ${guide.timeToStart}` : undefined,
  }));
};

// Get tool links from registry
const getToolLinks = (toolSlugs: string[], excludeSlug?: string, limit: number = 6): LinkItem[] => {
  const links: (LinkItem | null)[] = toolSlugs
    .filter(slug => slug !== excludeSlug)
    .slice(0, limit)
    .map(slug => {
      const tool = getToolBySlug(slug);
      if (!tool) return null;
      return {
        href: `/career-hub/tools/${tool.slug}`,
        label: tool.name,
        description: tool.shortDescription,
      };
    });
  return links.filter((item): item is LinkItem => item !== null);
};

// Get guide article links
const getGuideArticleLinks = (articleSlugs: string[], excludeSlug?: string, limit: number = 6): LinkItem[] => {
  const links: (LinkItem | null)[] = articleSlugs
    .filter(slug => slug !== excludeSlug)
    .slice(0, limit)
    .map(slug => {
      const article = allGuideArticles[slug];
      if (!article) return null;
      return {
        href: `/career-hub/guides/${slug}`,
        label: article.title,
        description: article.readTime,
      };
    });
  return links.filter((item): item is LinkItem => item !== null);
};

// Main contextual recommendations function
const getContextualRecommendations = (context?: PageContext): ContextualRecommendations => {
  const defaultRecs: ContextualRecommendations = {
    title: 'Explore Career Resources',
    subtitle: 'Discover opportunities across roles, cities, and industries',
    sections: [],
  };

  if (!context) {
    // Generic fallback
    const roleLinks = getRolesByIndustry(undefined, 6);
    const cityLinks = getTopCities(6);
    
    return {
      title: 'Explore Career Resources',
      subtitle: 'Discover opportunities across roles, cities, and industries',
      sections: [
        {
          title: 'Explore Roles',
          icon: <Briefcase className="h-4 w-4" />,
          links: roleLinks.map(role => ({
            href: `/career-hub/roles/${role.slug}`,
            label: role.title,
            description: role.shortDescription,
          })),
        },
        {
          title: 'Top Cities',
          icon: <MapPin className="h-4 w-4" />,
          links: cityLinks.map(city => ({
            href: `/career-hub/cities/${city.slug}`,
            label: `${city.city}, ${city.stateCode}`,
            description: `$${city.avgHourlyWage.min}-${city.avgHourlyWage.max}/hr avg`,
          })),
        },
        {
          title: 'Free Tools',
          icon: <Wrench className="h-4 w-4" />,
          links: [
            { href: '/career-hub/tools/paycheck-calculator', label: 'Paycheck Calculator', description: 'Calculate your earnings' },
            { href: '/career-hub/tools/tax-calculator', label: 'Tax Calculator', description: 'Estimate take-home pay' },
            { href: '/career-hub/tools/shift-planner', label: 'Shift Planner', description: 'Plan your schedule' },
          ],
        },
      ],
    };
  }

  // Role Detail Page
  if (context.type === 'role' && context.role) {
    const role = getRoleBySlug(context.role);
    if (!role) return defaultRecs;

    const sections: LinkSection[] = [];

    // Paycheck Calculator (prefilled with role data)
    sections.push({
      title: 'Calculate Your Earnings',
      icon: <Calculator className="h-4 w-4" />,
      links: [
        {
          href: `/career-hub/tools/paycheck-calculator?role=${context.role}`,
          label: 'Paycheck Calculator',
          description: `See take-home pay for ${role.title}`,
        },
      ],
    });

    // How to Become this Role
    const howToGuide = howToBecomeGuides.find(g => g.roleSlug === context.role);
    if (howToGuide) {
      sections.push({
        title: 'Build Your Career Path',
        icon: <GraduationCap className="h-4 w-4" />,
        links: [
          {
            href: `/how-to-become/${context.role}`,
            label: `How to Become a ${role.title}`,
            description: howToGuide.timeToStart,
          },
        ],
      });
    }

    // Interview Questions
    sections.push({
      title: 'Prepare for Interviews',
      icon: <FileText className="h-4 w-4" />,
      links: [
        {
          href: `/interview-questions/${context.role}`,
          label: `${role.title} Interview Questions`,
          description: 'Common questions and answers',
        },
      ],
    });

    // Related roles in same industry
    const relatedRoles = getRolesByIndustry(role.industry, 4, context.role);
    if (relatedRoles.length > 0) {
      sections.push({
        title: `More ${role.industry} Roles`,
        icon: <Briefcase className="h-4 w-4" />,
        links: relatedRoles.map(r => ({
          href: `/career-hub/roles/${r.slug}`,
          label: r.title,
          description: `$${r.avgHourlyRate.min}-${r.avgHourlyRate.max}/hr`,
        })),
      });
    }

    return {
      title: `Plan Your ${role.title} Career`,
      subtitle: 'Tools and resources to help you succeed',
      sections,
    };
  }

  // City Detail Page
  if (context.type === 'city' && context.city) {
    const city = cities.find(c => c.slug === context.city);
    if (!city) return defaultRecs;

    const sections: LinkSection[] = [];

    // Top roles hiring in this city
    const topRoles = roles
      .filter(r => r.searchVolume === 'very-high' || r.searchVolume === 'high')
      .slice(0, 6);
    sections.push({
      title: 'Top Jobs in This City',
      icon: <Briefcase className="h-4 w-4" />,
      links: topRoles.map(role => ({
        href: `/career-hub/cities/${context.city}/${role.slug}`,
        label: `${role.title} Jobs`,
        description: `$${role.avgHourlyRate.min}-${role.avgHourlyRate.max}/hr`,
      })),
    });

    // Cost of Living Calculator
    sections.push({
      title: 'Compare Living Costs',
      icon: <Calculator className="h-4 w-4" />,
      links: [
        {
          href: `/career-hub/tools/cost-of-living?city=${context.city}`,
          label: 'Cost of Living Calculator',
          description: `See expenses in ${city.city}`,
        },
      ],
    });

    // Nearby cities
    const nearbyCities = getRelatedCities(city, 4);
    if (nearbyCities.length > 0) {
      sections.push({
        title: 'Nearby Cities',
        icon: <MapPin className="h-4 w-4" />,
        links: nearbyCities.map(c => ({
          href: `/career-hub/cities/${c.slug}`,
          label: `${c.city}, ${c.stateCode}`,
          description: `$${c.avgHourlyWage.min}-${c.avgHourlyWage.max}/hr avg`,
        })),
      });
    }

    return {
      title: `Explore Jobs in ${city.city}`,
      subtitle: 'Find opportunities and compare costs',
      sections,
    };
  }

  // Tool Page
  if (context.type === 'tool' && context.slug) {
    const tool = getToolBySlug(context.slug);
    if (!tool) return defaultRecs;

    const sections: LinkSection[] = [];

    // Related tools
    const relatedToolSlugs = context.relatedTools || tool.relatedTools || [];
    if (relatedToolSlugs.length > 0) {
      const relatedToolLinks = getToolLinks(relatedToolSlugs, context.slug, 4);
      if (relatedToolLinks.length > 0) {
        sections.push({
          title: 'Related Tools',
          icon: <Wrench className="h-4 w-4" />,
          links: relatedToolLinks,
        });
      }
    }

    // Financial/career guides
    const financialGuides = ['irregular-income-budget', 'tax-tips', 'emergency-fund-guide'];
    const guideLinks = getGuideArticleLinks(financialGuides, undefined, 3);
    if (guideLinks.length > 0) {
      sections.push({
        title: 'Financial Guides',
        icon: <FileText className="h-4 w-4" />,
        links: guideLinks,
      });
    }

    // Popular roles with salary data
    const popularRoles = roles
      .filter(r => r.searchVolume === 'very-high' || r.searchVolume === 'high')
      .slice(0, 4);
    sections.push({
      title: 'Popular Roles',
      icon: <Briefcase className="h-4 w-4" />,
      links: popularRoles.map(role => ({
        href: `/career-hub/roles/${role.slug}`,
        label: role.title,
        description: `$${role.avgHourlyRate.min}-${role.avgHourlyRate.max}/hr`,
      })),
    });

    return {
      title: 'Make Better Career Decisions',
      subtitle: 'Explore related tools and resources',
      sections,
    };
  }

  // Guide Article Page
  if (context.type === 'guide' && context.slug) {
    const article = allGuideArticles[context.slug];
    if (!article) return defaultRecs;

    const sections: LinkSection[] = [];

    // Related articles
    const relatedArticleSlugs = context.relatedArticles || article.relatedArticles || [];
    if (relatedArticleSlugs.length > 0) {
      const relatedLinks = getGuideArticleLinks(relatedArticleSlugs, context.slug, 4);
      if (relatedLinks.length > 0) {
        sections.push({
          title: 'Keep Learning',
          icon: <FileText className="h-4 w-4" />,
          links: relatedLinks,
        });
      }
    }

    // Matching tools (based on category)
    if (article.categorySlug === 'getting-started') {
      sections.push({
        title: 'Get Started Tools',
        icon: <Calculator className="h-4 w-4" />,
        links: [
          { href: '/career-hub/tools/paycheck-calculator', label: 'Paycheck Calculator', description: 'Calculate earnings' },
          { href: '/career-hub/tools/shift-planner', label: 'Shift Planner', description: 'Plan your schedule' },
        ],
      });
    }

    // Entry-level roles
    const entryLevelRoles = roles.filter(r => r.entryLevel === true).slice(0, 4);
    if (entryLevelRoles.length > 0) {
      sections.push({
        title: 'Entry-Level Roles',
        icon: <Briefcase className="h-4 w-4" />,
        links: entryLevelRoles.map(role => ({
          href: `/career-hub/roles/${role.slug}`,
          label: role.title,
          description: `$${role.avgHourlyRate.min}-${role.avgHourlyRate.max}/hr`,
        })),
      });
    }

    return {
      title: 'Keep Learning',
      subtitle: 'Continue your career journey',
      sections,
    };
  }

  // Financial Tips Page
  if (context.type === 'financial') {
    const sections: LinkSection[] = [
      {
        title: 'Financial Tools',
        icon: <Calculator className="h-4 w-4" />,
        links: [
          { href: '/career-hub/tools/paycheck-calculator', label: 'Paycheck Calculator', description: 'Calculate take-home pay' },
          { href: '/career-hub/tools/tax-calculator', label: 'Tax Calculator', description: 'Estimate taxes' },
        ],
      },
      {
        title: 'Wage Insights',
        icon: <TrendingUp className="h-4 w-4" />,
        links: [
          { href: '/career-hub/wage-report', label: '2026 Wage Report', description: 'Industry pay data' },
        ],
      },
      {
        title: 'High-Paying Roles',
        icon: <DollarSign className="h-4 w-4" />,
        links: roles
          .filter(r => r.avgHourlyRate.max >= 22)
          .sort((a, b) => b.avgHourlyRate.max - a.avgHourlyRate.max)
          .slice(0, 4)
          .map(role => ({
            href: `/career-hub/roles/${role.slug}`,
            label: role.title,
            description: `$${role.avgHourlyRate.min}-${role.avgHourlyRate.max}/hr`,
          })),
      },
    ];

    return {
      title: 'Manage Your Money Better',
      subtitle: 'Tools and insights to maximize your earnings',
      sections,
    };
  }

  // Application Toolkit Page
  if (context.type === 'application') {
    const sections: LinkSection[] = [
      {
        title: 'Resume Resources',
        icon: <FileText className="h-4 w-4" />,
        links: [
          { href: '/career-hub/templates', label: 'Resume Templates', description: 'Free templates' },
          { href: '/career-hub/resume-examples', label: 'Resume Examples', description: 'See samples' },
        ],
      },
      {
        title: 'Cover Letters',
        icon: <FileText className="h-4 w-4" />,
        links: [
          { href: '/career-hub/cover-letters', label: 'Cover Letter Templates', description: 'Get started' },
        ],
      },
      {
        title: 'Interview Prep',
        icon: <Target className="h-4 w-4" />,
        links: [
          { href: '/interview-questions', label: 'Interview Questions', description: 'Practice answers' },
        ],
      },
      {
        title: 'Getting Started',
        icon: <ArrowRight className="h-4 w-4" />,
        links: [
          { href: '/career-hub/guides/first-flex-job', label: 'First Flexible Job Guide', description: 'Step-by-step' },
        ],
      },
    ];

    return {
      title: 'Get Hired Faster',
      subtitle: 'Everything you need to land your next job',
      sections,
    };
  }

  // Seasonal Hiring Page
  if (context.type === 'seasonal') {
    const sections: LinkSection[] = [
      {
        title: 'Seasonal Roles',
        icon: <Calendar className="h-4 w-4" />,
        links: roles
          .filter(r => r.searchVolume === 'very-high' || r.searchVolume === 'high')
          .slice(0, 4)
          .map(role => ({
            href: `/career-hub/roles/${role.slug}`,
            label: role.title,
            description: `$${role.avgHourlyRate.min}-${role.avgHourlyRate.max}/hr`,
          })),
      },
      {
        title: 'Top Hiring Cities',
        icon: <MapPin className="h-4 w-4" />,
        links: getTopCities(4).map(city => ({
          href: `/career-hub/cities/${city.slug}`,
          label: `${city.city}, ${city.stateCode}`,
          description: `$${city.avgHourlyWage.min}-${city.avgHourlyWage.max}/hr avg`,
        })),
      },
      {
        title: 'Calculate Earnings',
        icon: <Calculator className="h-4 w-4" />,
        links: [
          { href: '/career-hub/tools/paycheck-calculator', label: 'Paycheck Calculator', description: 'Plan your income' },
        ],
      },
    ];

    const seasonTitle = context.season 
      ? `Find ${context.season.charAt(0).toUpperCase() + context.season.slice(1)} Jobs Now`
      : 'Find Seasonal Jobs Now';

    return {
      title: seasonTitle,
      subtitle: 'Discover opportunities and maximize earnings',
      sections,
    };
  }

  // How to Become Page
  if (context.type === 'how-to-become' && context.role) {
    const sections: LinkSection[] = [
      {
        title: 'Career Advancement',
        icon: <GraduationCap className="h-4 w-4" />,
        links: [
          { href: '/certifications', label: 'Certifications', description: 'Boost your skills' },
        ],
      },
      {
        title: 'Role Details',
        icon: <Briefcase className="h-4 w-4" />,
        links: [
          { href: `/career-hub/roles/${context.role}`, label: 'Full Role Guide', description: 'Learn more' },
        ],
      },
      {
        title: 'Career Planning',
        icon: <Target className="h-4 w-4" />,
        links: [
          { href: '/career-hub/tools/career-path', label: 'Career Path Explorer', description: 'Plan your growth' },
          { href: '/career-hub/tools/skills-analyzer', label: 'Skills Analyzer', description: 'Assess skills' },
        ],
      },
      {
        title: 'Interview Prep',
        icon: <FileText className="h-4 w-4" />,
        links: [
          { href: `/interview-questions/${context.role}`, label: 'Interview Questions', description: 'Get ready' },
        ],
      },
    ];

    return {
      title: 'Build Your Career Path',
      subtitle: 'Resources to advance your career',
      sections,
    };
  }

  // Interview Questions Page
  if (context.type === 'interview' && context.role) {
    const sections: LinkSection[] = [
      {
        title: 'Resume Resources',
        icon: <FileText className="h-4 w-4" />,
        links: [
          { href: '/career-hub/templates', label: 'Resume Templates', description: 'Free templates' },
        ],
      },
      {
        title: 'Career Guides',
        icon: <GraduationCap className="h-4 w-4" />,
        links: [
          { href: `/how-to-become/${context.role}`, label: `How to Become a ${roles.find(r => r.slug === context.role)?.title || 'Professional'}`, description: 'Step-by-step guide' },
        ],
      },
      {
        title: 'Application Toolkit',
        icon: <FileText className="h-4 w-4" />,
        links: [
          { href: '/career-hub/job-application-toolkit', label: 'Full Toolkit', description: 'All resources' },
        ],
      },
    ];

    return {
      title: 'Prepare to Get Hired',
      subtitle: 'Everything you need for interview success',
      sections,
    };
  }

  // Persona Page
  if (context.type === 'persona' && context.personaSlug) {
    const persona = getPersonaHub(context.personaSlug);
    if (!persona) return defaultRecs;

    const sections: LinkSection[] = [];

    // Recommended tools
    if (persona.recommendedTools.length > 0) {
      const toolLinks = getToolLinks(persona.recommendedTools, undefined, 4);
      if (toolLinks.length > 0) {
        sections.push({
          title: 'Recommended Tools',
          icon: <Wrench className="h-4 w-4" />,
          links: toolLinks,
        });
      }
    }

    // Related guides
    if (persona.relatedGuides.length > 0) {
      const guideLinks = getGuideArticleLinks(persona.relatedGuides, undefined, 4);
      if (guideLinks.length > 0) {
        sections.push({
          title: 'Helpful Guides',
          icon: <FileText className="h-4 w-4" />,
          links: guideLinks,
        });
      }
    }

    // Suggested roles
    if (persona.suggestedRoles.length > 0) {
      const roleLinks = persona.suggestedRoles
        .map(slug => roles.find(r => r.slug === slug))
        .filter((role): role is Role => role !== undefined)
        .slice(0, 4)
        .map(role => ({
          href: `/career-hub/roles/${role.slug}`,
          label: role.title,
          description: `$${role.avgHourlyRate.min}-${role.avgHourlyRate.max}/hr`,
        }));

      if (roleLinks.length > 0) {
        sections.push({
          title: 'Suggested Roles',
          icon: <Briefcase className="h-4 w-4" />,
          links: roleLinks,
        });
      }
    }

    return {
      title: persona.title,
      subtitle: persona.description,
      sections,
    };
  }

  // Wage Report Page
  if (context.type === 'wage-report') {
    const sections: LinkSection[] = [
      {
        title: 'Calculate Your Pay',
        icon: <Calculator className="h-4 w-4" />,
        links: [
          { href: '/career-hub/tools/paycheck-calculator', label: 'Paycheck Calculator', description: 'See take-home pay' },
        ],
      },
      {
        title: 'Compare Cities',
        icon: <MapPin className="h-4 w-4" />,
        links: [
          { href: '/career-hub/tools/cost-of-living', label: 'Cost of Living Calculator', description: 'Compare expenses' },
        ],
      },
      {
        title: 'High-Paying Roles',
        icon: <DollarSign className="h-4 w-4" />,
        links: roles
          .filter(r => r.avgHourlyRate.max >= 20)
          .sort((a, b) => b.avgHourlyRate.max - a.avgHourlyRate.max)
          .slice(0, 4)
          .map(role => ({
            href: `/career-hub/roles/${role.slug}`,
            label: role.title,
            description: `$${role.avgHourlyRate.min}-${role.avgHourlyRate.max}/hr`,
          })),
      },
      {
        title: 'Financial Tips',
        icon: <Wallet className="h-4 w-4" />,
        links: [
          { href: '/career-hub/financial-tips', label: 'Financial Resources', description: 'Money management' },
        ],
      },
    ];

    return {
      title: 'Boost Your Earnings',
      subtitle: 'Tools and insights to maximize your income',
      sections,
    };
  }

  // Certification Page
  if (context.type === 'certification') {
    const sections: LinkSection[] = [
      {
        title: 'Career Tools',
        icon: <Target className="h-4 w-4" />,
        links: [
          { href: '/career-hub/tools/certification-roi', label: 'Certification ROI Calculator', description: 'Calculate value' },
          { href: '/career-hub/tools/career-path', label: 'Career Path Explorer', description: 'Plan advancement' },
        ],
      },
      {
        title: 'Related Roles',
        icon: <Briefcase className="h-4 w-4" />,
        links: roles
          .filter(r => r.certifications && r.certifications.length > 0)
          .slice(0, 4)
          .map(role => ({
            href: `/career-hub/roles/${role.slug}`,
            label: role.title,
            description: `$${role.avgHourlyRate.min}-${role.avgHourlyRate.max}/hr`,
          })),
      },
    ];

    return {
      title: 'Advance Your Career',
      subtitle: 'Build skills and increase earning potential',
      sections,
    };
  }

  // Career Hub Home
  if (context.type === 'home') {
    const sections: LinkSection[] = [
      {
        title: 'Popular Tools',
        icon: <Calculator className="h-4 w-4" />,
        links: [
          { href: '/career-hub/tools/paycheck-calculator', label: 'Paycheck Calculator', description: 'Calculate earnings' },
          { href: '/career-hub/tools/tax-calculator', label: 'Tax Calculator', description: 'Estimate taxes' },
          { href: '/career-hub/tools/shift-planner', label: 'Shift Planner', description: 'Plan schedule' },
        ],
      },
      {
        title: 'Top Guides',
        icon: <FileText className="h-4 w-4" />,
        links: [
          { href: '/career-hub/guides/first-flex-job', label: 'How to Get Your First Flexible Job', description: '5 min read' },
          { href: '/career-hub/guides/career-paths', label: 'Career Paths Guide', description: '12 min read' },
        ],
      },
      {
        title: 'Trending Roles',
        icon: <TrendingUp className="h-4 w-4" />,
        links: roles
          .filter(r => r.searchVolume === 'very-high')
          .slice(0, 4)
          .map(role => ({
            href: `/career-hub/roles/${role.slug}`,
            label: role.title,
            description: `$${role.avgHourlyRate.min}-${role.avgHourlyRate.max}/hr`,
          })),
      },
      {
        title: 'Financial Resources',
        icon: <Wallet className="h-4 w-4" />,
        links: [
          { href: '/career-hub/financial-tips', label: 'Financial Tips', description: 'Money management' },
          { href: '/career-hub/wage-report', label: 'Wage Report', description: 'Industry data' },
        ],
      },
    ];

    return {
      title: 'Start Exploring',
      subtitle: 'Everything you need to build your flexible career',
      sections,
    };
  }

  // Career Evaluation Page
  if (context.type === 'career-evaluation' && context.role) {
    const role = getRoleBySlug(context.role);
    if (!role) return defaultRecs;

    const sections: LinkSection[] = [
      {
        title: 'Explore This Role',
        icon: <Briefcase className="h-4 w-4" />,
        links: [
          { href: `/career-hub/roles/${context.role}`, label: `Full ${role.title} Guide`, description: 'Complete role overview' },
          { href: `/how-to-become/${context.role}`, label: 'How to Become', description: 'Step-by-step guide' },
          { href: `/interview-questions/${context.role}`, label: 'Interview Questions', description: 'Prepare for interviews' },
          { href: `/career-hub/salary/${context.role}`, label: 'Salary by City', description: 'Compare pay by location' },
        ],
      },
      {
        title: 'Related Roles',
        icon: <Target className="h-4 w-4" />,
        links: getRolesByIndustry(role.industry, 4, context.role).map(r => ({
          href: `/career-hub/is-it-a-good-job/${r.slug}`,
          label: `Is ${r.title} a Good Job?`,
          description: 'Career evaluation',
        })),
      },
    ];

    return {
      title: 'Explore Your Career Options',
      subtitle: 'Compare roles and make informed decisions',
      sections,
    };
  }

  // Salary by City Page
  if (context.type === 'salary-by-city' && context.role) {
    const role = getRoleBySlug(context.role);
    if (!role) return defaultRecs;

    const sections: LinkSection[] = [
      {
        title: 'Explore This Role',
        icon: <Briefcase className="h-4 w-4" />,
        links: [
          { href: `/career-hub/roles/${context.role}`, label: `Full ${role.title} Guide`, description: 'Complete role overview' },
          { href: `/career-hub/is-it-a-good-job/${context.role}`, label: 'Is It a Good Job?', description: 'Career evaluation' },
          { href: `/how-to-become/${context.role}`, label: 'How to Become', description: 'Step-by-step guide' },
          { href: `/interview-questions/${context.role}`, label: 'Interview Questions', description: 'Prepare for interviews' },
        ],
      },
      {
        title: 'Top Cities for This Role',
        icon: <MapPin className="h-4 w-4" />,
        links: getTopCities(4).map(city => ({
          href: `/career-hub/cities/${city.slug}/${context.role}`,
          label: `${city.city}, ${city.state}`,
          description: `${role.title} jobs`,
        })),
      },
    ];

    return {
      title: 'Explore More About This Role',
      subtitle: 'Find opportunities and learn more',
      sections,
    };
  }

  // Pay Range Page
  if (context.type === 'pay-range') {
    const sections: LinkSection[] = [
      {
        title: 'Explore Pay Ranges',
        icon: <DollarSign className="h-4 w-4" />,
        links: [
          { href: '/career-hub/pay-range/15-under', label: '$15/hr & Under', description: 'Entry-level positions' },
          { href: '/career-hub/pay-range/15-18', label: '$15-$18/hr', description: 'Starting wages' },
          { href: '/career-hub/pay-range/18-22', label: '$18-$22/hr', description: 'Above average' },
          { href: '/career-hub/pay-range/22-25', label: '$22-$25/hr', description: 'Premium wages' },
          { href: '/career-hub/pay-range/25-plus', label: '$25+/hr', description: 'Top-tier positions' },
        ],
      },
      {
        title: 'Salary Tools',
        icon: <Calculator className="h-4 w-4" />,
        links: [
          { href: '/career-hub/tools/paycheck-calculator', label: 'Paycheck Calculator', description: 'Calculate take-home pay' },
          { href: '/career-hub/tools/tax-calculator', label: 'Tax Calculator', description: 'Estimate taxes' },
          { href: '/career-hub/tools/salary-converter', label: 'Salary Converter', description: 'Hourly to annual' },
        ],
      },
      {
        title: 'High-Paying Roles',
        icon: <TrendingUp className="h-4 w-4" />,
        links: roles
          .filter(r => r.avgHourlyRate.max >= 25)
          .slice(0, 4)
          .map(role => ({
            href: `/career-hub/roles/${role.slug}`,
            label: role.title,
            description: `$${role.avgHourlyRate.min}-${role.avgHourlyRate.max}/hr`,
          })),
      },
    ];

    return {
      title: 'Find Jobs by Pay Range',
      subtitle: 'Explore opportunities at your target wage',
      sections,
    };
  }

  // Generic fallback
  return defaultRecs;
};

export const InternalLinkHub = ({
  variant = 'sidebar',
  currentPage,
  maxLinksPerSection = 6,
  showAllSections = true,
}: InternalLinkHubProps) => {
  
  const recommendations = getContextualRecommendations(currentPage);
  const sections = recommendations.sections.slice(0, showAllSections ? undefined : 3);
  
  if (variant === 'sidebar') {
    return (
      <aside className="space-y-4" aria-label="Related content">
        {sections.slice(0, 3).map((section, idx) => (
          <Card key={idx} className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                {section.icon}
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-1.5">
                {section.links.slice(0, 5).map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors block py-0.5"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </aside>
    );
  }
  
  if (variant === 'footer') {
    return (
      <nav className="border-t border-border/50 pt-8 mt-12" aria-label="Site navigation">
        <h2 className="text-lg font-semibold mb-6">Explore More</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {sections.map((section, idx) => (
            <div key={idx}>
              <h3 className="font-medium text-sm mb-3 flex items-center gap-2 text-foreground">
                {section.icon}
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.slice(0, 6).map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </nav>
    );
  }
  
  // Full variant - comprehensive link section
  return (
    <section className="py-12 bg-muted/30 rounded-lg" aria-label="Internal links">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-2">{recommendations.title}</h2>
        <p className="text-muted-foreground mb-8">
          {recommendations.subtitle}
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section, idx) => (
            <Card key={idx} className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  {section.icon}
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <Link
                        href={link.href}
                        className="group flex flex-col"
                      >
                        <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                          {link.label}
                        </span>
                        {link.description && (
                          <span className="text-xs text-muted-foreground">
                            {link.description}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Quick links badges */}
        <div className="mt-8 pt-6 border-t border-border/50">
          <h3 className="text-sm font-medium mb-3">Popular Searches</h3>
          <div className="flex flex-wrap gap-2">
            {industries.map(industry => (
              <Link key={industry.id} href={`/career-hub/industries/${industry.id}`}>
                <Badge variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                  {industry.name} Jobs
                </Badge>
              </Link>
            ))}
            {getTopCities(4).map(city => (
              <Link key={city.slug} href={`/career-hub/cities/${city.slug}`}>
                <Badge variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                  Jobs in {city.city}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Quick Links component for embedding in content
export const QuickLinks = ({
  title,
  links,
}: {
  title: string;
  links: LinkItem[];
}) => (
  <div className="bg-muted/50 rounded-lg p-4 my-6">
    <h4 className="font-medium text-sm mb-2">{title}</h4>
    <ul className="flex flex-wrap gap-x-4 gap-y-1">
      {links.map((link, idx) => (
        <li key={idx}>
          <Link
            href={link.href}
            className="text-sm text-primary hover:underline"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);
