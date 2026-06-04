const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TaskDetail = sequelize.define('TaskDetail', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  task_report_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'task_reports',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  task_name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  progress_percent: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  status: {
    type: DataTypes.ENUM('pending', 'in_progress', 'completed', 'on_hold'),
    defaultValue: 'pending'
  }
}, {
  tableName: 'task_details',
  timestamps: true,
  underscored: true
});

module.exports = TaskDetail;
