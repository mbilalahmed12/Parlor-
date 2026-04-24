@echo off
REM Elite Parlor Website - Start Both Servers

echo.
echo ====================================
echo Starting Elite Parlor Website
echo ====================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo Please run setup.bat first
    pause
    exit /b 1
)

echo Starting Backend Server...
start cmd /k "cd /d c:\Users\Muhammad BIlal Ahmed\parlor-website\backend && npm run dev"

timeout /t 3

echo Starting Frontend Server...
start cmd /k "cd /d c:\Users\Muhammad BIlal Ahmed\parlor-website\frontend && npm run dev"

timeout /t 5

echo.
echo ====================================
echo Servers Starting...
echo ====================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Opening website in browser...
timeout /t 3

REM Open browser
start http://localhost:3000

echo.
echo Servers should be running now!
echo Keep this window open while using the website.
echo Press Ctrl+C to stop any server.
echo.
pause
