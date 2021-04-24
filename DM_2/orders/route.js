const express = require("express");
const route = express.Router();
const { placeOrder } = require("./controller"); //Import controllers


// @route   POST /order
// @desc    Place Order
route.post("/order", placeOrder);


module.exports = route;
