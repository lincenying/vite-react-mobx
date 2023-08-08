import React from 'react'

import globals from './globals'
import article from './article'
import topics from './topics'

export const stores = Object.freeze({
    globals,
    topics,
    article,
})

export const storesContext = React.createContext(stores)
export const StoresProvider = storesContext.Provider
