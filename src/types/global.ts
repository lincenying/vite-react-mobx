/**
 * 消息提示配置
 */
export interface IMessage {
    type: 'success' | 'warning' | 'info' | 'error'
    title?: string
    content: string
}

export interface IGlobalStoreState {
    ISDEV?: boolean
    ISPRE?: boolean
    ISPROD?: boolean
    message: IMessage
}

export interface IShellStore {
    needPageTransition: boolean
    isPageSwitching: boolean
    pageTransitionName: string
    historyPageScrollTop: Record<string, number>
}
