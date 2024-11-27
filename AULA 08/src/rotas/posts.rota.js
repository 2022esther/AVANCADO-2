const express = require('express')
const router = express.Router()
// Importa o Express e cria um roteador para gerenciar rotas de forma modular.

const postMid = require('../middleware/validarPost.middleware')
// Importa um middleware que provavelmente valida os dados enviados ao criar ou atualizar um post.

const { Post, Usuario } = require('../db/models')
// Importa os modelos `Post` e `Usuario` para interagir com o banco de dados.

var multer  = require('multer')
// Importa o Multer, um middleware usado para lidar com uploads de arquivos.

const path = require('path')
// Importa o módulo `path`, que fornece utilitários para lidar com caminhos de arquivos.
var storage = multer.diskStorage({
    // Configura o armazenamento dos arquivos enviados pelo Multer.

    destination: function (req, file, cb) {
        // Esta função determina o diretório onde os arquivos enviados serão salvos.
        
        // 'req' é o objeto da requisição HTTP. Ele pode ser usado para acessar dados adicionais,
        // como campos do formulário ou parâmetros de URL, caso seja necessário.
        
        // 'file' é um objeto que contém informações sobre o arquivo enviado, como seu nome,
        // tipo MIME e tamanho. Ele pode ser usado para tomar decisões sobre onde salvar o arquivo.
        
        // 'cb' é um callback que deve ser chamado para informar o destino. 
        // Ele segue o formato `cb(erro, destino)`.

        cb(null, 'public/uploads');
        // Aqui, o primeiro parâmetro `null` indica que não houve erro. Se houvesse algum problema,
        // você passaria o erro como primeiro argumento.
        // O segundo parâmetro `'public/uploads'` é o caminho do diretório onde os arquivos serão salvos.
    },

    filename: function (req, file, cb) {
        // Esta função define o nome dos arquivos no momento de salvá-los.
        
        // 'req' novamente é o objeto da requisição HTTP, permitindo acesso a informações adicionais.

        // 'file' fornece informações sobre o arquivo enviado, incluindo o campo `file.originalname`,
        // que é o nome original do arquivo no sistema do cliente.

        // 'cb' é o callback que segue o formato `cb(erro, nomeDoArquivo)`.

        cb(
            null, 
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
        // O primeiro parâmetro `null` indica que não houve erro. Caso contrário, o erro seria passado aqui.

        // O segundo parâmetro é o novo nome do arquivo:
        // - `file.fieldname` é o nome do campo no formulário onde o arquivo foi enviado.
        // - `Date.now()` retorna o timestamp atual (número de milissegundos desde 1º de janeiro de 1970),
        //   garantindo que cada arquivo tenha um nome único.
        // - `path.extname(file.originalname)` retorna a extensão do arquivo original, como `.jpg` ou `.png`,
        //   para manter a mesma extensão do arquivo enviado.

        // Por exemplo, se o campo de upload for chamado 'imagem' e o arquivo original for 'foto.jpg',
        // o nome gerado será algo como 'imagem-1730357816428.jpg'.
    }
});

const fileFilter = (req, file, cb) => {
    // Define uma função de filtro para validar os tipos de arquivos que podem ser enviados.

    const extensoes = /jpeg|jpg/i;
    // Define uma expressão regular (regex) para verificar extensões permitidas.
    // Neste caso, o regex verifica se a extensão é 'jpeg' ou 'jpg'.
    // O modificador `i` torna a busca case-insensitive (não diferencia entre maiúsculas e minúsculas).

    if (extensoes.test(path.extname(file.originalname))) {
        // Verifica se a extensão do arquivo é válida.
        // 'path.extname(file.originalname)' retorna apenas a extensão do arquivo enviado, incluindo o ponto.
        // Exemplo: se o arquivo for 'foto.jpeg', retorna '.jpeg'.

        cb(null, true);
        // O primeiro parâmetro `null` indica que não houve erro.
        // O segundo parâmetro `true` informa ao Multer que o arquivo é aceito.
    } else {
        return cb('Arquivo não suportado. Apenas jpg e jpeg são suportados.');
        // Caso a extensão não seja válida, o filtro retorna uma mensagem de erro como primeiro parâmetro do callback.
        // Isso rejeita o upload e envia a mensagem de erro.
    }
};

var upload = multer({ storage: storage, fileFilter: fileFilter });
// Cria a instância do Multer com as seguintes configurações:
// - `storage`: Configuração definida anteriormente, especifica onde e como salvar os arquivos.
// - `fileFilter`: A função de filtro que valida os tipos de arquivos permitidos.

// Cria uma instância do Multer usando as configurações de armazenamento e filtro de arquivo.

router.post('/', upload.single('foto'))
//single associa o campo foto para a variável upload que estar armazenando as verificações e os destinos.
// Configura uma rota POST para uploads de arquivos com o campo `foto`.

router.post('/', postMid)
// Aplica o middleware de validação de post para a mesma rota POST.

router.put('/', postMid)
// Aplica o middleware de validação de post para a rota PUT.

router.get('/', async (req, res) => {
    const posts = await Post.findAll()
    // Obtém todos os registros de posts do banco de dados.

    res.json({posts: posts})
    // Retorna os posts no formato JSON.
})

router.get('/:id', async (req, res) => {
    // Define uma rota GET para a URL que contém um parâmetro dinâmico `id`.
    // Exemplo de URL: `/posts/1` (onde `1` é o ID do post).
    // A função de callback é assíncrona (`async`) para suportar operações assíncronas com `await`.

    const post = await Post.findByPk(req.params.id, {
        // Usa o método `findByPk` para buscar um registro no banco de dados pela chave primária (Primary Key).
        // `req.params.id` é o valor do parâmetro `id` da URL, extraído pela biblioteca de roteamento.
        
        include: [{ model: Usuario }],
        // A opção `include` é usada para fazer o relacionamento entre tabelas.
        // Neste caso, inclui informações do modelo relacionado `Usuario`.
        // Isso significa que o resultado conterá os dados do post e do usuário associado a ele.

        raw: true,
        // A opção `raw: true` indica que o resultado será retornado como um objeto plano (não como uma instância do Sequelize).
        // Isso pode facilitar o uso do resultado, pois elimina métodos e metadados adicionais do Sequelize.

        nest: true
        // A opção `nest: true` organiza os dados relacionados em um formato aninhado.
        // Por exemplo:
        // Sem `nest`: `{ 'Usuario.nome': 'João', 'Usuario.email': 'joao@example.com' }`
        // Com `nest`: `{ Usuario: { nome: 'João', email: 'joao@example.com' } }`
    });


    const postProcessado = prepararResultado(post)
    // Processa os dados para remover informações sensíveis.

    res.json({posts: postProcessado})
    // Retorna o post processado no formato JSON.
})



//usa para atualizar como fosse o put
router.post('/:id/upload', upload.single('foto'), async (req, res) => {
    console.log(req.file)
    // Exibe informações do arquivo enviado no console.

    const id = req.params.id
    const post = await Post.findByPk(id)
    // Busca um post pelo ID.

    if (post){
        post.foto = `/static/uploads/${req.file.filename}`
        // Atualiza o campo `foto` do post com o caminho do arquivo enviado.

        await post.save()
        // Salva as alterações no banco de dados.

        res.json({msg: "Upload realizado com sucesso!"})
        // Retorna uma mensagem de sucesso.
    } else {
        res.status(400).json({msg: "Post não encontrado!"})
        // Retorna uma mensagem de erro se o post não for encontrado.
    }
})


router.post('/', async (req, res) => {
    const data = req.body
    // Obtém os dados do corpo da requisição.

    if (req.file){
        data.foto = `/static/uploads/${req.file.filename}`
        // Se houver arquivo enviado, adiciona o caminho ao objeto de dados.
    }

    const post = await Post.create(data)
    // Cria um novo post no banco de dados.

    res.json({msg: "Post adicionado com sucesso!"})
    // Retorna uma mensagem de sucesso.
})

router.delete('/', async (req, res) => {
    const id = req.query.id
    const post = await Post.findByPk(id)
    // Busca um post pelo ID recebido como query string.

    if (post){
        await post.destroy()
        // Exclui o post do banco de dados.

        res.json({msg: "Post deletado com sucesso!"})
        // Retorna uma mensagem de sucesso.
    } else {
        res.status(400).json({msg: "Post não encontrado!"})
        // Retorna uma mensagem de erro se o post não for encontrado.
    }
})

router.put('/', async (req, res) => {
    const id = req.query.id
    const post = await Post.findByPk(id)
    // Busca um post pelo ID recebido como query string.

    if (post){
        post.titulo = req.body.titulo
        post.texto = req.body.texto
        // Atualiza os campos do post com os valores enviados.

        await post.save()
        // Salva as alterações no banco de dados.

        res.json({msg: "Post atualizado com sucesso!"})
        // Retorna uma mensagem de sucesso.
    } else {
        res.status(400).json({msg: "Post não encontrado!"})
        // Retorna uma mensagem de erro se o post não for encontrado.
    }
})

function prepararResultado(post){
    const result = Object.assign({}, post)
    // Cria uma cópia do objeto post.

    if (result.createdAt) delete result.createdAt
    if (result.updatedAt) delete result.updatedAt
    if (result.userId) delete result.userId
    // Remove campos sensíveis ou desnecessários.

    if (result.Usuario){
        if (result.Usuario.senha) delete result.Usuario.senha
        if (result.Usuario.createdAt) delete result.Usuario.createdAt
        if (result.Usuario.updatedAt) delete result.Usuario.updatedAt
        // Remove campos sensíveis do usuário relacionado.
    }

    return result
    // Retorna o objeto filtrado.
}

module.exports = router
// Exporta o roteador para que possa ser usado em outros arquivos.
