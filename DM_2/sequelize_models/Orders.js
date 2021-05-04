const { DataTypes} = require('sequelize');
const sequelize = require('../config/sequelizeConfig');
const Users = require('./Users');

const Orders = sequelize.define('orders', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    foreignKey: true,
    allowNull: false,
    references: {
      model: Users,
      key: Users.id
    }
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  createdAt: true,
  updatedAt: false
});

module.exports = Orders;
