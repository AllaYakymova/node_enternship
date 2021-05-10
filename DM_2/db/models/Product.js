const { Model, DataTypes } = require('sequelize');
const sequelize = require('./index');
const { ManufactureModel } = require('./Manufacture');
const { CategoryModel } = require('./Category');
const { UnitModel } = require('./Unit');

class Product extends Model {}

const ProductModel = Product.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    product_name: {
        type: DataTypes.STRING(1000),
        allowNull: false
    },
    manufacture_id: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        allowNull: false,
        model: { tableName: 'Manufactures' },
        key: 'id'
    },
    ingredients: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    unit_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
            model: { tableName: 'Units' },
            key: 'id'
        }
    },
    price: {
        type: DataTypes.REAL,
        allowNull: false
    },
    img_link: {
        type: DataTypes.STRING(1000)
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
            model: { tableName: 'Categories' },
            key: 'id'
        }
    }
},{
    sequelize,
    modelName: 'products'
});

Product.belongsTo(CategoryModel, {foreignKey: 'category_id', as: 'category'});
Product.belongsTo(ManufactureModel, {foreignKey: 'manufacture_id', as: 'manufacture'});
Product.belongsTo(UnitModel, {foreignKey: 'unit_id', as: 'unit'});

module.exports = { ProductModel };



