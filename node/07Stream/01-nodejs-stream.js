const fs = require('fs')

let rs = fs.createReadStream('./test.txt')
let ws = fs.createWriteStream('./test1.txt')


rs.pipe(process.stdout)
rs.pipe(ws)