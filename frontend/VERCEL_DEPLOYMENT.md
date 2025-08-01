# Vercel Deployment Guide

## Environment Variables Setup

### Step 1: Access Vercel Project Settings
1. Go to [vercel.com](https://vercel.com)
2. Navigate to your Kohos project
3. Click on **Settings** tab
4. Click on **Environment Variables** in the left sidebar

### Step 2: Add Required Environment Variables

Add these **REQUIRED** variables:

| Variable Name | Value | Description |
|---------------|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://your-project-id.supabase.co` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJ...` | Your Supabase anon/public key |

### Step 3: Add Optional Environment Variables

Add these **OPTIONAL** variables for full functionality:

| Variable Name | Value | Description |
|---------------|-------|-------------|
| `NODE_ENV` | `production` | Environment type |
| `NEXT_PUBLIC_APP_ENV` | `production` | App environment |
| `NEXT_PUBLIC_APP_NAME` | `Kohos` | Application name |
| `NEXT_PUBLIC_APP_VERSION` | `1.0.0` | Application version |
| `NEXT_PUBLIC_APP_URL` | `https://your-domain.vercel.app` | Your production URL |
| `NEXT_PUBLIC_ANALYTICS_ID` | `G-XXXXXXXXXX` | Google Analytics ID (optional) |
| `NEXT_PUBLIC_ANALYTICS_ENABLED` | `true` | Enable analytics (true/false) |
| `NEXT_PUBLIC_ENABLE_NOTIFICATIONS` | `true` | Enable notifications (true/false) |
| `NEXT_PUBLIC_ENABLE_ANALYTICS` | `false` | Enable app analytics (true/false) |

### Step 4: Environment Variable Configuration

For each environment variable:
1. **Name**: Enter the variable name exactly as shown above
2. **Value**: Enter the actual value
3. **Environment**: Select which environments to apply to:
   - ✅ **Production**: Always check this
   - ✅ **Preview**: Check if you want preview deployments to work
   - ✅ **Development**: Check if you want local development to work

### Step 5: Get Supabase Credentials

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Settings** → **API**
4. Copy the **Project URL** and **anon/public** key
5. Use these values for the environment variables above

### Step 6: Deploy

1. Commit and push your changes to your repository
2. Vercel will automatically trigger a new deployment
3. The deployment will now have access to all required environment variables

## Troubleshooting

### Common Issues

1. **"Missing Supabase environment variables" error**
   - Double-check that both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set
   - Ensure the variables are applied to the correct environment (Production/Preview)

2. **Build fails with environment validation errors**
   - Verify all required variables are present in Vercel settings
   - Check that variable names match exactly (case-sensitive)

3. **Local development works but production doesn't**
   - Ensure environment variables are set for the Production environment in Vercel
   - Check that `NODE_ENV=production` and `NEXT_PUBLIC_APP_ENV=production`

### Verification

After deployment, you can verify the environment variables are working by:
1. Checking the deployment logs in Vercel
2. Looking for any environment validation errors
3. Testing the application functionality that depends on Supabase

## Security Notes

- ✅ Environment variables are encrypted and secure in Vercel
- ✅ Only `NEXT_PUBLIC_*` variables are exposed to the client
- ✅ Never commit `.env.local` files to version control
- ✅ Use different Supabase projects for development and production 