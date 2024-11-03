'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Verifique se a coluna já existe antes de adicionar
    const columnExists = await queryInterface.describeTable('Posts');
    
    if (!columnExists.userId) {
      await queryInterface.addColumn('Posts', 'userId', {
        type: Sequelize.INTEGER,
        allowNull: false,
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Posts', 'userId');
  }
};
