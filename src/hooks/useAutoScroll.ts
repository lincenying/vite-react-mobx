import ls from 'store2'

/**
 * 初始化滚动位置缓存
 */
function ensureScrollTimeout(): void {
    if (!window.$timeout) {
        window.$timeout = {}
    }
}

/**
 * 自动保存与恢复页面滚动位置
 * @param key 滚动缓存键名
 */
export function useAutoScroll(key: string): void {
    const location = useLocation()
    const pathname = location.pathname

    useEffect(() => {
        ensureScrollTimeout()

        const handleScroll = () => {
            if (window.$timeout[key]) {
                clearTimeout(window.$timeout[key])
            }

            window.$timeout[key] = window.setTimeout(() => {
                ls.set(`scroll_path_${pathname}`, window.scrollY)
            }, 200)
        }

        const scrollY = ls.get(`scroll_path_${pathname}`) || 0
        window.scrollTo(0, scrollY)
        ls.set(`scroll_path_${pathname}`, 0)

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])
}
