import axios, { AxiosResponse, AxiosError } from 'axios'
import qs from 'qs'
import { message } from 'antd'

/**
 * axios创建配置实例
 */
const Axios = axios.create({
    baseURL:process.env.REACT_APP_NODE_ENV!=="dev"?process.env.REACT_APP_BASE_URL:"",
    timeout: 60000,
    transformRequest: [
        (data) => qs.stringify(data) // 序列化请求的数据
    ]
});


/**
 * http request 拦截器
 */
Axios.interceptors.request.use(
    (config:any) => {
        if (config.url.indexOf("common") !== -1) {
            config.params = {
                ...config.params,
                commonKey: 'KPvJa7VymCFIJYFQlD1zoesA1crMp4jS'
            }
        }
        config.headers = {
            "token": localStorage.getItem('login_token') || ""
        };
        return config;
    },
    (error:AxiosError) => {
        return Promise.reject(error);
    }
);

/**
 * http response 拦截器
 */
Axios.interceptors.response.use(
    (response:AxiosResponse) => {
        message.destroy()
        if(response.data.code===101 || response.data.code===102){
            message.error('登录超时，请重新登录')
            window.location.replace('/')
        }else{
            switch (response.data.code) {
                case 301:
                    message.error('接口请求重定向')
                    break;
                case 400:
                    message.error('接口存在错误')
                    break;
                case 404:
                    message.error('请求地址错误')
                    break;
                case 500:
                    message.error('系统异常, 请稍后再试')
                    break;
                default:
            }
        }
        return response.data;
    },(error: AxiosError) => {
        console.log("请求出错：", error);
        message.error('系统异常, 请稍后再试')
        return Promise.reject(error)
    }
);

export default Axios
