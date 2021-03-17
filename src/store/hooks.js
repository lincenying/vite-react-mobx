import React from 'react'
import { storesContext } from './'

export const useStores = () => React.useContext(storesContext)

export const useStore = store => React.useContext(storesContext)[store]
