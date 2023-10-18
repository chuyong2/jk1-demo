'use strict'

import { app, protocol, BrowserWindow, ipcMain, dialog, Menu, MenuItem, Tray } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
import path from 'path'
import fs from 'fs'

const isDevelopment = process.env.NODE_ENV !== 'production'

// 上下文菜单
let ctxMenu = null

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // 预加载脚本
      preload: path.resolve(__dirname, '../src/preload.js'),
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }


  // 窗口创建完后，创建菜单

  // 方法一: 面向对象的设置菜单

  // 先创建菜单项
  const mi1 = new MenuItem({
    // 菜单项点击后的处理程序
    click: () => {
      console.log('菜单项被点击了');
    },
    // 菜单名称
    label: '菜单1',
    // 追加子菜单
    submenu: [
      { label: '菜单1-1' },
      { label: '菜单1-2' },
    ]
  })

  const mi2 = new MenuItem({
    label: '菜单2'
  })

  // 创建菜单
  const m = new Menu()

  // 将菜单项追加到菜单中
  m.append(mi1)
  m.append(mi2)


  // 方法二: 用对象模板来构建菜单
  // 参数: 菜单项的配置数组
  // const m = Menu.buildFromTemplate([
  //   // 每个对象代表一个菜单
  //   // 该对象的所有属性和 MenuItem 相同
  //   {
  //     label: '菜单1',
  //     // 子菜单
  //     submenu: [
  //       {
  //         label: '菜单1-1',
  //         click: () => {
  //           console.log('1-1');
  //         }
  //       },
  //       {
  //         label: '菜单1-2',
  //         click: () => {
  //           console.log('1-2');
  //         }
  //       }
  //     ]
  //   },
  //   {
  //     label: '菜单2',
  //     submenu: [
  //       {
  //         label: '菜单2-1',
  //         click: () => {
  //           console.log('2-1');
  //         }
  //       },
  //       {
  //         label: '菜单2-2',
  //         click: () => {
  //           console.log('2-2');
  //         }
  //       }
  //     ]
  //   }
  // ])

  // 创建上下文菜单
  ctxMenu = Menu.buildFromTemplate([
    {
      label: '选项1'
    },
    {
      label: '选项2'
    }
  ])

  // 计时器
  // setTimeout(() => {
  //   ctxMenu.popup({
  //     x: 200,
  //     y: 200
  //   })
  // }, 5000)

  // 设置菜单栏
  Menu.setApplicationMenu(m)
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  // ipcMain 是用于主进程和渲染进程通信的对象
  // 此处绑定事件
  // 第一个参数: 事件名称
  // 第二个参数: 事件回调函数
  ipcMain.on('chat', (ev, params) => {
    // ev: 事件对象
    // params: 事件参数
    console.log(ev);
    console.log(params);
    // 回复渲染进程
    // 第一个参数: 事件名
    // 第二个参数: 事件携带的数据
    ev.reply('chatReply', '主进程收到了渲染进程的消息: ' + params)
  })

  // 第一个参数: 事件名
  // 第二个参数: 事件处理程序
  ipcMain.handle('testHandle', (ev, params) => {
    // ev: 事件对象
    // params: 事件参数

    console.log('主进程收到渲染进程的消息: ', params);

    // 此处 可以有返回值，返回值代表就是主进程要回复渲染进程的内容
    return '我是主进程，我收到消息了'
  })

  // 监听读文件事件
  ipcMain.handle('readFile', () => {
    // 选择要读取的文件
    const filePaths = dialog.showOpenDialogSync({
      // 对话框标题
      title: '对话框标题',
      // 文件过滤器
      filters: [
        {
          name: 'vue文件',
          extensions: ['vue', 'png']
        },
        {
          name: 'markdown文件',
          extensions: ['md']
        }
      ]
    })
    console.log(filePaths);

    if (typeof filePaths === 'undefined') {
      // 用户点击了取消
      return
    }

    // 消息对话框
    // const result = dialog.showMessageBoxSync({
    //   message: '确定删除吗?',
    //   // 自定义按钮
    //   buttons: ['确定', '取消']
    // })
    // console.log(result);
    // 读文件
    let fileData = fs.readFileSync(filePaths[0])
    fileData = fileData.toString()
    // 将文件数据返回给渲染进程
    return fileData
  })

  // 显示消息对话框
  ipcMain.on('showMessageBox', (ev, msg) => {
    // 同步显示消息对话框
    // 返回值: 按钮索引
    const btnIdx = dialog.showMessageBoxSync({
      // 消息
      message: msg,
      // 类型
      type: 'question',
      // 按钮组
      buttons: ['天气不错', '阴晴不定', '不确定'],
      // 标题
      title: '友好的问候',
      // 图标
      icon: path.resolve(__dirname, '../images/collection.png')
    })
    console.log(btnIdx);
  })


  // 打开保存对话框
  ipcMain.handle('openSaveDialog', () => {
    return dialog.showSaveDialogSync({
      // 标题
      title: '保存我的文件',
      // 默认路径
      defaultPath: 'C:\\',
      filters: [
        {
          name: '视频文件(.mp4,.wav)',
          extensions: [
            '.mp4',
            '.wav'
          ]
        },
        {
          name: '文本文件(.txt,.md)',
          extensions: [
            '.txt',
            '.md'
          ]
        }
      ]
    })
  })

  ipcMain.on('showErrorBox', (ev, msg) => {
    dialog.showErrorBox('错误标题', msg)
  })

  // 显示上下文菜单
  ipcMain.on('showContextMenu', (ev, point) => {
    ctxMenu.popup(point)
  })






  // 系统托盘
  // 将创建出来的系统托盘对象保存到全局对象global中，避免被垃圾回收给释放掉
  const tray = new Tray(path.resolve(__dirname, '../images/icon.png'))
  // 构造菜单
  const m = Menu.buildFromTemplate([
    {
      label: '菜单1'
    }, {
      label: '菜单2'
    }
  ])
  // 设置菜单
  tray.setContextMenu(m)
  // 设置鼠标悬停时的提示信息
  tray.setToolTip('electron-vue-demo')
  // 添加事件
  tray.once('double-click', () => {
    console.log('once double-click');
  })
  tray.on('double-click', () => {
    console.log('on double-click');
    // 获取所有窗口，找到主窗口，并获取焦点
    BrowserWindow.getAllWindows()[0].focus()
  })

  global.tray = tray

  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
