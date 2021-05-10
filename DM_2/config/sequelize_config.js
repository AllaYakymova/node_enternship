const {Sequelize} = require('sequelize');

const db = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DEALECT,
  define: {
    timestamps: false
  }
});

(async () => {
  try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = db;
