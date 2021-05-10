'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(50),
        defaultValue: null
      },
      phone: {
        type: Sequelize.STRING(15),
        allowNull: false,
        unique: true
      },
      email: {
        type: Sequelize.STRING(50),
        defaultValue: null
      },
      password: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      createdAt: {type:Sequelize.DATE, allowNull:false, defaultValue: new Date()},
      updatedAt: {type:Sequelize.DATE, allowNull:false, defaultValue: new Date()},
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  },
};
