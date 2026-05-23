import type { IUserCookies } from '~/types'
import { makeAutoObservable } from 'mobx'

export class GlobalStore {
    cookies: IUserCookies = {}

    constructor() {
        makeAutoObservable(this)
    }

    /**
     * 设置用户 Cookie 信息
     * @param config Cookie 配置
     */
    setCookies = async (config: IUserCookies): Promise<void> => {
        this.cookies = config
    }
}
