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
declare type Objable<T = unknown> = Record<string, T>
/**
 * Function
 */
declare type Fn<T = void> = () => T
/**
 * 任意函数
 */
declare type AnyFn<T = unknown> = (...args: unknown[]) => T
/**
 * Promise, or maybe not
 */
declare type Awaitable<T> = T | PromiseLike<T>

declare interface Window {
    $timeout: Record<string, number>
    editormd: unknown
    postEditor: unknown
}
