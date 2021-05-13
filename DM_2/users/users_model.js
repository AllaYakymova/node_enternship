const db = require('../db/models');

module.exports = class UsersModel {

  async checkIfUserExists(phone, pass) {
      const resultAuth = await db.User.findOne({where: { phone: phone, password: pass }});
      return resultAuth !== null;
  }

  userRegistration = async (user) => await db.User.create(user);

};

