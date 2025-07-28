import { z } from 'zod';

// Environment variable schema
const envSchema = z.object({
  // Supabase configuration
  VITE_SUPABASE_URL: z.string().url('Invalid Supabase URL'),
  VITE_SUPABASE_ANON_KEY: z.string().min(1, 'Supabase anon key is required'),
  
  // Application configuration
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  VITE_APP_ENV: z.enum(['development', 'staging', 'production']).default('development'),
  
  // Optional configuration
  VITE_APP_NAME: z.string().default('Kohos'),
  VITE_APP_VERSION: z.string().default('1.0.0'),
  VITE_APP_URL: z.string().url().optional(),
  
  // Analytics (optional)
  VITE_ANALYTICS_ID: z.string().optional(),
  VITE_ANALYTICS_ENABLED: z.string().transform(val => val === 'true').default('false'),
  
  // Feature flags (optional)
  VITE_ENABLE_NOTIFICATIONS: z.string().transform(val => val === 'true').default('true'),
  VITE_ENABLE_ANALYTICS: z.string().transform(val => val === 'true').default('false'),
});

// Parse and validate environment variables
export const env = envSchema.parse(import.meta.env);

// Type for the validated environment
export type Env = z.infer<typeof envSchema>;

// Helper function to check if we're in development
export const isDevelopment = env.NODE_ENV === 'development';

// Helper function to check if we're in production
export const isProduction = env.NODE_ENV === 'production';

// Helper function to check if analytics is enabled
export const isAnalyticsEnabled = env.VITE_ANALYTICS_ENABLED;

// Helper function to get app configuration
export const appConfig = {
  name: env.VITE_APP_NAME,
  version: env.VITE_APP_VERSION,
  url: env.VITE_APP_URL,
  environment: env.VITE_APP_ENV,
} as const; 