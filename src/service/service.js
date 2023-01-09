import request from '../service/request'

// export const BASE_URL = 'http://127.0.0.1:8000/mini'

const BASE_URL = 'https://api.imyuanli.cn/api/mini'

export async function get_url_icon(payload) {
    return request.post(BASE_URL + '/get_url_icon/', payload)
}
