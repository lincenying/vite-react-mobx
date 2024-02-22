import React from 'react'

import { GlobalStore } from './globals'
import { ArticleStore } from './article'
import { TopicsStore } from './topics'

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
    return useContext(RootContext)[key]
}
export function useStores() {
    return useContext(RootContext)
}
