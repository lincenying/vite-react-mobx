function pluralize(time: number, label: string): string {
    return `${time}${label}`
}

/**
 * 计算字符串长度（中文计 2 字符）
 * @param str 输入字符串
 */
export function strlen(str: string): number {
    let realLength = 0

    for (let i = 0; i < str.length; i++) {
        const charCode = str.charCodeAt(i)
        realLength += charCode >= 0 && charCode <= 128 ? 1 : 2
    }

    return realLength
}

/**
 * 将时间戳格式化为相对时间
 * @param time 时间戳或日期字符串
 */
export function timeAgo(time: string | number): string {
    const preg = /^\d+$/
    let timestamp = time

    if (!preg.test(`${time}`)) {
        timestamp = `${Date.parse(`${time}`) / 1000}`
    }

    const between = Date.now() / 1000 - Number(timestamp)

    if (between < 60) {
        return '刚刚'
    }

    if (between < 3600) {
        return pluralize(Math.floor(between / 60), ' 分钟前')
    }

    if (between < 86400) {
        return pluralize(Math.floor(between / 3600), ' 小时前')
    }

    return pluralize(Math.floor(between / 86400), ' 天前')
}

/**
 * 将 Unix 时间戳格式化为 YYYY-MM-DD
 * @param timestamp Unix 时间戳（秒）
 */
export function timeYmd(timestamp: number): string {
    const time = new Date(timestamp * 1000)
    const year = time.getFullYear()
    const month = time.getMonth() + 1
    const date = time.getDate()

    return `${year}-${month < 10 ? `0${month}` : month}-${date < 10 ? `0${date}` : date}`
}
