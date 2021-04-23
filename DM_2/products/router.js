const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  getProductsFilterParams,
  searchProducts
} = require("./controller"); //import controllers



// @route   GET /products
// @desc    GET all existing products
router.get("/", getProducts);

// @route   GET /products/filter
// @desc    GET appropriate filtered products (categories, manufactures)???
router.get("/filter", getProductsFilterParams);

// @route   POST /products/search
// @desc    POST appropriate to search query products (categories, products, manufactures)
router.get("/search", searchProducts);

// @route   GET /products/:id
// @desc    GET existing product by id
router.get("/:productId", getProductById);

module.exports = router;
