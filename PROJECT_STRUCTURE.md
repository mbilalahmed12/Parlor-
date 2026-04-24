# Project Structure

```
parlor-website/
├── backend/
│   ├── models/
│   │   ├── Service.js          # Service schema
│   │   ├── Booking.js          # Booking schema
│   │   ├── Review.js           # Review schema with approval workflow
│   │   ├── User.js             # Admin user schema with password hashing
│   │   └── Settings.js         # Website settings (hero video, contact, etc)
│   ├── routes/
│   │   ├── auth.js             # Login/Register endpoints
│   │   ├── services.js         # Service CRUD endpoints
│   │   ├── bookings.js         # Booking management endpoints
│   │   ├── reviews.js          # Review submission & approval
│   │   └── settings.js         # Website settings endpoints
│   ├── middleware/
│   │   └── auth.js             # JWT authentication middleware
│   ├── server.js               # Express server setup
│   ├── package.json            # Backend dependencies
│   ├── .env.example            # Environment variables template
│   └── .gitignore              # Git ignore rules
│
├── frontend/
│   ├── pages/
│   │   ├── _app.js             # Next.js app wrapper
│   │   ├── index.js            # Homepage
│   │   ├── booking.js          # Booking page
│   │   ├── login.js            # Admin login
│   │   ├── register.js         # Admin registration
│   │   ├── 404.js              # 404 error page
│   │   └── admin/
│   │       └── index.js        # Admin dashboard
│   ├── components/
│   │   ├── Header.js           # Navigation header
│   │   ├── Hero.js             # Homepage hero with video
│   │   ├── Services.js         # Services showcase
│   │   ├── Booking.js          # Booking form
│   │   ├── Testimonials.js     # Reviews section
│   │   ├── Footer.js           # Footer
│   │   └── admin/
│   │       ├── Services.js     # Service management
│   │       ├── Bookings.js     # Booking management
│   │       ├── Reviews.js      # Review approval
│   │       └── Settings.js     # Website settings
│   ├── lib/
│   │   ├── api.js              # API client & endpoints
│   │   └── store.js            # Zustand state management
│   ├── styles/
│   │   └── globals.css         # Global styles & Tailwind
│   ├── public/                 # Static assets
│   ├── package.json            # Frontend dependencies
│   ├── tailwind.config.js      # Tailwind configuration
│   ├── next.config.js          # Next.js configuration
│   ├── jsconfig.json           # Path aliases
│   ├── postcss.config.js       # PostCSS for Tailwind
│   └── .eslintrc.json          # ESLint rules
│
├── README.md                    # Full documentation
├── QUICKSTART.md               # Quick start guide
├── DEPLOYMENT.md               # Deployment instructions
└── .gitignore                  # Global git ignore
```

## 🗂️ File Purposes

### Backend Files

| File | Purpose |
|------|---------|
| `server.js` | Main Express server, routes setup |
| `models/*.js` | MongoDB schemas with validation |
| `routes/*.js` | RESTful API endpoints |
| `middleware/auth.js` | JWT verification |

### Frontend Files

| File | Purpose |
|------|---------|
| `pages/index.js` | Main homepage with all sections |
| `pages/admin/index.js` | Admin dashboard with tabs |
| `components/*.js` | Reusable UI components |
| `components/admin/*.js` | Admin panel components |
| `lib/api.js` | API client with axios |
| `lib/store.js` | Zustand store for auth |
| `styles/globals.css` | Global styles & animations |

## 🎯 Key Features by File

### Animations & Motion
- **Hero.js** - Scroll indicators, fade-in animations
- **Services.js** - Stagger animations on cards
- **Testimonials.js** - Card hover effects, star ratings
- **Admin components** - Modal animations, transitions

### Admin Controls
- **Services.js (admin)** - Add/edit/delete services with modal
- **Bookings.js (admin)** - Track bookings with status updates
- **Reviews.js (admin)** - Approve/reject reviews workflow
- **Settings.js (admin)** - Change hero video, contact info, hours

### Data Flow
1. User submits booking → `Booking.js` → API → Backend → MongoDB
2. Admin approves review → `Reviews.js` → API → Backend → Published
3. Admin updates settings → `Settings.js` → API → Applied globally

## 📊 Database Collections

```javascript
// Services Collection
{
  _id, name, description, price, duration, category,
  image, featured, active, createdAt, updatedAt
}

// Bookings Collection
{
  _id, clientName, clientEmail, clientPhone, service,
  bookingDate, bookingTime, notes, status, createdAt, updatedAt
}

// Reviews Collection
{
  _id, clientName, clientEmail, rating, comment, service,
  image, approved, approvedAt, publishedAt, createdAt
}

// Users Collection
{
  _id, name, email, password (hashed), role, createdAt
}

// Settings Collection
{
  _id, parlorName, parlorDescription, heroVideoUrl, heroTitle,
  heroSubtitle, contactEmail, contactPhone, contactAddress,
  socialLinks, workingHours, updatedAt
}
```

## 🔄 API Request Flow

```
Client Request → Frontend Component
  ↓
lib/api.js (axios with token)
  ↓
Backend Routes (Express)
  ↓
Middleware (auth.js - verify token)
  ↓
Models (MongoDB operations)
  ↓
Response → Frontend Component
```

---

All files are interconnected through the API client (`lib/api.js`) and state management (`lib/store.js`). The admin dashboard (`pages/admin/index.js`) orchestrates all admin components. The homepage (`pages/index.js`) showcases services, bookings, and testimonials with smooth animations throughout!
