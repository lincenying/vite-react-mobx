import { Avatar, Card, List, Spin } from 'antd'
import React, { useRef, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useMount, useUpdateEffect } from 'ahooks'

import { useStore } from '@/store/hooks'

function Article(props) {
    const pathname = props.location.pathname
    const id = props.match.params.id

    const article = useStore('article')

    const firstPathname = useRef(pathname)

    useEffect(() => {
        if (article.pathname !== props.location.pathname) {
            article.getArticle({ id, pathname })
        }
    }, [])

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
        <Spin spinning={article.pathname !== props.location.pathname} delay={100} size="large">
            <Card title={data.title} bordered={false}>
                <div className="article-content" dangerouslySetInnerHTML={{ __html: data.content }} />
            </Card>
            <div className="reply">
                <List
                    itemLayout="horizontal"
                    dataSource={data.replies}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src={item.author.avatar_url} />}
                                title={<a href="https://ant.design">{item.author.loginname}</a>}
                                description={
                                    <div
                                        className="reply-item-content"
                                        dangerouslySetInnerHTML={{
                                            __html: item.content
                                        }}
                                    />
                                }
                            />
                        </List.Item>
                    )}
                />
            </div>
        </Spin>
    )
}
export default observer(Article)
