// process.argv: 进程参数
console.log(process.argv);

// 加法运算
// 获取参数
let num1 = process.argv[2]
let num2 = process.argv[3]

// 转换字符串成数字类型
num1 = Number(num1)
num2 = Number(num2)

console.log(num1 + num2)