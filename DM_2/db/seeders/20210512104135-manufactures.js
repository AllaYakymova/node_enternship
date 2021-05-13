'use strict';
const manufactures = require('../schemas/manufactures');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Manufactures', manufactures);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Manufactures', null, {});
  }
};
