const AuthController = require('../users/users_controller');

module.exports = async (req, res, next) => {
  const authCheck = new AuthController(req, res);
  await authCheck.authUserController();
  next();
};
