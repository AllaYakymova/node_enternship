'use strict';
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const dotenv = require('dotenv');
dotenv.config({path:__dirname+'../../.env'});
const sequelize = require('../index');
// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.js')[env];
const db = {};

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// User.hasMany(Order, {foreignKey: 'user_id', as: 'user'});
// Order.belongsTo(User, {foreignKey: 'user_id', as: 'user'});

// Category.hasMany(Product, {foreignKey: 'category_id', as: 'category'});
// Manufacture.hasMany(Product, {foreignKey: 'manufacture_id', as: 'manufacture'});
// Unit.hasMeny(Product, {foreignKey: 'unit_id', as: 'unit'});
// Product.belongsTo(Category, {foreignKey: 'category_id', as: 'category'});
// Product.belongsTo(Manufacture, {foreignKey: 'manufacture_id', as: 'manufacture'});
// Product.belongsTo(Unit, {foreignKey: 'unit_id', as: 'unit'});

// Order.hasMany(OrderItem, {foreignKey: 'order_id', as: 'order'});
// Product.hasMany(OrderItem, {foreignKey: 'product_id', as: 'product'});
// OrderItem.belongsTo(Order, {foreignKey: 'order_id', as: 'order'});
// OrderItem.belongsTo(Product, {foreignKey: 'product_id', as: 'product'});



module.exports = db;
