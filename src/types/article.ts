import { IListConfig } from "."

/**
 * 文章详情
 */
export interface IArticle {
    c_id: string
    c_title: string
    c_content: string
    c_posttime?: string
}

export interface IArticleItemConfig extends Record<string, unknown> {
    data: Nullable<IArticle>
    path?: string
}

export interface IArticleStoreList extends IListConfig {
    data: IArticle[]
}

export interface IArticleStore {
    lists: IArticleStoreList
    item: IArticleItemConfig
}

export interface IFArticleStore {
    lists: IArticleStoreList
    item: IArticleItemConfig
    trending: IArticle[]
}
