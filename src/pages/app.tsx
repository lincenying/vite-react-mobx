import type { AppStore } from '@/stores'
import { StyleProvider } from '@ant-design/cssinjs'

import { observer } from 'mobx-react-lite'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import PageArticle from './article/index'

import Main from './topics/index'
import 'uno.css'
import 'toastr/build/toastr.min.css'
import '../assets/scss/style.scss'
import 'nprogress/nprogress.css'

const routerList = [
    { path: '/', element: <Main /> },
    { path: '/article/:id', element: <PageArticle /> },
]

const App = observer(({ store }: { readonly store: AppStore }) => {
    const location = useLocation()
    const router = useRoutes(routerList, location)
    const nodeRef = useRef(null)

    return (
        <StyleProvider hashPriority="high">
            <RootContext.Provider value={store}>
                <div flex="~ col">
                    <TransitionGroup
                        appear
                        component={null}
                    >
                        <CSSTransition
                            nodeRef={nodeRef}
                            classNames="example"
                            in={false}
                            key={location.key}
                            timeout={{ appear: 300, enter: 300, exit: 300 }}
                        >
                            <div ref={nodeRef}>
                                {router}
                            </div>
                        </CSSTransition>
                    </TransitionGroup>
                </div>
            </RootContext.Provider>
        </StyleProvider>
    )
})
export default App
