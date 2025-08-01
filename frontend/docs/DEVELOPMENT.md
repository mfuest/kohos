# Frontend Development Guide

This guide covers the development workflow for the Kohos frontend application.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Initial Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd kohos/frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp env.example .env.local
   # Edit .env.local with your actual values
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to `http://localhost:3000`

## 🛠️ Development Workflow

### Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues
npm run typecheck        # Run TypeScript type checking
npm run format           # Format code with Prettier
npm run format:check     # Check code formatting

# Maintenance
npm run clean            # Clean build artifacts
npm run clean:all        # Clean everything and reinstall
```

### Development Server

The development server runs on `http://localhost:3000` and includes:

- **Hot Module Replacement (HMR)** - Instant updates on file changes
- **Fast Refresh** - React component hot reloading
- **TypeScript checking** - Real-time type checking
- **ESLint integration** - Code quality feedback
- **Source maps** - Better debugging experience

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Home page
│   ├── globals.css        # Global styles
│   ├── auth/              # Authentication pages
│   ├── brand/             # Brand-specific pages
│   ├── creator/           # Creator-specific pages
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

## 🎨 Component Development

### Component Organization

Components are organized by domain and purpose:

- **`components/ui/`** - Base UI components from shadcn/ui
- **`components/shared/`** - Components used across multiple pages
- **`components/brand/`** - Brand-specific components
- **`components/creator/`** - Creator-specific components

### Creating New Components

1. **Choose the right location** based on the component's purpose
2. **Use TypeScript** for all components
3. **Follow naming conventions**:
   - PascalCase for component names
   - Descriptive, semantic names
   - Include `.tsx` extension

Example:
```tsx
// components/shared/NewComponent.tsx
import React from 'react';

interface NewComponentProps {
  title: string;
  children: React.ReactNode;
}

export function NewComponent({ title, children }: NewComponentProps) {
  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-lg font-semibold">{title}</h2>
      {children}
    </div>
  );
}
```

### Using shadcn/ui Components

The project uses shadcn/ui for base components. To add new components:

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
```

## 🔧 Environment Variables

### Required Variables

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Optional Variables

```bash
# Application Configuration
NODE_ENV=development
NEXT_PUBLIC_APP_ENV=development
NEXT_PUBLIC_APP_NAME=Kohos
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Analytics (optional)
NEXT_PUBLIC_ANALYTICS_ID=your_google_analytics_id
NEXT_PUBLIC_ANALYTICS_ENABLED=false

# Feature Flags (optional)
NEXT_PUBLIC_ENABLE_NOTIFICATIONS=true
NEXT_PUBLIC_ENABLE_ANALYTICS=false
```

### Environment Validation

The project uses Zod for environment variable validation in `src/lib/env.ts`. This ensures:

- Required variables are present
- Variables have correct types
- Clear error messages for missing variables

## 🎯 TypeScript

### Type Definitions

Types are organized in the `src/types/` directory:

- **`types/campaign.ts`** - Campaign-related types
- **`types/creator.ts`** - Creator-related types
- **`types/brand.ts`** - Brand-related types
- **`types/application.ts`** - Application-related types
- **`types/index.ts`** - Barrel exports

### Type Safety Best Practices

1. **Use interfaces for object shapes**
2. **Use type unions for variants**
3. **Export types from barrel files**
4. **Use generic types where appropriate**

Example:
```typescript
// types/campaign.ts
export interface Campaign {
  id: string;
  title: string;
  description: string;
  budget: number;
  status: 'draft' | 'active' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

// types/index.ts
export type { Campaign } from './campaign';
```

## 🔌 Supabase Integration

### Client Setup

The Supabase client is configured in `src/integrations/supabase/client.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
```

### Using Supabase in Components

```typescript
import { supabase } from '@/integrations/supabase/client';

// Query data
const { data, error } = await supabase
  .from('campaigns')
  .select('*')
  .eq('status', 'active');

// Handle errors
if (error) {
  console.error('Error fetching campaigns:', error);
  return;
}
```

## 🎨 Styling

### Tailwind CSS

The project uses Tailwind CSS for styling:

- **Utility-first approach** - Use utility classes directly
- **Responsive design** - Mobile-first responsive utilities
- **Custom theme** - Coffee-themed color palette
- **Component variants** - Use `class-variance-authority` for variants

### CSS Variables

Custom CSS variables are defined in `src/app/globals.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 25 95% 53%;
  --primary-foreground: 210 40% 98%;
  /* ... more variables */
}
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Testing Best Practices

1. **Test component behavior, not implementation**
2. **Use descriptive test names**
3. **Mock external dependencies**
4. **Test error states**
5. **Use accessibility testing**

## 🚀 Performance

### Optimization Techniques

1. **Code splitting** - Next.js automatic code splitting
2. **Image optimization** - Next.js Image component
3. **Lazy loading** - React.lazy for components
4. **Memoization** - React.memo for expensive components
5. **Bundle analysis** - Use `@next/bundle-analyzer`

### Bundle Analysis

```bash
# Analyze bundle size
npm run build
npx @next/bundle-analyzer
```

## 🐛 Debugging

### Development Tools

1. **React Developer Tools** - Component inspection
2. **Redux DevTools** - State management (if using Redux)
3. **Network tab** - API request inspection
4. **Console** - Error logging and debugging

### Common Issues

1. **Environment variables not loading**
   - Check `.env.local` file exists
   - Verify variable names start with `NEXT_PUBLIC_`
   - Restart development server

2. **TypeScript errors**
   - Run `npm run typecheck`
   - Check import paths
   - Verify type definitions

3. **Build errors**
   - Check for missing dependencies
   - Verify environment variables
   - Review build logs

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)

## 🤝 Contributing

1. **Create a feature branch**
2. **Make your changes**
3. **Run tests and linting**
4. **Submit a pull request**

### Code Style

- Use Prettier for formatting
- Follow ESLint rules
- Use TypeScript for type safety
- Write descriptive commit messages 