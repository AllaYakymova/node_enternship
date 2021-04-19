const {addNewUserToBd} = require('../db/reg_query');

exports.addNewUser = async function (name, surname, login, email, dob, password, client, res) {
  try {
    const user = {
      name: name,
      surname: surname,
      login: login,
      email: email,
      dob: dob,
      password: password,
    };
    await addNewUserToBd(user, client, res);
  } catch (err) {
    console.log(err);
  }
};
