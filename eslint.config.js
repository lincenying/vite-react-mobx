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
        overrides: {
            stylistic: {
                'antfu/consistent-list-newline': 'off',
            },
            ignores: [
                '**/assets',
                '**/static',
            ],
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
    // react 相关规则
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
            ...pluginReact.configs.all.rules,
            ...pluginReactHooks.configs.recommended.rules,
            'react/jsx-filename-extension': 'off', // 禁止可能包含 JSX 文件扩展名
            'react/jsx-first-prop-new-line': 'off', // 强制 JSX 中第一个属性的正确位置
            'react/jsx-no-bind': 'off', // .bind()JSX 属性中禁止使用箭头函数
            'react/forbid-component-props': 'off', // 禁止组件上使用某些 props
            'react/jsx-max-props-per-line': ['error', { maximum: 4 }], // 在 JSX 中的单行上强制执行最多 props 数量
            'react/jsx-no-literals': 'off', // 禁止在 JSX 中使用字符串文字
            'react/jsx-one-expression-per-line': 'off',
            'react/no-danger': 'off',
            'react/jsx-max-depth': 'off',
            'react/jsx-newline': 'off',
            'react/require-default-props': 'off',
            'react/jsx-props-no-spreading': 'off',
            'react/no-unsafe': 'off',
            'jsx-quotes': ['error', 'prefer-double'],
            'react/react-in-jsx-scope': 'off',
            'react/hook-use-state': 'off',
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
