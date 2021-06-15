const fs = require('fs')
const path = require('path')

// open 
/* fs.open(path.resolve('data.txt'), 'r', (err, fd) => {
  console.log(fd)
}) */

// close
fs.open('data.txt', 'r', (err, fd) => {
  console.log(fd)
  fs.close(fd, err => {
    console.log('关闭成功')
  })
})