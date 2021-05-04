'use strict';
const OrdersModel = require('./orders_model');
const ViewsClass = require('../views/view_class');

module.exports = class OrdersController {
  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.orderModel = new OrdersModel(req, res);
    this.view = new ViewsClass(res);
  }

  async controllerOrder() {
    try {
      const result = await this.orderModel.completeOrder();
      const detailData = await this.orderModel.getDetailOrderInfo();
      if (!!detailData[0].price) {
        this.products = detailData;
        await this.view.okView(this.res, {products: result.products}, 'The order has placed successfully');
        await this.emailOrderInfo();
      } else {
        await this.view.errorData(this.res, 200, detailData, 'Not enough products');
      }
    } catch (err) {
      this.view.errorView(err, this.res);
    }
  }

  async emailOrderInfo() {
    try {
      const {name, phone, email} = this.orderModel.user;
      const data = { phone: phone, name: name ? name : 'no data', email: email ? email : 'no data', time: this.orderModel.order_createdAt, id: this.orderModel.order_id, products: this.products };
      return this.view.sendOrder(data);
    } catch (err) {
      this.view.errorView(err, this.res);
    }
  }
};


