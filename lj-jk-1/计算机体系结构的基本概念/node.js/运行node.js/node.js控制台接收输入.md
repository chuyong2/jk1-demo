# node.js控制台接收输入

```js
// 创建一个用于接收输入的对象
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

// 提问
// 问题会显示到控制台上
readline.question(`你叫什么名字?`, name => {
  // name: 控制台输入的内容
  console.log(`你好 ${name}!`)
  readline.close()
})
```
