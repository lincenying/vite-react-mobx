import type { AxiosResponse } from 'axios'
import axios from 'axios'
import NProgress from 'nprogress'
import qs from 'qs'
import config from './config'
import { setMessage } from '@/utils'
import type { ApiClientReturn } from '@/types'

axios.interceptors.request.use(
    (config) => {
        NProgress.start()
        return config
    },
    (error) => {
        return Promise.reject(error)
    },
)

axios.interceptors.response.use(
    response => response,
    error => Promise.resolve(error.response),
)

function checkStatus(response: AxiosResponse) {
    NProgress.done()
    if (response.status === 200 || response.status === 304)
        return response

    return {
        data: {
            code: -404,
            message: response.statusText,
            data: response.statusText,
        },
    } as AxiosResponse
}

function checkCode(res: AxiosResponse) {
    if (res.data.code === -500)
        window.location.href = '/backend'

    else if (res.data.code === -400)
        window.location.href = '/'

    else if (res.data.code !== 200)
        setMessage(res.data.message)

    return res.data
}

type API = () => ApiClientReturn

/**
 * axios Api 封装
 * @returns ApiClientReturn
 * @example
 * ```
 * get(url: '/api/url', params: {}, headers: {})
 * post(url: '/api/url', data: {}, headers: {})
 * file(url: '/api/url', data: {}, headers: {})
 * ```
 */
const _api: API = () => ({
    async file(url, data) {
        const response = await axios({
            method: 'post',
            url,
            data,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
            },
        })
        const res = checkStatus(response)
        return checkCode(res)
    },
    async post(url, data) {
        const response = await axios({
            method: 'post',
            url: config.api + url,
            data: qs.stringify(data),
            timeout: config.timeout,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            },
        })
        const res = checkStatus(response)
        return checkCode(res)
    },
    async get(url, params) {
        const response = await axios({
            method: 'get',
            url: config.api + url,
            params,
            timeout: config.timeout,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
            },
        })
        const res = checkStatus(response)
        return checkCode(res)
    },
})

export default _api()
