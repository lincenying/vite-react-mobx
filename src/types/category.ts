/**
 * 分类
 */
export interface ICategory {
    _id: string
    cate_name: string
    cate_order: string
    cate_num?: number
    creat_date?: string
    update_date?: string
    is_delete?: number
    timestamp?: number
}

export interface ICategoryStore {
    lists: ICategory[]
    item: {
        data: Nullable<ICategory>
    }
}
