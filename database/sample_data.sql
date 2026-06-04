-- Sample Data for Report System

-- Insert Units
INSERT INTO units (unit_name, parent_unit, total_devices, description) VALUES
('Sư đoàn 1', 'Quân khu 1', 50, 'Sư đoàn bộ binh'),
('Trung đoàn A', 'Sư đoàn 1', 25, 'Trung đoàn A - Tiểu đoàn 1'),
('Trung đoàn B', 'Sư đoàn 1', 25, 'Trung đoàn B - Tiểu đoàn 2'),
('Trung tâm Thông tin', 'Sư đoàn 1', 30, 'Trung tâm Công nghệ Thông tin'),
('Bộ Tham mưu', 'Sư đoàn 1', 15, 'Bộ Tham mưu - Ban Điều hành');

-- Insert Personnel
INSERT INTO personnel (full_name, rank, position, birth_date, hometown, enlistment_date, party_join_date, unit_id) VALUES
('Nguyễn Văn A', 'Thiếu tá', 'Chính trị viên', '1985-03-15', 'Hà Nội', '2005-07-01', '2008-06-15', 1),
('Trần Thị B', 'Trung úy', 'Cố vấn', '1987-05-20', 'Hải Phòng', '2006-09-01', '2010-12-10', 1),
('Phạm Minh C', 'Thiếu úy', 'Quân nhân', '1990-08-10', 'TP Hồ Chí Minh', '2008-01-15', '2011-03-20', 2),
('Vũ Đức D', 'Thiếu tá', 'Kỹ thuật viên', '1988-12-05', 'Đà Nẵng', '2007-06-01', '2009-11-15', 3),
('Hoàng Văn E', 'Trung tá', 'Giám đốc', '1980-01-12', 'Hà Nội', '2002-03-01', '2005-08-10', 4),
('Lê Thị F', 'Thiếu úy', 'Nhân viên IT', '1992-06-30', 'Cần Thơ', '2010-07-15', '2014-09-20', 4),
('Đặng Quốc G', 'Trung úy', 'Kỹ sư', '1989-02-14', 'Bắc Ninh', '2007-08-01', '2011-10-15', 5),
('Bùi Văn H', 'Thiếu tá', 'Phó Giám đốc', '1986-09-22', 'Thái Nguyên', '2004-05-01', '2007-12-20', 5);

-- Insert Training Reports
INSERT INTO training_reports (training_content, training_topic, training_time, training_hours, trainer_id) VALUES
('Huấn luyện về an toàn thông tin', 'Bảo mật dữ liệu', '2026-05-01 09:00:00', 4.5, 1),
('Huấn luyện về sử dụng hệ thống', 'Hệ thống quản lý', '2026-05-05 10:00:00', 6, 1),
('Huấn luyện kỹ năng lãnh đạo', 'Lãnh đạo đội ngũ', '2026-05-10 08:00:00', 8, 3),
('Huấn luyện về quy trình kỹ thuật', 'Quy trình kỹ thuật', '2026-05-15 14:00:00', 5, 5);

-- Insert Workshop Reports
INSERT INTO workshop_reports (training_content, training_time, executor_id) VALUES
('Tập huấn về quản lý chất lượng', '2026-05-03 10:00:00', 2),
('Tập huấn về giao tiếp hiệu quả', '2026-05-08 09:00:00', 4),
('Tập huấn kỹ năng mềm', '2026-05-12 13:00:00', 6);

-- Insert Task Reports
INSERT INTO task_reports (report_time, total_personnel, present_personnel, absent_personnel, absence_reason) VALUES
('2026-05-01 08:00:00', 50, 48, 2, 'Bệnh, phép'),
('2026-05-02 08:00:00', 50, 50, 0, ''),
('2026-05-05 08:00:00', 50, 49, 1, 'Bệnh');

-- Insert Task Details
INSERT INTO task_details (task_report_id, task_name, progress_percent, status) VALUES
(1, 'Nhiệm vụ A - Bảo trì hệ thống', 80, 'in_progress'),
(1, 'Nhiệm vụ B - Cập nhật tài liệu', 100, 'completed'),
(1, 'Nhiệm vụ C - Kiểm tra an toàn', 50, 'in_progress'),
(2, 'Nhiệm vụ D - Đào tạo nhân viên', 75, 'in_progress'),
(2, 'Nhiệm vụ E - Báo cáo hàng tuần', 100, 'completed');

-- Insert Device Connection Reports
INSERT INTO device_reports (unit_id, device_name, disconnect_time, resolve_time, cause, solution, status) VALUES
(1, 'Server A', '2026-05-01 14:30:00', '2026-05-01 15:45:00', 'Quá tải CPU', 'Khởi động lại và cân bằng tải', 'resolved'),
(2, 'Máy chủ DNS', '2026-05-02 10:20:00', NULL, 'Lỗi kết nối mạng', 'Chờ kỹ thuật viên kiểm tra', 'processing'),
(3, 'Router chính', '2026-05-03 11:15:00', '2026-05-03 12:00:00', 'Mất điện', 'Khôi phục điện và khởi động lại', 'resolved'),
(4, 'Firewall', '2026-05-04 16:45:00', NULL, 'Cập nhật hệ thống', 'Đang chờ cập nhật xong', 'processing'),
(5, 'Máy in chia sẻ', '2026-05-05 09:30:00', '2026-05-05 09:45:00', 'Giấy kẹt', 'Giải phóng giấy kẹt', 'resolved');
