/*
 * @Author: dumt@hadlinks.com
 * @Date: 2020-04-01 21:09:51
 * @Last Modified by:   dumt@hadlinks.com
 * @Last Modified time: 2020-04-01 21:09:51
 */

// axios配置文件 配置新的axios类
import axios from 'axios'

let Axios = axios.create({})

// 添加请求拦截器
Axios.interceptors.request.use((config) => {
  // 请求头中添加sessionStorage存储的token
  config.headers['token'] = sessionStorage.getItem('token') || ''
  return config
})

// 添加响应拦截器
Axios.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    return error
  }
)

export default Axios
