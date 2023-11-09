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
        const { code, data } = await api.get<ResDataLists<Article[]>>('api/ajax/article-lists', config)
        if (code === 200) {
            runInAction(() => {
                this.data = config.page === 1 ? [...data.data] : this.data.concat(data.data)
                this.page = config.page || 1
                this.pathname = config.pathname || ''
            })
        }
    }
}
export default new TopicsStore()
