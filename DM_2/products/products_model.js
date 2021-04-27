const {client} = require('../config');

module.exports = class ProductsModel {
  constructor(req) {
    this.req = req;
  }

  async getAllProducts() {
    try {
      const query = `SELECT products.id, product_name, manufactures.manufacture, categories.category FROM products, categories, manufactures WHERE products.id_manufacture = manufactures.id AND products.id_category = categories.id ORDER BY product_name ASC;`;
      const result = await client.query(query);
      return result.rows;
    } catch (e) {
      console.log(e);
    }
  }

  async getProductById() {
    try {
      const { productId } = this.req.params;
      const query = `SELECT products.id, product_name, manufactures.manufacture, categories.category, ingridients, units.unit, price, img_link FROM products, categories, manufactures, units WHERE products.id = $1 AND products.id_manufacture = manufactures.id AND products.id_category = categories.id AND products.id_units = units.id;`;

      const result = await client.query(query, [productId]);
      return result.rows;
    } catch (e) {
      console.log(e);
    }
  }

  async searchProducts() {
    try {
      const { manufactures, categories, products } = this.req.query;
      const reg = /^([1-9,]*)$/;
      let arg = [];
      const scheme = {
        'manufactures.manufacture': !!manufactures && manufactures,
        'categories.id': !!categories && reg.test(categories) ? categories.split(',')
          .filter(el => el) : false,
        'product_name': !!products && products,
      };

      if (Object.values(scheme)
        .filter(el => el).length !== 0) {
        for (let query in scheme) {
          if (scheme[query]) {
            if (query === 'categories.id') {
              arg.push(`${query} IN (${scheme[query]})`);
            } else {
              arg.push(`${query} ILIKE '${scheme[query]}%'`);
            }
          }
        }
      }
      const condition = arg.length !== 0 ? `AND ${arg.join(' AND ')}` : '';
      const query = `SELECT products.id, product_name, manufactures.manufacture, categories.category, units.unit, price, img_link FROM products, categories, manufactures, units WHERE products.id_manufacture = manufactures.id AND products.id_category = categories.id AND products.id_units = units.id ${condition};`; // проверить внести аругментом
      const result = await client.query(query);
      return result.rows;
    } catch (e) {
      console.log(e);
    }
  }
};

