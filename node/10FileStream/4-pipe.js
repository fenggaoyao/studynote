const fs = require('fs')
const myReadStream = require('./ReadStream')

// const rs = fs.createReadStream('./f9.txt', {
//   highWaterMark: 4
// })

const rs = new myReadStream('./f9.txt')

const ws = fs.createWriteStream('./f10.txt')

rs.pipe(ws)

// data 