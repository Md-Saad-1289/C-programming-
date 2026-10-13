import { PlayerProgress } from '../types/game';
import { CHAPTER_1_LEVELS } from '../data/chapter1';

const STORAGE_KEY = 'codebound_player_progress_v1';

export const INITIAL_PROGRESS: PlayerProgress = {
  currentLevelId: 1,
  unlockedLevelIds: [1],
  completedLevelIds: [],
  xp: 0,
  codeByLevel: {
    1: CHAPTER_1_LEVELS[0].starterCode,
    2: CHAPTER_1_LEVELS[1].starterCode,
    3: CHAPTER_1_LEVELS[2].starterCode,
    4: CHAPTER_1_LEVELS[3].starterCode,
    5: CHAPTER_1_LEVELS[4].starterCode,
  },
  unlockedAchievements: [],
  solvedAt: {},
};

export const loadPlayerProgress = (): PlayerProgress => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_PROGRESS;
    const parsed = JSON.parse(raw);
    return {
      ...INITIAL_PROGRESS,
      ...parsed,
      codeByLevel: {
        ...INITIAL_PROGRESS.codeByLevel,
        ...(parsed.codeByLevel || {}),
      },
      unlockedLevelIds: Array.from(new Set([1, ...(parsed.unlockedLevelIds || [])])),
    };
  } catch (e) {
    console.warn('Failed to load player progress from localStorage', e);
    return INITIAL_PROGRESS;
  }
};

export const savePlayerProgress = (progress: PlayerProgress): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save player progress', e);
  }
};

export const resetPlayerProgress = (): PlayerProgress => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.warn(e);
  }
  return INITIAL_PROGRESS;
};
