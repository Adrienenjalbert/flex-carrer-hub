// Unified Achievement System for Training Tools
// This system tracks progress across all training tools and awards badges

export type AchievementCategory = 'cocktail' | 'safety' | 'menu' | 'language' | 'general';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string; // Emoji icon
  category: AchievementCategory;
  requirement: {
    type: 'score' | 'streak' | 'mastery' | 'completion' | 'speed' | 'total';
    value: number;
    tool?: string; // Specific tool required, or undefined for cross-tool
  };
  xpReward: number;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
}

export interface UserProgress {
  totalXp: number;
  level: number;
  achievements: string[]; // Array of achievement IDs
  toolStats: {
    [toolId: string]: {
      totalQuizzes: number;
      totalCorrect: number;
      highestStreak: number;
      masteredItems: string[];
      speedRoundBest: number;
      lastPlayed: string;
    };
  };
}

// Achievement definitions
export const achievements: Achievement[] = [
  // Cocktail Quiz Achievements
  {
    id: 'cocktail-first-quiz',
    name: 'First Pour',
    description: 'Complete your first cocktail quiz',
    icon: '🍹',
    category: 'cocktail',
    requirement: { type: 'completion', value: 1, tool: 'cocktail-quiz' },
    xpReward: 50,
    rarity: 'common',
  },
  {
    id: 'cocktail-perfect-10',
    name: 'Perfect Mix',
    description: 'Score 10/10 on a cocktail quiz',
    icon: '🏆',
    category: 'cocktail',
    requirement: { type: 'score', value: 10, tool: 'cocktail-quiz' },
    xpReward: 100,
    rarity: 'uncommon',
  },
  {
    id: 'cocktail-master-5',
    name: 'Apprentice Mixologist',
    description: 'Master 5 cocktails',
    icon: '🎓',
    category: 'cocktail',
    requirement: { type: 'mastery', value: 5, tool: 'cocktail-quiz' },
    xpReward: 150,
    rarity: 'uncommon',
  },
  {
    id: 'cocktail-master-15',
    name: 'Journeyman Bartender',
    description: 'Master 15 cocktails',
    icon: '🍸',
    category: 'cocktail',
    requirement: { type: 'mastery', value: 15, tool: 'cocktail-quiz' },
    xpReward: 300,
    rarity: 'rare',
  },
  {
    id: 'cocktail-master-all',
    name: 'Master Mixologist',
    description: 'Master all cocktails in the database',
    icon: '👑',
    category: 'cocktail',
    requirement: { type: 'mastery', value: 50, tool: 'cocktail-quiz' },
    xpReward: 1000,
    rarity: 'legendary',
  },
  {
    id: 'cocktail-speed-10',
    name: 'Quick Shaker',
    description: 'Score 10+ in speed round',
    icon: '⚡',
    category: 'cocktail',
    requirement: { type: 'speed', value: 10, tool: 'cocktail-quiz' },
    xpReward: 200,
    rarity: 'rare',
  },
  {
    id: 'cocktail-speed-20',
    name: 'Lightning Hands',
    description: 'Score 20+ in speed round',
    icon: '🌟',
    category: 'cocktail',
    requirement: { type: 'speed', value: 20, tool: 'cocktail-quiz' },
    xpReward: 500,
    rarity: 'epic',
  },

  // Safety First Achievements
  {
    id: 'safety-first-quiz',
    name: 'Safety Conscious',
    description: 'Complete your first safety quiz',
    icon: '🦺',
    category: 'safety',
    requirement: { type: 'completion', value: 1, tool: 'safety-first' },
    xpReward: 50,
    rarity: 'common',
  },
  {
    id: 'safety-perfect',
    name: 'Zero Incidents',
    description: 'Score 100% on a safety quiz',
    icon: '✅',
    category: 'safety',
    requirement: { type: 'score', value: 10, tool: 'safety-first' },
    xpReward: 100,
    rarity: 'uncommon',
  },
  {
    id: 'safety-master-osha',
    name: 'OSHA Ready',
    description: 'Complete all OSHA-related safety modules',
    icon: '📋',
    category: 'safety',
    requirement: { type: 'mastery', value: 10, tool: 'safety-first' },
    xpReward: 300,
    rarity: 'rare',
  },
  {
    id: 'safety-streak-5',
    name: 'Safety Streak',
    description: 'Get 5 questions correct in a row',
    icon: '🔥',
    category: 'safety',
    requirement: { type: 'streak', value: 5, tool: 'safety-first' },
    xpReward: 100,
    rarity: 'uncommon',
  },

  // Menu Master Achievements
  {
    id: 'menu-first-quiz',
    name: 'First Taste',
    description: 'Complete your first menu terminology quiz',
    icon: '🍽️',
    category: 'menu',
    requirement: { type: 'completion', value: 1, tool: 'menu-master' },
    xpReward: 50,
    rarity: 'common',
  },
  {
    id: 'menu-master-10',
    name: 'Culinary Student',
    description: 'Master 10 culinary terms',
    icon: '📖',
    category: 'menu',
    requirement: { type: 'mastery', value: 10, tool: 'menu-master' },
    xpReward: 150,
    rarity: 'uncommon',
  },
  {
    id: 'menu-master-25',
    name: 'Line Cook Ready',
    description: 'Master 25 culinary terms',
    icon: '👨‍🍳',
    category: 'menu',
    requirement: { type: 'mastery', value: 25, tool: 'menu-master' },
    xpReward: 300,
    rarity: 'rare',
  },
  {
    id: 'menu-french-master',
    name: 'French Cuisine Expert',
    description: 'Master all French culinary terms',
    icon: '🥐',
    category: 'menu',
    requirement: { type: 'mastery', value: 15, tool: 'menu-master' },
    xpReward: 400,
    rarity: 'epic',
  },

  // WorkTalk (Language) Achievements
  {
    id: 'worktalk-first',
    name: '¡Hola!',
    description: 'Complete your first workplace Spanish lesson',
    icon: '🗣️',
    category: 'language',
    requirement: { type: 'completion', value: 1, tool: 'worktalk' },
    xpReward: 50,
    rarity: 'common',
  },
  {
    id: 'worktalk-phrases-10',
    name: 'Getting Started',
    description: 'Learn 10 workplace phrases',
    icon: '📝',
    category: 'language',
    requirement: { type: 'mastery', value: 10, tool: 'worktalk' },
    xpReward: 150,
    rarity: 'uncommon',
  },
  {
    id: 'worktalk-phrases-25',
    name: 'Conversational',
    description: 'Learn 25 workplace phrases',
    icon: '💬',
    category: 'language',
    requirement: { type: 'mastery', value: 25, tool: 'worktalk' },
    xpReward: 300,
    rarity: 'rare',
  },
  {
    id: 'worktalk-perfect-pronunciation',
    name: 'Perfect Pronunciation',
    description: 'Use voice practice 10 times',
    icon: '🎤',
    category: 'language',
    requirement: { type: 'total', value: 10, tool: 'worktalk' },
    xpReward: 200,
    rarity: 'rare',
  },

  // Cross-Tool General Achievements
  {
    id: 'general-first-badge',
    name: 'Badge Collector',
    description: 'Earn your first achievement',
    icon: '🏅',
    category: 'general',
    requirement: { type: 'total', value: 1 },
    xpReward: 25,
    rarity: 'common',
  },
  {
    id: 'general-multi-tool',
    name: 'Well-Rounded',
    description: 'Use 3 different training tools',
    icon: '🎯',
    category: 'general',
    requirement: { type: 'total', value: 3 },
    xpReward: 100,
    rarity: 'uncommon',
  },
  {
    id: 'general-10-achievements',
    name: 'Achievement Hunter',
    description: 'Earn 10 achievements',
    icon: '🏆',
    category: 'general',
    requirement: { type: 'total', value: 10 },
    xpReward: 250,
    rarity: 'rare',
  },
  {
    id: 'general-level-5',
    name: 'Rising Star',
    description: 'Reach level 5',
    icon: '⭐',
    category: 'general',
    requirement: { type: 'total', value: 5 },
    xpReward: 200,
    rarity: 'uncommon',
  },
  {
    id: 'general-level-10',
    name: 'Career Champion',
    description: 'Reach level 10',
    icon: '🌟',
    category: 'general',
    requirement: { type: 'total', value: 10 },
    xpReward: 500,
    rarity: 'epic',
  },
  {
    id: 'general-streak-daily',
    name: 'Dedicated Learner',
    description: 'Practice 5 days in a row',
    icon: '📆',
    category: 'general',
    requirement: { type: 'streak', value: 5 },
    xpReward: 150,
    rarity: 'uncommon',
  },
  {
    id: 'general-1000-xp',
    name: 'XP Milestone',
    description: 'Earn 1,000 total XP',
    icon: '💎',
    category: 'general',
    requirement: { type: 'total', value: 1000 },
    xpReward: 200,
    rarity: 'rare',
  },
  {
    id: 'general-5000-xp',
    name: 'XP Master',
    description: 'Earn 5,000 total XP',
    icon: '💫',
    category: 'general',
    requirement: { type: 'total', value: 5000 },
    xpReward: 500,
    rarity: 'epic',
  },
];

