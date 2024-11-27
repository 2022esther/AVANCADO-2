'use strict';
// Ativa o modo estrito do JavaScript para ajudar a detectar erros e práticas inseguras.

module.exports = {
  // Exporta um objeto com os métodos `up` e `down`, usados para gerenciar migrações.

  async up(queryInterface, Sequelize) {
    // Método `up`: Executado para aplicar a migração, criando a tabela `Posts`.

    await queryInterface.createTable('Posts', {
      // Cria uma nova tabela chamada `Posts`.

      id: {
        allowNull: false,
        // Configura a coluna `id` para não aceitar valores nulos.

        autoIncrement: true,
        // Define que o valor da coluna será incrementado automaticamente.

        primaryKey: true,
        // Define a coluna como chave primária da tabela.

        type: Sequelize.INTEGER
        // Define o tipo da coluna como `INTEGER`.
      },

      titulo: {
        type: Sequelize.STRING
        // Define a coluna `titulo` do tipo `STRING` (texto).
      },

      texto: {
        type: Sequelize.STRING
        // Define a coluna `texto` do tipo `STRING` (texto).
      },

      createdAt: {
        allowNull: false,
        // Configura a coluna `createdAt` para não aceitar valores nulos.

        type: Sequelize.DATE
        // Define o tipo da coluna como `DATE`, usada para armazenar a data e hora de criação.
      },

      updatedAt: {
        allowNull: false,
        // Configura a coluna `updatedAt` para não aceitar valores nulos.

        type: Sequelize.DATE
        // Define o tipo da coluna como `DATE`, usada para armazenar a data e hora da última atualização.
      }
    });
  },

  async down(queryInterface, Sequelize) {
    // Método `down`: Executado para reverter a migração, desfazendo as alterações.

    await queryInterface.dropTable('Posts');
    // Remove a tabela `Posts` do banco de dados.
  }
};
