import type { AppStore } from '@/stores'

import { StyleProvider } from '@ant-design/cssinjs'
import { observer } from 'mobx-react-lite'

import PageArticle from './article/index'

import Main from './topics/index'
import 'uno.css'
import 'toastr/build/toastr.min.css'
import '../assets/scss/style.scss'
import 'nprogress/nprogress.css'

const App = observer(({ store }: { readonly store: AppStore }) => {
    const nodeRef = useRef(null)

    // 使用 useMemo 确保 store 在整个应用生命周期中保持稳定
    const memoizedStore = useMemo(() => store, [store])

    return (
        <StyleProvider hashPriority="high">
            <RootContext.Provider value={memoizedStore}>
                <div flex="~ col">
                    <div ref={nodeRef}>
                        <Routes>
                            <Route
                                element={<Main />}
                                path="/"
                            />
                            <Route
                                element={<PageArticle />}
                                path="/article/:id"
                            />
                        </Routes>
                    </div>
                </div>
            </RootContext.Provider>
        </StyleProvider>
    )
})
export default App
