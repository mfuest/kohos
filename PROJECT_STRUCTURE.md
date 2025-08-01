# Project Structure

This document outlines the structure and organization of the Kohos platform.

## 🏗️ Overview

```
kohos/
├── frontend/              # Next.js + TypeScript + React application
│   ├── src/              # Source code
│   │   ├── app/          # Next.js App Router pages
│   │   ├── components/   # Reusable React components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utility functions and configurations
│   │   ├── types/        # TypeScript type definitions
│   │   └── integrations/ # Third-party integrations (Supabase)
│   ├── public/           # Static assets
│   ├── docs/             # Frontend documentation
│   └── scripts/          # Development scripts
├── backend/              # Supabase backend services
│   ├── supabase/         # Database migrations and config
│   └── functions/        # Edge functions (future)
└── README.md             # This file
```

## 📁 Frontend Structure

### Core Directories

```
frontend/src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Home page
│   ├── globals.css        # Global styles
│   ├── auth/              # Authentication pages
│   ├── brand/             # Brand-specific pages
│   │   ├── dashboard/     # Brand dashboard
│   │   ├── campaigns/     # Campaign management
│   │   ├── analytics/     # Brand analytics
│   │   └── profile/       # Brand profile
│   ├── creator/           # Creator-specific pages
│   │   ├── marketplace/   # Campaign marketplace
│   │   ├── analytics/     # Creator analytics
│   │   └── profile/       # Creator profile
│   ├── campaigns/         # Public campaign pages
│   └── browse-creators/   # Creator discovery
├── components/            # Reusable components
│   ├── ui/               # Base UI components (shadcn/ui)
│   ├── shared/           # Shared components
│   ├── brand/            # Brand-specific components
│   └── creator/          # Creator-specific components
├── hooks/                # Custom React hooks
├── lib/                  # Utilities and configurations
├── types/                # TypeScript type definitions
└── integrations/         # Third-party integrations
    └── supabase/         # Supabase client and types
```

### Key Files

#### Configuration Files
- **next.config.js** - Next.js configuration
- **tailwind.config.ts** - Tailwind CSS configuration
- **tsconfig.json** - TypeScript configuration
- **package.json** - Dependencies and scripts
- **env.example** - Environment variables template

#### Core Application Files
- **src/app/layout.tsx** - Root layout with providers
- **src/app/page.tsx** - Home page component
- **src/lib/env.ts** - Environment variable validation
- **src/lib/utils.ts** - Utility functions
- **src/integrations/supabase/client.ts** - Supabase client setup

#### Component Organization
- **src/components/ui/** - Base UI components from shadcn/ui
- **src/components/shared/** - Components used across multiple pages
- **src/components/brand/** - Brand-specific components
- **src/components/creator/** - Creator-specific components

## 🗄️ Backend Structure

### Supabase Configuration

```
backend/
├── supabase/
│   ├── config.toml       # Supabase configuration
│   └── migrations/       # Database migrations
│       ├── 20250725164610-*.sql
│       ├── 20250725164717-*.sql
│       └── 20250725164743-*.sql
└── package.json          # Backend dependencies and scripts
```

### Database Schema

The backend uses Supabase (PostgreSQL) with the following main tables:

- **profiles** - Base user profiles
- **creator_profiles** - Creator-specific data
- **brand_profiles** - Brand-specific data
- **campaigns** - Brand campaigns
- **campaign_applications** - Creator applications

## 🛠️ Development Workflow

### Frontend Development

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Type checking
npm run typecheck
```

### Backend Development

```bash
cd backend

# Start local Supabase
npm run db:start

# Apply migrations
npm run db:push

# Generate types
npm run db:generate-types

# Stop local Supabase
npm run db:stop
```

## 📦 Dependencies

### Frontend Dependencies

#### Core Framework
- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety

#### UI and Styling
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Headless UI components
- **shadcn/ui** - Component library
- **Lucide React** - Icon library

#### State Management
- **TanStack Query** - Server state management
- **React Hook Form** - Form handling

#### Backend Integration
- **Supabase JS** - Database and auth client
- **Zod** - Schema validation

### Backend Dependencies

- **Supabase CLI** - Local development
- **PostgreSQL** - Database (via Supabase)

## 🔧 Environment Variables

### Frontend (.env.local)

```bash
# Required
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional
NODE_ENV=development
NEXT_PUBLIC_APP_ENV=development
NEXT_PUBLIC_APP_NAME=Kohos
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_ANALYTICS_ID=your_google_analytics_id
NEXT_PUBLIC_ANALYTICS_ENABLED=false
NEXT_PUBLIC_ENABLE_NOTIFICATIONS=true
NEXT_PUBLIC_ENABLE_ANALYTICS=false
```

### Backend (.env)

```bash
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SUPABASE_ANON_KEY=your_anon_key
```

## 🚀 Deployment

### Frontend (Vercel)

- **Framework**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Environment Variables**: Set in Vercel project settings

### Backend (Supabase)

- **Database**: Supabase hosted PostgreSQL
- **API**: Supabase REST and GraphQL APIs
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage

## 📚 Documentation

- [Frontend Development Guide](frontend/docs/DEVELOPMENT.md)
- [Deployment Guide](DEPLOYMENT.md)
- [Vercel Deployment Guide](frontend/VERCEL_DEPLOYMENT.md)
- [Supabase Documentation](https://supabase.com/docs)

## 🔄 Migration Notes

This project was migrated from Vite to Next.js to leverage:
- Server-side rendering (SSR)
- Static site generation (SSG)
- App Router for better routing
- Built-in API routes
- Better SEO capabilities
- Improved development experience

All environment variables now use the `NEXT_PUBLIC_` prefix for client-side access. 