# Kohos Frontend

A Vite + React application for the Kohos platform.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Vercel Deployment Notes

### Prerequisites
- Node 20.x (matches `.nvmrc` and Vercel Project Settings)
- Use `npm ci` in CI and hosting environments
- Do not set `omit=optional` in `.npmrc` (breaks Rollup platform deps)

### Environment Variables
Set these in Vercel Project Settings:
- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous key

### Vercel Configuration
- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Root Directory**: `frontend` (for monorepo)
- **Node Version**: 20.x

### Local Vercel Testing
```bash
vercel build          # Test build locally
vercel deploy --prod  # Deploy to production
```

### Troubleshooting
- If you see "Cannot find module @rollup/rollup-linux-x64-gnu", ensure `.npmrc` doesn't contain `omit=optional`
- Run `vercel build` locally to reproduce Vercel build environment
- Ensure `bun.lockb` is removed to use npm instead of Bun 