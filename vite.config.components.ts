import AutoImport from 'unplugin-auto-import/vite'
import vitePluginImportus from 'vite-plugin-importus'
import type { PluginOption } from 'vite'

export default (): PluginOption[] => ([
    /**
     * 按需自动导入API
     * @see https://github.com/antfu/unplugin-auto-import#readme
     */
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
])
