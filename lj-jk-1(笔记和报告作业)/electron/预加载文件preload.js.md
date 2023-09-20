# 预加载文件preload.js

## 什么是 preload.js

`preload.js` 是加载页面资源前先加载的脚本文件，该文件中既可以访问 node.js api 也可以访问 `window` 对象，但是不能直接给 `window` 对象中赋值参数

预加载脚本可以在 `BrowserWindow` 构造方法中的 `webPreferences` 选项里被附加到主进程。

## contextIsolation

上下文隔离（Context Isolation）

意思就是 `preload.js` 执行上下文与渲染进程是相互隔离的

我们使用 `contextBridge` 来安全的让主进程和渲染进程进行交互，例如:

```js
const { contextBridge, ipcRenderer } = require('electron')

// 将函数 rightClickHandler 暴露给 MainWorld
// 然后在函数内处理 electron api 的调用
// 这样就能避免渲染进程中调用 electron api 的内容
contextBridge.exposeInMainWorld('rightClickHandler', (x, y) => {
    ipcRenderer.send('rightClick', { x, y })
})
```

名词解释:

- Main World: 渲染进程的执行上下文
- Isolated World: 隔离环境的执行上下文

## 应用场景

用于安全的让渲染进程访问主进程的内容
