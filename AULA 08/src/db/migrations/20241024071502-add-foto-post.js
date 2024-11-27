'use strict';
// Ativa o modo estrito do JavaScript, ajudando a identificar erros e práticas inseguras no código.

module.exports = {
  // Exporta um objeto com os métodos `up` e `down`, usados pelo Sequelize para gerenciar migrações.

  up: async (queryInterface, Sequelize) => {
    // Método `up`: Executado quando a migração é aplicada (avançando).
    return queryInterface.addColumn('Posts', 'foto', {
      // Adiciona uma nova coluna chamada `foto` à tabela `Posts`.
      type: Sequelize.STRING
      // Define o tipo da coluna como `STRING`, apropriado para armazenar caminhos ou URLs de imagens.
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Método `down`: Executado quando a migração é revertida (voltando).
    return queryInterface.removeColumn('Posts', 'foto');
    // Remove a coluna `foto` da tabela `Posts`.
  }
};
