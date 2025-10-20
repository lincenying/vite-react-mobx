import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'

import Root from './pages/app'

const store = createStore()

console.log(`当前环境: ${import.meta.env.VITE_APP_ENV}`)

if (!window.$timeout) {
    window.$timeout = {}
}

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Root store={store} />
    </BrowserRouter>,
)
