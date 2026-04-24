@echo off
REM Auto-create .env files with defaults

echo Creating backend .env file...
(
    echo MONGODB_URI=mongodb://localhost:27017/parlor-website
    echo JWT_SECRET=parlor-website-super-secret-key-change-in-production
    echo JWT_EXPIRE=7d
    echo PORT=5000
    echo NODE_ENV=development
) > backend\.env

echo Creating frontend .env.local file...
(
    echo NEXT_PUBLIC_API_URL=http://localhost:5000/api
) > frontend\.env.local

echo.
echo ✓ .env files created successfully!
echo.
pause
