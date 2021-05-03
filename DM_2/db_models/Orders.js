const { DataTypes} = require('sequelize');
const sequelize = require('../config/sequelizeConfig');
const Users = require('./Users');

const Orders = sequelize.define('orders', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    foreignKey: true,
    allowNull: false,
    references: {
      model: Users,
      key: Users.id
    }
  }
}, {
  createdAt: true,
  updatedAt: false
});

// const modelsSync = async function() {
//   await Orders.sync({force: true});
//   console.log("The table for all models were just (re)created!");
// };
// modelsSync().then().catch((err) => console.error(err));

module.exports = Orders;
