// import ScrollToTop from '~/components/global/ScrollToTop.tsx'
import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import PageArticle from './article/index'
import Main from './topics/index'

import '@unocss/reset/tailwind.css'
import 'uno.css'
import 'toastr/build/toastr.min.css'
import '../assets/scss/style.scss'
import 'nprogress/nprogress.css'

function App() {
    const location = useLocation()
    return (
        <div className="main flex flex-col">
            <TransitionGroup appear>
                <CSSTransition classNames="example" in={false} key={location.key} timeout={{ appear: 300, enter: 300, exit: 300 }}>
                    <Routes>
                        <Route path="/" element={<Main />} />
                        <Route path="/article/:id" element={<PageArticle />} />
                    </Routes>
                </CSSTransition>
            </TransitionGroup>
        </div>
    )
}
export default App
