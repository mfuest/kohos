import type { Tables } from '@/integrations/supabase/types';

// Base application type from Supabase
export type Application = Tables<'campaign_applications'>;

// Extended application type with related data
export type ApplicationWithDetails = Application & {
  campaign?: Tables<'campaigns'>;
  creator_profile?: Tables<'creator_profiles'>;
  brand_profile?: Tables<'brand_profiles'>;
};

// Application creation form data
export type CreateApplicationData = Omit<
  Application,
  'id' | 'applied_at' | 'updated_at'
>;

// Application update data
export type UpdateApplicationData = Partial<Application>;

// Application status
export const APPLICATION_STATUSES = {
  PENDING: 'pending',
  REVIEWING: 'reviewing',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  WITHDRAWN: 'withdrawn',
} as const;

export type ApplicationStatus = typeof APPLICATION_STATUSES[keyof typeof APPLICATION_STATUSES];

// Application filters
export interface ApplicationFilters {
  status?: ApplicationStatus;
  campaign_id?: string;
  creator_user_id?: string;
  brand_user_id?: string;
  applied_after?: Date;
  applied_before?: Date;
}

// Application message types
export const MESSAGE_TYPES = {
  APPLICATION: 'application',
  FOLLOW_UP: 'follow_up',
  CLARIFICATION: 'clarification',
  NEGOTIATION: 'negotiation',
  ACCEPTANCE: 'acceptance',
  REJECTION: 'rejection',
} as const;

export type MessageType = typeof MESSAGE_TYPES[keyof typeof MESSAGE_TYPES]; 