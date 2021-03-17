/* eslint-disable no-inline-comments */
import { Avatar, Button, List, Spin } from 'antd'
import React, { useState, useRef } from 'react'
import { Link, Prompt } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { useMount, useUpdateEffect } from 'ahooks'
import ls from 'store2'

import { useStore } from '@/store/hooks'

function Main(props) {
    const pathname = props.location.pathname

    const topics = useStore('topics')

    const firstPathname = useRef(pathname)
    const [showMoreBtn, setShowMoreBtn] = useState(true)

    useMount(() => {
        console.log('topics componentDidMount')
        if (topics.pathname !== props.location.pathname) {
            topics.getTopics({ page: 1, pathname })
        }
        const scrollTop = ls.get(pathname) || 0
        ls.remove(pathname)
        if (scrollTop) window.scrollTo(0, scrollTop)

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
        <div>
            {/* <Prompt when message={() => '确定要离开页面吗？'} /> */}
            <Prompt
                when
                message={() => {
                    const path = props.location.pathname
                    const scrollTop = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop)
                    ls.set(path, scrollTop)
                    return true
                }}
            />
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={item.author.avatar_url} />}
                            title={
                                <Link to={`/article/${item.id}`} className="li-name">
                                    {item.title}
                                </Link>
                            }
                        />
                    </List.Item>
                )}
            />
            <ul>
                <li className="page">
                    {showMoreBtn ? (
                        <Button type="primary" onClick={handleLoadMore}>
                            加载下一页
                        </Button>
                    ) : (
                        <Spin />
                    )}
                </li>
            </ul>
        </div>
    )
}

export default observer(Main)
