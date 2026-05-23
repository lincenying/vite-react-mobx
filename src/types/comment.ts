import type { IListConfig } from './common'
import type { IUserProfile } from './user'

/**
 * 评论
 */
export interface IComment {
    _id: string
    article_id: string
    userid: IUserProfile
    content: string
    creat_date: string
    is_delete: number
    timestamp: number
    email?: string
    username?: string
}

export interface ICommentStoreList extends IListConfig {
    data: IComment[]
}

export interface ICommentStore {
    lists: ICommentStoreList
}
