const {client} = require('../config/bdConfig');

module.exports = class UserModel {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  async regUser() {
    try {
      const queryNewCustomer = `INSERT INTO users (name, phone, email, password) VALUES ($1, $2, $3, $4)`;
      await client.query(queryNewCustomer, [this.req.headers.username, this.req.headers.userphone, this.req.headers.useremail, this.req.headers.userpassword]);
      return true;
    } catch (e) {
      console.log(e);
    }
  }

  async checkUser() {
    try {
      const queryIsUser = `SELECT id, password FROM users WHERE phone = $1 AND password = $2`;
      const resultAuth = await client.query(queryIsUser, [this.req.headers.userphone, this.req.headers.userpassword]);
      return resultAuth.rows;
    } catch (e) {
      console.log(e);
    }
  }
};
