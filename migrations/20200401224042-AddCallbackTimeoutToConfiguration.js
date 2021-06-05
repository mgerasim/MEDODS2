'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Configurations', // name of Source model
      'callbackTimeout', // name of the key we're adding 
      {
        type: Sequelize.STRING
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Configurations', // name of Source model
      'callbackTimeout' // key we want to remove
    );
  }
};
