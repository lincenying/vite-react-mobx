import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'
import { useStore } from '~/stores'

export interface INavProps {}

const Nav = observer((_props: INavProps) => {
    const globals = useStore('globals')
    const username = globals.cookies.username

    return (
        <header
            className="
                flex h-10 w-full items-center justify-between
                bg-white px-5 shadow-sm
                fixed top-0 left-0 right-0 z-50
            "
        >
            <Link
                className="text-base font-medium text-gray-800 hover:text-blue-500"
                to="/"
            >
                M·M·F 小屋
            </Link>
            {username && (
                <span className="text-sm text-gray-500">{username}</span>
            )}
        </header>
    )
})

export default Nav
