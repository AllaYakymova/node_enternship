'use strict';
const DefaultError = require('../exceptions/default_error');
const API = require('../common/constants');
const { Op } = require('sequelize');


module.exports = class ProductsModel {

  async getProductsCommon(db, isFull, params) {
      const {Product, Manufacture, Unit, Category} = db;
      let queryParams = {
        attributes: ['id', 'product_name', 'price', 'img_link'],
        where: params,
        include: [
          {model: Manufacture, attributes: ['manufacture'], required: true},
          {model: Unit, attributes: ['unit'], required: true},
          {model: Category, attributes: ['category'], required: true}],
      };
      const res = await Product.findAll(queryParams);
      return res.map(el => {
        if (isFull) {
          return {
            id: el.id,
            product_name: el.product_name,
            manufacture: el.Manufacture.manufacture,
            category: el.Category.category,
            units: el.Unit.unit,
            price: el.price,
            img_link: el.img_link
          };
        } else {
          return {
            id: el.id,
            product_name: el.product_name,
            manufacture: el.Manufacture.manufacture,
            category: el.Category.category
          };
        }
      });
  }

  async getAllProducts(db) {
    return this.getProductsCommon(db, false, {});
  }

  async getProductById(db, id) {
      const params = {id: id};
      return this.getProductsCommon(db, true, params);
  }

  async searchProducts(db, query) {
    try {
      const { Manufacture } = db;
      const {manufactures, categories, products} = query;
      const queryParams = {
        [Op.and]: {}
      };

      if(products) {
        queryParams[Op.and].product_name = { [Op.iLike]: `%${products}%`};
      }

      const categoriesId = !!categories && categories.split(',').filter(el => el);
      if(!!categoriesId) {
        queryParams[Op.and].category_id = { [Op.in]: categoriesId};
      }

      if (!!manufactures) {
        let getManufacturesId = await Manufacture.findAll({
          attributes: ['id', 'manufacture'],
          where: {
            manufacture: {
              [Op.iLike]: `%${manufactures}%`,
            }
          }
        });
        queryParams[Op.and].manufacture_id = { [Op.in]: getManufacturesId.map(el => el.dataValues.id)};
      }
      return await this.getProductsCommon(db, true, queryParams);
    } catch (err) {
      throw new DefaultError(400, err.stack);
    }
  }
};

