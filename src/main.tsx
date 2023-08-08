import React from 'react'
import { createRoot } from 'react-dom/client'

import { BrowserRouter } from 'react-router-dom'
import { StoresProvider, stores } from './store'
import Root from './pages/app'

console.log(`当前环境: ${import.meta.env.VITE_APP_ENV}`)

createRoot(document.getElementById('root')!).render(
    <StoresProvider value={stores}>
        <BrowserRouter>
            <Root />
        </BrowserRouter>
    </StoresProvider>,
)
