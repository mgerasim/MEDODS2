'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'ConfigurationVariables', // name of Source model
      'sourceFieldValue2', // name of the key we're adding 
      {
        type: Sequelize.STRING
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'ConfigurationVariables', // name of Source model
      'sourceFieldValue2' // key we want to remove
    );
  }
};
