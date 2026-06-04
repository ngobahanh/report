# Database Setup Guide - Hướng dẫn Thiết lập Cơ sở Dữ liệu

## 📋 Yêu cầu

- MySQL 5.7 hoặc cao hơn
- MySQL Client hoặc MySQL Workbench
- XAMPP (tùy chọn)

## 🚀 Cài đặt nhanh (Windows + XAMPP)

### Bước 1: Tải và cài XAMPP

1. Tải XAMPP từ: https://www.apachefriends.org/
2. Cài đặt tại: `C:\xampp`
3. Mở XAMPP Control Panel
4. Nhấp "Start" cho Apache và MySQL

### Bước 2: Tạo Database

#### Cách 1: Dùng Command Prompt

```batch
# Mở Command Prompt

# Di chuyển đến thư mục database
cd d:\reportsystem\database

# Tạo database và bảng
mysql -u root < schema.sql

# Thêm dữ liệu mẫu
mysql -u root report_system < sample_data.sql

# Kiểm tra
mysql -u root -e "SHOW DATABASES;"
```

#### Cách 2: Dùng MySQL Workbench

1. Mở MySQL Workbench
2. Kết nối đến MySQL server
3. File → Open SQL Script → schema.sql
4. Thực thi (Ctrl+Shift+Enter)
5. Lặp lại với sample_data.sql

#### Cách 3: Dùng phpMyAdmin (XAMPP)

1. Mở trình duyệt
2. Truy cập: http://localhost/phpmyadmin
3. Chọn "Import"
4. Chọn file schema.sql
5. Nhấp "Go"
6. Lặp lại với sample_data.sql

### Bước 3: Xác minh

```sql
-- Kiểm tra database
mysql -u root report_system -e "SHOW TABLES;"

-- Kết quả mong đợi:
-- Tables_in_report_system
-- device_reports
-- personnel
-- task_details
-- task_reports
-- training_reports
-- units
-- workshop_reports
```

## 📊 Cấu trúc Database

