@echo off
setlocal enabledelayedexpansion

cls
echo.
echo =====================================================
echo    PARLOR WEBSITE - COMPLETE SETUP & LAUNCH
echo =====================================================
echo.

REM Check Node.js
echo [STEP 1] Checking Node.js installation...
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js not installed!
    echo Visit: https://nodejs.org/ and install LTS
    pause
    exit /b 1
)
echo [OK] Node.js found
node --version
npm --version
echo.

REM Check backend node_modules
echo [STEP 2] Checking backend dependencies...
cd /d "C:\Users\Muhammad BIlal Ahmed\parlor-website\backend"
if not exist "node_modules" (
    echo [Installing] Backend dependencies (this may take 5 minutes)...
    call npm install
    if errorlevel 1 (
        echo [ERROR] Backend npm install failed
        pause
        exit /b 1
    )
) else (
    echo [OK] Backend dependencies already installed
)
echo.

REM Check frontend node_modules
echo [STEP 3] Checking frontend dependencies...
cd /d "C:\Users\Muhammad BIlal Ahmed\parlor-website\frontend"
if not exist "node_modules" (
    echo [Installing] Frontend dependencies (this may take 5 minutes)...
    call npm install
    if errorlevel 1 (
        echo [ERROR] Frontend npm install failed
        pause
        exit /b 1
    )
) else (
    echo [OK] Frontend dependencies already installed
)
echo.

REM Start backend in new window
echo [STEP 4] Starting backend server...
cd /d "C:\Users\Muhammad BIlal Ahmed\parlor-website\backend"
start "Backend Server" cmd /k "echo. && echo ===== BACKEND SERVER ===== && echo. && npm run dev"
timeout /t 3 /nobreak
echo.

REM Start frontend in new window
echo [STEP 5] Starting frontend server...
cd /d "C:\Users\Muhammad BIlal Ahmed\parlor-website\frontend"
start "Frontend Server" cmd /k "echo. && echo ===== FRONTEND SERVER ===== && echo. && npm run dev"
timeout /t 5 /nobreak
echo.

REM Open in VS Code
echo [STEP 6] Opening in VS Code...
cd /d "C:\Users\Muhammad BIlal Ahmed\parlor-website"
start code .
timeout /t 3 /nobreak
echo.

REM Open browser
echo [STEP 7] Opening website in browser...
start http://localhost:3000
timeout /t 2 /nobreak
echo.

cls
echo.
echo =====================================================
echo    ✅ SETUP COMPLETE!
echo =====================================================
echo.
echo SERVERS RUNNING:
echo   Backend:  http://localhost:5000/api
echo   Frontend: http://localhost:3000
echo   VS Code:  Opening with your project
echo   Browser:  http://localhost:3000
echo.
echo IMPORTANT:
echo   1. Two command windows should have opened (Backend & Frontend)
echo   2. DO NOT CLOSE THOSE WINDOWS - they run your website!
echo   3. VS Code window is open with your project
echo   4. Browser is opening to http://localhost:3000
echo.
echo FIRST TIME:
echo   1. Website loads with loading spinner
echo   2. Click "Register" button
echo   3. Create admin account (name, email, password)
echo   4. You'll be logged into Admin Dashboard
echo   5. Add services, customize settings
echo.
echo BOTH SERVER WINDOWS MUST STAY OPEN!
echo.
pause
