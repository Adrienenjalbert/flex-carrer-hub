/**
 * SSG Helper Functions
 * Generate static params for Next.js dynamic routes
 */

import { roles } from "./roles";
import { cities } from "./cities";
import { usLocations } from "./locations";
import { getAllStateSlugs } from "./state-tax-content";
import { howToBecomeGuides } from "./how-to-become";
import { interviewGuides } from "./interview-questions";
import { roleComparisons } from "./role-comparisons";
import { payBrackets } from "./jobs-by-pay";

// Role pages: /career-hub/roles/[roleSlug]
export function getAllRoleSlugs() {
  return roles.map((role) => ({ roleSlug: role.slug }));
}

// City pages: /career-hub/cities/[citySlug]
export function getAllCitySlugs() {
  return cities.map((city) => ({ citySlug: city.slug }));
}

// Location pages: /career-hub/locations/[locationSlug]
export function getAllLocationSlugs() {
  return usLocations.map((loc) => ({ locationSlug: loc.slug }));
}

// Location × Role pages: /career-hub/locations/[locationSlug]/[roleSlug]
export function getAllLocationRoleCombinations() {
  const combinations: { locationSlug: string; roleSlug: string }[] = [];
  usLocations.forEach((loc) => {
    roles.forEach((role) => {
      combinations.push({
        locationSlug: loc.slug,
        roleSlug: role.slug,
      });
    });
  });
  return combinations;
}

// City × Role pages: /career-hub/cities/[citySlug]/[roleSlug]
export function getAllCityRoleCombinations() {
  const combinations: { citySlug: string; roleSlug: string }[] = [];
  cities.forEach((city) => {
    roles.forEach((role) => {
      combinations.push({
        citySlug: city.slug,
        roleSlug: role.slug,
      });
    });
  });
  return combinations;
}

// State tax pages: /paycheck-calculator/[stateSlug]
export function getAllStateSlugParams() {
  return getAllStateSlugs().map((slug) => ({ stateSlug: slug }));
}

// How to become pages: /how-to-become/[roleSlug]
export function getAllHowToBecomeSlugs() {
  return howToBecomeGuides.map((guide) => ({ roleSlug: guide.roleSlug }));
}

// Interview questions pages: /interview-questions/[roleSlug]
export function getAllInterviewQuestionSlugs() {
  return interviewGuides.map((guide) => ({ roleSlug: guide.roleSlug }));
}

// Role comparison pages: /compare/[comparison]
export function getAllComparisonSlugs() {
  return roleComparisons.map((comp) => ({
    comparison: `${comp.role1Slug}-vs-${comp.role2Slug}`,
  }));
}

// Jobs by pay pages: /jobs-that-pay/[payBracket]
export function getAllPayBracketSlugs() {
  return payBrackets.map((bracket) => ({ payBracket: bracket.slug }));
}

// Industry IDs for industry pages
export function getAllIndustryIds() {
  return [
    { industryId: "hospitality" },
    { industryId: "industrial" },
    { industryId: "retail" },
    { industryId: "facilities" },
    { industryId: "healthcare" },
    { industryId: "events" },
  ];
}

// Summary of page counts for build planning
export function getPageCountSummary() {
  return {
    roles: roles.length,
    cities: cities.length,
    locations: usLocations.length,
    locationRoleCombinations: usLocations.length * roles.length,
    cityRoleCombinations: cities.length * roles.length,
    states: getAllStateSlugs().length,
    howToBecome: howToBecomeGuides.length,
    interviewQuestions: interviewGuides.length,
    comparisons: roleComparisons.length,
    payBrackets: payBrackets.length,
    total:
      roles.length +
      cities.length +
      usLocations.length +
      usLocations.length * roles.length +
      cities.length * roles.length +
      getAllStateSlugs().length +
      howToBecomeGuides.length +
      interviewGuides.length +
      roleComparisons.length +
      payBrackets.length,
  };
}

