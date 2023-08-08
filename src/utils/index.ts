import toastr from 'toastr'
import type { Message } from '@/types'

toastr.options.positionClass = 'toast-top-center'

function pluralize(time: number, label: string) {
    return time + label
}

export function setMessage(config: Message | string) {
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
        if (charCode >= 0 && charCode <= 128)
            realLength += 1
        else realLength += 2
    }
    return realLength
}

export function timeAgo(time: string | number) {
    const preg = /^[\d]+$/
    const timestamp = preg.test(`${time}`)
    if (!timestamp) {
        const tmp = Date.parse(`${time}`)
        time = `${tmp / 1000}`
    }
    const between = Date.now() / 1000 - Number(time)
    if (between < 60)
        return '刚刚'

    else if (between < 3600)
        return pluralize(Math.floor(between / 60), ' 分钟前')

    else if (between < 86400)
        return pluralize(Math.floor(between / 3600), ' 小时前')

    return pluralize(Math.floor(between / 86400), ' 天前')
}

export function timeYmd(timestamp: number) {
    const time = new Date(timestamp * 1000)
    const year = time.getFullYear()
    const month = time.getMonth() + 1
    const date = time.getDate()
    return `${year}-${month < 10 ? `0${month}` : month}-${date < 10 ? `0${date}` : date}`
}
