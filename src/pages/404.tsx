import { Button, Result } from 'antd'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'

export interface INotFoundPageProps {}

const NotFoundPage = observer((_props: INotFoundPageProps) => {
    const navigate = useNavigate()

    const handleBackHome = () => {
        navigate('/')
    }

    return (
        <div className="flex min-h-[60vh] items-center justify-center">
            <Result
                extra={(
                    <Button type="primary" onClick={handleBackHome}>
                        返回首页
                    </Button>
                )}
                status="404"
                subTitle="抱歉，您访问的页面不存在"
                title="404"
            />
        </div>
    )
})

export default NotFoundPage
