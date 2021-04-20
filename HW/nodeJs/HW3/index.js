const http = require('http'); //HTTP-модуль
const url = require('url'); //url parser module
const {client} = require('./db/db_connect');
const {addNewUser} = require('./registration/reg_func');
const {checkAuth} = require('./authorization/auth_func');
const {validationSchema} = require('./helpers/validation');
const {answer} = require('./helpers/answer');

client
  .connect()
  .then(() => console.log('connected'))
  .catch(err => console.error('connection error', err.stack));

http.createServer((req, res) => {

  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Credential', 'true');

  const query = url.parse(req.url, true).query;
  const {type} = query;

  // обработка полученных данных
  switch (type) {
    case 'reg' : {
      const {name, surname, login, email, dob, password} = query;
      let isValid = validationSchema(name, surname, login, email, dob, password);
      if (isValid) {
        addNewUser(name, surname, login, email, dob, password, client, res)
          .then(() => console.log('Reg query is done'));
      } else {
        answer(res, 406, 'Registration data is not valid');
      }
      break;
    }
    case 'auth' : {
      const {login, password} = query;
      checkAuth(login, password, client, res);
      break;
    }
    default: {
      answer(res, 'Error in request type');
    }
  }
})
  .listen(8080);


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
