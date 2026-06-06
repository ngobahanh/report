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
  },
  responsible_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'personnel',
      key: 'id'
    },
    onDelete: 'SET NULL'
  },
  due_date: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'task_details',
  timestamps: true,
  underscored: true
});

// Association with Personnel
TaskDetail.belongsTo(require('./Personnel'), {
  foreignKey: 'responsible_id',
  as: 'responsible'
});

module.exports = TaskDetail;
