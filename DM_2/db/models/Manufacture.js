const { Model, DataTypes } = require('sequelize');
const sequelize = require('./index');
const { Product } = require('./Product');

class Manufacture extends Model {}

const ManufactureModel = Manufacture.init({
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
  modelName: 'Manufactures'
});

Manufacture.hasMany(Product, {foreignKey: 'manufacture_id', as: 'manufacture'});
Product.belongsTo(Manufacture, {foreignKey: 'manufacture_id', as: 'manufacture'});

module.exports = { ManufactureModel };
