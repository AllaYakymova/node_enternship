const DefaultError = require('../exceptions/default_error');
const Users = require('../db/models/User');

module.exports = class UsersModel {
  constructor(req, res, next) {
    this.req = req;
    this.res = res;
    this.next = next;
  }

  async checkIfUserExists() {
    try {
      const resultAuth = await Users.findAll({
        attributes: ['id'],
        where: {
          phone: this.req.headers.userphone,
          password: this.req.headers.userpassword,
        },
      });
      return resultAuth.length !== 0;
    } catch (err) {
      throw new DefaultError(err);
    }
  }

  async regUser() {
    try {
      const isUserExists = await this.checkIfUserExists();
      if(isUserExists) {
        throw new DefaultError(200, "User is already registered");
      }
      await Users.create({
        name: this.req.headers.name,
        phone: this.req.headers.phone,
        email: this.req.headers.email,
        password: this.req.headers.password,
      });
    } catch (err) {
      this.next(err);
    }
  }


};

