'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn('Product', 'noOfReviews', 'numReviews');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn('Product', 'numReviews', 'noOfReviews');
  },
};
