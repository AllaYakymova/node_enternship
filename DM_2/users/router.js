const express = require("express");
const userRouter = express.Router();
const validator = require('../config/validation_config');
const userSchema = require('../dtos/user.dtos');
const UsersController = require("./users_controller");

const regNewUser = (req, res, next) => {
  const newUserController = new UsersController(req, res, next);
  return newUserController.regUserController()
};

const authUser = (req, res, next) => {
  const userController = new UsersController(req, res, next);
  return userController.authUserController()
};

// route  POST /users/registration
userRouter.post("/registration",
  validator.headers(userSchema),
  regNewUser);

// route  GET /users/authentication
userRouter.get("/authentication",
  validator.headers(userSchema),
  authUser );


module.exports = userRouter;
