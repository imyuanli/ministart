let env = process.env.NODE_ENV;
let BASE_URL = "";
if (env === 'production') {  //正式服
    BASE_URL = "https://api.imyuanli.cn/api/mini";
} else { // 本地
    BASE_URL = 'http://127.0.0.1:8000/mini';
}
export default BASE_URL
