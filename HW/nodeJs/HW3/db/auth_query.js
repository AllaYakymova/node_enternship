const {answer} = require('../helpers/answer');

// проверка данных в бд
exports.checkAuthInBd = async function (authUser, client, res) {

  try {
    const checkAuth = `SELECT COUNT(login) FROM users WHERE login = '${authUser.login}' AND password = '${authUser.password}'`;
    const resultAuth = await client.query(checkAuth);
    const isExist = +resultAuth.rows[0].count;

    if (isExist) {
      const userData = `SELECT name, surname, login, email, date_of_birth, password FROM users WHERE login = '${authUser.login}'`;
      const resultAuthUser = await client.query(userData);
      let data = resultAuthUser.rows[0];
      await answer(res, 200, `User with login '${authUser.login}' is registered. Data: login - "${data.login}", name - "${data.name}", surname - "${data.surname}", email - "${data.email}"`);
    } else {
      answer(res, 401, `User with login '${authUser.login}' is unregistered`);
    }
  } catch (err) {
    return err.stack;
  }
};
