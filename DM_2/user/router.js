const express = require("express");
const userRouter = express.Router();
const validator = require('../config/validationConfig');
const userSchema = require('../dtos/user.dtos');
const UserController = require("./user_controller");

// route  POST /user/registration
userRouter.post("/registration",
  validator.headers(userSchema),
  (req, res) => {
    const newUserController = new UserController(req, res);
    return newUserController.regUserController()
  });


// route  GET /user/authentication
userRouter.get("/authentication",
  validator.headers(userSchema),
  (req, res) => {
  const userController = new UserController(req, res);
  return userController.authUserController()
});


module.exports = userRouter;
