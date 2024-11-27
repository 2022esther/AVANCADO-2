// Exportando um objeto que define um esquema de validação para um objeto de usuário
module.exports = {
    // Definindo o tipo do objeto como "object"
    type: "object",
    
    // Definindo as propriedades que o objeto deve ter
    properties: {
        // A propriedade 'email' deve ser uma string no formato de e-mail
        email: {type: "string", format: "email"},
        
        // A propriedade 'senha' deve ser uma string (não especificado um formato)
        senha: {type: "string"}
    },
    
    // Definindo que 'email' e 'senha' são propriedades obrigatórias no objeto
    required: ["email", "senha"],
    
    // Definindo que o objeto não pode ter propriedades adicionais além de 'email' e 'senha'
    additionalProperties: false
}
