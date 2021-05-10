const { DataTypes } = require('sequelize');
const db = require('../config/sequelize_config');

const User = db.define('users', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    defaultValue: null
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    defaultValue: null
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  createdAt: false,
  updatedAt: false
});

module.exports = User;
