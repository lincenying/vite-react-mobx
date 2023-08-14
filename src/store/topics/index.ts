import { action, makeAutoObservable, observable, runInAction } from 'mobx'
import api from '@/api'
import type { ApiConfig, Article, ArticleStoreList } from '@/types'

export class TopicsStore implements ArticleStoreList {
    constructor() {
        makeAutoObservable(this, {
            hasNext: observable,
            page: observable,
            pathname: observable,
            data: observable,
            getTopics: action,
        })
    }

    hasNext = 0
    page = 1
    pathname = ''
    data: Article[] = []

    getTopics = async (config: ApiConfig) => {
        const { code, data } = await api.get<ResponseDataLists<Article[]>>('api/frontend/article/list', config)
        if (code === 200) {
            runInAction(() => {
                this.data = config.page === 1 ? [...data.list] : this.data.concat(data.list)
                this.page = config.page || 1
                this.pathname = config.pathname || ''
            })
        }
    }
}
export default new TopicsStore()
