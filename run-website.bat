@echo off
REM Parlor Website - One-Click Setup & Run
REM This script installs all dependencies and starts both servers

setlocal enabledelayedexpansion

cls
echo.
echo ===================================================
echo  PARLOR WEBSITE - Automated Setup & Launch
echo ===================================================
echo.

REM Check Node.js
echo Checking Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo.
    echo [ERROR] Node.js is NOT installed!
    echo.
    echo Steps to fix:
    echo   1. Visit: https://nodejs.org/
    echo   2. Download LTS version
    echo   3. Run installer
    echo   4. CHECK "Add to PATH" during installation
    echo   5. RESTART your computer
    echo   6. Run this script again
    echo.
    pause
    exit /b 1
)

echo [OK] Node.js found: 
node --version
npm --version
echo.

REM Check if node_modules exist, if not install
echo Checking dependencies...
cd /d "%~dp0backend"

if not exist "node_modules" (
    echo [Installing] Backend dependencies (this may take 5-10 minutes)...
    call npm install
    if errorlevel 1 (
        echo [ERROR] Backend installation failed!
        pause
        exit /b 1
    )
)

cd /d "%~dp0frontend"

if not exist "node_modules" (
    echo [Installing] Frontend dependencies (this may take 5-10 minutes)...
    call npm install
    if errorlevel 1 (
        echo [ERROR] Frontend installation failed!
        pause
        exit /b 1
    )
)

echo.
echo ===================================================
echo  STARTING BOTH SERVERS
echo ===================================================
echo.
echo IMPORTANT: Two new windows will open - do NOT close them!
echo.
echo - Backend will run on:  http://localhost:5000
echo - Frontend will run on: http://localhost:3000
echo.
echo Starting... (wait 15 seconds)
echo.

REM Start backend in new window
cd /d "%~dp0backend"
start "Backend Server - DO NOT CLOSE" cmd /k "npm run dev"

REM Wait a bit for backend to start
timeout /t 3 /nobreak

REM Start frontend in new window
cd /d "%~dp0frontend"
start "Frontend Server - DO NOT CLOSE" cmd /k "npm run dev"

REM Wait for frontend to start
timeout /t 5 /nobreak

REM Try to open browser
echo Opening website in browser...
start http://localhost:3000

echo.
echo ===================================================
echo  SETUP COMPLETE!
echo ===================================================
echo.
echo Your website is starting...
echo.
echo If it doesn't open automatically:
echo   1. Open your browser
echo   2. Go to: http://localhost:3000
echo.
echo FIRST TIME:
echo   1. Click "Register" button
echo   2. Create your admin account
echo   3. Go to Admin Dashboard
echo   4. Add your services
echo   5. Customize settings
echo.
echo BOTH WINDOWS MUST STAY OPEN FOR THE WEBSITE TO WORK!
echo.
pause
