import { createRoot } from 'react-dom/client'

import App from './App'
import { createStore } from './stores'

const store = createStore()

createRoot(document.getElementById('root')!).render(
    <App store={store} />,
)
