import { Affix } from 'antd'
import { observer } from 'mobx-react-lite'

import React from 'react'

const Nav = observer(() => {
    return (
        <Affix offsetTop={20}>
            <h1>
                <NavLink to="/">
                    列表
                </NavLink>
            </h1>
        </Affix>
    )
})

export default Nav
