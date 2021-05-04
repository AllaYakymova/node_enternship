const { DataTypes, Deferrable} = require('sequelize');
const sequelize = require('../config/sequelizeConfig');
const Orders = require('./Orders');
const Products = require('./Products');

const OrderItems = sequelize.define('order_items', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    unique: true
  },
  product_id: {
    type: DataTypes.INTEGER,
    foreignKey: true,
    allowNull: false,
    references: {
      model: Products,
      key: Products.id,
      deferrable: Deferrable.INITIALLY_IMMEDIATE //  насколько нужно?
    }
  },
  order_id: {
    type: DataTypes.INTEGER,
    foreignKey: true,
    allowNull: false,
    references: {
      model: Orders,
      key: Orders.id
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  }
}, {
  createdAt: false,
  updatedAt: false
});

module.exports = OrderItems;
