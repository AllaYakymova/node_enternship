const { DataTypes} = require('sequelize');
const db = require('../config/sequelize_config');
const Manufactures = require('./Manufacture');
const Categories = require('./Category');
const Units = require('./Unit');

const Product = db.define('products', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    product_name: {
        type: DataTypes.STRING(1000),
        allowNull: false
    },
    id_manufacture: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        allowNull: false,
        references: {
            model: Manufactures,
            key: Manufactures.id
        }
    },
    ingredients: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_units: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
            model: Units,
            key: Units.id
        }
    },
    price: {
        type: DataTypes.REAL,
        allowNull: false
    },
    img_link: {
        type: DataTypes.STRING(1000)
    },
    id_category: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
            model: Categories,
            key: Categories.id
        }
    }
},{
    createdAt: false,
    updatedAt: false
});

module.exports = Product;



