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
        jsx: false,
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
            'react/jsx-one-expression-per-line': 'off', // 每行一个 JSX 元素
            'react/no-danger': 'off', // 禁止使用 dangerouslySetInnerHTML
            'react/jsx-max-depth': 'off', // 强制 JSX 最大深度
            'react/jsx-newline': 'off', // 在 jsx 元素和表达式之后换行
            'react/require-default-props': 'off', // 为每个非必需 prop 强制执行 defaultProps 定义
            'react/jsx-props-no-spreading': 'off', // 强制任何 JSX 属性都不会传播
            'react/no-unsafe': 'off', // 禁止使用不安全的生命周期方法
            'jsx-quotes': ['error', 'prefer-double'], // 强制在 JSX 属性中一致使用双引号或单引号
            'react/react-in-jsx-scope': 'off', // 使用 JSX 时需要引入 React
            'react/hook-use-state': 'off', // useState 钩子值和 setter 变量的解构和对称命名
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
