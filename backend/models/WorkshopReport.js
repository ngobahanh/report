const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Personnel = require('./Personnel');

const WorkshopReport = sequelize.define('WorkshopReport', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  training_content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  training_time: {
    type: DataTypes.DATE,
    allowNull: false
  },
  executor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Personnel,
      key: 'id'
    }
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'workshop_reports',
  timestamps: true,
  underscored: true
});

WorkshopReport.belongsTo(Personnel, { foreignKey: 'executor_id', as: 'executor' });
Personnel.hasMany(WorkshopReport, { foreignKey: 'executor_id' });

module.exports = WorkshopReport;
