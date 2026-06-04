const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Personnel = require('./Personnel');

const TrainingReport = sequelize.define('TrainingReport', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  training_content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  training_topic: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  training_time: {
    type: DataTypes.DATE,
    allowNull: false
  },
  training_hours: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false
  },
  trainer_id: {
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
  tableName: 'training_reports',
  timestamps: true,
  underscored: true
});

TrainingReport.belongsTo(Personnel, { foreignKey: 'trainer_id', as: 'trainer' });
Personnel.hasMany(TrainingReport, { foreignKey: 'trainer_id' });

module.exports = TrainingReport;
