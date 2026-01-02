# IrGadgets - Tech Solutions Platform 🚀

A modern, production-ready full-stack tech services website built with Express, React, TypeScript, and PostgreSQL.

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![Node](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen)

## 🌟 Features

- **Service Catalog**: Browse computer repair, web development, mobile apps, and IT services
- **Inquiry System**: Contact form with validation and rate limiting
- **Responsive Design**: Mobile-first design with Tailwind CSS and shadcn/ui components
- **Type-Safe API**: End-to-end type safety with TypeScript and Zod validation
- **Modern Architecture**: Express backend with React frontend, Drizzle ORM for database
- **Production-Ready**: Security headers, rate limiting, error monitoring, Docker support

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Environment Variables](#environment-variables)
- [Development](#development)
- [Production Deployment](#production-deployment)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Architecture](#architecture)
- [Security](#security)
- [Contributing](#contributing)

## 🔧 Prerequisites

- **Node.js** >= 20.0.0
- **PostgreSQL** >= 14 (for production)
- **Yarn** (recommended) or npm
- **Docker** (optional, for containerized deployment)

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/hlulanigoi/irgadgets.git
cd irgadgets
```

### 2. Install dependencies
```bash
yarn install
```

### 3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your configuration
```

### 4. Set up the database

**Option A: Using Docker Compose (Recommended)**
```bash
docker-compose up -d db
```

**Option B: Local PostgreSQL**
```bash
# Create database
createdb irgadgets

# Run migrations
psql -d irgadgets -f migrations/0001_initial_schema.sql
```

### 5. Start development server
```bash
yarn dev
```

The application will be available at `http://localhost:5000`

## 🔐 Environment Variables

Create a `.env` file in the root directory. See `.env.example` for all available options.

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` or `production` |
| `PORT` | Server port | `5000` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/irgadgets` |
| `SESSION_SECRET` | Session encryption key | Generate with `openssl rand -base64 32` |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `CORS_ORIGINS` | Comma-separated allowed origins | `http://localhost:3000,http://localhost:5000` |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window | `900000` (15 min) |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | `100` |
| `SENTRY_DSN` | Sentry error monitoring | (optional) |
| `LOG_LEVEL` | Logging level | `info` |

## 💻 Development

### Available Scripts

```bash
# Development mode with hot reload
yarn dev

# Type checking
yarn check

# Build for production
yarn build

# Run production build
yarn start

# Database migrations
yarn db:push
```

### Project Structure

```
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Route pages
│   │   ├── hooks/       # Custom React hooks
│   │   └── lib/         # Utilities
├── server/              # Express backend
│   ├── middleware/      # Custom middleware
│   ├── routes.ts        # API route handlers
│   ├── storage.ts       # Data access layer
│   └── db.ts           # Database connection
├── shared/              # Shared types and schemas
│   ├── schema.ts        # Drizzle table definitions
│   └── routes.ts        # API contract
├── migrations/          # Database migrations
└── script/             # Build scripts
```

### Code Style

This project uses TypeScript with strict mode enabled. Follow these guidelines:

- Use functional components with hooks in React
- Prefer `const` over `let`
- Use async/await over promises
- Add JSDoc comments for public APIs
- Keep functions small and focused

## 🚢 Production Deployment

### Using Docker (Recommended)

```bash
# Build and run with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f app

# Stop services
docker-compose down
```

### Manual Deployment

```bash
# Install dependencies
yarn install --production

# Build application
yarn build

# Set environment variables
export NODE_ENV=production
export DATABASE_URL="postgresql://..."
export SESSION_SECRET="your-secret"

# Run migrations
psql -d $DATABASE_URL -f migrations/0001_initial_schema.sql

# Start server
yarn start
```

### Health Checks

The application exposes health check endpoints:

- `GET /health` - Basic health status
- `GET /api/health` - API health status

Response:
```json
{
  "status": "healthy",
  "timestamp": "2025-01-02T12:00:00.000Z",
  "uptime": 3600,
  "environment": "production"
}
```

## 📚 API Documentation

### Base URL
```
Production: https://your-domain.com/api
Development: http://localhost:5000/api
```

### Endpoints

#### Get All Products
```http
GET /api/products
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Computer Repair & Diagnostics",
    "description": "Comprehensive hardware and software troubleshooting...",
    "price": "Starts at $50",
    "category": "service",
    "imageUrl": "https://...",
    "createdAt": "2025-01-02T12:00:00.000Z"
  }
]
```

#### Get Single Product
```http
GET /api/products/:id
```

**Response:**
```json
{
  "id": 1,
  "name": "Computer Repair & Diagnostics",
  "description": "...",
  "price": "Starts at $50",
  "category": "service",
  "imageUrl": "https://...",
  "createdAt": "2025-01-02T12:00:00.000Z"
}
```

#### Create Inquiry
```http
POST /api/inquiries
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "I need help with...",
  "serviceOfInterest": "Computer Repair"
}
```

**Response:**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "message": "I need help with...",
  "serviceOfInterest": "Computer Repair",
  "createdAt": "2025-01-02T12:00:00.000Z"
}
```

### Error Responses

```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

## 🧪 Testing

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test:coverage
```

### Test Structure

```
├── server/
│   └── __tests__/
│       ├── routes.test.ts
│       └── storage.test.ts
└── client/
    └── src/
        └── __tests__/
            └── components/
```

## 🏗️ Architecture

### Technology Stack

**Frontend:**
- React 18 with TypeScript
- Wouter for routing
- TanStack Query for server state
- Tailwind CSS + shadcn/ui components
- Framer Motion for animations
- Zod for validation

**Backend:**
- Node.js + Express
- TypeScript
- Drizzle ORM
- PostgreSQL
- Winston for logging
- Helmet for security

**DevOps:**
- Docker + Docker Compose
- GitHub Actions CI/CD
- esbuild + Vite for building

### Database Schema

**Products Table:**
- `id` (serial, primary key)
- `name` (text, not null)
- `description` (text, not null)
- `price` (text, not null)
- `category` (text, not null)
- `image_url` (text, not null)
- `created_at` (timestamp, default now)

**Inquiries Table:**
- `id` (serial, primary key)
- `name` (text, not null)
- `email` (text, not null)
- `message` (text, not null)
- `service_of_interest` (text, nullable)
- `created_at` (timestamp, default now)

## 🔒 Security

### Implemented Security Measures

- ✅ **Security Headers**: Helmet.js with CSP
- ✅ **Rate Limiting**: Express rate limiter (100 req/15min, 5 req/15min for forms)
- ✅ **CORS**: Configurable allowed origins
- ✅ **Input Validation**: Zod schemas for all inputs
- ✅ **SQL Injection Protection**: Parameterized queries via Drizzle ORM
- ✅ **Secure Sessions**: HTTP-only cookies with encryption
- ✅ **Error Handling**: No sensitive data leakage in production
- ✅ **Compression**: Gzip/Brotli compression enabled
- ✅ **HTTPS Ready**: Configured for reverse proxy (trust proxy)

### Security Best Practices

1. **Always use HTTPS in production**
2. **Rotate SESSION_SECRET regularly**
3. **Keep dependencies updated**: Run `yarn audit`
4. **Set strong DATABASE_URL passwords**
5. **Enable database backups**
6. **Monitor logs for suspicious activity**
7. **Use environment variables for secrets**

## 📊 Monitoring & Logging

### Logging

Logs are written to:
- `logs/combined.log` - All logs
- `logs/error.log` - Error logs only
- Console (development only)

Log format: JSON with timestamps, structured data

### Recommended Monitoring Tools

- **Error Tracking**: Sentry (add `SENTRY_DSN` to `.env`)
- **APM**: New Relic, Datadog
- **Uptime**: UptimeRobot, Pingdom
- **Logs**: ELK Stack, CloudWatch

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Write tests for new features
- Update documentation
- Follow existing code style
- Keep commits atomic and well-described
- Ensure all tests pass before submitting PR

## 📝 License

This project is licensed under the MIT License. See `LICENSE` file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Drizzle ORM](https://orm.drizzle.team/) for type-safe database queries
- [TanStack Query](https://tanstack.com/query) for server state management

## 📞 Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/hlulanigoi/irgadgets/issues)
- **Email**: support@irgadgets.com
- **Documentation**: [Full docs](https://github.com/hlulanigoi/irgadgets/wiki)

---

**Built with ❤️ by the IrGadgets team**
