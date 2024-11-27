// Importa o módulo 'express' para criar o servidor e manipular rotas
const express = require('express')
// Cria uma instância do roteador do Express para definir as rotas
//instância é um objeto que veio de uma classe.
const router = express.Router()

// Importa o middleware que valida as informações do usuário
const validarUsuario = require('../middleware/validarUsuario.middleware')
// Importa o modelo 'Usuario' da base de dados para interagir com a tabela de usuários
const { Usuario } = require('../db/models')

// Define a rota POST para criar um novo usuário, usando o middleware 'validarUsuario' para validar os dados antes de continuar
router.post('/', validarUsuario)

// Define a rota PUT para atualizar um usuário, também usando o middleware 'validarUsuario' para validar os dados
router.put('/', validarUsuario)

// Define a rota GET para listar todos os usuários, usando uma função assíncrona
router.get('/', async (req, res) => {
  // Busca todos os usuários na base de dados utilizando o modelo 'Usuario'
  const usuarios = await Usuario.findAll()
  // Envia a lista de usuários como resposta no formato JSON
  res.json({ usuarios: usuarios })
})

// Define a rota GET para buscar um usuário específico pelo seu 'id', utilizando uma função assíncrona
router.get('/:id', async (req, res) => {
  // Busca o usuário na base de dados usando o id fornecido na URL
  const usuario = await Usuario.findByPk(req.params.id)
  
  // Verifica se o usuário foi encontrado
  if (usuario) {
    // Se encontrado, envia os dados do usuário no formato JSON
    res.json({ usuario: usuario })
  } else {
    // Se não encontrado, retorna um erro 400 com uma mensagem de "Usuário não encontrado"
    res.status(400).json({ msg: "Usuário não encontrado!" })
  }
})

// Define a rota POST para criar um novo usuário, com uma função assíncrona que insere os dados no banco
router.post('/', async (req, res) => {
  // Cria um novo usuário com os dados recebidos no corpo da requisição
  const usuario = await Usuario.create(req.body)
  // Envia uma resposta com a mensagem de sucesso e o ID do usuário recém-criado
  res.json({ msg: "Usuário adicionado com sucesso!", userId: usuario.id })
})

// Define a rota PUT para atualizar as informações de um usuário existente, com uma função assíncrona
router.put('/', async (req, res) => {
  // Obtém o id do usuário a ser atualizado a partir da query string
  const id = req.query.id
  // Busca o usuário na base de dados utilizando o id
  const usuario = await Usuario.findByPk(id)
  
  // Verifica se o usuário foi encontrado
  if (usuario) {
    // Se encontrado, atualiza o e-mail e a senha do usuário com os dados recebidos no corpo da requisição
    usuario.email = req.body.email
    usuario.senha = req.body.senha
    // Salva as alterações no banco de dados
    await usuario.save()
    // Envia uma resposta de sucesso
    res.json({ msg: "Usuário atualizado com sucesso!" })
  } else {
    // Se não encontrado, retorna um erro 400 com a mensagem "Usuário não encontrado"
    res.status(400).json({ msg: "Usuário não encontrado!" })
  }
})

// Define a rota DELETE para excluir um usuário da base de dados, com uma função assíncrona
router.delete('/', async (req, res) => {
  // Obtém o id do usuário a ser excluído a partir da query string
  const id = req.query.id
  // Busca o usuário na base de dados utilizando o id
  const usuario = await Usuario.findByPk(id)

  // Verifica se o usuário foi encontrado
  if (usuario) {
    try {
      // Se encontrado, tenta deletar o usuário do banco de dados
      await usuario.destroy()
      // Envia uma resposta de sucesso
      res.json({ msg: "Usuário deletado com sucesso!" })
    } catch (error) {
      // Se ocorrer algum erro durante a exclusão, retorna um erro 500 com a mensagem "Falha ao remover usuário"
      res.status(500).json({ msg: "Falha ao remover usuário" })
    }
  } else {
    // Se o usuário não for encontrado, retorna um erro 400 com a mensagem "Usuário não encontrado"
    res.status(400).json({ msg: "Usuário não encontrado!" })
  }
})

// Exporta o roteador configurado para ser usado em outro arquivo (geralmente no arquivo principal do servidor)
module.exports = router;
