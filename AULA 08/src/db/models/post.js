'use strict';
// Ativa o modo estrito do JavaScript, ajudando a identificar erros e práticas inseguras no código.

const {
    Model, INTEGER
} = require('sequelize');
// Importa a classe `Model` do Sequelize, usada como base para criar modelos.
// Também importa o tipo de dado `INTEGER` do Sequelize (embora neste caso seja desnecessário, já que ele é acessível via `DataTypes`).

module.exports = (sequelize, DataTypes) => {
    // Exporta uma função que define o modelo `Post`. Recebe as instâncias do Sequelize e DataTypes.

    class Post extends Model {
        // Cria a classe `Post` que estende a classe `Model` do Sequelize.

        static associate(models) {
            // Método estático para definir associações (relacionamentos) com outros modelos.
            
            Post.belongsTo(models.Usuario, {foreignKey: 'userId'})
            // Define uma associação `belongsTo`, indicando que cada post pertence a um usuário.
            // A chave estrangeira `userId` na tabela `Posts` referencia a tabela `Usuarios`.
        }
    }

    Post.init({
        // Configura o esquema do modelo `Post`, especificando os campos e seus tipos.

        titulo: DataTypes.STRING,
        // Campo `titulo` do tipo `STRING`, usado para armazenar o título do post.

        texto: DataTypes.STRING,
        // Campo `texto` do tipo `STRING`, usado para armazenar o conteúdo do post.

        userId: DataTypes.INTEGER,
        // Campo `userId` do tipo `INTEGER`, usado como chave estrangeira para associar o post a um usuário.

        foto: DataTypes.STRING
        // Campo `foto` do tipo `STRING`, usado para armazenar o caminho da imagem associada ao post.
    }, {
        sequelize,
        // Passa a instância do Sequelize, necessária para associar o modelo ao banco de dados.

        modelName: 'Post',
        // Define o nome do modelo como `Post`.
    });

    return Post;
    // Retorna o modelo `Post` para que ele possa ser utilizado em outras partes do código.
};
