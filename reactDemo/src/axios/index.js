import axios from 'axios'
import qs from 'qs'
import  Process from "./env"
import cookie from 'react-cookies';
import { message } from 'antd';

// axios创建配置实例
const Axios = axios.create({
    baseURL:Process.webAPI,
    timeout: 10000,
    transformRequest: [
        (data, headers) => qs.stringify(data) // 序列化请求的数据
    ]
});

//添加请求拦截器
Axios.interceptors.request.use(function(config) {
    // 请求头中添加sessionStorage存储的token
    if(cookie.load('Authorization')) {
        config.headers['Authorization'] = cookie.load('Authorization')
    }
    return config
}, function(error) {
    message.error('This is an error message');
    return Promise.reject(error);
});

// 响应拦截器
Axios.interceptors.response.use(function(response) {
    if(response.status === 200) {
        if(response.data.code ===102) {
            this.props.history.push(Process.baseURL)
        }
    }
    return response.data;
}, function(error) {
    message.error('This is an error message');
    return Promise.reject(error);
})

export default Axios
