const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('demo2_db', 'postgres', 'qwerty', {
  host: 'localhost',
  dialect: 'postgres',
  define: {
    timestamps: false
  }
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

sequelize.sync().then(result=> console.log("sync result")).catch(err=> console.log(err));

module.exports = sequelize;
