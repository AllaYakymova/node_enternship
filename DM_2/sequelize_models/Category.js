const { DataTypes} = require('sequelize');
const db = require('../config/sequelize_config');

const Category = db.define('categories', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    unique: true
  },
  category: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  }
}, {
  createdAt: false,
  updatedAt: false
});

module.exports = Category;
