const ProductsModel = require('./products_model');
const ViewsClass = require('../views/view_class');

module.exports = class ProductsController {
  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.productsModel = new ProductsModel(req);
    this.view = new ViewsClass(res);
  }

  async getProducts() {
    try {
      const data = await this.productsModel.getAllProducts();
      this.view.okView(data, 'All products');
    } catch (err) {
      this.view.errorView(err);
    }
  }

  async getProductById() {
    try {
      const {productId} = this.req.params;
      let data = await this.productsModel.getProductById();
      if (data.length !== 0) {
        this.view.okView(data, `Product with id ${productId}`);
      } else {
        this.view.errorData([{id: productId}], `No product with id ${productId}`);
      }
    } catch (err) {
      this.view.errorView(err);
    }
  }

  async searchProducts() {
    try {
      if (!Object.values(this.req.query).filter(el => el).length) this.res.redirect('/products'); // redirection if no query
      const data = await this.productsModel.searchProducts();
      if (data.length !== 0) {
        this.view.okView(data, `Products satisfying the query request. Amount: ${data.length}`);
      } else {
        this.view.errorData(data, `There is no products satisfying the query request`);
      }
    } catch (err) {
      this.view.errorView(err);
    }
  }
};
