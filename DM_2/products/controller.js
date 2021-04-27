const ProductsModel = require('./products_model');
const ViewsClass = require('../view/view_class');

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
      await this.view.okView(this.res, data, 'Here is all products')
    } catch (err) {
      this.view.errorView(err)
    }
  }

  async getProductById() {
    try {
      const { productId } = this.req.params;
      console.log(productId);
      let data = await this.productsModel.getProductById();
      console.log(data);
      if (data.length !== 0) {
        await this.view.okView(this.res, data, `Product with id ${productId}`);
      } else {
        await this.view.okView(this.res, data, `No product with id ${productId}`);
      }
    } catch (err) {
      this.view.errorView(err)
    }
  }

  async searchProducts() {
    try {
      if (!Object.values(this.req.query).filter(el => el).length) this.res.redirect("/products"); // redirection if no query
      const data = await this.productsModel.searchProducts();
      if (data.length !== 0) {
        await this.view.okView(this.res, data, `Products satisfying the query request. Amount: ${data.length}`);
      } else {
        await this.view.okView(this.res, data, `There is no products satisfying the query request`);
      }
    } catch (err) {
      this.view.errorView(err)
    }
  }
};



