const {client} = require('../bd/db_connect');

// Общая функция запросов
const sendQueryDB = async (query, str) => {
  try {
    client.connect();
    const result = await client.query(query);
    console.log(str);
    return result.rows[0];
  } catch (err) {
    console.log(err.stack);
  } finally {
    client.end();
  }
};

// Создание таблицы
const queryTable = `CREATE TABLE users (
id BIGINT NOT NULL PRIMARY KEY, name VARCHAR(50), surname VARCHAR(50), login VARCHAR(50) NOT NULL, email  VARCHAR(50), date_of_birth DATE, password VARCHAR(50) NOT NULL );`;
// let createTable = sendQueryDB(queryTable, `Table created successfully`).then(res => console.log(res));

// Очищение таблицы
// let clearTable = sendQueryDB(`DELETE FROM users`, `Table cleared successfully`).then(res => console.log(res));

// Изменение таблицы
// let changeColumnTable = sendQueryDB('ALTER TABLE users ADD UNIQUE(login)', `ALTER TABLE users ADD UNIQUE(login)`).then(res => console.log(res));
