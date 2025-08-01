# Kohos - Creator-Brand Collaboration Platform

A modern platform connecting creators with brands for authentic collaborations.

## 🏗️ Project Structure

```
kohos/
├── frontend/              # Next.js + TypeScript + React application
├── backend/               # Supabase backend with database and API
└── docs/                  # Project documentation
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Docker Desktop (for local Supabase development)

### Development Setup

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd kohos
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cd frontend
   cp env.example .env.local
   # Edit .env.local with your Supabase credentials
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

   This will start:
   - Frontend: http://localhost:3000
   - Backend: Supabase local development

## 🔧 Environment Variables

### Required Variables

Copy `frontend/env.example` to `frontend/.env.local` and configure:

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

### Frontend
- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **State Management**: React Query (TanStack Query)
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL)

### Backend
- **Database**: Supabase (PostgreSQL)
- **API**: Supabase Edge Functions
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/                 # Next.js App Router pages
│   ├── components/          # Reusable React components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions and configurations
│   ├── types/              # TypeScript type definitions
│   └── integrations/       # Third-party integrations (Supabase)
├── public/                 # Static assets
└── docs/                   # Frontend-specific documentation
```

## 🚀 Deployment

### Vercel Deployment

1. **Connect your repository to Vercel**
2. **Set environment variables** in Vercel project settings
3. **Deploy** - Vercel will automatically build and deploy your Next.js app

See `frontend/VERCEL_DEPLOYMENT.md` for detailed deployment instructions.

## 📚 Documentation

- [Frontend Development Guide](frontend/docs/DEVELOPMENT.md)
- [Project Structure](PROJECT_STRUCTURE.md)
- [Deployment Guide](DEPLOYMENT.md)
- [Vercel Deployment](frontend/VERCEL_DEPLOYMENT.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
