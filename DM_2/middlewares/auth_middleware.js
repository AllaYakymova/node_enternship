const AuthController = require('../user/user_controller');

module.exports = async (req, res, next) => {
  const authCheck = new AuthController(req, res);
  await authCheck.authUserController();
  res.locals = {
    user: req.headers.userphone,
    isAuthenticated: true,
  };
  console.log(res.locals);
  next();
};
