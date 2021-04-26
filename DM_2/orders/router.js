'use strict';
const express = require("express");
const router = express.Router();
const OrdersController = require("./controller"); //import controllers


// @router   POST /order
// @desc    place order
router.post("/", (req, res) => {
  const myOrdersController = new OrdersController(req, res);
  return myOrdersController.controllerOrderInfo()
});


module.exports = router;
