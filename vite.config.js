import { loadEnv } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import vitePluginImportus from 'vite-plugin-importus'

const path = require('node:path')

// https://vitejs.dev/config/
export default ({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

    const config = {
        css: {
            preprocessorOptions: {
                less: {
                    javascriptEnabled: true,
                },
            },
        },
        plugins: [
            reactRefresh(),
            AutoImport({
                eslintrc: {
                    enabled: true,
                },
                include: [
                    /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
                    /\.md$/, // .md
                ],
                imports: [
                    'react',
                    'react-router-dom',
                    'ahooks',
                    {
                        'react-redux': ['useSelector', 'useDispatch'],
                        '@/utils': ['setMessage'],
                    },
                ],
                dts: 'src/auto-imports.d.ts',
                dirs: [],

                resolvers: [],
                defaultExportByFilename: false,
                vueTemplate: false,
            }),
            vitePluginImportus([
                {
                    libraryName: 'antd',
                    libraryDirectory: 'es',
                    style: 'index',
                },
            ]),
            UnoCSS(),
        ],
        resolve: {
            alias: {
                '@': path.join(__dirname, './src'),
            },
        },
        server: {
            port: 7773,
            proxy: {
                '/api': {
                    target: 'https://api.mmxiaowu.com',
                    changeOrigin: true,
                    pathRewrite: {
                        '^/api': '/api',
                    },
                },
            },
        },
    }
    return config
}
