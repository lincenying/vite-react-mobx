import type { IApiConfig, IArticle } from '~/types'
import { getArticleDetail } from '~/api/articleApi'
import { makeAutoObservable, runInAction } from 'mobx'

export class ArticleStore {
    isLoad = false
    pathname = ''
    data: IArticle = {} as IArticle

    constructor() {
        makeAutoObservable(this)
    }

    /**
     * 获取文章详情
     * @param config 请求参数
     */
    async getArticle(config: IApiConfig): Promise<void> {
        this.isLoad = false

        try {
            const { code, data } = await getArticleDetail(config)

            if (code === 200) {
                runInAction(() => {
                    this.isLoad = true
                    this.data = data
                    this.pathname = config.pathname || ''
                })
            }
        }
        catch (error) {
            console.error('获取文章详情失败:', error)
        }
    }
}
