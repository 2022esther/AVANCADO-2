// Importa o módulo readline do Node.js, que permite ler entradas do usuário no terminal
const readline = require('readline');
// o require serve para importar módulos

// Cria a interface de leitura do readline, definindo que a entrada será o terminal (process.stdin)
// e a saída também será o terminal (process.stdout)
const leitor = readline.createInterface({
  input: process.stdin,  // Entrada padrão do terminal (o que o usuário digita)
  output: process.stdout // Saída padrão do terminal (onde as respostas serão exibidas)
});

// Faz uma pergunta ao usuário, mostrando a mensagem "Digite um número de 1 a 10:"
// Quando o usuário digitar algo, esse valor será capturado pela função de callback anônima
leitor.question('Digite um número de 1 a 10: ', function (resposta) {
  
  // Exibe no console o valor que o usuário digitou
  console.log(resposta);
  
  // Fecha a interface de leitura, encerrando o processo de captura de entrada
  leitor.close();
});
