'use strict';
// Ativa o modo estrito do JavaScript, ajudando a identificar erros e práticas inseguras no código.

const fs = require('fs');
// Importa o módulo `fs` (File System), usado para manipular arquivos no sistema.

const path = require('path');
// Importa o módulo `path`, usado para lidar com caminhos de arquivos e diretórios.

const Sequelize = require('sequelize');
// Importa o Sequelize, que é uma biblioteca de ORM (Object-Relational Mapping) para Node.js.

const process = require('process');
// Importa o módulo `process`, que fornece acesso a variáveis e funcionalidades do ambiente de execução.

const basename = path.basename(__filename);
// Armazena o nome base do arquivo atual (por exemplo, `index.js`), útil para ignorar este arquivo na leitura dos modelos.

const env = process.env.NODE_ENV || 'development';
// Obtém o ambiente de execução da aplicação (como `development` ou `production`). 
// Se não estiver definido, assume `development`.

const config = require(__dirname + '/../config/config.json')[env];
// Carrega as configurações do banco de dados a partir de um arquivo `config.json`, selecionando o ambiente atual.

const db = {};
// Inicializa um objeto vazio para armazenar os modelos e a instância do Sequelize.

let sequelize;
// Declara a variável `sequelize` que será usada para armazenar a conexão com o banco de dados.

if (config.use_env_variable) {
  // Verifica se o arquivo de configuração especifica o uso de uma variável de ambiente para a conexão.

  sequelize = new Sequelize(process.env[config.use_env_variable], config);
  // Se sim, inicializa o Sequelize usando a variável de ambiente como a string de conexão.
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
  // Caso contrário, inicializa o Sequelize usando as credenciais e informações do arquivo de configuração.
}

fs
  .readdirSync(__dirname)
  // Lê todos os arquivos no diretório atual (o diretório deste arquivo).

  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      // Exclui arquivos ocultos (nomes que começam com `.`).

      file !== basename &&
      // Exclui o próprio arquivo `index.js`.

      file.slice(-3) === '.js' &&
      // Inclui apenas arquivos com extensão `.js`.

      file.indexOf('.test.js') === -1
      // Exclui arquivos de teste (nomes que contêm `.test.js`).
    );
  })
  .forEach(file => {
    // Para cada arquivo filtrado:

    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    // Importa o modelo e inicializa-o com a instância do Sequelize e os tipos de dados.

    db[model.name] = model;
    // Adiciona o modelo ao objeto `db` com a chave sendo o nome do modelo.
  });

Object.keys(db).forEach(modelName => {
  // Itera sobre cada modelo no objeto `db`.

  if (db[modelName].associate) {
    // Verifica se o modelo possui o método `associate` (definição de associações).

    db[modelName].associate(db);
    // Chama o método `associate`, passando o objeto `db` para permitir o relacionamento entre modelos.
  }
});

db.sequelize = sequelize;
// Adiciona a instância do Sequelize ao objeto `db` para acesso centralizado à conexão com o banco.

db.Sequelize = Sequelize;
// Adiciona a classe Sequelize ao objeto `db`, permitindo acesso aos métodos e tipos da biblioteca.

module.exports = db;
// Exporta o objeto `db`, que contém todos os modelos e a conexão com o banco de dados.
