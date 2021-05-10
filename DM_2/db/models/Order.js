const { Model, DataTypes } = require('sequelize');
const sequelize = require('./index');
const { User } = require('./User');

const OrderModel = class Order extends Model {};

OrderModel.init({
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
      model: { tableName: 'Users' },
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'Orders'
});

User.hasMany(OrderModel, {foreignKey: 'user_id', as: 'user'});
OrderModel.belongsTo(User, {foreignKey: 'user_id', as: 'user'});

module.exports = { OrderModel };
