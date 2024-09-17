import { Affix } from 'antd'

import React from 'react'

function Nav() {
    return (
        <Affix offsetTop={20}>
            <h1>
                <NavLink to="/">
                    列表
                </NavLink>
            </h1>
        </Affix>
    )
}

export default Nav
