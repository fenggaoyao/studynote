const fs = require('fs')
const vm = require('vm')

let age = 33
let content = fs.readFileSync('test.txt', 'utf-8')

// eval
// eval(content)

// new Function
/* console.log(age)
let fn = new Function('age', "return age + 1")
console.log(fn(age)) */

vm.runInThisContext("age += 10")

console.log(age)