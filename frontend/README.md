# Kohos Frontend

A Next.js + React application for the Kohos platform.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Development Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp env.example .env.local
   # Edit .env.local with your actual values
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

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

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **State Management**: React Query (TanStack Query)
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL)

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable React components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and configurations
├── types/              # TypeScript type definitions
└── integrations/       # Third-party integrations (Supabase)
```

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run typecheck` - Run TypeScript type checking
- `npm run format` - Format code with Prettier
- `npm run clean` - Clean build artifacts

## 🚀 Deployment

See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for detailed deployment instructions.

## 📚 Documentation

- [Development Guide](./docs/DEVELOPMENT.md)
- [Vercel Deployment](./VERCEL_DEPLOYMENT.md) 