// import ScrollToTop from '~/components/global/ScrollToTop.tsx'
import React from 'react'
import { useLocation } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { StyleProvider } from '@ant-design/cssinjs'

import PageArticle from './article/index'
import Main from './topics/index'

import 'uno.css'
import 'toastr/build/toastr.min.css'
import '../assets/scss/style.scss'
import 'nprogress/nprogress.css'
import { type AppStore, RootContext } from '@/store'

const routerList = [
    { path: '/', element: <Main /> },
    { path: '/article/:id', element: <PageArticle /> },
]

function App({ store }: { readonly store: AppStore }) {
    const location = useLocation()
    const router = useRoutes(routerList, location)

    return (
        <StyleProvider hashPriority="high">
            <RootContext.Provider value={store}>
                <div className="main flex flex-col">
                    <TransitionGroup
                        appear
                        component={null}
                    >
                        <CSSTransition
                            classNames="example"
                            in={false}
                            key={location.key}
                            timeout={{ appear: 300, enter: 300, exit: 300 }}
                        >
                            {router}
                        </CSSTransition>
                    </TransitionGroup>
                </div>
            </RootContext.Provider>
        </StyleProvider>
    )
}
export default App
