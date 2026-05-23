import type { IApiConfig, IArticle, IArticleStoreList } from '~/types'
import { getArticleList } from '~/api/articleApi'
import { makeAutoObservable, runInAction } from 'mobx'

export class TopicsStore implements IArticleStoreList {
    hasNext = 0
    page = 1
    pathname = ''
    data: IArticle[] = []

    constructor() {
        makeAutoObservable(this)
    }

    /**
     * 获取文章列表
     * @param config 请求参数
     */
    async getTopics(config: IApiConfig): Promise<void> {
        config.limit = 20

        try {
            const { code, data } = await getArticleList(config)

            if (code === 200) {
                runInAction(() => {
                    this.data = this.data.concat(data.list)
                    this.page = config.page || 1
                    this.pathname = config.pathname || ''
                })
            }
        }
        catch (error) {
            console.error('获取文章列表失败:', error)
        }
    }
}
