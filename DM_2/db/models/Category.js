const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model { }
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
  return Category;
};

