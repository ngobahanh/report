const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Unit = sequelize.define('Unit', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  unit_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },
  parent_unit: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  parent_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'units',
      key: 'id'
    }
  },
  level: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  total_devices: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'units',
  timestamps: true,
  underscored: true
});

// Self-association for tree structure
Unit.belongsTo(Unit, {
  as: 'parent',
  foreignKey: 'parent_id'
});

Unit.hasMany(Unit, {
  as: 'children',
  foreignKey: 'parent_id'
});

module.exports = Unit;
