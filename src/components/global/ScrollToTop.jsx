import { useRef } from 'react'
import { useUpdateEffect } from 'ahooks'

export default function ScrollToTop(props) {
    const pathname = props.location.pathname
    const firstPathname = useRef(pathname)

    useUpdateEffect(() => {
        console.log('componentDidUpdate')
        console.log(firstPathname.current, pathname)
        window.scrollTo(0, 0)
    }, [props])

    return props.children
}
