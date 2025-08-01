# Deployment Guide

This guide covers deploying the Kohos platform to production.

## 🚀 Frontend Deployment (Vercel)

### Prerequisites

- Vercel account
- GitHub repository connected to Vercel
- Supabase project set up

### Environment Variables

Set these in your Vercel project settings:

#### Required Variables

| Variable Name | Value | Description |
|---------------|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://your-project-id.supabase.co` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJ...` | Your Supabase anon/public key |

#### Optional Variables

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

### Vercel Configuration

- **Framework Preset**: Next.js
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `.next` (auto-detected)
- **Root Directory**: `frontend` (for monorepo)
- **Node Version**: 18.x or higher

### Deployment Steps

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Set root directory to `frontend`

2. **Configure Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add all required and optional variables above
   - Set environment scope (Production, Preview, Development)

3. **Deploy**
   - Vercel will automatically build and deploy on push to main branch
   - Preview deployments are created for pull requests

### Local Vercel Testing

```bash
# Test build locally
vercel build

# Deploy to production
vercel deploy --prod
```

## 🗄️ Backend Deployment (Supabase)

### Prerequisites

- Supabase account
- Supabase CLI installed

### Database Setup

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create new project
   - Note your project URL and API keys

2. **Apply Migrations**
   ```bash
   cd backend
   npm run db:push
   ```

3. **Generate Types**
   ```bash
   npm run db:generate-types
   ```

### Environment Variables

Set these in your Supabase project settings:

```bash
# Supabase Configuration (auto-configured)
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## 🔧 Production Checklist

### Frontend (Vercel)

- [ ] Environment variables configured
- [ ] Build succeeds without errors
- [ ] All pages load correctly
- [ ] Authentication works
- [ ] Database connections established
- [ ] Analytics configured (if using)
- [ ] Custom domain configured (optional)

### Backend (Supabase)

- [ ] Database migrations applied
- [ ] Row Level Security (RLS) policies configured
- [ ] Storage buckets created and configured
- [ ] Edge functions deployed (if any)
- [ ] API rate limiting configured
- [ ] Monitoring and logging enabled

### Security

- [ ] Environment variables are encrypted
- [ ] API keys are secure and not exposed
- [ ] CORS policies configured
- [ ] Authentication flows tested
- [ ] Database permissions reviewed

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**
   - Check environment variables are set correctly
   - Verify Node.js version compatibility
   - Review build logs for specific errors

2. **Database Connection Issues**
   - Verify Supabase URL and keys
   - Check network connectivity
   - Review RLS policies

3. **Authentication Problems**
   - Verify Supabase Auth configuration
   - Check redirect URLs in Supabase settings
   - Review authentication flow

4. **Environment Variable Issues**
   - Ensure all `NEXT_PUBLIC_` prefixed variables are set in Vercel
   - Check variable names match exactly (case-sensitive)
   - Verify environment scope (Production/Preview/Development)

### Support

For deployment issues:
1. Check Vercel deployment logs
2. Review Supabase project logs
3. Test locally with production environment variables
4. Contact support if issues persist

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Frontend Vercel Deployment Guide](frontend/VERCEL_DEPLOYMENT.md) 