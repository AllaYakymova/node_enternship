const { DataTypes} = require('sequelize');
const sequelize = require('../config/sequelizeConfig');

const Manufactures = sequelize.define('manufactures', {
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

module.exports = Manufactures;
