const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
  }

  Order.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      foreignKey: true,
      allowNull: false,
      references: {
        model: {tableName: 'users'},
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};
