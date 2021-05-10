'use strict';
const DefaultError = require('../exceptions/default_error');
const UsersModel = require('./users_model');
const ViewsClass = require('../views/view_class');

module.exports = class UsersController {
  constructor(req, res, next) {
    this.res = res;
    this.req = req;
    this.next = next;
    this.userModel = new UsersModel(req);
    this.view = new ViewsClass(res);
  }

  async authUserController() {
    try {
      const authInfo = await this.userModel.checkIfUserExists();
      if (authInfo) {
        await this.view.setResLocalsData(this.req, this.res, true);
      } else {
        await this.view.setResLocalsData(this.req, this.res, false);
        await this.view.errorData(this.res, 401,{phone: this.req.headers.userphone}, 'User is not registered');
      }
    } catch (err) {
      throw new DefaultError(400, err.stack);
    }
  }


  async regUserController() {
    try {
      const authInfo = await this.userModel.checkIfUserExists();
      if (!authInfo) {
        await this.userModel.regUser();
        return this.view.okView(this.res, {user: {phone: this.req.headers.userphone}}, 'User has registered successfully');
      }
      throw this.view.errorData(this.res, 200, {phone: this.req.headers.userphone}, 'User with phone number has already registered');
    } catch (err) {
      this.next(err);
    }
  }
};
