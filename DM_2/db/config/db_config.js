const {Sequelize} = require('sequelize');
const dotenv = require('dotenv');
dotenv.config({path:__dirname+'/../.env'});
const env = process.env.NODE_ENV || 'development';
const { [env]: mode} = require('./config');

const sequelize = new Sequelize(mode.database, mode.username, mode.password, {
  host: mode.host,
  dialect: mode.dialect,
  define: {
    supportBigNumbers:true,
    timestamps: false
  }
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Sequelize DB connected.');
  } catch (error) {
    console.error('Unable to connect to DB:', error);
  }
})();

module.exports = sequelize;
