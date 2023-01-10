import request from './request'
import BASE_URL from './base_url.js'

export async function get_url_icon(payload) {
    return request.post(BASE_URL + '/get_url_icon/', payload)
}
