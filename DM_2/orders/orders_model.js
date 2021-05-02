const {client} = require('../config/bdConfig');

module.exports = class OrdersModel {
  constructor(req, res) {
    this.products = req.body.products;
    this.req = req;
    this.res = res;
  }

  reqNoBody = () => !!this.req.body;

  async getOrderId() {
    try {
      const queryNewOrder = `INSERT INTO orders (user_id) SELECT users.id from users WHERE users.phone = $1`;
      const queryOrderId = `SELECT MAX(id) FROM orders`;
      console.log(this.res.locals.user);
      await client.query(queryNewOrder, [this.res.locals.user]); // get user data from res.locals
      const getOrderId = await client.query(queryOrderId);
      this.order_id = getOrderId.rows[0].max;
      console.log(this.order_id);
    } catch (e) {
      console.log(e);
    }
  }

  async setOrderItems() {
    try {
      let orderValues = '';
      await this.products.forEach(prod => orderValues = `${orderValues} (${this.order_id}, ${prod.id}, ${prod.count}),`);
      console.log('orderValues', orderValues);
      const queryOrderItems = `INSERT INTO order_item (order_id, product_id, quantity) VALUES ${orderValues.slice(0, orderValues.length - 1)}`;
      await client.query(queryOrderItems); // add prod_id, quantity to order_item
    } catch (e) {
      console.log(e);
    }
  }

  async getOrderUserInfo() {
    try {
      const queryOrderCustomerInfo = `SELECT users.name, users.phone, users.email FROM users, orders  WHERE orders.user_id = users.id AND orders.id = $1`;
      const orderCustomerInfo = await client.query(queryOrderCustomerInfo, [this.order_id]);
      return orderCustomerInfo.rows[0];
    } catch (e) {
      console.log(e);
    }
  }

  async getOrderInfo() {
    try {
      const queryOrderInfo = `
      SELECT products.id, order_item.quantity 
      FROM products, order_item 
      WHERE order_item.order_id = $1 AND order_item.product_id = products.id`;
      const orderInfo = await client.query(queryOrderInfo, [this.order_id]);
      this.order = orderInfo.rows;
      return {products: this.order};
    } catch (e) {
      console.log(e);
    }
  }

  async getDetailOrderInfo() {
    try {
      const queryOrderDetailInfo = `SELECT products.id, products.product_name, products.price, products.amount, units.unit, order_item.quantity, products.price * order_item.quantity sum FROM products, order_item, units WHERE order_item.order_id = $1 AND order_item.product_id = products.id AND units.id = products.id_units`;
      const orderDetailInfo = await client.query(queryOrderDetailInfo, [this.order_id]);
      const prodData = orderDetailInfo.rows;
      let noProdErr = [];
      for (let prod of prodData) {  // check of products amount enough
        if (prod.amount < prod.quantity) {
          const data = {id: prod.id, amount: prod.amount};
          await noProdErr.push(data);
        }
      }
      return noProdErr.length > 0 ? noProdErr : prodData;
    } catch (e) {
      console.log(e);
    }
  }

  async getOrderTimeId() {
    try {
      const queryTime = `SELECT orders.time FROM orders WHERE orders.id = $1`;
      const time = await client.query(queryTime, [this.order_id]);
      return [time.rows[0], {id: this.order_id}];
    } catch (e) {
      console.log(e);
    }
  }

  async completeOrder() {
    try {
      await this.getOrderId();
      await this.setOrderItems();
      const user = await this.getOrderUserInfo();
      return await this.getOrderInfo(user);
    } catch (e) {
      console.log(e);
    }
  }
};

