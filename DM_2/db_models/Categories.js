const { DataTypes} = require('sequelize');
const sequelize = require('../config/sequelizeConfig');

const Categories = sequelize.define('categories', {
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

module.exports = Categories;
