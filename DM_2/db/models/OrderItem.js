const {Model, DataTypes} = require('sequelize');
const sequelize = require('./index');
const {OrderModel} = require('./Order');
const {ProductModel} = require('./Product');

class OrderItem extends Model {
}

const orderItemModel = OrderItem.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  product_id: {
    type: DataTypes.INTEGER,
    foreignKey: true,
    allowNull: false,
    references: {
      model: { tableName: 'Products' },
      key: 'id',
    },
  },
  order_id: {
    type: DataTypes.INTEGER,
    foreignKey: true,
    allowNull: false,
    references: {
      model: { tableName: 'Orders' },
      key: 'id',
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
}, {
  sequelize,
  modelName: 'Order_items',
});

OrderItem.belongsTo(OrderModel, {foreignKey: 'order_id', as: 'order'});
OrderItem.belongsTo(ProductModel, {foreignKey: 'product_id', as: 'product'});

module.exports = {orderItemModel};
