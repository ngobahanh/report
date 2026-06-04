const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Unit = require('./Unit');

const DeviceReport = sequelize.define('DeviceReport', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  unit_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Unit,
      key: 'id'
    }
  },
  device_name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  disconnect_time: {
    type: DataTypes.DATE,
    allowNull: false
  },
  resolve_time: {
    type: DataTypes.DATE,
    allowNull: true
  },
  cause: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  solution: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('processing', 'resolved'),
    defaultValue: 'processing'
  }
}, {
  tableName: 'device_reports',
  timestamps: true,
  underscored: true
});

DeviceReport.belongsTo(Unit, { foreignKey: 'unit_id', as: 'unit' });
Unit.hasMany(DeviceReport, { foreignKey: 'unit_id' });

module.exports = DeviceReport;
