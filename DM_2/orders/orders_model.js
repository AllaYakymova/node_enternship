const {client} = require('../config');
const {validationSchema} = require('../validation/validation');

module.exports = class OrdersModel {
  constructor(req) {
    this.customer_name = req.body.user.name;
    this.customer_phone = req.body.user.phone;
    this.customer_email = req.body.user.email;
    this.products = req.body.products;
    this.req = req;
  }

  reqNoBody = () => !!this.req.body;

  formValidation = () => validationSchema(this.customer_name, this.customer_phone, this.customer_email, this.products);

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

  async getOrderId() {
    try {
      const queryNewOrder = `INSERT INTO orders (customer_id) SELECT customers.id from customers WHERE customers.phone = $1`;
      const queryOrderId = `SELECT MAX(id) FROM orders`;
      await client.query(queryNewOrder, [this.customer_phone]);
      const getOrderId = await client.query(queryOrderId);
      this.order_id = getOrderId.rows[0].max;
    } catch (e) {
      console.log(e);
    }
  }

  async setOrderItems() {
    try {
      let orderValues = '';
      await this.products.forEach(prod => orderValues = `${orderValues} (${this.order_id}, ${prod.id}, ${prod.count}),`);
      const queryOrderItems = `INSERT INTO order_item (order_id, product_id, quantity) VALUES ${orderValues.slice(0, orderValues.length - 1)}`;
      await client.query(queryOrderItems); // add prod_id, quantity to order_item
    } catch (e) {
      console.log(e);
    }
  }

  async getOrderCustomerInfo() {
    try {
      const queryOrderCustomerInfo = `SELECT customers.name, customers.phone, customers.email FROM customers, orders  WHERE orders.customer_id = customers.id AND orders.id = $1`;
      const orderCustomerInfo = await client.query(queryOrderCustomerInfo, [this.order_id]);
      return orderCustomerInfo.rows[0];
    } catch (e) {
      console.log(e);
    }
  }

  async getOrderInfo(user) {
    try {
      const queryOrderInfo = `
      SELECT products.id, order_item.quantity 
      FROM products, order_item 
      WHERE order_item.order_id = $1 AND order_item.product_id = products.id`;
      const orderInfo = await client.query(queryOrderInfo, [this.order_id]);
      this.order = orderInfo.rows;
      return {user: user, products: this.order};
    } catch (e) {
      console.log(e);
    }
  }

  async getDetailOrderInfo() {
    try {
      const queryOrderDetailInfo = `
      SELECT products.id, products.product_name, products.price, products.amount, units.unit, order_item.quantity, products.price * order_item.quantity sum 
      FROM products, order_item, units 
      WHERE order_item.order_id = $1 AND order_item.product_id = products.id AND units.id = products.id_units`;
      const orderDetailInfo = await client.query(queryOrderDetailInfo, [this.order_id]);
      const prodData = orderDetailInfo.rows;
      let noProdErr = [];
      for(let prod of prodData) {
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
      return [time.rows[0], {id: this.order_id} ];
    } catch (e) {
      console.log(e);
    }
  }

  async completeOrder() {
    try {
      let isValid = await this.formValidation();
      if (Object.values(isValid).some(el => el !== true)) {
        if (isValid.name === false) return {validErr: 'user info (name) is not valid.'};
        if (isValid.phone === false) return {validErr: 'user info (phone) is not valid.'};
        if (isValid.email === false) return {validErr: 'user info (email) is not valid.'};
        if (isValid.id === false) return {validErr: 'The product id is not valid'};
        if (isValid.dataFields === false) return {validErr: 'The products fields are not valid'};
      } else {
        await this.createOrder();
        await this.getOrderId();
        await this.setOrderItems();
        const user = await this.getOrderCustomerInfo();
        return await this.getOrderInfo(user);
      }
    } catch (e) {
      console.log(e);
    }
  }
};

