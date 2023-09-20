const { app, BrowserWindow } = require('electron');
const { join } = require('path');

// 屏蔽安全警告
// Electron Security Warning (Insecure Content-Security-Policy)
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            // contextIsolation: false,
            // nodeIntegration: true,
            // preload: path.join(__dirname, 'preload.js')
        },
    });

    // 在这里添加 console.log
    console.log('hello world');

    // Development 模式
    if (process.env.VITE_DEV_SERVER_URL) {
        win.loadURL(process.env.VITE_DEV_SERVER_URL);

        // 开启调试台
        win.webContents.openDevTools();
    } else {
        win.loadFile(join(__dirname, 'vite-vue3-ts-electron/index.html'));
    }
};

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
