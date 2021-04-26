'use strict';
const OrdersModel = require('./orders_model');
const Views = require('../view/index');
const {corsDefender} = require('../helpers/cors_defender');

module.exports = class OrdersController {
  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.orderModel = new OrdersModel(req);
    this.view = new Views(res);
  }

  controllerOrderInfo() {
    if(this.orderModel.reqNoBody() === false) {
      this.view.reqNoBodyView()
    }
    this.orderModel.getOrderInfo()
      .then(result => {
        console.log(result);

        this.view.okView(this.res, {user: result.user, products: result.products}, "The order has made successfully");

      })
      .catch(err => this.view.errorView(err));
  }
};
// const myOrdersController = new OrdersController();

// exports.OrdersController = (req, res) => {
//   try {
//     const {user, products} = req.body;
//     // corsDefender(res);
//     const name = user.name;
//     const phone = user.phone;
//     const email = user.email;
//     const queryIsCustomer = `SELECT COUNT(id) FROM customers WHERE phone = $1`;
//     const queryNewCustomer = `INSERT INTO customers (name, phone, email) VALUES ($1, $2, $3)`;
//
//     const queryNewOrder = `INSERT INTO orders (customer_id) SELECT customers.id from customers WHERE customers.phone = $1`;
//     const queryOrderId = `SELECT MAX(id) FROM orders`;
//
//     const queryOrderCustomerInfo = `SELECT customers.name, customers.phone, customers.email, orders.id FROM customers, orders  WHERE orders.customer_id = customers.id AND orders.id = $1`;
//     const queryOrderInfo = `SELECT products.product_name, products.price, products.amount, order_item.quantity, products.price * order_item.quantity sum FROM products, order_item WHERE order_item.order_id = $1 AND order_item.product_id = products.id`;
//     const resultAuth = await client.query(queryIsCustomer, [phone]);
//     // await client.query(`INSERT INTO customer (name, phone_No, email) VALUES ($1, $2, $3)`, [user.name, user.phone, user.email]);
//     const isExist = +resultAuth.rows[0].count;
//     if (!isExist) {
//       await client.query(queryNewCustomer, [name, phone, email]);
//     }
//
//     await client.query(queryNewOrder, [phone]);
//     const getOrderId = await client.query(queryOrderId);
//     const orderId = getOrderId.rows[0].max; // id order
//
//     let orderValues = '';
//     products.forEach(prod => orderValues = `${orderValues} (${orderId}, ${prod.id}, ${prod.count}),`);
//
//     const queryOrderItems = `INSERT INTO order_item (order_id, product_id, quantity) VALUES ${orderValues.slice(0, orderValues.length-1)}`;
//     await client.query(queryOrderItems); // add prod_id, quantity to order_item
//
//     const orderCustomerInfo = await client.query(queryOrderCustomerInfo, [orderId]);
//     console.log(orderCustomerInfo.rows[0]);
//
//     const orderInfo = await client.query(queryOrderInfo, [orderId]);
//     await console.log(orderInfo.rows);
//     // orderInfo.rows.slice(0,products.length)
//     res.status(200)
//       .json({status: 'ok', data: {order: orderInfo.rows, user: orderCustomerInfo.rows[0]}, message: 'Order is created'});
//   } catch (err) {
//     res.status(400)
//       .json({status: 'not ok', message: err.stack});
//   }
// };

