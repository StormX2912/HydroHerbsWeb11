# VPS Deployment Guide (Supabase)

This guide will help you deploy HydroHerbs to your VPS with Supabase database.

## Prerequisites

- VPS with SSH access
- Node.js 22+ installed
- Nginx (for reverse proxy)
- PM2 (for process management)
- Domain name (optional but recommended)

## Step 1: Database Setup (Already Done!)

✅ Your Supabase database is already set up:
- URL: `https://uxtvgzsgyqnfbrbrzdlx.supabase.co`
- Tables created via SQL Editor in Supabase dashboard

**No database setup needed on VPS** - Supabase is cloud-hosted!

## Step 2: Upload Files to VPS

### Option A: Using Git (Recommended)

1. **Push your code to GitHub/GitLab** (if not already):
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **SSH into your VPS**:
   ```bash
   ssh your_username@your_vps_ip
   ```

3. **Clone your repository**:
   ```bash
   cd /var/www  # or your preferred directory
   git clone your_repository_url hydroherbs
   cd hydroherbs
   ```

### Option B: Using SFTP

1. Use FileZilla, WinSCP, or similar
2. Connect to your VPS via SFTP
3. Upload all project files to `/var/www/hydroherbs` (or your preferred directory)

## Step 3: Install Dependencies

```bash
# Make sure you're in the project directory
cd /var/www/hydroherbs

# Install Node.js dependencies
npm install

# Or if you prefer pnpm:
npm install -g pnpm
pnpm install
```

## Step 4: Configure Environment Variables

1. **Create `.env` file**:
   ```bash
   nano .env
   ```

2. **Add your Supabase credentials**:
   ```env
   SUPABASE_URL=https://uxtvgzsgyqnfbrbrzdlx.supabase.co
   SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV4dHZnenNneXFuZmJyYnJ6ZGx4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2MjExMDksImV4cCI6MjA3OTE5NzEwOX0.4rMPsjJ6hENpQLkHzwfH3HXLQW7ZgTCrURmG9QtkEoY

   # Server port (optional, defaults to 3000)
   PORT=3000
   ```

3. **Save and exit** (Ctrl+X, then Y, then Enter)

## Step 5: Build the Application

```bash
npm run build
```

This creates:
- `dist/spa/` - Frontend static files (React app)
- `dist/server/` - Backend server files (Express API)

## Step 6: Install PM2 (Process Manager)

```bash
npm install -g pm2
```

PM2 keeps your Node.js app running even if the server restarts.

## Step 7: Start the Server with PM2

```bash
# Start the server
pm2 start dist/server/node-build.mjs --name hydroherbs

# Save PM2 configuration (so it restarts on reboot)
pm2 save

# Set up PM2 to start on system boot
pm2 startup
# Follow the instructions it gives you
```

**Check if it's running:**
```bash
pm2 status
pm2 logs hydroherbs
```

You should see: `✅ Supabase connected successfully`

## Step 8: Configure Nginx (Reverse Proxy)

1. **Install Nginx** (if not already installed):
   ```bash
   sudo apt update
   sudo apt install nginx
   ```

2. **Create Nginx configuration**:
   ```bash
   sudo nano /etc/nginx/sites-available/hydroherbs
   ```

3. **Add this configuration**:
   ```nginx
   server {
       listen 80;
       server_name your_domain.com www.your_domain.com;

       # Serve static React files
       location / {
           root /var/www/hydroherbs/dist/spa;
           try_files $uri $uri/ /index.html;
           index index.html;
       }

       # Proxy API requests to Node.js server
       location /api {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```

   **Replace `your_domain.com` with your actual domain**, or use your VPS IP address.

4. **Enable the site**:
   ```bash
   sudo ln -s /etc/nginx/sites-available/hydroherbs /etc/nginx/sites-enabled/
   sudo nginx -t  # Test configuration
   sudo systemctl reload nginx
   ```

## Step 9: Configure SSL (HTTPS) - Optional but Recommended

Use Let's Encrypt for free SSL certificate:

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your_domain.com -d www.your_domain.com
```

This will automatically configure HTTPS and redirect HTTP to HTTPS.

## Step 10: Verify Installation

1. **Visit your site**: `http://your_domain.com` (or `https://` if SSL is set up)
2. **Check server logs**: `pm2 logs hydroherbs`
3. **Test the contact form**: Submit feedback and check Supabase dashboard
4. **Test newsletter**: Subscribe and verify in Supabase

## Useful Commands

### View Logs
```bash
pm2 logs hydroherbs
```

### Restart Server
```bash
pm2 restart hydroherbs
```

### Stop Server
```bash
pm2 stop hydroherbs
```

### Update Application
```bash
cd /var/www/hydroherbs
git pull                    # If using Git
npm install                 # Install new dependencies
npm run build              # Rebuild
pm2 restart hydroherbs      # Restart server
```

### Check Server Status
```bash
pm2 status
pm2 monit  # Real-time monitoring
```

## Troubleshooting

### Server Not Starting
```bash
# Check logs
pm2 logs hydroherbs

# Check if port is in use
sudo netstat -tulpn | grep 3000

# Check Node.js version
node --version  # Should be 22+
```

### Nginx 502 Bad Gateway
- Check if PM2 is running: `pm2 status`
- Check if port matches in Nginx config (should be 3000)
- Check server logs: `pm2 logs hydroherbs`

### Database Connection Issues
- Verify `.env` file has correct Supabase credentials
- Check Supabase dashboard to ensure project is active
- Test connection: `pm2 logs hydroherbs` should show "✅ Supabase connected successfully"

### Permission Issues
```bash
sudo chown -R $USER:$USER /var/www/hydroherbs
chmod -R 755 /var/www/hydroherbs
```

## Security Checklist

- [x] Supabase credentials in `.env` (not in Git)
- [ ] HTTPS/SSL enabled
- [ ] Firewall configured (UFW)
- [ ] Node.js and dependencies updated
- [ ] PM2 auto-restart configured
- [ ] Regular backups of Supabase data (via Supabase dashboard)

## Quick Start Summary

```bash
# 1. Upload files (Git or SFTP)
cd /var/www/hydroherbs

# 2. Install dependencies
npm install

# 3. Create .env file with Supabase credentials
nano .env

# 4. Build
npm run build

# 5. Start with PM2
pm2 start dist/server/node-build.mjs --name hydroherbs
pm2 save
pm2 startup

# 6. Configure Nginx (see Step 8)
# 7. Set up SSL (see Step 9)
```

---

**Need Help?** Check your VPS provider's documentation or contact their support.

