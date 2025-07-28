# Kohos Backend

Backend services for the Kohos platform, including database management and API functions.

## 🗄️ Database

This backend uses Supabase as the primary database and backend-as-a-service solution.

### Database Schema

#### Core Tables
- **profiles** - Base user profiles with authentication data
- **creator_profiles** - Creator-specific data (followers, engagement, etc.)
- **brand_profiles** - Brand-specific data (company info, industry, etc.)
- **campaigns** - Brand campaigns with requirements and budgets
- **campaign_applications** - Creator applications to campaigns

#### Relationships
- Users can be either brands or creators (determined by `user_type`)
- Campaigns belong to brands (`brand_user_id`)
- Applications connect creators to campaigns
- Profiles are automatically created on user signup

### Database Management

#### Local Development
```bash
# Start local Supabase instance
npm run db:start

# Check status
npm run db:status

# Stop local instance
npm run db:stop
```

#### Migrations
```bash
# Create new migration
npm run db:migrate migration_name

# Apply migrations
npm run db:push

# Reset database
npm run db:reset
```

#### Type Generation
```bash
# Generate TypeScript types from schema
npm run db:generate-types
```

### Row Level Security (RLS)

All tables have RLS policies configured:

- **profiles**: Users can view all profiles, update their own
- **creator_profiles**: Public read, creators can update their own
- **brand_profiles**: Public read, brands can update their own
- **campaigns**: Public read, brands can manage their own
- **campaign_applications**: Creators can view their applications, brands can view applications for their campaigns

## 🔧 Edge Functions

Supabase Edge Functions for server-side logic:

### Available Functions
- `auth-webhook` - Handle authentication events
- `campaign-notifications` - Send notifications for campaign updates
- `payment-processing` - Handle payment webhooks

### Development
```bash
# Start functions locally
npm run functions:dev

# Deploy functions
npm run functions:deploy
```

## 🚀 API Endpoints

### Authentication
- `POST /auth/signup` - User registration
- `POST /auth/signin` - User login
- `POST /auth/signout` - User logout

### Profiles
- `GET /profiles` - Get user profiles
- `PUT /profiles/:id` - Update profile
- `GET /profiles/creator/:id` - Get creator profile
- `GET /profiles/brand/:id` - Get brand profile

### Campaigns
- `GET /campaigns` - List campaigns
- `POST /campaigns` - Create campaign
- `PUT /campaigns/:id` - Update campaign
- `DELETE /campaigns/:id` - Delete campaign

### Applications
- `GET /applications` - List applications
- `POST /applications` - Create application
- `PUT /applications/:id` - Update application status

## 🔐 Security

### Authentication
- JWT-based authentication via Supabase Auth
- Email/password authentication
- Social login support (configurable)

### Authorization
- Row Level Security (RLS) policies
- Role-based access control
- API key management for external services

### Data Protection
- Encrypted data at rest
- HTTPS for all communications
- GDPR compliance features

## 📊 Monitoring

### Database Monitoring
- Supabase Dashboard for real-time metrics
- Query performance monitoring
- Connection pool monitoring

### Function Monitoring
- Edge function execution logs
- Error tracking and alerting
- Performance metrics

## 🧪 Testing

### Database Testing
```bash
# Run database tests
npm run test:db

# Test migrations
npm run test:migrations
```

### API Testing
```bash
# Run API tests
npm run test:api

# Test edge functions
npm run test:functions
```

## 🚀 Deployment

### Production Setup
1. Create Supabase project
2. Configure environment variables
3. Run migrations: `npm run db:push`
4. Deploy edge functions: `npm run functions:deploy`

### Environment Variables
```env
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SUPABASE_ANON_KEY=your_anon_key
```

## 📚 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Database Schema](supabase/migrations/)
- [API Documentation](docs/api.md)
- [Security Guidelines](docs/security.md) 