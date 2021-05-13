'use strict';
const DefaultError = require('../exceptions/default_error');

module.exports = class OrdersModel {

  async getUserData(phone, db) {
    try {
      const getUserId = await db.findOne({where: {phone: phone}});
      return getUserId.dataValues;
    } catch (err) {
      throw new DefaultError(400, err.stack);
    }
  }

  async getOrderProps(userId, db) {
    try {
      const newOrder = await db.create({user_id: userId});
      return newOrder.dataValues;
    } catch (err) {
      throw new DefaultError(400, err.stack);
    }
  }

  async checkIfEnoughProducts(products, db) {
    try {
      let noProdData = [];
      for (let prod of products) {
        const prodValues = await db.findOne({id: prod.id});
        const amount = prodValues.dataValues.amount;
        if (prod.count > amount) {
          noProdData.push({id: prod.id, amount: amount});
        }
      }
      return noProdData;
    } catch (err) {
      throw new DefaultError(400, err.stack);
    }
  }

  async setOrderItems(orderId, products, db) {
    try {
      const data = products.map(prod => {
        return { order_id: orderId, product_id: prod.id, quantity: prod.count };
      });
        await db.bulkCreate(data);
      } catch (err) {
      throw new DefaultError(400, err.stack);
    }
  }

  async getOrderInfo(orderId, db) {
    try {
      const order = await db.findAll({
        attributes: [['product_id', 'id'], 'quantity'],
        where: {order_id: orderId},
      });
      return order.map(el => el.dataValues);
    } catch (err) {
      throw new DefaultError(400, err.stack);
    }
  }

  async getDetailOrderInfo(products, db) {
    try {
      const {Product, Manufacture, Category, Unit } = db;
      let ids = products.map(el => el.id);
      let queryParams = {
        attributes: ['id', 'product_name', 'ingredients', 'amount', 'price', 'img_link'],
        where: {id: [...ids]},
        include: [
          { model: Manufacture, attributes: ['manufacture'], required: true },
          { model: Unit, attributes: ['unit'], required: true },
          { model: Category, attributes: ['category'], required: true },
        ]
      };
      const getAmount = (el) => {
        const prod = products.find(prod => prod.id === el);
        return prod.quantity;
      };

      const res = await Product.findAll(queryParams);
      return res.map(el => {
          return {
            id: el.id,
            product_name: el.product_name,
            ingredients: el.ingredients,
            amount: el.amount,
            price: el.price,
            img_link: el.img_link,
            manufacture: el.Manufacture.manufacture,
            unit: el.Unit.unit,
            category: el.Category.category,
            count: getAmount(el.id)
          }
      });
    } catch (err) {
      throw new DefaultError(400, err.stack);
    }
  }
};


