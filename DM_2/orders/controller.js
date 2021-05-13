'use strict';
const db = require('../db/models');
const OrdersModel = require('./orders_model');
const ViewsClass = require('../views/view_class');

module.exports = class OrdersController {
  constructor(req, res, next) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.products = req.body.products;
    this.orderModel = new OrdersModel(req, res);
    this.view = new ViewsClass(res);
  }
  order = {};

  async controllerOrder() {
    try {
      this.order.user = await this.orderModel.getUserData(this.req.headers.userphone, db.User);

      //check if enough products
      const notEnoughProductsData = await this.orderModel.checkIfEnoughProducts(this.products, db.Product);

     if( notEnoughProductsData.length === 0 ) {
       // set order in db & get order props (id, date)
       this.order.props = await this.orderModel.getOrderProps(this.order.user.id, db.Order);

       // set order items into db
       await this.orderModel.setOrderItems(this.order.props.id, this.products, db.Order_item);

      // send answer about placing order
       await this.view.okView(this.res, {products: this.products}, 'The order has placed successfully');

       // get details about ordered products
       this.order.productsDetails = await this.orderModel.getDetailOrderInfo(this.products, db);

       // send email with order data
       await this.emailOrderInfo();
     } else {
       throw this.view.errorData(this.res, 200, notEnoughProductsData, 'Not enough products');
     }
    } catch (err) {
      this.next(err);
    }
  }

  async emailOrderInfo() {
    try {
      const {name, phone, email} = this.order.user;
      const data = { phone: phone, name: name ? name : 'no data', email: email ? email : 'no data', time: this.order.props.createdAt, id:this.order.props.id, products: this.order.productsDetails };
      return this.view.sendOrder(data);
    } catch (err) {
      this.next(err);
    }
  }
};


