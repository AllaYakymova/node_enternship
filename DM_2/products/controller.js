const ProductsModel = require('./products_model');
const { corsDefender } = require('../helpers/cors_defender');
const ViewsClass = require('../view/index');

module.exports = class ProductsController {
  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.productsModel = new ProductsModel(req);
    this.view = new ViewsClass(res);
  }

  async getProducts() {
    try {
      const data = this.productsModel.getAllProducts();
      this.view.okView(this.res, {data: data}, 'Here is all products')
    } catch (err) {
      this.view.errorView(err)
    }
  }

  async getProductById() {
    try {
      const {productId} = this.req.params;
      let data = this.productsModel.searchProducts();
      if (data.length !== 0) {
        this.view.okView(this.res, {data: data}, `Product with id ${productId}`);
      } else {
        this.view.okView(this.res, {data: data}, `No product with id ${productId}`);
      }
    } catch (err) {
      this.view.errorView(err)
    }
  }

  async searchProducts() {
    try {
      if (!Object.values(this.req.query)
        .filter(el => el).length) this.res.redirect("/products");
      const data = this.productsModel.getProductById();
      if (data.length !== 0) {
        this.view.okView(this.res, {data: data}, `Products satisfying the query request. Amount: ${data.length}`);
      } else {
        this.view.okView(this.res, {data: data}, `There is no products satisfying the query request`);
      }
    } catch (err) {
      this.view.errorView(err)
    }
  }
};



