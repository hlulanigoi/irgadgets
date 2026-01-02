# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-01-02

### Added - Production Readiness Release

#### Infrastructure & Deployment
- Docker support with multi-stage builds
- Docker Compose configuration for local and production deployment
- Health check endpoints (`/health` and `/api/health`)
- Comprehensive `.env.example` with all configuration options
- Database migrations system
- Production-ready build configuration

#### Security
- Helmet.js security headers with CSP
- Express rate limiting (100 req/15min for API, 5 req/15min for forms)
- CORS configuration with environment-based origins
- Request logging with Winston
- Structured error handling with production-safe responses
- SQL injection protection via Drizzle ORM parameterized queries
- Compression middleware (gzip/brotli)

#### Database
- PostgreSQL support for production
- SQLite fallback for local development
- Automated database seeding
- Migration scripts
- Database indexes for performance optimization
- Dual-dialect schema support (PostgreSQL/SQLite)

#### Testing
- Vitest configuration for unit and integration tests
- Sample test suite for API and schemas
- Test coverage reporting
- CI-ready test scripts

#### Documentation
- Comprehensive README with setup instructions
- API documentation with examples
- Deployment guide for multiple platforms
- Contributing guidelines
- Security policy
- Code of conduct
- Detailed environment variable documentation

#### CI/CD
- GitHub Actions workflow
- Automated linting and type checking
- Automated testing
- Docker image building
- Security auditing

#### Monitoring & Logging
- Winston structured logging to files
- Request/response logging with timing
- Error logging with stack traces
- Separate error.log and combined.log files
- Production-safe error responses (no stack trace leaking)

#### Developer Experience
- Improved type safety across the stack
- Better error messages
- Development and production environment separation
- Hot reload support
- TypeScript strict mode

### Changed

#### Database Layer
- Updated `server/db.ts` to support both PostgreSQL and SQLite
- Enhanced `shared/schema.ts` with dual-dialect support
- Added timestamps to all tables

#### Server Configuration
- Refactored `server/index.ts` with middleware organization
- Added comprehensive error handling middleware
- Improved logging throughout the application
- Trust proxy configuration for correct IP detection behind load balancers

#### Build System
- Updated build scripts for production optimization
- Added test scripts to package.json
- Improved TypeScript configuration

### Fixed
- Database configuration mismatch between drizzle.config and actual usage
- Missing environment variable handling
- Error handling inconsistencies
- Missing security headers
- Lack of rate limiting on public endpoints

### Security
- All inputs validated with Zod schemas
- Rate limiting on all API endpoints
- Enhanced rate limiting on form submissions
- Security headers protecting against XSS, clickjacking, etc.
- Secure session configuration
- No sensitive data in error responses (production mode)

## [0.1.0] - Initial Development

### Added
- React frontend with TypeScript
- Express backend with TypeScript
- Drizzle ORM integration
- Product catalog system
- Inquiry form submission
- Wouter routing
- TanStack Query for data fetching
- Tailwind CSS styling
- shadcn/ui component library
- Replit authentication integration
- Vite development server with HMR
- Basic API endpoints for products and inquiries

---

## Upgrade Guide

### From 0.1.0 to 1.0.0

1. **Environment Variables**
   ```bash
   # Create .env file from template
   cp .env.example .env
   # Edit .env with your configuration
   ```

2. **Database Migration**
   ```bash
   # Run the migration script
   psql $DATABASE_URL -f migrations/0001_initial_schema.sql
   ```

3. **Dependencies**
   ```bash
   # Install new dependencies
   yarn install
   ```

4. **Build for Production**
   ```bash
   yarn build
   ```

5. **Update Deployment Configuration**
   - Review DEPLOYMENT.md for platform-specific instructions
   - Update environment variables in your deployment platform
   - Configure DATABASE_URL for PostgreSQL

### Breaking Changes

#### Database
- SQLite temporary path changed to check for DATABASE_URL first
- PostgreSQL is now the recommended production database
- Schema now includes `createdAt` timestamps

#### Environment Variables
- `DATABASE_URL` is now required for production
- `SESSION_SECRET` must be explicitly set
- `CORS_ORIGINS` should be configured for production

#### API Responses
- Error responses now follow a standard format
- Production mode hides stack traces
- Rate limiting may affect high-traffic clients

---

## Migration Notes

### Database Schema Changes

**1.0.0**: Added timestamps to products and inquiries tables
```sql
ALTER TABLE products ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE inquiries ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
```

---

## Future Roadmap

### Planned for 1.1.0
- [ ] Admin dashboard for managing products and inquiries
- [ ] Email notifications for new inquiries
- [ ] Enhanced analytics and tracking
- [ ] Image upload for products
- [ ] Product categories with filtering
- [ ] Search functionality

### Planned for 1.2.0
- [ ] User authentication and accounts
- [ ] Product reviews and ratings
- [ ] Shopping cart functionality
- [ ] Payment processing integration
- [ ] Order management system

### Planned for 2.0.0
- [ ] GraphQL API
- [ ] Real-time updates with WebSockets
- [ ] Mobile app (React Native)
- [ ] Advanced admin features
- [ ] Multi-language support
- [ ] Advanced caching strategies

---

For detailed changes, see [GitHub Releases](https://github.com/hlulanigoi/irgadgets/releases)
