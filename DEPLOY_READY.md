# Deploy Ready Checklist

This project is ready to deploy as two services:
- Frontend: Next.js app in `frontend`
- Backend: Node/Express API in `backend`

## 1) Required Environment Variables

### Backend (`backend/.env`)
Use `backend/.env.example` as reference.

Required:
- `MONGODB_URI` (MongoDB Atlas connection string)
- `JWT_SECRET` (long random secret)

Recommended for production:
- `NODE_ENV=production`
- `PORT=5000`
- `JWT_EXPIRE=7d`
- `CORS_ORIGIN=https://your-frontend-domain.com`

### Frontend (`frontend/.env.local`)
Use `frontend/.env.example` as reference.

Required:
- `NEXT_PUBLIC_API_URL=https://your-backend-domain.com/api`

## 2) Local Production Verification

Install dependencies:

```
npm run install:all
```

Build frontend:

```
npm run build:frontend
```

Start backend:

```
npm run start:backend
```

Start frontend:

```
npm run start:frontend
```

Frontend should be available on port 3000 and backend on port 5000.

## 3) Option 1 Deployment (Vercel + Render)

### Step A: Deploy backend on Render

1. Push this repository to GitHub.
2. In Render, choose New + and select Blueprint.
3. Connect your GitHub repository.
4. Render will detect `render.yaml` and create `parlor-backend` automatically.
5. In Render service Environment, set secret values:
	- `MONGODB_URI`
	- `JWT_SECRET`
	- `CORS_ORIGIN` (set this to your Vercel frontend URL after Step B)
   - Do not set `PORT` manually on Render.
6. Deploy and copy your backend URL, for example:
	- `https://parlor-backend.onrender.com`

Backend API base URL will be:
- `https://parlor-backend.onrender.com/api`

### Step B: Deploy frontend on Vercel

1. In Vercel, import the same GitHub repository.
2. Set Root Directory to `frontend`.
3. Configure environment variable:
	- `NEXT_PUBLIC_API_URL=https://parlor-backend.onrender.com/api`
4. Deploy.
5. Copy the Vercel URL, for example:
	- `https://parlor-website.vercel.app`

### Step C: Final CORS wiring

1. Go back to Render backend service.
2. Set `CORS_ORIGIN=https://parlor-website.vercel.app`.
3. Redeploy backend service.

### Step D: Smoke test

1. Open frontend URL.
2. Verify public pages load services/settings/reviews.
3. Visit backend health endpoints:
	- `/health`
	- `/api/health`
4. Test admin register/login and one booking submit.

## 4) Health Endpoints

- Backend API health: `/api/health`
- Backend process health: `/health`

## 5) What Was Fixed

- Fixed invalid Mongoose schema in `backend/models/Settings.js` that caused startup crash.
- Added production-safe CORS configuration in `backend/server.js`.
- Added required env validation for backend startup (`MONGODB_URI`, `JWT_SECRET`).
- Added frontend env template at `frontend/.env.example`.
- Updated frontend API base URL fallback logic for better production behavior.
- Fixed frontend build-blocking lint errors in JSX text escaping.

## 6) Known Runtime Requirement

Backend will not start until `MONGODB_URI` points to a reachable MongoDB instance.
If local MongoDB is not running, use MongoDB Atlas and update `backend/.env`.

## 7) New Deployment Files Added

- `render.yaml` for Render Blueprint deployment
- `backend/.env.render.example` for Render environment setup
