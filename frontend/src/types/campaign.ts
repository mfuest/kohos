import type { Tables } from '@/integrations/supabase/types';

// Base campaign type from Supabase
export type Campaign = Tables<'campaigns'>;

// Extended campaign type with related data
export type CampaignWithBrand = Campaign & {
  brand_profile?: Tables<'brand_profiles'>;
  applications_count?: number;
};

// Campaign creation form data
export type CreateCampaignData = Omit<
  Campaign,
  'id' | 'created_at' | 'updated_at' | 'applicants_count'
>;

// Campaign update data
export type UpdateCampaignData = Partial<Campaign>;

// Campaign filters
export interface CampaignFilters {
  category?: string;
  location?: string;
  budget_min?: number;
  budget_max?: number;
  status?: Campaign['status'];
}

// Campaign status options
export const CAMPAIGN_STATUSES = {
  DRAFT: 'draft',
  ACTIVE: 'active',
  PAUSED: 'paused',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

export type CampaignStatus = typeof CAMPAIGN_STATUSES[keyof typeof CAMPAIGN_STATUSES];

// Campaign categories
export const CAMPAIGN_CATEGORIES = {
  FASHION: 'fashion',
  BEAUTY: 'beauty',
  FITNESS: 'fitness',
  FOOD: 'food',
  TRAVEL: 'travel',
  TECHNOLOGY: 'technology',
  LIFESTYLE: 'lifestyle',
  EDUCATION: 'education',
  ENTERTAINMENT: 'entertainment',
  OTHER: 'other',
} as const;

export type CampaignCategory = typeof CAMPAIGN_CATEGORIES[keyof typeof CAMPAIGN_CATEGORIES]; 