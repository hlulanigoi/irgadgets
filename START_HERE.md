# 🚀 START HERE - IrGadgets Documentation

**Welcome!** Choose your path below to get started quickly.

---

## 👤 I'm a...

### 🆕 **New User - Just Want to See It Working**
**Time: 5 minutes**

1. **Quick Demo (Local)**
   ```bash
   git clone https://github.com/hlulanigoi/irgadgets.git
   cd irgadgets
   yarn install
   yarn dev
   ```
   Open http://localhost:5000

2. **What You Get:**
   - Browse tech services catalog
   - Submit inquiry forms
   - See the full application in action

**Next:** When ready to deploy → See "Ready to Deploy" below

---

### 🚀 **Ready to Deploy to Production**
**Time: 15-20 minutes**

Choose your deployment method:

| Platform | Time | Difficulty | Cost | Guide |
|----------|------|------------|------|-------|
| **Heroku** ⭐ | 10 min | Easy | Free-$7/mo | [Jump to Heroku](#heroku-deployment) |
| **Docker Compose** | 15 min | Medium | VPS cost | [Jump to Docker](#docker-deployment) |
| **DigitalOcean** | 12 min | Easy | $12/mo | [Jump to DO](#digitalocean-deployment) |
| **AWS/Custom** | 20 min | Advanced | Varies | See [DEPLOYMENT.md](./DEPLOYMENT.md) |

**Before deploying:** 
- [ ] Have a PostgreSQL database ready (or use platform's managed DB)
- [ ] Have a domain (optional but recommended)

---

### 💻 **Developer - Want to Contribute**
**Get set up for development**

1. **Read:** [CONTRIBUTING.md](./CONTRIBUTING.md) - Development workflow
2. **Setup:**
   ```bash
   git clone https://github.com/hlulanigoi/irgadgets.git
   cd irgadgets
   yarn install
   cp .env.example .env
   # Edit .env with local database
   yarn dev
   ```
3. **Test:** `yarn test`
4. **Build:** `yarn build`

**Key Files:**
- `README.md` - Full project documentation
- `API_DOCUMENTATION.md` - API reference
- `CONTRIBUTING.md` - Contribution guidelines

---

### 🔍 **Evaluating This Project**
**Learn what this project does**

**What is IrGadgets?**
A production-ready full-stack tech services website with:
- Service catalog (computer repair, web dev, mobile apps, IT maintenance)
- Inquiry/contact form system
- Modern stack: React + Express + TypeScript + PostgreSQL
- Enterprise security & monitoring

**Tech Stack:**
- **Frontend:** React 18, TypeScript, Tailwind CSS, shadcn/ui
- **Backend:** Express, Node.js, TypeScript, Drizzle ORM
- **Database:** PostgreSQL (SQLite fallback for dev)
- **Security:** Helmet, rate limiting, CORS, input validation
- **Monitoring:** Winston logging, health checks

**Read Full Details:** [README.md](./README.md)

---

### 🔧 **Already Deployed - Need Help**
**Troubleshooting & maintenance**

**Common Issues:**
- **App won't start** → [Troubleshooting](#troubleshooting)
- **Database errors** → [Database Setup](#database-setup)
- **CORS errors** → [Configure CORS](#cors-configuration)
- **Performance issues** → [Optimization Guide](#performance)

**Maintenance Tasks:**
- Update dependencies: `yarn upgrade`
- Security audit: `yarn audit`
- View logs: `docker-compose logs -f` or `heroku logs --tail`
- Backup database: See [Backup Guide](#backups)

**Full Guide:** [DEPLOYMENT.md](./DEPLOYMENT.md)

---

### 📚 **Need API Documentation**
**Integrate with the API**

**Quick API Overview:**

```bash
# Get all products
GET /api/products

# Get single product
GET /api/products/:id

# Submit inquiry
POST /api/inquiries
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "I need help...",
  "serviceOfInterest": "Computer Repair"
}
```

**Full API Docs:** [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

---

## 📖 Quick Reference

### Essential Commands

```bash
# Development
yarn dev              # Start dev server
yarn test            # Run tests
yarn check           # Type check

# Production
yarn build           # Build for production
yarn start           # Run production build

# Database
yarn db:push         # Push schema changes
psql $DATABASE_URL -f migrations/0001_initial_schema.sql  # Run migrations

# Docker
docker-compose up -d        # Start all services
docker-compose logs -f app  # View logs
docker-compose down         # Stop services
```

---

## 🚢 Deployment Guides

### Heroku Deployment
**⏱️ 10 minutes | 💰 Free-$7/mo | 😊 Easiest**

```bash
# Install Heroku CLI if needed
brew install heroku/brew/heroku

# Create app and database
heroku create your-app-name
heroku addons:create heroku-postgresql:essential-0

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set SESSION_SECRET=$(openssl rand -base64 32)
heroku config:set CORS_ORIGINS=https://your-app-name.herokuapp.com

# Deploy
git push heroku main

# Run migrations
heroku run "psql \$DATABASE_URL -f migrations/0001_initial_schema.sql"

# Open app
heroku open
```

**Done!** ✅

---

### Docker Deployment
**⏱️ 15 minutes | 💰 VPS cost | 🔧 Medium difficulty**

```bash
# Clone and configure
git clone https://github.com/hlulanigoi/irgadgets.git
cd irgadgets
cp .env.example .env
nano .env  # Add your settings

# Required in .env:
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@db:5432/irgadgets
SESSION_SECRET=$(openssl rand -base64 32)
CORS_ORIGINS=https://yourdomain.com

# Start everything
docker-compose up -d

# Check status
docker-compose ps
docker-compose logs -f app

# Run migrations
docker-compose exec app sh -c "psql \$DATABASE_URL -f migrations/0001_initial_schema.sql"

# Verify
curl http://localhost:5000/health
```

**Done!** ✅

---

### DigitalOcean Deployment
**⏱️ 12 minutes | 💰 $12/mo | 😊 Easy**

1. **Push to GitHub** (if not already)
   ```bash
   git remote add origin https://github.com/yourusername/irgadgets.git
   git push -u origin main
   ```

2. **In DigitalOcean Console:**
   - Go to Apps → Create App
   - Connect GitHub → Select `irgadgets` repo
   - Build Command: `yarn install && yarn build`
   - Run Command: `yarn start`
   - Port: `5000`

3. **Add PostgreSQL Database:**
   - Click "Add Component" → Database → PostgreSQL
   - Select "Dev Database" plan

4. **Set Environment Variables:**
   ```
   NODE_ENV=production
   SESSION_SECRET=<generate: openssl rand -base64 32>
   CORS_ORIGINS=${APP_URL}
   ```

5. **Deploy & Migrate:**
   - Click "Create Resources"
   - After deploy, open Console tab
   - Run: `psql $DATABASE_URL -f migrations/0001_initial_schema.sql`

**Done!** ✅

---

## 🔧 Configuration

### Environment Variables

**Minimum Required:**
```bash
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://user:password@host:5432/database
SESSION_SECRET=<generate-with-openssl-rand>
```

**Optional:**
```bash
CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
SENTRY_DSN=<your-sentry-dsn>
```

**Generate SESSION_SECRET:**
```bash
openssl rand -base64 32
```

---

### Database Setup

**PostgreSQL (Production):**
```bash
# Create database
createdb irgadgets

# Run migrations
psql postgresql://user:pass@host:5432/irgadgets -f migrations/0001_initial_schema.sql

# Verify
psql postgresql://user:pass@host:5432/irgadgets -c "SELECT COUNT(*) FROM products;"
```

**SQLite (Development):**
SQLite is used automatically if no `DATABASE_URL` is set. Data is stored in `/tmp/database.db` (temporary).

---

### CORS Configuration

**Issue:** Frontend can't connect to API (CORS errors)

**Fix:** Set `CORS_ORIGINS` in `.env`:
```bash
# Single domain
CORS_ORIGINS=https://yourdomain.com

# Multiple domains (comma-separated)
CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com,https://app.yourdomain.com
```

Then restart the server.

---

## 🐛 Troubleshooting

### App Won't Start

**Check logs:**
```bash
# Docker
docker-compose logs app

# Heroku
heroku logs --tail

# Local
tail -f logs/error.log
```

**Common fixes:**
1. Missing `DATABASE_URL` → Add to .env
2. Wrong database credentials → Check connection string
3. Port already in use → Change PORT in .env
4. Missing dependencies → Run `yarn install`

### Database Connection Failed

**Test connection:**
```bash
psql $DATABASE_URL -c "SELECT 1"
```

**Common fixes:**
1. Wrong DATABASE_URL format
   - Correct: `postgresql://user:pass@host:5432/dbname`
2. Firewall blocking connection → Allow your server's IP
3. Database doesn't exist → Create it first

### 502 Bad Gateway

**Check if app is running:**
```bash
curl http://localhost:5000/health
```

**Common fixes:**
1. App not started → `docker-compose up -d` or restart service
2. Wrong port in reverse proxy config
3. App crashed → Check logs for errors

### Form Submission Fails

**Check rate limits:**
- General API: 100 requests per 15 min
- Forms: 5 submissions per 15 min

**Wait or increase limits in .env:**
```bash
RATE_LIMIT_MAX_REQUESTS=200
```

---

## 📊 Monitoring & Maintenance

### Health Checks

```bash
# Check if app is healthy
curl https://yourdomain.com/health

# Response should be:
{
  "status": "healthy",
  "timestamp": "2025-01-02T12:00:00.000Z",
  "uptime": 3600,
  "environment": "production"
}
```

### View Logs

```bash
# Docker
docker-compose logs -f app

# Heroku
heroku logs --tail

# Local files
tail -f logs/combined.log
tail -f logs/error.log
```

### Backups

**Automated daily backup script:**
```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump $DATABASE_URL | gzip > backup_$DATE.sql.gz
```

**Setup cron:**
```bash
crontab -e
# Add: Daily at 2 AM
0 2 * * * /path/to/backup-script.sh
```

### Performance

**Monitor:**
- Response times (should be < 500ms)
- Error rates (should be < 1%)
- Database query times
- Memory usage

**Optimize:**
- Enable caching
- Add database indexes
- Use CDN for static assets

---

## 🔐 Security Checklist

Before going live:

- [ ] `NODE_ENV=production` is set
- [ ] Strong `SESSION_SECRET` (32+ characters)
- [ ] `DATABASE_URL` uses strong password
- [ ] HTTPS enabled (SSL certificate)
- [ ] `CORS_ORIGINS` restricted to your domains only
- [ ] Rate limiting enabled (default: ✅)
- [ ] Security headers enabled (default: ✅)
- [ ] Error monitoring set up (Sentry)
- [ ] Automated backups configured
- [ ] Firewall configured (if VPS)

**Full checklist:** [PRODUCTION_CHECKLIST.md](./PRODUCTION_CHECKLIST.md)

---

## 📚 Complete Documentation

| Document | Purpose | When to Read |
|----------|---------|--------------|
| **[README.md](./README.md)** | Full project documentation | Learning about the project |
| **[QUICK_START.md](./QUICK_START.md)** | Deploy in 15 minutes | Ready to deploy now |
| **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** | API reference with examples | Integrating with API |
| **[DEPLOYMENT.md](./DEPLOYMENT.md)** | Detailed deployment guides | Advanced deployment |
| **[CONTRIBUTING.md](./CONTRIBUTING.md)** | Development guidelines | Contributing code |
| **[SECURITY.md](./SECURITY.md)** | Security policy | Security concerns |
| **[PRODUCTION_CHECKLIST.md](./PRODUCTION_CHECKLIST.md)** | Pre-launch checklist | Before going live |
| **[CHANGELOG.md](./CHANGELOG.md)** | Version history | Checking what's new |

---

## 💬 Getting Help

**Quick Help:**
- 🐛 Bug? → [GitHub Issues](https://github.com/hlulanigoi/irgadgets/issues)
- 💡 Question? → Check documentation above
- 🔒 Security? → security@irgadgets.com
- 💼 Support? → support@irgadgets.com

**Community:**
- Discussions: GitHub Discussions
- Twitter: [@irgadgets](https://twitter.com/irgadgets)

---

## ⚡ Quick Links

- [View Demo](https://irgadgets-demo.herokuapp.com) (coming soon)
- [GitHub Repository](https://github.com/hlulanigoi/irgadgets)
- [Report Issue](https://github.com/hlulanigoi/irgadgets/issues/new)
- [Request Feature](https://github.com/hlulanigoi/irgadgets/issues/new?labels=enhancement)

---

**🎉 Ready to deploy?** Choose your deployment method above and follow the guide!

**🤔 Still have questions?** Read the [Complete README](./README.md) for detailed information.
