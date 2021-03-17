/* eslint-disable react/require-optimization, no-inline-comments */

// import ScrollToTop from '~/components/global/ScrollToTop.jsx'
import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import Nav from '../components/nav.jsx'
import Article from './article/index.jsx'
import Main from './topics/index.jsx'

import 'toastr/build/toastr.min.css'
import '../assets/scss/style.scss'
import 'nprogress/nprogress.css'

const App = props => {
    return (
        // <ScrollToTop>
        <div className="main">
            <Nav location={props.location} />
            <TransitionGroup appear>
                <CSSTransition classNames="example" in={false} key={props.location.key} timeout={{ appear: 300, enter: 300, exit: 300 }}>
                    <Switch key={props.location.pathname} location={props.location}>
                        <Route name="index" path="/" exact component={Main} />
                        <Route name="article" path="/article/:id" component={Article} />
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
        </div>
        // </ScrollToTop>
    )
}
export default withRouter(App)
