import { Modal } from 'antd'
import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import { StoresProvider, stores } from './store'
import Root from './pages/app'

const getConfirmation = (message, callback) => {
    Modal.confirm({
        title: message,
        onCancel: () => {
            callback(false)
        },
        onOk: () => {
            callback(true)
        }
    })
}

render(
    <StoresProvider value={stores}>
        <Router getUserConfirmation={getConfirmation}>
            <Root />
        </Router>
    </StoresProvider>,
    document.getElementById('root')
)
