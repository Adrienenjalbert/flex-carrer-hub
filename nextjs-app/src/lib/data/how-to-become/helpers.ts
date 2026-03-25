import type { HowToBecomeGuide } from './types';
import { hospitalityGuides } from './hospitality-guides';
import { industrialGuides } from './industrial-guides';
import { otherGuides } from './other-guides';

export const howToBecomeGuides: HowToBecomeGuide[] = [
  ...hospitalityGuides,
  ...industrialGuides,
  ...otherGuides,
];

export const getHowToBecomeBySlug = (slug: string) =>
  howToBecomeGuides.find(guide => guide.roleSlug === slug);

export const getHowToBecomeByIndustry = (industry: string) =>
  howToBecomeGuides.filter(guide => guide.industry === industry);

export const getEasyCareerEntries = () =>
  howToBecomeGuides.filter(guide => guide.difficulty === 'easy');

export const getQuickStartCareers = () =>
  howToBecomeGuides.filter(guide => 
    guide.timeToStart.includes('day') || 
    guide.timeToStart.includes('1 week') ||
    guide.timeToStart.includes('1-2 weeks')
  );

export const getFreeCostCareers = () =>
  howToBecomeGuides.filter(guide => guide.totalCost === '$0');

export const getAllHowToBecomeSlugs = () =>
  howToBecomeGuides.map(guide => guide.roleSlug);
