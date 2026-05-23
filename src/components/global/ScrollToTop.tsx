import type { ReactNode } from 'react'
import { observer } from 'mobx-react-lite'

export interface IScrollToTopProps {
    children?: ReactNode
}

const ScrollToTop = observer(({ children }: IScrollToTopProps) => {
    const location = useLocation()
    const pathname = location.pathname

    useUpdateEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    return children
})

export default ScrollToTop
