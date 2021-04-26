const express = require("express");
const productRouter = express.Router();
const {
  getProducts,
  getProductById,
  searchProducts
} = require("./controller"); //import controllers


// @route   GET /products
// GET all existing products
productRouter.get("/", getProducts);

// @route   GET /products/search
// GET appropriate to search query products (by categories.id, products, manufactures)
productRouter.use("/search", searchProducts);

// @route   GET /products/:id
// GET existing product by id
productRouter.use("/:productId", getProductById);

module.exports = productRouter;
