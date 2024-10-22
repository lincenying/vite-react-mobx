import { readFile } from 'node:fs/promises'
import lincy from '@lincy/eslint-config'
import pluginMobx from 'eslint-plugin-mobx'

const autoImport = JSON.parse(
    await readFile(new URL('./.eslintrc-auto-import.json', import.meta.url)),
)

const config = await lincy(
    {
        vue: false,
        react: true,
        unocss: true,
        formatters: true,
        overrides: {
            stylistic: {
                'antfu/consistent-list-newline': 'off',
            },
            ignores: [
                '**/assets',
                '**/static',
            ],
            react: {
                'react/no-unknown-property': 'off',
                'react-refresh/only-export-components': 'off',
            },
        },
    },
    {
        languageOptions: {
            globals: {
                ...autoImport.globals,
            },
        },
    },
    {
        plugins: { mobx: pluginMobx },
        rules: {
            // these values are the same as recommended
            'mobx/exhaustive-make-observable': 'warn',
            'mobx/unconditional-make-observable': 'error',
            'mobx/missing-make-observable': 'error',
            'mobx/missing-observer': 'warn',
        },
    },
)

export default config
