import { createBrowserRouter } from 'react-router-dom'

import BasicLayout from '~/layouts/BasicLayout'
import NotFoundPage from '~/pages/404'
import ArticlePage from '~/pages/article/index'
import TopicsPage from '~/pages/topics/index'

export const router = createBrowserRouter([
    {
        element: <BasicLayout />,
        children: [
            {
                index: true,
                element: <TopicsPage />,
            },
            {
                path: 'article/:id',
                element: <ArticlePage />,
                loader: ({ params }) => {
                    if (!params.id) {
                        throw new Response('文章 ID 不能为空', { status: 400 })
                    }
                    return null
                },
            },
            {
                path: '*',
                element: <NotFoundPage />,
            },
        ],
    },
])
