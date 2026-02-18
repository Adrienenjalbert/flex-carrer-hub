/**
 * SEO Datasets Index
 * 
 * This module exports all datasets designed for programmatic SEO pages.
 * Each dataset targets high-volume search queries that job seekers use.
 * 
 * PROGRAMMATIC PAGE OPPORTUNITIES:
 * 
 * 1. Jobs by Pay: "jobs that pay $20 an hour"
 *    - 12 pay brackets × 50+ cities = 600+ pages
 *    - URL: /jobs-that-pay/[amount]-per-hour
 * 
 * 2. How to Become: "how to become a bartender"
 *    - 50+ roles × 50 states = 2,500+ pages
 *    - URL: /how-to-become/[role]
 * 
 * 3. Interview Questions: "bartender interview questions"
 *    - 50+ roles = 50+ pages
 *    - URL: /interview-questions/[role]
 * 
 * 4. Career Evaluations: "is bartending a good job"
 *    - 50+ roles = 50+ pages
 *    - URL: /is-[role]-a-good-job
 * 
 * 5. Salary by Location: "bartender salary Austin"
 *    - 50+ roles × 50+ cities = 2,500+ pages
 *    - URL: /salary/[role]/[city]
 * 
 * TOTAL PROGRAMMATIC PAGE POTENTIAL: 5,000-10,000+ pages
 */

// Consolidated Roles Dataset (45+ roles)
export { 
  roles,
  industries,
  getRolesByIndustry,
  getRoleBySlug,
  getHighSearchVolumeRoles,
  getEntryLevelRoles,
  getRolesByPhysicalDemand,
  getAllRoleSlugs,
  getRolesWithTips,
  type Role,
  type IndustryId
} from '../roles';

// Jobs by Pay Bracket (for "$X/hour jobs" queries)
export {
  payBrackets,
  jobsByPay,
  getPayBracketBySlug,
  getJobsInPayRange,
  getJobsByPayBracket,
  getHighestPayingJobs,
  getEntryLevelJobsByPay,
  getJobsNoDegreeRequired,
  getJobsByIndustry,
  getHighDemandJobs,
  getAllPayBracketSlugs,
  type PayBracket,
  type JobByPay
} from '../jobs-by-pay';

// Interview Questions (for "[role] interview questions" queries)
export {
  interviewGuides,
  getInterviewGuideBySlug,
  getInterviewGuidesByIndustry,
  getAllInterviewGuideSlugs,
  getQuestionsOfType,
  getEasyQuestions,
  getHardQuestions,
  type InterviewQuestion,
  type RoleInterviewGuide
} from '../interview-questions';

// Career Evaluations (for "is [role] a good job" queries)
export {
  careerEvaluations,
  getCareerEvaluationBySlug,
  getCareerEvaluationsByIndustry,
  getCareerEvaluationsByVerdict,
  getHighestRatedCareers,
  getCareersWithHighPayPotential,
  getCareersWithHighFlexibility,
  getCareersWithLowEntryBarrier,
  getAllCareerEvaluationSlugs,
  type CareerEvaluation
} from '../career-evaluations';

// How to Become Guides (for "how to become a [role]" queries)
export {
  howToBecomeGuides,
  getHowToBecomeBySlug,
  getHowToBecomeByIndustry,
  getEasyCareerEntries,
  getQuickStartCareers,
  getFreeCostCareers,
  getAllHowToBecomeSlugs,
  type CareerStep,
  type HowToBecomeGuide
} from '../how-to-become';

// Salary by Location (for "[role] salary [city]" queries)
export {
  salaryByLocation,
  getSalaryDataByRole,
  getSalaryForRoleInCity,
  getCitiesForRole,
  getHighestPayingCitiesForRole,
  getBestValueCitiesForRole,
  getHighDemandCitiesForRole,
  getAllRoleSlugsWithSalaryData,
  getAllCitySlugsWithSalaryData,
  getAllRoleCityCombinations,
  type RoleSalaryData
} from '../salary-by-location';

/**
 * Utility function to generate all programmatic page slugs
 * Useful for sitemap generation
 */
export const generateAllProgrammaticSlugs = () => {
  const slugs: { type: string; slug: string; url: string }[] = [];
  
  // Jobs by pay pages
  getAllPayBracketSlugs().forEach(slug => {
    slugs.push({
      type: 'jobs-by-pay',
      slug,
      url: `/jobs-that-pay/${slug}`
    });
  });
  
  // Interview questions pages
  getAllInterviewGuideSlugs().forEach(slug => {
    slugs.push({
      type: 'interview-questions',
      slug,
      url: `/interview-questions/${slug}`
    });
  });
  
  // Career evaluation pages
  getAllCareerEvaluationSlugs().forEach(slug => {
    slugs.push({
      type: 'career-evaluation',
      slug,
      url: `/is-${slug}-a-good-job`
    });
  });
  
  // How to become pages
  getAllHowToBecomeSlugs().forEach(slug => {
    slugs.push({
      type: 'how-to-become',
      slug,
      url: `/how-to-become/${slug}`
    });
  });
  
  // Salary by location pages
  getAllRoleCityCombinations().forEach(({ roleSlug, citySlug }) => {
    slugs.push({
      type: 'salary-location',
      slug: `${roleSlug}-${citySlug}`,
      url: `/salary/${roleSlug}/${citySlug}`
    });
  });
  
  return slugs;
};

// Import the utility functions
import { getAllPayBracketSlugs } from '../jobs-by-pay';
import { getAllInterviewGuideSlugs } from '../interview-questions';
import { getAllCareerEvaluationSlugs } from '../career-evaluations';
import { getAllHowToBecomeSlugs } from '../how-to-become';
import { getAllRoleCityCombinations } from '../salary-by-location';

