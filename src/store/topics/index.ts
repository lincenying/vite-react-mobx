import { makeAutoObservable, runInAction } from 'mobx'
import api from '@/api'
import type { ApiConfig, Article, ArticleStoreList } from '@/types'

export class TopicsStore implements ArticleStoreList {
    constructor() {
        makeAutoObservable(this)
    }

    hasNext = 0
    page = 1
    pathname = ''
    data: Article[] = []

    async getTopics(config: ApiConfig) {
        const { code, data } = await api.get<ResDataLists<Article>>('api/ajax/article-lists', config)
        if (code === 200) {
            // 在async/await函数中, 赋值需要在runInAction中
            runInAction(() => {
                this.data = this.data.concat(data.list)
                this.page = config.page || 1
                this.pathname = config.pathname || ''
            })
        }
    }
}
export default new TopicsStore()
