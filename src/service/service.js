import request from './request'
import BASE_URL from './base_url.js'
// export const BASE_URL = 'http://127.0.0.1:8000/mini'

// const BASE_URL = 'https://api.imyuanli.cn/api/mini'
console.log(BASE_URL)
export async function get_url_icon(payload) {
    return request.post(BASE_URL + '/get_url_icon/', payload)
}
