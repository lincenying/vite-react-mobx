import { readFile } from 'node:fs/promises'
import lincy from '@lincy/eslint-config'
import plugin from '@unocss/eslint-plugin'

import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'

const autoImport = JSON.parse(
    await readFile(new URL('./.eslintrc-auto-import.json', import.meta.url)),
)

const config = lincy(
    {
        vue: false,
        react: true,
        overrides: {
            stylistic: {
                'antfu/consistent-list-newline': 'off',
            },
            ignores: [
                '**/assets',
                '**/static',
            ],
            react: {
            },
        },
    },
    // unocss 相关规则
    {
        plugins: {
            '@unocss': plugin,
        },
        rules: {
            ...plugin.configs.recommended.rules,
            '@unocss/order': 'off',
        },
    },
    {
        languageOptions: {
            globals: {
                ...autoImport.globals,
            },
        },
    },
)

export default config
