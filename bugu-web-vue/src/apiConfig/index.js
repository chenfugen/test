let version = '1.0.0' // 系统版本
// api地址配置（当前为直接获取当前访问地址）
let baseAPI = {
	production: document.location.origin, // 生产环境api
	release: document.location.origin, // 测试环境api
	development: '', //开发模式api（搭配webpack代理）
}

let env = process.env.NODE_ENV // 获取当前webpack打包版本
let baseURL = baseAPI[env] // 根据webpack版本选择api

// 系统参数配置
export default {
	timeout: 10000, // 请求超时
	version, // 系统版本
	baseAPI, // 所有环境接口对象
	env, // 当前环境
	baseURL // 当前环境接口地址
}