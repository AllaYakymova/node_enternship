const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('demo2_db', 'postgres', 'qwerty', {
  host: 'localhost',
  dialect: 'postgres',
  define: {
    timestamps: false
  }
});

sequelize.sync().then(() => console.log("Sequelize has been sync successfully")).catch(err=> console.log(err));

module.exports = sequelize;
