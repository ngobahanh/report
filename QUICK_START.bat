@echo off
REM Hệ thống Tổng hợp Báo cáo - Quick Start (Windows)

echo.
echo ============================================
echo HE THONG TONG HOP BAO CAO - QUICK START
echo ============================================
echo.

REM Check if Node is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo [1/4] Checking dependencies...
node --version
npm --version

echo.
echo [2/4] Installing Backend dependencies...
cd backend
call npm install
if errorlevel 1 (
    echo ERROR: Backend installation failed!
    pause
    exit /b 1
)
cd ..

echo.
echo [3/4] Installing Frontend dependencies...
cd frontend
call npm install
if errorlevel 1 (
    echo ERROR: Frontend installation failed!
    pause
    exit /b 1
)
cd ..

echo.
echo [4/4] Setup Complete!
echo.
echo ============================================
echo NEXT STEPS:
echo ============================================
echo.
echo 1. DATABASE SETUP (MySQL)
echo    - Open XAMPP Control Panel and start MySQL
echo    - Run in Command Prompt:
echo      mysql -u root ^< database\schema.sql
echo      mysql -u root report_system ^< database\sample_data.sql
echo.
echo 2. START BACKEND (Terminal 1)
echo    cd backend
echo    npm run dev
echo.
echo 3. START FRONTEND (Terminal 2)
echo    cd frontend
echo    npm run dev
echo.
echo 4. OPEN BROWSER
echo    http://localhost:3000
echo.
echo ============================================
echo.
pause
