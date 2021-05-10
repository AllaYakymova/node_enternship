const {Client} = require('pg');

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT
});

// connect to postgrsql
// client
//   .connect()
//   .then(() => console.log('connected'))
//   .catch(err => console.error('connection error', err.stack));


module.exports = {client};
