import React, { use } from 'react'

import { ArticleStore } from './use-article-store'
import { GlobalStore } from './use-global-store'
import { TopicsStore } from './use-topics-store'

export class AppStore {
    globals: GlobalStore
    topics: TopicsStore
    article: ArticleStore

    constructor() {
        this.globals = new GlobalStore()
        this.topics = new TopicsStore()
        this.article = new ArticleStore()
    }
}

const appStore = new AppStore()

export const createStore = () => appStore

export const RootContext = React.createContext<AppStore>(appStore)

export function useStore<T extends keyof AppStore>(key: T): AppStore[T] {
    return use(RootContext)[key]
}
export function useStores() {
    return use(RootContext)
}
