# Kohos Project Structure

This document outlines the organized structure of the Kohos platform with clear separation between frontend and backend components.

## 📁 Root Structure

```
kohos/
├── frontend/              # React + TypeScript + Vite application
├── backend/               # Supabase backend services
├── README.md              # Main project documentation
├── .gitignore             # Root gitignore
└── package.json           # Root package.json with workspace scripts
```

## 🎨 Frontend Structure

```
frontend/
├── src/                   # Source code
│   ├── components/        # Reusable UI components
│   │   ├── ui/           # shadcn/ui components (buttons, cards, forms)
│   │   ├── brand/        # Brand-specific components
│   │   │   └── BrandHeader.tsx
│   │   ├── creator/      # Creator-specific components
│   │   │   ├── CreatorCard.tsx
│   │   │   └── CreatorHeader.tsx
│   │   └── shared/       # Shared components across user types
│   │       ├── SignInDialog.tsx
│   │       ├── TopNavigation.tsx
│   │       └── UserTypeCard.tsx
│   ├── pages/            # Page components organized by user type
│   │   ├── brand/        # Brand-specific pages
│   │   │   ├── Analytics.tsx
│   │   │   ├── Campaigns.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   └── Profile.tsx
│   │   ├── creator/      # Creator-specific pages
│   │   │   ├── Analytics.tsx
│   │   │   ├── Marketplace.tsx
│   │   │   └── Profile.tsx
│   │   ├── About.tsx     # Shared pages
│   │   ├── Auth.tsx
│   │   ├── BrowseCreators.tsx
│   │   ├── Campaigns.tsx
│   │   ├── Index.tsx
│   │   ├── Landing.tsx
│   │   └── NotFound.tsx
│   ├── hooks/            # Custom React hooks
│   │   ├── useAuth.tsx
│   │   ├── useCampaigns.ts
│   │   ├── useCreators.ts
│   │   ├── useProfile.ts
│   │   ├── useApplications.ts
│   │   └── use-mobile.tsx
│   ├── types/            # TypeScript type definitions
│   │   ├── campaign.ts   # Campaign-related types
│   │   ├── creator.ts    # Creator-related types
│   │   ├── brand.ts      # Brand-related types
│   │   ├── application.ts # Application-related types
│   │   └── index.ts      # Barrel exports
│   ├── integrations/     # External service integrations
│   │   └── supabase/     # Supabase client and types
│   │       ├── client.ts
│   │       └── types.ts
│   ├── lib/              # Utility functions and configurations
│   │   ├── utils.ts      # Common utility functions
│   │   └── env.ts        # Environment validation (future)
│   ├── assets/           # Static assets
│   │   ├── coffee-hero.jpg
│   │   └── hero-image.jpg
│   ├── App.tsx           # Main App component
│   ├── App.css           # App styles
│   ├── index.css         # Global styles
│   ├── main.tsx          # Entry point
│   └── vite-env.d.ts     # Vite types
├── public/               # Public assets
│   ├── favicon.ico
│   ├── placeholder.svg
│   ├── robots.txt
│   └── lovable-uploads/  # Uploaded images
├── docs/                 # Frontend documentation
│   └── DEVELOPMENT.md    # Development guide
├── scripts/              # Development scripts
│   ├── setup.sh          # Setup script
│   └── cleanup.sh        # Cleanup script
├── .vscode/              # VS Code settings
│   ├── settings.json
│   └── extensions.json
├── package.json          # Frontend dependencies
├── package-lock.json     # Lock file
├── vite.config.ts        # Vite configuration
├── tailwind.config.ts    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
├── eslint.config.js      # ESLint configuration
├── postcss.config.js     # PostCSS configuration
├── components.json       # shadcn/ui configuration
├── .prettierrc           # Prettier configuration
├── .nvmrc                # Node version
└── env.example           # Environment template
```

## 🗄️ Backend Structure

