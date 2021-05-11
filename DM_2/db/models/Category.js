const { Model, DataTypes } = require('sequelize');
const sequelize = require('./index');

class Category extends Model {}

Category.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    unique: true
  },
  category: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  }
}, {
  sequelize,
  modelName: 'Category'
});


module.exports = Category;
