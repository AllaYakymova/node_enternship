const DefaultError = require('../exceptions/default_error');
const db = require('../db/models');

module.exports = class UsersModel {
  constructor(next) {
    this.next = next;
  }

  async checkIfUserExists(phone, pass) {
    try {
      const resultAuth = await db.User.findOne({where: { phone: phone, password: pass }});
      return resultAuth !== null;
    } catch (err) {
      this.next(err);
    }
  }

  async regUser(user) {
    try {
      await db.User.create(user);
    } catch (err) {
      this.next(err);
    }
  }


};

