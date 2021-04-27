const express = require("express");
const router = express.Router();
const OrdersController = require("./controller"); //import controllers


// @router   POST /order
// @desc    place order
router.post("/", (req, res) => {
  const newOrdersController = new OrdersController(req, res);
  return newOrdersController.controllerOrder()
});


module.exports = router;
