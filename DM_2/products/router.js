const express = require("express");
const productRouter = express.Router();
const ProductsController = require("./controller");//import controller


// route   GET /products
// GET all existing products
productRouter.get("/", (req, res) => {
  const newProductsController = new ProductsController(req, res);
  return newProductsController.getProducts()
});

// route   GET /products/search
// GET appropriate to search query products (by categories.id, products, manufactures)
productRouter.use("/search", (req, res) => {
  const newProductsController = new ProductsController(req, res);
  return newProductsController.searchProducts()
});

// route   GET /products/:id
// GET existing product by id
productRouter.use("/:productId", (req, res) => {
  const newProductsController = new ProductsController(req, res);
  return newProductsController.getProductById()
});

module.exports = productRouter;
