let buf = Buffer.alloc(6)

// fill
/* buf.fill(123)
console.log(buf)
console.log(buf.toString()) */

// write 
/* buf.write('123', 1, 4)
console.log(buf)
console.log(buf.toString()) */

// toString
/* buf = Buffer.from('拉勾教育')
console.log(buf)
console.log(buf.toString('utf-8', 3, 9)) */

// slice 
/* buf = Buffer.from('拉勾教育')
let b1 = buf.slice(-3)
console.log(b1)
console.log(b1.toString()) */

// indexOf
/* buf = Buffer.from('zce爱前端，爱拉勾教育，爱大家，我爱所有')
console.log(buf)
console.log(buf.indexOf('爱qc', 4)) */

// copy 
let b1 = Buffer.alloc(6)
let b2 = Buffer.from('拉勾')

b2.copy(b1, 3, 3, 6)
console.log(b1.toString())
console.log(b2.toString())