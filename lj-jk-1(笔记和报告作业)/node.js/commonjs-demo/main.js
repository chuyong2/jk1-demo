// 导入模块
// 什么是导入?
// 将别人借出的代码借入到自己的模块中使用，这个过程就是导入

const module1 = require('./module1.js') // 相对路径的话 必须使用 ./ 开头
const module2 = require('./module2.js')

console.log(module1)
console.log(module2)