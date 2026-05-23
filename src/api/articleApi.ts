import type { IApiConfig, IApiResponse, IArticle, IResDataLists } from '~/types'

import { request } from '~/utils/request'

/**
 * 获取文章详情
 * @param config 请求参数
 */
export function getArticleDetail(config: IApiConfig): Promise<IApiResponse<IArticle>> {
    return request.get<IArticle>('api/ajax/article-detail', config)
}

/**
 * 获取文章列表
 * @param config 请求参数
 */
export function getArticleList(config: IApiConfig): Promise<IApiResponse<IResDataLists<IArticle>>> {
    return request.get<IResDataLists<IArticle>>('api/ajax/article-lists', config)
}
