/**
 * Resume Templates Data
 * 
 * 6 professional resume templates optimized for flexible/hourly work.
 * Each template includes structure, keywords, and formatting guidance.
 * 
 * Last Updated: February 2026
 */

export interface ResumeTemplate {
  id: string;
  slug: string;
  name: string;
  description: string;
  bestFor: string[];
  features: string[];
  layout: 'single-column' | 'two-column' | 'hybrid';
  style: 'modern' | 'professional' | 'minimal' | 'creative';
  atsScore: 'high' | 'medium'; // ATS compatibility
  sections: {
    name: string;
    required: boolean;
    order: number;
    tips: string;
  }[];
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
  };
  typography: {
    headingFont: string;
    bodyFont: string;
  };
  previewImage?: string;
  seoKeywords: string[];
}

export const resumeTemplates: ResumeTemplate[] = [
  {
    id: 'modern',
    slug: 'modern',
    name: 'Modern Professional',
    description: 'A clean, contemporary design with subtle color accents. Perfect for hospitality and customer-facing roles where you want to stand out while remaining professional.',
    bestFor: ['Bartenders', 'Servers', 'Retail Associates', 'Event Staff'],
    features: [
      'Clean header with contact info',
      'Skills sidebar for quick scanning',
      'Achievement-focused work history',
      'Optional certifications section',
    ],
    layout: 'two-column',
    style: 'modern',
    atsScore: 'high',
    sections: [
      { name: 'Contact Information', required: true, order: 1, tips: 'Include phone, email, city/state (no full address needed)' },
      { name: 'Professional Summary', required: true, order: 2, tips: '2-3 sentences highlighting your value proposition' },
      { name: 'Skills', required: true, order: 3, tips: 'List 6-10 relevant skills, both hard and soft' },
      { name: 'Work Experience', required: true, order: 4, tips: 'Use bullet points with action verbs and quantified achievements' },
      { name: 'Education', required: false, order: 5, tips: 'Include if recent graduate or relevant certifications' },
      { name: 'Certifications', required: false, order: 6, tips: 'TIPS, Food Handler, ServSafe, etc.' },
    ],
    colorScheme: {
      primary: '#2563eb', // Blue
      secondary: '#1e293b', // Slate
      accent: '#0ea5e9', // Sky
    },
    typography: {
      headingFont: 'Inter',
      bodyFont: 'Inter',
    },
    seoKeywords: ['modern resume template', 'professional resume', 'hospitality resume'],
  },
  {
    id: 'professional',
    slug: 'professional',
    name: 'Classic Professional',
    description: 'A traditional, time-tested format that works for any industry. Emphasizes work history and achievements in a clear, chronological format.',
    bestFor: ['Warehouse Workers', 'Forklift Operators', 'General Labor', 'Supervisors'],
    features: [
      'Traditional chronological format',
      'Clear section headers',
      'Emphasis on work history',
      'Formal, corporate appearance',
    ],
    layout: 'single-column',
    style: 'professional',
    atsScore: 'high',
    sections: [
      { name: 'Contact Information', required: true, order: 1, tips: 'Standard header format' },
      { name: 'Professional Summary', required: true, order: 2, tips: 'Focus on years of experience and key strengths' },
      { name: 'Work Experience', required: true, order: 3, tips: 'Most important section - list in reverse chronological order' },
      { name: 'Skills', required: true, order: 4, tips: 'Technical skills and certifications' },
      { name: 'Education', required: false, order: 5, tips: 'Include relevant training programs' },
    ],
    colorScheme: {
      primary: '#1e293b', // Slate
      secondary: '#475569', // Slate-600
      accent: '#0f172a', // Slate-900
    },
    typography: {
      headingFont: 'Georgia',
      bodyFont: 'Arial',
    },
    seoKeywords: ['professional resume template', 'classic resume', 'warehouse resume'],
  },
  {
    id: 'simple',
    slug: 'simple',
    name: 'Simple & Clean',
    description: 'Minimalist design that lets your experience speak for itself. Fast to complete and highly ATS-compatible. Great for quick applications.',
    bestFor: ['Any role', 'Quick applications', 'Multiple job applications', 'Entry-level positions'],
    features: [
      'Ultra-clean layout',
      'Maximum ATS compatibility',
      'Quick to customize',
      'Works for any industry',
    ],
    layout: 'single-column',
    style: 'minimal',
    atsScore: 'high',
    sections: [
      { name: 'Contact Information', required: true, order: 1, tips: 'Name, phone, email, city only' },
      { name: 'Summary', required: false, order: 2, tips: 'Optional - 1-2 sentences max' },
      { name: 'Work Experience', required: true, order: 3, tips: 'Focus on most recent and relevant jobs' },
      { name: 'Skills', required: true, order: 4, tips: 'Simple bulleted list' },
      { name: 'Education', required: false, order: 5, tips: 'Only if relevant or recent grad' },
    ],
    colorScheme: {
      primary: '#000000',
      secondary: '#4b5563',
      accent: '#6b7280',
    },
    typography: {
      headingFont: 'Arial',
      bodyFont: 'Arial',
    },
    seoKeywords: ['simple resume template', 'minimalist resume', 'ATS resume'],
  },
  {
    id: 'ats-friendly',
    slug: 'ats-friendly',
    name: 'ATS-Optimized',
    description: 'Specifically designed to pass Applicant Tracking Systems. Uses standard formatting, clear headers, and keyword-rich content structure.',
    bestFor: ['Large company applications', 'Corporate roles', 'Online applications', 'Indeed/LinkedIn applications'],
    features: [
      'Maximum ATS compatibility',
      'Standard section headers',
      'No graphics or tables',
      'Keyword-optimized structure',
    ],
    layout: 'single-column',
    style: 'professional',
    atsScore: 'high',
    sections: [
      { name: 'Contact Information', required: true, order: 1, tips: 'Plain text, no icons or graphics' },
      { name: 'Professional Summary', required: true, order: 2, tips: 'Include job-relevant keywords' },
      { name: 'Skills', required: true, order: 3, tips: 'Match skills to job description exactly' },
      { name: 'Professional Experience', required: true, order: 4, tips: 'Use standard job titles' },
      { name: 'Education', required: true, order: 5, tips: 'Include graduation dates if recent' },
      { name: 'Certifications', required: false, order: 6, tips: 'List all relevant certifications' },
    ],
    colorScheme: {
      primary: '#000000',
      secondary: '#333333',
      accent: '#666666',
    },
    typography: {
      headingFont: 'Times New Roman',
      bodyFont: 'Times New Roman',
    },
    seoKeywords: ['ATS resume template', 'applicant tracking system', 'ATS-friendly resume'],
  },
  {
    id: 'creative',
    slug: 'creative',
    name: 'Creative Visual',
    description: 'A visually engaging design with color blocks and icons. Best for roles where personality matters, like bartending or event work.',
    bestFor: ['Bartenders', 'Event Coordinators', 'Brand Ambassadors', 'Creative roles'],
    features: [
      'Visual hierarchy with color',
      'Icon-enhanced sections',
      'Skills visualization',
      'Memorable design',
    ],
    layout: 'two-column',
    style: 'creative',
    atsScore: 'medium',
    sections: [
      { name: 'Contact & Photo', required: true, order: 1, tips: 'Professional headshot optional' },
      { name: 'Profile', required: true, order: 2, tips: 'Your personal brand statement' },
      { name: 'Experience', required: true, order: 3, tips: 'Focus on achievements and impact' },
      { name: 'Skills', required: true, order: 4, tips: 'Visual skill bars or icons' },
      { name: 'Education & Certs', required: false, order: 5, tips: 'Combine into one section' },
      { name: 'Interests', required: false, order: 6, tips: 'Show personality if relevant to role' },
    ],
    colorScheme: {
      primary: '#7c3aed', // Violet
      secondary: '#1e1b4b', // Indigo-950
      accent: '#a855f7', // Purple
    },
    typography: {
      headingFont: 'Poppins',
      bodyFont: 'Open Sans',
    },
    seoKeywords: ['creative resume template', 'visual resume', 'bartender resume'],
  },
  {
    id: 'entry-level',
    slug: 'entry-level',
    name: 'First Job / Entry-Level',
    description: 'Designed for those with limited work experience. Emphasizes skills, education, and potential over work history.',
    bestFor: ['First-time job seekers', 'Students', 'Career changers', 'Re-entering workforce'],
    features: [
      'Skills-first layout',
      'Education emphasis',
      'Volunteer/project sections',
      'Transferable skills focus',
    ],
    layout: 'single-column',
    style: 'modern',
    atsScore: 'high',
    sections: [
      { name: 'Contact Information', required: true, order: 1, tips: 'Include LinkedIn if professional' },
      { name: 'Objective Statement', required: true, order: 2, tips: 'What you want to achieve and offer' },
      { name: 'Skills & Abilities', required: true, order: 3, tips: 'Transferable skills from any experience' },
      { name: 'Education', required: true, order: 4, tips: 'Include relevant coursework or projects' },
      { name: 'Experience', required: false, order: 5, tips: 'Include volunteer work, internships, projects' },
      { name: 'Activities & Interests', required: false, order: 6, tips: 'Show leadership or teamwork' },
    ],
    colorScheme: {
      primary: '#059669', // Emerald
      secondary: '#064e3b', // Emerald-900
      accent: '#10b981', // Emerald-500
    },
    typography: {
      headingFont: 'Inter',
      bodyFont: 'Inter',
    },
    seoKeywords: ['entry-level resume', 'first job resume', 'student resume template', 'no experience resume'],
  },
];

// Helper functions
export function getTemplateBySlug(slug: string): ResumeTemplate | undefined {
  return resumeTemplates.find((t) => t.slug === slug);
}

export function getTemplatesByStyle(style: ResumeTemplate['style']): ResumeTemplate[] {
  return resumeTemplates.filter((t) => t.style === style);
}

export function getTemplatesForRole(roleSlug: string): ResumeTemplate[] {
  const roleKeywords: Record<string, string[]> = {
    bartender: ['Bartenders', 'hospitality', 'customer-facing'],
    server: ['Servers', 'hospitality', 'customer-facing'],
    'warehouse-operative': ['Warehouse Workers', 'General Labor'],
    'forklift-driver': ['Forklift Operators', 'Warehouse Workers'],
    'retail-assistant': ['Retail Associates', 'customer-facing'],
  };

  const keywords = roleKeywords[roleSlug] || [];
  if (keywords.length === 0) return resumeTemplates;

  return resumeTemplates.filter((t) =>
    t.bestFor.some((bf) =>
      keywords.some((kw) => bf.toLowerCase().includes(kw.toLowerCase()))
    )
  );
}

export function getAllTemplates(): ResumeTemplate[] {
  return resumeTemplates;
}

