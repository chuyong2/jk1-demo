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

// api application programming interface 应用编程接口 语言或框架自带的提供开发者使用的一些内置工具，例如函数属性等称为api
// sdk development toolkit  开发者工具，第三方平台提供sdk，用于完成第三方平台功能。hms sdk，live2d sdk
contextBridge.exposeInMainWorld('electronAPI', {
    // 声明一个调用主进程的对象方法
    call: (msg) => {
        // 调用 electron api
        // 发起双向通信
        // 第一个参数: 事件名
        // 第二个参数: 事件携带的数据
        return ipcRenderer.invoke('testHandle', msg)
    },
    readFile: () => {
        // 调用主进程读取文件
        return ipcRenderer.invoke('readFile')
    },
    // 显示消息对话框
    showMessageBox: (msg) => {
        ipcRenderer.send('showMessageBox', msg)
    },
    // 打开保存对话框
    openSaveDialog: () => {
        return ipcRenderer.invoke('openSaveDialog')
    },
    showErrorBox: (msg) => {
        ipcRenderer.send('showErrorBox', msg)
    },
    // 显示上下文菜单
    showContextMenu: (x, y) => {
        ipcRenderer.send('showContextMenu', {x, y})
    }
})
