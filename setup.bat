@echo off
REM Elite Parlor Website - Automated Setup Script for Windows

echo.
echo ====================================
echo Elite Parlor Website Setup
echo ====================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo.
    echo ERROR: Node.js is not installed!
    echo.
    echo Please install Node.js first:
    echo 1. Visit: https://nodejs.org/ (LTS version)
    echo 2. Download and run the installer
    echo 3. Check "Add to PATH" during installation
    echo 4. Restart Command Prompt
    echo 5. Run this script again
    echo.
    pause
    exit /b 1
)

echo Node.js version:
node --version
echo npm version:
npm --version

echo.
echo Installing backend dependencies...
cd /d "c:\Users\Muhammad BIlal Ahmed\parlor-website\backend"
if errorlevel 1 (
    echo ERROR: Could not navigate to backend folder
    pause
    exit /b 1
)
call npm install
if errorlevel 1 (
    echo ERROR: Backend npm install failed
    pause
    exit /b 1
)

echo.
echo Installing frontend dependencies...
cd /d "c:\Users\Muhammad BIlal Ahmed\parlor-website\frontend"
if errorlevel 1 (
    echo ERROR: Could not navigate to frontend folder
    pause
    exit /b 1
)
call npm install
if errorlevel 1 (
    echo ERROR: Frontend npm install failed
    pause
    exit /b 1
)

echo.
echo ====================================
echo Setup Complete!
echo ====================================
echo.
echo Next steps:
echo 1. Run: start-servers.bat
echo 2. Visit: http://localhost:3000
echo.
pause
