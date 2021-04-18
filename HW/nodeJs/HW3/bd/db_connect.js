const {Client} = require('pg');

exports.client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'node_auth',
  password: 'qwerty',
  port: 5432,
});
