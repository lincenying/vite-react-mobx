import React from 'react'
import { storesContext } from './'

export const useStores = () => React.useContext(storesContext)

export function useStore(store: 'globals' | 'topics' | 'article') {
    const s = React.useContext(storesContext)
    return s[store]
}
