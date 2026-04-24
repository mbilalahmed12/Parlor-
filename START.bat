@echo off
REM Parlor Website - Simple Menu Interface

setlocal enabledelayedexpansion

:menu
cls
echo.
echo =====================================================
echo        PARLOR WEBSITE - ADMIN MENU
echo =====================================================
echo.
echo What would you like to do?
echo.
echo   1) Start Website (Install + Run)
echo   2) Start Website (Already Installed)
echo   3) Install Dependencies Only
echo   4) Open Backend Only
echo   5) Open Frontend Only
echo   6) Open Website in Browser
echo   7) Check Node.js Installation
echo   8) View Documentation
echo   9) Exit
echo.
set /p choice="Enter your choice (1-9): "

if "%choice%"=="1" goto install_and_run
if "%choice%"=="2" goto just_run
if "%choice%"=="3" goto install_only
if "%choice%"=="4" goto backend_only
if "%choice%"=="5" goto frontend_only
if "%choice%"=="6" goto open_browser
if "%choice%"=="7" goto check_node
if "%choice%"=="8" goto show_docs
if "%choice%"=="9" exit /b 0
echo Invalid choice!
timeout /t 2
goto menu

:check_node
cls
echo Checking Node.js installation...
echo.
node --version
npm --version
echo.
if errorlevel 1 (
    echo [ERROR] Node.js not installed!
    echo Download from: https://nodejs.org/
) else (
    echo [OK] Node.js is installed!
)
echo.
pause
goto menu

:install_only
cls
echo Installing dependencies...
cd /d "%~dp0backend"
if not exist "node_modules" (
    echo Installing backend...
    call npm install
)
cd /d "%~dp0frontend"
if not exist "node_modules" (
    echo Installing frontend...
    call npm install
)
echo.
echo Done!
pause
goto menu

:install_and_run
cd /d "%~dp0backend"
if not exist "node_modules" (
    echo Installing backend...
    call npm install
)
cd /d "%~dp0frontend"
if not exist "node_modules" (
    echo Installing frontend...
    call npm install
)
goto just_run

:just_run
cls
echo Starting servers...
echo.
cd /d "%~dp0backend"
start "Backend" cmd /k "npm run dev"
timeout /t 3
cd /d "%~dp0frontend"
start "Frontend" cmd /k "npm run dev"
timeout /t 5
start http://localhost:3000
echo.
echo Website is starting at http://localhost:3000
echo Do NOT close the server windows!
echo.
pause
goto menu

:backend_only
cd /d "%~dp0backend"
cmd /k "npm run dev"
goto menu

:frontend_only
cd /d "%~dp0frontend"
cmd /k "npm run dev"
goto menu

:open_browser
start http://localhost:3000
echo Browser opening...
timeout /t 2
goto menu

:show_docs
cls
echo.
echo Documentation Files:
echo.
echo 1) QUICK_START.md - Quick setup guide
echo 2) README.md - Full documentation
echo 3) INSTALLATION_MANUAL.md - Detailed installation
echo 4) DEPLOYMENT.md - How to go live
echo 5) TESTING.md - Feature checklist
echo.
set /p docChoice="Enter number (1-5) or press Enter to go back: "

if "%docChoice%"=="1" start notepad QUICK_START.md
if "%docChoice%"=="2" start notepad README.md
if "%docChoice%"=="3" start notepad INSTALLATION_MANUAL.md
if "%docChoice%"=="4" start notepad DEPLOYMENT.md
if "%docChoice%"=="5" start notepad TESTING.md

goto menu
