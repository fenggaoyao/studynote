// 一、模块的导入与导出
/* const age = 18
const addFn = (x, y) => {
  return x + y
}

module.exports = {
  age: age, 
  addFn: addFn
} */

// 二、module 
/* module.exports = 1111
console.log(module) */

// 三、exports 
// exports.name = 'zce'
/* exports = {
  name: 'syy',
  age: 18
} */

// 四、同步加载
/* let name = 'lg'
let iTime = new Date()

while(new Date() -iTime < 4000) {}

module.exports = name
console.log('m.js被加载导入了') */

/* console.log(require.main == module) */

module.exports = 'lg'

