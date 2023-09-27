/**
 * Null 或者 Undefined 或者 T
 */
declare type Nullable<T> = T | null | undefined
/**
 * 非 Null 类型
 */
declare type NonNullable<T> = T extends null | undefined ? never : T
/**
 * 数组<T> 或者 T
 */
declare type Arrayable<T> = T | T[]
/**
 * 键为字符串, 值为 Any 的对象
 */
declare type Obj = Record<string, any>
/**
 * 键为字符串, 值为 T 的对象
 */
declare type ObjT<T> = Record<string, T>
/**
 * Function
 */
declare type Fn<T = void> = () => T
/**
 * 任意函数
 */
declare type AnyFn<T = any> = (...args: any[]) => T
/**
 * Promise, or maybe not
 */
declare type Awaitable<T> = T | PromiseLike<T>

/**
 * 接口返回模板
 */
declare interface ResponseData<T> {
    data: T
    code: number
    message: string
    info?: string
}

/**
 * 接口返回模板里的 Data 数据 - 含分页的列表
 */
declare interface ResponseDataLists<T> {
    hasNext: number | boolean
    hasPrev: number | boolean
    total: number
    list: T
}

/**
 * 接口返回模板里的 Data 数据 - 不含分页的列表
 */
declare interface ResponseDataList<T> {
    list: T
}

declare interface Window {
    $$api: {
        post: (...args) => Promise<any>
        get: (...args) => Promise<any>
        [propName: string]: (...args) => Promise<any>
    }
    editormd: any
    postEditor: any
}
