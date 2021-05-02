'use strict';
const UserModel = require('./user_model');
const ViewsClass = require('../views/view_class');

module.exports = class UserController {
  constructor(req, res) {
    this.res = res;
    this.req = req;
    this.userModel = new UserModel(req);
    this.view = new ViewsClass(res);
  }

  async regUserController() {
    try {
      const authInfo = await this.userModel.checkUser();
      if(authInfo.length === 0) {
        await this.userModel.regUser();
        return this.view.okView({user: {phone: this.req.headers.userphone}}, 'User has registered successfully');
      } else {
        return this.view.errorData({phone: this.req.headers.userphone}, 'User with phone number has already registered');
      }
    } catch (err) {
      this.view.errorView(err);
    }
  }

  async authUserController() {
    try {
      const authInfo = await this.userModel.checkUser();
      if(authInfo.length === 0 ) {
        return this.view.errorData({phone: this.req.headers.userphone}, 'User is not registered');
      } else {
        return true;
      }
    } catch (err) {
      this.view.errorView(err);
    }
  }
};
