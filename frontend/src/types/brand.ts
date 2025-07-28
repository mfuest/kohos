import type { Tables } from '@/integrations/supabase/types';

// Base brand type from Supabase
export type Brand = Tables<'brand_profiles'>;

// Extended brand type with related data
export type BrandWithProfile = Brand & {
  profile?: Tables<'profiles'>;
};

// Brand creation form data
export type CreateBrandData = Omit<
  Brand,
  'id' | 'created_at' | 'updated_at'
>;

// Brand update data
export type UpdateBrandData = Partial<Brand>;

// Brand filters
export interface BrandFilters {
  industry?: string;
  location?: string;
  company_size?: string;
}

// Brand industries
export const BRAND_INDUSTRIES = {
  FASHION: 'fashion',
  BEAUTY: 'beauty',
  FITNESS: 'fitness',
  FOOD: 'food',
  TRAVEL: 'travel',
  TECHNOLOGY: 'technology',
  LIFESTYLE: 'lifestyle',
  EDUCATION: 'education',
  ENTERTAINMENT: 'entertainment',
  HEALTH: 'health',
  FINANCE: 'finance',
  AUTOMOTIVE: 'automotive',
  REAL_ESTATE: 'real_estate',
  ECOMMERCE: 'ecommerce',
  SAAS: 'saas',
  OTHER: 'other',
} as const;

export type BrandIndustry = typeof BRAND_INDUSTRIES[keyof typeof BRAND_INDUSTRIES];

// Company sizes
export const COMPANY_SIZES = {
  STARTUP: 'startup',
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
  ENTERPRISE: 'enterprise',
} as const;

export type CompanySize = typeof COMPANY_SIZES[keyof typeof COMPANY_SIZES];

// Brand verification status
export const VERIFICATION_STATUSES = {
  PENDING: 'pending',
  VERIFIED: 'verified',
  REJECTED: 'rejected',
} as const;

export type VerificationStatus = typeof VERIFICATION_STATUSES[keyof typeof VERIFICATION_STATUSES]; 