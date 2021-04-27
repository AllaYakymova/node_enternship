const OrdersModel = require('./orders_model');
const ViewsClass = require('../view/view_class');

module.exports = class OrdersController {
  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.orderDetails = {};
    this.orderModel = new OrdersModel(req);
    this.view = new ViewsClass(res);
  }

  async controllerOrder() {
    try {
      if (this.orderModel.reqNoBody() === false) this.view.reqNoBodyView();
      const result = await this.orderModel.getOrderInfo();
      await this.view.okView(this.res, { user: result.user, products: result.products }, 'The order has made successfully');
      // await this.displayOrderInfo();
    } catch (err) {
      this.view.errorView(err);
    }
  }

  async displayOrderInfo() {
    try {
      const customer = await this.orderModel.getOrderCustomerInfo();
      const products = await this.orderModel.getDetailOrderInfo();
      const {name, phone, email, id} = customer;
      this.orderDetails = {
        id: id,
        name: name,
        phone: phone,
        email: email,
        products: products
      };
      await this.view.displayOrder(this.orderDetails);
      // await this.displayOrderInfo();
    } catch (err) {
      this.view.errorView(err);
    }
  }
};
