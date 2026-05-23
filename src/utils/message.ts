import type { IMessage } from '~/types'
import { message } from 'antd'

/**
 * 显示消息提示
 * @param config 消息配置或错误文本
 */
export function showMessage(config: IMessage | string): void {
    let content: string
    let type: IMessage['type']

    if (typeof config === 'string') {
        content = config
        type = 'error'
    }
    else {
        content = config.content
        type = config.type
    }

    message[type](content)
}
