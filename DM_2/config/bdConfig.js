// require('dotenv').config();
const {Client} = require('pg');

const client = new Client({
  user: 'postgres',
const Sequelize = require('sequelize');
const sequelize = new Sequelize('demo2_db', 'postgres', 'qwerty', {
  host: 'localhost',
  dialect: 'postgres',
  define: {
    timestamps: false
  }
});


sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });

sequelize.sync().then(result=> console.log(result.config)).catch(err=> console.log(err));

module.exports = sequelize;
module.exports = Sequelize;

// const {Client} = require('pg');
//
// const config = {
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_DATABASE,
//   password: process.env.DB_PASS,
//   port: 5432
// };
//
// const client = new Client(config);
//
// // connect to postgrsql
// client
//   .connect()
//   .then(() => console.log('connected'))
//   .catch(err => console.error('connection error', err.stack));
//
//
// module.exports = {client};
