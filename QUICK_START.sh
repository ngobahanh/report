#!/bin/bash
# Hệ thống Tổng hợp Báo cáo - Quick Start (macOS/Linux)

echo ""
echo "============================================"
echo "HE THONG TONG HOP BAO CAO - QUICK START"
echo "============================================"
echo ""

# Check if Node is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "[1/4] Checking dependencies..."
node --version
npm --version

echo ""
echo "[2/4] Installing Backend dependencies..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Backend installation failed!"
    exit 1
fi
cd ..

echo ""
echo "[3/4] Installing Frontend dependencies..."
cd frontend
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Frontend installation failed!"
    exit 1
fi
cd ..

echo ""
echo "[4/4] Setup Complete!"
echo ""
echo "============================================"
echo "NEXT STEPS:"
echo "============================================"
echo ""
echo "1. DATABASE SETUP (MySQL)"
echo "   - Ensure MySQL is running"
echo "   - Run in terminal:"
echo "     mysql -u root < database/schema.sql"
echo "     mysql -u root report_system < database/sample_data.sql"
echo ""
echo "2. START BACKEND (Terminal 1)"
echo "   cd backend"
echo "   npm run dev"
echo ""
echo "3. START FRONTEND (Terminal 2)"
echo "   cd frontend"
echo "   npm run dev"
echo ""
echo "4. OPEN BROWSER"
echo "   http://localhost:3000"
echo ""
echo "============================================"
echo ""
