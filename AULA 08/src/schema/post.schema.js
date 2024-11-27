// Exportando um objeto que define um esquema de validação para um objeto de post
module.exports = {
    // Definindo o tipo do objeto como "object"
    type: "object",
    
    // Definindo as propriedades que o objeto de post deve ter
    properties: {
        // A propriedade 'titulo' deve ser uma string, com um comprimento mínimo de 5 e máximo de 100 caracteres
        titulo: {type: "string", maxLength: 100, minLength: 5},
        
        // A propriedade 'texto' deve ser uma string (não especificado um comprimento)
        texto: {type: "string"},
        
        // A propriedade 'userId' deve ser um número inteiro
        userId: {type: "integer"}
    },
    
    // Definindo que 'titulo', 'texto' e 'userId' são propriedades obrigatórias no objeto
    required: ["titulo", "texto", "userId"],
    
    // Definindo que o objeto não pode ter propriedades adicionais além de 'titulo', 'texto' e 'userId'
    additionalProperties: false
}
