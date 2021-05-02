const OrdersModel = require('./orders_model');
const ViewsClass = require('../views/view_class');

module.exports = class OrdersController {
  constructor(req, res) {
    this.orderModel = new OrdersModel(req);
    this.view = new ViewsClass(res);
  }

  async controllerOrder() {
    try {
      const result = await this.orderModel.completeOrder();
      if (this.orderModel.reqNoBody() === false) this.view.reqNoBodyView();
      if ('validErr' in result) await this.view.validErrorView(result.validErr);
      if (result.products.length === 0) await this.view.validErrorView('Empty order');

      this.customer = result.user;
      const detailData = await this.orderModel.getDetailOrderInfo();
      let data = await this.orderModel.getOrderTimeId();
      this.time = data[0].time;
      this.id = data[1].id;

      if (!!detailData[0].price) {
        this.products = detailData;
        await this.view.okView({products: result.products}, 'The order has placed successfully');
        await this.emailOrderInfo();
      } else {
        await this.view.errorProd(detailData, 'Not enough products');
      }
    } catch (err) {
      this.view.errorView(err);
    }
  }

  async emailOrderInfo() {
    try {
      const {name, phone, email} = this.customer;
      const data = { name, phone, email, time: this.time, id: this.id, products: this.products };
      return this.view.sendOrder(data);
    } catch (err) {
      this.view.errorView(err);
    }
  }
};


