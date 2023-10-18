const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    showContextMenu: (point) => {
        // 进程通信
        ipcRenderer.send('showContextMenu', point)
    }
})