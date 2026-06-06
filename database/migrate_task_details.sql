-- Add new columns to task_details table for enhanced task information

ALTER TABLE task_details ADD COLUMN responsible_id INT DEFAULT NULL;
ALTER TABLE task_details ADD COLUMN due_date DATETIME DEFAULT NULL;
ALTER TABLE task_details ADD FOREIGN KEY (responsible_id) REFERENCES personnel(id) ON DELETE SET NULL;

-- Create index for faster lookups
CREATE INDEX idx_responsible_id ON task_details(responsible_id);
CREATE INDEX idx_due_date ON task_details(due_date);
