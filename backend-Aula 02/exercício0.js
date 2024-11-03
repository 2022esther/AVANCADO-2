//Código síncrono
const fs = require('fs')
const data = fs.readFileSync('./tmp0.txt', {encoding: 'utf-8', flag: 'r'})
console.log(data)
console.log('Executou aqui!')   