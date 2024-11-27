const Ajv = require('ajv')
// Importa o AJV, uma biblioteca para validação de dados JSON Schema.

const ajv = new Ajv()
// Cria uma instância do AJV.

const addFormats = require("ajv-formats")
// Importa um módulo adicional para o AJV, que adiciona suporte a formatos como e-mails, URLs, etc.

const usuarioSchema = require('../schema/usuario.schema')
// Importa o schema de validação do usuário, que contém as regras de estrutura e formato dos dados.

addFormats(ajv)
// Adiciona os formatos extras ao AJV, permitindo validações mais complexas como e-mails e datas.

function validarUsuario(req, res, next){
    // Define um middleware para validar os dados do usuário.

    const usuario = req.body
    // Obtém os dados enviados no corpo da requisição.

    const validate = ajv.compile(usuarioSchema)
    // Compila o schema do usuário em uma função de validação.

    const valid = validate(usuario)
    // Executa a validação dos dados do corpo da requisição com base no schema.

    if (valid){
        next()
        // Se os dados forem válidos, chama `next()` para prosseguir para o próximo middleware ou rota.
    } else {
        res.status(400).json({msg: "Dados inválidos", erros: validate.errors})
        // Se os dados forem inválidos, retorna um erro 400 com uma mensagem e os detalhes dos erros.
    }
}

module.exports = validarUsuario
// Exporta o middleware para ser usado em outros módulos.
