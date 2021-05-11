const { Model, DataTypes } = require('sequelize');
const sequelize = require('./index');

class Unit extends Model {}

Unit.init({
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
  modelName: 'Unit'
});



module.exports = Unit;

