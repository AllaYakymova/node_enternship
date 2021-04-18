const fs = require('fs'); // files system
// const {client} = require('../bd/db_connect');
const {answer} = require('../helpers/answer');
const {addNewUserToBd} = require('../bd/db_queries');

exports.addNewUser = function (name, surname, login, email, dob, password, client, res) {
  const user = {
    name: name,
    surname: surname,
    login: login,
    email: email,
    dob: dob,
    password: password,
  };
  try {
    addNewUserToBd(user, client)
        .then((data) => {
          let response = data.length !== 0 ? data : `User with login ${user.login} inserted successfully`;
          console.log("response:", response);
          answer(res, response);
        })
  } catch (err) {
    console.log(err);
  }
  //
  // fs.readFile('users.json', {}, (err, data) => {
  //   let usersArr = JSON.parse(data);
  //   usersArr = [...usersArr, user];
  //   fs.writeFile('users.json', JSON.stringify(usersArr), err => {
  //     if (err) throw err;
  //     answer(res, 'New user is added');
  //   });
  // });
};
