const { DataTypes} = require('sequelize');
const sequelize = require('../config/sequelizeConfig');

const Units = sequelize.define('units', {
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


module.exports = Units;

