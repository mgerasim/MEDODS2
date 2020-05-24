'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      /*
      await queryInterface.addColumn(
        'Configurations', // name of Source model
        'incomingStartCallEvent', // name of the key we're adding 
        {
          type: Sequelize.STRING
        });

      await queryInterface.addColumn(
        'Configurations', // name of Source model
        'incomingStartCallField', // name of the key we're adding 
        {
          type: Sequelize.STRING
        });
      
      await queryInterface.addColumn(
      'Configurations', // name of Source model
      'incomingEndCallEvent', // name of the key we're adding 
      {
        type: Sequelize.STRING
      });

      await queryInterface.addColumn(
      'Configurations', // name of Source model
      'incomingEndCallField', // name of the key we're adding 
      {
        type: Sequelize.STRING
      });

      await queryInterface.addColumn(
      'Configurations', // name of Source model
      'incomingAnswerCallEvent', // name of the key we're adding 
      {
        type: Sequelize.STRING
      });

      await queryInterface.addColumn(
      'Configurations', // name of Source model
      'incomingAnswerCallField', // name of the key we're adding 
      {
        type: Sequelize.STRING
      });

      await queryInterface.addColumn(
      'Configurations', // name of Source model
      'incomingEndCallValue', // name of the key we're adding 
      {
        type: Sequelize.STRING
      });

      await queryInterface.addColumn(
      'Configurations', // name of Source model
      'incomingAnswerCallValue', // name of the key we're adding 
      {
        type: Sequelize.STRING
      });

      await queryInterface.addColumn(
      'Configurations', // name of Source model
      'incomingStartCallEvent2', // name of the key we're adding 
      {
        type: Sequelize.STRING
      });

      await queryInterface.addColumn(
      'Configurations', // name of Source model
      'incomingStartCallField2', // name of the key we're adding 
      {
        type: Sequelize.STRING
      });

      await queryInterface.addColumn(
      'Configurations', // name of Source model
      'incomingEndCallEvent2', // name of the key we're adding 
      {
        type: Sequelize.STRING
      });

      await queryInterface.addColumn(
      'Configurations', // name of Source model
      'incomingEndCallField2', // name of the key we're adding 
      {
        type: Sequelize.STRING
      });

      await queryInterface.addColumn(
      'Configurations', // name of Source model
      'incomingAnswerCallEvent2', // name of the key we're adding 
      {
        type: Sequelize.STRING
      });

      await queryInterface.addColumn(
      'Configurations', // name of Source model
      'incomingAnswerCallField2', // name of the key we're adding 
      {
        type: Sequelize.STRING
      });

      await queryInterface.addColumn(
      'Configurations', // name of Source model
      'incomingStartCallValue2', // name of the key we're adding 
      {
        type: Sequelize.STRING
      });

      await queryInterface.addColumn(
      'Configurations', // name of Source model
      'incomingEndCallValue2', // name of the key we're adding 
      {
        type: Sequelize.STRING
      });

      await queryInterface.addColumn(
      'Configurations', // name of Source model
      'incomingAnswerCallValue2', // name of the key we're adding 
      {
        type: Sequelize.STRING
      });
    
*/
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      /*
      await queryInterface.removeColumn(
        'Configurations', // name of Source model
        'incomingStartCallEvent' // key we want to remove
      );
      await queryInterface.removeColumn(
        'Configurations', // name of Source model
        'incomingStartCallField' // key we want to remove
      );
      await queryInterface.removeColumn(
        'Configurations', // name of Source model
        'incomingEndCallEvent' // key we want to remove
      );
      await queryInterface.removeColumn(
        'Configurations', // name of Source model
        'incomingEndCallField' // key we want to remove
      );
      await queryInterface.removeColumn(
        'Configurations', // name of Source model
        'incomingAnswerCallEvent' // key we want to remove
      );
      await queryInterface.removeColumn(
        'Configurations', // name of Source model
        'incomingAnswerCallField' // key we want to remove
      );
      await queryInterface.removeColumn(
        'Configurations', // name of Source model
        'incomingStartCallValue' // key we want to remove
      );
      await queryInterface.removeColumn(
        'Configurations', // name of Source model
        'incomingEndCallValue' // key we want to remove
      );
      await queryInterface.removeColumn(
        'Configurations', // name of Source model
        'incomingAnswerCallValue' // key we want to remove
      );
      await queryInterface.removeColumn(
        'Configurations', // name of Source model
        'incomingStartCallEvent2' // key we want to remove
      );
      await queryInterface.removeColumn(
        'Configurations', // name of Source model
        'incomingStartCallField2' // key we want to remove
      );
      await queryInterface.removeColumn(
        'Configurations', // name of Source model
        'incomingEndCallEvent2' // key we want to remove
      );
      await queryInterface.removeColumn(
        'Configurations', // name of Source model
        'incomingEndCallField2' // key we want to remove
      );
      await queryInterface.removeColumn(
        'Configurations', // name of Source model
        'incomingAnswerCallEvent2' // key we want to remove
      );
      await queryInterface.removeColumn(
        'Configurations', // name of Source model
        'incomingAnswerCallField2' // key we want to remove
      );
      await queryInterface.removeColumn(
        'Configurations', // name of Source model
        'incomingStartCallValue2' // key we want to remove
      );
      await queryInterface.removeColumn(
        'Configurations', // name of Source model
        'incomingEndCallValue2' // key we want to remove
      );
      await queryInterface.removeColumn(
        'Configurations', // name of Source model
        'incomingAnswerCallValue2' // key we want to remove
      );
*/
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }
};
