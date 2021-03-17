import React from 'react'
import { NavLink } from 'react-router-dom'

import { Affix } from 'antd'

const Nav = () => {
    return (
        <Affix offsetTop={20}>
            <h1>
                <NavLink to="/" exact activeClassName="current">
                    列表
                </NavLink>
            </h1>
        </Affix>
    )
}

export default Nav
