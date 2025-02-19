import type { BuildOptions, ServerOptions } from 'vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const config: { server: ServerOptions, build: BuildOptions } = {
    server: {
        port: 3004,
        host: '0.0.0.0',
        open: true,
        proxy: { // 代理配置
            '/api': {
                target: 'https://php.mmxiaowu.com',
                changeOrigin: true,
                rewrite: (path: string) => path.replace(/^\/api/, '/api'),
            },
        },
        warmup: {
            clientFiles: [
                './src/main.tsx',
                './src/pages/**/*.tsx',
            ],
        },
    },
    build: {
        target: 'es2018',
        cssTarget: 'chrome79',
        minify: true,
        assetsInlineLimit: 4096,
        chunkSizeWarningLimit: 1000,
        outDir: 'dist',
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, 'index.html'),
            },
            // external: /\.\/assets.*/,
            output: {
                manualChunks(id: string) {
                    // 处理css分块
                    if (id.includes('node_modules')) {
                        return 'vendor'
                    }
                    if (id.includes('__uno.css')) {
                        return 'unocss'
                    }
                },
            //     manualChunks(id: string) {
            //         if (id.includes('node_modules')) {
            //             if (id.includes('echarts') || id.includes('zrender'))
            //                 return 'echarts'
            //             return 'vendor'
            //         }
            //     },
            },
        },
    },
}

export default config
