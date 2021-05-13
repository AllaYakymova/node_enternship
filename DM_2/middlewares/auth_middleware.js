const authController = require('../users/users_controller');

module.exports = async (req, res, next) => {
  await authController.authUserController(req, res, next);
  next();
};
