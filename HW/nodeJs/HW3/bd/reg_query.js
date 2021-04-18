const {answer} = require('../helpers/answer');

// внесение данных в бд
exports.addNewUserToBd = async function (user, client, res) {
  try {
    const checkLogin = `select count(login) from users where login = '${user.login}'`;
    const checkEmail = `select count(email) from users where email = '${user.email}'`;
    const resultLogin = await client.query(checkLogin);
    const resultEmail = await client.query(checkEmail);
    const isExist = [+resultLogin.rows[0].count, +resultEmail.rows[0].count].some(e => e !== 0);
    if (!isExist) {
      let id = new Date();
      const query = `INSERT INTO users (id, name, surname, login, email, date_of_birth, password)
    VALUES ( ${id.getTime()}, '${user.name}', '${user.surname}', '${user.login}', '${user.email}', '${user.dob}', '${user.password}' )`;
      await client.query(query);
      await answer(res, 200, `User with login ${user.login} inserted successfully`);
    } else if (+resultLogin.rows[0].count !== 0) {
      await answer(res, 406, `The user with login ${user.login} is already exist`);
    } else if (+resultEmail.rows[0].count !== 0) {
      await answer(res, 406, `The user with email ${user.email} is already exist`);
    }
  } catch (err) {
    return err.stack;
  }
};
