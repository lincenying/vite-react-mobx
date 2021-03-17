import { observable, action, makeAutoObservable, runInAction } from 'mobx'
import api from '@/api'

export class TopicsStore {
    constructor() {
        makeAutoObservable(this, {
            hasNext: observable,
            page: observable,
            pathname: observable,
            data: observable,
            getTopics: action
        })
    }

    hasNext = 0
    page = 1
    pathname = ''
    data = []

    getTopics = async config => {
        const { data, success } = await api.get('/api/v1/topics', config)
        if (success === true) {
            runInAction(() => {
                this.data = config.page === 1 ? [].concat(data) : this.data.concat(data)
                this.page = config.page
                this.pathname = config.pathname
            })
        }
    }
}
export default new TopicsStore()
