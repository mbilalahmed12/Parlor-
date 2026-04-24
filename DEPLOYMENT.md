# 🚀 Deployment Guide

Deploy your parlor website to production!

## Option 1: Vercel + Heroku (Recommended for Beginners)

### Backend on Heroku

1. **Create Heroku Account**: https://www.heroku.com/

2. **Install Heroku CLI**:
   ```bash
   npm install -g heroku
   heroku login
   ```

3. **Create Heroku App**:
   ```bash
   cd backend
   heroku create your-parlor-api
   ```

4. **Add Environment Variables**:
   ```bash
   heroku config:set JWT_SECRET=your-super-secret-key
   heroku config:set MONGODB_URI=your-mongodb-uri
   ```

5. **Deploy**:
   ```bash
   git push heroku main
   heroku logs --tail
   ```

### Frontend on Vercel

1. **Create Vercel Account**: https://vercel.com/

2. **Connect GitHub Repository**:
   - Push your code to GitHub
   - Import project from GitHub at vercel.com

3. **Configure Environment Variables**:
   - In Vercel dashboard, go to Settings > Environment Variables
   - Add: `NEXT_PUBLIC_API_URL=https://your-parlor-api.herokuapp.com/api`

4. **Deploy**:
   - Automatic on every push to main branch

### Database on MongoDB Atlas

1. **Create Free MongoDB**: https://www.mongodb.com/cloud/atlas

2. **Create Cluster**:
   - Create free M0 tier cluster
   - Add IP address to whitelist (0.0.0.0/0 for any)
   - Create database user

3. **Get Connection String**:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/database-name
   ```

4. **Add to Heroku**:
   ```bash
   heroku config:set MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/parlor-website
   ```

---

## Option 2: Self-Hosted VPS (Advanced)

### Using AWS EC2, DigitalOcean, or Linode

1. **SSH into Server**:
   ```bash
   ssh ubuntu@your-server-ip
   ```

2. **Install Node.js**:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
   sudo apt-get install -y nodejs npm
   ```

3. **Install MongoDB**:
   ```bash
   sudo apt-get install -y mongodb
   sudo systemctl start mongodb
   ```

4. **Setup Backend**:
   ```bash
   git clone your-repo
   cd parlor-website/backend
   npm install
   npm start
   ```

5. **Setup Frontend**:
   ```bash
   cd ../frontend
   npm install
   npm run build
   npm start
   ```

6. **Use PM2 for Process Management**:
   ```bash
   npm install -g pm2
   pm2 start server.js --name "parlor-backend"
   pm2 startup
   pm2 save
   ```

7. **Setup Nginx Reverse Proxy**:
   ```bash
   sudo apt-get install -y nginx
   ```
   
   Edit `/etc/nginx/sites-available/default`:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
       }

       location /api {
           proxy_pass http://localhost:5000;
       }
   }
   ```

8. **Setup SSL with Let's Encrypt**:
   ```bash
   sudo apt-get install -y certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

---

## Domain Setup

1. **Buy Domain**: GoDaddy, Namecheap, etc.
2. **Point to Deployment**:
   - **Vercel**: Add custom domain in dashboard
   - **Heroku**: Add domain with `heroku domains:add your-domain.com`
   - **Self-hosted**: Update DNS A record to server IP

---

## Post-Deployment Checklist

- [ ] Backend running and accessible
- [ ] Frontend loads without errors
- [ ] Database connected and working
- [ ] Admin login works
- [ ] Services can be created/edited/deleted
- [ ] Bookings system works
- [ ] Hero video loads
- [ ] SSL certificate active
- [ ] Email notifications working (optional)
- [ ] Analytics setup (optional)

---

## Environment Variables Checklist

### Backend (.env)
```
MONGODB_URI=mongodb+srv://...
JWT_SECRET=very-secure-random-string
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=production
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
```

---

## Monitoring & Maintenance

### Vercel
- Auto-deploys on push to main
- Built-in analytics and monitoring
- Automatic SSL

### Heroku
```bash
# View logs
heroku logs --tail

# Check dyno status
heroku ps

# Restart app
heroku restart
```

### Self-Hosted
```bash
# Check PM2 processes
pm2 status

# View logs
pm2 logs

# Restart app
pm2 restart parlor-backend
```

---

## Troubleshooting Production

| Issue | Solution |
|-------|----------|
| 502 Bad Gateway | Check backend process is running |
| Database connection error | Verify MONGODB_URI and network access |
| Images/Videos not loading | Check CORS headers |
| Slow performance | Enable caching, use CDN |
| SSL certificate error | Renew certificate or reconfigure |

---

## Cost Estimates (Monthly)

| Service | Cost |
|---------|------|
| Vercel Frontend | FREE |
| Heroku Backend | $7-50 |
| MongoDB Atlas | FREE (512MB) |
| Domain | $10-15 |
| **Total** | **$17-65/month** |

---

## Next Steps

1. Push code to GitHub
2. Connect to Vercel for frontend
3. Deploy backend to Heroku
4. Configure MongoDB Atlas
5. Add custom domain
6. Test thoroughly in production
7. Setup backups
8. Monitor performance

**Congratulations! Your parlor website is now live!** 🎉
