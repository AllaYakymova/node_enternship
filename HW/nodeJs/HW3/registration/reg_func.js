const {answer} = require('../helpers/answer');
const {addNewUserToBd} = require('../bd/reg_query');

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
    addNewUserToBd(user, client, res).then(() => console.log('query is done'))
  } catch (err) {
    console.log(err);
  }
};
