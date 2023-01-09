import axios from 'axios';
import {ElNotification} from "element-plus";

const HTTP_STATUS = {
    SUCCESS: 200,
    CREATED: 201,
    ACCEPTED: 202,
    CLIENT_ERROR: 400,
    AUTHENTICATE: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
};

function request(url, data = {}, method = 'GET') {
    return new Promise(function (resolve, reject) {
        let axiosJson = {
            url: url,
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
        };
        if (method === 'GET') {
            axiosJson['params'] = data;
        } else {
            axiosJson['data'] = data;
        }
        axios(axiosJson).then((res) => {
            if (res.status === HTTP_STATUS.SUCCESS) {
                if (res.data.errno === 0) {
                    resolve(res.data.data);
                } else {

                }
            }
        }).catch(err => {
            ElNotification({
                title: '警告',
                message: '网络波动了，请稍后刷新重试一下',
                type: 'warning',
            })
            reject(err);
        });
    });
}

request.get = (url, data) => {
    return request(url, data, 'GET');
};

request.post = (url, data) => {
    return request(url, data, 'POST');
};

export default request;
