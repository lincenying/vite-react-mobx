import { Card, Spin } from 'antd'

import { observer } from 'mobx-react-lite'

const PageArticle = observer(() => {
    const navigate = useNavigate()

    const location = useLocation()
    const pathname = location.pathname
    const params = useParams()
    const { id } = params

    const article = useStore('article')

    const firstPathname = useRef(pathname)

    useEffect(() => {
        if (article.pathname !== location.pathname) {
            article.getArticle({ id, pathname })
        }
    }, [article, id, location.pathname, pathname])

    useMount(() => {
        console.log('article componentDidMount')
        window.scrollTo(0, 0)
    })

    useUpdateEffect(() => {
        console.log('article componentDidUpdate')
        console.log(firstPathname.current, pathname)
    }, [pathname])

    useUpdateEffect(() => {
        document.title = article.data.c_title
    }, [article.pathname])

    const { data } = article

    return (
        <div className="main">
            <Spin
                delay={100}
                size="large"
                spinning={article.pathname !== location.pathname}
            >
                <Card
                    bordered={false}
                    title={data.c_title}
                    extra={<a onClick={() => navigate(-1)}>后退</a>}
                >
                    <div
                        className="article-content"
                        dangerouslySetInnerHTML={{ __html: data.c_content }}
                    />
                </Card>
            </Spin>
        </div>
    )
})
export default PageArticle
