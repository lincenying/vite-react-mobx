import { makeAutoObservable } from 'mobx'

export class GlobalStore {
    constructor() {
        makeAutoObservable(this)
    }

    cookies = {}

    setCookies = async (config: Obj) => {
        this.cookies = config
    }
}
export default new GlobalStore()
