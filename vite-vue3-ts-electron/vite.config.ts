import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import electron from 'vite-plugin-electron';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        electron({
            // 主进程入口文件
            entry: 'main.js',
        }),
    ],
    server: {
        // 端口
        port: 3000,
    },
});
