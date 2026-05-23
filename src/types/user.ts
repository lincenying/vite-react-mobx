import type { IListConfig } from './common'

/**
 * 用户扩展信息
 */
export interface IUserProfile {
    _id?: string
    username?: string
    email?: string
    wx_avatar?: string
    wx_signature?: string
    [key: string]: unknown
}

/**
 * 用户
 */
export interface IUser {
    _id: string
    username: string
    email: string
    password: string
    creat_date: string
    update_date: string
    is_delete: number
    timestamp: number
    wx_avatar?: string
    wx_signature?: string
    userid?: IUserProfile
}

export interface IUserStoreItem extends Record<string, unknown> {
    data: Nullable<IUser>
    path?: string
}

interface IUserStoreList extends IListConfig {
    data: IUser[]
}

export interface IUserStore {
    lists: IUserStoreList
    item: IUserStoreItem
}

export interface IAdminStoreList extends IListConfig {
    data: IUser[]
}

export interface IAdminStoreItem extends Record<string, unknown> {
    data: Nullable<IUser>
    path?: string
}

export interface IAdminStore {
    lists: IAdminStoreList
    item: IAdminStoreItem
}

export interface IUserCookies extends Record<string, string | undefined> {
    user?: string
    userid?: string
    username?: string
    useremail?: string
}
