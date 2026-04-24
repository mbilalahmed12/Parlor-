# Elite Parlor Website - Complete Setup Guide

A premium, fully-featured parlor booking website with admin dashboard for complete control. Features animated UI, dynamic content management, and approval workflows.

## 🚀 Features

✨ **Frontend**
- Beautiful animated homepage with video background (changeable by admin)
- Dynamic services section (admin can add/edit/delete)
- Online booking system
- Review/testimonial section with approval workflow
- Fully responsive mobile-friendly design
- Smooth Framer Motion animations & UI/UX

✨ **Admin Dashboard**
- Complete service management (CRUD)
- Booking management with status tracking
- Review approval system
- Website settings control (video, title, contact info, working hours)
- Social media links management
- Working hours scheduling

✨ **Backend**
- Node.js + Express API
- MongoDB database
- JWT authentication
- Full RESTful API
- Email notifications (extensible)

## 📋 Prerequisites

- Node.js v16+
- MongoDB (local or cloud like MongoDB Atlas)
- Git
- A code editor

## 🛠️ Installation & Setup

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file (copy from .env.example)
cp .env.example .env

# Edit .env with your values
# MONGODB_URI=mongodb://localhost:27017/parlor-website
# JWT_SECRET=your-secret-key-here
# PORT=5000
```

**Start MongoDB (if running locally):**
```bash
mongod
```

**Start Backend Server:**
```bash
npm run dev
```
Backend will run on `http://localhost:5000`

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Create .env.local file
echo "NEXT_PUBLIC_API_URL=http://localhost:5000/api" > .env.local

# Start development server
npm run dev
```

Frontend will run on `http://localhost:3000`

## 📝 First-Time Setup

### Create Admin Account

1. Go to `http://localhost:3000/register`
2. Fill in your details:
   - Name: Your name
   - Email: your@email.com
   - Password: secure password
3. Click "Create Account"
4. You'll be redirected to the admin dashboard

### Add Your First Service

1. Log in to admin dashboard (`http://localhost:3000/admin`)
2. Click "Services" in sidebar
3. Click "Add Service" button
4. Fill in:
   - Service name (e.g., "Haircut")
   - Description
   - Price
   - Duration (in minutes)
   - Category
   - Mark as featured (optional)
5. Click "Create"

### Customize Website Settings

1. Go to Admin > Settings
2. Update:
   - **Parlor Name & Description**
   - **Hero Video URL** - paste direct link to MP4 video
   - **Hero Title & Subtitle**
   - **Contact Information**
   - **Social Media Links**
   - **Working Hours**
3. Click "Save All Changes"

## 🎥 Setting Hero Video

The homepage features a video background that's easily changeable:

### Option 1: Use Free Video Sites
- **Pexels Videos**: https://www.pexels.com/videos/
- **Unsplash**: https://unsplash.com/napi/videos/
- **Pixabay**: https://pixabay.com/videos/

Find a beauty/salon video and copy the direct download link (must end in .mp4)

### Option 2: Upload Your Own
1. Upload video to cloud storage (Google Drive, Dropbox, etc.)
2. Get shareable direct link
3. Paste in Admin > Settings > Hero Video URL

### Option 3: Test Video Link
```
https://videos.pexels.com/video-files/5682545/5682545-sd_640_360_25fps.mp4
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Create admin account
- `POST /api/auth/login` - Admin login

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get service detail
- `POST /api/services` - Create service (admin only)
- `PUT /api/services/:id` - Update service (admin only)
- `DELETE /api/services/:id` - Delete service (admin only)

### Bookings
- `POST /api/bookings` - Submit booking (public)
- `GET /api/bookings` - Get all bookings (admin only)
- `PUT /api/bookings/:id` - Update booking status (admin only)
- `DELETE /api/bookings/:id` - Delete booking (admin only)

### Reviews
- `POST /api/reviews` - Submit review (public)
- `GET /api/reviews` - Get approved reviews (public)
- `GET /api/reviews/admin/all` - Get all reviews (admin only)
- `PUT /api/reviews/:id/approve` - Approve review (admin only)
- `DELETE /api/reviews/:id` - Delete review (admin only)

### Settings
- `GET /api/settings` - Get website settings (public)
- `PUT /api/settings` - Update settings (admin only)

## 🎨 Customization

### Colors
Edit `frontend/tailwind.config.js`:
```javascript
colors: {
  primary: '#8B5CF6',    // Purple
  secondary: '#EC4899',  // Pink
  accent: '#F59E0B',     // Amber
}
```

### Services Categories
Edit `backend/models/Service.js`:
```javascript
category: {
  enum: ['hair', 'skin', 'nails', 'makeup', 'massage', 'other'],
}
```

### Working Hours
Set in Admin > Settings, applied globally to website

## 🔐 Security Notes

- Change JWT_SECRET in `.env` to a strong random string
- Enable HTTPS in production
- Use environment variables for sensitive data
- Implement rate limiting for APIs
- Validate all user inputs
- Use CORS properly in production

## 📦 Production Deployment

### Backend (Heroku Example)
```bash
cd backend
heroku create your-parlor-api
git push heroku main
```

### Frontend (Vercel Example)
```bash
cd frontend
npm install -g vercel
vercel
```

### Database (MongoDB Atlas)
1. Create free cluster at https://www.mongodb.com/cloud/atlas
2. Get connection string
3. Add to `MONGODB_URI` in backend `.env`

## 🐛 Troubleshooting

### "Cannot find module"
```bash
npm install
```

### MongoDB Connection Error
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env`
- Verify MongoDB is accessible

### Video Not Playing
- Check URL is direct link to .mp4 file
- Test URL in browser
- Ensure CORS is enabled if from external source

### Admin Dashboard Not Loading
- Check token in localStorage
- Try logging out and logging back in
- Check browser console for errors

## 📞 Contact & Support

For questions or issues, check:
- Backend logs: `npm run dev` output
- Browser console (F12 > Console)
- Network tab to see API responses

## 📄 License

This project is for your parlor's use. Modify as needed!

---

**Ready to launch?** Start your backend and frontend servers and visit `http://localhost:3000`! 🎉
