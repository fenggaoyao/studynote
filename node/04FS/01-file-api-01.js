const fs = require('fs')
const path = require('path')

// readFile 
/* fs.readFile(path.resolve('data1.txt'), 'utf-8', (err, data) => {
  console.log(err) 
  if (!null) {
    console.log(data)
  }
}) */

// writeFile 
/* fs.writeFile('data.txt', '123', {
  mode: 438,
  flag: 'w+',
  encoding: 'utf-8'
}, (err) => {
  if (!err) {
    fs.readFile('data.txt', 'utf-8', (err, data) => {
      console.log(data)
    })
  }
}) */

// appendFile
/* fs.appendFile('data.txt', 'hello node.js',{},  (err) => {
  console.log('写入成功')
}) */

// copyFile
/* fs.copyFile('data.txt', 'test.txt', () => {
  console.log('拷贝成功')
}) */

// watchFile
fs.watchFile('data.txt', {interval: 20}, (curr, prev) => {
  if (curr.mtime !== prev.mtime) {
    console.log('文件被修改了')
    fs.unwatchFile('data.txt')
  }
})