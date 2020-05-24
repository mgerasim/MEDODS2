'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'ConfigurationVariables', // name of Source model
      'sourceField', // name of the key we're adding 
      {
        type: Sequelize.STRING
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'ConfigurationVariables', // name of Source model
      'sourceField' // key we want to remove
    );
  }
};
