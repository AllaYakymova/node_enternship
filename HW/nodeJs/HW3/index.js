const http = require('http'); //HTTP-модуль
const url = require('url'); //url parser module
const fs = require('fs'); // files system
const {client} = require('./bd/db_connect');
const { addNewUser } = require('./registration/reg_func');
const  { checkUser } = require('./autharization/auth_func');
const { answer } = require('./helpers/answer');
const {addNewUserToBd} = require('./bd/db_queries');


client
  .connect()
  .then(() => console.log('connected'))
  .catch(err => console.error('connection error', err.stack));

const server = http.createServer((req, res) => {


  res.writeHead(200, {
    'Content-Type': 'text/html',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Credential': 'true',
  });

  const query = url.parse(req.url, true).query;
  const {type} = query;

  // обработка полученных данных
  switch (type) {
    case 'reg' : {
      try {
        const {name, surname, login, email, dob, password} = query;
        addNewUser(name, surname, login, email, dob, password, client, res);
      } catch (e) {
        console.log(e);
      } finally {
        // client.end(err => console.log('client.end'))
      }
      break;
    }
    case 'auth' : {
      const {login, password} = query;
      checkUser(login, password, res);
      break;
    }
    // case 'rename' : {
    //   fs.rename('users.json', './rename.json', err => {
    //     console.log('Renamed');
    //     answer(res, 202, 'Renamed');
    //   });
    // }
    default: {
      answer(res, 'Error in request type');
    }
  }
  // client.end()
})
  .listen(8080);

// server.close(err => client.end(err => {
//   if(err) console.log(err);
//   console.log('client.end')
// }));


console.log('Server on http://localhost:8080');


// async function actionsWithAuthData(userData, type, res) {
//   console.log(JSON.stringify(userData));
//  await fs.readFile('users.json', (err, data) => {
//     let usersArr = JSON.parse(data);
//     if(type === 'reg') {
//       usersArr = [...usersArr, userData];
//       fs.writeFile('users.json', JSON.stringify(usersArr), err => {
//         if (err) throw err;
//         console.log('Add new user');
//       });
//     // }
//   //   if(type === 'auth') {
//       const isAuth = usersArr.find(user => user.login === userData.login & user.password === userData.password );
//      if(isAuth) answer(res, '<p>You are authorized)</p>');
//     }
//   });
// }

// fs.appendFile('users.json', str, (res,err) => {
// console.log( err || 'Added new user');
// console.log('Add new user');
// answer(res,'Add new user');
// !err ?
//   answer('Added new user', 200)
// : answer('Problem with registration', 406);
// })



// http://localhost:8080/?name=Alla&surname=Ya&password=ewew&email=qwerty&dob=123
