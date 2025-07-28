# Vercel Deployment Guide

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Ensure your code is pushed to GitHub
3. **Supabase Project**: Your Supabase project should be set up and running

## Environment Variables Setup

### Required Environment Variables

Set these in your Vercel project settings. The app supports both `VITE_` and `NEXT_PUBLIC_` prefixes for maximum compatibility:

#### Option 1: Vite Format (Recommended)
```bash
VITE_SUPABASE_URL=https://pjzqsbolhsrbffvmwcmg.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqenFzYm9saHNyYmZmdm13Y21nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0NTk0NjQsImV4cCI6MjA2OTAzNTQ2NH0.gSf2KSganRMSZG8RQHvNngJQ1t35evGiOGuQEQ4JbP4
NODE_ENV=production
VITE_APP_ENV=production
```

#### Option 2: Next.js Format (Also Supported)
```bash
NEXT_PUBLIC_SUPABASE_URL=https://pjzqsbolhsrbffvmwcmg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqenFzYm9saHNyYmZmdm13Y21nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0NTk0NjQsImV4cCI6MjA2OTAzNTQ2NH0.gSf2KSganRMSZG8RQHvNngJQ1t35evGiOGuQEQ4JbP4
NODE_ENV=production
VITE_APP_ENV=production
```

### Optional Environment Variables

```bash
VITE_APP_NAME=Kohos
VITE_APP_VERSION=1.0.0
VITE_ENABLE_NOTIFICATIONS=true
VITE_ENABLE_ANALYTICS=false
```

## Deployment Steps

### 1. Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Select the repository

### 2. Configure Build Settings

Vercel will automatically detect the configuration from `vercel.json`:

- **Framework Preset**: Vite
- **Build Command**: `npm run build:frontend`
- **Output Directory**: `frontend/dist`
- **Install Command**: `npm run install:all`

### 3. Set Environment Variables

1. In your Vercel project dashboard, go to "Settings" → "Environment Variables"
2. Add all the required environment variables listed above
3. Make sure to set them for "Production" environment
4. **Important**: You can use either `VITE_` or `NEXT_PUBLIC_` prefixes - both will work

### 4. Deploy

1. Click "Deploy"
2. Vercel will automatically build and deploy your application
3. Monitor the build logs for any issues

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check that all dependencies are properly installed
   - Ensure TypeScript compilation passes locally
   - Verify environment variables are set correctly

2. **Runtime Errors**
   - Check browser console for client-side errors
   - Verify Supabase connection is working
   - Ensure all API endpoints are accessible

3. **Environment Variable Issues**
   - Make sure all `VITE_` or `NEXT_PUBLIC_` prefixed variables are set in Vercel
   - Verify the values match your Supabase project settings
   - The app will fall back to hardcoded values if environment variables are missing

### Local Testing

Before deploying, test the production build locally:

```bash
# Install dependencies
npm run install:all

# Build the project
npm run build:frontend

# Preview the build
cd frontend && npm run preview
```

### Performance Optimization

The build configuration includes:
- Code splitting for vendor libraries
- Optimized bundle sizes
- Source maps disabled in production
- Manual chunk configuration for better caching

## Post-Deployment

1. **Verify Functionality**: Test all major features on the deployed site
2. **Check Performance**: Use Lighthouse to audit performance
3. **Monitor Errors**: Set up error tracking if needed
4. **Update DNS**: Point your custom domain to Vercel if applicable

## Security Notes

- Never commit `.env` files to version control
- Use Vercel's environment variable system for sensitive data
- Ensure Supabase Row Level Security (RLS) is properly configured
- Regularly rotate API keys and secrets 