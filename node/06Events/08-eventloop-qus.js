// setTimeout(() => {
//   console.log('timeout')
// }, 0)

// setImmediate(() => {
//   console.log('immdieate')
// })

const fs = require('fs')

fs.readFile('./m1.js', () => {
  setTimeout(() => {
    console.log('timeout')
  }, 0)
  
  setImmediate(() => {
    console.log('immdieate')
  })
})