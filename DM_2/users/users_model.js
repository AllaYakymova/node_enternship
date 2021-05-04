const DefaultError = require('../exceptions/defaultError');
const Users = require('../sequelize_models/Users');

module.exports = class UsersModel {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  async checkIsUser() {
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
      await this.checkIsUser();
      await Users.create({
        name: this.req.headers.name,
        phone: this.req.headers.phone,
        email: this.req.headers.email,
        password: this.req.headers.password,
      });
    } catch (err) {
      throw new DefaultError(err);
    }
  }


};

