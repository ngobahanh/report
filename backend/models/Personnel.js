const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Unit = require('./Unit');

const Personnel = sequelize.define('Personnel', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  full_name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  rank: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  position: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  birth_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  hometown: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  enlistment_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  party_join_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  work_history: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  father_name: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  mother_name: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  spouse_name: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  children: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  unit_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Unit,
      key: 'id'
    }
  }
}, {
  tableName: 'personnel',
  timestamps: true,
  underscored: true
});

Personnel.belongsTo(Unit, { foreignKey: 'unit_id', as: 'unit' });
Unit.hasMany(Personnel, { foreignKey: 'unit_id', as: 'staff' });

module.exports = Personnel;
