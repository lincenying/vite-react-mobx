/**
 * 列表分页配置
 */
export interface IListConfig extends Record<string, unknown> {
    hasNext?: number
    hasPrev?: number
    path?: string
    page: number
}
