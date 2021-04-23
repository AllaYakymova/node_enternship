const express = require("express");
const router = express.Router();
const { placeOrder } = require("./controller"); //Import controllers


// @route   POST /order
// @desc    Place Order
router.post("/order", placeOrder);


module.exports = router;
