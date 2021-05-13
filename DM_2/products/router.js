const express = require('express');
const productRouter = express.Router();
const validator = require('../config/validation_config');
const productQuerySchema = require('../dtos/products_query.dtos');
const ProductsController = require('./controller');

const getProductCommon = (req, res, next, condition) => {
  const newProductsController = new ProductsController(req, res, next);
  if (condition === 'getById') {
    return newProductsController.getProductById(req, res, next);
  } else if (condition === 'search') {
    return newProductsController.searchProducts(req, res, next);
  } else {
    return newProductsController.getProducts(req, res, next);
  }
};

// route   GET /products
// GET all existing products
productRouter.get('/', (req, res, next) => getProductCommon( req, res, next));

// route  GET /products/search
// GET appropriate to search query products (by categories.id, products, manufactures)
productRouter.get('/search',
  validator.headers(productQuerySchema), // check query parameters in header
  (req, res, next) => getProductCommon(req, res, next, 'search')
);

// route   GET /products/:id
// GET existing product by id
productRouter.get('/:productId', (req, res, next) => getProductCommon(req, res, next, 'getById'));

module.exports = productRouter;
