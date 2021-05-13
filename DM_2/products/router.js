const express = require('express');
const productRouter = express.Router();
const validator = require('../config/validation_config');
const productQuerySchema = require('../dtos/products_query.dtos');
const productsController = require('./controller');

// route   GET /products
// GET all existing products
productRouter.get('/', productsController.getProducts);

// route  GET /products/search
// GET appropriate to search query products (by categories.id, products, manufactures)
productRouter.get('/search',
  validator.headers(productQuerySchema), // check query parameters in header
  productsController.searchProducts
);

// route   GET /products/:id
// GET existing product by id
productRouter.get('/:productId',
  validator.params(productQuerySchema),
  productsController.getProductById
);

module.exports = productRouter;
