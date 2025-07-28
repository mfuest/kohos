import { z } from 'zod';

// Environment variable schema with fallbacks
const envSchema = z.object({
  // Supabase configuration - with fallbacks for development
  NEXT_PUBLIC_SUPABASE_URL: z.string().url('Invalid Supabase URL').optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z
    .string()
    .min(1, 'Supabase anon key is required')
    .optional(),

  // Application configuration
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  NEXT_PUBLIC_APP_ENV: z
    .enum(['development', 'staging', 'production'])
    .default('development'),

  // Optional configuration
  NEXT_PUBLIC_APP_NAME: z.string().default('Kohos'),
  NEXT_PUBLIC_APP_VERSION: z.string().default('1.0.0'),
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),

  // Analytics (optional)
  NEXT_PUBLIC_ANALYTICS_ID: z.string().optional(),
  NEXT_PUBLIC_ANALYTICS_ENABLED: z
    .string()
    .transform(val => val === 'true')
    .default('false'),

  // Feature flags (optional)
  NEXT_PUBLIC_ENABLE_NOTIFICATIONS: z
    .string()
    .transform(val => val === 'true')
    .default('true'),
  NEXT_PUBLIC_ENABLE_ANALYTICS: z
    .string()
    .transform(val => val === 'true')
    .default('false'),
});

// Parse and validate environment variables with error handling
let env: z.infer<typeof envSchema>;

try {
  env = envSchema.parse(process.env);
} catch (error) {
  console.warn('Environment validation failed, using defaults:', error);
  // Use defaults if validation fails
  env = {
    NODE_ENV: 'development',
    NEXT_PUBLIC_APP_ENV: 'development',
    NEXT_PUBLIC_APP_NAME: 'Kohos',
    NEXT_PUBLIC_APP_VERSION: '1.0.0',
    NEXT_PUBLIC_ANALYTICS_ENABLED: false,
    NEXT_PUBLIC_ENABLE_NOTIFICATIONS: true,
    NEXT_PUBLIC_ENABLE_ANALYTICS: false,
  };
}

export { env };

// Type for the validated environment
export type Env = z.infer<typeof envSchema>;

// Helper function to check if we're in development
export const isDevelopment = env.NODE_ENV === 'development';

// Helper function to check if we're in production
export const isProduction = env.NODE_ENV === 'production';

// Helper function to check if analytics is enabled
export const isAnalyticsEnabled = env.NEXT_PUBLIC_ANALYTICS_ENABLED;

// Helper function to get app configuration
export const appConfig = {
  name: env.NEXT_PUBLIC_APP_NAME,
  version: env.NEXT_PUBLIC_APP_VERSION,
  url: env.NEXT_PUBLIC_APP_URL,
  environment: env.NEXT_PUBLIC_APP_ENV,
} as const;