### 1. Units (Đơn vị)
```sql
CREATE TABLE units (
  id INT AUTO_INCREMENT PRIMARY KEY,
  unit_name VARCHAR(255) NOT NULL UNIQUE,
  parent_unit VARCHAR(255),
  total_devices INT DEFAULT 0,
  description TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

### 2. Personnel (Nhân sự)
```sql
CREATE TABLE personnel (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  rank VARCHAR(100) NOT NULL,
  position VARCHAR(255) NOT NULL,
  birth_date DATE,
  hometown VARCHAR(255),
  enlistment_date DATE,
  party_join_date DATE,
  work_history TEXT,
  father_name VARCHAR(255),
  mother_name VARCHAR(255),
  spouse_name VARCHAR(255),
  children TEXT,
  unit_id INT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  FOREIGN KEY (unit_id) REFERENCES units(id)
);
```

### 3. Training Reports (Báo cáo Huấn luyện)
```sql
CREATE TABLE training_reports (
  id INT AUTO_INCREMENT PRIMARY KEY,
  training_content TEXT NOT NULL,
  training_topic VARCHAR(255) NOT NULL,
  training_time DATETIME NOT NULL,
  training_hours DECIMAL(5, 2) NOT NULL,
  trainer_id INT NOT NULL,
  notes TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  FOREIGN KEY (trainer_id) REFERENCES personnel(id)
);
```

### 4. Workshop Reports (Báo cáo Tập huấn)
```sql
CREATE TABLE workshop_reports (
  id INT AUTO_INCREMENT PRIMARY KEY,
  training_content TEXT NOT NULL,
  training_time DATETIME NOT NULL,
  executor_id INT NOT NULL,
  notes TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  FOREIGN KEY (executor_id) REFERENCES personnel(id)
);
```

### 5. Task Reports (Báo cáo Nhiệm vụ)
```sql
CREATE TABLE task_reports (
  id INT AUTO_INCREMENT PRIMARY KEY,
  report_time DATETIME NOT NULL,
  total_personnel INT NOT NULL,
  present_personnel INT NOT NULL,
  absent_personnel INT NOT NULL,
  absence_reason TEXT,
  notes TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

### 6. Task Details (Chi tiết Nhiệm vụ)
```sql
CREATE TABLE task_details (
  id INT AUTO_INCREMENT PRIMARY KEY,
  task_report_id INT NOT NULL,
  task_name VARCHAR(255) NOT NULL,
  progress_percent INT DEFAULT 0,
  status ENUM('pending', 'in_progress', 'completed', 'on_hold'),
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  FOREIGN KEY (task_report_id) REFERENCES task_reports(id) ON DELETE CASCADE
);
```

### 7. Device Reports (Báo cáo Thiết bị)
```sql
CREATE TABLE device_reports (
  id INT AUTO_INCREMENT PRIMARY KEY,
  unit_id INT NOT NULL,
  device_name VARCHAR(255) NOT NULL,
  disconnect_time DATETIME NOT NULL,
  resolve_time DATETIME,
  cause TEXT NOT NULL,
  solution TEXT,
  status ENUM('processing', 'resolved') DEFAULT 'processing',
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  FOREIGN KEY (unit_id) REFERENCES units(id)
);
```

## 🗑️ Xóa Database (Reset)

```sql
-- Cảnh báo: Sẽ xóa tất cả dữ liệu!
mysql -u root -e "DROP DATABASE report_system;"

-- Tạo lại từ schema.sql
mysql -u root < d:\reportsystem\database\schema.sql

-- Thêm dữ liệu mẫu
mysql -u root report_system < d:\reportsystem\database\sample_data.sql
```

## 📦 Dữ liệu Mẫu

Hệ thống được cung cấp với dữ liệu mẫu:

### Units (5 đơn vị)
- Sư đoàn 1 (50 thiết bị)
- Trung đoàn A (25 thiết bị)
- Trung đoàn B (25 thiết bị)
- Trung tâm Thông tin (30 thiết bị)
- Bộ Tham mưu (15 thiết bị)

### Personnel (8 nhân sự)
- Nguyễn Văn A - Thiếu tá Chính trị viên
- Trần Thị B - Trung úy Cố vấn
- Phạm Minh C - Thiếu úy Quân nhân
- ... và 5 người khác

### Reports
- 4 Báo cáo Huấn luyện
- 3 Báo cáo Tập huấn
- 3 Báo cáo Nhiệm vụ
- 5 Báo cáo Thiết bị

## 🔧 Backup & Restore

### Backup
```bash
# Toàn bộ database
mysqldump -u root report_system > backup.sql

# Bảng cụ thể
mysqldump -u root report_system personnel > personnel_backup.sql

# Với lịch sử thời gian
mysqldump -u root report_system > backup_$(date +%Y%m%d_%H%M%S).sql
```

### Restore
```bash
# Từ backup file
mysql -u root report_system < backup.sql

# Ghi đè toàn bộ database
mysql -u root < backup.sql
```

## 🔍 Truy vấn Kiểm tra

```sql
-- Kết nối database
mysql -u root report_system

-- Xem tất cả bảng
SHOW TABLES;

-- Xem cấu trúc bảng
DESCRIBE personnel;

-- Đếm số bản ghi
SELECT COUNT(*) FROM personnel;

-- Xem dữ liệu
SELECT * FROM units;
SELECT * FROM personnel;

-- Thống kê
SELECT COUNT(*) as total_personnel FROM personnel;
SELECT COUNT(*) as total_training FROM training_reports;
SELECT COUNT(*) as total_devices FROM device_reports;

-- Thoát
EXIT;
```

## ⚠️ Xử lý Sự cố

### Lỗi: "Access denied for user 'root'@'localhost'"
```bash
# Kiểm tra MySQL có chạy
mysql -u root -p

# Nếu không có mật khẩu, bỏ qua -p
mysql -u root
```

### Lỗi: "Can't connect to MySQL server"
```bash
# Kiểm tra MySQL service
# Windows:
net start MySQL57
# hoặc trong XAMPP Control Panel nhấp Start MySQL

# Linux:
sudo systemctl start mysql
```

### Lỗi: "Unknown database 'report_system'"
```bash
# Tạo database
mysql -u root < d:\reportsystem\database\schema.sql

# Kiểm tra
mysql -u root -e "SHOW DATABASES;"
```

### Dữ liệu bị xóa nhầm
```bash
# Restore từ backup
mysql -u root report_system < backup.sql

# Hoặc chạy lại sample_data.sql
mysql -u root report_system < d:\reportsystem\database\sample_data.sql
```

## 🔐 Bảo mật

### Thay đổi mật khẩu root MySQL
```bash
# Cách 1: mysqladmin
mysqladmin -u root password "new_password"

# Cách 2: SQL
mysql -u root
ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password';
FLUSH PRIVILEGES;
EXIT;
```

### Tạo user riêng cho ứng dụng
```sql
-- Tạo user
CREATE USER 'reportapp'@'localhost' IDENTIFIED BY 'app_password';

-- Cấp quyền
GRANT ALL PRIVILEGES ON report_system.* TO 'reportapp'@'localhost';
FLUSH PRIVILEGES;

-- Kiểm tra
SHOW GRANTS FOR 'reportapp'@'localhost';
```

Cập nhật trong `.env` backend:
```
DB_USER=reportapp
DB_PASSWORD=app_password
```

## 📈 Tối ưu Hiệu suất

### Tạo Indexes
```sql
-- Đã tạo sẵn trong schema.sql
-- Bao gồm indexes cho:
-- - personnel.unit_id
-- - training_reports.training_time
-- - device_reports.disconnect_time
-- - device_reports.status
```

### Kiểm tra Indexes
```sql
SHOW INDEXES FROM personnel;
SHOW INDEXES FROM device_reports;
```

## 📞 Hỗ trợ

Nếu gặp vấn đề:
1. Kiểm tra MySQL đang chạy
2. Xem log file MySQL
3. Chạy lại schema.sql
4. Khôi phục từ backup

---

**Last Updated**: May 2026
