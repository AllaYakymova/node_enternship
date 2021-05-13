'use strict';

module.exports = class OrdersModel {

  async getUserData(phone, db) {
    const getUserId = await db.findOne({where: {phone: phone}});
    return {
      id: getUserId.dataValues.id,
      name: getUserId.dataValues.name,
      phone: getUserId.dataValues.phone,
      email: getUserId.dataValues.email,
    };
  }

  async getOrderProps(userId, db) {
    const newOrder = await db.create({user_id: userId});
    return newOrder.dataValues;
  }

  async checkIfEnoughProducts(products, db) {
    let noProdData = [];
    for (let prod of products) {
      const prodValues = await db.findOne({id: prod.id});
      const amount = prodValues.dataValues.amount;
      if (prod.count > amount) {
        noProdData.push({id: prod.id, amount: amount});
      }
    }
    return noProdData;
  }

  async setOrderItems(orderId, products, db) {
    const data = products.map(prod => {
      return {order_id: orderId, product_id: prod.id, quantity: prod.count};
    });
    await db.bulkCreate(data);
  }

  async getDetailOrderInfo(products, db) {
    const {Product, Manufacture, Category, Unit} = db;
    let ids = products.map(el => el.id);
    let queryParams = {
      attributes: ['id', 'product_name', 'ingredients', 'amount', 'price', 'img_link'],
      where: {id: [...ids]},
      include: [
        {model: Manufacture, attributes: ['manufacture'], required: true},
        {model: Unit, attributes: ['unit'], required: true},
        {model: Category, attributes: ['category'], required: true},
      ],
    };

    const getAmount = (el) => {
      const prod = products.find(prod => prod.id === el);
      return prod.count;
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
        count: getAmount(el.id),
      };
    });
  }
};


