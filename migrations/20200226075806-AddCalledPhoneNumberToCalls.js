'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Calls', // name of Source model
      'called_phone_number', // name of the key we're adding 
      {
        type: Sequelize.STRING
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Configurations', // name of Source model
      'called_phone_number' // key we want to remove
    );
  }
};
