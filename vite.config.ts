import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'
import { defineConfig, loadEnv } from 'vite'

import Build from './vite.config.build'
import Components from './vite.config.components'
import Css from './vite.config.css'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url))
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

    const config = {
        base: './',
        server: Build.server,
        build: Build.build,
        css: Css,

        plugins: [
            react(),
            ...Components(),
            UnoCSS(),
        ],
        resolve: {
            alias: {
                '@': path.join(__dirname, './src'),
            },
        },
    }
    return config
})
