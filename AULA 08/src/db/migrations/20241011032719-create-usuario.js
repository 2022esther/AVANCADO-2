'use strict';
// Ativa o modo estrito do JavaScript, ajudando a identificar erros e práticas inseguras no código.

/** @type {import('sequelize-cli').Migration} */
// Comentário que informa que este módulo segue o padrão de migração do Sequelize.

module.exports = {
  // Exporta um objeto com os métodos `up` e `down` usados para gerenciar a migração.

  async up(queryInterface, Sequelize) {
    // Método `up`: Define as alterações a serem feitas no banco de dados ao aplicar a migração.

    await queryInterface.createTable('Usuarios', {
      // Cria a tabela `Usuarios` com as colunas especificadas.

      id: {
        // Coluna `id`, que será a chave primária da tabela.
        allowNull: false,
        // Configura a coluna para não aceitar valores nulos.

        autoIncrement: true,
        // Configura a coluna para ser auto-incrementada.

        primaryKey: true,
        // Define esta coluna como a chave primária da tabela.

        type: Sequelize.INTEGER
        // Define o tipo de dado da coluna como `INTEGER`.
      },

      email: {
        // Coluna `email` para armazenar o e-mail do usuário.
        type: Sequelize.STRING
        // Define o tipo de dado da coluna como `STRING`.
      },

      senha: {
        // Coluna `senha` para armazenar a senha do usuário.
        type: Sequelize.STRING
        // Define o tipo de dado da coluna como `STRING`.
      },

      createdAt: {
        // Coluna `createdAt` para armazenar a data/hora de criação do registro.
        allowNull: false,
        // Configura a coluna para não aceitar valores nulos.

        type: Sequelize.DATE
        // Define o tipo de dado da coluna como `DATE`.
      },

      updatedAt: {
        // Coluna `updatedAt` para armazenar a data/hora da última atualização do registro.
        allowNull: false,
        // Configura a coluna para não aceitar valores nulos.

        type: Sequelize.DATE
        // Define o tipo de dado da coluna como `DATE`.
      }
    });
  },

  async down(queryInterface, Sequelize) {
    // Método `down`: Define as alterações a serem feitas para reverter a migração.

    await queryInterface.dropTable('Usuarios');
    // Remove a tabela `Usuarios` do banco de dados.
  }
};
