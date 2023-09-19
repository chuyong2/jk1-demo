// 导入electron核心模块
const electron = require('electron')
// 导入路径模块，专门用来处理路径
const path = require('path')

// 引入 app 和 BrowserWindow
// app 是当前应用程序的一个抽象对象
const app = electron.app
// BrowserWindow 窗口类
const BrowserWindow = electron.BrowserWindow

// 主窗口
let mainWindow

// 应用程序启动并准备就绪后
app.whenReady().then(() => {
    // 准备完成后执行的代码
    // 创建窗口
    mainWindow = new BrowserWindow({
        // 宽
        width: 500,
        // 高
        width: 500
    })

    // 加载要显示的页面
    // __dirname: 当前脚本所在目录
    // path.resolve: 连接路径
    mainWindow.loadURL(path.resolve(__dirname, './index.html'))
})

// 所有窗口关闭事件
app.on('window-all-closed', () => {
    // 退出
    app.quit()
})