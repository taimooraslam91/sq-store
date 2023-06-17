'use strict';
const Data = require('../data');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('User', Data.Users);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('User', null, {});
  },
};
