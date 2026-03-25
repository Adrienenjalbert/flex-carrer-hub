import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllStateSlugs } from "@/lib/data/state-tax-content";
import { stateTaxData, calculatorRolePresets } from "@/lib/data/tool-registry";
import StatePaycheckClient from "./StatePaycheckClient";
import RolePaycheckClient from "./RolePaycheckClient";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import { AuthorByline } from "@/components/career-hub/AuthorByline";
import DataSourceCitation from "@/components/career-hub/DataSourceCitation";
import {
  FAQSchema,
  WebPageSchema,
  BreadcrumbSchema,
  SoftwareApplicationSchema,
  OccupationSchema,
} from "@/components/career-hub/seo";

// US State name mapping
const stateNames: Record<string, string> = {
  AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California",
  CO: "Colorado", CT: "Connecticut", DE: "Delaware", FL: "Florida", GA: "Georgia",
  HI: "Hawaii", ID: "Idaho", IL: "Illinois", IN: "Indiana", IA: "Iowa",
  KS: "Kansas", KY: "Kentucky", LA: "Louisiana", ME: "Maine", MD: "Maryland",
  MA: "Massachusetts", MI: "Michigan", MN: "Minnesota", MS: "Mississippi", MO: "Missouri",
  MT: "Montana", NE: "Nebraska", NV: "Nevada", NH: "New Hampshire", NJ: "New Jersey",
  NM: "New Mexico", NY: "New York", NC: "North Carolina", ND: "North Dakota", OH: "Ohio",
  OK: "Oklahoma", OR: "Oregon", PA: "Pennsylvania", RI: "Rhode Island", SC: "South Carolina",
  SD: "South Dakota", TN: "Tennessee", TX: "Texas", UT: "Utah", VT: "Vermont",
  VA: "Virginia", WA: "Washington", WV: "West Virginia", WI: "Wisconsin", WY: "Wyoming",
  DC: "District of Columbia",
};

// Slug to state code mapping for URL-friendly names
const slugToStateCode: Record<string, string> = {
  "alabama": "AL", "alaska": "AK", "arizona": "AZ", "arkansas": "AR", "california": "CA",
  "colorado": "CO", "connecticut": "CT", "delaware": "DE", "florida": "FL", "georgia": "GA",
  "hawaii": "HI", "idaho": "ID", "illinois": "IL", "indiana": "IN", "iowa": "IA",
  "kansas": "KS", "kentucky": "KY", "louisiana": "LA", "maine": "ME", "maryland": "MD",
  "massachusetts": "MA", "michigan": "MI", "minnesota": "MN", "mississippi": "MS", "missouri": "MO",
  "montana": "MT", "nebraska": "NE", "nevada": "NV", "new-hampshire": "NH", "new-jersey": "NJ",
  "new-mexico": "NM", "new-york": "NY", "north-carolina": "NC", "north-dakota": "ND", "ohio": "OH",
  "oklahoma": "OK", "oregon": "OR", "pennsylvania": "PA", "rhode-island": "RI", "south-carolina": "SC",
  "south-dakota": "SD", "tennessee": "TN", "texas": "TX", "utah": "UT", "vermont": "VT",
  "virginia": "VA", "washington": "WA", "west-virginia": "WV", "wisconsin": "WI", "wyoming": "WY",
  "district-of-columbia": "DC", "dc": "DC",
};

// States with no income tax
const noIncomeTaxStates = ["AK", "FL", "NV", "NH", "SD", "TN", "TX", "WA", "WY"];

// Helper to determine if slug is a state or role
function getSlugType(slug: string): { type: 'state' | 'role' | 'unknown'; code?: string; roleId?: string } {
  // Check if it's a state code directly (e.g., "TX", "CA")
  const upperSlug = slug.toUpperCase();
  if (stateTaxData[upperSlug]) {
    return { type: 'state', code: upperSlug };
  }
  
  // Check if it's a state name slug (e.g., "california", "new-york")
  const stateCode = slugToStateCode[slug.toLowerCase()];
  if (stateCode && stateTaxData[stateCode]) {
    return { type: 'state', code: stateCode };
  }
  
  // Check if it's a role ID
  const rolePreset = calculatorRolePresets.find(r => r.roleId === slug);
  if (rolePreset) {
    return { type: 'role', roleId: slug };
  }
  
  return { type: 'unknown' };
}

// Generate static params for all states and roles
export function generateStaticParams() {
  const stateSlugs = getAllStateSlugs().map((slug) => ({
    stateSlug: slug,
  }));
  
  const roleSlugs = calculatorRolePresets.map((role) => ({
    stateSlug: role.roleId,
  }));
  
  return [...stateSlugs, ...roleSlugs];
}

