# Elite Parlor Website - Start Servers Script for PowerShell

Write-Host ""
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "Starting Elite Parlor Website" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
try {
    $nodeVersion = node --version
}
catch {
    Write-Host "ERROR: Node.js is not installed!" -ForegroundColor Red
    Write-Host "Please run setup.ps1 first" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "Starting Backend Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'c:\Users\Muhammad BIlal Ahmed\parlor-website\backend'; npm run dev"

Start-Sleep -Seconds 3

Write-Host "Starting Frontend Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'c:\Users\Muhammad BIlal Ahmed\parlor-website\frontend'; npm run dev"

Start-Sleep -Seconds 5

Write-Host ""
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "Servers Starting..." -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Backend:  http://localhost:5000" -ForegroundColor Green
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Green
Write-Host ""
Write-Host "Opening website in browser..." -ForegroundColor Yellow

Start-Sleep -Seconds 2

# Open in browser
Start-Process "http://localhost:3000"

Write-Host ""
Write-Host "Servers should be running now!" -ForegroundColor Green
Write-Host "Keep the PowerShell windows open while using the website." -ForegroundColor Yellow
Write-Host ""
Read-Host "Press Enter to close this window"
