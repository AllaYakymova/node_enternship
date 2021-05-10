const {Sequelize} = require('sequelize');
const { development: dev } = require('./config/config');

const sequelize = new Sequelize(dev.database, dev.user, dev.password, {
  host: dev.host,
  dialect: dev.dialect,
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
