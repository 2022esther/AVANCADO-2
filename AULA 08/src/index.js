// Importando o módulo 'express' para criar o servidor
const express = require('express')

// Importando as rotas de usuários e posts de seus respectivos arquivos
const rotaUsuario = require('./rotas/usuario.rota')
const rotaPost = require('./rotas/posts.rota')

// Criando uma instância do aplicativo Express
const app = express()

// Permitindo que o Express parseie requisições com corpo no formato JSON
app.use(express.json())

// Definindo a rota '/usuarios' para usar as rotas de usuários
app.use('/usuarios', rotaUsuario)

// Definindo a rota '/posts' para usar as rotas de posts
app.use('/posts', rotaPost)

// Permitindo que arquivos estáticos (como imagens, CSS, JS) sejam acessados na rota '/static'
app.use('/static', express.static('public'))

// Rota principal '/' que retorna uma mensagem JSON
app.get('/', (req, res) => {
    res.json({msg: "Hello from Express!"})
})

// Iniciando o servidor na porta 8080 e exibindo uma mensagem no console quando estiver pronto
app.listen(8080, () => {
    console.log('Servidor pronto na porta 8080')
})
