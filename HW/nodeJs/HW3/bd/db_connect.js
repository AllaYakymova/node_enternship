const {Client} = require('pg');
// const {query} = require('./db_queries');
// const {queryInsert} = require('./db_queries');
// const {checkUserToBd} = require('./db_queries');

exports.client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'node_auth',
  password: 'qwerty',
  port: 5432,
});

// client.query(query, (err, res) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log('Table is successfully created');
//   client.end();
// });

// client.query(queryInsert, (err, res) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log('Data insert successful');
//   client.end();
// });

// checkUserToBd({login: 'ss'}).then(res => {
//   res === 0 ? console.log(res, 'login is free') :
//   console.log(res, 'login is busy');
//   });
