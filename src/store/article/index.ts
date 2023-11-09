import { action, makeAutoObservable, observable, runInAction } from 'mobx'
import api from '@/api'
import type { ApiConfig, Article } from '@/types'

export class ArticleStore {
    constructor() {
        makeAutoObservable(this, {
            isLoad: observable,
            pathname: observable,
            data: observable,
            getArticle: action,
        })
    }

    isLoad = false
    pathname = ''
    data: Article = {} as Article

    getArticle = async (config: ApiConfig) => {
        this.isLoad = false
        const { code, data } = await api.get<Article>(`api/ajax/article-detail`, config)
        if (code === 200) {
            runInAction(() => {
                this.isLoad = true
                this.data = data
                this.pathname = config.pathname || ''
            })
        }
    }
}
export default new ArticleStore()
