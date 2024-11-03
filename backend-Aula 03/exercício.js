// Importa o módulo 'http' para criar um servidor HTTP.
const http = require('http')

// Cria o servidor HTTP usando 'createServer'. Este método espera uma função de callback,
// que é chamada sempre que o servidor recebe uma requisição.
// Essa função tem dois parâmetros: 'req' (request) e 'res' (response).
const server = http.createServer((req, res) => {
    
    // O parâmetro 'req' (request) contém todas as informações sobre a requisição
    // que o cliente fez ao servidor. Por exemplo:
    // - 'req.url' contém a URL requisitada (exemplo: '/home').
    // - 'req.method' contém o método HTTP usado (exemplo: 'GET' ou 'POST').
    // Aqui, estamos apenas exibindo a URL requisitada no console.
    console.log(req.url)
    
    // O parâmetro 'res' (response) é utilizado para configurar e enviar a resposta
    // de volta ao cliente. Aqui, definimos o cabeçalho da resposta com 'res.writeHead'.
    // O status 200 indica sucesso, e 'Content-Type' informa que o conteúdo da resposta
    // será no formato JSON (texto estruturado). Esse cabeçalho é importante para que
    // o cliente saiba como interpretar o conteúdo recebido.
    res.writeHead(200, { 'Content-Type': "text/json" })
    
    // Com 'res.write', escrevemos o corpo da resposta, ou seja, os dados que
    // serão enviados ao cliente. Neste caso, estamos enviando uma mensagem JSON
    // que diz "Hello World!!". O método 'JSON.stringify()' converte o objeto JavaScript
    // em uma string no formato JSON.
    res.write(JSON.stringify({ msg: "Hello World!!" }))
    
    // Finaliza a resposta usando 'res.end'. Isso sinaliza que todos os dados foram
    // enviados ao cliente e que o servidor está pronto para processar novas requisições.
    // Até que 'res.end()' seja chamado, a conexão com o cliente continua aberta.
    res.end()
})

// O servidor começa a "ouvir" requisições na porta 8080.
// Quando o servidor estiver pronto e escutando na porta 8080, o callback será executado,
// e a mensagem "Servidor pronto na porta 8080!" será exibida no console.
server.listen(8080, () => {
    console.log('Servidor pronto na porta 8080!')
})
