const { Model, DataTypes } = require('sequelize');
const sequelize = require('./index');
const Product = require('./Product');

class Manufacture extends Model {}

Manufacture.init({
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
  sequelize,
  modelName: 'Manufacture'
});

module.exports = Manufacture;