// Calculate level from XP (exponential curve)
export const calculateLevel = (xp: number): number => {
  // Level formula: level = floor(sqrt(xp / 100))
  // Level 1: 0-99 XP
  // Level 2: 100-399 XP
  // Level 3: 400-899 XP
  // etc.
  return Math.floor(Math.sqrt(xp / 100)) + 1;
};

// Calculate XP needed for next level
export const xpForNextLevel = (currentLevel: number): number => {
  return currentLevel * currentLevel * 100;
};

// Get XP progress within current level
export const getLevelProgress = (xp: number): { current: number; needed: number; percentage: number } => {
  const level = calculateLevel(xp);
  const currentLevelXp = (level - 1) * (level - 1) * 100;
  const nextLevelXp = level * level * 100;
  const progressInLevel = xp - currentLevelXp;
  const neededForLevel = nextLevelXp - currentLevelXp;
  
  return {
    current: progressInLevel,
    needed: neededForLevel,
    percentage: Math.round((progressInLevel / neededForLevel) * 100),
  };
};

// Get achievement by ID
export const getAchievementById = (id: string): Achievement | undefined => {
  return achievements.find(a => a.id === id);
};

// Get achievements by category
export const getAchievementsByCategory = (category: AchievementCategory): Achievement[] => {
  return achievements.filter(a => a.category === category);
};

// Get achievements by rarity
export const getAchievementsByRarity = (rarity: Achievement['rarity']): Achievement[] => {
  return achievements.filter(a => a.rarity === rarity);
};

// Rarity colors for UI
export const rarityColors: Record<Achievement['rarity'], string> = {
  common: 'bg-gray-100 text-gray-800 border-gray-300',
  uncommon: 'bg-green-100 text-green-800 border-green-400',
  rare: 'bg-blue-100 text-blue-800 border-blue-400',
  epic: 'bg-purple-100 text-purple-800 border-purple-400',
  legendary: 'bg-yellow-100 text-yellow-800 border-yellow-500',
};

// Category icons
export const categoryIcons: Record<AchievementCategory, string> = {
  cocktail: '🍸',
  safety: '🦺',
  menu: '🍽️',
  language: '🗣️',
  general: '🏅',
};

// Default user progress
export const defaultUserProgress: UserProgress = {
  totalXp: 0,
  level: 1,
  achievements: [],
  toolStats: {},
};


