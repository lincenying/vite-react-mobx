import type { ReactNode } from 'react'
import { useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useUpdateEffect } from 'ahooks'

interface Props {
    children?: ReactNode
}

export default function ScrollToTop(props: Props) {
    const location = useLocation()
    const pathname = location.pathname
    const firstPathname = useRef(pathname)

    useUpdateEffect(() => {
        console.log('componentDidUpdate')
        console.log(firstPathname.current, pathname)
        window.scrollTo(0, 0)
    }, [props])

    return props.children
}
