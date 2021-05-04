const express = require('express');
const orderRouter = express.Router();
const validator = require('../config/validationConfig');
const authMiddleware = require('../middlewares/auth_middleware');
const userSchema = require('../dtos/user.dtos');
const orderProdSchema = require('../dtos/orderProducts.dtos');
const OrdersController = require('./controller');

// router  POST /order
orderRouter.post('/',
  validator.headers(userSchema), // проверка наличия полей в headers
  validator.body(orderProdSchema), // проверка наличия полей заказа в body
  authMiddleware, // проверка наличия телефон+пароль в бд (users_model => users_controller.authUserController())
  (req, res) => {
    const newOrdersController = new OrdersController(req, res);
    return newOrdersController.controllerOrder();
  },
);

module.exports = orderRouter;
