import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import Root from './pages/app'
import { createStore } from './store'

const store = createStore()

console.log(`当前环境: ${import.meta.env.VITE_APP_ENV}`)

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Root store={store} />
    </BrowserRouter>,
)
