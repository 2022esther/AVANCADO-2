// Importa a biblioteca Ajv, que é um validador de esquemas JSON
const Ajv = require('ajv')

// Cria uma nova instância do validador Ajv
const ajv = new Ajv()

// Importa o esquema (schema) para validação dos dados do post, que está em um arquivo externo
const postSchema = require('../schema/post.schema')

// Função middleware para validar os dados do post no corpo da requisição
function validarPost(req, res, next) {
    // Obtém o corpo da requisição (os dados enviados no POST)
    const post = req.body

    // Verifica se o campo 'userId' está presente no objeto 'post'
    if (post.userId) {
        // Se 'userId' estiver presente, converte o valor para um número
        post.userId = Number(post.userId)
    }

    // Compila o esquema de validação (postSchema) usando o Ajv
    const validate = ajv.compile(postSchema)

    // Valida os dados do post usando o esquema compilado
    const valid = validate(post)

    // Verifica se os dados são válidos de acordo com o esquema
    if (valid) {
        // Se os dados forem válidos, chama o próximo middleware (continua a execução)
        next()
    } else {
        // Se os dados forem inválidos, retorna um erro 400 com uma mensagem e os erros de validação
        res.status(400).json({ msg: "Dados inválidos", erros: validate.errors })
    }
}

// Exporta a função 'validarPost' para ser utilizada em outros arquivos
module.exports = validarPost
