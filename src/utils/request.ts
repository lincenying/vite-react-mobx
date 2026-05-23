import type { AxiosResponse } from 'axios'
import type { IApiClientReturn, IApiResponse } from '~/types'
import axios from 'axios'
import NProgress from 'nprogress'
import qs from 'qs'

import { showMessage } from './message'

export const apiConfig = {
    api: import.meta.env.VITE_APP_API,
    timeout: 30000,
}

axios.interceptors.request.use(
    (config) => {
        NProgress.start()
        return config
    },
    error => Promise.reject(error),
)

axios.interceptors.response.use(
    response => response,
    (error) => {
        const response = {} as AxiosResponse
        response.config = error.config
        response.data = null
        response.headers = error.config?.headers
        response.status = error.code
        response.statusText = error.message
        response.request = error.request
        return Promise.resolve(response)
    },
)

function checkStatus(response: AxiosResponse): IApiResponse<unknown> {
    NProgress.done()

    if (response.status === 200 || response.status === 304) {
        return response.data as IApiResponse<unknown>
    }

    if (response.status === 401) {
        return {
            code: 401,
            info: response.statusText || response.toString(),
            data: response.statusText || response.toString(),
            message: '您还没有登录, 或者登录超时!',
        }
    }

    return {
        code: -404,
        info: response.statusText || response.toString(),
        data: response.statusText || response.toString(),
        message: `接口返回数据错误, 错误代码: ${response.status || '未知'}`,
    }
}

function checkCode<T>(data: IApiResponse<T>): IApiResponse<T> {
    if (data.code === -500) {
        window.location.href = '/backend'
    }
    else if (data.code === -400) {
        window.location.href = '/'
    }
    else if (data.code === 401) {
        showMessage(data.message)
    }
    else if (data.code !== 200) {
        showMessage(data.message)
    }

    return data
}

/**
 * axios 请求封装
 */
export const request: IApiClientReturn = {
    async file<T>(url: string, data?: Objable) {
        const response = await axios({
            method: 'post',
            url,
            data,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
            },
        })
        const res = checkStatus(response)
        return checkCode(res as IApiResponse<T>)
    },
    async post<T>(url: string, data?: Objable) {
        const response = await axios({
            method: 'post',
            url: apiConfig.api + url,
            data: qs.stringify(data),
            timeout: apiConfig.timeout,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            },
        })
        const res = checkStatus(response)
        return checkCode(res as IApiResponse<T>)
    },
    async get<T>(url: string, params?: Objable) {
        const response = await axios({
            method: 'get',
            url: apiConfig.api + url,
            params,
            timeout: apiConfig.timeout,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
            },
        })
        const res = checkStatus(response)
        return checkCode(res as IApiResponse<T>)
    },
}

export default request
