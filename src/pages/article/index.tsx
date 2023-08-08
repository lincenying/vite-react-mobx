import React, { useEffect, useRef } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { useMount, useUpdateEffect } from 'ahooks'

import { Card, Spin } from 'antd'
import { useStores } from '@/store/hooks'

function PageArticle() {
    const location = useLocation()
    const pathname = location.pathname
    const params = useParams()
    const { id } = params

    const article = useStores().article

    const firstPathname = useRef(pathname)

    useEffect(() => {
        if (article.pathname !== location.pathname)
            article.getArticle({ id, pathname })
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
        document.title = article.data.title
    }, [article.pathname])

    const { data } = article

    return (
        <Spin spinning={article.pathname !== location.pathname} delay={100} size="large">
            <Card title={data.title} bordered={false}>
                <div className="article-content" dangerouslySetInnerHTML={{ __html: data.content }} />
            </Card>
        </Spin>
    )
}
export default observer(PageArticle)
