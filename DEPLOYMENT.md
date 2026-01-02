# Production Deployment Guide

This guide covers deploying IrGadgets to production environments.

## Table of Contents

- [Pre-Deployment Checklist](#pre-deployment-checklist)
- [Environment Setup](#environment-setup)
- [Docker Deployment](#docker-deployment)
- [Cloud Platform Deployment](#cloud-platform-deployment)
- [Database Setup](#database-setup)
- [SSL/TLS Configuration](#ssltls-configuration)
- [Monitoring Setup](#monitoring-setup)
- [Backup Strategy](#backup-strategy)
- [Rollback Procedures](#rollback-procedures)

## Pre-Deployment Checklist

### Security

- [ ] All environment variables are set securely
- [ ] `SESSION_SECRET` is strong and unique
- [ ] Database password is strong
- [ ] HTTPS is enabled
- [ ] Security headers are configured
- [ ] Rate limiting is enabled
- [ ] CORS origins are properly configured

### Performance

- [ ] Database indexes are created
- [ ] Compression is enabled
- [ ] Static assets are optimized
- [ ] CDN is configured (if applicable)

### Monitoring

- [ ] Error monitoring is set up (Sentry, etc.)
- [ ] Logging is configured
- [ ] Health check endpoints are working
- [ ] Uptime monitoring is configured

### Testing

- [ ] All tests pass
- [ ] Load testing is performed
- [ ] Security audit is completed

## Environment Setup

### Production Environment Variables

Create a `.env.production` file:

```bash
# Application
NODE_ENV=production
PORT=5000

# Database (use your production database URL)
DATABASE_URL=postgresql://user:password@prod-db-host:5432/irgadgets

# Session (generate a strong secret)
SESSION_SECRET=$(openssl rand -base64 32)

# CORS (your production domains)
CORS_ORIGINS=https://irgadgets.com,https://www.irgadgets.com

# Sentry (optional)
SENTRY_DSN=https://your-sentry-dsn

# Email (if configured)
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
SMTP_FROM=noreply@irgadgets.com
```

## Docker Deployment

### Using Docker Compose (Recommended for VPS)

1. **Prepare the server:**

```bash
# Install Docker and Docker Compose
sudo apt update
sudo apt install docker.io docker-compose

# Clone the repository
git clone https://github.com/hlulanigoi/irgadgets.git
cd irgadgets
```

2. **Configure environment:**

```bash
cp .env.example .env
nano .env  # Edit with production values
```

3. **Start services:**

```bash
docker-compose up -d

# View logs
docker-compose logs -f

# Check status
docker-compose ps
```

4. **Run database migrations:**

```bash
docker-compose exec app sh
# Inside container:
psql $DATABASE_URL -f migrations/0001_initial_schema.sql
```

### Manual Docker Build

```bash
# Build image
docker build -t irgadgets:latest .

# Run container
docker run -d \
  --name irgadgets-app \
  -p 5000:5000 \
  --env-file .env.production \
  irgadgets:latest
```

## Cloud Platform Deployment

### AWS (Elastic Beanstalk)

1. **Install EB CLI:**

```bash
pip install awsebcli
```

2. **Initialize:**

```bash
eb init -p docker irgadgets
```

3. **Create environment:**

```bash
eb create irgadgets-prod
```

4. **Set environment variables:**

```bash
eb setenv NODE_ENV=production \
  DATABASE_URL="postgresql://..." \
  SESSION_SECRET="..."
```

5. **Deploy:**

```bash
eb deploy
```

### Heroku

1. **Create app:**

```bash
heroku create irgadgets
```

2. **Add PostgreSQL:**

```bash
heroku addons:create heroku-postgresql:standard-0
```

3. **Set environment variables:**

```bash
heroku config:set NODE_ENV=production
heroku config:set SESSION_SECRET="$(openssl rand -base64 32)"
```

4. **Deploy:**

```bash
git push heroku main
```

5. **Run migrations:**

```bash
heroku run "psql \$DATABASE_URL -f migrations/0001_initial_schema.sql"
```

### DigitalOcean App Platform

1. **Connect repository** in DigitalOcean console
2. **Configure build:**
   - Build command: `yarn build`
   - Run command: `yarn start`
3. **Add environment variables** in console
4. **Add PostgreSQL database** as component
5. **Deploy**

### Render

1. **Create new Web Service**
2. **Connect repository**
3. **Configure:**
   - Build: `yarn install && yarn build`
   - Start: `yarn start`
4. **Add environment variables**
5. **Add PostgreSQL database**
6. **Deploy**

## Database Setup

### PostgreSQL Production Setup

1. **Create production database:**

```bash
psql -U postgres
CREATE DATABASE irgadgets;
CREATE USER irgadgets_user WITH ENCRYPTED PASSWORD 'strong-password';
GRANT ALL PRIVILEGES ON DATABASE irgadgets TO irgadgets_user;
```

2. **Run migrations:**

```bash
psql -U irgadgets_user -d irgadgets -f migrations/0001_initial_schema.sql
```

3. **Verify:**

```bash
psql -U irgadgets_user -d irgadgets -c "\dt"
```

### Managed Database Options

- **AWS RDS**: Managed PostgreSQL with automatic backups
- **DigitalOcean Managed Databases**: Easy setup with daily backups
- **Heroku Postgres**: Simple PostgreSQL addon
- **Supabase**: PostgreSQL with real-time features

## SSL/TLS Configuration

### Using Nginx as Reverse Proxy

1. **Install Nginx:**

```bash
sudo apt install nginx certbot python3-certbot-nginx
```

2. **Configure Nginx:**

```nginx
# /etc/nginx/sites-available/irgadgets
server {
    listen 80;
    server_name irgadgets.com www.irgadgets.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

3. **Enable site:**

```bash
sudo ln -s /etc/nginx/sites-available/irgadgets /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

4. **Get SSL certificate:**

```bash
sudo certbot --nginx -d irgadgets.com -d www.irgadgets.com
```

## Monitoring Setup

### Application Monitoring

1. **Sentry for Error Tracking:**

Add to `.env`:
```bash
SENTRY_DSN=https://your-sentry-dsn
```

2. **PM2 for Process Management:**

```bash
npm install -g pm2

# Start app
pm2 start dist/index.cjs --name irgadgets

# Setup startup script
pm2 startup
pm2 save
```

3. **Uptime Monitoring:**

- Use UptimeRobot, Pingdom, or StatusCake
- Monitor: `https://irgadgets.com/health`
- Set up alerts for downtime

## Backup Strategy

### Automated Database Backups

1. **Daily backup script:**

```bash
#!/bin/bash
# /usr/local/bin/backup-db.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/irgadgets"
DATABASE_URL="postgresql://user:pass@localhost:5432/irgadgets"

mkdir -p $BACKUP_DIR
pg_dump $DATABASE_URL | gzip > $BACKUP_DIR/backup_$DATE.sql.gz

# Keep only last 30 days
find $BACKUP_DIR -name "backup_*.sql.gz" -mtime +30 -delete
```

2. **Setup cron job:**

```bash
crontab -e
# Add: Run daily at 2 AM
0 2 * * * /usr/local/bin/backup-db.sh
```

### Application Backups

- Store backups in cloud storage (S3, DigitalOcean Spaces)
- Keep multiple versions
- Test restoration regularly

## Rollback Procedures

### Quick Rollback

1. **Docker:**

```bash
# Tag previous working version
docker tag irgadgets:latest irgadgets:backup

# Rollback
docker-compose down
docker tag irgadgets:backup irgadgets:latest
docker-compose up -d
```

2. **Git-based:**

```bash
# Revert to previous commit
git log --oneline
git revert <commit-hash>
git push

# Redeploy
```

3. **Database:**

```bash
# Restore from backup
gunzip -c backup_20250101_020000.sql.gz | psql $DATABASE_URL
```

## Post-Deployment

### Verification Steps

1. **Health check:**
```bash
curl https://irgadgets.com/health
```

2. **Test critical flows:**
- View products
- Submit inquiry form
- Check API responses

3. **Monitor logs:**
```bash
docker-compose logs -f
# or
pm2 logs irgadgets
```

4. **Check error monitoring** (Sentry dashboard)

### Performance Monitoring

- Monitor response times
- Check database query performance
- Watch for memory leaks
- Track error rates

---

## Support

For deployment issues:
- Check logs first
- Review this guide
- Open an issue on GitHub
- Contact: support@irgadgets.com
