const dotenv = require('dotenv');
dotenv.config({path:__dirname+'../../.env'});
const fs = require('fs');

module.exports = {
  development: {
    username: process.env.DEV_DB_USER,
    password: process.env.DEV_DB_PASS,
    database: process.env.DEV_DB_DATABASE,
    host: process.env.DEV_DB_HOST,
    port: process.env.DEV_DB_PORT,
    dialect: 'postgres',
    dialectOptions: {
      bigNumberStrings: true
    }
  },
  // development: {
  //   username: 'postgres',
  //   password: 'qwerty',
  //   database: 'sequelize_db',
  //   host: 'localhost',
  //   port: 5432,
  //   dialect: 'postgres'
  // },
  test: {
    username: process.env.CI_DB_USER,
    password: process.env.CI_DB_PASS,
    database: process.env.CI_DB_DATABASE,
    host: process.env.CI_DB_HOST,
    port: process.env.CI_DB_PORT,
    dialect: process.env.CI_DB_DEALECT,
    dialectOptions: {
      bigNumberStrings: true
    }
  },
  production: {
    username: process.env.PROD_DB_USER,
    password: process.env.PROD_DB_PASS,
    database: process.env.PROD_DB_DATABASE,
    host: process.env.PROD_DB_HOST,
    port: process.env.PROD_DB_PORT,
    dialect: process.env.PROD_DB_DEALECT,
    dialectOptions: {
      bigNumberStrings: true,
      ssl: {
        // ca: fs.readFileSync(__dirname + '/postgres-ca-master.crt')
      }
    }
  }
};