// Generate metadata for each state or role
export async function generateMetadata({
  params,
}: {
  params: Promise<{ stateSlug: string }>;
}): Promise<Metadata> {
  const { stateSlug } = await params;
  const slugInfo = getSlugType(stateSlug);
  
  if (slugInfo.type === 'state' && slugInfo.code) {
    const stateCode = slugInfo.code;
    const stateData = stateTaxData[stateCode];
    const stateName = stateNames[stateCode] || stateData?.name || stateCode;
    const hasNoTax = noIncomeTaxStates.includes(stateCode);

    return {
      title: `${stateName} Paycheck Calculator 2026 - Free Take-Home Pay Calculator`,
      description: `Calculate your take-home pay in ${stateName}. Free ${stateName} paycheck calculator with ${hasNoTax ? 'no state income tax' : `${((stateData?.incomeTaxRate || 0) * 100).toFixed(1)}% state tax rate`}, $${stateData?.minWage}/hr minimum wage, and accurate 2026 federal tax brackets.`,
      keywords: [
        `${stateName.toLowerCase()} paycheck calculator`,
        `${stateName.toLowerCase()} take home pay`,
        `${stateName.toLowerCase()} income tax calculator`,
        `${stateCode} paycheck calculator`,
      ],
      alternates: {
        canonical: `https://indeedflex.com/paycheck-calculator/${stateSlug}`,
      },
      openGraph: {
        title: `${stateName} Paycheck Calculator - Indeed Flex`,
        description: `Free ${stateName} paycheck calculator. Calculate take-home pay with ${hasNoTax ? 'no state income tax!' : `${stateName} state taxes.`}`,
        url: `https://indeedflex.com/paycheck-calculator/${stateSlug}`,
        type: "website",
        siteName: "Indeed Flex Career Hub",
      },
      twitter: {
        card: "summary_large_image",
        title: `${stateName} Paycheck Calculator - Indeed Flex`,
        description: `Free ${stateName} paycheck calculator. Calculate take-home pay with ${hasNoTax ? 'no state income tax!' : `${stateName} state taxes.`}`,
      },
    };
  }
  
  if (slugInfo.type === 'role' && slugInfo.roleId) {
    const rolePreset = calculatorRolePresets.find(r => r.roleId === slugInfo.roleId);
    if (rolePreset) {
      const roleName = rolePreset.name;
      const avgPay = rolePreset.hourlyRate;
      const tipInfo = rolePreset.hasTips ? ` plus tips (~$${rolePreset.avgTipsPerHour}/hr)` : '';

      return {
        title: `${roleName} Pay Calculator - How Much Do ${roleName}s Make?`,
        description: `Calculate take-home pay for ${roleName} jobs. Average ${roleName} hourly rate: $${avgPay}/hr${tipInfo}. See weekly, monthly, and annual earnings after taxes.`,
        keywords: [
          `${roleName.toLowerCase()} pay`,
          `${roleName.toLowerCase()} salary`,
          `how much do ${roleName.toLowerCase()}s make`,
          `${roleName.toLowerCase()} hourly rate`,
        ],
        alternates: {
          canonical: `https://indeedflex.com/paycheck-calculator/${stateSlug}`,
        },
        openGraph: {
          title: `${roleName} Pay Calculator - Indeed Flex`,
          description: `How much do ${roleName}s make? Calculate take-home pay at $${avgPay}/hr${tipInfo}.`,
          url: `https://indeedflex.com/paycheck-calculator/${stateSlug}`,
          type: "website",
          siteName: "Indeed Flex Career Hub",
        },
        twitter: {
          card: "summary_large_image",
          title: `${roleName} Pay Calculator - Indeed Flex`,
          description: `How much do ${roleName}s make? Calculate take-home pay at $${avgPay}/hr${tipInfo}.`,
        },
      };
    }
  }
  
  return { title: "Paycheck Calculator" };
}

