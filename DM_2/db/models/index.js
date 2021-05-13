'use strict';
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const sequelize = require('../config/db_config');
const db = {};

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
db.sequelize = sequelize;
db.Sequelize = sequelize;
db.Op = sequelize.Op;

db.User.hasMany(db.Order, {foreignKey: 'user_id'});
db.Order.belongsTo(db.User, {foreignKey: 'user_id'});

db.Category.hasMany(db.Product, {foreignKey: 'category_id'});
db.Manufacture.hasMany(db.Product, {foreignKey: 'manufacture_id'});
db.Unit.hasMany(db.Product, {foreignKey: 'unit_id'});
db.Product.belongsTo(db.Category, {foreignKey: 'category_id'});
db.Product.belongsTo(db.Manufacture, {foreignKey: 'manufacture_id'});
db.Product.belongsTo(db.Unit, {foreignKey: 'unit_id'});

db.Order.hasMany(db.Order_item, {foreignKey: 'order_id'});
db.Product.hasMany(db.Order_item, {foreignKey: 'product_id'});
db.Order_item.belongsTo(db.Order, {foreignKey: 'order_id'});
db.Order_item.belongsTo(db.Product, {foreignKey: 'product_id'});

module.exports = db;
