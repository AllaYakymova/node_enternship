const { DataTypes} = require('sequelize');
const db = require('../config/sequelize_config');

const Unit = db.define('units', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  unit: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  createdAt: false,
  updatedAt: false
});


module.exports = Unit;

