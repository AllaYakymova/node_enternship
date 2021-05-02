// require('dotenv').config();
const {Client} = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'demo2_db',
  password: 'qwerty',
  port: 5432
});

// connect to postgrsql
client
  .connect()
  .then(() => console.log('connected'))
  .catch(err => console.error('connection error', err.stack));


module.exports = {client};
