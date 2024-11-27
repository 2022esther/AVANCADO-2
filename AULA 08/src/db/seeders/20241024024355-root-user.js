// A diretiva 'use strict' força o JavaScript a rodar em modo estrito, prevenindo certos comportamentos não seguros
'use strict';

// Exporta um objeto contendo as funções 'up' e 'down' para manipulação do banco de dados
module.exports = {
    // Função 'up' que será executada para aplicar a migração, ou seja, inserir dados no banco de dados
    //npx sequilize-cli db:seed:all
    up: async (queryInterface, Sequelize) => {
        // Insere um novo registro na tabela 'Usuarios'
        await queryInterface.bulkInsert('Usuarios', [{
            // Define o valor para o campo 'email'
            email: 'root@gmail.com',
            // Define o valor para o campo 'senha'
            senha: 'd8fy83uu4j',
            // Define o valor para o campo 'createdAt' com a data e hora atuais
            createdAt: new Date(),
            // Define o valor para o campo 'updatedAt' com a data e hora atuais
            updatedAt: new Date()
        }])
    },

    // Função 'down' que será executada para reverter a migração, ou seja, remover dados do banco de dados
    //npx sequilize-cli db:seed:undo
    down: async (queryInterface, Sequelize) => {
        // Remove o registro da tabela 'Usuarios' com o email 'root@gmail.com'
        await queryInterface.bulkDelete('Usuarios', {email: 'root@gmail.com'}, {})
    }
};
