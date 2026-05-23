import type { AppStore } from '~/stores'
import { observer } from 'mobx-react-lite'
import { RouterProvider } from 'react-router-dom'

import { router } from '~/router'
import { RootContext } from '~/stores'

export interface IAppProps {
    readonly store: AppStore
}

const App = observer(({ store }: IAppProps) => {
    const memoizedStore = useMemo(() => store, [store])

    return (
        <RootContext.Provider value={memoizedStore}>
            <RouterProvider router={router} />
        </RootContext.Provider>
    )
})

export default App
