const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Product extends Model {
  }

  Product.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    product_name: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    manufacture_id: {
      type: DataTypes.INTEGER,
      foreignKey: true,
      allowNull: false,
      references: {
        model: {tableName: 'manufactures'},
        key: 'id',
      },
    },
    ingredients: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    unit_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true,
      references: {
        model: {tableName: 'units'},
        key: 'id',
      },
    },
    price: {
      type: DataTypes.REAL,
      allowNull: false,
    },
    img_link: {
      type: DataTypes.STRING(1000),
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true,
      references: {
        model: {tableName: 'categories'},
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};



