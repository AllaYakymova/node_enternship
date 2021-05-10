const { Model, DataTypes } = require('sequelize');
const sequelize = require('./index');
const { Product } = require('./Product');

class Category extends Model {}

const CategoryModel = Category.init({
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
  modelName: 'Categories'
});

Category.hasMany(Product, {foreignKey: 'category_id', as: 'category'});
Product.belongsTo(Category, {foreignKey: 'category_id', as: 'category'});


module.exports = { CategoryModel };
