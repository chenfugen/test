import domain from '../domain.config.js'
export default {
	// 主域名
	domain: 'https://' + domain.rqDomain,
	// mqtt服务器
	mq_host: domain.mqDomain,
	// mqtt端口
	mq_port: domain.mqPort,
}