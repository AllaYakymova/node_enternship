const {answer} = require('../helpers/answer');

// проверка данных в бд
exports.checkAuthInBd = async function (authUser, client, res) {

  try {
    const checkAuth = `SELECT COUNT(login) FROM users WHERE login = '${authUser.login}' AND password = '${authUser.password}'`;
    const resultAuth = await client.query(checkAuth);
    const isExist = +resultAuth.rows[0].count;

    if (isExist) {
      answer(res, 200, `User with login '${authUser.login}' is registered`);
    } else {
      answer(res, 401, `User with login '${authUser.login}' is unregistered`);
    }
  } catch (err) {
    return err.stack;
  }
};
