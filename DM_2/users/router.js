const express = require("express");
const userRouter = express.Router();
const validator = require('../config/validationConfig');
const userSchema = require('../dtos/user.dtos');
const UsersController = require("./users_controller");

// route  POST /users/registration
userRouter.post("/registration",
  validator.headers(userSchema),
  (req, res) => {
    const newUserController = new UsersController(req, res);
    return newUserController.regUserController()
  });


// route  GET /users/authentication
userRouter.get("/authentication",
  validator.headers(userSchema),
  (req, res) => {
  const userController = new UsersController(req, res);
  return userController.authUserController()
});


module.exports = userRouter;
