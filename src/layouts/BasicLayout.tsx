import { StyleProvider } from '@ant-design/cssinjs'
import { observer } from 'mobx-react-lite'
import { Outlet } from 'react-router-dom'

import Nav from '~/components/Nav'
import ScrollToTop from '~/components/global/ScrollToTop'

import 'uno.css'
import 'nprogress/nprogress.css'
import '~/assets/scss/style.scss'

export interface IBasicLayoutProps {}

const BasicLayout = observer((_props: IBasicLayoutProps) => {
    return (
        <StyleProvider hashPriority="high">
            <ScrollToTop>
                <div className="flex flex-col">
                    <Nav />
                    <Outlet />
                </div>
            </ScrollToTop>
        </StyleProvider>
    )
})

export default BasicLayout