```
backend/
├── supabase/             # Supabase configuration
│   ├── config.toml       # Supabase config
│   └── migrations/       # Database migrations
│       ├── 20250725164610-ca4a8299-443b-4041-bb9a-75507aa3f043.sql
│       ├── 20250725164717-eb619eb9-9800-47df-9ce1-94298bb7ab13.sql
│       └── 20250725164743-1c69dbbc-0133-43be-b8cf-ce80579cd905.sql
├── functions/            # Edge functions (future)
├── package.json          # Backend dependencies
├── README.md             # Backend documentation
└── .gitignore            # Backend gitignore
```

## 🔧 Configuration Files

### Root Level
- **package.json** - Workspace management and root scripts
- **.gitignore** - Root-level ignore rules
- **README.md** - Main project documentation

### Frontend Configuration
- **vite.config.ts** - Vite build configuration
- **tailwind.config.ts** - Tailwind CSS configuration
- **tsconfig.json** - TypeScript configuration
- **eslint.config.js** - ESLint rules
- **.prettierrc** - Code formatting rules
- **components.json** - shadcn/ui configuration

### Backend Configuration
- **supabase/config.toml** - Supabase project configuration
- **package.json** - Backend dependencies and scripts

## 🚀 Development Workflow

### Starting Development
```bash
# Root level - start both frontend and backend
npm run dev

# Frontend only
cd frontend && npm run dev

# Backend only
cd backend && npm run db:start
```

### Building
```bash
# Build frontend
cd frontend && npm run build

# Build both (from root)
npm run build
```

### Database Management
```bash
# From root
npm run db:start
npm run db:push
npm run db:generate-types

# From backend directory
cd backend && npm run db:start
```

## 📦 Package Management

### Root Level Scripts
- `npm run dev` - Start both frontend and backend
- `npm run build` - Build frontend
- `npm run setup` - Setup both frontend and backend
- `npm run clean` - Clean both frontend and backend
- `npm run lint` - Lint both frontend and backend

### Frontend Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run format` - Format code
- `npm run type-check` - TypeScript checking

### Backend Scripts
- `npm run db:start` - Start local Supabase
- `npm run db:push` - Apply migrations
- `npm run db:generate-types` - Generate TypeScript types

## 🔐 Environment Variables

### Frontend (.env.local)
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Backend (.env)
```env
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SUPABASE_ANON_KEY=your_anon_key
```

## 🎯 Key Benefits of This Structure

1. **Clear Separation** - Frontend and backend are clearly separated
2. **Independent Development** - Each can be developed independently
3. **Scalable** - Easy to add more services or frontend apps
4. **Maintainable** - Clear organization makes maintenance easier
5. **Team Collaboration** - Different teams can work on different parts
6. **Deployment Flexibility** - Can deploy frontend and backend separately

## 🚀 Recent Enhancements

### 1. **Domain-Based Component Organization**
Components are now organized by domain:
- `components/ui/` - Reusable UI atoms (buttons, cards, forms)
- `components/brand/` - Brand-specific components
- `components/creator/` - Creator-specific components  
- `components/shared/` - Components used across user types

### 2. **User-Type Page Organization**
Pages are grouped by user type:
- `pages/brand/` - Brand dashboard, campaigns, analytics, profile
- `pages/creator/` - Creator marketplace, analytics, profile
- Root pages - Shared pages like landing, auth, about

### 3. **Centralized Type Definitions**
New `types/` directory with domain-specific type files:
- `types/campaign.ts` - Campaign types and constants
- `types/creator.ts` - Creator types and constants
- `types/brand.ts` - Brand types and constants
- `types/application.ts` - Application types and constants
- `types/index.ts` - Barrel exports for easy importing

### 4. **Enhanced Utility Functions**
Expanded `lib/utils.ts` with:
- Currency and number formatting
- Date and time utilities
- Validation functions
- UI helper functions
- Performance utilities (debounce, throttle)

### 5. **Environment Validation** (Future)
`lib/env.ts` provides:
- Zod-based environment validation
- Type-safe environment variables
- Runtime error prevention
- Development/production helpers

## 🔄 Migration Notes

- All frontend code moved to `frontend/` directory
- All backend/database code moved to `backend/` directory
- Configuration files moved to appropriate directories
- Scripts updated to work with new structure
- Documentation updated to reflect new organization
- Components reorganized by domain (brand/creator/shared)
- Pages grouped by user type (brand/creator)
- Type definitions centralized in `types/` directory 