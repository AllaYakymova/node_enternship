const express = require("express");
const route = express.Router();
const {
  getProducts,
  getProductById,
  getProductsFilterParams,
  searchProducts
} = require("./controller"); //import controllers



// @route   GET /products
// @desc    GET all existing products
route.get("/products", getProducts);

// // @route   GET /products/filter
// // @desc    GET appropriate filtered products (categories, manufactures)???
// route.get("/filter", getProductsFilterParams);

// @route   POST /products/search
// @desc    POST appropriate to search query products (categories, products, manufactures)
route.get("/products/search", searchProducts);

// @route   GET /products/:id
// @desc    GET existing product by id
route.get("/products/:productId", getProductById);

// module.exports = route;
