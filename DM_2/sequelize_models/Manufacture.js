const { DataTypes } = require('sequelize');
const db = require('../config/sequelize_config');

const Manufacture = db.define('manufactures', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    unique: true
  },
  manufacture: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  }
},{
  createdAt: false,
    updatedAt: false
});

module.exports = Manufacture;
