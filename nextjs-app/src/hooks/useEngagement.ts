import { useState, useCallback, useEffect } from 'react';

const STORAGE_KEY = 'career-hub-engagement';

interface ToolProgress {
  sessionsCompleted: number;
  lastUsed: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  itemsCompleted: number;
}

interface SpacedRepItem {
  lastSeen: string;
  correctCount: number;
  interval: number;
}

interface EngagementState {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
  totalSessions: number;
  toolProgress: Record<string, ToolProgress>;
  spacedRep: Record<string, Record<string, SpacedRepItem>>;
}

const DEFAULT_STATE: EngagementState = {
  currentStreak: 0,
  longestStreak: 0,
  lastActiveDate: '',
  totalSessions: 0,
  toolProgress: {},
  spacedRep: {},
};

function loadState(): EngagementState {
  if (typeof window === 'undefined') return DEFAULT_STATE;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? { ...DEFAULT_STATE, ...JSON.parse(saved) } : DEFAULT_STATE;
  } catch {
    return DEFAULT_STATE;
  }
}

function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

function getYesterday(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
}

function dateSeed(): number {
  const today = getToday();
  let hash = 0;
  for (let i = 0; i < today.length; i++) {
    const char = today.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

function seededShuffle<T>(array: T[], seed: number): T[] {
  const shuffled = [...array];
  let s = seed;
  for (let i = shuffled.length - 1; i > 0; i--) {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    const j = s % (i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function useEngagement() {
  const [state, setState] = useState<EngagementState>(() => loadState());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const recordActivity = useCallback((toolId: string) => {
    setState(prev => {
      const today = getToday();
      const yesterday = getYesterday();

      let newStreak = prev.currentStreak;
      if (prev.lastActiveDate === today) {
        // Already counted today
      } else if (prev.lastActiveDate === yesterday) {
        newStreak += 1;
      } else {
        newStreak = 1;
      }

      const toolProg = prev.toolProgress[toolId] || {
        sessionsCompleted: 0,
        lastUsed: '',
        level: 'beginner' as const,
        itemsCompleted: 0,
      };

      return {
        ...prev,
        currentStreak: newStreak,
        longestStreak: Math.max(prev.longestStreak, newStreak),
        lastActiveDate: today,
        totalSessions: prev.totalSessions + 1,
        toolProgress: {
          ...prev.toolProgress,
          [toolId]: {
            ...toolProg,
            sessionsCompleted: toolProg.sessionsCompleted + 1,
            lastUsed: today,
          },
        },
      };
    });
  }, []);

  const getStreak = useCallback(() => {
    const today = getToday();
    const yesterday = getYesterday();
    if (state.lastActiveDate === today || state.lastActiveDate === yesterday) {
      return state.currentStreak;
    }
    return 0;
  }, [state.lastActiveDate, state.currentStreak]);

  const getDailyChallenge = useCallback(<T extends { id: string }>(items: T[], count = 5): T[] => {
    const seed = dateSeed();
    const shuffled = seededShuffle(items, seed);
    return shuffled.slice(0, count);
  }, []);

  const recordSpacedRep = useCallback((toolId: string, itemId: string, correct: boolean) => {
    setState(prev => {
      const toolItems = prev.spacedRep[toolId] || {};
      const existing = toolItems[itemId] || { lastSeen: '', correctCount: 0, interval: 1 };

      const newInterval = correct
        ? Math.min(existing.interval * 2, 30)
        : Math.max(1, Math.floor(existing.interval / 2));

      return {
        ...prev,
        spacedRep: {
          ...prev.spacedRep,
          [toolId]: {
            ...toolItems,
            [itemId]: {
              lastSeen: getToday(),
              correctCount: existing.correctCount + (correct ? 1 : 0),
              interval: newInterval,
            },
          },
        },
      };
    });
  }, []);

  const getDueItems = useCallback(<T extends { id: string }>(toolId: string, allItems: T[]): T[] => {
    const toolItems = state.spacedRep[toolId] || {};
    const today = new Date(getToday());

    return allItems.filter(item => {
      const record = toolItems[item.id];
      if (!record) return true;
      const lastSeen = new Date(record.lastSeen);
      const daysSince = Math.floor((today.getTime() - lastSeen.getTime()) / (1000 * 60 * 60 * 24));
      return daysSince >= record.interval;
    });
  }, [state.spacedRep]);

  const getWeakItems = useCallback(<T extends { id: string }>(toolId: string, allItems: T[], threshold = 2): T[] => {
    const toolItems = state.spacedRep[toolId] || {};
    return allItems.filter(item => {
      const record = toolItems[item.id];
      return !record || record.correctCount < threshold;
    });
  }, [state.spacedRep]);

  const getToolLevel = useCallback((toolId: string, totalItems: number): 'beginner' | 'intermediate' | 'advanced' => {
    const toolItems = state.spacedRep[toolId] || {};
    const mastered = Object.values(toolItems).filter(r => r.correctCount >= 3).length;
    const ratio = mastered / totalItems;
    if (ratio >= 0.7) return 'advanced';
    if (ratio >= 0.3) return 'intermediate';
    return 'beginner';
  }, [state.spacedRep]);

  const isActiveToday = state.lastActiveDate === getToday();

  return {
    state,
    recordActivity,
    getStreak,
    getDailyChallenge,
    recordSpacedRep,
    getDueItems,
    getWeakItems,
    getToolLevel,
    isActiveToday,
  };
}
