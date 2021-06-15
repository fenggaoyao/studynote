// 一、导入
/* let obj = require('./m')
console.log(obj) */

// 二、module
// let obj = require('./m')

// 三、exports
/* let obj = require('./m')
console.log(obj) */

// 四、同步加载
/* let obj = require('./m')
console.log('01.js代码执行了') */

let obj = require('./m')
console.log(require.main == module)
