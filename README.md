# Kohos - Brand-Creator Partnership Platform

A modern marketplace platform connecting brands with content creators for authentic partnerships.

## 🏗️ Project Structure

```
kohos/
├── frontend/              # React + TypeScript + Vite application
│   ├── src/              # Source code
│   ├── public/           # Static assets
│   ├── docs/             # Frontend documentation
│   └── scripts/          # Development scripts
├── backend/              # Supabase backend services
│   ├── supabase/         # Database migrations and config
│   └── functions/        # Edge functions (future)
└── README.md             # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 20+ (use `nvm use` to switch to the correct version)
- npm or yarn
- Supabase account

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   nvm use  # Uses Node 20 as specified in .nvmrc
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp env.example .env.local
   # Edit .env.local with your Supabase credentials
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start local Supabase**
   ```bash
   npm run db:start
   ```

4. **Apply database migrations**
   ```bash
   npm run db:push
   ```

## 🛠️ Development

### Frontend Development

```bash
cd frontend

# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Format code
npm run format

# Type checking
npm run type-check
```

### Backend Development

```bash
cd backend

# Start local Supabase
npm run db:start

# Apply migrations
npm run db:push

# Generate TypeScript types
npm run db:generate-types

# Stop local Supabase
npm run db:stop
```

### Available Scripts

#### Frontend Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run type-check` - Run TypeScript type checking
- `npm run format` - Format code with Prettier
- `npm run clean` - Clean build artifacts

#### Backend Scripts
- `npm run db:start` - Start local Supabase
- `npm run db:stop` - Stop local Supabase
- `npm run db:status` - Check Supabase status
- `npm run db:push` - Apply migrations
- `npm run db:reset` - Reset database
- `npm run db:generate-types` - Generate TypeScript types

## 🗄️ Database

The backend uses Supabase as the primary database with the following schema:

- **profiles** - Base user profiles
- **creator_profiles** - Creator-specific data
- **brand_profiles** - Brand-specific data
- **campaigns** - Brand campaigns
- **campaign_applications** - Creator applications

### Database Management

```bash
cd backend

# Start local development
npm run db:start

# Apply migrations
npm run db:push

# Generate types for frontend
npm run db:generate-types
```

## 🎨 Design System

The frontend uses a coffee-themed design system with:
- Warm brown and cream color palette
- Custom CSS variables for consistent theming
- Responsive design with mobile-first approach
- shadcn/ui components as the foundation

## 📱 Features

### For Brands
- Create and manage campaigns
- Browse and filter creators
- Review applications
- Analytics dashboard

### For Creators
- Discover campaigns
- Apply to campaigns
- Manage profile and portfolio
- Track application status

## 🔧 Environment Variables

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

## 🚀 Deployment

### Frontend Deployment (Vercel)
1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically on push

### Backend Deployment (Supabase)
1. Create Supabase project
2. Configure environment variables
3. Run migrations: `npm run db:push`
4. Deploy edge functions (if any)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Development Workflow
```bash
# Frontend development
cd frontend
npm run dev

# Backend development (in another terminal)
cd backend
npm run db:start
```

## 📚 Documentation

- [Frontend Development Guide](frontend/docs/DEVELOPMENT.md)
- [Backend Documentation](backend/README.md)
- [Database Schema](backend/supabase/migrations/)

## 🆘 Support

For support, email support@kohos.com or create an issue in this repository.

---

Built with ❤️ using React, TypeScript, Tailwind CSS, and Supabase.
