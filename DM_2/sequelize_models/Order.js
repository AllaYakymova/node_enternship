const { DataTypes} = require('sequelize');
const db = require('../config/sequelize_config');
const Users = require('./User');

const Order = db.define('orders', {
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

module.exports = Order;