export default async function PaycheckCalculatorDynamicPage({
  params,
}: {
  params: Promise<{ stateSlug: string }>;
}) {
  const { stateSlug } = await params;
  const slugInfo = getSlugType(stateSlug);

  if (slugInfo.type === 'state' && slugInfo.code) {
    const stateCode = slugInfo.code;
    const stateData = stateTaxData[stateCode];

    if (!stateData) {
      notFound();
    }

    const stateName = stateNames[stateCode] || stateData.name;

    const stateFaqs = [
      {
        question: `What is the income tax rate in ${stateName}?`,
        answer: stateData?.hasNoIncomeTax
          ? `${stateName} has no state income tax! This means you keep more of your paycheck compared to states that do tax income.`
          : `${stateName} has a state income tax rate of approximately ${((stateData?.incomeTaxRate || 0) * 100).toFixed(2)}%. The exact amount depends on your income level and filing status.`,
      },
      {
        question: `What is the minimum wage in ${stateName}?`,
        answer: `The current minimum wage in ${stateName} is $${stateData?.minWage.toFixed(2)} per hour (2026). Some cities may have higher local minimum wages.`,
      },
      {
        question: `How do I calculate my take-home pay in ${stateName}?`,
        answer: `Use this ${stateName} paycheck calculator! Enter your hourly rate and hours worked to see your estimated take-home pay after federal taxes${stateData?.hasNoIncomeTax ? "" : `, ${stateName} state taxes`}, Social Security, and Medicare.`,
      },
      {
        question: `Does ${stateName} have overtime rules?`,
        answer: stateData?.overtimeRules === "daily"
          ? `${stateName} requires overtime pay (1.5x) for hours over 8 in a day AND hours over 40 in a week, which is stricter than federal law.`
          : `${stateName} follows federal overtime rules: 1.5x pay for hours over 40 per week.`,
      },
    ];

    return (
      <>
        <WebPageSchema
          name={`${stateName} Paycheck Calculator 2026`}
          description={`Calculate your take-home pay in ${stateName}. Free paycheck calculator with ${stateName} tax rates, minimum wage info, and deduction estimates.`}
          url={`https://indeedflex.com/paycheck-calculator/${stateSlug}`}
          breadcrumb={[
            { name: "Career Hub", url: "https://indeedflex.com/career-hub" },
            { name: "Tools", url: "https://indeedflex.com/career-hub/tools" },
            { name: `${stateName} Calculator` },
          ]}
        />
        <FAQSchema questions={stateFaqs} />
        <BreadcrumbSchema
          items={[
            { name: "Career Hub", url: "https://indeedflex.com/career-hub" },
            { name: "Tools", url: "https://indeedflex.com/career-hub/tools" },
            { name: `${stateName} Calculator` },
          ]}
        />
        <SoftwareApplicationSchema
          name={`${stateName} Paycheck Calculator`}
          description={`Free ${stateName} paycheck calculator for hourly workers`}
          url={`https://indeedflex.com/paycheck-calculator/${stateSlug}`}
          applicationCategory="FinanceApplication"
          operatingSystem="Web"
          offers={{ price: 0, priceCurrency: "USD" }}
        />
        <div className="container mx-auto px-4 max-w-4xl pt-6">
          <Breadcrumbs
            items={[
              { label: "Career Hub", href: "/career-hub" },
              { label: "Paycheck Calculator", href: "/paycheck-calculator" },
              { label: `${stateName}` },
            ]}
          />
        </div>
        <StatePaycheckClient stateCode={stateCode} stateName={stateName} />
        <div className="container mx-auto px-4 max-w-4xl">
          <AuthorByline contentType="calculator" lastUpdated="2026-01-15" />
          <DataSourceCitation pageType="calculator" additionalSources={["bls-oews", "state-labor"]} />
        </div>
      </>
    );
  }

  if (slugInfo.type === 'role' && slugInfo.roleId) {
    const rolePreset = calculatorRolePresets.find(r => r.roleId === slugInfo.roleId);
    if (!rolePreset) {
      notFound();
    }

    const formatCurrency = (value: number) =>
      new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);

    const roleFaqs = [
      {
        question: `How much do ${rolePreset.name}s make per hour?`,
        answer: `The average ${rolePreset.name} earns around $${rolePreset.hourlyRate}/hour.${rolePreset.hasTips ? ` Tips can add ~$${rolePreset.avgTipsPerHour}/hour on average.` : ""}`,
      },
      {
        question: `What is the annual salary for a ${rolePreset.name}?`,
        answer: `Working ${rolePreset.hoursPerWeek} hours/week at $${rolePreset.hourlyRate}/hour, a ${rolePreset.name} earns approximately ${formatCurrency(rolePreset.hourlyRate * rolePreset.hoursPerWeek * 52)}/year before taxes.`,
      },
    ];

    return (
      <>
        <WebPageSchema
          name={`${rolePreset.name} Pay Calculator`}
          description={`Calculate take-home pay for ${rolePreset.name} jobs.`}
          url={`https://indeedflex.com/paycheck-calculator/${rolePreset.roleId}`}
          breadcrumb={[
            { name: "Career Hub", url: "https://indeedflex.com/career-hub" },
            { name: "Tools", url: "https://indeedflex.com/career-hub/tools" },
            { name: `${rolePreset.name} Calculator` },
          ]}
        />
        <FAQSchema questions={roleFaqs} />
        <BreadcrumbSchema
          items={[
            { name: "Career Hub", url: "https://indeedflex.com/career-hub" },
            { name: "Tools", url: "https://indeedflex.com/career-hub/tools" },
            { name: `${rolePreset.name} Calculator` },
          ]}
        />
        <OccupationSchema
          name={rolePreset.name}
          description={rolePreset.description}
          estimatedSalary={{
            currency: "USD",
            minValue: (rolePreset.hourlyRate - 3) * rolePreset.hoursPerWeek * 52,
            maxValue: (rolePreset.hourlyRate + 5) * rolePreset.hoursPerWeek * 52,
            unitText: "YEAR",
          }}
        />
        <div className="container mx-auto px-4 max-w-4xl pt-6">
          <Breadcrumbs
            items={[
              { label: "Career Hub", href: "/career-hub" },
              { label: "Paycheck Calculator", href: "/paycheck-calculator" },
              { label: `${rolePreset.name}` },
            ]}
          />
        </div>
        <RolePaycheckClient roleId={slugInfo.roleId} />
        <div className="container mx-auto px-4 max-w-4xl">
          <AuthorByline contentType="calculator" lastUpdated="2026-01-15" />
          <DataSourceCitation pageType="calculator" additionalSources={["bls-oews", "state-labor"]} />
        </div>
      </>
    );
  }

  notFound();
}
