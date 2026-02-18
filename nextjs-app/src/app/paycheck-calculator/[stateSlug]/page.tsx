import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllStateSlugs } from "@/lib/data/state-tax-content";
import { stateTaxData, calculatorRolePresets } from "@/lib/data/tool-registry";
import StatePaycheckClient from "./StatePaycheckClient";
import RolePaycheckClient from "./RolePaycheckClient";

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
    return <StatePaycheckClient stateCode={stateCode} stateName={stateName} />;
  }

  if (slugInfo.type === 'role' && slugInfo.roleId) {
    return <RolePaycheckClient roleId={slugInfo.roleId} />;
  }

  notFound();
}
