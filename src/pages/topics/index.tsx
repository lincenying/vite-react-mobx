import { Button, List, Spin } from 'antd'
import { observer } from 'mobx-react-lite'
import ls from 'store2'

function Main() {
    const location = useLocation()
    const pathname = location.pathname

    const topics = useStore('topics')

    const firstPathname = useRef(pathname)
    const [showMoreBtn, setShowMoreBtn] = useState(true)

    useMount(() => {
        console.log('topics componentDidMount')
        if (topics.pathname !== location.pathname) {
            topics.getTopics({ page: 1, pathname })
        }

        const scrollTop = ls.get(pathname) || 0
        ls.remove(pathname)
        if (scrollTop) {
            window.scrollTo(0, scrollTop)
        }

        document.title = 'M.M.M 小屋'
    })

    useUpdateEffect(() => {
        console.log('topics componentDidUpdate')
        console.log(firstPathname.current, pathname)
    }, [pathname])

    const handleLoadMore = async () => {
        setShowMoreBtn(false)
        await topics.getTopics({ page: topics.page + 1, pathname })
        setShowMoreBtn(true)
    }

    const { data } = topics

    return (
        <div className="main">
            <List
                dataSource={data}
                itemLayout="horizontal"
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta title={
                            <Link className="li-name" to={`/article/${item.c_id}`}>{item.c_title}</Link>
                    }
                        />
                    </List.Item>
                )}
            />

            <ul>
                <li className="page">
                    {showMoreBtn ? <Button onClick={handleLoadMore} type="primary">加载下一页</Button> : <Spin /> }
                </li>
            </ul>
        </div>
    )
}

export default observer(Main)
