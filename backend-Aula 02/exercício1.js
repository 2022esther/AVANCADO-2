// const fs = require('fs')
// const data = fs.readFileSync('./tmp.txt', {encoding: 'utf-8', flag: 'r'})
// console.log(data)
// console.log('Executou aqui!')


// Importa o módulo 'fs' (file system) para trabalhar com o sistema de arquivos no Node.js
const fs = require('fs');

// Função 'readFile' para ler o arquivo 'tmp.txt' de forma assíncrona
// Parâmetros:
// 1. Caminho do arquivo: './tmp.txt'
// 2. Objeto de opções: {encoding: 'utf-8', flag: 'r'}
//    - encoding: 'utf-8' (lê o arquivo como texto)
//    - flag: 'r' (abre o arquivo no modo de leitura)
// 3. Função de callback que será chamada quando a leitura terminar

fs.readFile('./tmp.txt', {encoding: 'utf-8', flag: 'r'}, function (err, data) {
    // Verifica se houve algum erro durante a leitura do arquivo
    if (!err) {
        // Se não houver erro, imprime o conteúdo do arquivo no console
        console.log(data);
    }
    // Se houver um erro, ele será tratado aqui (embora o código atual não trate o erro explicitamente)
});

// Este console.log é executado imediatamente após o início da leitura do arquivo,
// mesmo antes da leitura terminar, porque 'fs.readFile' é assíncrono
console.log('Executou aqui!');
