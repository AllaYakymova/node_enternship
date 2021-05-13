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

      const notEnoughProductsData = await this.orderModel.checkIfEnoughProducts(this.products, db.Product);
      console.log('this.products', this.products);

     if( notEnoughProductsData.length === 0 ) {

       this.order.props = await this.orderModel.getOrderProps(this.order.user.id, db.Order);

       await this.orderModel.setOrderItems(this.order.props.id, this.products, db.Order_item);

       this.order.products = await this.orderModel.getOrderInfo(this.order.props.id, db.Order_item);

       await this.view.okView(this.res, {products: this.products}, 'The order has placed successfully');

       this.order.productsDetails = await this.orderModel.getDetailOrderInfo(this.order.products, db);

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


