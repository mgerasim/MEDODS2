'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Configurations', [{
      AMI_username: 'avancrm',
      AMI_server: 'avantelecom.avantele.com',
      AMI_password: 'U8gOiKNhd95908cP',
      AMI_port: 5038,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
