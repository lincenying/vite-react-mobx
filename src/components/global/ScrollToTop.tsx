import type { ReactNode } from 'react'

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
