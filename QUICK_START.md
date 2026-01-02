# Quick Start - Deploy to Production in 15 Minutes

This guide will get your application running in production quickly.

## Prerequisites

- [ ] PostgreSQL database (can use managed service like Heroku Postgres, AWS RDS, etc.)
- [ ] Server or hosting platform
- [ ] Domain name (optional but recommended)

---

## Option 1: Docker Deployment (Recommended - 15 min)

### Step 1: Clone and Configure (2 min)

```bash
git clone https://github.com/hlulanigoi/irgadgets.git
cd irgadgets
cp .env.example .env
```

### Step 2: Edit .env File (3 min)

```bash
nano .env
```

**Minimum required:**
```bash
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://user:password@host:5432/database
SESSION_SECRET=$(openssl rand -base64 32)
CORS_ORIGINS=https://yourdomain.com
```

### Step 3: Start with Docker Compose (5 min)

```bash
# This starts both PostgreSQL and the app
docker-compose up -d

# Check logs
docker-compose logs -f app

# Wait for "Server running on port 5000"
```

### Step 4: Initialize Database (2 min)

```bash
# Run migration
docker-compose exec app sh -c "psql \$DATABASE_URL -f migrations/0001_initial_schema.sql"

# Verify
curl http://localhost:5000/health
```

### Step 5: Verify Everything Works (3 min)

```bash
# Check health
curl http://localhost:5000/health

# Test API
curl http://localhost:5000/api/products

# Check the app in browser
open http://localhost:5000
```

**Done! Your app is running.** ✅

---

## Option 2: Heroku Deployment (10 min)

### Step 1: Install Heroku CLI & Login (1 min)

```bash
# If not installed: brew install heroku/brew/heroku
heroku login
```

### Step 2: Create App & Add PostgreSQL (3 min)

```bash
cd irgadgets
heroku create your-app-name
heroku addons:create heroku-postgresql:essential-0
```

### Step 3: Set Environment Variables (2 min)

```bash
heroku config:set NODE_ENV=production
heroku config:set SESSION_SECRET=$(openssl rand -base64 32)
heroku config:set CORS_ORIGINS=https://your-app-name.herokuapp.com
```

### Step 4: Deploy (3 min)

```bash
git push heroku main

# Wait for build to complete
```

### Step 5: Run Database Migration (1 min)

```bash
heroku run "psql \$DATABASE_URL -f migrations/0001_initial_schema.sql"
```

### Step 6: Verify (1 min)

```bash
heroku open
# App should load in browser

heroku logs --tail
# Check for any errors
```

**Done! Live on Heroku.** ✅

---

## Option 3: DigitalOcean App Platform (12 min)

### Step 1: Push to GitHub (2 min)

```bash
git remote add origin https://github.com/yourusername/irgadgets.git
git push -u origin main
```

### Step 2: Create App in DigitalOcean Console (5 min)

1. Go to https://cloud.digitalocean.com/apps
2. Click "Create App"
3. Connect your GitHub repository
4. Select the `irgadgets` repository and `main` branch

### Step 3: Configure Build (2 min)

In the DigitalOcean console:

- **Build Command**: `yarn install && yarn build`
- **Run Command**: `yarn start`
- **HTTP Port**: `5000`

### Step 4: Add Database (2 min)

1. Click "Add Component" → "Database"
2. Select "PostgreSQL"
3. Choose "Dev Database" or "Basic" plan
4. Database will be automatically linked

### Step 5: Add Environment Variables (1 min)

In the console, add:
```
NODE_ENV=production
SESSION_SECRET=<generate with: openssl rand -base64 32>
CORS_ORIGINS=${APP_URL}
```

**DATABASE_URL** is automatically set by DigitalOcean.

### Step 6: Deploy & Migrate

1. Click "Create Resources" - deployment starts automatically
2. Once deployed, open Console tab
3. Run: `psql $DATABASE_URL -f migrations/0001_initial_schema.sql`

**Done! Live on DigitalOcean.** ✅

---

## Option 4: VPS (AWS EC2, DigitalOcean Droplet, etc.) (20 min)

### Step 1: Server Setup (5 min)

