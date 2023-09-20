// 导入 electron
const electron = require('electron')
// ipcRenderer: 渲染进程用于和主进程通信的对象
const ipcRenderer = electron.ipcRenderer
// contextBridge: 连接 preload.js 和 渲染进程的桥
const contextBridge = electron.contextBridge

console.log('preload 被执行了');

// 第一个参数: 事件名称
// 第二个参数: 事件回调函数
ipcRenderer.on('chatReply', (ev, params) => {
    console.log('接收到主进程的回复: ' + params);
    console.log(window.receive);
})

// 暴露属性到渲染进程
// 第一个参数：属性名
// 第二个参数：暴露出去的内容
// 通常不会直接把 ipcRenderer 这种 electron 的 api 直接暴露给渲染进程
// 通常应该封装一个函数
// contextBridge.exposeInMainWorld('renderer', ipcRenderer)

// 暴露一个名为 sendMessage 的函数
contextBridge.exposeInMainWorld('sendMessage', (msg) => {
    console.log('收到消息:', msg);
    // msg: 要发出去的消息
    // 对 electron api 的访问，放在该函数中，这样可以确保安全

    // 发送消息
    // 第一个参数: 事件名
    // 第二个参数: 事件携带的数据
    ipcRenderer.send('chat', msg)
})