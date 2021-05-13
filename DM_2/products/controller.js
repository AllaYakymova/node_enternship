'use strict';
const db = require('../db/models');
const asyncHandler = require('../common/asyncHandler');
const ProductsModel = require('./products_model');
const ViewsClass = require('../views/view_class');

module.exports = class ProductsController {
  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.productsModel = new ProductsModel(req);
    this.view = new ViewsClass(res);
  }

  getProducts= asyncHandler(async(req, res, next) => {
      const data = await this.productsModel.getAllProducts(db);
      this.view.okView(res, data, 'All products');
  });

  getProductById = asyncHandler(async(req, res, next) =>  {
      const { productId } = req.params;
      let data = await this.productsModel.getProductById(db, productId);
      if (data.length !== 0) {
        this.view.okView(res, data, `Product with id ${productId}`);
      } else {
        this.view.errorData(res, 200, [{id: productId}], `No product with id ${productId}`);
      }
  });

  searchProducts = asyncHandler(async(req, res, next) => {
    if (!Object.values(req.query)
      .filter(el => el).length) res.redirect('/products'); // redirection if no query
    const data = await this.productsModel.searchProducts(db, req.query);
    if (data.length !== 0) {
      this.view.okView(res, data, `Products satisfying the query request. Amount: ${data.length}`);
    } else {
      this.view.errorData(res, 200, data, `There is no products satisfying the query request`);
    }
  })
};
