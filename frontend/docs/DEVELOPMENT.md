# Development Guide

## 🚀 Getting Started

### Prerequisites
- Node.js 20+ (use `nvm use` to switch to the correct version)
- npm or yarn
- VS Code with recommended extensions
- Supabase CLI (optional, for local development)

### Initial Setup
```bash
# Clone the repository
git clone <repository-url>
cd kohos

# Use the correct Node version
nvm use

# Install dependencies
npm install

# Set up environment variables
cp env.example .env.local
# Edit .env.local with your Supabase credentials

# Start development server
npm run dev
```

## 🛠️ Development Workflow

### Daily Workflow
1. **Start your day**
   ```bash
   nvm use
   npm run dev
   ```

2. **Before committing**
   ```bash
   npm run lint:fix
   npm run format
   npm run type-check
   ```

3. **Clean up when needed**
   ```bash
   npm run clean        # Clean build artifacts
   npm run clean:all    # Full reset (use sparingly)
   ```

### Code Quality

#### Linting
- ESLint is configured for TypeScript and React
- Run `npm run lint` to check for issues
- Run `npm run lint:fix` to auto-fix issues

#### Formatting
- Prettier is configured for consistent formatting
- Run `npm run format` to format all files
- Run `npm run format:check` to check formatting

#### Type Checking
- TypeScript is strictly configured
- Run `npm run type-check` to check types
- Fix type errors before committing

### Git Workflow

#### Branch Naming
- `feature/feature-name` - New features
- `fix/bug-description` - Bug fixes
- `refactor/component-name` - Code refactoring
- `docs/documentation-update` - Documentation changes

#### Commit Messages
Use conventional commits:
- `feat: add campaign application system`
- `fix: resolve authentication issue`
- `refactor: improve component structure`
- `docs: update README`

## 📁 Project Structure

```
kohos/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # shadcn/ui components
│   │   └── ...             # Custom components
│   ├── hooks/              # Custom React hooks
│   ├── pages/              # Page components
│   ├── integrations/       # External service integrations
│   │   └── supabase/       # Supabase client and types
│   └── lib/                # Utility functions
├── supabase/               # Database migrations and config
├── public/                 # Static assets
├── docs/                   # Documentation
└── .vscode/                # VS Code settings
```

## 🎨 Styling Guidelines

### Tailwind CSS
- Use Tailwind utility classes for styling
- Follow mobile-first responsive design
- Use the custom coffee theme colors defined in `src/index.css`

### Component Styling
```tsx
// Good: Use Tailwind classes
<div className="flex items-center space-x-2 bg-coffee-light p-4 rounded-lg">

// Avoid: Inline styles
<div style={{ display: 'flex', backgroundColor: '#f5f5f5' }}>
```

### Custom CSS
- Define custom CSS variables in `src/index.css`
- Use CSS variables for theme colors
- Keep custom CSS minimal

## 🗄️ Database Development

### Local Development
```bash
# Start Supabase locally (requires Supabase CLI)
npm run supabase:start

# Push migrations
npm run db:push

# Reset database
npm run db:reset
```

### Database Changes
1. Create a new migration: `supabase migration new migration_name`
2. Write SQL in the generated file
3. Test locally: `npm run db:push`
4. Commit the migration file

### Type Generation
After schema changes, regenerate types:
```bash
supabase gen types typescript --local > src/integrations/supabase/types.ts
```

## 🧪 Testing

### Manual Testing Checklist
- [ ] Test on different screen sizes
- [ ] Test authentication flow
- [ ] Test campaign creation and management
- [ ] Test creator discovery and application
- [ ] Test error states and loading states

### Browser Testing
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🚀 Deployment

### Pre-deployment Checklist
- [ ] All tests pass
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] Environment variables configured
- [ ] Database migrations applied

### Environment Variables
Ensure these are set in production:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## 🐛 Debugging

### Common Issues

#### Build Errors
```bash
# Clear cache and rebuild
npm run clean
npm install
npm run build
```

#### TypeScript Errors
```bash
# Check types
npm run type-check

# Regenerate Supabase types if needed
supabase gen types typescript --local > src/integrations/supabase/types.ts
```

#### Styling Issues
- Check Tailwind CSS IntelliSense extension
- Verify CSS variables are defined
- Check for conflicting styles

### Debug Tools
- React Developer Tools
- Redux DevTools (if using Redux)
- Network tab for API calls
- Console for errors

## 📚 Resources

### Documentation
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Supabase Documentation](https://supabase.com/docs)

### VS Code Extensions
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript Importer
- Auto Rename Tag

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run quality checks
4. Write tests if applicable
5. Update documentation
6. Submit a pull request

### Code Review Checklist
- [ ] Code follows project conventions
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] Tests pass
- [ ] Documentation updated
- [ ] No console.log statements
- [ ] Proper error handling 