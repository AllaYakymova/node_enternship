const express = require('express');
const orderRouter = express.Router();
const validator = require('../config/validation_config');
const authMiddleware = require('../middlewares/auth_middleware');
const userSchema = require('../dtos/user.dtos');
const orderProdSchema = require('../dtos/order_products.dtos');
const ordersController = require('./controller');

// router  POST /order
orderRouter.post('/',
  validator.headers(userSchema), // проверка наличия полей в headers
  validator.body(orderProdSchema), // проверка наличия полей заказа в body
  authMiddleware, // проверка наличия телефон+пароль в бд
  ordersController.controllerOrder
);

module.exports = orderRouter;
