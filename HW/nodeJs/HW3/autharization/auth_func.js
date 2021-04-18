const {checkAuthInBd} = require('../bd/auth_query');

exports.checkAuth = function (login, password, client, res) {
  const authUser = {
    login: login,
    password: password,
  };
  try {
    checkAuthInBd(authUser, client, res).then(() => console.log('Auth query is done'))
  } catch (err) {
    console.log(err);
  }
};
