'use strict';
// Ativa o modo estrito do JavaScript, ajudando a identificar erros e práticas inseguras no código.

module.exports = {
  // Exporta um objeto com os métodos `up` e `down`, usados para gerenciar as migrações.

  up: async (queryInterface, Sequelize) => {
    // Método `up`: Executado ao aplicar a migração para alterar o esquema do banco de dados.

    const columnExists = await queryInterface.describeTable('Posts');
    // Usa o método `describeTable` para obter informações sobre a estrutura da tabela `Posts`.
    // Isso retorna um objeto contendo todas as colunas da tabela.

    if (!columnExists.userId) {
      // Verifica se a coluna `userId` não existe na tabela.

      await queryInterface.addColumn('Posts', 'userId', {
        // Adiciona a coluna `userId` à tabela `Posts` caso ela não exista.

        type: Sequelize.INTEGER,
        // Define o tipo de dado da coluna como `INTEGER`.

        allowNull: false,
        // Configura a coluna para não aceitar valores nulos, tornando-a obrigatória.
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Método `down`: Executado ao reverter a migração para desfazer as alterações.

    await queryInterface.removeColumn('Posts', 'userId');
    // Remove a coluna `userId` da tabela `Posts`.
  }
};
