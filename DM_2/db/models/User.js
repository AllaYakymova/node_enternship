const { Model, DataTypes } = require('sequelize');
const sequelize = require('./index');
const { OrderModel } = require('./Order');

class User extends Model {}

const UserModel = User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(50),
    defaultValue: null
  },
  phone: {
    type: DataTypes.STRING(15),
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING(50),
    defaultValue: null
  },
  password: {
    type: DataTypes.STRING(30),
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Users'
});

User.hasMany(OrderModel, {foreignKey: 'user_id', as: 'user'});
OrderModel.belongsTo(User, {foreignKey: 'user_id', as: 'user'});

module.exports = { UserModel };
