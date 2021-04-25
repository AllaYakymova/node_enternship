const express = require("express");
const productRouter = express.Router();
const {
  getProducts,
  getProductById,
  searchProducts
} = require("./controller"); //import controllers



// @route   GET /products
// @desc    GET all existing products
productRouter.get("/", getProducts);

// @route   POST /products/search
// @desc    POST appropriate to search query products ( by categories.id, products, manufactures)
productRouter.use("/search", searchProducts);

// @route   GET /products/:id
// @desc    GET existing product by id
productRouter.use("/:productId", getProductById);

module.exports = productRouter;
