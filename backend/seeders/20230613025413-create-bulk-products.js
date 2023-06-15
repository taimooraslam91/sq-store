'use strict';
const Data = require('../data');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Product', Data.Products);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Product', null, {});
  },
};
