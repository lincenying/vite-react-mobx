import { makeAutoObservable, runInAction } from 'mobx'
import type { ApiConfig, Article } from '@/types'

export class ArticleStore {
    constructor() {
        makeAutoObservable(this)
    }

    isLoad = false
    pathname = ''
    data: Article = {} as Article

    async getArticle(config: ApiConfig) {
        this.isLoad = false
        const { code, data } = await $api.get<Article>(`api/ajax/article-detail`, config)
        if (code === 200) {
            // 在async/await函数中, 赋值需要在runInAction中
            runInAction(() => {
                this.isLoad = true
                this.data = data
                this.pathname = config.pathname || ''
            })
        }
    }
}
export default new ArticleStore()
