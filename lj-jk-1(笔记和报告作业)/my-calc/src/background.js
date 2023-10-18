'use strict'

import { app, protocol, BrowserWindow, Menu, ipcMain, Tray } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
import path from 'path'
const isDevelopment = process.env.NODE_ENV !== 'production'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 322,
    height: 501,
    webPreferences: {
      preload: path.resolve(__dirname, '../preload.js'),
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

  // 窗口关闭事件
  win.on('close', (ev) => {
    // 判断窗口是否可见
    if (win.isVisible()) {
      // 隐藏窗口
      win.hide()
      // 中断窗口关闭
      ev.preventDefault()
    }
  })
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
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()

  // 关闭菜单栏
  Menu.setApplicationMenu(null)

  // 托盘图标
  const tray = new Tray(path.resolve(__dirname, '../images/icon.png'))
  const m = Menu.buildFromTemplate([
    {
      label: '显示主界面',
      click: () => {
        // 获取主界面窗口
        const win = BrowserWindow.getAllWindows()[0]
        // 显示窗口
        win.show()
      }
    },
    {
      label: '退出',
      role: 'quit'
    },
  ])
  tray.setContextMenu(m)
  tray.setToolTip("我的计算器")
  tray.on('double-click', () => {
    // 获取主界面窗口
    const win = BrowserWindow.getAllWindows()[0]
    // 显示窗口
    win.show()
  })
  global.tray = tray

  // 监听渲染进程的消息
  ipcMain.on('showContextMenu', (ev, point) => {
    // 创建菜单
    const m = Menu.buildFromTemplate([
      {
        label: '复制',
        role: 'copy'
      },
      {
        label: '粘贴',
        role: 'paste'
      }
    ])
    // 弹出菜单到指定位置
    m.popup(point)
  })
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
