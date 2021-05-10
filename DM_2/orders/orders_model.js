const DefaultError = require('../exceptions/default_error');
const Orders = require('../db/models/Order');
const Users = require('../db/models/User');
const OrderItems = require('../db/models/OrderItem');
const Products = require('../db/models/Product');
const Units = require('../db/models/Unit');
const Manufactures = require('../db/models/Manufacture');
const Categories = require('../db/models/Category');

module.exports = class OrdersModel {
  constructor(req, res) {
    this.products = req.body.products;
    this.req = req;
    this.res = res;
  }

  async getUserData() {
    try {
      const getUserId = await Users.findAll({
        attributes: ['id', 'name', 'phone', 'email'],
        where: {phone: this.req.headers.userphone},
      });
      this.user = getUserId[0].dataValues;
      console.log('this.user', this.user);
    } catch (err) {
      throw new DefaultError(400, err.stack);
    }
  }

  async getOrderId() {
    try {
      const newOrder = await Orders.create({user_id: this.user.id});
      this.order_id = newOrder.dataValues.id;
      this.order_createdAt = newOrder.dataValues.createdAt;
    } catch (err) {
      throw new DefaultError(400, err.stack);
    }
  }

  async setOrderItems() {
    try {
      for (let prod of this.products) {
        await OrderItems.create({
          order_id: this.order_id,
          product_id: prod.id,
          quantity: prod.count,
        });
      }
    } catch (err) {
      throw new DefaultError(400, err.stack);
    }
  }

  async getOrderInfo() {
    try {
      const order = await OrderItems.findAll({
        attributes: [['product_id', 'id'], 'quantity'],
        where: {order_id: this.order_id},
      });
      this.order = order.map(el => el.dataValues);
      return {products: this.order};
    } catch (err) {
      throw new DefaultError(400, err.stack);
    }
  }

  async getDetailOrderInfo() {
    try {
      let prodsArr = [];
      let noProdErr = [];
      for (let item of this.order) {
        const prodValues = await Products.findAll({where: {id: item.id}});
        const product = prodValues[0].dataValues;
        const unit = await Units.findOne({where: {id: product.id_units}});
        const manufacture = await Manufactures.findOne({where: {id: product.id_manufacture}});
        const category = await Categories.findOne({where: {id: product.id_category}});
        const quantity = await OrderItems.findOne({
          where: {product_id: product.id, quantity: item.quantity},
        });

        product.unit = unit.dataValues.unit;
        product.category = category.dataValues.category;
        product.manufacture = manufacture.dataValues.manufacture;
        product.quantity = quantity.dataValues.quantity;

        if (product.amount < product.quantity) {     // check if products amount sufficient
          const data = {id: product.id, amount: product.amount};
          noProdErr.push(data);
        } else {
          prodsArr.push(product);
        }
      }
      console.log('noProdErr', noProdErr);
      return noProdErr.length > 0 ? noProdErr : prodsArr;
    } catch (err) {
      throw new DefaultError(400, err.stack);
    }
  }

  async completeOrder() {
    try {
      await this.getUserData();
      await this.getOrderId();
      await this.setOrderItems();
      return await this.getOrderInfo();
    } catch (err) {
      console.log(err);
      // throw new DefaultError(400, err.stack);
    }
  }
};

