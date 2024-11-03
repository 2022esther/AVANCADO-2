// Importa o módulo 'http' para criar um servidor HTTP.
const http = require('http')

// Importa a função 'v4' do pacote 'uuid' e a renomeia como 'uuidv4'.
// O 'uuid' é usado para gerar identificadores únicos universais, 
// mas neste exemplo, ainda não estamos utilizando isso (poderia ser útil para criar IDs para alunos).
const { v4: uuidv4 } = require('uuid')

// Cria o servidor HTTP usando 'createServer'. Toda vez que uma requisição é recebida,
// o callback fornecido é executado, passando 'req' (requisição) e 'res' (resposta).
const server = http.createServer((req, res) => {

  // O switch verifica o valor de 'req.url', que é o caminho da URL requisitada pelo cliente.
  // Dependendo da URL solicitada, o servidor executará diferentes ações.
  switch (req.url) {

    // Caso a URL requisitada seja "/aluno", este bloco será executado.
    case "/aluno":
      // Configura a resposta HTTP com o status 200 (sucesso) e o tipo de conteúdo 'text/json'.
      res.writeHead(200, { 'Content-Type': 'text/json' })
      
      // Envia uma resposta JSON com uma mensagem "Aluno criado" e o caminho requisitado (req.url).
      // Isso simula a criação de um aluno.
      res.write(JSON.stringify({ "msg": "Aluno criado", "path": req.url }))
      
      // Finaliza a resposta e envia-a ao cliente.
      res.end()
      break

    // O 'default' é o caso padrão que será executado se nenhuma das URLs anteriores corresponder.
    // Neste caso, para qualquer URL que não seja "/aluno", o servidor retorna um erro 404.
    default:
      // Configura a resposta HTTP com o status 404 (não encontrado) e o tipo de conteúdo 'text/json'.
      res.writeHead(404, { 'Content-Type': 'text/json' })
      
      // Envia uma resposta JSON com uma mensagem de erro "Path não encontrado" 
      // e o caminho requisitado (req.url), informando que a URL não foi encontrada.
      res.write(JSON.stringify({ "msg": "Path não encontrado", "path": req.url }))
      
      // Finaliza a resposta e envia-a ao cliente.
      res.end()
  }
})

// O servidor começa a "escutar" requisições na porta 8080.
// Quando o servidor estiver pronto, a mensagem "Servidor iniciado na porta 8080" é exibida no console.
server.listen(8080, () => {
  console.log('Servidor iniciado na porta 8080')
})
