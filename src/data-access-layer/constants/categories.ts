import { CategoryConfig, CategoryType } from '../types';

export const CATEGORY_CONFIGS: Record<CategoryType, CategoryConfig> = {
  work: {
    type: 'work',
    label: 'Work',
    emoji: '💼',
    color: 'blue',
  },
  personal: {
    type: 'personal',
    label: 'Personal',
    emoji: '👤',
    color: 'purple',
  },
  shopping: {
    type: 'shopping',
    label: 'Shopping',
    emoji: '🛒',
    color: 'green',
  },
  health: {
    type: 'health',
    label: 'Health',
    emoji: '🏥',
    color: 'red',
  },
  home: {
    type: 'home',
    label: 'Home',
    emoji: '🏠',
    color: 'yellow',
  },
  finance: {
    type: 'finance',
    label: 'Finance',
    emoji: '💰',
    color: 'emerald',
  },
  other: {
    type: 'other',
    label: 'Other',
    emoji: '📝',
    color: 'gray',
  },
} as const;

export const CATEGORY_OPTIONS = Object.values(CATEGORY_CONFIGS);

export const getCategoryConfig = (category: CategoryType): CategoryConfig => {
  return CATEGORY_CONFIGS[category];
};

export const getCategoryEmoji = (category: CategoryType): string => {
  return CATEGORY_CONFIGS[category].emoji;
};

export const getCategoryLabel = (category: CategoryType): string => {
  return CATEGORY_CONFIGS[category].label;
};

export const getCategoryColor = (category: CategoryType): string => {
  return CATEGORY_CONFIGS[category].color;
};
