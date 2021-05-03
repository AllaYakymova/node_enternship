const Products = require('./Products');
const Users = require('./Users');
const Units = require('./Units');
const Manufactures = require('./Manufactures');
const Categories = require('./Categories');
const Orders = require('./Orders');
const OrderItems = require('./OrderItems');

// const modelsSync = async function() {
//   await Products.sync({force: true});
//   await Users.sync({force: true});
//   await Units.sync({force: true});
//   await Manufactures.sync({force: true});
//   await Categories.sync({force: true});
//   await Orders.sync({force: true});
//   await OrderItems.sync({force: true});
//   console.log("The table for all models were just (re)created!");
// };
// modelsSync().then().catch((err) => console.error(err));

Products.findAll({raw:true}).then(users=> console.log(users)).catch(err => console.log(err));