```bash
# SSH into your server
ssh user@your-server-ip

# Install Node.js, Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### Step 2: Clone & Configure (3 min)

```bash
git clone https://github.com/hlulanigoi/irgadgets.git
cd irgadgets
cp .env.example .env
nano .env  # Configure as shown in Option 1
```

### Step 3: Start Application (2 min)

```bash
docker-compose up -d
```

### Step 4: Setup Nginx (5 min)

```bash
sudo apt install nginx certbot python3-certbot-nginx

# Create Nginx config
sudo nano /etc/nginx/sites-available/irgadgets
```

Add:
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/irgadgets /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 5: Get SSL Certificate (2 min)

```bash
sudo certbot --nginx -d yourdomain.com
```

### Step 6: Verify (1 min)

```bash
curl https://yourdomain.com/health
```

**Done! Live on your VPS.** ✅

---

## Post-Deployment Checklist

After deployment, verify these items:

### Immediate Checks
- [ ] Health endpoint returns 200: `curl https://yourdomain.com/health`
- [ ] Products API works: `curl https://yourdomain.com/api/products`
- [ ] Frontend loads in browser
- [ ] Can submit inquiry form
- [ ] No errors in logs

### Within 24 Hours
- [ ] Set up uptime monitoring (UptimeRobot, Pingdom)
- [ ] Configure error monitoring (Sentry)
- [ ] Set up automated database backups
- [ ] Test form submission end-to-end
- [ ] Verify email notifications (if configured)

### Within 1 Week
- [ ] Monitor error rates
- [ ] Check performance metrics
- [ ] Review logs for issues
- [ ] Test on multiple devices/browsers
- [ ] Get feedback from test users

---

## Troubleshooting

### App Won't Start

```bash
# Check logs
docker-compose logs app
# or
heroku logs --tail
```

**Common issues:**
- Missing DATABASE_URL → Set in .env
- Wrong DATABASE_URL format → Check connection string
- Port already in use → Change PORT in .env

### Database Connection Failed

```bash
# Test database connection
psql $DATABASE_URL -c "SELECT 1"
```

**Common issues:**
- Wrong credentials → Check DATABASE_URL
- Firewall blocking → Allow connections from your server IP
- Database not created → Create database first

### 502 Bad Gateway (Nginx)

```bash
# Check if app is running
curl localhost:5000/health

# Check Nginx logs
sudo tail -f /var/log/nginx/error.log
```

**Common issues:**
- App not running → `docker-compose up -d`
- Wrong port in Nginx config → Should be 5000
- Firewall → Allow port 5000 internally

### CORS Errors

**Issue:** Frontend can't connect to API

**Fix:** Add your domain to CORS_ORIGINS
```bash
heroku config:set CORS_ORIGINS=https://yourdomain.com
# or edit .env and restart
```

---

## Getting Help

If you encounter issues:

1. **Check logs first** - Most issues are visible in logs
2. **Review documentation** - README.md and DEPLOYMENT.md
3. **Search existing issues** - GitHub issues
4. **Create new issue** - With logs and error messages
5. **Contact support** - support@irgadgets.com

---

## Next Steps

Once deployed successfully:

1. ✅ Set up monitoring (see DEPLOYMENT.md)
2. ✅ Configure automated backups
3. ✅ Add your custom branding
4. ✅ Configure email notifications
5. ✅ Set up analytics
6. ✅ Add SSL certificate (if not done)
7. ✅ Test thoroughly
8. ✅ Announce your launch! 🎉

---

## Useful Commands

```bash
# View logs
docker-compose logs -f app           # Docker
heroku logs --tail                   # Heroku

# Restart app
docker-compose restart app           # Docker  
heroku restart                       # Heroku

# Check status
docker-compose ps                    # Docker
heroku ps                           # Heroku

# Run commands
docker-compose exec app sh          # Docker
heroku run bash                     # Heroku

# Scale (Heroku)
heroku ps:scale web=2

# Database backup
docker-compose exec db pg_dump ...  # Docker
heroku pg:backups:capture          # Heroku
```

---

**Need faster deployment?** Consider using Heroku Button or DigitalOcean 1-Click App (coming soon).

**Questions?** Check the comprehensive [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed platform-specific guides.
