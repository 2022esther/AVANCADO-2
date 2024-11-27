'use strict';
// Ativa o modo estrito do JavaScript, ajudando a identificar erros e práticas inseguras no código.

const {
  Model
} = require('sequelize');
// Importa a classe `Model` do Sequelize, usada como base para criar modelos.

module.exports = (sequelize, DataTypes) => {
  // Exporta uma função que define o modelo `Usuario`. Recebe as instâncias do Sequelize e DataTypes.

  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Método estático usado para definir associações (relacionamentos) entre modelos.
      // Será implementado se houver relações com outros modelos.
    }
  }

  Usuario.init({
    // Define o esquema do modelo `Usuario` com os campos e seus tipos de dados.

    email: DataTypes.STRING,
    // Campo `email` do tipo `STRING`, usado para armazenar o endereço de e-mail do usuário.

    senha: DataTypes.STRING
    // Campo `senha` do tipo `STRING`, usado para armazenar a senha do usuário.
  }, {
    sequelize,
    // Passa a instância do Sequelize, necessária para associar o modelo ao banco de dados.

    modelName: 'Usuario',
    // Define o nome do modelo como `Usuario`.
  });

  return Usuario;
  // Retorna o modelo para que ele possa ser utilizado em outras partes do código.
};
