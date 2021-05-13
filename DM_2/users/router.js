const express = require("express");
const userRouter = express.Router();
const validator = require('../config/validation_config');
const userSchema = require('../dtos/user.dtos');
const usersController = require("./users_controller");

// route  POST /users/registration
userRouter.get("/registration",
  validator.headers(userSchema),
  usersController.regUserController);

// route  GET /users/authentication
userRouter.get("/authentication",
  validator.headers(userSchema),
  usersController.authUserController);


module.exports = userRouter;
