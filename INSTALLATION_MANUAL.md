# PARLOR WEBSITE - COMPLETE INSTALLATION & RUNNING GUIDE

## ✅ WHAT YOU HAVE
A complete, production-ready parlor website with:
- Beautiful animated homepage
- Admin dashboard for managing services & bookings
- Booking system
- Review management
- Responsive design

## 🎯 STEP-BY-STEP TO RUN THE WEBSITE

### STEP 1: Check if Node.js is installed
Open Command Prompt (cmd.exe) and type:
```
node --version
npm --version
```

If you see version numbers, Node.js is installed. Skip to STEP 3.
If you get "not recognized", proceed to STEP 2.

### STEP 2: Install Node.js (Only if needed)
1. Go to https://nodejs.org/
2. Download the LTS (Long Term Support) version
3. Run the installer
4. CHECK the box "Add to PATH" during installation
5. Click "Install"
6. Restart your computer
7. Open a NEW Command Prompt and verify: `node --version`

### STEP 3: Navigate to project folder
Open Command Prompt and type:
```
cd C:\Users\Muhammad BIlal Ahmed\parlor-website
```

### STEP 4: Install backend dependencies
```
cd backend
npm install
```
Wait 5-10 minutes for this to complete.

### STEP 5: Create backend .env file
In the backend folder, create a file named `.env` with this content:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/parlor-website
JWT_SECRET=your-super-secret-key-12345
NODE_ENV=development
```

### STEP 6: Install frontend dependencies
```
cd ..\frontend
npm install
```
Wait 5-10 minutes for this to complete.

### STEP 7: Create frontend .env.local file
In the frontend folder, create a file named `.env.local` with:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### STEP 8: Start the servers (Two Command Prompts needed)

**TERMINAL 1: Start Backend**
```
cd C:\Users\Muhammad BIlal Ahmed\parlor-website\backend
npm run dev
```
Wait until you see: "Server running on port 5000"

**TERMINAL 2: Start Frontend**
```
cd C:\Users\Muhammad BIlal Ahmed\parlor-website\frontend
npm run dev
```
Wait until you see: "ready - started server on 0.0.0.0:3000"

### STEP 9: Open website
Visit: http://localhost:3000

### STEP 10: Create admin account
1. Click "Register" or go to http://localhost:3000/register
2. Fill in:
   - Name: Your Name
   - Email: your@email.com
   - Password: Something secure
3. Click "Create Account"
4. You'll be logged in to admin dashboard

### STEP 11: Customize your website
- Add services
- Upload video background
- Add contact information
- Add social media links

## 🎨 CUSTOMIZING THE WEBSITE

### Change Hero Video
1. Go to Admin Dashboard > Settings
2. Paste a video URL (must be .mp4)
3. Save

Free video sources:
- Pexels: https://www.pexels.com/videos/
- Pixabay: https://pixabay.com/videos/
- Unsplash: https://unsplash.com/videos

### Add Services
1. Go to Admin Dashboard > Services
2. Click "Add Service"
3. Fill in:
   - Category (Hair, Beauty, Wellness, etc.)
   - Service Name
   - Description
   - Price
   - Duration
4. Click "Save"

### Manage Bookings
1. Go to Admin Dashboard > Bookings
2. View all customer bookings
3. Change status (Pending, Confirmed, Completed, Cancelled)

### Approve Reviews
1. Go to Admin Dashboard > Reviews
2. See pending reviews
3. Click "Approve" or "Reject"
4. Approved reviews show on homepage

## 🚨 TROUBLESHOOTING

### "npm not found"
- Node.js not installed or not in PATH
- Solution: Reinstall Node.js and restart Command Prompt

### "Port 3000 already in use"
- Another app is using port 3000
- Solution: Change port in frontend or close other apps
- Alternative: Use `npm run dev -- -p 3001`

### "Port 5000 already in use"
- Another app using port 5000
- Solution: Change PORT in backend .env file

### "Cannot find module"
- Dependencies not installed correctly
- Solution: Delete node_modules folder and run `npm install` again

### Booking not sending notifications
- Email service not configured
- This is optional - system works without email
- For email setup, contact developer

### Video not loading
- URL is incorrect
- Video format not supported (.mp4 required)
- Solution: Use URLs from Pexels/Pixabay

## 📱 MOBILE FRIENDLY
The website works perfectly on phones too! Share http://localhost:3000 with customers on their phones.

## 🔒 SECURITY NOTES
- Change JWT_SECRET in backend .env to something unique
- Never share your .env file
- Use strong password for admin account
- When deploying, use production database (MongoDB Atlas)

## 🌐 DEPLOYING TO THE INTERNET
See DEPLOYMENT.md file for complete guide to:
- Deploy on Vercel (Frontend)
- Deploy on Heroku (Backend)
- Set up MongoDB Atlas

## 📞 QUICK COMMAND REFERENCE

Backend operations:
```
npm run dev       # Start development server
npm run build     # Build for production
npm start         # Start production server
```

Frontend operations:
```
npm run dev       # Start development server
npm run build     # Build for production
npm start         # Start production server
```

## 💾 DATABASE

The website uses MongoDB. For quick testing without setup:
- Local MongoDB: Install from mongodb.com
- Cloud MongoDB: Create account at mongodb.com/cloud/atlas (free tier available)

## 🎯 NEXT STEPS

1. ✅ Install Node.js
2. ✅ Run installation steps above
3. ✅ Open both servers
4. ✅ Visit http://localhost:3000
5. ✅ Register as admin
6. ✅ Add your services
7. ✅ Share with customers!

## ✨ YOU'RE ALL SET!

Your professional parlor website is ready to go. Make it yours and start booking appointments!

Questions? Check the other documentation files in the project folder.
