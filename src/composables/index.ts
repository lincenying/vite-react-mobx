import type { Message } from '~/types'
import ls from 'store2'
import toastr from 'toastr'

toastr.options.positionClass = 'toast-top-center'

function pluralize(time: number, label: string) {
    return time + label
}

export function showMessage(config: Message | string) {
    let content: string, type: 'success' | 'warning' | 'info' | 'error'
    if (typeof config === 'string') {
        content = config
        type = 'error'
    }
    else {
        content = config.content
        type = config.type
    }
    toastr[type](content)
}

export function strlen(str: string) {
    let charCode = -1
    const len = str.length
    let realLength = 0
    for (let i = 0; i < len; i++) {
        charCode = str.charCodeAt(i)
        if (charCode >= 0 && charCode <= 128) {
            realLength += 1
        }
        else {
            realLength += 2
        }
    }
    return realLength
}

export function timeAgo(time: string | number) {
    const preg = /^\d+$/
    const timestamp = preg.test(`${time}`)
    if (!timestamp) {
        const tmp = Date.parse(`${time}`)
        time = `${tmp / 1000}`
    }
    const between = Date.now() / 1000 - Number(time)
    if (between < 60) {
        return '刚刚'
    }

    else if (between < 3600) {
        return pluralize(Math.floor(between / 60), ' 分钟前')
    }

    else if (between < 86400) {
        return pluralize(Math.floor(between / 3600), ' 小时前')
    }

    return pluralize(Math.floor(between / 86400), ' 天前')
}

export function timeYmd(timestamp: number) {
    const time = new Date(timestamp * 1000)
    const year = time.getFullYear()
    const month = time.getMonth() + 1
    const date = time.getDate()
    return `${year}-${month < 10 ? `0${month}` : month}-${date < 10 ? `0${date}` : date}`
}

export function useAutoScroll(key: string) {
    const location = useLocation()
    const pathname = location.pathname

    useEffect(() => {
        const handleScroll = () => {
            if (window.$timeout[key])
                clearTimeout(window.$timeout[key])

            window.$timeout[key] = window.setTimeout(() => {
                console.log(window.scrollY)
                ls.set(`scroll_path_${pathname}`, window.scrollY)
            }, 200)
        }

        const scrollY = ls.get(`scroll_path_${pathname}`) || 0
        window.scrollTo(0, scrollY)
        ls.set(`scroll_path_${pathname}`, 0)

        window.addEventListener('scroll', handleScroll) // 添加滚动事件监听

        return () => {
            window.removeEventListener('scroll', handleScroll) // 组件卸载时移除事件监听
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}
