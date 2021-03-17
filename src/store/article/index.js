import { observable, action, makeAutoObservable, runInAction } from 'mobx'
import api from '@/api'

export class ArticleStore {
    constructor() {
        makeAutoObservable(this, {
            isLoad: observable,
            pathname: observable,
            data: observable,
            getTopics: action
        })
    }

    isLoad = false
    pathname = ''
    data = {}

    getArticle = async config => {
        this.isLoad = false
        const { data, success } = await api.get('/api/v1/topic/' + config.id)
        if (success === true) {
            runInAction(() => {
                this.isLoad = true
                this.data = data
                this.pathname = config.pathname
            })
        }
    }
}
export default new ArticleStore()
