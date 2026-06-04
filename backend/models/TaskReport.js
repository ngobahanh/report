const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TaskReport = sequelize.define('TaskReport', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  report_time: {
    type: DataTypes.DATE,
    allowNull: false
  },
  total_personnel: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  present_personnel: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  absent_personnel: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  absence_reason: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'task_reports',
  timestamps: true,
  underscored: true
});

module.exports = TaskReport;
