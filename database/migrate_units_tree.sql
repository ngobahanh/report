-- Add parent_id and level columns to units table for tree structure

ALTER TABLE units ADD COLUMN parent_id INT DEFAULT NULL;
ALTER TABLE units ADD COLUMN level INT DEFAULT 0;
ALTER TABLE units ADD FOREIGN KEY (parent_id) REFERENCES units(id) ON DELETE SET NULL;

-- Update level based on parent_unit relationship
-- Level 0 for units without parent
UPDATE units SET level = 0 WHERE parent_unit IS NULL OR parent_unit = '';

-- Level 1 for units whose parent exists in parent_unit
UPDATE units u1 SET level = 1 WHERE parent_unit IN (
  SELECT unit_name FROM units u2 WHERE u2.parent_unit IS NULL OR u2.parent_unit = ''
);

-- Level 2 and beyond
UPDATE units u1 SET level = 2 WHERE level = 0 AND parent_unit IN (
  SELECT unit_name FROM units u2 WHERE u2.level = 1
);

-- Create index for faster parent lookups
CREATE INDEX idx_parent_id ON units(parent_id);
CREATE INDEX idx_level ON units(level);
