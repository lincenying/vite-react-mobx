import { Button, Card, Spin } from 'antd'
import { observer } from 'mobx-react-lite'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useStore } from '~/stores'

const ArticlePage = observer(() => {
    if (window.$timeout?.list) {
        clearTimeout(window.$timeout.list)
    }

    const navigate = useNavigate()
    const location = useLocation()
    const pathname = location.pathname
    const params = useParams()
    const { id } = params

    const article = useStore('article')

    useEffect(() => {
        if (article.pathname !== location.pathname) {
            article.getArticle({ id, pathname })
        }
    }, [article, id, location.pathname, pathname])

    useUpdateEffect(() => {
        document.title = article.data.c_title
    }, [article.pathname])

    const handleGoHome = () => {
        navigate('/')
    }

    const handleGoBack = () => {
        navigate(-1)
    }

    const { data } = article

    return (
        <div className="main max-w-5xl mx-auto p-5 bg-white">
            <Spin
                size="large"
                spinning={article.pathname !== location.pathname}
            >
                <Card
                    variant="borderless"
                    extra={(
                        <div>
                            <Button onClick={handleGoHome} type="link">首页</Button>
                            <Button onClick={handleGoBack} type="link">后退</Button>
                        </div>
                    )}
                    title={data.c_title}
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

export default ArticlePage
