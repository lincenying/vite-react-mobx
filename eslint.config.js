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
    },
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
        rules: {
            'antfu/consistent-list-newline': 'off',
        },
    },

    {
        files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
        settings: {
            react: {
                version: '17.0',
            },
        },
        plugins: {
            'react': pluginReact,
            'react-hooks': pluginReactHooks,
        },
        languageOptions: {
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        rules: {
            'react/display-name': 'error',
            'react/jsx-key': 'error',
            'react/jsx-no-comment-textnodes': 'error',
            'react/jsx-no-duplicate-props': 'error',
            'react/jsx-no-target-blank': 'error',
            'react/jsx-no-undef': 'error',
            'react/jsx-uses-react': 'error',
            'react/jsx-uses-vars': 'error',
            'react/no-children-prop': 'error',
            'react/no-danger-with-children': 'error',
            'react/no-deprecated': 'error',
            'react/no-direct-mutation-state': 'error',
            'react/no-find-dom-node': 'error',
            'react/no-is-mounted': 'error',
            'react/no-render-return-value': 'error',
            'react/no-string-refs': 'error',
            'react/no-unescaped-entities': 'error',
            'react/no-unknown-property': 'error',
            'react/no-unsafe': 'off',
            'react/prop-types': 'error',
            'react/require-render-return': 'error',
            'jsx-quotes': ['error', 'prefer-double'],
            'react/react-in-jsx-scope': 'off',
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
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
        ignores: [
            '**/assets',
            '**/static',
        ],
    },
)

export default config
