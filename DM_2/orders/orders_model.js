const {client} = require('../config');

module.exports = class OrdersModel {
  constructor(req) {
    this.customer_name = req.body.user.name;
    this.customer_phone = req.body.user.phone;
    this.customer_email = req.body.user.email;
    this.products = req.body.products;
    // this.order_id;
    this.order = [];
    this.req = req;
  }

  reqNoBody() {
    if (!this.req.body) return false
  }

  async createOrder() {
    try {
      const queryIsCustomer = `SELECT COUNT(id) FROM customers WHERE phone = $1`;
      const queryNewCustomer = `INSERT INTO customers (name, phone, email) VALUES ($1, $2, $3)`;
      const resultAuth = await client.query(queryIsCustomer, [this.customer_phone]);
      const isExist = +resultAuth.rows[0].count;
      if (!isExist) {
        await client.query(queryNewCustomer, [this.customer_name, this.customer_phone, this.customer_email]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  async getOrderId () {
    try {
      await this.createOrder();
      const queryNewOrder = `INSERT INTO orders (customer_id) SELECT customers.id from customers WHERE customers.phone = $1`;
      const queryOrderId = `SELECT MAX(id) FROM orders`;
      await client.query(queryNewOrder, [this.customer_phone]);
      const getOrderId = await client.query(queryOrderId);
      this.order_id = getOrderId.rows[0].max;
    } catch (e) {
      console.log(e);
    }
  }

  async setOrderItems () {
    try {
      await this.getOrderId();
      let orderValues = '';
      await this.products.forEach(prod => orderValues = `${orderValues} (${this.order_id}, ${prod.id}, ${prod.count}),`);
      const queryOrderItems = `INSERT INTO order_item (order_id, product_id, quantity) VALUES ${orderValues.slice(0, orderValues.length-1)}`;
      let q = await client.query(queryOrderItems); // add prod_id, quantity to order_item
      console.log(q);
    } catch (e) {
      console.log(e);
    }
  }

  async getOrderCustomerInfo () {
    try {
      await this.setOrderItems();
      const queryOrderCustomerInfo = `SELECT customers.name, customers.phone, customers.email, orders.id FROM customers, orders  WHERE orders.customer_id = customers.id AND orders.id = $1`;
      const orderCustomerInfo = await client.query(queryOrderCustomerInfo, [this.order_id]);
      return orderCustomerInfo.rows[0];
    } catch (e) {
      console.log(e);
    }
  }

  async getOrderInfo () {
    try {
      const user = await this.getOrderCustomerInfo();
      const queryOrderInfo = `
      SELECT products.product_name, order_item.quantity 
      FROM products, order_item 
      WHERE order_item.order_id = $1 AND order_item.product_id = products.id`;
      const queryOrderDetailInfo = `
      SELECT products.product_name, products.price, products.amount, order_item.quantity, products.price * order_item.quantity sum 
      FROM products, order_item 
      WHERE order_item.order_id = $1 AND order_item.product_id = products.id`;
      const orderInfo = await client.query(queryOrderInfo, [this.order_id]);
      this.order = orderInfo.rows;
      const orderDetailInfo = await client.query(queryOrderDetailInfo, [this.order_id]);
      console.log('orderInfo', orderInfo.rows, 'orderDetailInfo', orderDetailInfo.rows);
      return {user: user, products: this.order, details: orderDetailInfo.rows};
    } catch (e) {
      console.log(e);
    }
  }
};

