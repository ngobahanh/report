# Backend API Documentation

## 🔗 Base URL
```
http://localhost:5000/api
```

## 📋 Personnel Endpoints

### Get All Personnel
```
GET /personnel?page=1&limit=10&search=&unitId=
```

**Query Parameters:**
- `page` (default: 1) - Page number
- `limit` (default: 10) - Records per page
- `search` - Search by name, rank, position
- `unitId` - Filter by unit

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "full_name": "Nguyễn Văn A",
      "rank": "Thiếu tá",
      "position": "Chính trị viên",
      "birth_date": "1985-03-15",
      "hometown": "Hà Nội",
      "unit": {
        "id": 1,
        "unit_name": "Sư đoàn 1"
      }
    }
  ],
  "total": 50,
  "page": 1,
  "limit": 10,
  "pages": 5
}
```

### Get Personnel by ID
```
GET /personnel/:id
```

### Create Personnel
```
POST /personnel
Content-Type: application/json

{
  "full_name": "Trần Văn B",
  "rank": "Trung úy",
  "position": "Cố vấn",
  "birth_date": "1987-05-20",
  "hometown": "Hải Phòng",
  "unit_id": 1
}
```

### Update Personnel
```
PUT /personnel/:id
Content-Type: application/json

{
  "full_name": "Trần Văn B",
  "rank": "Thiếu tá",
  "position": "Chỉ huy"
}
```

### Delete Personnel
```
DELETE /personnel/:id
```

## 🏢 Units Endpoints

### Get All Units
```
GET /units?search=
```

### Create Unit
```
POST /units

{
  "unit_name": "Trung đoàn C",
  "parent_unit": "Sư đoàn 1",
  "total_devices": 20,
  "description": "Tiểu đoàn 3"
}
```

### Update Unit
```
PUT /units/:id
```

### Delete Unit
```
DELETE /units/:id
```

## 📚 Training Reports Endpoints

### Get All Training Reports
```
GET /training-reports?page=1&limit=10&startDate=2026-05-01&endDate=2026-05-31
```

### Create Training Report
```
POST /training-reports

{
  "training_content": "Huấn luyện về an toàn thông tin",
  "training_topic": "Bảo mật dữ liệu",
  "training_time": "2026-05-01T09:00:00",
  "training_hours": 4.5,
  "trainer_id": 1,
  "notes": "..."
}
```

### Update Training Report
```
PUT /training-reports/:id
```

### Delete Training Report
```
DELETE /training-reports/:id
```

### Get Statistics
```
GET /training-reports/stats
```

**Response:**
```json
[
  {
    "month": "2026-05",
    "total": 2,
    "totalHours": 10.5
  }
]
```

## 🎓 Workshop Reports Endpoints

### Get All
```
GET /workshop-reports?page=1&limit=10
```

### Create
```
POST /workshop-reports

{
  "training_content": "Tập huấn về quản lý chất lượng",
  "training_time": "2026-05-03T10:00:00",
  "executor_id": 2
}
```

## ✅ Task Reports Endpoints

### Get All
```
GET /task-reports?page=1&limit=10
```

### Create
```
POST /task-reports

{
  "report_time": "2026-05-01T08:00:00",
  "total_personnel": 50,
  "present_personnel": 48,
  "absent_personnel": 2,
  "absence_reason": "Bệnh, phép",
  "tasks": [
    {
      "task_name": "Nhiệm vụ A",
      "progress_percent": 80,
      "status": "in_progress"
    }
  ]
}
```

### Update
```
PUT /task-reports/:id
```

### Delete
```
DELETE /task-reports/:id
```

## ⚠️ Device Reports Endpoints

### Get All
```
GET /device-reports?page=1&limit=10&status=&unitId=
```

**Query Parameters:**
- `status` - "processing" hoặc "resolved"
- `unitId` - Filter by unit

### Create
```
POST /device-reports

{
  "unit_id": 1,
  "device_name": "Server A",
  "disconnect_time": "2026-05-01T14:30:00",
  "resolve_time": "2026-05-01T15:45:00",
  "cause": "Quá tải CPU",
  "solution": "Khởi động lại",
  "status": "resolved"
}
```

### Update
```
PUT /device-reports/:id
```

### Delete
```
DELETE /device-reports/:id
```

### Get Statistics
```
GET /device-reports/stats
```

**Response:**
```json
{
  "total_errors": 5,
  "processing": 2,
  "resolved": 3,
  "by_unit": [
    {
      "unit_id": 1,
      "count": 2
    }
  ]
}
```

## 📊 Dashboard Endpoints

### Get Dashboard Stats
```
GET /dashboard/stats
```

**Response:**
```json
{
  "totalPersonnel": 50,
  "totalUnits": 5,
  "totalDevices": 145,
  "deviceErrors": 2,
  "monthReports": 4
}
```

### Get Charts Data
```
GET /dashboard/charts
```

**Response:**
```json
{
  "trainingByMonth": [
    {
      "month": "2026-05",
      "count": 4
    }
  ],
  "deviceStatus": [
    {
      "status": "processing",
      "count": 2
    }
  ],
  "taskProgress": {
    "pending": 0,
    "in_progress": 0,
    "completed": 0,
    "on_hold": 0
  }
}
```

## 📥 Export Endpoints

### Export to Excel
```
GET /export/excel?reportType=training&startDate=2026-05-01&endDate=2026-05-31
```

**Query Parameters:**
- `reportType` - training, workshop, task, device
- `startDate` - YYYY-MM-DD
- `endDate` - YYYY-MM-DD

**Response:** Excel file download

### Export to PDF
```
GET /export/pdf?reportType=training&startDate=2026-05-01&endDate=2026-05-31
```

**Response:** PDF file download

## 🔍 Health Check
```
GET /health
```

**Response:**
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

## ⚙️ Status Codes

- `200` - OK
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Server Error

## 🔐 Error Response

```json
{
  "error": "Error message here"
}
```

## 📦 Common Data Types

### Personnel Object
```json
{
  "id": 1,
  "full_name": "Nguyễn Văn A",
  "rank": "Thiếu tá",
  "position": "Chính trị viên",
  "birth_date": "1985-03-15T00:00:00.000Z",
  "hometown": "Hà Nội",
  "enlistment_date": "2005-07-01",
  "party_join_date": "2008-06-15",
  "unit_id": 1
}
```

### Unit Object
```json
{
  "id": 1,
  "unit_name": "Sư đoàn 1",
  "parent_unit": "Quân khu 1",
  "total_devices": 50,
  "description": "Sư đoàn bộ binh"
}
```

### TaskDetail Object
```json
{
  "id": 1,
  "task_report_id": 1,
  "task_name": "Nhiệm vụ A",
  "progress_percent": 80,
  "status": "in_progress"
}
```

---

**API Version**: 1.0.0
