'use strict';
const units = require('../schemas/units');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Units', units);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Units', null, {});
  }
};

