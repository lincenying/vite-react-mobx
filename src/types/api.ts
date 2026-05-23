import type { AxiosInstance } from 'axios'

/**
 * 全局统一 API 响应类型
 */
export interface IApiResponse<T = unknown> {
    code: number
    message: string
    data: T
    info?: string
}

/**
 * 含分页的列表响应数据
 */
export interface IResDataLists<T> {
    hasNext: number | boolean
    hasPrev: number | boolean
    total: number
    page: number
    list: T[]
}

/**
 * 不含分页的列表响应数据
 */
export interface IResDataList<T> {
    data: T
}

/**
 * 请求参数合集
 */
export interface IApiConfig {
    all?: number
    by?: string | string[]
    from?: string
    id?: string | string[]
    limit?: number
    page?: number
    pathname?: string
    key?: string | string[]
}

/**
 * Api 浏览器端封装类型
 */
export interface IApiClientReturn {
    get: <T>(url: string, params?: Objable, headers?: Objable) => Promise<IApiResponse<T>>
    post: <T>(url: string, data?: Objable, headers?: Objable) => Promise<IApiResponse<T>>
    file: <T>(url: string, data?: Objable, headers?: Objable) => Promise<IApiResponse<T>>
}

/**
 * Api Node 端封装类型
 */
export interface IApiServerReturn {
    post: <T>(url: string, data?: Objable, headers?: Objable) => Promise<IApiResponse<T>>
    get: <T>(url: string, params?: Objable, headers?: Objable) => Promise<IApiResponse<T>>
    cookies: import('./user').IUserCookies
    api: AxiosInstance
    getCookies: () => import('./user').IUserCookies
}
