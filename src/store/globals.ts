import { makeAutoObservable } from 'mobx'
import type { UserCookies } from '@/types'

export class GlobalStore {
    constructor() {
        makeAutoObservable(this)
    }

    cookies: UserCookies = {}

    setCookies = async (config: UserCookies) => {
        this.cookies = config
    }
}
export default new GlobalStore()
