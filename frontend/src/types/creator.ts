import type { Tables } from '@/integrations/supabase/types';

// Base creator type from Supabase
export type Creator = Tables<'creator_profiles'>;

// Extended creator type with related data
export type CreatorWithProfile = Creator & {
  profile?: Tables<'profiles'>;
};

// Creator creation form data
export type CreateCreatorData = Omit<
  Creator,
  'id' | 'created_at' | 'updated_at'
>;

// Creator update data
export type UpdateCreatorData = Partial<Creator>;

// Creator filters
export interface CreatorFilters {
  categories?: string[];
  location?: string;
  followers_min?: number;
  followers_max?: number;
  engagement_min?: number;
  engagement_max?: number;
}

// Creator categories
export const CREATOR_CATEGORIES = {
  FASHION: 'fashion',
  BEAUTY: 'beauty',
  FITNESS: 'fitness',
  FOOD: 'food',
  TRAVEL: 'travel',
  TECHNOLOGY: 'technology',
  LIFESTYLE: 'lifestyle',
  EDUCATION: 'education',
  ENTERTAINMENT: 'entertainment',
  GAMING: 'gaming',
  BUSINESS: 'business',
  HEALTH: 'health',
  PARENTING: 'parenting',
  PETS: 'pets',
  OTHER: 'other',
} as const;

export type CreatorCategory =
  (typeof CREATOR_CATEGORIES)[keyof typeof CREATOR_CATEGORIES];

// Creator engagement tiers
export const ENGAGEMENT_TIERS = {
  MICRO: { min: 0, max: 10000, label: 'Micro (0-10K)' },
  SMALL: { min: 10000, max: 50000, label: 'Small (10K-50K)' },
  MEDIUM: { min: 50000, max: 200000, label: 'Medium (50K-200K)' },
  LARGE: { min: 200000, max: 1000000, label: 'Large (200K-1M)' },
  MEGA: { min: 1000000, max: Infinity, label: 'Mega (1M+)' },
} as const;

// Creator content types
export const CONTENT_TYPES = {
  INSTAGRAM: 'instagram',
  TIKTOK: 'tiktok',
  YOUTUBE: 'youtube',
  TWITTER: 'twitter',
  LINKEDIN: 'linkedin',
  BLOG: 'blog',
  PODCAST: 'podcast',
  OTHER: 'other',
} as const;

export type ContentType = (typeof CONTENT_TYPES)[keyof typeof CONTENT_TYPES];
