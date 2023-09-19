// node.js 中全局对象 exports 也可以用来导出内容

function add(x, y) {
    return x + y
}

console.log(exports);

// exports 代表要导出的对象
// exports.add 代表给 exports 对象添加一个 add 属性
exports.add = add