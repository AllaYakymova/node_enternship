const { Model, DataTypes } = require('sequelize');
const sequelize = require('./index');
const { Product} = require('./Product');

class Unit extends Model {}

const UnitModel = Unit.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    unique: true
  },
  unit: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  }
}, {
  sequelize,
  modelName: 'Units'
});

Unit.hasMany(Product, {foreignKey: 'unit_id', as: 'unit'});
Product.belongsTo(Unit, {foreignKey: 'unit_id', as: 'unit'});



module.exports = { UnitModel };

