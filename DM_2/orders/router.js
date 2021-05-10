const express = require('express');
const orderRouter = express.Router();
const validator = require('../config/validation_config');
const authMiddleware = require('../middlewares/auth_middleware');
const userSchema = require('../dtos/user.dtos');
const orderProdSchema = require('../dtos/order_products.dtos');
const OrdersController = require('./controller');

const getOrder = (req, res, next) => {
  const newOrdersController = new OrdersController(req, res, next);
  return newOrdersController.controllerOrder();
};

// router  POST /order
orderRouter.post('/',
  validator.headers(userSchema), // проверка наличия полей в headers
  validator.body(orderProdSchema), // проверка наличия полей заказа в body
  authMiddleware, // проверка наличия телефон+пароль в бд (users_model => users_controller.authUserController())
  getOrder,
);

module.exports = orderRouter;
