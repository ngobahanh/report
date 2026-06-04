-- Create Database
CREATE DATABASE IF NOT EXISTS report_system;
USE report_system;

-- Units Table
CREATE TABLE IF NOT EXISTS units (
  id INT AUTO_INCREMENT PRIMARY KEY,
  unit_name VARCHAR(255) NOT NULL UNIQUE,
  parent_unit VARCHAR(255),
  total_devices INT DEFAULT 0,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Personnel Table
CREATE TABLE IF NOT EXISTS personnel (
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
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (unit_id) REFERENCES units(id) ON DELETE SET NULL
);

-- Training Reports Table
CREATE TABLE IF NOT EXISTS training_reports (
  id INT AUTO_INCREMENT PRIMARY KEY,
  training_content TEXT NOT NULL,
  training_topic VARCHAR(255) NOT NULL,
  training_time DATETIME NOT NULL,
  training_hours DECIMAL(5, 2) NOT NULL,
  trainer_id INT NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (trainer_id) REFERENCES personnel(id) ON DELETE CASCADE
);

-- Workshop Reports Table
CREATE TABLE IF NOT EXISTS workshop_reports (
  id INT AUTO_INCREMENT PRIMARY KEY,
  training_content TEXT NOT NULL,
  training_time DATETIME NOT NULL,
  executor_id INT NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (executor_id) REFERENCES personnel(id) ON DELETE CASCADE
);

-- Task Reports Table
CREATE TABLE IF NOT EXISTS task_reports (
  id INT AUTO_INCREMENT PRIMARY KEY,
  report_time DATETIME NOT NULL,
  total_personnel INT NOT NULL,
  present_personnel INT NOT NULL,
  absent_personnel INT NOT NULL,
  absence_reason TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Task Details Table
CREATE TABLE IF NOT EXISTS task_details (
  id INT AUTO_INCREMENT PRIMARY KEY,
  task_report_id INT NOT NULL,
  task_name VARCHAR(255) NOT NULL,
  progress_percent INT DEFAULT 0,
  status ENUM('pending', 'in_progress', 'completed', 'on_hold') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (task_report_id) REFERENCES task_reports(id) ON DELETE CASCADE
);

-- Device Reports Table
CREATE TABLE IF NOT EXISTS device_reports (
  id INT AUTO_INCREMENT PRIMARY KEY,
  unit_id INT NOT NULL,
  device_name VARCHAR(255) NOT NULL,
  disconnect_time DATETIME NOT NULL,
  resolve_time DATETIME,
  cause TEXT NOT NULL,
  solution TEXT,
  status ENUM('processing', 'resolved') DEFAULT 'processing',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (unit_id) REFERENCES units(id) ON DELETE CASCADE
);

-- Create Indexes
CREATE INDEX idx_personnel_unit_id ON personnel(unit_id);
CREATE INDEX idx_training_time ON training_reports(training_time);
CREATE INDEX idx_training_trainer_id ON training_reports(trainer_id);
CREATE INDEX idx_workshop_time ON workshop_reports(training_time);
CREATE INDEX idx_workshop_executor_id ON workshop_reports(executor_id);
CREATE INDEX idx_task_report_time ON task_reports(report_time);
CREATE INDEX idx_device_unit_id ON device_reports(unit_id);
CREATE INDEX idx_device_status ON device_reports(status);
CREATE INDEX idx_device_time ON device_reports(disconnect_time);
