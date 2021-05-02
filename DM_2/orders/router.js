const express = require("express");
const router = express.Router();
const validator = require('express-joi-validation').createValidator();
const userSchema = require('../dtos/user.dtos');
const orderProdSchema = require('../dtos/orderProducts.dtos');
const OrdersController = require("./controller");


// router  POST /order
router.post("/",
  validator.headers(userSchema),
  validator.body(orderProdSchema),
  (req, res) => {
  const newOrdersController = new OrdersController(req, res);
  return newOrdersController.controllerOrder();
});

module.exports = router;
