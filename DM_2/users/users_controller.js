'use strict';
const asyncHandler = require('../common/asyncHandler');
const UsersModel = require('./users_model');
const ViewsClass = require('../views/view_class');

class UsersController {
  constructor() {
    this.userModel = new UsersModel();
    this.view = new ViewsClass();
  }

  authUserController = asyncHandler(async (req, res, next) =>  {
      const authInfo = await this.userModel.checkIfUserExists(req.headers.userphone, req.headers.userpassword);
      if (authInfo) {
        await this.view.setResLocalsData(req, res, true);
      } else {
        await this.view.setResLocalsData(req, res, false);
       throw this.view.errorData(res, 401,{phone: req.headers.userphone}, `User  is not registered`);
      }
  });

  regUserController = asyncHandler(async (req, res, next) => {
      const authInfo = await this.userModel.checkIfUserExists(req.headers.userphone, req.headers.userpassword);
      if (!authInfo) {
        const user = {
          name: req.headers.username,
          phone: req.headers.userphone,
          email: req.headers.useremail,
          password: req.headers.userpassword,
        };
        await this.userModel.userRegistration(user);
        return this.view.okView(res, {user: {phone: req.headers.userphone}}, 'User has registered successfully');
      }
      throw this.view.errorData(res, 200, {phone: req.headers.userphone}, 'User with phone number has already registered');
  });
}

module.exports = new UsersController();
