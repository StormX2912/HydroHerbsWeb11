# Hostinger VPS Deployment Guide

This guide will help you deploy HydroHerbs to your Hostinger VPS with MySQL database and phpMyAdmin.

## Prerequisites

- Hostinger VPS with SSH access
- Node.js 18+ installed
- MySQL/MariaDB installed
- phpMyAdmin installed (usually comes with Hostinger VPS)

## Step 1: Database Setup

### 1.1 Access phpMyAdmin

1. Log into your Hostinger control panel
2. Navigate to **phpMyAdmin** (usually in the "Databases" section)
3. Click to open phpMyAdmin

### 1.2 Create Database and Tables

1. In phpMyAdmin, click on the **SQL** tab
2. Copy and paste the contents of `server/db/schema.sql`
3. Click **Go** to execute the SQL
4. This will create:
   - Database: `hydroherbs`
   - Table: `contact_submissions`
   - Table: `newsletter_subscriptions`

### 1.3 Create Database User (Recommended)

For security, create a dedicated database user:

```sql
-- In phpMyAdmin SQL tab, run:
CREATE USER 'hydroherbs_user'@'localhost' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON hydroherbs.* TO 'hydroherbs_user'@'localhost';
FLUSH PRIVILEGES;
```

## Step 2: Application Setup

### 2.1 Upload Files to VPS

1. Connect to your VPS via SSH:
   ```bash
   ssh your_username@your_vps_ip
   ```

2. Navigate to your web directory (usually `/var/www/html` or `/home/username/public_html`):
   ```bash
   cd /var/www/html
   ```

3. Upload your project files (use SFTP, Git, or `scp`):
   ```bash
   # If using Git:
   git clone your_repository_url .
   ```

### 2.2 Install Dependencies

```bash
# Install pnpm if not already installed
npm install -g pnpm

# Install project dependencies
pnpm install
```

### 2.3 Configure Environment Variables

1. Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   nano .env
   ```

2. Update with your database credentials:
   ```env
   DB_HOST=localhost
   DB_USER=hydroherbs_user
   DB_PASSWORD=your_secure_password
   DB_NAME=hydroherbs
   ```

3. Save and exit (Ctrl+X, then Y, then Enter)

### 2.4 Build the Application

```bash
pnpm build
```

This creates:
- `dist/spa/` - Frontend static files
- `dist/server/` - Backend server files

## Step 3: Server Configuration

### 3.1 Using PM2 (Recommended for Node.js)

Install PM2 for process management:

```bash
npm install -g pm2
```

Start the server:

```bash
cd /var/www/html
pm2 start dist/server/node-build.mjs --name hydroherbs
pm2 save
pm2 startup  # Follow instructions to enable auto-start on reboot
```

### 3.2 Using Nginx as Reverse Proxy

1. Install Nginx (if not already installed):
   ```bash
   sudo apt update
   sudo apt install nginx
   ```

2. Create Nginx configuration:
   ```bash
   sudo nano /etc/nginx/sites-available/hydroherbs
   ```

3. Add this configuration:
   ```nginx
   server {
       listen 80;
       server_name your_domain.com;

       # Serve static files
       location / {
           root /var/www/html/dist/spa;
           try_files $uri $uri/ /index.html;
       }

       # Proxy API requests to Node.js
       location /api {
           proxy_pass http://localhost:8080;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
       }
   }
   ```

4. Enable the site:
   ```bash
   sudo ln -s /etc/nginx/sites-available/hydroherbs /etc/nginx/sites-enabled/
   sudo nginx -t  # Test configuration
   sudo systemctl reload nginx
   ```

### 3.3 Configure SSL (HTTPS)

Use Let's Encrypt for free SSL:

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your_domain.com
```

## Step 4: Verify Installation

1. **Test Database Connection:**
   - Visit your site: `https://your_domain.com`
   - Check server logs: `pm2 logs hydroherbs`
   - You should see: `✅ Database connected successfully`

2. **Test Contact Form:**
   - Go to `/contact` page
   - Submit the form
   - Check phpMyAdmin → `hydroherbs` → `contact_submissions` table

3. **Test Newsletter:**
   - Scroll to footer
   - Enter email and subscribe
   - Check phpMyAdmin → `hydroherbs` → `newsletter_subscriptions` table

## Step 5: Monitoring and Maintenance

### View Logs
```bash
pm2 logs hydroherbs
```

### Restart Server
```bash
pm2 restart hydroherbs
```

### Update Application
```bash
git pull
pnpm install
pnpm build
pm2 restart hydroherbs
```

## Troubleshooting

### Database Connection Issues

1. **Check credentials in `.env`:**
   ```bash
   cat .env
   ```

2. **Test MySQL connection:**
   ```bash
   mysql -u hydroherbs_user -p hydroherbs
   ```

3. **Check MySQL is running:**
   ```bash
   sudo systemctl status mysql
   ```

### Port Already in Use

If port 8080 is in use, change it in `server/index.ts` or use environment variable:
```env
PORT=3000
```

### Permission Issues

Ensure proper file permissions:
```bash
sudo chown -R www-data:www-data /var/www/html
sudo chmod -R 755 /var/www/html
```

## Security Checklist

- [ ] Use strong database passwords
- [ ] Keep `.env` file secure (not in Git)
- [ ] Enable HTTPS/SSL
- [ ] Set up firewall rules
- [ ] Keep Node.js and dependencies updated
- [ ] Regularly backup database via phpMyAdmin

## Backup Database

In phpMyAdmin:
1. Select `hydroherbs` database
2. Click **Export** tab
3. Choose **Quick** or **Custom** method
4. Click **Go** to download SQL file

Or via command line:
```bash
mysqldump -u hydroherbs_user -p hydroherbs > backup_$(date +%Y%m%d).sql
```

---

**Need Help?** Check Hostinger's documentation or contact their support.

