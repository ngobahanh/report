# Hệ thống Tổng hợp Báo cáo - Hướng dẫn Cài đặt

Hệ thống quản lý báo cáo nội bộ cho đơn vị quân sự với giao diện hiện đại.

## 🎯 Tính năng chính

- ✅ Quản lý thông tin nhân sự
- ✅ Quản lý danh sách đơn vị
- ✅ Báo cáo huấn luyện/tập huấn
- ✅ Báo cáo thực hiện nhiệm vụ
- ✅ Quản lý thiết bị/máy chủ mất kết nối
- ✅ Xuất báo cáo Excel/PDF
- ✅ Dashboard thống kê trực quan
- ✅ Giao diện responsive, white-red theme

## 📋 Yêu cầu hệ thống

- **Node.js**: v14+ 
- **MySQL**: v5.7+
- **npm**: v6+

## 🚀 Cài đặt nhanh (Windows)

### 1. Tải XAMPP

Tải XAMPP từ [https://www.apachefriends.org/](https://www.apachefriends.org/)

### 2. Khởi động MySQL

- Mở XAMPP Control Panel
- Nhấp "Start" cho MySQL
- Kiểm tra: MySQL chạy trên port 3306

### 3. Cài đặt Database

```cmd
# Mở Command Prompt
# Di chuyển đến thư mục database
cd d:\reportsystem\database

# Tạo database và bảng
mysql -u root < schema.sql

# Thêm dữ liệu mẫu
mysql -u root report_system < sample_data.sql
```

### 4. Cài đặt Backend

```cmd
cd d:\reportsystem\backend

# Cài đặt dependencies
npm install

# Khởi động server
npm run dev
```

Server sẽ chạy trên: **http://localhost:5000**

### 5. Cài đặt Frontend

```cmd
cd d:\reportsystem\frontend

# Cài đặt dependencies
npm install

# Khởi động development server
npm run dev
```

Frontend sẽ mở trên: **http://localhost:3000**

## 📊 Cấu trúc Thư mục

```
reportsystem/
├── backend/                 # Express Server
│   ├── models/             # Database models (Sequelize)
│   ├── controllers/        # API controllers
│   ├── routes/             # API routes
│   ├── config/             # Configuration
│   └── server.js           # Main server file
│
├── frontend/               # React + Vite
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   └── utils/          # Utilities
│   └── index.html          # Entry point
│
└── database/               # SQL scripts
    ├── schema.sql          # Database schema
    └── sample_data.sql     # Sample data
```

## 🔗 API Endpoints

### Personnel (Nhân sự)
- `GET /api/personnel` - Danh sách nhân sự
- `POST /api/personnel` - Thêm nhân sự
- `PUT /api/personnel/:id` - Cập nhật nhân sự
- `DELETE /api/personnel/:id` - Xóa nhân sự

### Units (Đơn vị)
- `GET /api/units` - Danh sách đơn vị
- `POST /api/units` - Thêm đơn vị
- `PUT /api/units/:id` - Cập nhật đơn vị
- `DELETE /api/units/:id` - Xóa đơn vị

### Training Reports
- `GET /api/training-reports` - Danh sách báo cáo
- `POST /api/training-reports` - Thêm báo cáo
- `PUT /api/training-reports/:id` - Cập nhật báo cáo
- `DELETE /api/training-reports/:id` - Xóa báo cáo

### Workshop Reports
- `GET /api/workshop-reports` - Danh sách báo cáo
- `POST /api/workshop-reports` - Thêm báo cáo
- `PUT /api/workshop-reports/:id` - Cập nhật báo cáo
- `DELETE /api/workshop-reports/:id` - Xóa báo cáo

### Task Reports
- `GET /api/task-reports` - Danh sách báo cáo
- `POST /api/task-reports` - Thêm báo cáo
- `PUT /api/task-reports/:id` - Cập nhật báo cáo
- `DELETE /api/task-reports/:id` - Xóa báo cáo

### Device Reports
- `GET /api/device-reports` - Danh sách báo cáo
- `POST /api/device-reports` - Thêm báo cáo
- `PUT /api/device-reports/:id` - Cập nhật báo cáo
- `DELETE /api/device-reports/:id` - Xóa báo cáo

### Dashboard
- `GET /api/dashboard/stats` - Thống kê tổng quan
- `GET /api/dashboard/charts` - Dữ liệu biểu đồ

### Export
- `GET /api/export/excel` - Xuất Excel
- `GET /api/export/pdf` - Xuất PDF

## 🎨 Giao diện

### Màu chủ đạo
- **Primary**: #C62828 (Đỏ)
- **Background**: Trắng
- **Accent**: Gradient đỏ

### Menu chính
1. Dashboard - Tổng quan
2. Thông tin cá nhân - Quản lý nhân sự
3. Danh sách đơn vị - Quản lý đơn vị
4. Báo cáo huấn luyện - Huấn luyện
5. Báo cáo tập huấn - Tập huấn
6. Báo cáo nhiệm vụ - Nhiệm vụ
7. Thiết bị mất kết nối - Sự cố thiết bị
8. Xuất báo cáo - Xuất dữ liệu

## 📝 Dữ liệu mẫu

Hệ thống đi kèm dữ liệu mẫu bao gồm:
- 8 nhân sự
- 5 đơn vị
- 4 báo cáo huấn luyện
- 3 báo cáo tập huấn
- 3 báo cáo nhiệm vụ
- 5 báo cáo thiết bị

## 🔧 Cấu hình

### Backend (.env)
```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=report_system
NODE_ENV=development
PORT=5000
```

### Frontend (vite.config.js)
```
API proxy: http://localhost:5000
Port: 3000
```

## 📱 Sử dụng

### Thêm dữ liệu
1. Nhấp nút "➕ Thêm mới"
2. Điền thông tin vào form
3. Nhấp "Lưu"

### Sửa dữ liệu
1. Nhấp nút "✏️ Sửa" trên dòng cần sửa
2. Chỉnh sửa thông tin
3. Nhấp "Lưu"

### Xóa dữ liệu
1. Nhấp nút "🗑️ Xóa"
2. Xác nhận xóa

### Tìm kiếm
1. Nhập từ khóa vào ô tìm kiếm
2. Kết quả sẽ tự động cập nhật

### Xuất báo cáo
1. Chọn "Xuất báo cáo"
2. Chọn loại báo cáo
3. Chọn khoảng thời gian
4. Chọn định dạng (Excel/PDF)
5. Nhấp "Xuất báo cáo"

## ⚠️ Xử lý sự cố

### Lỗi kết nối cơ sở dữ liệu
```
Error: connect ECONNREFUSED
```
**Giải pháp**: 
- Kiểm tra MySQL đang chạy
- Kiểm tra .env file có đúng thông tin
- Kiểm tra port 3306 khả dụng

### Port đã được sử dụng
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Giải pháp**:
- Đổi port trong .env
- Hoặc kill process sử dụng port: `netstat -ano | findstr :5000`

### Frontend không kết nối backend
- Kiểm tra backend chạy trên port 5000
- Kiểm tra proxy trong vite.config.js
- Mở DevTools console kiểm tra lỗi

## 🚀 Production Deployment

### Build Frontend
```cmd
cd frontend
npm run build
```

### Build Backend
```cmd
cd backend
npm install --production
```

Deploy thư mục `dist` từ frontend lên server.

## 📞 Hỗ trợ

Nếu gặp vấn đề:
1. Kiểm tra logs trong terminal
2. Xem DevTools console (F12)
3. Kiểm tra lại các bước cài đặt
4. Đảm bảo MySQL, Node.js được cài đúng phiên bản

## 📄 Giấy phép

Internal use only - Dành cho nội bộ đơn vị quân sự
