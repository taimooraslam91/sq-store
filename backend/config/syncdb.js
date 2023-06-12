const { sequelize } = require('../models');

module.exports = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.log('Models not synced: ', error);
  }
};
