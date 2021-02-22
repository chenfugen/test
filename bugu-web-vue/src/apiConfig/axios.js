// axios配置文件 配置新的axios类
import axios from 'axios'
import qs from 'qs'
import config from '@/apiConfig'
import store from '../store'
import {
	Message
} from 'element-ui';
const {
	baseURL,
	timeout
} = config

function downloadFile(res) {
	let downLoadUrl = window.URL.createObjectURL(res.data)
	let disposition = res.headers['content-disposition'].split(';')[1]
	let obj = qs.parse(disposition)
	createDownloadElement(downLoadUrl, obj.filename)
	URL.revokeObjectURL(downLoadUrl)
}

function createDownloadElement(url, fileName) {
	let a = document.createElement('a')
	a.href = url
	a.download = fileName
	document.body.appendChild(a)
	a.click()
	document.body.removeChild(a)
	a = null
}

// axios创建配置实例
const Ax = axios.create({
	baseURL: baseURL,
	timeout: timeout,
	transformRequest: [
		// eslint-disable-next-line
		(data, headers) => qs.stringify(data) // 序列化请求的数据
	]
});

// 添加请求拦截器
Ax.interceptors.request.use(function(config) {
	// 请求头中添加sessionStorage存储的token
	config.headers['token'] = sessionStorage.getItem('token')
	return config
}, function(error) {
	// 对请求错误做些什么
	return Promise.reject(error);
});

// 添加响应拦截器
Ax.interceptors.response.use(function(response) {
	if (!response.data.code) {
		downloadFile(response)
		return
	}
	if (response.data.code == 103) { // 判断状态码
		store.dispatch('handleLogout')
		Message.error('登录超时，请重新登录')
		return false
	} else if (!response.data.success) {
		Message.error(response.data.msg);
		return response.data
	}
	return response.data
	// 响应数据统一配置
}, function(error) {
	if (error.response.status == 500) {
		Message.error('系统错误，请稍后再试')
	}
	// 对响应错误执行
	return Promise.reject(error);
});

export default Ax //抛出实例