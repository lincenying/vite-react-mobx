import type { UserCookies } from '~/types'
import { makeAutoObservable } from 'mobx'

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
