const {answer} = require('../helpers/answer');

exports.addNewUserToBd = async function (user, client, res) {
  let data = '';
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
        // data = `The user with login ${user.login} is redistricted`
      } else if (+resultLogin.rows[0].count !== 0) {
        data = `The user with login ${user.login} is exist`;
      } else if (+resultEmail.rows[0].count !== 0) {
        data = `The user with email ${user.email} is exist`;
      }
    return data
  } catch (err) {
    return err.stack;
  }
};


// let user = {
//   name: 'Bella',
//   surname: 'Be',
//   login: 'Be',
//   email: 'be@gmail.com',
//   dob: '2000-04-09',
//   password: '333',
// };

// addNewUserToBd(user)
//   .then((res) => console.log(res));


// Создание таблицы
// const createTable = async (query) => {
//   try {
//     client.connect();
//     const resultAddedTable = await client.query(query);
//     console.log(`Table created successful`);
//     return resultAddedTable.rows[0];
//   } catch (err) {
//     console.log(err.stack);
//   } finally {
//     client.end();
//   }
// };

const queryTable = `CREATE TABLE users (
id BIGINT NOT NULL PRIMARY KEY, name VARCHAR(50), surname VARCHAR(50), login VARCHAR(50) NOT NULL, email VARCHAR(50), date_of_birth DATE, password VARCHAR(50) NOT NULL );`;

// createTable(queryTable).then(res => console.log(res));
