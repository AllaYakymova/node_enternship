const DefaultError = require('../exceptions/defaultError');
const Orders = require('../sequelize_models/Orders');
const Users = require('../sequelize_models/Users');
const OrderItems = require('../sequelize_models/OrderItems');
const Products = require('../sequelize_models/Products');
const Units = require('../sequelize_models/Units');
const Manufactures = require('../sequelize_models/Manufactures');
const Categories = require('../sequelize_models/Categories');

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
      for (let item of this.order) {  // На это нагромождение не обращайте внимания, пока не особо разобралась как делать красивые запросы в sequelize. Исправлюсь))
        const prodValues = await Products.findAll({where: {id: item.id}});
        const product = prodValues[0].dataValues;
        const unit = await Units.findAll({attributes: ['unit'], where: {id: product.id_units}});
        const manufacture = await Manufactures.findAll({
          attributes: ['manufacture'],
          where: {id: product.id_manufacture},
        });
        const category = await Categories.findAll({attributes: ['category'], where: {id: product.id_category}});
        const quantity = await OrderItems.findAll({
          attributes: ['quantity'],
          where: {product_id: product.id, quantity: item.quantity},
        });
        product.unit = unit[0].dataValues.unit;
        product.category = category[0].dataValues.category;
        product.manufacture = manufacture[0].dataValues.manufacture;
        product.quantity = quantity[0].dataValues.quantity;

        if (product.amount < product.quantity) {     // check if products amount sufficient
          const data = {id: product.id, amount: product.amount};
          await noProdErr.push(data);
        } else {
          await prodsArr.push(product);
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

