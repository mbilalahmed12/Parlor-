# 🎯 PARLOR WEBSITE - QUICK SETUP GUIDE

Your website is **100% READY**. Follow these simple steps:

## ⚡ FASTEST START (Copy & Paste)

### Step 1: Download Node.js (Skip if you have it)
- Go to: https://nodejs.org/ (Download LTS)
- Run installer
- **CHECK** "Add to PATH"
- Restart computer

### Step 2: Run Installation
1. **Right-click** on `run-website.bat` in this folder
2. **Select** "Run as Administrator"
3. **Wait** 10-15 minutes (it's installing everything)
4. Website opens automatically at http://localhost:3000

**THAT'S IT!** ✨

---

## 📱 YOUR WEBSITE HAS

✅ **Beautiful Homepage**
- Video background (changes by admin)
- Animations on scroll
- Book Now button
- View Services button

✅ **Services Section**
- Main categories (Hair, Beauty, Wellness, Skincare)
- Sub-services with descriptions
- Beautiful hover effects

✅ **Online Booking**
- Name, email, phone
- Service selection
- Date & time picker
- Message field
- Auto-sends data to admin

✅ **Reviews Section**
- Star ratings
- Approved reviews only
- Admin can approve/reject

✅ **Admin Dashboard** (After you login)
- 📊 Dashboard overview
- 💇 Add/edit/delete services
- 📅 Manage bookings (Pending/Confirmed/Done/Cancelled)
- ⭐ Approve/reject reviews before showing
- ⚙️ Settings (Change title, video, hours, contact info)

---

## 🔐 FIRST TIME LOGIN

After opening http://localhost:3000:

1. **Top right** → Click "Register"
2. Fill in:
   - **Name:** Your Name
   - **Email:** your@email.com
   - **Password:** AnyPasswordYouWant
3. **Click** "Create Account"
4. You're logged in! ✅

---

## 🛠️ ADMIN DASHBOARD - WHAT YOU CAN DO

### 1️⃣ Add Services
Go to: **Admin** → **Services** → **Add Service**

Fill in:
- **Category:** Hair / Beauty / Wellness / Skincare
- **Name:** e.g., "Keratin Treatment"
- **Description:** What customers see
- **Price:** e.g., $50
- **Duration:** e.g., 45 minutes

**Click Save** → Service shows on homepage instantly! ✨

### 2️⃣ Manage Bookings
Go to: **Admin** → **Bookings**

See all customer bookings:
- Customer name
- Service booked
- Date & time
- Message (if they sent one)
- Status buttons:
  - 📝 Pending (default)
  - ✅ Confirmed (when confirmed)
  - ✔️ Completed (when done)
  - ❌ Cancelled (if they cancel)

**Change status** and customer gets notified (when email is set up)

### 3️⃣ Approve Reviews
Go to: **Admin** → **Reviews**

See pending reviews from customers:
- Their name
- Rating (stars)
- Review text
- **Click Approve** → Shows on homepage
- **Click Reject** → Hidden

### 4️⃣ Settings & Customization
Go to: **Admin** → **Settings**

Change anything:

**🎬 Hero Video**
- Paste video URL (must be .mp4)
- Save
- Homepage updates instantly!

Free video sources:
- https://www.pexels.com/videos/
- https://pixabay.com/videos/

**📝 Website Title**
- Change "Elite Parlor" to your name
- Shows on homepage

**📋 Hero Subtitle**
- "Experience luxury and transformation"
- Change to your tagline

**⏰ Working Hours**
- Set your business hours
- Customers see them

**📞 Contact Information**
- Phone number
- Email address
- Shows on website footer

**🌐 Social Media**
- Instagram, Facebook, etc.
- Links appear on footer

---

## 📊 EXAMPLE: Adding Your First Service

```
Category: Hair
Name: Keratin Treatment
Description: Professional keratin treatment for smooth, shiny hair (48-hour aftercare)
Price: $80
Duration: 90 minutes
```

**Save** → Appears on homepage under "Hair Care"

---

## 🎨 CUSTOMIZING COLORS (Advanced)

Colors are in: `frontend/styles/globals.css` and `frontend/tailwind.config.js`

Main colors:
- **Gold:** #d4a550 (luxury accent)
- **Black:** #000000 (background)
- **White:** #ffffff (text)

Change these to your brand colors!

---

## 🐛 TROUBLESHOOTING

| Problem | Solution |
|---------|----------|
| **Website won't start** | Node.js not installed. Install from nodejs.org |
| **Port 3000 error** | Another app using it. Close other apps or change port |
| **Can't login** | Click Register first to create account |
| **Bookings not showing** | Check backend is running (second window) |
| **Video won't play** | Use .mp4 URL only (Pexels/Pixabay work) |
| **Services not showing** | Refresh page (Ctrl+R) |

---

## 📱 MOBILE VIEW

Website is 100% mobile-responsive!

Test on phone:
- Open http://localhost:3000
- Looks perfect on mobile ✅

---

## 🌐 SHARE WITH CUSTOMERS

When deployed online (see DEPLOYMENT.md):

**Share this URL with customers:**
```
https://your-domain.com
```

They can:
- ✅ View your services
- ✅ Book appointments
- ✅ Leave reviews

You can:
- ✅ Manage everything from admin dashboard
- ✅ Approve reviews
- ✅ Update services
- ✅ Track bookings

---

## 🚀 NEXT STEPS

1. ✅ Install Node.js (if needed)
2. ✅ Run `run-website.bat`
3. ✅ Register as admin
4. ✅ Add your services
5. ✅ Customize settings
6. ✅ Share with customers
7. ✅ Deploy online (see DEPLOYMENT.md)

---

## 📚 MORE HELP

- **README.md** - Complete documentation
- **DEPLOYMENT.md** - How to go live online
- **TESTING.md** - Feature checklist
- **PROJECT_STRUCTURE.md** - File overview

---

## 💡 PRO TIPS

✨ **Best Practices:**
- Upload high-quality service descriptions
- Use good video background
- Keep working hours updated
- Respond to bookings quickly
- Encourage customer reviews

📸 **Recommended Video Backgrounds:**
- Search "beauty" or "salon" on Pexels.com
- Download .mp4 version
- Copy URL
- Paste in Admin > Settings > Hero Video

🎯 **Marketing:**
- Add your social media links
- Encourage online bookings
- Ask customers to leave reviews
- Share URL with customers

---

## ✨ YOU'RE READY!

Your professional parlor website is 100% set up and ready to use.

**Run `run-website.bat` to start!**

Questions? Check the other documentation files.

Enjoy! 🎉
