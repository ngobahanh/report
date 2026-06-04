# README - Hệ thống Tổng hợp Báo cáo

## Mô tả

Hệ thống Web Report nội bộ chạy trên LAN để tổng hợp và quản lý báo cáo cho đơn vị quân sự. Giao diện hiện đại, chuyên nghiệp, tối giản với màu chủ đạo TRẮNG – ĐỎ, responsive.

## ✨ Tính năng

### Quản lý Nhân sự
- Thêm/Sửa/Xóa thông tin nhân sự
- Lưu trữ: Họ tên, cấp bậc, chức vụ, ngày sinh, quê quán, thông tin gia đình
- Tìm kiếm và lọc theo đơn vị
- Phân trang

### Quản lý Đơn vị
- CRUD đầy đủ cho các đơn vị
- Hiển thị cây đơn vị cha-con
- Thống kê tổng thiết bị

### Báo cáo Huấn luyện
- Ghi nhận nội dung huấn luyện
- Chọn người huấn luyện (Cấp bậc + Họ tên + Chức vụ)
- Lưu lại thời gian, số giờ, vấn đề
- Xem danh sách và thống kê

### Báo cáo Tập huấn
- Ghi nhận nội dung tập huấn
- Chọn người thực hiện
- Lọc theo thời gian

### Báo cáo Thực hiện Nhiệm vụ
- Ghi nhận quân số (tổng, có mặt, vắng)
- Thêm/Sửa danh sách nhiệm vụ động (Add Row)
- Ghi lý do vắng
- Theo dõi tiến độ nhiệm vụ (%)

### Báo cáo Thiết bị/Máy chủ Mất Kết nối
- Ghi nhận thời gian mất kết nối
- Thời gian khôi phục
- Nguyên nhân và giải pháp
- Dashboard: Tổng thiết bị lỗi, đơn vị lỗi nhiều nhất, thiết bị đang xử lý, đã xử lý

### Giao diện
- Sidebar + Topbar + Dashboard
- Bảng dữ liệu với modal popup Add/Edit
- Tìm kiếm, lọc dữ liệu
- Phân trang
- Responsive design

### Xuất báo cáo
- Xuất Excel
- Xuất PDF
- Lọc theo thời gian, đơn vị, loại báo cáo

## 🛠️ Công nghệ

- **Frontend**: React 18 + Vite + TailwindCSS
- **Backend**: Node.js + Express
- **Database**: MySQL 5.7+
- **ORM**: Sequelize
- **Export**: ExcelJS, PDFKit
- **Chart**: Chart.js (optional)

## 📁 Cấu trúc Dự án

```
reportsystem/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── models/
│   │   ├── Unit.js
│   │   ├── Personnel.js
│   │   ├── TrainingReport.js
│   │   ├── WorkshopReport.js
│   │   ├── TaskReport.js
│   │   ├── TaskDetail.js
│   │   └── DeviceReport.js
│   ├── controllers/
│   ├── routes/
│   ├── package.json
│   ├── .env
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── package.json
│   └── postcss.config.js
│
├── database/
│   ├── schema.sql
│   └── sample_data.sql
│
└── docs/
    ├── SETUP_GUIDE.md
    └── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js v14+
- MySQL 5.7+
- npm/yarn

### Installation

1. **Setup Database**
   ```bash
   mysql -u root < database/schema.sql
   mysql -u root report_system < database/sample_data.sql
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Open Browser**
   ```
   http://localhost:3000
   ```

## 📊 Database Schema

### Tables
1. **units** - Danh sách đơn vị
2. **personnel** - Thông tin nhân sự
3. **training_reports** - Báo cáo huấn luyện
4. **workshop_reports** - Báo cáo tập huấn
5. **task_reports** - Báo cáo nhiệm vụ
6. **task_details** - Chi tiết nhiệm vụ
7. **device_reports** - Báo cáo thiết bị

## 🎨 Design System

### Colors
- **Primary Red**: #C62828
- **Dark Red**: #B71C1C
- **Background**: #FFFFFF / #F5F5F5
- **Text Dark**: #1F2937
- **Text Light**: #6B7280

### Components
- Sidebar (collapsible)
- Topbar (logo, search, notifications, profile)
- Cards (dashboard stats)
- Tables (data list with pagination)
- Modals (add/edit forms)
- Buttons (primary, secondary, danger)

## 🔐 Default Credentials

Admin account (to be configured):
- Username: admin
- Password: admin123

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🐛 Troubleshooting

### Database Connection Error
- Verify MySQL is running
- Check .env configuration
- Ensure port 3306 is available

### Port Already in Use
- Change PORT in .env
- Or kill process: `lsof -i :5000`

### Frontend API Errors
- Check backend is running
- Verify proxy in vite.config.js
- Check browser console for details

## 📈 Future Enhancements

- User authentication & authorization
- Role-based access control
- Advanced reporting with filters
- Email notifications
- File upload for import
- Data backup/restore
- Multi-language support

## 📝 Notes

- Default MySQL user: `root`
- Backend port: `5000`
- Frontend port: `3000`
- All times stored in GMT+7 (Việt Nam)

## 📄 License

Internal Use Only - For Military Unit Internal Use

---

**Version**: 1.0.0  
**Last Updated**: May 2026
