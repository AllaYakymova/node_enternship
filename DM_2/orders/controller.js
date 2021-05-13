'use strict';
const db = require('../db/models');
const asyncHandler = require('../common/asyncHandler');
const OrdersModel = require('./orders_model');
const ViewsClass = require('../views/view_class');

class OrdersController {
  constructor() {
    this.orderModel = new OrdersModel();
    this.view = new ViewsClass();
  }
  order = {};

  controllerOrder = asyncHandler(async (req, res, next) => {
    const products = req.body.products;

    this.order.user = await this.orderModel.getUserData(req.headers.userphone, db.User);

    //check if enough products
    const notEnoughProductsData = await this.orderModel.checkIfEnoughProducts(products, db.Product);

    if (notEnoughProductsData.length === 0) {
      // set order in db & get order props (id, date)
      this.order.props = await this.orderModel.getOrderProps(this.order.user.id, db.Order);

      // set order items into db
      await this.orderModel.setOrderItems(this.order.props.id, products, db.Order_item);

      // send answer about placing order
      await this.view.okView(res, {products: products}, 'The order has placed successfully');

      // get details about ordered products
      this.order.productsDetails = await this.orderModel.getDetailOrderInfo(products, db);

      console.log(this.order);
      // send email with order data
      await this.emailOrderInfo();
    } else {
      throw this.view.errorData(res, 200, notEnoughProductsData, 'Not enough products');
    }
  });

  emailOrderInfo = asyncHandler(async () => {
    const {name, phone, email} = this.order.user;
    const data = {
      phone: phone,
      name: name ? name : 'no data',
      email: email ? email : 'no data',
      time: this.order.props.createdAt,
      id: this.order.props.id,
      products: this.order.productsDetails,
    };
    return this.view.sendOrder(data);
  });
}

module.exports = new OrdersController();


